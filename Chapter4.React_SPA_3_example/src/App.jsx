import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from './page/Main';
import Detail from './page/Detail';
import Search from './page/Search';
import './App.css';
import { useState } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  console.log(navigate);
  return (
    <>
      <header>
        <h1>💚 동물 조아 💚</h1>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={() => navigate(`/search?animal=${inputValue}`)}>검색</button>
      </header>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/detail/:id' element={<Detail />}></Route>
        <Route path='/search' element={<Search />}></Route>
      </Routes>

      <footer>all rights reserved to OZ</footer>
    </>
  );
};

export default App;
