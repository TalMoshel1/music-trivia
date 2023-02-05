import { useEffect, useRef, useState } from "react";
import {
  QuestionInterface,
  AnswerInterface,
  userAnswerInterface,
} from "../interfaces/api";
import styled from "styled-components";

function Question({
  question,
  getNextQuestion,
  saveUserAnswer,
  className
}: {
  question: QuestionInterface;
  getNextQuestion: () => void;
  saveUserAnswer: (userAnswer: userAnswerInterface) => void;
  className?: string
}) {
  const [begining, setBegining] = useState("");
  const [end, setEnd] = useState("");
//   const clickedAnswer = useRef<userAnswerInterface>()
  const [answerClicked, setAnswerClicked] = useState<undefined|userAnswerInterface>(undefined)

  useEffect(() => {
    const questionBodyWords = question.body.split(" ");
    const questionEnd = questionBodyWords.splice(-2);
    setBegining(questionBodyWords.join(" "));
    setEnd(questionEnd.join(" "));
  });

  useEffect(()=>{
    console.log(question)
  },[question])


  return (
    <section className={className}>
      {begining && end && (
        <>
        <div className='twoAxisCenter'>
        <h2>{begining}</h2>
          <strong className='bold'>{end}</strong>
        </div>
          
          <div className='answersContainer'>
            {question.answers.map((answer: AnswerInterface) => {
              return <>
              {answerClicked?.answerId === answer.answerId? <div
                  className='clickedAnswer answer'
                  onClick={() => {
                    setAnswerClicked({questionId: question._id, answerId: answer.answerId})
                  }}
                >
                  {answer.body}
                </div>:
                <div
                className='answer'
                onClick={() => {
                  console.log('answer clicked!')
                  setAnswerClicked({questionId: question._id, answerId: answer.answerId})
                }}
              >
                {answer.body}
              </div>
              }
              </>;
            })}
          </div>

          <button onClick={()=>{if (answerClicked) {
            saveUserAnswer(answerClicked);
            getNextQuestion()
            setAnswerClicked(undefined)
          }}}> NEXT</button>
        </>
      )}
    </section>
  );
}

export default styled(Question)`
display:flex;
flex-direction: column;
align-items: center;
max-height: 500px;
height: 50%;
min-height: 400px;

.answersContainer {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: space-evenly
}

.answer {
    padding: 15px;
    border: 2px solid black;
    max-width: 200px;
    width: 100%;
}
.clickedAnswer { 
    background-color: #5552FE;
}

 .bold {
    font-weight: bold;
 }

 .twoAxisCenter {
    display: flex;
    flex-direction: column;
    justify-content: flex-between;
    align-items: center;
 }

 button {
    padding: 15px;
    border: 2px solid black;
    background-color: #C6B9FF; 
    max-width: 200px;
    width: 100%;
 }

`
