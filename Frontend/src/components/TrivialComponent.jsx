import React from "react";
import { Link } from "react-router-dom";
import css from "./TrivialComponents.module.css";
export default function TrivialComponent({
  Robo,
  loading,
  setLoading,
  username,
  Logo,
}) {
  return (
    <main className={css.main}>
      <div className={css.flex}>
        <div className={css.head}>
          <img src={Logo} alt="Logo" />
        </div>
        <h1 className={css.heading}>
          Let's <span className={css.span}>Trivio</span>!
        </h1>
        <p className={css.para}>
          {"Empowering knowledge through fun quizzes. Challenge yourself, compete with friends, and master new topics with Trivio!".toUpperCase()}
        </p>
        <p className={css.para}>Made with love &hearts;</p>
        <div className={css.btns}>
          <Link
            to={username !== "Usner" ? "/login" : "get-started"}
            className={css.btn}
          >
            <span className={css.lg}>GO!</span>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="rgb(31, 148, 148)"
            >
              <path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z" />
            </svg>
          </Link>
        </div>
      </div>{" "}
      <img src={Robo} alt="robo-image" className={css.heroImg} />{" "}
    </main>
  );
}
