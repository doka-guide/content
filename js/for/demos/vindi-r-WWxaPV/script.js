let countOne = document.querySelector('#countOne');
let countTwo = document.querySelector('#countTwo');
let countThree = document.querySelector('#countThree');

let strOne = '';
let strTwo = '';
let strThree = '';

for(let i=0;i<=10;i++){
  strOne += i;
}
countOne.innerText = strOne;

for(let i=10;i>=0;i--){
  strTwo += i;
}
countTwo.innerText = strTwo;

for(let i=30;i<=40;i++){
  strThree += i;
}
countThree.innerText = strThree;