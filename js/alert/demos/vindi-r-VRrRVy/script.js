function CustomAlert() {
    this.show = function (dialog) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogOverlay = document.getElementById('dialog-overlay');
        var dialogBox = document.getElementById('dialog-box');

        dialogOverlay.style.display = "block";
        dialogOverlay.style.height = winH + "px";
        dialogBox.style.left = ((winW / 2) - (550 / 2)) + "px";
        dialogBox.style.top = "100px";
        dialogBox.style.display = "block";

        document.getElementById('dialog-box-head').innerHTML = "Заголовок";
        document.getElementById('dialog-box-body').innerHTML = dialog;
        document.getElementById('dialog-box-foot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
    }
    this.ok = function () {
        this.hide();
    }
    this.hide = function () {
        document.getElementById('dialog-box').style.display = "none";
        document.getElementById('dialog-overlay').style.display = "none";
    }
}
const Alert = new CustomAlert();

function exampleOne() {
  alert('Текстовое сообщение!');
}
function exampleTwo() {
  const inputValue = document.getElementById('exampleTwoInput').value;
  // ВАЖНО: Значение value - всегда строка, даже если ничего не введено
  let message = 'Введено значение, не равное 100';
  if (inputValue === '100') {
    message = 'Вы ввели верное значение';
  }
  alert(message);
}
function exampleThree() {
  Alert.show('Пример кастомного сообщения');
}
function exampleFour() {
  const message = `Случайное число: ${Math.random()}`
  Alert.show(message);
}
