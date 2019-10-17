import React from 'react';
import './App.css';

import Game from './components/Game'
import Panel from './components/Panel'
import Rank from './components/Rank'


export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* Top */}
        <div id="status">
          <section className="nes-container with-title">
            <h3 className="title">Information</h3> 
            <div id="texts" className="item">
              <span className="nes-text">Loading model..</span>
            </div>
          </section>
        </div>
        <div id="main">
          <Rank/>
          <div id="game" style={{display: "flex"}}>
            <Game/>
            <Panel/>
          </div>
        </div>
      </div>
    );
  }
}
