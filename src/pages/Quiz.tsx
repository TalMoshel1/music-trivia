import { useEffect, useState, useContext } from 'react'
import reactLogo from './assets/react.svg'
import {QuestionInterface, AnswerInterface, userAnswerInterface, scoreInterface} from '../interfaces/api'
import { useNavigate } from 'react-router-dom'
import Question from '../elements/Question'
import GameProvider from '../store/gameContext'
import { GameContext } from '../store/gameContext';



function Quiz({questions, startGame, setStartGame, name}: {questions:  QuestionInterface[],startGame: boolean, setStartGame: (arg: boolean) => void, name: string | undefined }) {
const [questionNumber, setQuestionNumber] = useState<number>(0) // 0 - 9
const [userAnswers, setUserAnswers] = useState<[]|userAnswerInterface[]>([])
const context = useContext(GameContext)


async function verifyScores() {
    fetch('http://localhost:3000/api/score', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: "include",
        headers: {
            'Content-type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({answers: userAnswers, name: name})

      })
      .then((res)=>{
        setQuestionNumber(0)
        setUserAnswers(()=>{
            return []
        })
         return res.json()
      }).then((res)=>{
        context.postMyScore(res)
      })
}

function getNextQuestion() {
    if (questionNumber + 1 <= 9) {
        setQuestionNumber((prev: number)=>{
            console.log(prev + 1)
            return prev+ 1
        })
    }
}

function saveUserAnswer(userAnswer: userAnswerInterface) {
    setUserAnswers((prev)=>{
        return [...prev, userAnswer ]
    })
}

useEffect(()=>{
    if (userAnswers.length === 10) {
        verifyScores()
    }
},[userAnswers])

useEffect(()=>{
    if(context.boardResult.length) {
        console.log('result ',context.boardResult)
    }
})


  return (
    <div>
            {questions.length &&<Question question={questions[questionNumber]} getNextQuestion={getNextQuestion} saveUserAnswer={saveUserAnswer}></Question>}

    </div>
       
  )
        }

export default Quiz
