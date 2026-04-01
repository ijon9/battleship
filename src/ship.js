export default class Ship {
    constructor(id, len, hits, sunk) {
        this.id = id;
        this.length = len;
        this.hits = hits;
        this.sunk = sunk;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id= id;
    }
    
    get length() {
        return this._length;
    }

    set length(val) {
        this._length = val;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits === this.length;
    }
}

// const s = new Ship(5, 0, false);
// s.hit();
// s.hit();
// s.hit();
// s.hit();
// console.log(s.isSunk());
// s.hit();
// console.log(s.isSunk());
