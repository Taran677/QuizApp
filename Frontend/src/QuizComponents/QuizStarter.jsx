import React from "react";
import css from "./QuizPage.module.css";

export default function QuizStarter({ setBegin }) {
  return (
    <main className={css.main}>
      <h1 className={css.mainHead}>Instructions</h1>
      <div className={css.instructions}>
        <ul className={css.orderedList}>
          <li className={css.rules}>
            If you leave before the quiz is completed, you are disqualified!
          </li>
          <li className={css.rules}>
            There is 1 point for each right answer and no negative marking.
          </li>
        </ul>
      </div>{" "}
      <button className={css.btnStart} onClick={() => setBegin(true)}>
        Begin
      </button>
    </main>
  );
}
