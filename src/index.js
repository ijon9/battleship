// import { greeting } from "./greeting.js";
import "./style.css";
import Player from "./player.js";

function generateBoard(p, num) {
    const container = num === 1 ? document.querySelector("#p1Board") : document.querySelector("#p2Board");
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
            if(p.gameboard.board[i][j] >= 0) square.style.backgroundColor = "purple";
            else if(p.gameboard.board[i][j] === -2) square.style.backgroundColor = "yellow";
            else if(p.gameboard.board[i][j] === -3) square.style.backgroundColor = "red";
            row.appendChild(square);
        }
        container.appendChild(row);
    }
}
// console.log(greeting);
const p = new Player("human");
const c = new Player("computer");
p.gameboard.place(0, 'v', 0, 0);
p.gameboard.place(1, 'v', 0, 4);
p.gameboard.place(2, 'v', 0, 2);
p.gameboard.place(3, 'h', 6, 0);
p.gameboard.place(4, 'h', 9, 2);
// p.gameboard.receiveAttack(0, 0);
// p.gameboard.receiveAttack(5, 2);

c.gameboard.place(0, 'v', 0, 0);
c.gameboard.place(1, 'v', 0, 4);
c.gameboard.place(2, 'v', 0, 2);
c.gameboard.place(3, 'h', 6, 0);
c.gameboard.place(4, 'h', 9, 2);

generateBoard(p, 1);
generateBoard(c, 2);