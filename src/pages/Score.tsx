import styled from 'styled-components'
import {QuestionInterface, AnswerInterface, userAnswerInterface, scoreInterface} from '../interfaces/api'




function Score({score, className}: {score: scoreInterface, className?: string }) {



  return <section className={className}>{
        score.isMe?
         <h1>{score.name} (me)</h1>: // why score.name doesnt rendered
          <h1>{score.name}</h1>
          }

           <h2>{score.score}</h2></section>
  
        }

export default styled(Score)`

        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 10px;
`
