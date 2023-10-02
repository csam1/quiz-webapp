import React, { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import Head from "next/head";
import api from "../../api";
import request from "../../helpers/request";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

const Quiz = () => {
  const {
    state: { questions, isQuizInProgress },
    dispatch,
  } = useContext(GlobalContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number[]>([]);
  const [duration, setDuration] = useState(0);
  const [answers, setAnswers] = useState({
    correctAnswers: 0,
    incorrectAnswers: 0,
  });
  const router = useRouter();
  useEffect(() => {
    if (!isQuizInProgress) {
      router.push("/");
    }
    setInterval(() => {
      setDuration((time) => time + 1);
    }, 1000);
  }, []);

  const handleOptionSelect = (e, option: number, isMultiSelect: boolean) => {
    if (e.target.checked) {
      if (selectedOption) {
        setSelectedOption([...selectedOption, option]);
      } else {
        setSelectedOption([option]);
      }
    } else {
      setSelectedOption(selectedOption.filter((val) => val != option));
    }
  };

  const validateAnswer = async () => {
    const { method, path } = api.submitAnswer;
    await request<{ validAnswer: boolean }>({
      path,
      method,
      payload: {
        question: currentQuestion,
        selectedOption,
        duration,
      },
    });
  };

  const renderQuestion = useCallback(() => {
    const selectedQuestion = questions[currentQuestion];
    const { question, options, isMultiSelect, imageSrc } = selectedQuestion;
    return (
      <>
        <div className={styles.questions}>{question}</div>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="question-image"
            className={styles.imgContainer}
          />
        ) : (
          <></>
        )}
        {options.map((option, index) => (
          <div
            className={`${styles.options} ${
              selectedOption.includes(index) ? styles.activeOptions : ""
            }`}
          >
            <input
              className={
                selectedOption.includes(index)
                  ? styles.activeRadioBtn
                  : styles.radioBtn
              }
              type={isMultiSelect ? "checkbox" : "radio"}
              value={index}
              checked={selectedOption.includes(index)}
              onChange={(e) => handleOptionSelect(e, index, isMultiSelect)}
            />
            <label className={styles.optionsLabel}>{option}</label>
          </div>
        ))}
      </>
    );
  }, [currentQuestion, selectedOption]);

  const handleNextQuestion = async () => {
    await validateAnswer();
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((current) => current + 1);
      setSelectedOption([]);
      setDuration(0);
    } else {
      const { path, method } = api.submitQuiz;
      const response = await request({
        path,
        method,
        payload: {}, 
      });
      dispatch({ type: "SUBMIT_ANSWER", payload: response });
      router.push("/report");
    }
  };

  if (!isQuizInProgress) {
    return <></>;
  }

  return (
    <div className={styles.quizLayout}>
      <Head>
        <title>Quiz</title>
      </Head>
      <div className={styles.bottomSheetWrapper}>
        <div className={styles.quizContainer}>
          <div className={styles.questionNumberWrapper}>
            <div className={styles.questionsNumberStatus}>
              <p className={styles.currentQuestionNumber}>
                {currentQuestion + 1}
              </p>{" "}
              <p className={styles.totalQuestion}>/{questions.length}</p>
            </div>
          </div>
          {renderQuestion()}
          <div className={styles.cTAWrapper}>
            <button
              className={styles.cTAbtnStyles}
              disabled={selectedOption.length === 0}
              onClick={handleNextQuestion}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
