function scrollPx(){
  let t = document.querySelector('textarea');
  t.scroll(0, 200);
}
function scrollPercent(){
    let t = document.querySelector('textarea');
  let half = t.scrollHeight / 2;
  console.log(half)
  t.scroll(0, Math.ceil(half));
}
