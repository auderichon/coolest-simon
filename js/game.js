//--------- music arrays -------//
const cartoonSounds = [
  "../../sounds/cartoons/booing.mp3", // topLeft
  "../../sounds/cartoons/kiss.mp3", // topRight
  "../../sounds/cartoons/pop.mp3", // bottomLeft
  "../../sounds/cartoons/flicks.mp3", // bottomRight
  "../../sounds/cartoons/bounce.mp3", // topMiddle
  "../../sounds/cartoons/swoosh.mp3", // bottomMiddle
  "../../sounds/cartoons/prick.mp3", // middleLeft
  "../../sounds/cartoons/squash.mp3", // middleMiddle
  "../../sounds/cartoons/bounce2.mp3", // middleRight
];

const farmSounds = [
  "../../sounds/farm/bull.mp3", // topLeft
  "../../sounds/farm/cock.mp3", // topRight
  "../../sounds/farm/horse.mp3", // bottomLeft
  "../../sounds/farm/sheep.mp3", // bottomRight
];

const classicSounds = [
  "../../sounds/classic/simonSound1.mp3", // topLeft
  "../../sounds/classic/simonSound2.mp3", // topRight
  "../../sounds/classic/simonSound3.mp3", // bottomLeft
  "../../sounds/classic/simonSound4.mp3", // bottomRight
];

const electroSounds = [
  "../../sounds/electro/electro1.mp3", // topLeft
  "../../sounds/electro/electro2.mp3", // topRight
  "../../sounds/electro/electro3.mp3", // bottomLeft
  "../../sounds/electro/electro4.mp3", // bottomRight
  "../../sounds/electro/electro5.mp3", // topMiddle
  "../../sounds/electro/electro6.mp3", // bottomMiddle
  "../../sounds/electro/electro7.mp3", // middleLeft
  "../../sounds/electro/electro8.mp3", // middleMiddle
  "../../sounds/electro/electro9.mp3", // middleRight
];
//---------------------------------------------------------//

