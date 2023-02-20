import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import 'App.css'
import {QuestionInterface, scoreInterface} from './interfaces/api'
import Quiz from './pages/Quiz'
import {GameContext} from './store/gameContext'
import { useContext } from 'react'
import Board from './pages/Board'
import GameProvider from './store/gameContext'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import "@fontsource/poppins";
import Button from './elements/Button'

function App({className}: {className?: string}) {
  const [questions, setQuestions] = useState<QuestionInterface[] | []>([])
  const getQuestionUrl = `https://music-trivia.onrender.com/api/question`;
  const name = useRef<HTMLInputElement>(null)
  const [startGame, setStartGame] = useState(false)
  const context = useContext(GameContext)



  function reload() {
    return window.location.reload();
  }

useEffect(()=>{
    if (context.boardResult?.length) {
        setQuestions(()=>{
            return []
        })

    }
},[context.boardResult])


  useEffect(()=>{
        fetch(getQuestionUrl)
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{
            setQuestions(res)  
        })
  },[])


  return <div className={className}>
  {(!startGame) && <div className='startGame'>
            <label>please write your name</label>
            <input ref={name}/>
            <button onClick={()=>setStartGame(!startGame)}>START</button>
            </div> }


        {(startGame && !!questions.length) && 
            <Quiz questions={questions} setStartGame={setStartGame} name={name.current?.value}></Quiz>
            }

        {(startGame && !!context.boardResult?.length ) && <>
            <Board newGame={()=>{setStartGame(false); reload()}} boardResults={context.boardResult}></Board>
            </>}
  
        </div>
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
        background-color: #C6B9FF;
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

`
