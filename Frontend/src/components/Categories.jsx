import React, { useEffect, useState } from "react";
import css from "./UrlGenerator.module.css";

export default function Categories({
  data,
  solution,
  setSolution,
  category,
  setCategory,
  arrayOfC,
  setArrayOfC,
  setArray,
  EntertainmentImg,
  Misc,
  Science,
}) {
  useEffect(() => {
    if (data && data.trivia_categories) {
      const catArray = Object.values(data.trivia_categories);
      const array = catArray.map((element) => element.name);
      setArrayOfC(array);
      setArray(catArray);
    }
  }, [data]);

  const handleCategorySelection = (selectedCategory) => {
    setCategory(selectedCategory);

    let updatedSolution = [];

    switch (selectedCategory) {
      case "entertainment":
        updatedSolution = arrayOfC
          .filter((category) => category.includes("Entertainment"))
          .map((category) => category.replace("Entertainment: ", ""));
        break;
      case "science":
        updatedSolution = arrayOfC
          .filter((category) => category.includes("Science"))
          .map((category) => category.replace("Science: ", ""));
        break;
      case "miscellaneous":
        updatedSolution = arrayOfC.filter(
          (category) =>
            !category.includes("Entertainment") && !category.includes("Science")
        );
        break;
      default:
        break;
    }

    setSolution(updatedSolution);
  };

  return (
    <div className={css.category}>
      <h2 className={`${css.label} ${css.categoryLabel}`}>
        Choose a Category!
      </h2>
      <div className={css.grid}>
        <a
          onClick={() => handleCategorySelection("entertainment")}
          className={css.gridItem}
          href="#subcategories"
        >
          <div>
            <span className={css.span}>Entertainment</span>
            <img src={EntertainmentImg} alt="Entertainment" />
          </div>
        </a>
        <a
          onClick={() => handleCategorySelection("science")}
          className={css.gridItem}
          href="#subcategories"
        >
          <div>
            <span className={css.span}>Science</span>
            <img src={Science} alt="Science" />
          </div>
        </a>
        <a
          onClick={() => handleCategorySelection("miscellaneous")}
          className={css.gridItem}
          href="#subcategories"
        >
          <div>
            <span className={css.span}>Miscellaneous</span>
            <img src={Misc} alt="Miscellaneous" />
          </div>
        </a>
      </div>
    </div>
  );
}
