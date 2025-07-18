let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let turnO = true;
let winnerMessage = document.querySelector(".msg");
let playerO = undefined;
let playerX = undefined;
let winner = undefined;
let startButton = document.querySelector("#start");
let game = document.querySelector(".game");

startButton.addEventListener("click", () => {
    playerO = document.getElementById("PlayerO").value;
    playerX = document.getElementById("PlayerX").value;
    if (playerO === "" || playerX === "") {
        alert("Please enter both player names.");
        return;
    }
    game.classList.remove("disabled");
    resetButton.classList.remove("disabled");
    startButton.classList.add("disabled");
});

let winningCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "" && winner === undefined) {
            box.innerText = turnO ? "O" : "X";
            turnO = !turnO;
            checkWinner();
        }
    })
});

function checkWinner() {
    for ( let combination of winningCombinations){
      let position1 = boxes[combination[0]].innerText;
      let position2 = boxes[combination[1]].innerText;
      let position3 = boxes[combination[2]].innerText; 
    if (position1 === position2 && position2 === position3 && position1 !== "" && position2 !== "" && position3 !== "") {
        winner = position1;
        showWinner();
        resetButton.innerText = "Play Again";
        return;
    }
  }
}

function showWinner() {
    if(winner === "O") {
        winnerMessage.innerText += ` ${playerO.toUpperCase()} You Won.`;
    }
    else {
        winnerMessage.innerText += ` ${playerX.toUpperCase()} You Won.`;
    }
    winnerMessage.classList.remove("disabled");
}

resetButton.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
    });
    turnO = true;
    winnerMessage.classList.add("disabled");
    winnerMessage.innerText = "Congratulations!";
    if( resetButton.innerText === "Play Again") {
        resetButton.innerText = "RESET";
    };
    winner = undefined;
});