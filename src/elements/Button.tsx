import styled from "styled-components";
import React from "react";

import { useEffect, useState, useContext } from 'react'
import reactLogo from './assets/react.svg'
import {QuestionInterface, AnswerInterface, userAnswerInterface, scoreInterface} from '../interfaces/api'
import { useNavigate } from 'react-router-dom'
import Question from '../elements/Question'
import GameProvider from '../store/gameContext'
import { GameContext } from '../store/gameContext';



function Button({text, color, className}: {text: string, className: string, color: string}) {

  return <button className={className}>
        {text}
  </button>
}
    
export default styled(Button) `

padding: 15px;
background-color: ${(props)=>{ return props.color}};
border: 2px solid black;
max-width: 200px;
width: 100%;

`
