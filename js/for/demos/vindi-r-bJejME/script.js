function createSquare(target) {
  // simple random color
  var color = '#'+Math.random().toString(16).substr(-6);
  // Create div and add to DOM 
  var div = document.createElement('div');
  div.className = "square";
  div.style.background = color;
  target.appendChild(div);
}

function makeForExample() {
  const container = document.querySelector('#result');
  container.innerHTML = '';
  for(i=0;i<10;i++){
    createSquare(container);
  }
}
makeForExample();