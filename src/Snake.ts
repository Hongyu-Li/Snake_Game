import Body from './Body'
import { CELL_WIDTH, CELL_HEIGHT } from './constant';
export enum DIRECTION {
    LEFT,UP,RIGHT,DOWN
}

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

    move() {
        for(let i = this.body.length - 1; i > 0; --i) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        this.turn();
    }

}