let input = document.getElementById('value');
let select = document.getElementsByTagName('select')[0];
let button = document.getElementsByTagName('button')[0];
let output = document.getElementsByTagName('h1')[0];

button.addEventListener('click', function() {
  let value = input.value;
  let locale = select.value;
  
  let num = (new Number(value));
  if (locale) {
    output.textContent = num.toLocaleString(locale);
  } else {
    output.textContent = num.toLocaleString();
  }
  
});