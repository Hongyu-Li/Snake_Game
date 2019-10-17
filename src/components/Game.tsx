import React from 'react';
import './Game.css';
import Main from './snake-game/Main';

export default class Game extends React.Component { 
    render() {
        return (
            <section id="game-container" className="nes-container">
                <Main/>
            </section>
        )
    }
}