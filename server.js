const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require('fs');
const path = require('path');

const app = express();
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

app.use(express.json());
app.use(cookieParser());

// Serve static files from the React app's build directory
const buildPath = path.join(__dirname, 'Frontend', 'dist');
app.use(express.static(buildPath));

const corsOptions = {
  origin: 'https://quiz-app-1z1f.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to connect to MongoDB
const connectToDB = async (req, res, next) => {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }
    req.db = client.db(dbName);
    req.collection = req.db.collection(collectionName);
    next();
  } catch (error) {
    console.error("Error connecting to DB:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Serve React app and handle API requests
app.get('/*', (req, res) => {
  // Get the first part of the route
  let route = req.params[0].split('/')[0];

  // Check if the first part of the route matches a file or folder in the build directory
  fs.readdir(buildPath, (err, files) => {
    if (err) {
      console.error('Error reading build directory:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (files.includes(route)) {
        // If the route matches a file or folder, serve it
        res.sendFile(path.join(buildPath, req.params[0]));
      } else {
        // If the route doesn't match, serve index.html for React Router to handle
        res.sendFile(path.join(buildPath, 'index.html'));
      }
    }
  });
});

// Authentication and user routes
app.post("/api/auth/signup", connectToDB, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const existingUser = await req.collection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await req.collection.insertOne({ username, password: hashedPassword });

    res.status(201).json({ message: "User created", id: result.insertedId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/auth/login", connectToDB, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const user = await req.collection.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = { username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'None',
    });

    res.status(200).json({ message: "Login successful", username: user.username });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.username = decoded.username;
    next();
  });
};

app.get("/api/protected-route", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", username: req.username });
});

app.get("/api/users", connectToDB, async (req, res) => {
  try {
    const users = await req.collection.find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logged out successfully" });
});

app.post("/api/quiz/stats", connectToDB, async (req, res) => {
  const {
    username,
    score,
    totalQuestions,
    correctQuestions,
    unansweredQuestions,
  } = req.body;

  if (
    !username ||
    score === undefined ||
    totalQuestions === undefined ||
    correctQuestions === undefined ||
    unansweredQuestions === undefined
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const scoreValue = !isNaN(score) ? score : 0;
  const totalQuestionsValue = !isNaN(totalQuestions) ? totalQuestions : 0;
  const correctQuestionsValue = !isNaN(correctQuestions) ? correctQuestions : 0;
  const unansweredQuestionsValue = !isNaN(unansweredQuestions) ? unansweredQuestions : 0;

  try {
    const existingStats = await req.collection.findOne({ username });

    if (existingStats) {
      const initializedStats = {
        score: !isNaN(existingStats.score) ? existingStats.score : 0,
        totalQuestions: !isNaN(existingStats.totalQuestions) ? existingStats.totalQuestions : 0,
        correctQuestions: !isNaN(existingStats.correctQuestions) ? existingStats.correctQuestions : 0,
        unansweredQuestions: !isNaN(existingStats.unansweredQuestions) ? existingStats.unansweredQuestions : 0,
        quizzesAttended: !isNaN(existingStats.quizzesAttended) ? existingStats.quizzesAttended : 0,
      };

      const updatedStats = {
        score: initializedStats.score + scoreValue,
        totalQuestions: initializedStats.totalQuestions + totalQuestionsValue,
        correctQuestions: initializedStats.correctQuestions + correctQuestionsValue,
        unansweredQuestions: initializedStats.unansweredQuestions + unansweredQuestionsValue,
        quizzesAttended: initializedStats.quizzesAttended + 1,
        timestamp: new Date(),
      };

      const result = await req.collection.updateOne(
        { username },
        { $set: updatedStats }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Failed to update stats" });
      }

      res.status(200).json({ message: "Quiz stats updated successfully" });
    } else {
      const newStats = {
        username,
        score: scoreValue,
        totalQuestions: totalQuestionsValue,
        correctQuestions: correctQuestionsValue,
        unansweredQuestions: unansweredQuestionsValue,
        quizzesAttended: 1,
        timestamp: new Date(),
      };

      const result = await req.collection.insertOne(newStats);

      res.status(201).json({ message: "Quiz stats created successfully", id: result.insertedId });
    }
  } catch (error) {
    console.error("Error updating quiz stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/user/stats", verifyToken, connectToDB, async (req, res) => {
  try {
    const userStats = await req.collection.findOne({ username: req.username });

    if (!userStats) {
      return res.status(404).json({ message: "User stats not found" });
    }

    res.status(200).json(userStats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/leaderboard", connectToDB, async (req, res) => {
  try {
    const leaderboard = await req.collection
      .find({})
      .sort({ score: -1 })
      .limit(10)
      .toArray();

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
