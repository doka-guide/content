function confirmFx() {
  const result = confirm('Удалить элемент?');
  if (result === true) {
    document.querySelector('#result').innerText = 'Элемент удален';
  } else {
        document.querySelector('#result').innerText = 'Удаление отменено';
  }
}
