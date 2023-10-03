import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    res.status(201).json({
      correctAnswer: 3,
      incorrectAnswer: 2,
      totalScore: 60
    });
  }
}
