let info = document.getElementById('info');
window.addEventListener('click', function(e) {
  let buttonName = getButtonName(e.button);
  info.textContent = 'Вы кликнули ' + buttonName + ' клавишей мыши. Кликов подряд: ' + e.detail;
});

function getButtonName(buttonNumber) {
  switch(buttonNumber) {
    case 0:
      return 'левой';
    case 1:
      return 'средней';
    case 2:
      return 'правой';
    default:
      return 'неизвестной';
  }
}