const topLeft = document.getElementById("top-left");
const topMiddle = document.getElementById("top-middle");
const topRight = document.getElementById("top-right");
const middleLeft = document.getElementById("middle-left");
const middleMiddle = document.getElementById("middle-middle");
const middleRight = document.getElementById("middle-right");
const bottomLeft = document.getElementById("bottom-left");
const bottomMiddle = document.getElementById("bottom-middle");
const bottomRight = document.getElementById("bottom-right");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const turnCount = document.getElementById("count");
const muteBtn = document.getElementById("soundOn");
const strictBtn = document.getElementById("strictMode");
const levelChoice = document.getElementsByName("level");
const themeChoice = document.getElementsByName("theme");
const blocksDiv = document.getElementsByClassName("gameBlocks");
const homeIcon = document.getElementById("home");
const rulesPopin = document.getElementById("rules-popin");
const rules = document.getElementById("rules");
const closeRules = document.getElementsByClassName("close")[0];
const creditsPopin = document.getElementById("credits-popin");
const credits = document.getElementById("credits");
const closeCredits = document.getElementsByClassName("close")[1];
const gameOverPopin = document.getElementById("game-over");
const closeGameOver = document.getElementsByClassName("close")[2];
const winPopin = document.getElementById("win-popin");
const closeWin = document.getElementsByClassName("close")[3];

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
let numberOfRounds = 0;
let easyRounds = 20;
let mediumRounds = 25;
let hardRounds = 30;
let level = "easy";
let theme = "cartoons";
let gameBlocks = [
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
let blockSounds = [];
let playerName = "";

// -----------------------  Functions to play the game ------------------------------ //
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
      console.log(compSequence);
      console.log(compSequence[i]);
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

// function to play a sequence of blocks
function playBlocks() {
  clearInterval(intervalId);
  compTurn = true;
  turn++;
  turnCount.innerText = turn;

  addNewIndex(compSequence);
  if (theme !== "farm" && compSequence.length > 5 && compSequence.length < 11) {
    delay = 900;
  } else if (
    theme !== "farm" &&
    compSequence.length > 11 &&
    compSequence.length < 16
  ) {
    delay = 800;
  } else if (theme !== "farm" && compSequence.length > 16) {
    delay = 700;
  } else {
    delay = 1000;
  }
  playCompSequence();
}

// compare the blocks clicked by the player to the original sequence
function compare() {
  //console.log(`the player sequence is ${playerSequence}, the computer sequence is ${compSequence}`);
  if (
    playerSequence[playerSequence.length - 1] !==
    compSequence[playerSequence.length - 1]
  )
    goodGuess = false;

  if (goodGuess === false) {
    if (strictMode) {
      gameOver();
    } else {
      playSound("../../sounds/try-again.mp3");
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
  if (level === "easy") {
    numberOfRounds = easyRounds;
  } else if (level === "medium") {
    numberOfRounds = mediumRounds;
  } else {
    numberOfRounds = hardRounds;
  }
}

function startStopToggle() {
  startBtn.classList.toggle("hidden");
  stopBtn.classList.toggle("hidden");
}

function startGame() {
  gameOn = true;
  startStopToggle();
  initializeGame();
  compTurn = true;
  playBlocks();
}

function gameOver() {
  setTimeout(() => {
    playBrightColors();
  }, delay / 2);
  setTimeout(() => {
    clearBrightColors();
  }, delay);
  gameOn = false;
  compTurn = false;
  setTimeout(() => gameOverPopin.classList.remove("hidden"), delay);
  playSound(
    "https://actions.google.com/sounds/v1/cartoon/concussive_hit_guitar_boing.ogg"
  );
  setTimeout(hideThemeAndLevel, delay * 2);
  startStopToggle();
}

function winGame() {
  setTimeout(() => {
    playBrightColors();
  }, delay / 2);
  setTimeout(() => {
    clearBrightColors();
  }, delay);
  gameOn = false;
  compTurn = false;
  playSound("../sounds/cheering.mp3");
  if (strictMode) {
    setTimeout(() => winPopin.classList.remove("hidden"), delay);
  } else {
    setTimeout(() => {
      winPopin.classList.remove("hidden");
      document.getElementById("try-strict").innerHTML =
        "but try strict mode next time &#128521";
    }, delay);
  }

  setTimeout(hideThemeAndLevel, delay * 2);
  startStopToggle();
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
    //numberOfRounds = 20;
    easyMedium();
  } else if (level === "medium") {
    easyMedium();
    showMiddle();
    //numberOfRounds = 25;
  } else {
    document.getElementById("row2").classList.remove("hidden");
    showMiddle();
    //numberOfRounds = 30;
    for (let i = 0; i < document.getElementsByClassName("row").length; i++) {
      document.getElementsByClassName("row")[i].classList.add("hard");
    }
  }
}

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

function startStopBtns() {
  if (theme === "classic" || theme === "farm") {
    startBtn.style.background = "grey";
    stopBtn.style.background = "grey";
  } else if (theme === "electro") {
    startBtn.style.background = "#BF066C";
    stopBtn.style.background = "#BF066C";
  } else {
    startBtn.style.background = "#c90fee";
    stopBtn.style.background = "#c90fee";
  }
}

function applyTheme() {
  clearBrightColors();
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
  startStopBtns();
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

homeIcon.addEventListener(
  "click",
  () => (window.location.href = "../index.html")
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

    //removeBlocksListeners();

    //blocksListeners();
  });
}

startBtn.addEventListener("click", () => {
  if (!gameOn) {
    startGame();
    hideThemeAndLevel();
  }
});

stopBtn.addEventListener("click", () => {
  if (gameOn) {
    gameOn = false;
    compTurn = false;
    startStopToggle();
    hideThemeAndLevel();
    compSequence = [];
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

rules.onclick = function () {
  console.log("click");
  rulesPopin.classList.remove("hidden");
};

closeRules.onclick = function () {
  rulesPopin.classList.add("hidden");
};

credits.onclick = function () {
  console.log("click");
  creditsPopin.classList.remove("hidden");
};

closeCredits.onclick = function () {
  creditsPopin.classList.add("hidden");
};

closeGameOver.onclick = function () {
  gameOverPopin.classList.add("hidden");
};

closeWin.onclick = function () {
  winPopin.classList.add("hidden");
};

// ----------------------- Functions to run when opening the game ------------------------------ //

blocksListeners();

playerName = localStorage.getItem("playerName");
if (playerName !== "" && playerName !== null)
  document.getElementById("h1").innerText = `Let's play, ${
    playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase()
  }!`;
console.log(playerName);
level = localStorage.getItem("level");
localStorage.clear();

document.getElementById(level).checked = true;
if (level !== "easy") hideThemes();

makeBoard();
updateGameBlocks();
updateSound();
