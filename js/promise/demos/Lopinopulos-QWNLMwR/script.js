const button = document.getElementsByTagName("button")[0]
const pendingBlock = document.getElementById("pending")
const fulfilledBlock = document.getElementById("fulfilled")
const rejectedBlock = document.getElementById("rejected")
const resetBlocks = (blocks = [pendingBlock, fulfilledBlock, rejectedBlock]) => {
  blocks.forEach(block => block.className = '')
}

const activateBlock = (block) => {
  block.classList.add("active");
}

button.addEventListener("click", () => {
  (new Promise((fulfill, reject) => {
    button.textContent = "Buying stonks"
    button.disabled = true;
    resetBlocks()
    activateBlock(pendingBlock);

    setTimeout(() => {
      button.textContent = "Buy stonks"
      button.disabled = false;

      resetBlocks()
      if (Math.random() > 0.5) {
        fulfill("все ок!")
      } else {
        reject(new Error("ошибка"))
      }
    }, 1000)
  }).then(resp => {
        activateBlock(fulfilledBlock)
      // вывести текст
    }).catch(err => {
      activateBlock(rejectedBlock);
    // ошибка
    })
  )
})
