import React from "react";
import css from "./Alert.module.css";

export default function Alert({ alert, setAlert, setAction }) {
  return (
    <div className={css.alert}>
      <hr />
      <div className={css.middle}>
        <div className={css.info}>{alert}</div>
      </div>
      <hr />
      <div className={css.bottom}>
        <div className={css.btns}>
          <button
            className={css.btnSecondary}
            onClick={() => {
              setAlert("");
              setAction(true);
            }}
          >
            Ok
          </button>
          <button
            className={css.btnPrimary}
            onClick={() => {
              setAlert("");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
