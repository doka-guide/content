const progress = document.querySelector('progress');

function recalculateProgress() {
  const viewportHeight = window.innerHeight;
  const pageheight = document.body.offsetHeight;
  const currentPosition = window.scrollY;
  
  const availableHeight = pageheight - viewportHeight;
  const percent = (currentPosition / availableHeight) * 100;
  progress.value = percent;
  console.log(percent)
}

function throttle(callee, timeout) {
    let timer = null;
  
    return function perform(...args) {
      if (timer) return;
      
      timer = setTimeout(() => {
        callee(...args);

        clearTimeout(timer);
        timer = null;
      }, timeout);
    }
}

const optimizedHandler = throttle(recalculateProgress, 50);
window.addEventListener('scroll', optimizedHandler);
window.addEventListener('resize', optimizedHandler);