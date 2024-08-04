import React, { useEffect, useState } from "react";
import css from "./QuizPage.module.css";
import QuizStarter from "./QuizStarter";
import he from "he";
import Alert from "./Alert";
import { Link, UNSAFE_ErrorResponseImpl } from "react-router-dom";

export default function QuizPage({
  url,
  setQuestions,
  questions,
  setUrl,
  Robo,
  loading,
  setLoading,
  error,
  setError,
  username,
}) {
  const [begin, setBegin] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [viewAnswers, setViewAnswers] = useState([]);
  const [alert, setAlert] = useState("");
  const [action, setAction] = useState(false);
  const [quiz, setQuiz] = useState(true);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    if (!url) {
      const localUrl = localStorage.getItem("url");
      if (localUrl) {
        setUrl(localUrl);
      }
    }
  }, [url, setUrl]);

  useEffect(() => {
    setLoading(true);
    if (url) {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            setLoading(false);
            setError("Network response was not ok");
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((finalData) => {
          if (finalData.results && finalData.results.length > 0) {
            const shuffled = finalData.results.map((question) => ({
              ...question,
              options: shuffleArray([
                ...question.incorrect_answers,
                question.correct_answer,
              ]),
            }));
            setShuffledQuestions(shuffled);
            setQuestions(finalData);
            setAnsweredQuestions(
              new Array(finalData.results.length).fill(false)
            );
            setSelectedOptions(new Array(finalData.results.length).fill(""));
            setViewAnswers(new Array(finalData.results.length).fill(false));
          } else {
            console.log("reset limit exceeded");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(err);
        });
    }
  }, [url, setQuestions]);

  const handleOptionClick = (option) => {
    if (!answeredQuestions[index]) {
      const updatedSelectedOptions = [...selectedOptions];
      updatedSelectedOptions[index] = option;
      setSelectedOptions(updatedSelectedOptions);

      const updatedViewAnswers = [...viewAnswers];
      updatedViewAnswers[index] = true;
      setViewAnswers(updatedViewAnswers);

      if (option === shuffledQuestions[index].correct_answer) {
        setScore((prevScore) => prevScore + 1);
      }

      setAnsweredQuestions((prev) =>
        prev.map((answered, i) => (i === index ? true : answered))
      );
    }
  };

  const handlePrevClick = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextClick = () => {
    if (index === shuffledQuestions.length - 1) {
      setAlert("Do you want to end the quiz?");
    } else {
      setIndex((prev) =>
        prev < shuffledQuestions.length - 1 ? prev + 1 : prev
      );
    }
  };

  useEffect(() => {
    if (action) {
      setQuiz(false);
      setAction(false);
      setBegin(false);

      // Send quiz statistics to the server
      const postData = async () => {
        try {
          // Ensure variables are declared and initialized before usage
          const scoreValue = !isNaN(Number(score)) ? Number(score) : 0;
          const totalQuestionsValue = !isNaN(Number(questions.results.length)) ? Number(questions.results.length) : 0;
          const correctQuestionsValue = !isNaN(Number(score)) ? Number(score) : 0;
          const unansweredQuestionsValue = !isNaN(Number(countUnansweredQuestions())) ? Number(countUnansweredQuestions()) : 0;
      console.log(scoreValue, totalQuestionsValue, correctQuestionsValue, unansweredQuestionsValue)
          const response = await fetch("https://quizapp-68lr.onrender.com/api/quiz/stats", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              score: scoreValue,
              totalQuestions: totalQuestionsValue,
              correctQuestions: correctQuestionsValue,
              unansweredQuestions: unansweredQuestionsValue,
            }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const result = await response.json();
          console.log('Quiz stats saved:', result);
        } catch (error) {
          console.error("Error posting quiz stats:", error);
        }
      };
      
      postData();
      
      
    }
    console.log(answeredQuestions);
  }, [action, answeredQuestions]);

  const countUnansweredQuestions = () => {
    return answeredQuestions.filter((answered) => !answered).length;
  };

  return (
    <>
      {!begin && quiz && <QuizStarter setBegin={setBegin} />}
      {begin && quiz && shuffledQuestions.length > 0 && (
        <div className={css.grid}>
          <div className={css.prev} onClick={handlePrevClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
          </div>
          <div className={css.next} onClick={handleNextClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </div>
          <div className={css.score}>Score: {score}</div>
          <div className={css.questionNo}>
            {index + 1} of {shuffledQuestions.length}
          </div>
          <>
            <div className={css.question} key={index}>
              {he.decode(shuffledQuestions[index].question)}
            </div>
            {shuffledQuestions[index].options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                onClick={() => handleOptionClick(option)}
                className={`${css.option} ${
                  viewAnswers[index] &&
                  (option === shuffledQuestions[index].correct_answer
                    ? css.correct
                    : option === selectedOptions[index]
                    ? css.incorrect
                    : "")
                } ${answeredQuestions[index] ? css.answered : ""}`}
              >
                {he.decode(option)}
              </div>
            ))}
            <div className={css.empty}></div>
            {viewAnswers[index] && (
              <div className={css.answer}>
                {selectedOptions[index] ===
                shuffledQuestions[index].correct_answer
                  ? "Well done!"
                  : "Incorrect Answer!"}
              </div>
            )}
          </>

          {alert && (
            <Alert alert={alert} setAlert={setAlert} setAction={setAction} />
          )}
        </div>
      )}
      {!quiz && (
        <div className={css.results}>
          <div className={css.img}>
            <img src={Robo} alt="robo" />
          </div>
          <div className={css.details}>
            <div className={css.scores}>
              <h2>Score</h2>
              <p className={css.p}>{score}</p>
            </div>
            <div className={css.noofques}>
              <h2>Number of Questions</h2>
              <p className={css.p}>{questions.results.length}</p>
            </div>
            <div className={css.correctQ}>
              <h2>Correct Questions</h2>
              <p className={css.p}>{score}</p>
            </div>
            <div className={css.unanswered}>
              <h2>Unanswered Questions</h2>
              <p className={css.p}>{countUnansweredQuestions()}</p>
            </div>
          </div>

          <button className={`${css.btnStart} ${css.btn}`}>
            <Link to={"/"}>Go to Home</Link>
          </button>
        </div>
      )}
    </>
  );
}
