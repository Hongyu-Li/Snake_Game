
import { Snake } from './Snake';
import { Apple } from './apple';
import {HEIGHT, WIDTH, CELL_WIDTH, CELL_HEIGHT} from './constant'
import { game } from '../../GlobalStore';
import { record } from '../../GlobalStore';
import { Record } from './Record';
const WHITE = "rgb(255,255,255)"
const RED = "rgb(255,0,0)";
const BLACK = "rgb(0,0,0)";


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
        }, 500);

        this.collisionIntervalId = setInterval(()=> {
            if(this.snake.body[0].x === this.apple.body.x && this.snake.body[0].y === this.apple.body.y) {
                this.snake.extend();
                this.apple.regenerate(0, 0);
            }
            if(this.died()) {
                this.ctx.fillStyle = WHITE;
                this.ctx.font = '20px "Press Start 2P"';
                this.ctx.fillText("Hands Up to Restart", 180, 250);
                this.end();
            }
        }, 5)
    }

    died = () => {
        const head = this.snake.body[0];
        if(head.x < 0 || head.x > WIDTH || head.y < 0 || head.y > HEIGHT) {
            return true;
        }
        for(let i = 1; i < this.snake.body.length; ++i) {
            if(head.x === this.snake.body[i].x && head.y === this.snake.body[i].y) {
                return true;
            }
        }
        return false;
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
        clearInterval(this.collisionIntervalId);
        record.addRecord(new Record(record.player,"snake",this.snake.body.length-1));
        game.quit();
    }
}