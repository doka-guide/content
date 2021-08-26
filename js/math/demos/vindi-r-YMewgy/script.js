function parseInput(){
  let val = document.querySelector('input').value;
  let resultF = parseFloat(val);
  let resultI = parseInt(val, 10);
  if (isNaN(resultF)) {
    resultF = 'parseFloat не удался'
  }
  if (isNaN(resultI)) {
    resultI = 'parseInt не удался'
  }
  document.querySelector('#result').innerText = `Результат parseFloat: ${resultF}\nРезультат parseInt: ${resultI}`;
}