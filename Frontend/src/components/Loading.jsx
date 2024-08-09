import React from "react";
import css from "./Loading.module.css";
export default function Loading() {
  return (
    <div className={css.loading}>
      <div className={css.loadingio}>
        <div className={css.ldio}>
          <div>
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
