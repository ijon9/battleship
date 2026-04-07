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

    removeShip(ind, dir, x, y) {
        if(ind === -1) return;
        let ship = this.ships[ind];
        if(dir === 'v') {
            if(x+ship.length-1 >= 10) return;
            for(let r=x; r<x+ship.length; r++) {
                if(this.board[r][y] !== -4) return;
            }
            for(let r=x; r<x+ship.length; r++) {
                this.board[r][y] = -1;
            }
        }
        else {
            if(y+ship.length-1 >= 10) return;
            for(let c=y; c<y+ship.length; c++) {
                if(this.board[x][c] !== -4) return;
            }
            for(let c=y; c<y+ship.length; c++) {
                this.board[x][c] = -1;
            }
        }
    }

    hoverPlace(ind, dir, x, y) {
        if(ind === -1) return;
        let ship = this.ships[ind];
        if(dir === 'v') {
            if(x+ship.length-1 >= 10) return;
            for(let r=x; r<x+ship.length; r++) {
                if(this.board[r][y] !== -1) return;
            }
            for(let r=x; r<x+ship.length; r++) {
                this.board[r][y] = -4;
            }
        }
        else {
            if(y+ship.length-1 >= 10) return;
            for(let c=y; c<y+ship.length; c++) {
                if(this.board[x][c] !== -1) return;
            }
            for(let c=y; c<y+ship.length; c++) {
                this.board[x][c] = -4;
            }
        }
    }

    place(ind, dir, x, y) {
        if(ind === -1) return;
        let ship = this.ships[ind];
        if(dir === 'v') {
            if(x+ship.length-1 >= 10) throw "Not enough room.";
            for(let r=x; r<x+ship.length; r++) {
                if(this.board[r][y] !== -1 && this.board[r][y] !== -4) throw "Space occupied.";
            }
            for(let r=x; r<x+ship.length; r++) {
                this.board[r][y] = ship.id;
            }
        }
        else {
            if(y+ship.length-1 >= 10) throw "Not enough room.";
            for(let c=y; c<y+ship.length; c++) {
                if(this.board[x][c] !== -1 && this.board[x][c] !== -4) throw "Space occupied.";
            }
            for(let c=y; c<y+ship.length; c++) {
                this.board[x][c] = ship.id;
            }
        }
        ship.placed = true;
    }

    clearBoard() {
        for(let i=0; i<10; i++) {
            for(let j=0; j<10; j++) {
                this.board[i][j] = -1;
            }
        }
    }

    randomize() {
        this.clearBoard();
        for(let i=0; i<5; i++) {
            const dirs = ['v', 'h'];
            const dir = dirs[Math.floor(Math.random()*2)];
            const x = Math.floor(Math.random()*10);
            const y = Math.floor(Math.random() * 10);
            try {
                this.place(i, dir, x, y);
            }
            catch(e) {
                i--;
            }
        }
        for(let ship of this.ships) {
            ship.placed = true;
        }
    }

    receiveAttack(x, y) {
        if(this.board[x][y] >= 0) {
            let i = this.board[x][y];
            this.ships[i].hit();
            this.board[x][y] = -3;
            return true;
        } else if(this.board[x][y] === -1) {
            this.board[x][y] = -2;
            return true;
        }
        return false;
        
    }

    allSunk() {
        for(let ship of this.ships) {
            if(!ship.isSunk()) return false;
        }
        return true;
    }

    placed(i) {
        return this.ships[i].placed;
    }

    allPlaced() {
        for(let ship of this.ships) {
            if(!ship.placed) return false;
        }
        return true;
    }

    clearAllShips() {
        for(let i=0; i<10; i++) {
            for(let j=0; j<10; j++) {
                this.board[i][j] = -1;
            }
        }
        for(let ship of this.ships) {
            ship.placed = false;
        }
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