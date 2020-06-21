const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomLeft = document.getElementById("bottom-left");
const bottomRight = document.getElementById("bottom-right");
const startBtn = document.getElementById("startBtn");
const turnCount = document.getElementById("count");

let compSequence = [];
let playerSequence = [];
let blocksPlayed = 0;
let turn = 0;
let good = true; // determines whether the player has hit the right colors or not
let compTurn = true; // determines whether it's the computer's turn or the player's turn
let intervalId = 0;
//let strictMode = false; when implementing the strict mode
//let noise = true; when implementing the sound activation
let gameOn = false;
let playerWon = false;
let playerCanClick = true;
let delay = 800;
let numberOfRounds = 3;

let index = null;
// const blockSounds = [
//     "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg", // topLeft
//     "https://actions.google.com/sounds/v1/cartoon/cartoon_cowbell.ogg", // topRight
//     "https://actions.google.com/sounds/v1/cartoon/pop.ogg", // bottomLeft
//     "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg" // bottomRight
// ]

const blockSounds = [
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
]


const gameBlocks = [topLeft, topRight, bottomLeft, bottomRight];


// add random index to sequence (indexes to be used with the blocks array and the sounds array)
function addNewIndex(sequence) {
    sequence.push(parseInt(Math.random() * gameBlocks.length));
}

// make one block lighten itself
function playLight(sequence, index) {
    if (sequence[index] === 0) tLeft();
    if (sequence[index] === 1) tRight();
    if (sequence[index] === 2) bLeft();
    if (sequence[index] === 3) bRight();
}

// play the sound associated with the block lightened
function playSound(sound) {
    let soundPlayed = new Audio(sound);
    soundPlayed.play();
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

function tLeft() {
    playSound(blockSounds[0]);
    //topLeft.classList.add("active");
    topLeft.style.background = "#bbfa5c";
}

function tRight() {
    playSound(blockSounds[1]);
    //topRight.classList.add("active");
    topRight.style.background = "#FFFC36";
}

function bLeft() {
    playSound(blockSounds[2]);
    //bottomLeft.classList.add("active");
    bottomLeft.style.background = "#fa8fd1";
}

function bRight() {
    playSound(blockSounds[3]);
    //bottomRight.classList.add("active");
    bottomRight.style.background = "#00FFFF";
}

function clearBrightColors() {
    // for (let block in gameBlocks) {
    //     block.classList.remove("active");
    // }
    topLeft.style.background = "#74BF04";
    topRight.style.background = "#FFA900";
    bottomLeft.style.background = "#FF36AF";
    bottomRight.style.background = "#1EA4D9";
}

function playBrightColors() {
    // for (let block in gameBlocks) {
    //     block.classList.remove("active");
    // }
    topLeft.style.background = "#bbfa5c";
    topRight.style.background = "#FFFC36";
    bottomLeft.style.background = "#fa8fd1";
    bottomRight.style.background = "#00FFFF";
}

// track blocks clicked by the player and compare them with the original sequence
function compare() {
    if (!playerCanClick) return;

    if (playerSequence[playerSequence.length - 1] !== compSequence[playerSequence.length - 1]) good = false;
    
    if (good === false) {
        playBrightColors();
        setTimeout(() => {
            clearBrightColors();
            playBlocks();
        }, delay);
        gameOver();
    }

    if (playerSequence.length === numberOfRounds && good) {
        playerWon = true;
        winGame();
    } 
    
    if (turn === playerSequence.length && good && !playerWon) {
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
    good = true;
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
    alert ("game over");
    // play game over music - TO BE ADDED
}

function winGame() {
    playBrightColors();
    gameOn = false;
    playerCanClick = true;
    alert ("Congrats you won !!!");
    // play winner music - TO BE ADDED
}

// event-listener sur le bouton start
startBtn.addEventListener('click', () => {
    if (!gameOn) playGame();
});

// even-listener sur les blocks
// function blockClick () {
//     for (let i = 0; i < gameBlocks.length; i++) {
//         if (!gameOn) {
//             gameBlocks[i].addEventListener('click', playLight);
//             // blockSounds[i].addEventListener('click', playSound);

//         } else if (gameOn && playerCanClick) {
//             topLeft.addEventListener('click', /*simonGame.lightSound(block)*/ document.getElementById("top-left").classList.add("active"));
//             playerSequence.push(block);
//             compare(block);
//         }
//     }
// }

//blockClick();

topLeft.addEventListener('click', () => {
    if (!playerCanClick) {
        return;
    } else if (playerCanClick && !gameOn) {
        tLeft();
        setTimeout(() => {
            clearBrightColors();
        }, delay / 4);
    } else if (playerCanClick && gameOn) {
        //let index = gameBlocks.indexOf("topLeft");
        playerSequence.push(0);
        console.log(playerSequence);
        compare();
        tLeft();
        if (!playerWon) {
            setTimeout(() => {
                clearBrightColors();
            }, delay / 4);
        }
    }
});


topRight.addEventListener('click', (event) => {
    if (!playerCanClick) {
        return;
    } else if (playerCanClick && !gameOn) {
        tRight();
        setTimeout(() => {
            clearBrightColors();
        }, delay);
    } else {
        //let index = gameBlocks.indexOf("topRight");
        playerSequence.push(1);
        console.log(playerSequence);
        compare();
        tRight();
        if (!playerWon) {
            setTimeout(() => {
                clearBrightColors();
            }, delay / 4);
        }
    }
});


bottomLeft.addEventListener('click', (event) => {
    if (!playerCanClick) {
        return;
    } else if (playerCanClick && !gameOn) {
        bLeft();
        setTimeout(() => {
            clearBrightColors();
        }, delay);
    } else {
        //let index = gameBlocks.indexOf("bottomLeft");
        playerSequence.push(2);
        console.log(playerSequence);
        compare();
        bLeft();
        if (!playerWon) {
            setTimeout(() => {
                clearBrightColors();
            }, delay / 4);
        }
    }
});

bottomRight.addEventListener('click', (event) => {
    if (!playerCanClick) {
        return;
    } else if (playerCanClick && !gameOn) {
        bRight();
        setTimeout(() => {
            clearBrightColors();
        }, delay);
    } else {
        //let index = gameBlocks.indexOf("bottomRight");
        playerSequence.push(3);
        console.log(playerSequence);
        compare();
        bRight();
        if (!playerWon) {
            setTimeout(() => {
                clearBrightColors();
            }, delay / 4);
        }
    }
});
