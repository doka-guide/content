function writeResult(text) {
  let div = document.querySelector('#result');
  div.innerText = text;
}
function simpleRandom(){
  writeResult(Math.random());
}
