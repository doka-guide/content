🛠 Базовая обработка событий клавиатуры.

Пример приведенный ниже обрабатывает нажатие клавиш на клавиатуре, когда фокус установлен в поле ввода.
В момент нажатия клавиш выводится их `keycode`, а так же по нажатию клавиши _Enter_ добавляется сообщение, которое было введено в поле.

```html
<div class="event">Ожидание ввода...</div>
<input type="text" placeholder="Введите сообщение">
<div class="result"></div>
```

```js
const element = document.querySelector('input');

element.addEventListener('keydown', function (event) {
  const message = '<code>' + event.key + '</code>';
  const value = event.targer.value;

  if (event.key === 'Enter' && value.lenght > 0) {
    const messageElement = document.createElement('div');

    messageElement.classList.add("message");
    messageElement.innerText = value;
    document.querySelector('.result').appendChild(messageElement);
    event.target.value = '';
  }

  document.querySelector('.event').innerHTML = message;
});
```

<iframe title="Обработка событий клавиатуры — Element.addEventListener() — Дока" src="../demos/keyboard-events/" height="450"></iframe>

🛠 Предотвращение срабатывания события по умолчанию.

В этом примере мы видим стандартное поведение ссылки и переопределенное поведение, которое отменяет дефолтное с помощью функции `event.preventDefault()`. Вместо перехода по ссылке пример реализует отображение сообщения.

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
