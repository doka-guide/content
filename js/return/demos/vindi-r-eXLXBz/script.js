function isAdult(age) {
  return age > 18;
}
function randomString(len) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let str = [];
  for (let i=0;i< len; i++) str.push(letters.charAt(Math.floor(Math.random() * letters.length)));
  return str.join('');
}
function runExample1(){
  document.querySelector('#example1').textContent = isAdult(document.querySelector("#input1").value);
}

function runExample2(){
  document.querySelector('#example2').textContent = randomString(document.querySelector("#input2").value);
}
