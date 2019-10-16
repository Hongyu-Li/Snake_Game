import Body from "./Body";
import { WIDTH, HEIGHT } from "./constant";
export class Apple {

    body: Body;

    constructor(x: number, y: number) {
        this.body = new Body(x, y);
    }

    setPos(x: number, y: number) {
        this.body.x = x;
        this.body.y = y;
    }

    regenerate(x:number, y:number) {
        this.body.x = Math.floor(((Math.floor(Math.random() * (WIDTH))) / 20)) * 20;
        this.body.y = Math.floor(((Math.floor(Math.random() * (HEIGHT))) / 20)) * 20;
    }

}