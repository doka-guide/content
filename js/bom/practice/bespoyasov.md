### `navigator`

Чтобы проверить, есть ли в `navigator` необходимая вам фича, используйте `in`:

```js
if (`bluetooth` in navigator) {
  // Есть доступ к Bluetooth API.
}

if (`serviceWorker` in navigator) {
  // Есть доступ к Service Worker API.
}

//  ...
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

Чтобы программно перейти на другую страницу, используйте `location.href`:

```js
location.href = "/another-page"
// Так браузер перейдёт на страницу
// по адресу another-page на текущем сайте.

location.href = "https://google.com"
// так браузер перейдёт на другой сайт.
```

Чтобы узнать полный путь от корня сайта, используйте `location.pathname`:

```js
// https://out-great-service.io/full/path/to/current/page

const path = location.pathname
// path === "/full/path/to/current/page"
```

### `history`

Чтобы изменить адрес без перезагрузки страницы, используйте `history.pushState`:

```js
history.pushState(null, null, "/new/page/url")
```

Для передачи данных, ассоциированных с переходом, используйте первый аргумент в `history.pushState`, а для указания нового заголовка страницы — второй:

```js
const transitionData = { userName: "Alex" }
const newPageTitle = "Hello world!"
history.pushState(transitionData, newPageTitle, "/new/page/url")
```

Если заголовок не изменился (из-за плохой поддержки браузерами) - используйте `document.title`.

```js
document.title = 'Hello world!';
```

### `localStorage`

Используйте функции-обёртки, чтобы получать доступ к хранилищу безопасно и не забывать превращать данные в JSON-строку при записи и в объект при чтении:

```js
function saveToStorage(key, data) {
  try {
    // Если браузер не поддерживает localStorage,
    // блок try обезопасит код от неожиданной ошибки.
    window.localStorage.setItem(key', JSON.stringify(data));
  }
  catch {
    alert('Failed to save data to local storage.');
  }
}

function loadFromStorage(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  }
  catch {
    alert('Failed to load data from local storage.');
  }
}

saveToStorage('user', {name: 'Alex', age: 26});
loadFromStorage('user');
```
