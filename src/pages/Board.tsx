import { useEffect, useContext } from "react";
import styled from "styled-components";
import { scoreInterface } from "../interfaces/api";
import Score from "./Score";
import { GameContext } from "../store/gameContext";

interface BoardProps {
  boardResults: scoreInterface[];
  className?: string;
  newGame: () => void;
}

function Board({ boardResults, className, newGame }: BoardProps): JSX.Element {
  console.log("boardResult:  ", boardResults);
  const context = useContext(GameContext);

  useEffect(() => {
    context.playSound('');
  }, [context]);

  if (context.boardResult !== null && context.boardResult?.length > 0) {
    return (
      <div className={className}>
        <h1 className='bold'>SCORE BOARD</h1>
        <div className='scoresParent'>
          {boardResults.map((score, index) => (
            <Score key={index} score={score} />
          ))}
        </div>
        <button onClick={newGame}>RESET</button>
      </div>
    );
  } else {
    return <></>; 
  }
}

export default styled(Board)`
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
    background-color: #c6b9ff;
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
`;
