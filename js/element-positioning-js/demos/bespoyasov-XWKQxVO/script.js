const element = document.querySelector('.element');

let dragging = false;
let startX = 0;
let startY = 0;

element.addEventListener('mousedown', (e) => {
  dragging = true;

  const style = window.getComputedStyle(element);
  const translateX = parseInt(style.getPropertyValue('--x'));
  const translateY = parseInt(style.getPropertyValue('--y'));

  startX = e.pageX - translateX;
  startY = e.pageY - translateY;
})

document.body.addEventListener('mouseup', () => {
  dragging = false;
})

document.body.addEventListener('mousemove', (e) => {
  if (!dragging) return;

  element.style.setProperty('--x', `${e.pageX - startX}px`);
  element.style.setProperty('--y', `${e.pageY - startY}px`);
})
