export type Question = {
  question: string;
  options: string[];
  imageSrc?: string;
  isMultiSelect: boolean;
};

export type Reports = {
  totalScore: number;
  correctAnswer: number;
  incorrectAnswer: number;
};

export interface StoreState {
  questions: Question[];
  reports: Reports;
  isQuizInProgress: boolean;
}

export type Actions = "START_QUIZ" | "SUBMIT_ANSWER" | "RESTART_QUIZ";

export interface StoreActions {
    type: Actions,
    payload?: unknown;
}