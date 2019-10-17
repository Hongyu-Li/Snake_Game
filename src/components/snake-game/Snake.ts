import Body from './Body'
import { CELL_WIDTH, CELL_HEIGHT } from './constant';
export enum DIRECTION {
    LEFT,UP,RIGHT,DOWN
}

const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;

export class Snake {
    body: Array<Body> = []
    direction: DIRECTION;
    
    constructor() {
        this.body.push(new Body(0,0));
        this.direction = DIRECTION.DOWN;
    }

    extend() {
        const last = this.body[this.body.length-1]
        this.body.push(new Body(last.x, last.y));
    }

    turn = ()=>{
        const head = this.body[0];
        const {x, y}  = head;
        switch(this.direction) {
            case DIRECTION.RIGHT: this.body[0].move(x+CELL_WIDTH, y); break;
            case DIRECTION.LEFT: this.body[0].move(x-CELL_WIDTH, y); break;
            case DIRECTION.DOWN: this.body[0].move(x, y+CELL_HEIGHT); break;
            case DIRECTION.UP: this.body[0].move(x, y-CELL_HEIGHT); break;
        }
    }

    changeDirection = (dir: DIRECTION) => {
        this.direction = dir;
    }

    handle_keydown = (keyCode: number) => {
        console.log(keyCode);
        switch(keyCode) {
            case LEFT: this.changeDirection(DIRECTION.LEFT); break;
            case UP: this.changeDirection(DIRECTION.UP); break;
            case RIGHT: this.changeDirection(DIRECTION.RIGHT); break;
            case DOWN: this.changeDirection(DIRECTION.DOWN); break;
        }
    }

    move() {
        for(let i = this.body.length - 1; i > 0; --i) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        this.turn();
    }

}