function updateTransition() {
  var els = document.querySelectorAll(".parent > div[class]");
  for (var c = els.length, i = 0; i < c; i++) {
    els[i].classList.toggle("box1");
  }
}

var intervalID = window.setInterval(updateTransition, 5000);