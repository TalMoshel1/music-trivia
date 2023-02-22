import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import {
  QuestionInterface,
  AnswerInterface,
  userAnswerInterface,
  scoreInterface,
} from "../interfaces/api";
import { GameContext } from "../store/gameContext";
import Score from "./Score";

function Board({ boardResults, className, newGame }: { boardResults: scoreInterface[], className?: string, newGame: () => void }) {
  console.log("boardResult:  ", boardResults);
  const context = useContext(GameContext)
  

  useEffect(()=>{
    context.playSound('')
  })

  function reload() {
    return window.location.reload();
  }

  return <div className={className}>
      <h1 className='bold'>SCORE BOARD</h1>
      <div className='scoresParent'>
        {boardResults.map((score) => {
          return <Score score={score}></Score>;
        })}
      </div>
      <button onClick={newGame}>RESET</button>
        </div>

}

export default styled(Board) `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    min-width: 150px;
    gap: 1.25em;

    .bold {
        font-weight: bold;
        font-size: 1.5rem;
    }
    button {
        padding: 15px;
        border: 2px solid black;
        background-color: #C6B9FF; 
        max-width: 200px;
        width: 100%;
    }



    .scoresParent {
        width: 40%;
        min-width: 150px;
        display: flex;
        flex-direction: column;
        align-items: space-between;
    }

    h1 { 
        text-align: center;
    }

`
