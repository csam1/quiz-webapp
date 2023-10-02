import { NextApiRequest, NextApiResponse } from "next";
import questionWithAnswers from "../../src/mocks/questionsWithAnswers.json";

type RequestBody = {
  duration: number;
  selectedOption: number[];
  question: number;
};

type Response = {
  validAnswer: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    const { question, selectedOption } = req.body as RequestBody;
    const isValidAnswer =
      questionWithAnswers[question].answer.toString() ===
      selectedOption.toString();

    res.status(200).json({
      validAnswer: isValidAnswer,
    });
  }
}
