function check(){
  let text = document.querySelector('textarea').value;
  let spolier = text.slice(0,5) + "<ТЕКСТ СКРЫТ>" + text.slice(-5);
  let result = text.length > 10 ? spolier : text;
    document.querySelector('#result').innerText = result;
}