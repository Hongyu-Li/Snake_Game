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
            <section className="topic">
              <h3 className="topic-title"><i className="nes-icon star"></i>Core Team Members</h3>
              <div className="coreteam-members">
                <section className="nes-container is-dark member-card">
                  <div className="avatar">
                    <img alt="Core Member Hongyu Li" className="" src="https://github.com/Hongyu-Li.png?size=80"/>
                  </div>
                  <div className="profile"><h4 className="name">Hongyu Li</h4><div><a href="https://github.com/Hongyu-Li" target="_blank" rel="noopener" aria-label="github"><i className="nes-icon github"></i></a></div></div>
                </section>
                <section className="nes-container is-dark member-card">
                  <div className="avatar">
                    <img alt="Core Member Jiale Lv" className="" src="https://github.com/Amuro1997.png?size=80"/>
                  </div>
                  <div className="profile"><h4 className="name">Jiale Lv</h4><div><a href="https://github.com/Amuro1997" target="_blank" rel="noopener" aria-label="github"><i className="nes-icon github"></i></a></div></div>
                </section>
                <section className="nes-container is-dark member-card">
                  <div className="avatar">
                    <img alt="Core Member Jiahuan Yang" className="" src="https://github.com/TokenJan.png?size=80"/>
                  </div>
                  <div className="profile"><h4 className="name">Jiahuan Yang</h4><div><a href="https://github.com/TokenJan" target="_blank" rel="noopener" aria-label="github"><i className="nes-icon github"></i></a></div></div>
                </section>
              </div>
            </section>
          </div>
        </Provider>
      </div>
    );
  }
}
