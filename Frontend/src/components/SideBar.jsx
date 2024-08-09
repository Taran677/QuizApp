import React, { useState, useEffect } from "react";
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
  setChangeTheme,
  themeIndex,
  setThemeIndex,
}) {
  const [show, setShow] = useState(false);

  const handleToggleTheme = () => {
    setThemeIndex((prevIndex) => (prevIndex % 6) + 1);
    setChangeTheme(true);
  };

  useEffect(() => {
    document.body.classList.remove(
      ...Array(6)
        .fill()
        .map((_, i) => `invert${i + 1}`)
    );
    document.body.classList.add(`invert${themeIndex}`);
  }, [themeIndex]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${baseUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
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
            <div className={css.link} onClick={handleToggleTheme}>
              <span>Toggle</span>
              <span className={css.splSp}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="rgb(31, 148, 148)"
                >
                  <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z" />
                </svg>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
