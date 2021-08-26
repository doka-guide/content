const element = document.querySelector('.element');

let dragging = false;
let startX = 0;
let startY = 0;

element.addEventListener('mousedown', (e) => {
  dragging = true;
  
  const style = window.getComputedStyle(element);
  console.log(style.transform);
  const transform = new DOMMatrixReadOnly(style.transform)
  
  const translateX = transform.m41;
  const translateY = transform.m42;

  startX = e.pageX - translateX;
  startY = e.pageY - translateY;
})

document.body.addEventListener('mouseup', () => {
  dragging = false;
})

document.body.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  
  const x = e.pageX - startX;
  const y = e.pageY - startY;
  element.style.transform = `translate(${x}px, ${y}px)`;
})