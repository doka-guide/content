🛠 Обычно, когда я хочу точно-точно спрятать элемент, чтобы он не получал фокус ни при каких обстоятельствах и не был виден даже скринридерам, но при этом хочу плавно показать его по какому-то триггеру, то указываю одновременно несколько _скрывающих_ свойств и использую трюк с `transition`:

```css
.parent {
  padding: 15px;
  border: 1px solid currentColor;
}

.block {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
}

.parent:hover .block {
  visibility: visible;
  opacity: 1;
  transition: visibility 0s linear 0s, opacity 300ms;
}
```

```html
<div class="parent">
  <div class="block">Я простой текст. Наводишь курсор и я показываюсь</div>
</div>
```

<iframe title="Свойство visibility" src="../demos/trick/" height="200"></iframe>
