🛠 При помощи `localStorage` можно сохранять данные, относящиеся к пользователю, не храня их на сервере. Запомним размер шрифта на сайте и восстановим его из хранилища при следующем визите.

<iframe title="Сохранение пользовательских настроек" src="../demos/user-settings/" height="560"></iframe>

🛠 Можно использовать для синхронизации нескольких открытых в браузере вкладок. При изменении размера шрифта в одной вкладке мы узнаем об этом во всех остальных и тоже изменим размер.

```js
function changePageFontSize(size) {
  document.documentElement.style.fontSize = `${size}em`
}

window.addEventListener('storage', function (evt) {
  // После removeItem() в newValue придёт null
  if (evt.key === 'pageFontSize' && evt.newValue !== null) {
    changePageFontSize(evt.newValue)
  }
})
```

🛠 Иногда нужно сохранить не просто текст, а целую структуру данных. Для этого подойдёт [`JSON.stringify()`](/tools/json/#primer-preobrazovaniya-obekta-javascript-v-format-json).

```js
const settings = {
  theme: 'dark',
  fontSize: 1.2
}

localStorage.setItem('settings', JSON.stringify(settings))
```

После чтения превращаем строку обратно в объект через `JSON.parse()`:

```js
function readSettings() {
  const settingsJSON = localStorage.getItem('settings')

  if (settingsJSON === null) {
    return undefined
  }

  // Если в хранилище некорректный JSON, удаляем его
  try {
    return JSON.parse(settingsJSON)
  } catch (e) {
    localStorage.removeItem('settings')
    return undefined
  }
}

console.log(readSettings())
// {
//  theme: 'dark',
//  fontSize: 1.2
// }
```

🛠 Скрипты аналитики и другие внешние библиотеки пишут в то же хранилище, что и ваш сайт. Чтобы ваши ключи не совпали с чужими, давайте им общий префикс, например `doka_theme` и `doka_fontSize`. По префиксу свои ключи легко найти в инструментах разработчика. Защиты префикс не даёт: чужой скрипт прочитает такие ключи так же легко.

🛠 Используйте функции-обёртки. Они перехватывают ошибки и избавляют от дублирования кода. Ошибка бывает, когда хранилище переполнено (`QuotaExceededError`) или браузер запретил сайту доступ к нему, например если пользователь заблокировал данные сайтов. `setItem()` здесь возвращает `false`, если запись не удалась.

```js
function getItem(key) {
  try {
    return window.localStorage.getItem(key)
  } catch (e) {
    console.error(e)
  }
}

function setItem(key, value) {
  try {
    window.localStorage.setItem(key, value)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

function setJSON(key, value) {
  try {
    const json = JSON.stringify(value)

    return setItem(key, json)
  } catch (e) {
    console.error(e)
    return false
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
