const flowChildren = document.querySelectorAll('.normal-flow-child');
const progress = document.getElementById('timeline');
const playButton = document.querySelector('.play');
const stopButton = document.querySelector('.stop');
const restartButton = document.querySelector('.restart');

const tl = gsap.timeline({paused:true});

tl.to(flowChildren[0], {duration: 2, y: 30, onComplete: () => {flowChildren[0].classList.add('show')}})
.to(flowChildren[0], {duration: 2, y: 0},"+=3")
  .to(flowChildren[1], {duration: 2, y: 30, onComplete: () => {flowChildren[1].classList.add('show')}})
  .to(flowChildren[1], {duration: 2, y: 0},"+=3")


tl.eventCallback('onUpdate', () => {
  progress.value = tl.progress() * 100;
})

progress.addEventListener('input', (e) => {
  tl.progress(e.target.value / 100);
  if (e.target.value < 19) {
    flowChildren[1].classList.remove('show');
    flowChildren[1].classList.remove('floated');
    void flowChildren[1].offsetWidth;
  }
  console.log(e.target.value);
})

playButton.addEventListener('click', () => {
  tl.play();
})

stopButton.addEventListener('click', () => {
  tl.pause();
})

restartButton.addEventListener('click', () => {
  tl.pause();
  tl.seek(0);
  flowChildren[1].classList.remove('show');
  flowChildren[1].classList.remove('floated');
  tl.play();
})