let selectorInput = document.getElementById('selector');
let result = document.getElementById('result');
let found = null;

document.getElementById('search-btn').addEventListener('click', function() {
  result.textContent = '';
  found && removeHighlight(found);
  try {
      found = document.querySelectorAll(selectorInput.value);
      if (found.length === 0) {
        result.textContent = 'Ничего не найдено, размер коллекции: ' + found;
      } else {
        addHighlight(found);
      }
  } catch (e) {
    result.textContent = 'Ошибка! Это не CSS селектор!';
  }

});

function addHighlight(elements) {
  for (let i=0; i<elements.length;++i) {
    let element = elements[i];
    element.classList.add('highlight');
  }
}


function removeHighlight(elements) {
  for (let i=0; i<elements.length;++i) {
    let element = elements[i];
    element.classList.remove('highlight');
  }
}
