import { useEffect, useRef, useState } from "react";
import {
  QuestionInterface,
  AnswerInterface,
  userAnswerInterface,
} from "../interfaces/api";

function Question({
  question,
  getNextQuestion,
  saveUserAnswer,
}: {
  question: QuestionInterface;
  getNextQuestion: () => void;
  saveUserAnswer: (userAnswer: userAnswerInterface) => void;
}) {


  useEffect(() => {}, []);

  return (
    <section>
      <h2>{question.body}</h2>
      <div>
        {question.answers.map((answer: AnswerInterface) => {
          return <div onClick={()=>{getNextQuestion(); saveUserAnswer({questionId: question._id, answerId: answer.answerId})}}>{answer.body}</div>;
        })}
      </div>
    </section>
  );
}

export default Question;
