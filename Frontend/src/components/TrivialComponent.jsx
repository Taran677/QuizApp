import React from "react";
import { Link } from "react-router-dom";
import css from "./TrivialComponents.module.css";

export default function TrivialComponent({
  Robo,
  loading,
  setLoading,
  username,
}) {
  return (
    <main className={css.main}>
      <div className={css.grid}>
        <img src={Robo} alt="robo-image" className={css.heroImg} />
        <h1>
          Let's <span className={css.span}>Trivia</span>!
        </h1>
        <div className={css.btns}>
          <Link
            to={username !== "Usner" ? "/login" : "get-started"}
            className={css.btn}
          >
            Trivia go!
          </Link>
        </div>
      </div>
    </main>
  );
}
