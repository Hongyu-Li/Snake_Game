export class Record {
    user: string;
    game: string;
    score: number;

    constructor(user, game, score) {
        this.user = user;
        this.game = game;
        this.score = score;
    }
}