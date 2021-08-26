let zoo = ['🐶', '🐮', '🐰', '🦊', '🦁', '🐷'];
let div = document.getElementById('result');
let arrayEl = document.getElementById('array');

arrayEl.textContent = zoo.join(' ,');

function randomFromArray(){
  let randomIndex = Math.floor(Math.random() * zoo.length);
  let selected = zoo[randomIndex];
  div.textContent = selected;
}
