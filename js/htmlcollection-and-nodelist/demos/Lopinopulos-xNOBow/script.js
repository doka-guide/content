function createParagraphElement(number) {
  let newP = document.createElement('p');
  newP.textContent = 'Это параграф #' + number;
  return newP;
}

let paragraphs = document.getElementsByTagName('p'); // получаем один раз при загрузке страницы!
let articleDiv = document.getElementById('article');
let counterSpan = document.getElementById('counter');
let addButton = document.getElementById('add');
let removeButton = document.getElementById('remove');

counterSpan.textContent = paragraphs.length;

addButton.addEventListener('click', function() {
  articleDiv.appendChild(createParagraphElement(paragraphs.length + 1));
  counterSpan.textContent = paragraphs.length;
});

removeButton.addEventListener('click', function() {
  articleDiv.removeChild(paragraphs[paragraphs.length-1]);

  counterSpan.textContent = paragraphs.length;
});
