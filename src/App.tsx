import React, { useEffect } from 'react';
import './App.css';
import Maze from './components/maze/maze';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
    <div className="App">
      <header className="App-header">
        <Maze/>
      </header>
    </div>
    </RecoilRoot>
  );
}

export default App;
