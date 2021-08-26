let container = document.querySelector('#result');
function badFor(){
  let str = '';
  for (let i=0;i<10; i--){
    str += i;
  }
  container.innerText = str;
}
function goodFor(){
  let str = '';
  for (let i=0;i<10; i++){
    str += i;
  }
  container.innerText = str;
}
