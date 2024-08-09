import React, { useEffect, useState } from "react";
import Form from "./Form";
import css from "./UrlGenerator.module.css";
import Categories from "./Categories";
import Difficulties from "./Difficulties";
import SubCategories from "./SubCategories";
import Button from "./Button";

export default function UrlGeneratorAPI({
  setQuestions,
  url,
  setUrl,
  EntertainmentImg,
  Yellow,
  Red,
  Green,
  Misc,
  Science,
  loading,
  setLoading,
  setError,
  frontUrl,
  Atom,
  Rocket
}) {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [solution, setSolution] = useState([]);
  const [category, setCategory] = useState("");
  const [arrayOfC, setArrayOfC] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [array, setArray] = useState("");
  const [catId, setCatId] = useState(9);
  const [play, setPlay] = useState(false);
  const [viewAmount, setViewAmount] = useState(false);
  const [verify, setVerify] = useState(false);
  const [numberOfQues, setNumberOfQues] = useState(1);

  function getCatId(userCategory, categories) {
    let capitalisedUserCat =
      userCategory.slice(0, 1).toUpperCase() + userCategory.slice(1);
    categories.forEach((element, i) => {
      if (element.name.includes(capitalisedUserCat)) {
        setCatId(element.id);
      }
    });
  }

  function setTheAmount(catId, difficulty) {
    setLoading(true);

    fetch(`https://opentdb.com/api_count.php?category=${catId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        setNumberOfQues(
          data.category_question_count[`total_${difficulty}_question_count`]
        );
        setLoading(false);

        setUrl(
          `https://opentdb.com/api.php?amount=${amount}&category=${catId}&difficulty=${difficulty}`
        );
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(`${err}`);
      });
  }

  useEffect(() => {
    setLoading(true);
    fetch("https://opentdb.com/api_category.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(`${err}`);
      });
  }, []);
  useEffect(() => {
    const categories = array;

    if (category && categories && difficulty) {
      getCatId(selectedCat, categories);
      if (catId > 8) {
        setTheAmount(catId, difficulty);
        setViewAmount(true);
      }
    }
  }, [
    selectedCat,
    difficulty,
    amount,
    data,
    array,
    solution,
    category,
    catId,
    play,
    numberOfQues,
  ]);

  return (
    <>
      <div className={css.main}>
        <Categories
          Science={Science}
          Misc={Misc}
          data={data}
          solution={solution}
          setSolution={setSolution}
          category={category}
          setCategory={setCategory}
          arrayOfC={arrayOfC}
          setArrayOfC={setArrayOfC}
          setArray={setArray}
          Atom={Atom}
          EntertainmentImg={EntertainmentImg}
        ></Categories>
        {solution.length > 0 && (
          <SubCategories
            solution={solution}
            category={category}
            setSelectedCat={setSelectedCat}
            frontUrl={frontUrl}
          />
        )}{" "}
        <Difficulties
          setDifficulty={setDifficulty}
          Yellow={Yellow}
          Green={Green}
          Red={Red}
          Rocket={Rocket}
          frontUrl={frontUrl}
        ></Difficulties>{" "}
        {viewAmount === true && (
          <Form
            setAmount={setAmount}
            amount={amount}
            numberOfQues={numberOfQues}
          />
        )}
        <Button play={play} url={url} setPlay={setPlay}></Button>
      </div>
    </>
  );
}
