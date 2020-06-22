const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomLeft = document.getElementById("bottom-left");
const bottomRight = document.getElementById("bottom-right");
const startBtn = document.getElementById("startBtn");
const turnCount = document.getElementById("count");
const muteBtn = document.getElementById("soundOn");
const strictBtn = document.getElementById("strictMode");

let compSequence = [];
let playerSequence = [];
let blocksPlayed = 0;
let turn = 0;
let goodGuess = true; // determines whether the player has hit the right colors or not
let compTurn = false; // determines whether it's the computer's turn or the player's turn
let intervalId = 0;
let strictMode = true;
let soundOn = true;
let gameOn = false;
let playerWon = false;
let delay = 1000;
let numberOfRounds = 3;

//--------- variables depending on the level chosen -------//
const blockSounds = [
  "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg", // topLeft
  "https://actions.google.com/sounds/v1/cartoon/cartoon_cowbell.ogg", // topRight
  "https://actions.google.com/sounds/v1/cartoon/pop.ogg", // bottomLeft
  "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg", // bottomRight
];
const gameBlocks = [topLeft, topRight, bottomLeft, bottomRight];
//---------------------------------------------------------//

// add random index to sequence (indexes to be used with the blocks array and the sounds array)
function addNewIndex(sequence) {
  sequence.push(parseInt(Math.random() * gameBlocks.length));
}

// activate sound
function playSound(sound) {
  if (soundOn) {
    let soundPlayed = new Audio(sound);
    soundPlayed.play();
  }
}

// activate light of a block
function playLight(index) {
  gameBlocks[index].classList.add("active");
  setTimeout(() => gameBlocks[index].classList.remove("active"), delay / 2);
}

// activate sound and light of a specific block inside a sequence of blocks to be played
function playBlockOfSequence(sequence, index) {
  for (let i = 0; i < gameBlocks.length; i++) {
    if (sequence[index] === i) {
      playLight(i);
      playSound(blockSounds[i]);
    }
  }
}

function playCompSequence() {
  let i = 0;
  intervalId = setInterval(function () {
    if (i < compSequence.length) {
      playBlockOfSequence(compSequence, i);
    } else {
      return;
    }
    i++;
  }, delay);
  setTimeout(() => {
      compTurn = false
  }, delay * compSequence.length);
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
  //CREATE ANIMATION HERE
}

// function to play a sequence of blocks
function playBlocks() {
  clearInterval(intervalId);
  compTurn = true;
  turn++;
  turnCount.innerText = turn;

  addNewIndex(compSequence);
  playCompSequence();
}

// compare the blocks clicked by the player to the original sequence
function compare() {
  if (
    playerSequence[playerSequence.length - 1] !==
    compSequence[playerSequence.length - 1]
  )
    goodGuess = false;

  if (goodGuess === false) {
    if (strictMode) {
      setTimeout(() => {
        playBrightColors();
      }, delay / 2);
      setTimeout(() => {
        clearBrightColors();
      }, delay);
      gameOver();
    } else {
      //ADD try again sound
      blocksPlayed = 0;
      playerSequence = [];
      goodGuess = true;
      compTurn = true;
      playCompSequence();
    }
  }

  if (playerSequence.length === numberOfRounds && goodGuess) {
    playerWon = true;
    winGame();
  }

  if (turn === playerSequence.length && goodGuess && !playerWon) {
    blocksPlayed = 0;
    playerSequence = [];
    compTurn = true;
    setTimeout(playBlocks, delay);
  }
}

function initializeGame() {
  clearBrightColors();
  compSequence = [];
  playerSequence = [];
  blocksPlayed = 0;
  turn = null;
  intervalId = 0;
  playerWon = false;
  goodGuess = true;
}

function startGame() {
  gameOn = true;
  initializeGame();
  compTurn = true;
  playBlocks();
}

function gameOver() {
  gameOn = false;
  compTurn = false;
  setTimeout(() => alert("game over"), delay);
  if (soundOn)
    playSound(
      "https://actions.google.com/sounds/v1/cartoon/concussive_hit_guitar_boing.ogg"
    );
}

function winGame() {
  setTimeout(() => flashBlocks(), delay / 2); // TO BE ADDED
  gameOn = false;
  compTurn = false;
  setTimeout(() => alert("Congrats! YOU ROCK!!!"), delay);
  // play winner music - TO BE ADDED
}

// event-listener sur le bouton start
startBtn.addEventListener("click", () => {
  if (!gameOn) startGame();
});

function blocksListeners() {
  for (let i = 0; i < gameBlocks.length; i++) {
    gameBlocks[i].addEventListener("click", (event) => {
      if (compTurn) {
        return;
      } else if (!compTurn && !gameOn) {
        playLight(i);
        playSound(blockSounds[i]);
      } else {
        playerSequence.push(i);
        compare();
        playLight(i);
        if (goodGuess) playSound(blockSounds[i]);
      }
    });
  }
}

blocksListeners();

muteBtn.addEventListener("change", () => (muteBtn.checked) ? soundOn = false : soundOn = true);

strictBtn.addEventListener("change", () => (strictBtn.checked) ? strictMode = true : strictMode = false);