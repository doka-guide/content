🛠 Часто возникает необходимость отправить данные из формы на сервер без перезагрузки страницы. Поведение по умолчанию формы — это отправка запроса на сервер и перезагрузка страницы. И тут нам на помощь приходит метод `preventDefault()`, который отменит действия связанные с отправкой формы:

```html
<form class="discount-form">
  <label for="promocode">Промокод</label>
  <input id="promocode" type="text" name="promocode" placeholder="WIN-1234" required>
  <button type="submit">Применить</button>
</form>
```

```js
const form = document.querySelector('.discount-form')
form.addEventListener('submit', (event) => {
    event.preventDefault()

    // код по подготовке данных
    // и их отправка на сервер
})
```

Подробнее этот подход разбирается в статье «[Работа с формами](/js/deal-with-forms/)».
