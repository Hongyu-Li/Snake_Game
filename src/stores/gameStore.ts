import {observable, action} from 'mobx';

export default class GameStore {
    @observable game: string = 'snake';
    @observable score : number = 0;
    @observable isStart: boolean = false;
    @observable isOver: boolean = false;

    @action.bound start() {
        this.isStart = true;
    }

    @action.bound addScore() {
        this.score++;
    }

    @action.bound resetScore() {
        this.score = 0;
    }
};