import React from 'react';
import './Game.css';
import { WIDTH, HEIGHT } from './snake-game/constant';

export default class Game extends React.Component { 
    render() {
        return (
            <section id="game-container" className="nes-container">
                <canvas id="canvas" width={WIDTH} height={HEIGHT}/>
            </section>
        )
    }
}