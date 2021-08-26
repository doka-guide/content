function CustomConfirm() {
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

    document.getElementById('dialog-box-head').innerHTML = dialog
    document.getElementById('dialog-box-foot').innerHTML = '<button onclick="Confirm.ok(\'' + func + '\')">OK</button> <button onclick="Confirm.cancel(' + "'" + func + "'" + ')">Cancel</button>';
  }
  this.cancel = function (func) {
    window[func](false);
    this.hide();
  }
  this.ok = function (func) {
    window[func](true);
    this.hide();
  }
  this.hide = function () {
    document.getElementById('dialog-box').style.display = "none";
    document.getElementById('dialog-overlay').style.display = "none";
  }
}
var Confirm = new CustomConfirm();

function askConfirm() {
  var answer = confirm("Подтвердите согласие");
  document.querySelector('#result').textContent = answer ? 'Согласие получено' : 'Отказ получен';
}
function askConfirm2() {
  Confirm.show('Нажмите ОК для подтверждения','customConfirmHandler')
}
function customConfirmHandler(answer) {
  document.querySelector('#result').textContent = answer ? 'Согласие получено' : 'Отказ получен';
}
