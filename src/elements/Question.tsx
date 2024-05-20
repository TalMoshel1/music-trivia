import {
  useEffect,
  useRef,
  useState,
  useContext,
  LabelHTMLAttributes,
} from "react";
import {
  QuestionInterface,
  AnswerInterface,
  userAnswerInterface,
} from "../interfaces/api";
import styled, { keyframes } from "styled-components";
import { GameContext } from "../store/gameContext";
import "../App.css";

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
  const [questionAudio, setQuestionAudio] = useState("");
  const [answerAudio, setAnswerAudio] = useState("");
  const [answerClicked, setAnswerClicked] = useState<boolean>(false);
  const [numQuestion, setNumQuestion] = useState(1);
  const [isQuestionBodyScaledUp, setIsQuestionBodyScaledUp] = useState(false);

  const userAnswer = useRef<any>();
  const answerToBeFocused = useRef<any>();

  const context = useContext(GameContext);

  useEffect(() => {
    if (
      answerToBeFocused.current &&
      answerToBeFocused.current.classList.contains("focused")
    ) {
      answerToBeFocused.current.focus();
    }
  }, [
    answerToBeFocused,
    answerToBeFocused.current && answerToBeFocused.current.classList,
  ]);

  useEffect(() => {
    const questionBodyWords = question?.body.split(" ");
    const questionEnd = questionBodyWords?.splice(-2);
    setBegining(questionBodyWords?.join(" "));
    setEnd(questionEnd?.join(" "));
  });

  useEffect(() => {
    const mutatedQuestion = question?.body.replaceAll(" ", "+");
    setQuestionAudio(
      `https://music-trivia.s3.eu-central-1.amazonaws.com/${mutatedQuestion}.aac`
    );
  }, [question]);

  useEffect(() => {
    if (questionAudio && numQuestion < 11) {
      context.playSound(questionAudio);
    }
  }, [questionAudio]);

  useEffect(() => {
    if (answerAudio) {
      context.playSound(answerAudio);
    }
  }, [answerAudio]);

  return (
    <section className={className}>
      {begining && end && (
        <>
          <div
            className={`twoAxisCenter ${
              isQuestionBodyScaledUp && "isQuestionBodyScaledUp"
            }`}
          >
            <h2>{begining}</h2>
            <strong className="bold">{end}</strong>
          </div>

          <form>
            {question?.answers.map((answer: AnswerInterface, i) => {
              return (
                <>
                  <input
                    ref={answerToBeFocused}
                    className={`input ${i == 0 && "focused"}`}
                    type="radio"
                    id={`${answer.answerId}`}
                    name={`${question._id}`}
                    value={`${answer.answerId}`}
                  />
                  <label
                    htmlFor={`${answer.answerId}`}
                    className="answer"
                    onClick={() => {
                      if (!answerClicked) {
                        setAnswerClicked(true);
                      }
                      const mutatedAnswer = answer.body.replaceAll(" ", "+");
                      const answerAudio = `https://music-trivia.s3.eu-central-1.amazonaws.com/${mutatedAnswer}.aac`;
                      setAnswerAudio(answerAudio);
                      userAnswer.current = answer;
                    }}
                  >
                    {answer.body}
                  </label>
                </>
              );
            })}
          </form>

          <button
            className={answerClicked ? "active" : "unactive"}
            onClick={() => {
              {
                if (userAnswer.current) {
                  setIsQuestionBodyScaledUp(false);
                  saveUserAnswer({
                    questionId: question._id,
                    answerId: userAnswer.current.answerId,
                  });
                  const inputElements = document.querySelectorAll(
                    'input[type="radio"]'
                  );
                  const inputArray = Array.from(inputElements);
                  inputArray.forEach((input: any) => {
                    input.checked = false;
                  });
                  userAnswer.current = undefined;
                  setAnswerClicked(false);
                  setAnswerAudio("");
                  setNumQuestion((prev) => {
                    return prev + 1;
                  });
                  getNextQuestion();
                  return;
                }
                setIsQuestionBodyScaledUp(true);
              }
            }}
          >
            NEXT
          </button>
        </>
      )}
    </section>
  );
}

const scaleUpDown = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

export default styled(Question)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 150px;
  justify-content: space-between;
  width: 100%;

  h2 {
    padding: 0.625em;
  }

  h2,
  strong,
  label {
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
    padding: 0.9em;
    border: 2px solid black;
    width: 30%;
    margin: 0.3125em;
    display: flex;
    justify-content: center;
    cursor: pointer;
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
    margin-bottom: 0.9375em;
  }

  button {
    padding: 15px;
    border: 2px solid black;
    background-color: transparent;
    max-width: 200px;
    width: 100%;
    margin-top: 0.9375em;
    cursor: pointer;
  }
  button.active {
    background-color: #c6b9ff;
  }

  input[type="radio"]:checked + label {
    background-color: #5552fe;
  }

  input[type="radio"]:checked + button {
    background-color: black;
  }
`;
