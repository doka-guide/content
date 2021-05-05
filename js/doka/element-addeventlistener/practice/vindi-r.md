---
tags:
  - practice
permalink: false
---

🛠 Базовая обработка событий клавиатуры:

```html
<input id="field" type="text" placeholder="Введите сообщение">
<div id="event">Ожидание ввода...</div>
<div id="result"></div>
```

```js
function handleKey(event) {
  let msg = 'Нажата клавиша: <code>' + event.key + '</code>';
  if (event.key === 'Enter') {
    let newMsg = document.createElement('div');
    newMsg.innerText = event.target.value;
    document.querySelector('#result').appendChild(newMsg);
    event.target.value = '';
  }
    document.querySelector('#event').innerHTML = msg;
}

let elem = document.querySelector('input');
elem.addEventListener('keydown', handleKey);
```

<iframe title="Обработка событий клавиатуры" src="./demos/keyboard-events.html"></iframe>

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
let elem = document.querySelector('#custom');
elem.addEventListener('click', handleClick);
```

<iframe title="Обработка событий мыши" src="./demos/mouse-events.html"></iframe>
