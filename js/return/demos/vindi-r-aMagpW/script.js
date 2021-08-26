function checkNumber(){
  var result = document.querySelector('input').value;
  if (result < 100) {
    return false;
  }
  // Если result < 100 то код далее не будет выполнен!
  var logElement = document.querySelector('textarea');
  logElement.value += "\nВремя проверки: " + new Date();
  return true;
}
function checkNumberShow(){
  result = checkNumber();
  document.querySelector('span').textContent = result;
}