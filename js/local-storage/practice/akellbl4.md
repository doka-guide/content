🛠 При помощи `localStorage` можно сохранять данные, относящиеся к пользователю, не храня их на сервере. В следующем примере мы будем запоминать размер шрифта на сайте и восстанавливать размер из хранилища, если он был изменён до этого.

<iframe title="Сохранение пользовательских настроек — localStorage — Дока" src="../demos/user-settings/" height="530"></iframe>

🛠 Можно использовать для синхронизации нескольких открытых в браузере вкладок. При изменении размера шрифта в одной вкладке мы узнаем об этом во всех остальных и тоже изменим размер.

```js
function changePageFontSize(size) {
  document.style.fontSize = `${size}px`
}

window.addEventListener('storage', function (evt) {
  if (evt.key === 'pageFontSize') {
    changePageFontSize(evt.newValue)
  }
})
```

🛠 Иногда нам нужно сохранить не просто текст, а целую структуру данных, и в этом нам поможет [`JSON.stringify()`](/tools/json/#primer-preobrazovaniya-obekta-javascript-v-format-json).

```js
const user = {
  name: 'Дока Дог',
  avatarUrl: 'mascot-doka.svg'
}

localStorage.setItem('user', JSON.stringify(user))
```

И после чтения парсим:

```js
function readUser() {
  const userJSON = localStorage.getItem('user')

  if (userJSON === null) {
    return undefined
  }

  // Если вдруг в хранилище оказался невалидный JSON предохраняемся от этого
  try {
    return JSON.parse(userJSON)
  } catch (e) {
    localStorage.removeItem('user')
    return undefined
  }
}

console.log(readUser())
// {
//  name: 'Дока Дог',
//  avatarUrl: 'mascot-doka.svg'
// }
```

🛠 Если ваш сайт использует скрипты аналитики или другие внешние библиотеки, то они также имеют доступ к хранилищу. Поэтому лучше именовать ключи для записи в хранилище с префиксом в едином стиле. Например, при записи чего-либо на таком сайте я бы выбрал префикс `YD_{название ключа}`, тогда можно сгруппировать только нужные значения или отфильтровать их в инструментах разработчика.

🛠 Используйте функции-обёртки для предотвращения ошибок, связанных с неудачными попытками записи, отсутствием `localStorage` в браузере и дублированием кода.

```js
function getItem(key, value) {
  try {
    return window.localStorage.getItem(key)
  } catch (e) {
    console.log(e)
  }
}

function setItem(key, value) {
  try {
    return window.localStorage.setItem(key, value)
  } catch (e) {
    console.log(e)
  }
}

function setJSON(key, value) {
  try {
    const json = JSON.stringify(value)

    setItem(key, json)
  } catch (e) {
    console.error(e)
  }
}

function getJSON(key) {
  try {
    const json = getItem(key)

    return JSON.parse(json)
  } catch (e) {
    console.error(e)
  }
}
```
