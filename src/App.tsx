import React from 'react';
import './App.css';

import Game from './components/Game'
import Panel from './components/Panel'
import Rank from './components/Rank'
import {Provider} from 'mobx-react'
import {game, record} from './GlobalStore'

export default class App extends React.Component {
  ctx: CanvasRenderingContext2D;
  
  componentDidMount() {
    this.ctx = (document.getElementById("canvas") as any).getContext("2d");
    this.ctx.fillStyle =  "rgb(0,0,0)"
    this.ctx.font = '30px "Press Start 2P"';
    this.ctx.fillText("Show Your Hand", 130, 280);
  }

  render() {
    return (
      <div className="App">
        <div id="status">
          <section className="nes-container with-title">
            <h3 className="title">Information</h3> 
            <div id="texts" className="item">
              <span className="nes-text">Loading model...</span>
            </div>
          </section>
        </div>
        <Provider game={game} record={record}>
          <div id="main" >
            <Rank/>
            <div id="game" style={{display: "flex"}}>
              <Game/>
              <Panel/>
            </div>
          </div>
        </Provider>
      </div>
    );
  }
}
