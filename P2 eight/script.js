let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
boxes.forEach(e => {
    e.innerHTML = "";
    e.style.removeProperty("background-color");
    e.style.color = "black"; // Reset the color to white here
});
boxes.forEach(box => {
    box.innerHTML = "";
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
            highlightTurn(); // Call highlightTurn after each move
                }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "calc(100% / 2)"; // Move right one column
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0"; // Move back to the leftmost position
    }
}


function highlightTurn() {
    const currentPlayer = turn === "X" ? "Player X" : "Player O";
    
    // Remove highlight from all boxes
    boxes.forEach(box => {
        box.classList.remove('turn-highlight');
    });

    // Highlight current player's turn
    document.getElementById("turn-container").querySelector(`.turn-box:nth-child(${turn === "X" ? 1 : 2})`).classList.add('turn-highlight');
}



function checkWin() {
    // Define all possible winning combinations (rows, columns, and diagonals)
    let winConditions = [
        // Rows
        [0, 1, 2, 3, 4], [1, 2, 3, 4, 5], [2, 3, 4, 5, 6], [3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12], [9, 10, 11, 12, 13], [10, 11, 12, 13, 14], [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20], [17, 18, 19, 20, 21], [18, 19, 20, 21, 22], [19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28], [25, 26, 27, 28, 29], [26, 27, 28, 29, 30], [27, 28, 29, 30, 31],
        [32, 33, 34, 35, 36], [33, 34, 35, 36, 37], [34, 35, 36, 37, 38], [35, 36, 37, 38, 39],
        [40, 41, 42, 43, 44], [41, 42, 43, 44, 45], [42, 43, 44, 45, 46], [43, 44, 45, 46, 47],
        [48, 49, 50, 51, 52], [49, 50, 51, 52, 53], [50, 51, 52, 53, 54], [51, 52, 53, 54, 55],
        [56, 57, 58, 59, 60], [57, 58, 59, 60, 61], [58, 59, 60, 61, 62], [59, 60, 61, 62, 63],

        // Columns
        [0, 8, 16, 24, 32], [8, 16, 24, 32, 40], [16, 24, 32, 40, 48], [24, 32, 40, 48, 56],
        [1, 9, 17, 25, 33], [9, 17, 25, 33, 41], [17, 25, 33, 41, 49], [25, 33, 41, 49, 57],
        [2, 10, 18, 26, 34], [10, 18, 26, 34, 42], [18, 26, 34, 42, 50], [26, 34, 42, 50, 58],
        [3, 11, 19, 27, 35], [11, 19, 27, 35, 43], [19, 27, 35, 43, 51], [27, 35, 43, 51, 59],
        [4, 12, 20, 28, 36], [12, 20, 28, 36, 44], [20, 28, 36, 44, 52], [28, 36, 44, 52, 60],
        [5, 13, 21, 29, 37], [13, 21, 29, 37, 45], [21, 29, 37, 45, 53], [29, 37, 45, 53, 61],
        [6, 14, 22, 30, 38], [14, 22, 30, 38, 46], [22, 30, 38, 46, 54], [30, 38, 46, 54, 62],
        [7, 15, 23, 31, 39], [15, 23, 31, 39, 47], [23, 31, 39, 47, 55], [31, 39, 47, 55, 63],

        // Main Diagonals (top-left to bottom-right)
        [0, 9, 18, 27, 36], [1, 10, 19, 28, 37], [2, 11, 20, 29, 38], [3, 12, 21, 30, 39],
        [4, 13, 22, 31, 40], [5, 14, 23, 32, 41], [6, 15, 24, 33, 42], [7, 16, 25, 34, 43],
        [8, 17, 26, 35, 44], [9, 18, 27, 36, 45], [10, 19, 28, 37, 46], [11, 20, 29, 38, 47],
        [12, 21, 30, 39, 48], [13, 22, 31, 40, 49], [14, 23, 32, 41, 50], [15, 24, 33, 42, 51],
        [16, 25, 34, 43, 52], [17, 26, 35, 44, 53], [18, 27, 36, 45, 54], [19, 28, 37, 46, 55],
        [20, 29, 38, 47, 56], [21, 30, 39, 48, 57], [22, 31, 40, 49, 58], [23, 32, 41, 50, 59],
        [24, 33, 42, 51, 60], [25, 34, 43, 52, 61], [26, 35, 44, 53, 62], [27, 36, 45, 54, 63],

        // Diagonals starting from the left column (top to bottom)
        [7, 14, 21, 28, 35], [6, 13, 20, 27, 34], [5, 12, 19, 26, 33], [4, 11, 18, 25, 32],
        [3, 10, 17, 24, 31], [2, 9, 16, 23, 30], [1, 8, 15, 22, 29], [0, 7, 14, 21, 28],

        // Anti-Diagonals (top-right to bottom-left)
        [7, 12, 17, 22, 27], [6, 11, 16, 21, 26], [5, 10, 15, 20, 25], [4, 9, 14, 19, 24],
        [3, 10, 17, 24, 31], [2, 9, 16, 23, 30], [1, 8, 15, 22, 29], [0, 7, 14, 21, 28],

        // Diagonals starting from the right column (top to bottom)
        [3, 12, 21, 30, 39], [4, 13, 22, 31, 40], [5, 14, 23, 32, 41], [6, 15, 24, 33, 42],
        [7, 16, 25, 34, 43], [8, 17, 26, 35, 44], [9, 18, 27, 36, 45], [10, 19, 28, 37, 46]
    ];

    // Iterate through all win conditions
    for (let i = 0; i < winConditions.length; i++) {
        let symbols = winConditions[i].map(index => boxes[index].innerHTML);

        // Check if there are 5 consecutive symbols that are not empty and all the same
        for (let j = 0; j <= symbols.length - 5; j++) {
            let slice = symbols.slice(j, j + 5);
            if (slice.every(symbol => symbol !== "" && symbol === slice[0])) {
                // Game over, highlight winning combination
                isGameOver = true;
                document.querySelector("#results").innerHTML = slice[0] + " wins";
                document.querySelector("#play-again").style.display = "inline";

                // Highlight winning boxes
                winConditions[i].slice(j, j + 5).forEach(index => {
                    boxes[index].style.backgroundColor = "#08D9D6";
                    boxes[index].style.color = "#000";
                });

                return; // Exit function after finding a win
            }
        }
    }

    // Check for draw if all boxes are filled
    let isDraw = true;
    boxes.forEach(box => {
        if (box.innerHTML === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        isGameOver = true;
        document.querySelector("#results").innerHTML = "Draw";
        document.querySelector("#play-again").style.display = "inline";
    }
}


    // Check for draw if all boxes are filled
    let isDraw = true;
    boxes.forEach(box => {
        if (box.innerHTML === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        isGameOver = true;
        document.querySelector("#results").innerHTML = "Draw";
        document.querySelector("#play-again").style.display = "inline";
    }

function checkDraw() {
    if (!isGameOver && Array.from(boxes).every(box => box.innerHTML !== "")) {
        isGameOver = true;
        document.getElementById("results").innerHTML = "Draw";
        document.getElementById("play-again").style.display = "inline";
    }
}

// Assuming your existing JavaScript code includes game logic and event listeners

document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.box');
    const playAgainBtn = document.getElementById('play-again');
    const results = document.getElementById('results');

    // Add click event listener for the play again button
    playAgainBtn.addEventListener('click', function() {
        // Reset game state
        isGameOver = false;
        turn = "X";
        results.innerHTML = ""; // Clear results text
        playAgainBtn.style.display = "none"; // Hide play again button

        // Reset each box in the grid
        boxes.forEach(box => {
            box.innerHTML = "";
            box.style.removeProperty("background-color");
            box.style.color = "black";
        });

        // Reset any additional game state if needed
    });
});

// Ensure your existing game logic and event listeners are properly integrated here
// This includes event listeners for clicking on boxes, checking win conditions, etc.

