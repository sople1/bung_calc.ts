import React from 'react';
import './App.css';
import MenuAppBar from "./MenuAppBar";
import Calculator from "./calculator/Calculator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MenuAppBar />
      </header>
      <Calculator />
    </div>
  );
}

export default App;
