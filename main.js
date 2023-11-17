let start = document.querySelector(".control-buttons span");
start.addEventListener("click", () => {
  let name = prompt("what is your name :");
  if (name == null || name == "") {
    document.querySelector(".name span").innerHTML = "Unkown";
  } else {
    document.querySelector(".name span").innerHTML = name;
  }
  document.querySelector(".control-buttons").remove();
});

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", () => {
    flipBlock(block);
  });
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let allFlippedBlocks = blocks.filter((flipBlock) =>
    flipBlock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    stopClicking();

    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesEl = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    triesEl.innerHTML = parseInt(triesEl.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    document.getElementById("fail").play();
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function shuffle(array) {
  let currnt = array.length,
    temp,
    random;
  while (currnt > 0) {
    random = Math.floor(Math.random() * currnt);
    currnt--;
    temp = array[currnt];
    array[currnt] = array[random];
    array[random] = temp;
  }
  return array;
}
