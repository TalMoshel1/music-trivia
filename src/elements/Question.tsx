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
  className,
}: {
  question: QuestionInterface;
  getNextQuestion: () => void;
  saveUserAnswer: (userAnswer: userAnswerInterface) => void;
  className?: string;
}) {
  const [begining, setBegining] = useState("");
  const [end, setEnd] = useState("");
  //   const clickedAnswer = useRef<userAnswerInterface>()
  const [answerClicked, setAnswerClicked] = useState<
    undefined | userAnswerInterface
  >(undefined);
  const userAnswer = useRef<any>();

  useEffect(() => {
    const questionBodyWords = question.body.split(" ");
    const questionEnd = questionBodyWords.splice(-2);
    setBegining(questionBodyWords.join(" "));
    setEnd(questionEnd.join(" "));
  });

  useEffect(() => {
    console.log(question);
  }, [question]);

  console.log("new render");

  return (
    <section className={className}>
      {begining && end && (
        <>
          <div className="twoAxisCenter">
            <h2>{begining}</h2>
            <strong className="bold">{end}</strong>
          </div>

            <form>
              {question.answers.map((answer: AnswerInterface, i) => {
                return  <>
                <input
                className="input"
                type="radio"
                id={`${answer.answerId}`}
                name={`${question._id}`}
                value={`${answer.answerId}`}
              />
              <label htmlFor={`${answer.answerId}`} className="answer" onClick={() => {
                      userAnswer.current = answer;
                    }}>
                {answer.body}
              </label></>
                
                // <div
                    // onClick={() => {
                    //   userAnswer.current = answer;
                    // }}
                //   >
                   
                //   </div>
                
              })}
            </form>

          <button
            onClick={() => {
              {
                if (userAnswer.current) {
                  saveUserAnswer({
                    questionId: question._id,
                    answerId: userAnswer.current.answerId,
                  });


                  const inputElements = document.querySelectorAll(
                    'input[type="radio"]'
                  );
                  const inputArray = Array.from(inputElements);
                  inputArray.forEach((input: any)=>{
                        input.checked = false
                  })

                  userAnswer.current = undefined

                  getNextQuestion();
                  
                } else {
                  console.log(userAnswer.current);
                }
              }
            }}
          >
            {" "}
            NEXT
          </button>
        </>
      )}
    </section>
  );
}

export default styled(Question)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 300px;
  min-height: 150px;
  justify-content: space-between;
  width: 100%;

  h2 {
    padding: 20px;
  }

  h2, strong, label {
    text-align: center;
  }

  input {
    display: none;
  }

  .answersContainer form {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: space-evenly;
  }

  input {
    // display: none;
  }

  form {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .answer {
    padding: 15px;
    border: 2px solid black;
    width: 25%;
    margin: 15px;
    display: flex;
    justify-content: center;
  }
  .clickedAnswer {
    background-color: #5552fe;
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
    background-color: #c6b9ff;
    max-width: 200px;
    width: 100%;
  }

  input[type="radio"]:checked + label {
    background-color: #c6b9ff;
  }

  input[type="radio"]:checked + button {
    background-color: black
  }
`;
