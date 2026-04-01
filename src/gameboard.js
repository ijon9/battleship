import Ship from './ship.js';

export default class Gameboard {
    constructor() {
        this.board = [];
        for(let i=0; i<10; i++) this.board.push(new Array(10).fill(-1));
        this.ships = [];
        // Ship ( id, length, hits, isSunk)
        this.ships.push(new Ship(0, 5, 0, false));
        this.ships.push(new Ship(1, 4, 0, false));
        this.ships.push(new Ship(2, 3, 0, false));
        this.ships.push(new Ship(3, 3, 0, false));
        this.ships.push(new Ship(4, 2, 0, false));
    }

    set board(val) {
        this._board = val;
    }

    get board() {
        return this._board;
    }

    print() {
        for(let i=0; i<10; i++) {
            let str = "";
            for(let n of this.board[i]) {
                str += n + " ";
            }
            console.log(str);
        }
    }

    place(ind, dir, x, y) {
        let ship = this.ships[ind];
        if(dir === 'v') {
            if(x+ship.length-1 >= 10) throw "Not enough room.";
            for(let r=x; r<x+ship.length; r++) {
                if(this.board[r][y] !== -1) throw "Space occupied.";
            }
            for(let r=x; r<x+ship.length; r++) {
                this.board[r][y] = ship.id;
            }
        }
        else {
            if(y+ship.length-1 >= 10) throw "Not enough room.";
            for(let c=y; c<y+ship.length; c++) {
                if(this.board[x][c] !== -1) throw "Space occupied.";
            }
            for(let c=y; c<y+ship.length; c++) {
                this.board[x][c] = ship.id;
            }
        }
    }

    receiveAttack(x, y) {
        if(this.board[x][y] >= 0) {
            let i = this.board[x][y];
            this.ships[i].hit();
            this.board[x][y] = -3;
        } else {
            this.board[x][y] = -2;
        }
        
    }

    allSunk() {
        for(let ship of this.ships) {
            if(!ship.isSunk()) return false;
        }
        return true;
    }
}

// const g = new Gameboard();
// try {
//     g.place(0, 'v', 0, 0);
//     g.receiveAttack(0, 0);
//     g.receiveAttack(1, 0);
//     g.receiveAttack(2, 0);

//     g.receiveAttack(3, 0);
//     g.receiveAttack(4, 0);

//     g.print();
//     console.log(g.ships[0].isSunk());
//     console.log(g.allSunk());
// }
// catch(e) {
//     console.log(e);
// }
// g.print();
// console.log(g.board);