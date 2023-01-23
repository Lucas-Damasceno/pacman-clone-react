import React from 'react';
import logo from './logo.svg';
import './App.css';
import Maze from './components/maze/maze';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Maze></Maze>
      </header>
    </div>
    </RecoilRoot>
  );
}

export default App;
