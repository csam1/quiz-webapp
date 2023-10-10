import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Quiz from "../src/component/Quiz";
import questions from "./__mocks__/questions.json";
import Home from "../src/component/Home";
import { GlobalContext } from "../src/context";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));


global.fetch = jest
  .fn()
  .mockReturnValue(
    Promise.resolve({ ok: true, json: async () => ({ data: questions }) })
  );

const renderComponent = (component, state, dispatch = jest.fn) => {
  return render(
    <GlobalContext.Provider value={{ state, dispatch }}>
      {component}
    </GlobalContext.Provider>
  );
};

describe("Quiz App", () => {
  it("Show Quiz App Homepage", () => {
    const { getByText } = renderComponent(<Home />, {
      questions,
      isQuizInProgress: false,
      userId: "23232",
    });
    expect(getByText("Start")).toBeTruthy();
  });

  it("Should start Quiz on press of Start CTA", () => {
    const { getByText } = renderComponent(<Home />, {
      questions,
      isQuizInProgress: true,
      userId: "23232",
    });
    const start = getByText("Start");
    fireEvent.click(start);
    waitFor(async () => {
      expect(await getByText(questions[0].question)).toBeTruthy();
    });
  });

  it("renders without errors", () => {
    const { container } = renderComponent(<Quiz />, {
      questions,
      isQuizInProgress: true,
      userId: "23232",
    });
    expect(container).toBeTruthy();
  });

  it("renders the question and options", () => {
    const { getByText } = renderComponent(<Quiz />, {
      questions,
      isQuizInProgress: true,
      userId: "23232",
    });
    expect(getByText(questions[0].question)).toBeTruthy();
    expect(getByText(questions[0].options[0])).toBeTruthy();
    expect(getByText(questions[0].options[1])).toBeTruthy();
  });

  it("allows selecting options", async () => {
    const { getByText, getByTestId } = renderComponent(<Quiz />, {
      questions,
      isQuizInProgress: true,
      userId: "23232",
    });
    expect(getByText(questions[0].options[0])).toBeTruthy();
    const option1Checkbox = await getByTestId("input-0");
    expect(option1Checkbox).not.toBeChecked();
    fireEvent.click(option1Checkbox);
    expect(option1Checkbox).toBeChecked();
  });

  it("handles next question click", async () => {
    const { getByText, getByTestId } = renderComponent(<Quiz />, {
      questions,
      isQuizInProgress: true,
      userId: "23232",
    });
    expect(getByText(questions[0].options[0])).toBeTruthy();
    const option1Checkbox = getByTestId("input-0");
    fireEvent.click(option1Checkbox);
    const nextButton = getByText("Next");
    fireEvent.click(nextButton);
    waitFor(() => {
      expect(getByText(questions[1].question)).toBeTruthy();
      expect(getByText(questions[1].options[0])).toBeTruthy();
    });
  });

  it("submits an answer", () => {
    const { getByText, getByTestId } = renderComponent(<Quiz />, {
      questions,
      isQuizInProgress: true,
      userId: "23232",
    });
    const option1Checkbox = getByTestId("input-0");
    fireEvent.click(option1Checkbox);
    const nextButton = getByText("Next");
    fireEvent.click(nextButton);
    waitFor(() => {
      const option2Checkbox = getByText(questions[1].options[0]);
      fireEvent.click(option2Checkbox);
      const submit = getByText("Submit");
      fireEvent.click(submit);
      expect(getByText("Your result")).toBeTruthy();
      expect(getByText("Correct")).toBeTruthy();
      expect(getByText("Incorrect")).toBeTruthy();
    });
  });
});
