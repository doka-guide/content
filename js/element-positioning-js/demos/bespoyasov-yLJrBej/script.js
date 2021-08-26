const el = document.querySelector('.element');

el.addEventListener('click', () => {
  el.classList.add('element-final');
  el.classList.remove('element-initial');
})
