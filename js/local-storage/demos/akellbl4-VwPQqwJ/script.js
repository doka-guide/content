const DEFAULT_FONT_SIZE = 1; // em
    const increaseButton = document.getElementById('increase-font-size')
    const decreaseButton = document.getElementById('decrease-font-size')
    const fontSizeElement = document.getElementById('current-font-size')
    const articleElement = document.getElementById('article')
    let currentSize = parseInt(localStorage.getItem('pageFontSize') || DEFAULT_FONT_SIZE)

    if (currentSize !== DEFAULT_FONT_SIZE) {
      changeFontSize(currentSize)
    }

    function changeFontSize(size) {
      articleElement.style.setProperty('--page-font-size', `${size}em`)
      fontSizeElement.innerText = `${size}em`
      localStorage.setItem('pageFontSize', size)
    }

    increaseButton.addEventListener('click', function (evt) {
      evt.preventDefault()
      currentSize = parseFloat((currentSize + 0.2).toFixed(1))

      if (decreaseButton.hasAttribute('disabled')) {
        decreaseButton.removeAttribute('disabled', '')
      }

      if (currentSize >= 2) {
        this.setAttribute('disabled', '')
      }

      changeFontSize(currentSize)
    });

    decreaseButton.addEventListener('click', function (evt) {
      evt.preventDefault()
      currentSize = parseFloat((currentSize - 0.2).toFixed(1))

      if (increaseButton.hasAttribute('disabled')) {
        increaseButton.removeAttribute('disabled', '')
      }

      if (currentSize <= 0.6) {
        decreaseButton.setAttribute('disabled', '')
      }

      changeFontSize(currentSize)
    });
