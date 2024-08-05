import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TrivialComponent from "./components/TrivialComponent";
import UrlGeneratorAPI from "./components/UrlGeneratorAPI";
import { useEffect, useState } from "react";
import QuizPage from "./QuizComponents/QuizPage";
import Robo from "./assets/robo.svg";
import EntertainmentImg from "./assets/entertainment.svg";
import Green from "./assets/green.svg";
import Misc from "./assets/misc.svg";
import Red from "./assets/red.svg";
import Yellow from "./assets/yellow.svg";
import Science from "./assets/science.svg";
import Profile from "./assets/profile.webp";
import Loading from "./components/Loading";
import Error from "./components/Error.jsx";
import Login from "./components/Login.jsx";
import SideBar from "./components/SideBar.jsx";
import Menu from "./assets/menu.svg";
import axios from "axios";
import MyProfile from "./components/MyProfile.jsx";
import Leaderboard from "./components/Leaderboard.jsx";

function App() {
  const [url, setUrl] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        // Log the token from cookies or localStorage if needed
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('authToken='))
          ?.split('=')[1];
        console.log('Token:', token);

        const response = await axios.get(
          "https://quizapp-68lr.onrender.com/api/protected-route",
          {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          }
        );

        console.log("API response:", response);
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername(null); // Clear username on error
      }
    };

    fetchUsername();
  }, []);
  const onLogout = async () => {
    try {
      await axios.post(
        "https://quizapp-68lr.onrender.com/api/auth/logout",
       
        { withCredentials: true }
      );
      setUsername(null); // Clear username on logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <SideBar
          username={username}
          setError={setError}
          Profile={Profile}
          Menu={Menu}
          onLogout={onLogout}
        />
        {loading && <Loading />}
        {error && <Error error={error} setError={setError} />}
        <Routes>
          <Route
            path="/"
            element={
              <TrivialComponent
                loading={loading}
                setLoading={setLoading}
                Robo={Robo}
                Error={Error}
                setError={setError}
                username={username}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                loading={loading}
                setLoading={setLoading}
                Error={Error}
                setError={setError}
                username={username}
                setUsername={setUsername}
              />
            }
          />
          <Route
            path="/get-started"
            element={
              <UrlGeneratorAPI
                Science={Science}
                Yellow={Yellow}
                Red={Red}
                Misc={Misc}
                Green={Green}
                setUrl={setUrl}
                url={url}
                setQuestions={setQuestions}
                EntertainmentImg={EntertainmentImg}
                loading={loading}
                setLoading={setLoading}
                Error={Error}
                setError={setError}
              />
            }
          />
          <Route
            path="/quiz-time"
            element={
              <QuizPage
                setUrl={setUrl}
                url={url}
                questions={questions}
                setQuestions={setQuestions}
                Robo={Robo}
                loading={loading}
                setLoading={setLoading}
                Error={Error}
                setError={setError}
                username={username}
              />
            }
          />
          <Route path="/profile" element={<MyProfile />} />
          <Route
            path="/leaderboard"
            element={<Leaderboard setError={setError} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
