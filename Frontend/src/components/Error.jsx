import React from "react";
import css from "./Error.module.css";
export default function Error({ error, setError }) {
  return (
    <div className={css.error}>
      <p className={css.cross} onClick={() => setError(false)}>
        x
      </p>
      <p>{`${error}`}</p>
      <p>Try reloading the page</p>
    </div>
  );
}
