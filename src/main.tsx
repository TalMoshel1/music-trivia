import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Route, Routes, HashRouter } from "react-router-dom";
import  GameProvider  from './store/gameContext';
import Home from './Home'
import Quiz from './pages/Quiz';
import Board from './pages/Board'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <HashRouter>
      <Routes>
        <Route element={<Home></Home>}>
        <Route path='/' element={<App></App>}></Route>
        </Route>

      </Routes>
    </HashRouter>
    
)
