import './App.css';
import TicTacToe from './Components/TicTacToe/TicTacToe';
import TicTacToe2 from './Components/TicTacToe2/TicTacToe2';
import Initial from './Components/Initial/Initial';
import { BrowserRouter,Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
            <Route path="/" element={<Initial/>}/>
            <Route path="/vplayer" element={<TicTacToe2 />}/>
            <Route path="/vcomp" element={<TicTacToe />}/>
            
        </Routes>
        </BrowserRouter>
      {/* <TicTacToe/> */}
      <div className='credit'>
      made by Qayyum Ahmed
      </div>
    </div>
  );
}

export default App;
