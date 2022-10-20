🛠 `sessionStorage` в реальных проектах используется достаточно редко, но иногда может быть полезен. Например, если мы не хотим потерять данные, когда пользователь случайно обновил страницу.

<iframe title="Сохранение данных формы — sessionStorage — Дока" src="../demos/form-data/" height="470"></iframe>

🛠 Иногда нам нужно сохранить не просто текст, а целую структуру данных, и в этом нам поможет [`JSON.stringify()`](/tools/json/#preobrazovanie-v-json).

```js
const user = {
  name: 'Дока Дог',
  avatarUrl: 'mascot-doka.svg'
}

sessionStorage.setItem('user', JSON.stringify(user))
```

И после чтения парсим:

```js
function readUser() {
  const userJSON = sessionStorage.getItem('user')

  if (userJSON === null) {
    return undefined
  }

  // Если вдруг в хранилище оказался невалидный JSON предохраняемся от этого
  try {
    return JSON.parse(userJSON)
  } catch (e) {
    sessionStorage.removeItem('user')
    return undefined
  }
}

console.log(readUser())
// {
//   name: 'Дока Дог',
//   avatarUrl: 'mascot-doka.svg'
// }
```

🛠 Если ваш сайт использует скрипты аналитики или другие внешние библиотеки, то они также имеют доступ к хранилищу. Поэтому лучше именовать ключи для записи в хранилище с префиксом в едином стиле. Например, при записи чего-либо на таком сайте я бы выбрал префикс `YD_{название ключа}`, тогда можно сгруппировать только нужные значения или отфильтровать их в инструментах разработчика.

🛠 Используйте функции-обёртки для предотвращения ошибок, связанных с неудачными попытками записи, отсутствием `sessionStorage` в браузере и дублированием кода.

```js
function getItem(key, value) {
  try {
    return window.sessionStorage.getItem(key)
  } catch (e) {
    console.log(e)
  }
}

function setItem(key, value) {
  try {
    return window.sessionStorage.getItem(key, value)
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
