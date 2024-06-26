// import './TicTacToe.css'
// import React, { useState } from 'react';
// import circle_icon from '../Assets/circle.png'
// import cross_icon from '../Assets/cross.png'
// import { useRef } from 'react';
import {useNavigate} from 'react-router-dom'

// let data=["","","","","","","","",""]

function Initial() {
    const navigate=useNavigate()
  const vplayer=()=>{
    navigate(`/vplayer`)
  }
  const vcomp=()=>{
    navigate(`/vcomp`)
  }

  return (  
    <div className='container'>
      <h1 className='title'>Tic Tac Toe</h1>
      <button className='reset' onClick={()=>{vplayer()}}>vs player</button>
      <button className='reset' onClick={()=>{vcomp()}}>vs computer</button>
    </div>
  );
}

export default Initial;
