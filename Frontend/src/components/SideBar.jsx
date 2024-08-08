import React, { useState } from "react";
import css from "./SideBar.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SideBar({
  Profile,
  Menu,
  setError,
  username,
  onLogout,
  baseUrl,
  frontUrl,
}) {
  const [show, setShow] = useState(false);

  const handleLogout = async () => {
    try {
      console.log("baseUrl:", baseUrl);
      await axios.post(
        `${baseUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true, // This ensures cookies (including authToken) are sent with the request
        }
      );
      if (onLogout) {
        onLogout();
      }

      window.location.href = `${frontUrl}`;
    } catch (error) {
      console.error("Logout failed:", error);
      setError(`${error}`);
    }
  };

  return (
    <>
      <div className={css.hamburger} onClick={() => setShow(!show)}>
        <img src={Menu} alt="menu" />
      </div>
      <div className={`${css.sideBar} ${show && css.sbr}`}>
        {show && (
          <div className={css.user}>
            <Link to="/profile" className={css.link}>
              <span className={css.name}>Profile</span>
              <span className={css.image}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="rgb(31, 148, 148)"
                >
                  <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                </svg>
              </span>
            </Link>
            <button onClick={handleLogout} className={css.logoutButton}>
              <span>Logout</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="rgb(31, 148, 148)"
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
                  fill="rgb(31, 148, 148)"
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
                  fill="rgb(31, 148, 148)"
                >
                  <path d="M160-200h160v-320H160v320Zm240 0h160v-560H400v560Zm240 0h160v-240H640v240ZM80-120v-480h240v-240h320v320h240v400H80Z" />
                </svg>
              </span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
