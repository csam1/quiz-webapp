import React, { useContext } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "../../context";
import request from "../../helpers/request";
import api from "../../api";
import Image from "next/image";
import { Question } from "../../store/types";
import styles from "../Quiz/styles.module.scss";
import homeStyles from "./styles.module.scss";

const Home = () => {
  const router = useRouter();
  const {
    dispatch,
    state: { userId },
  } = useContext(GlobalContext);
  const handleStartQuiz = async () => {
    const { method, path } = api.fetchQuestions;
    const response = await request<Question[]>({
      path: `${path}?user=${userId}`,
      method,
    });
    dispatch({ type: "START_QUIZ", payload: response });
    router.push("/quiz");
  };
  return (
    <div className={homeStyles.startContainer}>
      <div className={homeStyles.startSection}>
        <div>
          <Image src={"/assets/upraised-logo.svg"} alt="upraised logo" width={200} height={70}/>
        </div>
        <div>
          <Image src={'/assets/quiz-logo.svg'} alt="quiz logo" width={300} height={264} style={{ marginTop: "6rem" }} />
        </div>
      </div>
      <div className={styles.cTAWrapper}>
        <button className={styles.cTAbtnStyles} onClick={handleStartQuiz}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Home;
