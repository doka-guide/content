🛠 Иногда мне нужно спрятать элемент наверняка: чтобы он не получал фокус и скринридеры его не видели. Но показать его я хочу плавно, по какому-то событию. Тогда я задаю сразу два _скрывающих_ свойства и меняю их вместе через `transition`:

```css
.card {
  padding: 15px;
  border: 1px solid currentColor;
}

.card-hint {
  visibility: hidden;
  opacity: 0;
  transition: opacity 300ms, visibility 300ms;
}

.card:hover .card-hint,
.card:focus-within .card-hint {
  visibility: visible;
  opacity: 1;
}
```

Отдельная задержка для `visibility` не нужна. При скрытии элемент остаётся видимым, пока меняется прозрачность, а при показе становится видимым сразу.

```html
<div class="card">
  <button type="button" aria-describedby="hint">
    Наведи или нажми Tab
  </button>
  <div class="card-hint" id="hint">
    Я появляюсь, когда кнопка в фокусе или курсор над карточкой.
  </div>
</div>
```

Скринридер не прочитает спрятанную подсказку сам по себе. Поэтому кнопка ссылается на неё через [`aria-describedby`](/a11y/aria-describedby/): скринридер читает текст по такой ссылке, даже если элемент спрятан.

<iframe title="Свойство visibility" src="../demos/trick/" height="280"></iframe>
