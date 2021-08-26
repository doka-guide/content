let counterTag = document.getElementById('counter');
let counter = 0;
let timer = setInterval(function() {
  counterTag.textContent = 'Секунды с момента открытия страницы: ' + counter;
  ++counter;
}, 1000); // заводим таймер на 1 секунду(1000мс)

// убиваем таймер при закрытии страницы
window.addEventListener('unload', function() {
  clearInterval(timer);
});
