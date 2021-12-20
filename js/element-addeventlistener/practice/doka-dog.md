🛠 Базовая обработка событий клавиатуры.

С помощью событий, можно обрабатывать нажатие клавиш на клавиатуре, когда фокус установлен в поле ввода.
В момент нажатия клавиш будем выводить код клавиши, а по нажатию клавиши _Enter_ добавлять сообщение, которое было введено в поле.

```html
<div class="event">Ожидание ввода...</div>
<input type="text" placeholder="Введите сообщение">
<div class="result"></div>
```

Для этого подпишемся на событие [`keydown`](/js/element-keydown-keyup/). Каждое нажатие клавиши будет создавать событие 'keydown' и функция будет срабатывать. Внутри функции будем получать код клавиши из свойства `key` объекта события. Если код клавиши оказался `'Enter'`, то будем сбрасывать значение в поле ввода и выводить результат.

```js
const element = document.querySelector('input')

element.addEventListener('keydown', function (event) {
  const message = '<code>' + event.key + '</code>'
  const value = event.target.value

  if (event.key === 'Enter' && value.length > 0) {
    const messageElement = document.createElement('div')

    messageElement.classList.add('message')
    messageElement.innerText = value
    document.querySelector('.result').appendChild(messageElement)
    event.target.value = ''
  }

  document.querySelector('.event').innerHTML = message
})
```

<iframe title="Обработка событий клавиатуры — Element.addEventListener() — Дока" src="../demos/keyboard-events/" height="450"></iframe>

🛠 Предотвращение срабатывания события по умолчанию.

В этом примере мы заменим стандартное поведение в случае, когда пользователь кликает на ссылку. Чтобы стандартное поведение не сработало, нужно вызывать метод `preventDefault` у события.

```html
<a href="https://yandex.ru" target="_blank">Ссылка на Яндекс</a>
<a href="https://yandex.ru" target="_blank" id="custom">Ссылка с измененным поведением</a>
<div id="result"></div>
```

Подпишемся на событие клика по ссылке и вызовем метод `preventDefault`. После этого определим собственное поведение элемента. Например, будем выводить сообщение на экран:

```js
const linkElement = document.querySelector('#custom')
const resultElement = document.querySelector('#result')

linkElement.addEventListener('click', function (event) {
  event.preventDefault()

  resultElement.innerText = 'Вы нажали на ссылку, но ничего не произошло!'
  setTimeout(function () {
    resultElement.innerText = ''
  }, 2500)
})
```

<iframe title="Обработка событий мыши — Element.addEventListener() — Дока" src="../demos/mouse-events/" height="320"></iframe>
