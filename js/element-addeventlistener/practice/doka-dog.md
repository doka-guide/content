🛠 Базовая обработка событий клавиатуры.

С помощью событий можно обрабатывать нажатие клавиш на клавиатуре, когда фокус установлен в поле ввода.
В момент нажатия клавиш будем выводить значение клавиши из свойства `key`, а по нажатию клавиши <kbd>Enter</kbd> добавлять сообщение, которое было введено в поле.

```html
<div class="event">Ожидание ввода...</div>
<input type="text" placeholder="Введите сообщение">
<div class="result"></div>
```

Для этого подпишемся на событие [`keydown`](/js/element-keydown/). Оно срабатывает на каждое нажатие клавиши. Значение клавиши берём из свойства `key` объекта события. Если это `'Enter'`, сбрасываем поле ввода и выводим сообщение.

Исключение — набор через IME. Это способ ввода, где слово собирают из нескольких нажатий: так набирают по-китайски или по-японски. Там <kbd>Enter</kbd> подтверждает слово, поэтому проверяем две вещи:

- `event.isComposing` — набор ещё идёт;
- `event.keyCode === 229` — нужно для Safari. Он присылает этот <kbd>Enter</kbd> уже после конца набора, с `isComposing`, равным `false`. Код `229` проверяем через устаревшее свойство `keyCode`.

```js
const element = document.querySelector('input')

element.addEventListener('keydown', function (event) {
  const value = event.target.value

  const isIme = event.isComposing || event.keyCode === 229

  if (event.key === 'Enter' && !isIme && value.length > 0) {
    const messageElement = document.createElement('div')

    messageElement.classList.add('message')
    messageElement.textContent = value
    document.querySelector('.result').appendChild(messageElement)
    event.target.value = ''
  }

  const keyElement = document.createElement('code')
  keyElement.textContent = event.key
  document.querySelector('.event').replaceChildren(keyElement)
})
```

<iframe title="Обработка событий клавиатуры" src="../demos/keyboard-events/" height="480"></iframe>

🛠 Отмена стандартного действия браузера.

Заменим стандартное поведение при клике по ссылке. Чтобы стандартное поведение не сработало, нужно вызвать метод `preventDefault()` у события.

```html
<a href="https://yandex.ru" target="_blank">
  Ссылка на Яндекс
</a>
<a href="https://yandex.ru" target="_blank" id="custom">
  Ссылка с изменённым поведением
</a>
<div id="result"></div>
```

Подпишемся на событие клика по ссылке и вызовем метод `preventDefault()`. После этого определим собственное поведение элемента. Например, будем выводить сообщение на экран:

```js
const linkElement = document.querySelector('#custom')
const resultElement = document.querySelector('#result')

linkElement.addEventListener('click', function (event) {
  event.preventDefault()

  resultElement.innerText =
    'Вы нажали на ссылку, но ничего не произошло!'
  setTimeout(function () {
    resultElement.innerText = ''
  }, 2500)
})
```

<iframe title="Обработка событий мыши" src="../demos/mouse-events/" height="320"></iframe>
