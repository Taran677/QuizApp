import React from "react";
import css from "./UrlGenerator.module.css";

export default function SubCategories({ solution, category,  setSelectedCat}) {
  // console.log(solution, category)
  const handleClick = async (e) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 10)); 
  
      // Remove 'active' class from all siblings
      Array.from(e.target.parentElement.children).forEach((child) => {
        child.classList.remove(css.active);
      });
  
      // Add 'active' class to the clicked element
      e.target.classList.add(css.active);
      setSelectedCat(e.target.textContent)
      window.location.href = `http://localhost:5173/get-started#modes`
    } catch (error) {
      console.error("Error handling click:", error);
    }
  };
  

  return (
    <div className={css.subCategories} id="subcategories">
      <h1 className={css.label}>Choose a Subcategory</h1>
      <div className={css.grid3}>
        {solution.map((subcategory, index) => (
          <div key={index} className={css.gridItem3} onClick={handleClick}>
            {subcategory}
          </div>
        ))}
      </div>
    </div>
  );
}
