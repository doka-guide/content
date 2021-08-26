let allParagraphs = document.getElementsByTagName('p');
window.addEventListener('click', function(event) {
  if (event.target.tagName === "BUTTON") {
    return;
  }
  
  cleanParagraphsStyle();
  
  let foundParagraphs = event.target.getElementsByTagName('p');
  alert('Клик по тегу ' + event.target.tagName  + ' внутри него нашлось параграфов: ' + foundParagraphs.length);
  for(let i=0; i<foundParagraphs.length; ++i) {
    let el = foundParagraphs[i];
    el.style = 'border-width: 5px;';
  }
});

document.getElementById('clear').addEventListener('click', cleanParagraphsStyle);

function cleanParagraphsStyle() {
  for(let i=0; i<allParagraphs.length; ++i) {
    let el = allParagraphs[i];
    el.style = "";
  }
}