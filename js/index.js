//--------- variables depending on the level chosen -------//
const cartoonSounds = [
  "./sounds/cartoons/boing.ogg", // topLeft
  "./sounds/cartoons/kiss.mp3", // topRight
  "./sounds/cartoons/pop.mp3", // bottomLeft
  "./sounds/cartoons/flicks.ogg", // bottomRight
  "./sounds/cartoons/bounce.mp3", // topMiddle
  "./sounds/cartoons/swoosh.mp3", // bottomMiddle
  "./sounds/cartoons/prick.mp3", // middleLeft
  "./sounds/cartoons/squash.mp3", // middleMiddle
  "./sounds/cartoons/bounce2.mp3", // middleRight
];

const farmSounds = [
  "./sounds/farm/bull.mp3", // topLeft
  "./sounds/farm/cock.mp3", // topRight
  "./sounds/farm/horse.mp3", // bottomLeft
  "./sounds/farm/sheep.mp3", // bottomRight
];

const classicSounds = [
  "./sounds/classic/simonSound1.mp3", // topLeft
  "./sounds/classic/simonSound2.mp3", // topRight
  "./sounds/classic/simonSound3.mp3", // bottomLeft
  "./sounds/classic/simonSound4.mp3", // bottomRight
];

const electroSounds = [
  "./sounds/electro/electro1.mp3", // topLeft
  "./sounds/electro/electro2.mp3", // topRight
  "./sounds/electro/electro3.mp3", // bottomLeft
  "./sounds/electro/electro4.mp3", // bottomRight
  "./sounds/electro/electro5.mp3", // topMiddle
  "./sounds/electro/electro6.mp3", // bottomMiddle
  "./sounds/electro/electro7.mp3", // middleLeft
  "./sounds/electro/electro8.mp3", // middleMiddle
  "./sounds/electro/electro9.mp3", // middleRight
];
//---------------------------------------------------------//

const topLeft = document.getElementById("top-left");
const topMiddle = document.getElementById("top-middle");
const topRight = document.getElementById("top-right");
const middleLeft = document.getElementById("bottom-left");
const middleMiddle = document.getElementById("bottom-left");
const middleRight = document.getElementById("bottom-right");
const bottomLeft = document.getElementById("bottom-left");
const bottomMiddle = document.getElementById("bottom-middle");
const bottomRight = document.getElementById("bottom-right");
const startBtn = document.getElementById("startBtn");
const turnCount = document.getElementById("count");
const muteBtn = document.getElementById("soundOn");
const strictBtn = document.getElementById("strictMode");
const levelChoice = document.getElementsByName("level");
const themeChoice = document.getElementsByName("theme");
const blocksDiv = document.getElementsByClassName("gameBlocks");

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
let level = "easy";
let theme = "cartoons";
let gameBlocks = [];
let blockSounds = [];

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
    compTurn = false;
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
      playSound("./sounds/try-again.mp3");
      blocksPlayed = 0;
      playerSequence = [];
      goodGuess = true;
      compTurn = true;
      setTimeout(playCompSequence, delay);
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
  setTimeout(hideThemeAndLevel, delay * 2);
}

function winGame() {
  setTimeout(() => flashBlocks(), delay / 2); // TO BE ADDED
  gameOn = false;
  compTurn = false;
  if (strictMode) {
    setTimeout(() => alert("Congrats! YOU ROCK!!!"), delay);
  } else {
    setTimeout(
      () => alert("Congrats! and try strict mode next time ;)"),
      delay
    );
  }

  // play winner music - TO BE ADDED
  setTimeout(hideThemeAndLevel, delay * 2);
}

// -----------------------  Functions to set the game board ------------------------------ //
function easyMedium() {
  document.getElementById("row2").classList.add("hidden");
  for (let i = 0; i < document.getElementsByClassName("row").length; i++) {
    document.getElementsByClassName("row")[i].classList.remove("hard");
  }
}

function showMiddle() {
  topMiddle.classList.remove("hidden");
  bottomMiddle.classList.remove("hidden");
}

function makeBoard() {
  if (level === "easy") {
    topMiddle.classList.add("hidden");
    bottomMiddle.classList.add("hidden");
    easyMedium();
  } else if (level === "medium") {
    easyMedium();
    showMiddle();
  } else {
    document.getElementById("row2").classList.remove("hidden");
    showMiddle();
    for (let i = 0; i < document.getElementsByClassName("row").length; i++) {
      document.getElementsByClassName("row")[i].classList.add("hard");
    }
  }
}

makeBoard();

