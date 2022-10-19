🛠 С помощью смежного комбинатора удобно выбирать группу одинаковых элементов по принципу «все, кроме первого» — например, чтобы задать отступ.

К первому `<li>` стили не применятся, поскольку перед ним нет другого `<li>`:

```html
<ul>
  <li>Первый пункт</li>
  <li>Второй пункт</li>
  <li>Третий пункт</li>
  <li>Четвёртый пункт</li>
</ul>
```

```css
li + li {
  margin-top: 1em;
}
```

Классический пример — вёрстка «звёздного» рейтинга. Для начала опишем структуру:

```html
<div class="rating">
  <button>★</button>
  <button>★</button>
  <button>★</button>
  <button>★</button>
  <button>★</button>
</div>
```

И стили:

```css
button {
  border: none;
  background-color: transparent;
  font-size: 5em;
}

button:hover,
button:focus,
button:hover ~ button,
button:focus ~ button {
  color: #F498AD;
}
```

Но сейчас при наведении курсора будут выделяться все элементы _после_ (то есть справа).

<iframe title="Звёздный рейтинг" src="../demos/stars-rating-bug/" height="200"></iframe>

Чтобы это исправить, мы изменим порядок следования элементов с помощью CSS-свойства `direction: rtl`.

Добавим это свойство родителю звёздочек `.rating`:

```css
.rating {
  direction: rtl;
}

button {
  border: none;
  background-color: transparent;
  font-size: 5em;
}

button:hover,
button:focus,
button:hover ~ button,
button:focus ~ button {
  color: #F498AD;
}
```

<iframe title="Звёздный рейтинг" src="../demos/stars-rating/" height="200"></iframe>
