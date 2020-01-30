import React from 'react';
import logo from './logo.png'

import './App.css';

function App() {
  return (
    <div className="App">
     <img className="logo" src={logo} alt="logo"/>

      <div id="button_1" className="ui green buttons">
        <button className="ui massive button">Client</button>
        <div className="or"></div>
        <button className="ui massive button">Provider</button>
      </div>
    </div>
  );
}

export default App;
