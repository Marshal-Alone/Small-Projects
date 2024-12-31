let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let turnO = true;

let newGame = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let clicks = 0;

const winPattern = [
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
        clicks++;
        if (turnO) {
            box.innerText = 'O';
            turnO = false;
        } else {
            box.innerText = 'X';
            turnO = true;
        }
        box.disabled = true;

        // checkWinner();
        let isWinner = checkWinner();
        if (clicks == 9 && !isWinner ) {
            console.log("DRAW");
            showDraw();
        }
    });
});

const resetGame = () => {
    let clicks = 0;
    turnO = true;
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false; // Enable all boxes
    });
    msgContainer.classList.add("hide");
};

resetBtn.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos1Val === pos3Val) {
            showWinner(pos1Val);
            return; // Exit the function after finding a winner
        }

        
    }

    // Check for draw
    // const isDraw = Array.from(boxes).every(box => box.innerText !== "");
    
};

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = `IT'S A DRAW!!!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};