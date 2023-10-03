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
  userId: string;
}

export type Actions = "START_QUIZ" | "COMPLETE_QUIZ" | "RESTART_QUIZ";

export interface StoreActions {
    type: Actions,
    payload?: unknown;
}