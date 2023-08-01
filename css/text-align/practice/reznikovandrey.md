🛠 Свойство `text-align` можно использовать для выравнивания изображений.

Тэг [`img`](/html/img/) является строчным (`display: inline`).
Чтобы выровнять его по горизонтали, необходимо:
- чтобы родитель был блочным элементом (`display: block`)
- применить свойство `text-align` к родителю
```html
<div class="parent">
  <img alt="..." src="..." class="image" />
</div>
```

```css
.parent {
  width: 100%;
  padding: 16px;
  text-align: center; /* Центрируем изображение */
}
```

<iframe title="Пример выравнивания изображения по горизонтали" src="../demos/image-align/" height="116"></iframe>

