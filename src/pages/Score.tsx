import {QuestionInterface, AnswerInterface, userAnswerInterface, scoreInterface} from '../interfaces/api'




function Score({score}: {score: scoreInterface }) {

    console.log(score.isMe)

  return (
       <section>{score.name} {score.score} {score.isMe && <h1>me</h1>}</section>
  )
        }

export default Score
