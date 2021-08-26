let root = document.documentElement;

const parentSlider = document.querySelector('#rotate-parent');

const childSlider = document.querySelector('#rotate-child')

const changeVar = (varName) => (e) => {
  root.style.setProperty(varName, `${e.target.value}deg`);
}

parentSlider.addEventListener('input', changeVar('--parentRotateY'));

childSlider.addEventListener('input', changeVar('--childRotateY'));
