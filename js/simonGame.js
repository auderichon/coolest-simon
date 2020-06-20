class SimonGame {
    constructor(blocks) {
        this.blocks = blocks;
    }
    // pick randomly one block to light
    pickRandomBlock() {
    return this.blocks[parseInt(Math.random() * this.blocks.length)];
    }
    // make one block lighten itself and play a sound (can be activated through a sequence or by a click)
    // use a Promise to wrap it ??? 
    lightSound(block, delay) {
        block.classList.add("active");
        //play sound - TO BE ADDED
        setTimeout(() => {
            block.classList.remove("active");
        }, delay);
        setTimeout(() => {}, delay / 2);
    }
}

