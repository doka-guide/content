### `navigator`

Чтобы проверить, есть ли в `navigator` необходимая вам фича, используйте `in`:

```js
if ('bluetooth' in navigator) {
  // Есть доступ к Bluetooth API.
}

if ('serviceWorker' in navigator) {
  // Есть доступ к Service Worker API.
}
```

### `screen`

Чтобы узнать, сколько пикселей занимает по ширине экран без полосы прокрутки (актуально для Windows, где полоса прокрутки отнимает какое-то пространство), используйте `availWidth`:

```js
// Без учёта полосы:
const screenWidth = screen.width

// С учётом полосы прокрутки:
const withoutScrollBar = screen.availWidth
```

### `location`

Чтобы программно перейти на другую страницу, используйте `location.href`.

Перейти по адресу на текущем сайте:
```js
location.href = '/another-page'
```

Чтобы перейти на другой сайт, укажите его URL полностью:
```js
location.href = 'https://google.com'
```

Чтобы узнать полный путь от корня сайта, используйте `location.pathname`:

```js
// https://out-great-service.io/full/path/to/current/page

const path = location.pathname
console.log(path)
// '/full/path/to/current/page'
```

### `history`

Чтобы изменить адрес без перезагрузки страницы, используйте `history.pushState()`:

```js
history.pushState(null, '', '/new/page/url')
```

Для передачи данных, ассоциированных с переходом, используйте первый аргумент в `history.pushState()`:

```js
const transitionData = { userName: 'Alex' }
history.pushState(transitionData, '', '/new/page/url')
```

После изменения url может потребоваться изменить заголовок - используйте `document.title`.

```js
document.title = 'Это новая страница!'
```

### `localStorage`

Используйте функции-обёртки, чтобы получать доступ к хранилищу безопасно и не забывать превращать данные в JSON-строку при записи и в объект при чтении:

```js
function saveToStorage(key, data) {
  try {
    // Если браузер не поддерживает localStorage,
    // блок try обезопасит код от неожиданной ошибки.
    window.localStorage.setItem(key, JSON.stringify(data))
  }
  catch {
    console.error('Failed to save data to local storage.')
  }
}

function loadFromStorage(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  }
  catch {
    console.error('Failed to load data from local storage.')
  }
}

saveToStorage('user', {name: 'Alex', age: 26})
loadFromStorage('user')
```
