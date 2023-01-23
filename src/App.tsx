import React from 'react';
import logo from './logo.svg';
import './App.css';
import Maze from './components/maze/maze';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Maze></Maze>
      </header>
    </div>
  );
}

export default App;
