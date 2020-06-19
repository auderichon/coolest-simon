const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomLeft = document.getElementById("bottom-left");
const bottomRight = document.getElementById("bottom-right");
const startBtn = document.getElementById("startBtn");

console.log(topLeft, topRight, bottomRight, bottomLeft);

// array of blocks to be lighted


// function to make one block lighten itself
function light(block) {
    block.classList.add("active");
    setTimeout(() => {
        block.classList.remove("active");
    }, 1000);
};

// function to pick one block to light
function pickBlock() {
    const blockArray = [topLeft, topRight, bottomLeft, bottomRight];
    return blockArray[parseInt(Math.random() * sequence.length)];
}

// function to make all the blocks lighten themselves
function activateAll() {
    for (let block in sequence) {
        light(block);
    }
    playerCanClick = true;
}

// track the blocks clicked by the player
function blockClicked(block) {
    if (!playerCanClick) {
        return;
    } else {
        console.log(block);
    }
}

// function to let the player click only when the computer has finished playing its array
let playerCanClick = false;

// event-listener sur le bouton start
startBtn.onclick = activateAll;
