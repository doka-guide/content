🛠 Базовая обработка событий клавиатуры:

```html
<div class="event">Ожидание ввода...</div>
<input type="text" placeholder="Введите сообщение">
<div class="result"></div>
```

```js
const element = document.querySelector('input');

element.addEventListener('keydown', function (event) {
  const msg = '<code>' + event.key + '</code>';

  if (event.key === 'Enter') {
    const newMsg = document.createElement('div');

    newMsg.classList.add("message");
    newMsg.innerText = event.target.value;
    document.querySelector('.result').appendChild(newMsg);
    event.target.value = '';
  }

  document.querySelector('.event').innerHTML = msg;
});
```

<iframe title="Обработка событий клавиатуры — Element.addEventListener() — Дока" src="../demos/keyboard-events/" height="450"></iframe>

🛠 Обработка событий мыши:

```html
<a href="https://yandex.ru" target="_blank">Ссылка на Яндекс</a>
<a href="https://yandex.ru" target="_blank" id="custom">Ссылка с измененным поведением</a>
<div id="result"></div>
```

```js
const linkElement = document.querySelector('#custom');
const resultElement = document.querySelector('#result');

element.addEventListener('click', function (event) {
  event.preventDefault(); // Отменяем поведение браузера для этого события

  resultElement.innerText = 'Вы нажали на ссылку, но ничего не произошло!';
  setTimeout(function() {
    resultElement.innerText = '';
  }, 2500);
});
```

<iframe title="Обработка событий мыши — Element.addEventListener() — Дока" src="../demos/mouse-events/" height="320"></iframe>
