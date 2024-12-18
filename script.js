//--------------------------------------------------------------------------------------------------------------

const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = message;
        controlsDisplay.forEach(control => control.style.display = "block");
    }
    return {
        renderMessage,
    }
})();

//---------------------------------------------------------------------------------------------------------------

const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {

        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}"> ${square} </div>`;
        });

        document.querySelector("#gameboard").innerHTML = boardHTML;

        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick);
        });

    };

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    };

    const getGameboard = () => gameboard;   //Makes gameboard accessible from outside but only to be read

    return {
        render,                    //Only "render" can be access from outside "Gameboard", which is an IIFE
        update,
        getGameboard,
    };


})();

//---------------------------------------------------------------------------------------------------------------

const createPlayer = (name, mark) => {
    return { name, mark }
}

//---------------------------------------------------------------------------------------------------------------

const Game = (() => {

    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        const aiFirst = checkbox.checked;
        document.querySelector("#message").innerHTML = "";
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, "");
        }
        if(aiFirst){
            players=[
                createPlayer(document.querySelector("#player1").value, "O"),
                createPlayer("AI", "X")
            ];
            Gameboard.update(0, "X");
        }else {
            players=[
                createPlayer(document.querySelector("#player1").value, "X"),
                createPlayer("AI", "O")
            ];
        }

        gameOver = false;
        Gameboard.render(); //Maybe this is reduntant, need to check
    };

    const handleClick = (event) => {
        if (gameOver) {
            return;
        }

        let index = parseInt(event.target.id.split("-")[1]);

        if (Gameboard.getGameboard()[index] !== "") {
            return;
        }

        currentPlayerIndex = 0;
        Gameboard.update(index, players[currentPlayerIndex].mark);

        if (checkForWin(Gameboard.getGameboard()) === "X" || checkForWin(Gameboard.getGameboard()) === "O") {
            gameOver = true;
            displayController.renderMessage(`${players[currentPlayerIndex].name} wins`);
        } else if (checkForTie(Gameboard.getGameboard())) {
            gameOver = true;
            displayController.renderMessage("It's a tie!");
        }

        if (!gameOver) {
            aimove();
        };

        currentPlayerIndex = 0;
    };

    const aimove = () => {
        currentPlayerIndex = 1;
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 9; i++) {
                                                        console.log(`AI searching in pos: ${i}`);
            if (Gameboard.getGameboard()[i] === "") {
                Gameboard.update(i, players[1].mark);
                let score = minimax(0, false);
                                                        console.log(`Score: ${score}`);
                Gameboard.update(i, "");
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }            
        }
        currentPlayerIndex = 1;
        Gameboard.update(move, players[currentPlayerIndex].mark);
        if (checkForWin(Gameboard.getGameboard()) === "X" || checkForWin(Gameboard.getGameboard()) === "O") {
            gameOver = true;
            displayController.renderMessage(`${players[currentPlayerIndex].name} wins`);
        } else if (checkForTie(Gameboard.getGameboard())) {
            gameOver = true;
            displayController.renderMessage("It's a tie!");
        }
    }

    const minimax = (depth, isMaximizing) => {

        //console.log(`Depth: ${depth}`);

        if(checkForWin(Gameboard.getGameboard()) === "X"){
            if(checkbox.checked){
                return 1;
            }else{
                return -1;
            };
        }else if(checkForWin(Gameboard.getGameboard()) === "O"){
            if(checkbox.checked){
                return -1;
            }else{
                return 1;
            };
        }else if(checkForTie(Gameboard.getGameboard())){
            return 0;
        }

        if (isMaximizing) {
            currentPlayerIndex = 1;
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (Gameboard.getGameboard()[i] === "") {
                    Gameboard.update(i, players[1].mark);
                    let score = minimax(depth + 1, false);
                    Gameboard.update(i, "");
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else if (!isMaximizing) {
            currentPlayerIndex = 0;
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (Gameboard.getGameboard()[i] === "") {
                    Gameboard.update(i, players[0].mark);
                    let score = minimax(depth + 1, true);
                    Gameboard.update(i, "");
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    return {
        start,
        handleClick
    };

})();

//---------------------------------------------------------------------------------------------------------------

function checkForWin(board) {
    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] === "X" && board[a] === board[b] && board[a] === board[c]) {
            return "X";
        } else if (board[a] === "O" && board[a] === board[b] && board[a] === board[c]) {
            return "O";
        }
    }
    return false;
}

function checkForTie(board) {
    return board.every(cell => cell !== "");
}

//---------------------------------------------------------------------------------------------------------------

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    controlsDisplay.forEach(control => control.style.display = "none");
    Game.start();
})

const checkbox = document.querySelector("#checkbox");

const controlsDisplay = document.querySelectorAll("#controls > *:not(.message-class)");
