let div = document.getElementById('result');
let from = document.getElementById('from');
let to = document.getElementById('to');


function randomNumber(){
  let min = parseInt(from.value) || 0;
  let max = parseInt(to.value) || 10;
  let num = min + Math.floor(Math.random() * (max-min));
  div.textContent = num;
}
