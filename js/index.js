const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomLeft = document.getElementById("bottom-left");
const bottomRight = document.getElementById("bottom-right");
const startBtn = document.getElementById("startBtn");
const turnCount = document.getElementById("count");
const muteBtn = document.getElementById("soundOn");

let compSequence = [];
let playerSequence = [];
let blocksPlayed = 0;
let turn = 0;
let goodGuess = true; // determines whether the player has hit the right colors or not
let compTurn = true; // determines whether it's the computer's turn or the player's turn
let intervalId = 0;
//let strictMode = false; when implementing the strict mode
let soundOn = true;
let gameOn = false;
let playerWon = false;
let playerCanClick = true;
let delay = 1000;
let numberOfRounds = 3;

let index = null;
const blockSounds = [
    "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg", // topLeft
    "https://actions.google.com/sounds/v1/cartoon/cartoon_cowbell.ogg", // topRight
    "https://actions.google.com/sounds/v1/cartoon/pop.ogg", // bottomLeft
    "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg" // bottomRight
]

const gameBlocks = [topLeft, topRight, bottomLeft, bottomRight];


// add random index to sequence (indexes to be used with the blocks array and the sounds array)
function addNewIndex(sequence) {
    sequence.push(parseInt(Math.random() * gameBlocks.length));
}

// make one block lighten itself
function playLight(sequence, index) {
    for (let i = 0; i < gameBlocks.length; i++) {
        if (sequence[index] === i) playBlock(i);
    }
}

// play the sound associated with the block lightened
function playSound(sound) {
    if (soundOn) {
        let soundPlayed = new Audio(sound);
        soundPlayed.play();
    }
}

// function to play a sequence of blocks + need to be an async function ???
function playBlocks() {
    playerCanClick = false;

    if (blocksPlayed === turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearBrightColors();
        playerCanClick = true;
    }

    if (compTurn) {
        clearBrightColors();
        setTimeout(() => {
            playLight(compSequence, blocksPlayed);
            blocksPlayed++;
        }, delay / 4);
    }

    // for (let index in compSequence) {
    //     playLight(gameBlocks[index]);
    //     // playSound(blockSounds[index]);
    // }
    // playerCanClick = true;
}

function playBlock(index) {
    playSound(blockSounds[index]);
    gameBlocks[index].classList.add("active");
    setTimeout(() => gameBlocks[index].classList.remove("active"), delay / 4);
}

function clearBrightColors() {
    for (let i = 0; i < gameBlocks.length; i++) {
        gameBlocks[i].classList.remove("active");
    }
}

function playBrightColors() {
    for (let i = 0; i < gameBlocks.length; i++) {
        gameBlocks[i].classList.add("active");
    }
}

function flashBlocks() {
    playBrightColors();
    //create animation here
}

// track blocks clicked by the player and compare them with the original sequence
function compare() {
    if (!playerCanClick) return;

    if (playerSequence[playerSequence.length - 1] !== compSequence[playerSequence.length - 1]) goodGuess = false;
    
    if (goodGuess === false) {
        playBrightColors();
        setTimeout(() => {
            clearBrightColors();
            playBlocks();
        }, delay);
        gameOver();
    }

    if (playerSequence.length === numberOfRounds && goodGuess) {
        playerWon = true;
        winGame();
    } 
    
    if (turn === playerSequence.length && goodGuess && !playerWon) {
        // play win music
        turn++;
        blocksPlayed = 0;
        playerSequence = [];
        compTurn = true;
        turnCount.innerText = turn;
        intervalId = setInterval(playBlocks, delay);
    }
}

function initializeGame() {
    compSequence = [];
    playerSequence = [];
    blocksPlayed = 0;
    turn = 1;
    intervalId = 0;
    playerWon = false;
    goodGuess = true;
}

function playGame() {
    gameOn = true;
    initializeGame();
    turnCount.innerText = turn;
    for (let i = 0; i < numberOfRounds; i++) {
        addNewIndex(compSequence);
    }
    //console.log(compSequence);
    compTurn = true;
    intervalId = setInterval(playBlocks, delay);
}

function gameOver() {
    gameOn = false;
    playerCanClick = true;
    setTimeout(() => alert ("game over"), delay);
    if (soundOn) playSound("https://actions.google.com/sounds/v1/cartoon/concussive_hit_guitar_boing.ogg");
}

function winGame() {
    flashBlocks(); // TO BE ADDED
    gameOn = false;
    playerCanClick = true;
    setTimeout(() => alert ("Congrats! YOU ROCK!!!"), delay);
    // play winner music - TO BE ADDED
}

// event-listener sur le bouton start
startBtn.addEventListener('click', () => {
    if (!gameOn) playGame();
});

function blocksListeners() {
    for (let i = 0; i < gameBlocks.length; i++) {
        gameBlocks[i].addEventListener('click', (event) => {
            if (!playerCanClick) {
                return;
            } else if (playerCanClick && !gameOn) {
                playBlock(i);
            } else {
                playerSequence.push(i);
                console.log(playerSequence);
                compare();
                playBlock(i);
                // if (!playerWon) {
                //     setTimeout(() => {
                //         clearBrightColors();
                //     }, delay / 4);
                }
            }
        );
    }
}

blocksListeners();

muteBtn.addEventListener('change', () => {
    if(muteBtn.checked) {
        soundOn = false;
    } else {
        soundOn = true;
    }
});

