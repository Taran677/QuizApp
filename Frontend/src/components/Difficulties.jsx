import React, { useState } from "react";
import css from "./UrlGenerator.module.css";

export default function Difficulties({ setDifficulty, Yellow, Red, Green, frontUrl }) {
  const [active, setActive] = useState(null);

  return (
    <div className={css.difficulty} id="modes">
      <h2 className={css.label}>Modes</h2>
      <div className={css.grid}>
        <div
          className={`${css.gridItem2} ${
            active === "green" ? css.green : css.passive
          }`}
          onClick={() => {
            setActive("green");
            setDifficulty("easy");
            window.location.href = `${frontUrl}/get-started#nooqs`
          }}
        >
          <span className={css.span2}>Easy</span>
          <img src={Green} alt="illustration-ball" />
        </div>
        <div
          className={`${css.gridItem2} ${
            active === "yellow" ? css.yellow : css.passive
          }`}
          onClick={() => {
            setActive("yellow");
            setDifficulty("medium");
            window.location.href = `${frontUrl}/get-started#nooqs`
          }}
        >
          <span className={css.span2}>Medium</span>
          <img src={Yellow} alt="illustration-ball" />
        </div>
        <div
          className={`${css.gridItem2} ${
            active === "red" ? css.red : css.passive
          }`}
          onClick={() => {
            setActive("red");
            setDifficulty("hard");
            window.location.href = `${frontUrl}/get-started#nooqs`
          }}
        >
          <span className={css.span2}>Hard</span>
          <img src={Red} alt="illustration-ball" />
        </div>
      </div>
    </div>
  );
}
