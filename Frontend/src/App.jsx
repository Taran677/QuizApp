import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import TrivialComponent from "./components/TrivialComponent";
import UrlGeneratorAPI from "./components/UrlGeneratorAPI";
import { useEffect, useState } from "react";
import QuizPage from "./QuizComponents/QuizPage";
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
import Robo from "./assets/robo.svg"
import RoboLogin from "./assets/robologin.svg"
import Logo from "./assets/logo.svg"
import Atom from "./assets/Atom.svg"
import Rocket from "./assets/rocket.svg"
import RoboQp from "./assets/roboqp.svg"
import RoboError from "./assets/roboError.svg"
import RoboLeaderboard from "./assets/roboLeaderboard.svg"

function App() {
  const [url, setUrl] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState(null);
  const baseUrl = import.meta.env.VITE_REACT_APP_BACK_URL;
  const frontUrl = import.meta.env.VITE_REACT_APP_FRONT_URL || "https://tiny-manatee-d7052c.netlify.app";
  console.log(baseUrl, frontUrl)
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('authToken='))
          ?.split('=')[1];
        console.log('Token:', token);

        const response = await axios.get(
          `${baseUrl}/api/protected-route`,
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
        setUsername(null);
      }
    };

    fetchUsername();
  }, [baseUrl]);

  const onLogout = async () => {
    try {
      await axios.post(
        `${baseUrl}/api/auth/logout`,
        { withCredentials: true }
      );
      setUsername(null);
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
          baseUrl={baseUrl}
          frontUrl={frontUrl}
        />
        {loading && <Loading />}
        {error && <Error error={error} setError={setError} RoboError={RoboError} />}
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
                baseUrl={baseUrl}
                frontUrl={frontUrl}
                Logo={Logo}
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
                baseUrl={baseUrl}
                frontUrl={frontUrl}
                RoboLogin={RoboLogin}
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
                baseUrl={baseUrl}
                frontUrl={frontUrl}
                Atom={Atom}
                Rocket={Rocket}
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
                baseUrl={baseUrl}
                frontUrl={frontUrl}
                RoboQp={RoboQp}
              />
            }
          />
          <Route path="/profile" element={<MyProfile baseUrl={baseUrl} frontUrl={frontUrl} />} />
          <Route
            path="/leaderboard"
            element={<Leaderboard setError={setError} baseUrl={baseUrl} frontUrl={frontUrl} RoboLeaderboard={RoboLeaderboard} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
