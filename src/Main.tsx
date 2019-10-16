
import { Snake, DIRECTION } from './Snake';
import { Apple } from './apple';
import React, {Component} from 'react';
import {HEIGHT, WIDTH, CELL_WIDTH, CELL_HEIGHT} from './constant'
import {snake, apple} from "./Shared"
const WHITE = "rgb(255,255,255)"
const RED = "rgb(255,0,0)";
const BLACK = "rgb(0,0,0)";
const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;

export default class Main extends React.Component{
    snake: Snake =  snake;
    apple: Apple = apple
    intervalId: any;

    componentDidMount() {
        this.intervalId = setInterval(()=> {
            this.draw();
            this.snake.move();
        }, 1000);
        document.addEventListener("keydown", this.handle_keydown)

        setInterval(()=> {
            if(this.snake.body[0].x === this.apple.body.x && this.snake.body[0].y === this.apple.body.y) {
                this.snake.extend();
                this.apple.regenerate(0, 0);
            }
            const ctx: CanvasRenderingContext2D= ((this.refs.canvas as any).getContext("2d")) as CanvasRenderingContext2D
            const head = this.snake.body[0];
            // if(head.x < 0 || head.x > WIDTH || head.y < 0 || head.y > HEIGHT) {
            //     clearInterval(this.intervalId);
            //     ctx.fillStyle = WHITE;
            //     ctx.font = "40px Courier"
            //     ctx.fillText("Game Over", 200, 200)
            // }
        }, 5)
    }

    handle_keydown = (event: any) => {
        snake.handle_keydown(event.keyCode)
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

    render() {
        return (
            <div>
                <canvas ref='canvas' width={WIDTH} height={HEIGHT}></canvas>
                <button onClick={()=>snake.changeDirection(DIRECTION.RIGHT)}>RIGHT</button>
                <button onClick={()=>snake.changeDirection(DIRECTION.LEFT)}>LEFT</button>
                <button onClick={()=>snake.changeDirection(DIRECTION.UP)}>UP</button>
                <button onClick={()=>snake.changeDirection(DIRECTION.RIGHT)}>DOWN</button>
                <button onClick={this.clear}>Clear</button>
            </div>
        )
    }
}