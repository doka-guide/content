function check() {
  let val = document.querySelector('input').value;
  let raw = document.querySelector('#invert');
  let clear = document.querySelector('#invert2');
  raw.innerText = val;
  clear.innerText = val.trim();
}

check();