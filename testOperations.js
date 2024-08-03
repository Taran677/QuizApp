const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = "QuizApp"; // Updated to new database name
const collectionName = "Users"; // Updated to new collection name

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Insert a document
    const insertResult = await collection.insertOne({ name: "John Doe", age: 30 });
    console.log('Insert Result:', insertResult);

    // Find a document
    const findResult = await collection.findOne({ name: "John Doe" });
    console.log('Find Result:', findResult);

    // Update a document
    const updateResult = await collection.updateOne(
      { name: "John Doe" },
      { $set: { age: 31 } }
    );
    console.log('Update Result:', updateResult);

    // Delete a document
    const deleteResult = await collection.deleteOne({ name: "John Doe" });
    console.log('Delete Result:', deleteResult);

  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    await client.close();
    console.log('Connection closed.');
  }
}

run().catch(console.dir);
