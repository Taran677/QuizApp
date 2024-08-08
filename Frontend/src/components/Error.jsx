import React from "react";
import css from "./Error.module.css";
export default function Error({ error, setError, RoboError }) {
  return (
    <div className={css.error}>
      <img src={RoboError} alt="robo" className={css.roboError} />
      <p className={css.cross} onClick={() => setError(false)}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </p>
      <p>{`${error}`}</p>
      <p>Try reloading the page</p>
    </div>
  );
}
