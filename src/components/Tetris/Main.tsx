import { game } from "../../GlobalStore";
import { WIDTH, HEIGHT, WHITE, BLACK, CELL_WIDTH, CELL_HEIGHT, RED } from "../../constant";
import { block_T } from "./Block_t"
import { block_L } from "./Block_L";
import { block_O } from "./Block_O";
import { block_Z} from "./Block_Z"
let TURN = false;
let MOVE = 0;

export enum DIRECTION {
    LEFT=37, UP=38, RIGHT=39, DOWN
}

enum BLOCK_TYPE {
    BLOCK_O,
    BLOCK_L,
    BLOCK_T,
}

class Block {
    direction: number = 0;
    x: number = 0;
    y: number = 0;
    Block_data: number[][][];

    constructor(type: number) {
        switch(type) {
            case 1: this.Block_data = block_L;break;
            case 2: this.Block_data = block_T; break;
            case 3: this.Block_data = block_O; break;
            case 4: this.Block_data = block_Z; break;
        }
    }

    willTouch = (data: number[][], x_off: number, y_off:number, dir: number) => {
        const shape = this.Block_data[dir];
        for(let x = 0; x < 4; ++x) {
            for(let y = 0; y < 4; ++y) {
                if(shape[x][y] <= 0){continue;}
                if(this.x + x + x_off >= data.length || this.y + y + y_off >= data[0].length){return true;}
                if(data[this.x+x+x_off][this.y+y+y_off] !== 0){return true;}
            }
        }
        return false;
    }

    printToData = (data, type) => {
        const shape = this.Block_data[this.direction];
        for(let x = 0; x < 4; ++x) {
            for(let y = 0; y < 4; ++y) {
                if(shape[x][y] !== 0) {
                    data[this.x+x][this.y+y] = type;
                }
            }
        }
    }

    fall = (data: number[][]) => {
        this.printToData(data, 0);
        let will_touch = false;
        if(TURN) {
            will_touch = this.willTouch(data,0,0, (this.direction + 1) % 4);
            if(!will_touch) {
                this.direction = (this.direction + 1) % 4;
            }
            TURN = false;
        }
        if(MOVE !== 0) {
            if(MOVE === 1) {
                will_touch = this.willTouch(data,0,-1, this.direction);
                if(!will_touch) {this.y -= 1;}
            } else {
                will_touch = this.willTouch(data, 0, 1, this.direction);
                if(!will_touch){this.y += 1;}
            }
            MOVE = 0;
        }
        if(this.willTouch(data, 1, 0, this.direction)) {
            this.printToData(data, 1);
            return true;
        }
        this.x += 1;
        this.printToData(data, 2);
        return false;
    }
}

const interval = 500;

export class Main {
    ctx: CanvasRenderingContext2D;
    data: number[][]
    WIDTH: number = 300;
    HEIGHT: number = HEIGHT;
    block: Block;
    data_width: number;
    data_height: number;
    gameInterval: NodeJS.Timeout;
    constructor() {
        document.addEventListener('keydown', (event)=>{this.handle_key(event.keyCode)})
        this.ctx = (document.getElementById("canvas") as any).getContext("2d")
        this.ctx.fillStyle = WHITE;
        this.ctx.fillRect(0,0, WIDTH, HEIGHT);
        this.clear();
        this.data_width = this.WIDTH / CELL_WIDTH;
        this.data_height = this.HEIGHT / CELL_HEIGHT;
        this.data = new Array(this.data_height);
        for (let i = 0; i < this.data_height; ++i) {
            this.data[i] = new Array(this.data_width).fill(0);
        }
        this.generateTetris();
    }

    generateTetris = () => {
        const type = Math.floor(Math.random() * Math.floor(4)) + 1;
        this.block = new Block(type);
    }

    clear = () => {
        this.ctx.fillStyle = BLACK;
        this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    }

    fall = () => {
        if(this.block.fall(this.data)) {
            this.generateTetris()
        }

    }

    draw = () => {
        this.clear();
        for (let i = 0; i < this.data_height; ++i) {
            for (let j = 0; j < this.data_width; ++j) {
                if (this.data[i][j] >= 1) {
                    this.ctx.fillStyle = WHITE
                    this.ctx.fillRect(j * CELL_WIDTH, i * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
                }
            }
        }
        this.fall();
    }

    start = () => {
        this.gameInterval = setInterval(this.draw, interval);
    }

    handle_key = (keyCode: Number) => {
        console.log(keyCode)
        switch(keyCode) {
            case DIRECTION.LEFT: MOVE === 0 && (MOVE = 1);break;
            case DIRECTION.RIGHT: MOVE === 0 && (MOVE = 2); break;
            case DIRECTION.UP: TURN = true; break;
        }
    }

    end = () => {
        clearInterval(this.gameInterval);
        game.quit();
    }
}