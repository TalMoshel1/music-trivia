import { useEffect, useRef, useState } from "react";
import "./App.css";
import { QuestionInterface } from "./interfaces/api";
import Quiz from "./pages/Quiz";
import { GameContext } from "./store/gameContext";
import { useContext } from "react";
import Board from "./pages/Board";
import styled from "styled-components";
import "@fontsource/poppins";
import ClipLoader from "react-spinners/ClipLoader";

function App({ className }: { className?: string }) {
  const [questions, setQuestions] = useState<QuestionInterface[] | []>([]);
  const getQuestionUrl = `https://music-trivia.onrender.com/api/question`; /*https://music-trivia.onrender.com https://music-trivia.onrender.com*/
  const name = useRef<HTMLInputElement>(null);
  const [startGame, setStartGame] = useState(false);
  const context = useContext(GameContext);

  function reload() {
    return window.location.reload();
  }

  useEffect(() => {
    if (context.boardResult?.length) {
      setQuestions(() => {
        return [];
      });
    }
  }, [context.boardResult]);

  useEffect(() => {
    fetch(getQuestionUrl)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setQuestions(res);
      });
  }, []);

  if (context.boardResult !== null && context.boardResult?.length > 1) {
    return (
      <Board
        newGame={() => {
          setStartGame(false);
          reload();
        }}
        boardResults={context.boardResult}
      ></Board>
    );
  }

  return (
    <div className={className}>
      {!startGame && !!questions.length && (
        <div className="startGame">
          <label>please write your name</label>
          <input ref={name} />
          <button onClick={() => setStartGame(!startGame)}>START</button>
        </div>
      )}

      {startGame && (
        <Quiz
          questions={questions}
          setStartGame={setStartGame}
          name={name.current?.value}
        ></Quiz>
      )}

      {!questions.length && (
        <div className="prepareQuestionsContainer">
          <h1 className="prepareQuestions">Connecting to server...</h1>
          <ClipLoader
            color={"black"}
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
}

export default styled(App)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .startGame {
    width: 80%;
    height: 30%;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .startGame > button {
    padding: 15px;
    background-color: #c6b9ff;
    border: 2px solid black;
    max-width: 200px;
    width: 100%;
  }

  label {
    // background-color: #ffc700;
  }

  input {
    border: 2px solid black;
    padding: 15px;
    max-width: 200px;
    width: 100%;
  }

  .prepareQuestions {
    margin-bottom: 1rem;
  }

  .prepareQuestionsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
