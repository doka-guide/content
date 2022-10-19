🛠 С помощью `Geolocation API` можно получить координаты пользователя, а после найти по ним место на карте. Для этого создадим небольшую функцию, которая соберёт ссылку с долготой и широтой, а после вставим её в `iframe` c картой:

```js
button.addEventListener('click', findLocation) // на клик по кнопке ищем локацию

function findLocation() {
  if (!navigator.geolocation) {
    status.textContent = 'Ваш браузер не дружит с геолокацией...'
  } else {
    navigator.geolocation.getCurrentPosition(success, error)
  }

  function success(position) {  // если всё хорошо, собираем ссылку
    const { longitude, latitude }  = position.coords

    map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}&amp;layer=mapnik`
  }

  function error() { // если всё плохо, просто напишем об этом
    status.textContent = 'Не получается определить вашу геолокацию :('
  }
}
```

Если кликнуть по кнопке, карта приблизится к вашему местоположению:

<iframe title="Местоположение на карте" src="../demos/practice" height="550"></iframe>

🛠 Удобно проверить в самом начале, есть ли у нас возможность работать с геолокацией. Для этого в нашей функции `findLocation` есть следующая конструкция:

```js
if (!navigator.geolocation) {
  status.textContent = 'Ваш браузер не дружит с геолокацией...'
} else {
  navigator.geolocation.getCurrentPosition(success, error)
}
```

`navigator.geolocation` принимает значения типа [`boolean`](/js/boolean/), так что если с геолокацией нельзя поработать, мы можем сразу сообщить об этом. Но если всё хорошо, то остаётся лишь запросить геолокацию и передать её колбэкам 🙂
