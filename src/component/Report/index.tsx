import { useRouter } from "next/navigation";
import { useContext } from "react";
import { GlobalContext } from "../../context";
import styles from "../Quiz/styles.module.scss";
import reportStyles from "./styles.module.scss";

const Report = () => {
  const {
    state: { reports },
    dispatch,
  } = useContext(GlobalContext);
  const router = useRouter();
  const handleStartAgain = () => {
    dispatch({ type: "RESTART_QUIZ" });
    router.push("/quiz");
  };
  return (
    <div className={styles.quizLayout}>
      <div className={styles.bottomSheetWrapper}>
        <div className={reportStyles.resultHeading}>Your result</div>
        <div
          style={{ display: "flex", justifyContent: "center", paddingTop: 24 }}
        >
          <div className={reportStyles.scoreContainer}>
            <div className={reportStyles.scoreDisplay}>
              <p className={reportStyles.score}>{reports.totalScore} </p>
            </div>
          </div>
        </div>

        <div className={reportStyles.resultsWrapper}>
          <div
            className={`${reportStyles.correctAnswer} ${reportStyles.resultOptions}`}
          >
            <div className={reportStyles.correctPointer}></div>
            <div>{reports.correctAnswer} Correct </div>
          </div>
          <div
            className={`${reportStyles.incorrectAnswer} ${reportStyles.resultOptions}`}
          >
            <div className={reportStyles.incorrectPointer}></div>
            <div>{reports.correctAnswer} Incorrect</div>
          </div>
        </div>
        <div className={styles.cTAWrapper}>
          <button className={styles.cTAbtnStyles} onClick={handleStartAgain}>
            Start Again
          </button>
        </div>
      </div>
    </div>
  );
};
export default Report;
