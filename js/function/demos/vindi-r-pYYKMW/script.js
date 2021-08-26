function decorate(text, symb) {
  log(symb + text + symb);
}
function decorateSmart(text, symb) {
  if (typeof symb === 'undefined') symb = '$';
  log(symb + text + symb);
}
function log(text){
  var textarea = document.querySelector('textarea');
  textarea.value = textarea.value + text + "\n";
}
function runFx() {
  log('Вызов decorate со всеми параметрами');
  decorate('hello world', '***');
  log('Вызов decorate без указания символа');
  decorate('oops, something wrong');
  log('Вызов decorateSmart со всеми параметрами');
  decorateSmart('hello', '#');
  log('Вызов DecorateSmart без указания символа');
  decorateSmart('maybe oops');
}
