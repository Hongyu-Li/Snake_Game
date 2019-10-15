export default class Body {
    x: number;
    y: number;

    constructor(x: number,y: number) {
        this.x = x;
        this.y = y;
    }

    move(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}