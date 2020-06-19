const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomLeft = document.getElementById("bottom-left");
const bottomRight = document.getElementById("bottom-right");

console.log(topLeft, topRight, bottomRight, bottomLeft);

// array of blocks to be lighted
const sequence = [topLeft, topRight, bottomLeft, bottomRight];

// function to make one block lighten itself
function light(block) {
  block.classList.add("active");
  setTimeout(() => {
    block.classList.remove("active");
  }, 500);
}

light(bottomRight);

// const activateAll = async () => {
//     for (let block of sequence) {
//         await light(block);
//     }
//     light();
// };

// activateAll();
