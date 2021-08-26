const alertButton = document.getElementById('alert-button')

alertButton.addEventListener('click', function() {
  alert('Привет, я работаю!')
})

const endlessLoopButton = document.getElementById('endless-loop')
endlessLoopButton.addEventListener('click', function() {
  while(true) {}
})
