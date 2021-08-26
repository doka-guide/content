let input = document.getElementById('num');
let roundBtn = document.getElementById('round');
let floorBtn = document.getElementById('floor');
let ceilBtn = document.getElementById('ceil');
let resultEl = document.getElementById('result');

roundBtn.addEventListener('click', function() {
  resultEl.textContent = Math.round(input.value);
});

floorBtn.addEventListener('click', function() {
  resultEl.textContent = Math.floor(input.value);
});

ceilBtn.addEventListener('click', function() {
  resultEl.textContent = Math.ceil(input.value);
});