import { Question, Reports, StoreActions, StoreState } from "./types";

export const initialState: StoreState = {
  questions: [],
  reports: {
    correctAnswer: 0,
    incorrectAnswer: 0,
    totalScore: 0,
  },
  isQuizInProgress: false
};

export default function reducer(
  state: StoreState = initialState,
  action: StoreActions
): StoreState {
  switch (action.type) {
    case "START_QUIZ": {
      const questions = action.payload as Question[];
      return {
        ...state,
        questions,
        isQuizInProgress: true
      };
    }
    case "SUBMIT_ANSWER": {
      const reports = action.payload as Reports;
      return {
        ...state,
        reports,
        isQuizInProgress: false
      };
    }
    case "RESTART_QUIZ": {
      return {
        ...state,
        isQuizInProgress: true
      }
    }
  }
}
