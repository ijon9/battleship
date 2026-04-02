// import { greeting } from "./greeting.js";
import "./style.css";
import Player from "./player.js";

const p = new Player("human");
const c = new Player("computer");
let gamePhase = "p";

function generateBoard(p) {
    const container = document.createElement("div");
    // Append new div directly without using p1board
    // Create each row
    for(let i=0; i<10; i++) {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.justifyContent = "center";
        for(let j=0; j<10; j++) {
            const square = document.createElement("div");
            square.style.border = "1px solid black";
            square.style.width = "40px";
            square.style.height = "40px";
            if(p.gameboard.board[i][j] >= 0 && p !== c) square.style.backgroundColor = "purple";
            else if(p.gameboard.board[i][j] === -2) square.style.backgroundColor = "yellow";
            else if(p.gameboard.board[i][j] === -3) square.style.backgroundColor = "red";
            if(p === c) {
                square.addEventListener("click", (e) => {
                if(gamePhase === "p") {
                    if(p.gameboard.receiveAttack(i, j)) {
                        if(c.gameboard.allSunk()) {
                            gamePhase = "Player One wins!";
                            document.getElementById("msg").textContent = gamePhase;

                        }
                        else {
                            gamePhase = 'c';
                            computerMove();
                        }                        
                    };
                }
                clearBoard();
                generateBoards();
            });
        }
        row.appendChild(square);
        }
        container.appendChild(row);
    }
    document.getElementById("container").appendChild(container);
}

function clearBoard() {
    document.getElementById("container").replaceChildren();
}

function generateBoards() {
    generateBoard(p);
    generateBoard(c);
}

function computerMove() {
    if(gamePhase !== 'c') return;
    let arr = [];
    for(let i=0; i<10; i++) {
        for(let j=0; j<10; j++) {
            if(p.gameboard.board[i][j] >= -1) {
                arr.push([i,j]);
            }
        }
    }
    const ran = arr[Math.floor(Math.random() * arr.length)];
    p.gameboard.receiveAttack(ran[0], ran[1]);
    clearBoard();
    generateBoards();
    if(p.gameboard.allSunk()) {
        gamePhase = "Computer wins!";
        document.getElementById("msg").textContent = gamePhase;
    }
    else {
        gamePhase = "p";
    }
    

}
// console.log(greeting);

// p.gameboard.place(0, 'v', 0, 0);
// p.gameboard.place(1, 'v', 0, 4);
// p.gameboard.place(2, 'v', 0, 2);
// p.gameboard.place(3, 'h', 6, 0);
// p.gameboard.place(4, 'h', 9, 2);
p.gameboard.randomize();

// c.gameboard.place(0, 'v', 0, 0);
// c.gameboard.place(1, 'v', 0, 4);
// c.gameboard.place(2, 'v', 0, 2);
// c.gameboard.place(3, 'h', 6, 0);
// c.gameboard.place(4, 'h', 9, 2);
c.gameboard.randomize();

// document.getElementById("ranAttack").addEventListener("click", (e) => {
//     computerMove();
// })

generateBoards();