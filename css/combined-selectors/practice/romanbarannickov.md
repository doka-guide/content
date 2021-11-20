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

Но сейчас при наведении курсора будут выделяться все элементы _после_ (т. е. справа).

<iframe title="Звёздный рейтинг" src="../demos/stars-rating-bug/" height="250"></iframe>

Чтобы это исправить, мы изменим порядок следования элементов с помощью CSS-свойства `direction: rtl`.

Добавим это свойство классу `rating` элемента, который является родителем для звёздочек:

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

<iframe title="Звёздный рейтинг" src="../demos/stars-rating/" height="250"></iframe>
