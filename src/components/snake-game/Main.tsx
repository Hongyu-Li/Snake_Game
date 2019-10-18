
import { Snake, DIRECTION } from './Snake';
import { Apple } from './apple';
import {HEIGHT, WIDTH, CELL_WIDTH, CELL_HEIGHT} from './constant'
const WHITE = "rgb(255,255,255)"
const RED = "rgb(255,0,0)";
const BLACK = "rgb(0,0,0)";
const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;


export class Main{
    snake: Snake;
    apple: Apple;
    drawIntervalId: NodeJS.Timeout;
    collisionIntervalId: NodeJS.Timeout;
    ctx: CanvasRenderingContext2D;

    constructor() {
        this.snake = new Snake();
        this.snake.start(1);
        this.apple = new Apple(200, 200);
        this.ctx = (document.getElementById("canvas") as any).getContext("2d")
    }

    start = ():void => {
        this.drawIntervalId = setInterval(()=> {
            this.draw();
            this.snake.move();
        }, 1000);

        this.collisionIntervalId = setInterval(()=> {
            if(this.snake.body[0].x === this.apple.body.x && this.snake.body[0].y === this.apple.body.y) {
                this.snake.extend();
                this.apple.regenerate(0, 0);
            }
            const head = this.snake.body[0];
            if(head.x < 0 || head.x > WIDTH || head.y < 0 || head.y > HEIGHT) {
                this.ctx.fillStyle = WHITE;
                this.ctx.font = "80px serif";
                this.ctx.fillText("press restart ", 200, 250);
                this.end();
            }
        }, 5)
    }

    handle_key = (keyCode: number): void => {
        this.snake.handle_keydown(keyCode)
    }

    draw = ():void => {
        this.ctx.clearRect(0,0,WIDTH, HEIGHT);
        this.ctx.fillStyle = BLACK;
        this.ctx.fillRect(0,0, WIDTH, HEIGHT);
        this.ctx.fillStyle = WHITE;
        this.snake.body.forEach(body => {
            this.ctx.fillRect (body.x,body.y, CELL_WIDTH, CELL_HEIGHT);
        });
        this.ctx.fillStyle = RED;
        this.ctx.fillRect(this.apple.body.x, this.apple.body.y, CELL_WIDTH, CELL_HEIGHT);  
    }

    end = ():void => {
        clearInterval(this.drawIntervalId);
        clearInterval(this.collisionIntervalId)
    }
}