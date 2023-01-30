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

function App() {
  const [questions, setQuestions] = useState<QuestionInterface[] | []>([])
  const getQuestionUrl = `http://localhost:3000/api/question`;
  const name = useRef<HTMLInputElement>(null)
  const [startGame, setStartGame] = useState(false)
  const context = useContext(GameContext)


  useEffect(()=>{
    console.log('work every render')
    if ( context.boardResult.length && questions.length ) {
        setQuestions(()=>{
            return []
        })
        console.log('startgame : ', startGame)
  }})

  useEffect(()=>{
        fetch(getQuestionUrl)
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{
            setQuestions(res)  
        })
  },[])



  return ( <>
  {(!startGame) && <div>
            <label>please write your name</label>
            <input ref={name}/>
            <button onClick={()=>setStartGame(!startGame)}>start game</button>
            </div> }


        {(startGame && questions) && 
            <Quiz questions={questions} startGame={startGame} setStartGame={setStartGame} name={name.current?.value}></Quiz>
            }

        {(startGame && context.boardResult) && <>
            <Board boardResults={context.boardResult}></Board>
            <button onClick={()=>{setStartGame(!startGame)}}></button>
            </>}
  </>
  )
        }

export default App
