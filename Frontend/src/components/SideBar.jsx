import React, { useState } from "react";
import css from "./SideBar.module.css";
import axios from "axios"; // Make sure to import axios if you need to handle logout with an API call
import { Link } from "react-router-dom";

export default function SideBar({
  Profile,
  Menu,
  setError,
  username,
  onLogout,
}) {
  const [show, setShow] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://quizapp-68lr.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (onLogout) {
        onLogout();
      }

      window.location.href = "https://quiz-app-1z1f.vercel.app/login";
    } catch (error) {
      console.error("Logout failed:", error);
      setError(`${error}`);
    }
  };

  return (
    <div className={`${css.sideBar} ${show && css.sbr}`}>
      <div className={css.hamburger}>
        <img src={Menu} onClick={() => setShow(!show)} alt="menu" />
      </div>
      {show && (
        <div className={css.user}>
          <Link to="/profile" className={css.link}>
            <span className={css.name}>{username}</span>
            <span className={css.image}>
              <img src={Profile} alt="profileImg" />
            </span>
          </Link>
          <button onClick={handleLogout} className={css.logoutButton}>
            <span>Logout</span>{" "}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
              </svg>
            </span>
          </button>
          <Link to="/" className={css.link}>
            <span>Home</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000"
              >
                <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
              </svg>
            </span>
          </Link>
          <Link to="/leaderboard" className={css.link}>
            <span>Leaderboard</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000"
              >
                <path d="M160-200h160v-320H160v320Zm240 0h160v-560H400v560Zm240 0h160v-240H640v240ZM80-120v-480h240v-240h320v320h240v400H80Z" />
              </svg>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
