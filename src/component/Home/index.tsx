import React, { useContext } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "../../context";
import request from "../../helpers/request";
import api from "../../api";
import { Question } from "../../store/types";
import Image from "next/image";
import upraisedLogo from "../../../assets/upraised-logo.svg";
import quizLogo from "../../../assets/quiz-logo.svg";
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
          <Image
            src={upraisedLogo}
            alt="Upraised Logo"
            width={200}
            height={70}
          />
        </div>
        <div>
          <Image
            src={quizLogo}
            alt="Quiz Logo"
            width={300}
            height={264}
            style={{ marginTop: "6rem" }}
          />
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