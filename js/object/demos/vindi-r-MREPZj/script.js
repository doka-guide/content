let cat = {
  name: 'Tomas',
  age: 2,
  color: 'brown',
  spots: true,
  wonderfull: true,
  ugly: false,

}
function write(text){
  document.querySelector('#result').innerText = text;
}
function getCat() {
  let list = Object.keys(cat);
  write(list.join('\n'));
}
function getCatFull() {
  let list = '';
  for (key in cat) {
    list += key +' -> ' + cat[key] + '\n';
  }
  write(list);
}
