import {QuestionInterface, AnswerInterface, userAnswerInterface, scoreInterface} from '../interfaces/api'




function Score({score}: {score: scoreInterface }) {

    console.log(score)
  return (
       <section>{score.name} {score.score}</section>
  )
        }

export default Score