function updateGameBlocks() {
  if (level === "easy") {
    gameBlocks = [topLeft, topRight, bottomLeft, bottomRight];
  } else if (level === "medium") {
    gameBlocks = [
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      topMiddle,
      bottomMiddle,
    ];
  } else {
    gameBlocks = [
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      topMiddle,
      bottomMiddle,
      middleLeft,
      middleMiddle,
      middleRight,
    ];
  }
}

updateGameBlocks();

function updateSound() {
  if (theme === "farm") blockSounds = farmSounds;
  if (theme === "classic") blockSounds = classicSounds;
  if (theme === "cartoons" && level === "easy")
    blockSounds = cartoonSounds.slice(0, 4);
  if (theme === "cartoons" && level === "medium")
    blockSounds = cartoonSounds.slice(0, 6);
  if (theme === "cartoons" && level === "hard") blockSounds = cartoonSounds;
  if (theme === "electro" && level === "easy")
    blockSounds = electroSounds.slice(0, 4);
  if (theme === "electro" && level === "medium")
    blockSounds = electroSounds.slice(0, 6);
  if (theme === "electro" && level === "hard") blockSounds = electroSounds;
}

updateSound();

function applyTheme() {
  for (let i = 0; i < blocksDiv.length; i++) {
    if (theme === "classic") {
      blocksDiv[i].classList.add("classicTheme");
      blocksDiv[i].classList.remove("electroTheme");
      blocksDiv[i].classList.remove("farmTheme");
    } else if (theme === "farm") {
      blocksDiv[i].classList.remove("classicTheme");
      blocksDiv[i].classList.remove("electroTheme");
      blocksDiv[i].classList.add("farmTheme");
    } else if (theme === "electro") {
      blocksDiv[i].classList.remove("classicTheme");
      blocksDiv[i].classList.add("electroTheme");
      blocksDiv[i].classList.remove("farmTheme");
    } else {
      blocksDiv[i].classList.remove("classicTheme");
      blocksDiv[i].classList.remove("electroTheme");
      blocksDiv[i].classList.remove("farmTheme");
    }
  }
}

function hideThemes() {
  for (
    let i = 0;
    i < document.getElementsByClassName("easyThemes").length;
    i++
  ) {
    document.getElementsByClassName("easyThemes")[i].classList.add("hidden");
  }
}

function showThemes() {
  for (
    let i = 0;
    i < document.getElementsByClassName("easyThemes").length;
    i++
  ) {
    document.getElementsByClassName("easyThemes")[i].classList.remove("hidden");
  }
}

function hideLevels() {
  for (
    let i = 0;
    i < document.getElementsByClassName("highestLevels").length;
    i++
  ) {
    document.getElementsByClassName("highestLevels")[i].classList.add("hidden");
  }
}

function showLevels() {
  for (
    let i = 0;
    i < document.getElementsByClassName("easyThemes").length;
    i++
  ) {
    document
      .getElementsByClassName("highestLevels")
      [i].classList.remove("hidden");
  }
}

function hideThemeAndLevel() {
  if (gameOn) {
    document.getElementById("themeChoice").classList.add("hide");
    document.getElementById("levelChoice").classList.add("hide");
  } else {
    document.getElementById("themeChoice").classList.remove("hide");
    document.getElementById("levelChoice").classList.remove("hide");
  }
}

// -----------------------  EVENT-LISTENERS ------------------------------ //
muteBtn.addEventListener("change", () =>
  muteBtn.checked ? (soundOn = false) : (soundOn = true)
);

strictBtn.addEventListener("change", () =>
  strictBtn.checked ? (strictMode = true) : (strictMode = false)
);

for (let i = 0; i < levelChoice.length; i++) {
  levelChoice[i].addEventListener("change", () => {
    if (levelChoice[i].id === "easy") {
      level = "easy";
      showThemes();
    } else if (levelChoice[i].id === "medium") {
      level = "medium";
      hideThemes();
    } else {
      level = "hard";
      hideThemes();
    }

    makeBoard();
    updateGameBlocks();
    updateSound();
    // console.log(theme, blockSounds, gameBlocks);

    blocksListeners();
  });
}

startBtn.addEventListener("click", () => {
  if (!gameOn) {
    startGame();
    hideThemeAndLevel();
  }
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

for (let i = 0; i < themeChoice.length; i++) {
  themeChoice[i].addEventListener("change", () => {
    if (themeChoice[i].id === "cartoons") {
      theme = "cartoons";
      showLevels();
    } else if (themeChoice[i].id === "farm") {
      theme = "farm";
      hideLevels();
    } else if (themeChoice[i].id === "classic") {
      theme = "classic";
      hideLevels();
    } else {
      theme = "electro";
      showLevels();
    }
    applyTheme();
    updateSound();
  });
}
