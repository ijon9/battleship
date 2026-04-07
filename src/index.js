// import { greeting } from "./greeting.js";
import "./style.css";
import Player from "./player.js";

const p = new Player("human");
const c = new Player("computer");
let gamePhase = "start";
let direction = "h";
let currShip = -1;
let shipLengths = [5, 4, 3, 3, 2];

function generateBoard(player) {
    const container = document.createElement("div");
    container.id = "playerBoard";
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
            if(player.gameboard.board[i][j] >= 0 && player !== c) square.style.backgroundColor = "purple";
            else if(player.gameboard.board[i][j] === -1) square.style.backgroundColor = "rgb(215, 245, 255)";
            else if(player.gameboard.board[i][j] === -2) square.style.backgroundColor = "yellow";
            else if(player.gameboard.board[i][j] === -3) square.style.backgroundColor = "red";
            else if(player.gameboard.board[i][j] === -4) square.style.backgroundColor = "green";
            if(player === c) {
                square.addEventListener("click", (e) => {
                if(gamePhase === "p") {
                    if(c.gameboard.receiveAttack(i, j)) {
                        if(c.gameboard.allSunk()) {
                            gamePhase = "You win!";
                            document.getElementById("msg").textContent = gamePhase;
                        }
                        else {
                            gamePhase = 'c';
                            computerMove();
                        }                        
                    };
                }
                    clearBoards();
                    generateBoards();
                });
            }
            else if(player === p && gamePhase === "start") {
                square.addEventListener("mouseenter", function(e) {
                    player.gameboard.hoverPlace(currShip, direction, i, j);
                    updatePlayerBoard();
                });
                square.addEventListener('mouseleave', function(e) {
                    player.gameboard.removeShip(currShip, direction, i, j);
                    updatePlayerBoard();
                });
                document.addEventListener("keydown", function(e) {
                    if(e.key === "r") {
                        let opposite = direction === "v" ? "h" : "v";
                        player.gameboard.removeShip(currShip, opposite, i, j);
                        updatePlayerBoard();
                    }
                })
                square.addEventListener('click', function(e) {
                    try {
                        if(gamePhase === "start") {
                            player.gameboard.place(currShip, direction, i, j);
                            currShip = -1;
                            generateStart();
                        }
                    }
                    catch(e) {

                    }
                    updatePlayerBoard();
                })
            }
            
        row.appendChild(square);
    }
    container.appendChild(row);
    }
    document.getElementById("container").appendChild(container);
}

function updatePlayerBoard() {
    const board = document.getElementById("playerBoard");
    const rows = board.children;
    for(let i=0; i<rows.length; i++) {
        for(let j=0; j<rows.item(0).children.length; j++) {
            const square = rows[i].children[j];
            if(p.gameboard.board[i][j] >= 0) square.style.backgroundColor = "purple";
            else if(p.gameboard.board[i][j] === -1) square.style.backgroundColor = "rgb(215, 245, 255)";
            else if(p.gameboard.board[i][j] === -2) square.style.backgroundColor = "yellow";
            else if(p.gameboard.board[i][j] === -3) square.style.backgroundColor = "red";
            else if(p.gameboard.board[i][j] === -4) square.style.backgroundColor = "green";
        }
    }
}

function clearBoards() {
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
    clearBoards();
    generateBoards();
    if(p.gameboard.allSunk()) {
        gamePhase = "Computer wins!";
        document.getElementById("msg").textContent = gamePhase;
    }
    else {
        gamePhase = "p";
    }
}

