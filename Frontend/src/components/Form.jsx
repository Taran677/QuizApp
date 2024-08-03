import React, { useState } from "react";
import css from "./UrlGenerator.module.css";

const manageForm = (e, setAmount) => {
  e.preventDefault();
};

export default function Form({ setAmount, amount, numberOfQues }) {
  const [localAmount, setLocalAmount] = useState(amount);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setLocalAmount(value);
  };

  const handleMouseUp = () => {
    setAmount(localAmount);
  };

  return (
    <form onSubmit={(e) => manageForm(e, setAmount)} className={css.form} id="nooqs">
      <div className={css.noOfQuestions}>
        <label className={css.label} htmlFor="amount">
          Number of Questions?
        </label>
        <input
          className={css.input}
          onChange={handleInputChange}
          onMouseUp={handleMouseUp} // Set the parent state when the mouse button is released
          type="range"
          name="amount"
          id="amount"
          max={numberOfQues < 50 ? numberOfQues : 50}
          min={1}
          step={1}
          value={localAmount}
        />
      </div>
      <div className={css.amountValue}>{localAmount}</div>
    </form>
  );
}
