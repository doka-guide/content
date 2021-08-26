let selectorInput = document.getElementById('selector');
let result = document.getElementById('result');
let found = null;

document.getElementById('search-btn').addEventListener('click', function() {
  result.textContent = '';
  found && found.classList && found.classList.remove('highlight');
  try {
      found = document.querySelector(selectorInput.value);
      if (!found) {
        result.textContent = 'Ничего не найдено, результат: ' + found;
      } else {
        found.classList.add('highlight');
      }
  } catch (e) {
    result.textContent = 'Ошибка! Это не CSS селектор!';
  }

});
