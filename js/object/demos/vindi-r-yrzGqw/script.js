let cat = {
  name: 'tomas',
  age: 2,
  kittens: ['sam', 'dom', 'pam'],
  legs: 4,
  fat: true
}
function getProp() {
  let propName = document.querySelector('input').value;
  let result = cat[propName];
  if (propName in cat === false) {
    result = 'Ключ отсутствует';
  }
  document.querySelector('#result').innerText = result;
}
