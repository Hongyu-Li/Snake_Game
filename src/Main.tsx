
import { Snake, DIRECTION } from './Snake';
import { Apple } from './apple';
import React, {Component} from 'react';
import {HEIGHT, WIDTH, CELL_WIDTH, CELL_HEIGHT} from './constant'

const WHITE = "rgb(255,255,255)"
const RED = "rgb(255,0,0)";
const BLACK = "rgb(0,0,0)";
const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;

export default class Main extends React.Component{
    snake: Snake =  new Snake;
    apple: Apple = new Apple(200,200);
    intervalId: any;

    componentDidMount() {
        this.intervalId = setInterval(()=> {
            this.draw();
            this.snake.move();
        }, 300);
        document.addEventListener("keydown", this.handle_keydown)

        setInterval(()=> {
            if(this.snake.body[0].x === this.apple.body.x && this.snake.body[0].y === this.apple.body.y) {
                this.snake.extend();
                this.apple.regenerate(0, 0);
            }
        }, 5)
    }

    handle_keydown = (event: any) => {
        switch(event.keyCode) {
            case LEFT: this.turnLeft(); break;
            case UP: this.turnUp(); break;
            case RIGHT: this.turnRight(); break;
            case DOWN: this.turnDown(); break;
        }
    }

    draw = () => {
        const ctx: CanvasRenderingContext2D= ((this.refs.canvas as any).getContext("2d")) as CanvasRenderingContext2D
        ctx.clearRect(0,0,WIDTH, HEIGHT);
        ctx.fillStyle = BLACK;
        ctx.fillRect(0,0, WIDTH, HEIGHT);
        ctx.fillStyle = WHITE;
        this.snake.body.forEach(body => {
            ctx.fillRect (body.x,body.y, CELL_WIDTH, CELL_HEIGHT);
        });
        ctx.fillStyle = RED;
        ctx.fillRect(this.apple.body.x, this.apple.body.y, CELL_WIDTH, CELL_HEIGHT);  

    }

    clear = () => {
        clearInterval(this.intervalId);
    }

    turnRight = () => {
        this.snake.direction = DIRECTION.RIGHT;
    }

    turnLeft = () => {
        this.snake.direction = DIRECTION.LEFT;
    }

    turnUp = () => {
        this.snake.direction = DIRECTION.UP;
    }

    turnDown = () => {
        this.snake.direction = DIRECTION.DOWN;
    }

    turnWrapper = () => {

    }

    render() {
        return (
            <div>
                <canvas ref='canvas' width={WIDTH} height={HEIGHT}></canvas>
                <button onClick={this.turnRight}>RIGHT</button>
                <button onClick={this.turnLeft}>LEFT</button>
                <button onClick={this.turnUp}>UP</button>
                <button onClick={this.turnDown}>DOWN</button>
                <button onClick={this.clear}>Clear</button>
            </div>
        )
    }
}