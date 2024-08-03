import React, { useEffect } from "react";
import css from "./UrlGenerator.module.css";
import { Link } from "react-router-dom";

export default function Button({ play, setPlay, url }) {
  useEffect(() => {
    if (!play && url) {
      localStorage.setItem("url", url);
    }
  }, [play, url]);

  useEffect(() => {
    console.log("Button URL:", url);
  }, [url]);

  return (
    <div className={css.button}>
      <Link
        onClick={() => setPlay(true)}
        className={css.buttonLink}
        to={"/quiz-time"}
      >
        Play!
      </Link>
    </div>
  );
}
