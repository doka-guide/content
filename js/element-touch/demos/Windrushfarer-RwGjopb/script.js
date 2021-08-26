const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

function start(coors) {
  context.beginPath();
  context.moveTo(coors.x, coors.y);
  this.isDrawing = true;
}

function move(coors) {
  if (this.isDrawing) {
    context.strokeStyle = "#000";
    context.lineJoin = "round";
    context.lineWidth = 3;
    context.lineTo(coors.x, coors.y);
    context.stroke();
  }
}

function stop(coors) {
  if (this.isDrawing) {
    this.touchmove(coors);
    this.isDrawing = false;
  }
}

const drawer = {
  isDrawing: false,
  touchstart: start,
  touchmove: move,
  touchend: stop
};

function draw(coords) {
  context.strokeStyle = "#000";
  context.lineJoin = "round";
  context.lineWidth = 3;
  context.lineTo(coords.x, coords.y);
  context.stroke();
}

canvas.addEventListener("touchstart", (e) => {
  const coords = {
    x: e.targetTouches[0].pageX,
    y: e.targetTouches[0].pageY
  };
  
  context.beginPath();
  context.moveTo(coords.x, coords.y);
  
});
canvas.addEventListener("touchmove", (e) => {
  const coords = {
    x: e.targetTouches[0].pageX,
    y: e.targetTouches[0].pageY
  };

  draw(coords)
});

canvas.addEventListener("touchend", (e) => {
  const coords = {
    x: e.targetTouches[0].pageX,
    y: e.targetTouches[0].pageY
  };
  
  draw(coords)
});