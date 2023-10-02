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