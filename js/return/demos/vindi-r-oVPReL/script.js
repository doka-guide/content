function randomReturn(){
  if (Math.random() > 0.5) return true;
}

function randomReturnShow(){
  document.querySelector('input').value = randomReturn();
}
