import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import upraisedLogo from "../../../assets/upraised-logo.svg";
import quizLogo from "../../../assets/quiz-logo.svg";
import styles from "../Quiz/styles.module.scss";
import homeStyles from "./styles.module.scss";

const Home = () => {
  const router = useRouter();
  const handleStartQuiz = async () => {
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
