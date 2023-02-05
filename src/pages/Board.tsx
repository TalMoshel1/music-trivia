import { useEffect, useState, useContext } from 'react'
import {QuestionInterface, AnswerInterface, userAnswerInterface, scoreInterface} from '../interfaces/api'
import { GameContext } from '../store/gameContext';
import Score from './Score';



function Board({boardResults}: {boardResults: scoreInterface[]}) {
    console.log('boardResult:  ', boardResults)

  return (
    <div>
        {boardResults.map((score)=>{
            return <Score score={score}></Score>
        })}
    </div>

  )
        }

export default Board
