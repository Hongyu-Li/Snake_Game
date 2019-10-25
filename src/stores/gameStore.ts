import {observable, action} from 'mobx';
import {Main as Snake_main} from "../components/snake-game/Main"
import {Main as Tetris_main} from "../components/Tetris/Main"
interface Game {
    start();
    handle_key(keyCode: number);
    end();
}

export default class GameStore {
    @observable game: string = 'snake';
    @observable score : number = 0;
    @observable isStart: boolean = false;
    @observable Game: Game;

    @action.bound start() {
        this.isStart = true;
        this.Game = this.gameFactory();
        this.Game.start();
    }

    @action.bound changeGame(name: string) {
        this.game = name;
        this.restart();
    }

    @action.bound addScore() {
        this.score++;
    }

    @action.bound resetScore() {
        this.score = 0;
    }

    @action.bound restart() {
        if(!this.Game){
            this.start();
            return;
        }
        this.Game.end();
        this.Game = this.gameFactory();
        this.Game.start();
        this.isStart = true;
    }

    @action.bound handle_key(keyCode: number) {
        if(!this.Game) {
            return
        }
        this.Game.handle_key(keyCode);
    }

    @action.bound quit() {
        this.isStart = false;
        this.Game = null;
    }

    gameFactory(): Game{
        switch(this.game) {
            case "snake": return new Snake_main();
            case "Tetris": return new Tetris_main();
        }
        return null;
    }
};