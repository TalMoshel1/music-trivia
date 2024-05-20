import { scoreInterface, contextStore } from "../interfaces/api";
import React, { createContext, useEffect, useRef, useState } from "react";
import App from "../App";
import {
  Navigate,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";

export const GameContext = createContext<contextStore>({
  board: null,
  getBoardFromDb: () => {
    return;
  },
  myScore: null,
  postMyScore: (score: scoreInterface) => {
    return;
  },
  setNewBoard: (board: scoreInterface[]) => {
    return;
  },
  boardResult: null,
  setNewBoardResult: (newResult: scoreInterface[] | null) => {
    return;
  },
  playSound: (url: string) => {
    return;
  },
});

const GameProvider = ({ children }: { children?: any }) => {
  const [myScore, setMyScore] = useState<null | scoreInterface>(null);
  const [board, setBoard] = useState<null | scoreInterface[]>(null);
  const [boardResult, setBoardResult] = useState<null | scoreInterface[]>([]);
  const navigate = useNavigate();

  const audioRef = useRef(new Audio());

  const playSound = (soundFile: string) => {
    const audio = audioRef.current;
    audio.src = soundFile;
    audio.play();
    console.log("play sound");
  };

  const postMyScore = async (score: scoreInterface) => {
    setMyScore(score);
  };

  function setNewBoard(newBoard: scoreInterface[]) {
    setBoard(newBoard);
  }

  function setNewBoardResult(newResult: scoreInterface[] | null) {
    setBoardResult(newResult);
  }

  async function getBoardFromDb() {
    fetch("http://localhost:3000/api/score") /*http://localhost:3000 */
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("board: ", board);
        setNewBoard(data);
      });
  }

  useEffect(() => {
    if (myScore !== null) {
      console.log("myScore: ", myScore);
      getBoardFromDb();
    }
  }, [myScore]);

  useEffect(() => {
    if (board) {
      const meInBoard = board.map((score) => {
        if (score._id === myScore?._id) {
          score.isMe = true;
          return score;
        } else {
          return score;
        }
      });
      console.log("me in board: ", meInBoard);
      setBoardResult(meInBoard);
    }
  }, [board]);

  return (
    <GameContext.Provider
      value={{
        myScore,
        postMyScore,
        board,
        getBoardFromDb,
        boardResult,
        setNewBoardResult,
        setNewBoard,
        playSound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