function generateStart() {
    const startDiv = document.getElementById("start");
    startDiv.replaceChildren();
    const instructions = document.createElement("h2");
    instructions.textContent = 'Click "r" to rotate ship';
    startDiv.appendChild(instructions);
    const startContainer = document.createElement("div");
    startContainer.style.display = "flex";
    if(direction === "h") {
        startContainer.style.flexDirection = "column";
        startContainer.style.alignItems = "center";
    }
    else {
        startContainer.style.flexDirection = "row";
        startContainer.style.alignItems = "center";
    }
    startContainer.style.gap = "5px";
    const five = document.createElement("div");
    five.style.display = "flex";
    five.style.flexDirection = direction === "h" ? "row" : "column";
    five.style.padding = "10px";
    five.style.border = "1px solid black";
    five.style.borderRadius = "10px";
    five.style.backgroundColor = currShip === 0 ? "rgb(223, 155, 255)" : (p.gameboard.placed(0) ? "red" : "rgb(215, 245, 255)" ) ;
    five.addEventListener("click", function(e) {
        if(!p.gameboard.placed(0)) {
            if(currShip !== 0) currShip = 0;
            else currShip = -1;
            generateStart();    
        }
    });
    for(let i=0; i<5; i++) {
        let square = document.createElement("div");
        square.style.height = "20px";
        square.style.width = "20px";
        square.style.backgroundColor = "purple";
        square.style.border = "1px solid black"
        five.appendChild(square);
    }
    startContainer.appendChild(five);
    const four = document.createElement("div");
    four.style.display = "flex";
    four.style.flexDirection = direction === "h" ? "row" : "column";
    four.style.padding = "10px";
    four.style.border = "1px solid black";
    four.style.borderRadius = "10px";
    four.style.backgroundColor = currShip === 1 ? "rgb(223, 155, 255)" : (p.gameboard.placed(1) ? "red" : "rgb(215, 245, 255)" ) ;
    four.addEventListener("click", function(e) {
        if(!p.gameboard.placed(1)) {
            if(currShip !== 1) currShip = 1;
            else currShip = -1;
            generateStart();
        }
    });
    for(let i=0; i<4; i++) {
        let square = document.createElement("div");
        square.style.height = "20px";
        square.style.width = "20px";
        square.style.backgroundColor = "purple";
        square.style.border = "1px solid black"
        four.appendChild(square);
    }
    startContainer.appendChild(four);

    const three = document.createElement("div");
    three.style.display = "flex";
    three.style.flexDirection = direction === "h" ? "row" : "column";
    three.style.padding = "10px";
    three.style.border = "1px solid black";
    three.style.borderRadius = "10px";
    three.style.backgroundColor = currShip === 2 ? "rgb(223, 155, 255)" : (p.gameboard.placed(2) ? "red" : "rgb(215, 245, 255)" ) ;
    three.addEventListener("click", function(e) {
        if(!p.gameboard.placed(2)) {
            if(currShip !== 2) currShip = 2;
            else currShip = -1;
            generateStart();
        }
    });
    for(let i=0; i<3; i++) {
        let square = document.createElement("div");
        square.style.height = "20px";
        square.style.width = "20px";
        square.style.backgroundColor = "purple";
        square.style.border = "1px solid black"
        three.appendChild(square);
    }
    startContainer.appendChild(three);

    const three2 = document.createElement("div");
    three2.style.display = "flex";
    three2.style.flexDirection = direction === "h" ? "row" : "column";
    three2.style.padding = "10px";
    three2.style.border = "1px solid black";
    three2.style.borderRadius = "10px";
    three2.style.backgroundColor = currShip === 3 ? "rgb(223, 155, 255)" : (p.gameboard.placed(3) ? "red" : "rgb(215, 245, 255)" ) ;
    three2.addEventListener("click", function(e) {
        if(!p.gameboard.placed(3)) {
            if(currShip !== 3) currShip = 3;
            else currShip = -1;
            generateStart();
        }
        
    });
    for(let i=0; i<3; i++) {
        let square = document.createElement("div");
        square.style.height = "20px";
        square.style.width = "20px";
        square.style.backgroundColor = "purple";
        square.style.border = "1px solid black"
        three2.appendChild(square);
    }
    startContainer.appendChild(three2);

    const two = document.createElement("div");
    two.style.display = "flex";
    two.style.flexDirection = direction === "h" ? "row" : "column";
    two.style.padding = "10px";
    two.style.border = "1px solid black";
    two.style.borderRadius = "10px";
    two.style.backgroundColor = currShip === 4 ? "rgb(223, 155, 255)" : (p.gameboard.placed(4) ? "red" : "rgb(215, 245, 255)" ) ;
    two.addEventListener("click", function(e) {
        if(!p.gameboard.placed(4)) {
            if(currShip !== 4) currShip = 4;
            else currShip = -1;
            generateStart();
        }
    });
    for(let i=0; i<2; i++) {
        let square = document.createElement("div");
        square.style.height = "20px";
        square.style.width = "20px";
        square.style.backgroundColor = "purple";
        square.style.border = "1px solid black"
        two.appendChild(square);
    }
    startContainer.appendChild(two);
    startDiv.appendChild(startContainer);
}

document.addEventListener("keydown", function(e) {
    if(e.key === "r" && gamePhase === "start") {
        direction = direction === "v" ? "h" : "v";
        generateStart();
    }
});

document.getElementById("rand").addEventListener("click" , (e) => {
    p.gameboard.clearAllShips();
    p.gameboard.randomize();
    currShip = -1;
    updatePlayerBoard();
    generateStart();
});

document.getElementById("startGame").addEventListener("click", (e) => {
    if(!p.gameboard.allPlaced()) {
        const msg = document.getElementById("msg");
        msg.textContent = "Ships are not all placed.";
    }
    else {
        c.gameboard.randomize();
        clearBoards();
        generateBoards();
        document.getElementById("start").replaceChildren();
        document.getElementById("msg").textContent = "";
        document.getElementById("buttons").replaceChildren();
        gamePhase = "p";
    }
})
// console.log(greeting);

// p.gameboard.place(0, 'v', 0, 0);
// p.gameboard.place(1, 'v', 0, 4);
// p.gameboard.place(2, 'v', 0, 2);
// p.gameboard.place(3, 'h', 6, 0);
// p.gameboard.place(4, 'h', 9, 2);
// p.gameboard.randomize();

// c.gameboard.place(0, 'v', 0, 0);
// c.gameboard.place(1, 'v', 0, 4);
// c.gameboard.place(2, 'v', 0, 2);
// c.gameboard.place(3, 'h', 6, 0);
// c.gameboard.place(4, 'h', 9, 2);
// c.gameboard.randomize();

// document.getElementById("ranAttack").addEventListener("click", (e) => {
//     computerMove();
// })

generateBoard(p);
generateStart();