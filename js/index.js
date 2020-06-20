class SimonGame {
    constructor(blocks) {
        this.blocks = blocks;
    }
    // pick randomly one block to light
    pickRandomBlock() {
    return this.blocks[parseInt(Math.random() * this.blocks.length)];
    }
}

const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomLeft = document.getElementById("bottom-left");
const bottomRight = document.getElementById("bottom-right");
const startBtn = document.getElementById("startBtn");
const turnCount = document.getElementById("count");
const sound1 = document.getElementById("sound1");
const sound2 = document.getElementById("sound2");
const sound3 = document.getElementById("sound3");
const sound4 = document.getElementById("sound4");

let turn = 0;
let playerCanClick = true;
let delay = 1000;
let numberOfRounds = 20;
let gameOn = false;
let compSequence = [];
let playerSequence = [];

const gameBlocks = [topLeft, topRight, bottomLeft, bottomRight];
const simonGame = new SimonGame(gameBlocks);


// add new block to sequence
function addNewBlock(sequence) {
    sequence.push(simonGame.pickRandomBlock());
}

// make one block lighten itself and play a sound (can be activated through a sequence or by a click)
function lightSound(block) {
    topLeft.className = ("gameBlocks active");
    //play sound - TO BE ADDED
    setTimeout(() => {
        topLeft.className = ("gameBlocks");
    }, delay);
    setTimeout(() => {}, delay / 2);
}

// function to play a sequence of blocks + need to be an async function ???
function playBlocks() {
    playerCanClick = false;
    for (let block in compSequence) {
        lightSound(block);
    }
    playerCanClick = true;
}

// track blocks clicked by the player and compare them with the original sequence
function compare() {
    if (!playerCanClick) return;
    
    if (playerSequence[playerSequence.length - 1] !== compSequence[playerSequence.length - 1]) {
        gameOver();
        endOfGame();
    } else if (playerSequence.length === numberOfRounds && playerSequence[playerSequence.length - 1] === compSequence[playerSequence.length - 1]) {
        winGame();
        endOfGame();
    } else {
        playerCanClick = false;
        // play win music
        turn++;
        turnCount.innerText = turn;
        // start new round
        addNewBlock(compSequence);
        playBlocks();
    }
}            


function playGame() {
    addNewBlock(compSequence);
    console.log(compSequence);
    while (compSequence.length < numberOfRounds) {
        playBlocks();
    }
}

function gameOver() {
    alert ("game over");
    // play game over music - TO BE ADDED
}

function winGame() {
    alert ("Congrats you won !!!");
    // play winner music - TO BE ADDED
}

function endOfGame () {
    compSequence = [];
    playerSequence = [];
    turn = 0;
    gameOn = false;
    playerCanClick = true;
}

// event-listener sur le bouton start
startBtn.addEventListener('click', (event) => {
    turnCount.innerText = "-";
    //playGame();
})

// even-listener sur les blocks
function blockClick () {
    for (let block in simonGame) {
        if (!gameOn) {
            topLeft.addEventListener('click', lightSound(topLeft));
        } else if (gameOn && playerCanClick) {
            topLeft.addEventListener('click', /*simonGame.lightSound(block)*/ document.getElementById("top-left").classList.add("active"));
            playerSequence.push(block);
            compare(block);
        }
    }
}

blockClick();