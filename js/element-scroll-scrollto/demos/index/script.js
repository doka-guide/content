const t = document.querySelector('.scrollable')

function scrollPx(){
  t.scrollTo(0, 200)
}

function scrollPercent(){
  const half = t.scrollHeight / 2
  t.scrollTo(0, Math.ceil(half))
}
