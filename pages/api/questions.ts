import { NextApiRequest, NextApiResponse } from "next";
import { Question } from "../../src/store/types";
import questions from "../../src/mocks/questions.json";

const mockResponse = questions;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Question[]>
) {
  res.status(200).json(mockResponse);
}
