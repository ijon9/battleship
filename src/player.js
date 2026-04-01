import Gameboard from "./gameboard.js";

export default class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
    }

    get gameboard() {
        return this._gameboard;
    }

    set gameboard(val) {
        this._gameboard = val;
    }
}