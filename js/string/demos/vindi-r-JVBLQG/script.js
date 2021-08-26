function check() {
  checkWithMath();
  checkWithoutMath();
}
function checkWithMath(){
  let result = '?';
  let c1 = document.querySelector('#c1').value || NaN;
  let c2 = document.querySelector('#c2').value || NaN;
  let isEqual = parseFloat(c1) === parseFloat(c2);
  if (isEqual) {
    result = '='
  } else {
    let isBigger = parseFloat(c1) > parseFloat(c2);
    let isSmaller = parseFloat(c1) < parseFloat(c2);
    if (isBigger) {
      result = '>';
    }
    if (isSmaller) {
      result = '<';
    }
  }
  
  document.querySelector('#operator').innerText = result;
}
function checkWithoutMath(){
  let result = '?';
  let c1 = document.querySelector('#c1').value || NaN;
  let c2 = document.querySelector('#c2').value || NaN;
  let isEqual = c1 === c2;
  if (isEqual) {
    result = '='
  } else {
    let isBigger = c1 > c2;
    let isSmaller = c1 < c2;
    if (isBigger) {
      result = '>';
    }
    if (isSmaller) {
      result = '<';
    }
  }
  
  document.querySelector('#operator-mirror').innerText = result;
  document.querySelector('#c1-mirror').value = document.querySelector('#c1').value;
  document.querySelector('#c2-mirror').value = document.querySelector('#c2').value;
}

// Установка первичных значений
document.querySelector('#c1').value = "100";
document.querySelector('#c2').value = "50";
check();