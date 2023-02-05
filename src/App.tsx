import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
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
  const getQuestionUrl = `http://localhost:3000/api/question`;
  const name = useRef<HTMLInputElement>(null)
  const [startGame, setStartGame] = useState(false)
  const context = useContext(GameContext)

  function setGame() {
    setStartGame(!startGame)
  }


  function reload() {
    return window.location.reload();
  }

useEffect(()=>{
    if (context.boardResult?.length) {
        setQuestions(()=>{
            return []
        })
        console.log('why its printin this id boardResult is null')
        console.log(context.boardResult)
    } else {
        console.log('boardResult is not null')
    }
},[context.boardResult])

  useEffect(()=>{
    console.log('start game: ', startGame)
    }, [startGame])

  useEffect(()=>{
        fetch(getQuestionUrl)
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{
            setQuestions(res)  
        })
  },[])

  useEffect(()=>{
    console.log('questions: ', questions)
  },[questions])


  return <div className={className}>
  {(!startGame) && <div className='startGame'>
            <label>please write your name</label>
            <input ref={name}/>
            <button onClick={()=>setStartGame(!startGame)}>START</button>
            </div> }


        {(startGame && questions) && 
            <Quiz questions={questions} setStartGame={setStartGame} name={name.current?.value}></Quiz>
            }

        {(startGame && context.boardResult?.length) && <>
            <Board boardResults={context.boardResult}></Board>
            <button onClick={()=>{setStartGame(false); reload()}}>startGame</button>
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
