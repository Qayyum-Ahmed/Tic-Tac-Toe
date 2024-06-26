import './TicTacToe.css'
import React, { useState } from 'react';
import circle_icon from '../Assets/circle.png'
import cross_icon from '../Assets/cross.png'
import { useRef } from 'react';
import {useNavigate} from 'react-router-dom'

let data=["","","","","","","","",""]

function TicTacToe() {
  const navigate=useNavigate()
  let [count,setCount]=useState(0);
  let [lock,setLock]=useState(false);
  let titleRef=useRef(null);
  let box1 = useRef(null)
  let box2 = useRef(null)
  let box3 = useRef(null)
  let box4 = useRef(null)
  let box5 = useRef(null)
  let box6 = useRef(null)
  let box7 = useRef(null)
  let box8 = useRef(null)
  let box9 = useRef(null)

  let box_array =[box1,box2,box3,box4,box5,box6,box7,box8,box9]

  const checkWin=()=>{
    if(data[0]===data[1] && data[1]===data[2] && data[2]!=="")
    {
      won(data[2])
    }
    else if(data[3]===data[4] && data[4]===data[5] && data[5]!=="")
    {
      won(data[5])
    }
    else if(data[6]===data[7] && data[7]===data[8] && data[8]!=="")
    {
      won(data[8])
    }
    else if(data[0]===data[3] && data[3]===data[6] && data[6]!=="")
    {
      won(data[6])
    }
    else if(data[1]===data[4] && data[4]===data[7] && data[7]!=="")
    {
      won(data[7])
    }
    else if(data[2]===data[5] && data[5]===data[8] && data[8]!=="")
    {
      won(data[8])
    }
    else if(data[0]===data[4] && data[4]===data[8] && data[8]!=="")
    {
      won(data[8])
    }
    else if(data[0]===data[1] && data[1]===data[2] && data[2]!=="")
    {
      won(data[2])
    }
    else if(data[2]===data[4] && data[4]===data[6] && data[6]!=="")
    {
      won(data[6])
    }
  }
  const won =(winner)=>{
    setLock(true);
    if (winner==="x")
    {
      titleRef.current.innerHTML=`Congratulations: <img src=${cross_icon}> Won`;
    }
    else{
      titleRef.current.innerHTML=`Congratulations: <img src=${circle_icon}> Won`;
    }

  }

  const reset = ()=>{
    setLock(false);
    data=["","","","","","","","",""]
    titleRef.current.innerHTML='Tic Tac Toe';
    box_array.map((e)=>{
      e.current.innerHTML="";
    })
  }

  const minimax = (board, depth, alpha, beta, isMaximizing) => {
    const winner = checkWinner(board);
    if (winner !== null) {
      if (winner === 'x') {
        return -10;
      } else if (winner === 'o') {
        return 10;
      } else {
        return 0;
      }
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = 'o';
          let eval1= minimax(board, depth + 1, alpha, beta, false);
          board[i] = "";
          maxEval = Math.max(maxEval, eval1);
          alpha = Math.max(alpha, eval1);
          if (beta <= alpha) {
            break;
          }
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = 'x';
          let eval1= minimax(board, depth + 1, alpha, beta, true);
          board[i] = "";
          minEval = Math.min(minEval, eval1);
          beta = Math.min(beta, eval1);
          if (beta <= alpha) {
            break;
          }
        }
      }
      return minEval;
    }
  }

  const computer_move = () => {
    let bestScore = -Infinity;
    let bestMove = null;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === "") {
        data[i] = 'o';
        let score = minimax(data, 0, -Infinity, Infinity, false);
        data[i] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  }

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return board.includes("") ? null : "tie";
  }

  const toggle = (e, num) => {
    if (lock) {
      return;
    }
    if (data[num] !== "") {
      return;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}'>`;
      data[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circle_icon}'>`;
      data[num] = "o";
    }
    setCount(count + 2);
    checkWin();

    if (count % 2 === 0 && !lock) {
      let move = computer_move();
      if (move !== null) {
        data[move] = 'o';
        box_array[move].current.innerHTML = `<img src='${circle_icon}'>`;
        setCount(count + 2);
        checkWin();
      }
    }
  }
  const back=()=>{
    navigate(`/`)
  }
  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe</h1>
      <div className='board'>
        <div className='row1'>
          <div className='boxes' ref={box1} onClick={(e)=>{toggle(e,0)}}></div>
          <div className='boxes' ref={box2} onClick={(e)=>{toggle(e,1)}}></div>
          <div className='boxes' ref={box3} onClick={(e)=>{toggle(e,2)}}></div>
        </div>
        <div className='row2'>
          <div className='boxes' ref={box4} onClick={(e)=>{toggle(e,3)}}></div>
          <div className='boxes' ref={box5} onClick={(e)=>{toggle(e,4)}}></div>
          <div className='boxes' ref={box6} onClick={(e)=>{toggle(e,5)}}></div>
        </div>
        <div className='row3'>
          <div className='boxes' ref={box7} onClick={(e)=>{toggle(e,6)}}></div>
          <div className='boxes' ref={box8} onClick={(e)=>{toggle(e,7)}}></div>
          <div className='boxes' ref={box9} onClick={(e)=>{toggle(e,8)}}></div>
        </div>
      </div>
      <button className='reset' onClick={()=>{reset()}}>Reset</button>
      <button className='reset' onClick={()=>{back()}}>Back</button>
    </div>
  );
}

export default TicTacToe;
