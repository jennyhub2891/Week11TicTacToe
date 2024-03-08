const boxs = document.querySelectorAll('.box');
const statusTxt = document.querySelector('#status');
const btnRestart = document.querySelector('#restart');
//Player symbols
let x = "X"
let o = "O"

const win = [ //winning combinations
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
];

//tracks the selected values in the boxes
let options = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let running = false;

//initilaze the game
init();

function init() { //click event listeners to each box and restart button
    boxs.forEach(box => box.addEventListener('click', boxClick));
    btnRestart.addEventListener('click', restartGame);
    statusTxt.textContent = `${player} Your Turn.`;
    running = true;
}

function boxClick() {
    const index = this.dataset.index;
    if (options[index] != "" || !running) {
        return;
    }
    updateBox(this, index);
    checkWinner();
}

function updateBox(box, index) {
    options[index] = player;
    box.innerHTML = currentPlayer;
}

function changePlayer() { //change players turn
    player = (player == 'X') ? "O" : "X";
    currentPlayer = (currentPlayer == x) ? o : x;
    statusTxt.textContent = `${player} Your Turn`;
}

function checkWinner() {
    let isWon = false;
    for (let i = 0; i < win.length; i++) {
        const condition = win[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]];
        const box4 = options[condition[3]];
        if (box1 == "" || box2 == "" || box3 == "" || box4 == "") {
            continue; //compare box1 to box2 and if box 2 is empty continue playing
        }
        if (box1 == box2 && box2 == box3 && box3 == box4) {
            isWon = true; //compare box1 to box2 and if the same for all 1-4 then this player is winner
            condition.forEach(idx => boxs[idx].classList.add('win'));
        }
    }

    if (isWon) { //what to show if we have a winner and stop the game
        statusTxt.textContent = `${player} WINNER!`;
        running = false;
    } else if (!options.includes("")) {
        statusTxt.textContent = `It's a Draw.`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() { //restart clears the game board
    options = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    currentPlayer = x;
    player = "X";
    running = true;
    statusTxt.textContent = `${player} Your Turn`;

    boxs.forEach(box => {
        box.innerHTML = "";
        box.classList.remove('win');
    });
}