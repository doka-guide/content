🛠 Базовая обработка событий клавиатуры:

```html
<div class="event">Ожидание ввода...</div>
<input type="text" placeholder="Введите сообщение">
<div class="result"></div>
```

```js
function handleKey(event) {
  const msg = '<code>' + event.key + '</code>';
  if (event.key === 'Enter') {
    const newMsg = document.createElement('div');
    newMsg.classList.add("message");
    newMsg.innerText = event.target.value;
    document.querySelector('.result').appendChild(newMsg);
    event.target.value = '';
  }
    document.querySelector('.event').innerHTML = msg;
}

const elem = document.querySelector('input');
elem.addEventListener('keydown', handleKey);
```

<iframe title="Обработка событий клавиатуры — Element.addEventListener() — Дока" src="../demos/keyboard-events/index.html" height="450"></iframe>

🛠 Обработка событий мыши:

```html
<a href="https://yandex.ru" target="_blank">Ссылка на Яндекс</a>
<a href="https://yandex.ru" target="_blank" id="custom">Ссылка с измененным поведением</a>
<div id="result"></div>
```

```js
function handleClick(e) {
  e.preventDefault(); // Отменяем поведение браузера для этого события
  document.querySelector('#result').innerText = 'Вы нажали на ссылку, но ничего не произошло!';
  setTimeout(function() {
    document.querySelector('#result').innerText = '';
  }, 2500);
}
const elem = document.querySelector('#custom');
elem.addEventListener('click', handleClick);
```

<iframe title="Обработка событий мыши — Element.addEventListener() — Дока" src="../demos/mouse-events/index.html" height="320"></iframe>
