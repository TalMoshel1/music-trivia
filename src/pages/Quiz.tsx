import { useEffect, useState, useContext } from "react";
import { QuestionInterface, userAnswerInterface } from "../interfaces/api";
import Question from "../elements/Question";
import { GameContext } from "../store/gameContext";
import styled from "styled-components";

interface QuizProps {
  questions: QuestionInterface[];
  setStartGame: (arg: boolean) => void;
  name: string | undefined;
  className?: string;
}

function Quiz({ questions, setStartGame, name, className }: QuizProps): JSX.Element {
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<userAnswerInterface[]>([]);
  const context = useContext(GameContext);

  async function verifyScores() {
    fetch("http://localhost:3000/api/score", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ answers: userAnswers, name: name }),
    })
      .then((res) => {
        setQuestionNumber(0);
        setUserAnswers([]);
        return res.json();
      })
      .then((res) => {
        context.postMyScore(res);
      });
  }

  function getNextQuestion() {
    if (questionNumber + 1 <= 8) {
      console.log("question number: ", questionNumber);
      setQuestionNumber((prev: number) => prev + 1);
    }
  }

  function saveUserAnswer(userAnswer: userAnswerInterface) {
    setUserAnswers((prev) => [...prev, userAnswer]);
  }

  useEffect(() => {
    if (userAnswers.length === 9) {
      verifyScores();
    }
  }, [userAnswers]);

  if (questions.length > 0) {
    return (

        <Question
        question={questions[questionNumber]}
        getNextQuestion={getNextQuestion}
        saveUserAnswer={saveUserAnswer}
      />
    )
  } else {
    return <></>
  }

}

export default styled(Quiz)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
