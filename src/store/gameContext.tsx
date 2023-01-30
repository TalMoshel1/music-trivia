import { scoreInterface, contextStore } from "../interfaces/api";
import React, { createContext, useEffect, useState } from "react";
import  App  from '../App'
import { Navigate, useLocation, useParams, useNavigate } from "react-router-dom";

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
    return
  },
  boardResult: []
});

const GameProvider = ({ children }: { children?: any }) => {
  const [myScore, setMyScore] = useState<null | scoreInterface>(null);
  const [board, setBoard] = useState<null | scoreInterface[]>(null);
  const [boardResult, setBoardResult] = useState<[] | scoreInterface[]>([])
  const navigate = useNavigate()

  const postMyScore = async (score: scoreInterface) => {
    setMyScore(score);
  };

  function setNewBoard(newBoard: scoreInterface[]) {
    setBoard(newBoard)
  }

  async function getBoardFromDb() {
    fetch("http://localhost:3000/api/score")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setNewBoard(data);
      });
  }


  useEffect(() => {
    if (myScore !== null) {
        getBoardFromDb()
    }
  }, [myScore]);

  useEffect(()=>{
    if (board) {
        const meInBoard = board.map((score)=>{
            if (score._id === myScore?._id) {
                score.name === 'you'
                return score
            }
            else {
                return score
            }
        })
        console.log('meInBoard length', meInBoard.length )
        setBoardResult(meInBoard)
    }
  },[board])

  useEffect(()=>{
    if ( boardResult.length) {
        navigate('/')
    }
  },[boardResult])








  return (
    <GameContext.Provider value={{ myScore, postMyScore, board, getBoardFromDb, boardResult, setNewBoard }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
