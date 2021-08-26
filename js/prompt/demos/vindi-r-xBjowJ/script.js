function CustomPrompt() {
    this.show = function (dialog, func) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogOverlay = document.getElementById('dialog-overlay');
        var dialogBox = document.getElementById('dialog-box');

        dialogOverlay.style.display = "block";
        dialogOverlay.style.height = winH + "px";
        dialogBox.style.left = ((winW / 2) - (550 / 2)) + "px";
        dialogBox.style.top = "100px";
        dialogBox.style.display = "block";

        document.getElementById('dialog-box-head').innerHTML = "A value is required";
        document.getElementById('dialog-box-body').innerHTML = dialog;
        document.getElementById('dialog-box-body').innerHTML += '<br><input id="prompt_value1">';
        document.getElementById('dialog-box-foot').innerHTML = '<button onclick="Prompt.ok(\'' + func + '\')">OK</button> <button onclick="Prompt.cancel(' + "'" + func + "'" + ')">Cancel</button>';
    }
    this.cancel = function (func) {
      window[func](null);
        this.hide();
    }
    this.ok = function (func) {
        var prompt_value1 = document.getElementById('prompt_value1').value;
        window[func](prompt_value1);
        this.hide();
    }
    this.hide = function () {
        document.getElementById('dialog-box').style.display = "none";
        document.getElementById('dialog-overlay').style.display = "none";
    }
}
var Prompt = new CustomPrompt();

function askPassword() {
  var answer = prompt('Введите пароль: бублик', 'Я не знаю пароль');
  var result = 'Пароль неверный'
  if (answer === 'бублик') {
    result = 'Пароль принят'
  }
  document.querySelector('#result').textContent = result;
}
function askPassword2(answer) {
  var result = 'Пароль неверный'
  if (answer === 'бублик') {
    result = 'Пароль принят'
  }
  document.querySelector('#result').textContent = result;
}