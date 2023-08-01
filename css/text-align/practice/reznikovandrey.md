🛠 Свойство `text-align` можно использовать для выравнивания изображений.

Тэг [`img`](/html/img/) является строчным (`display: inline`).

Чтобы выровнять его по горизонтали необходимо:
1. Чтобы родитель был блочным элементом (`display: block`).
1. Применить свойство `text-align` к родителю.

```html
<div class="parent">
  <img alt="..." src="..." class="image" />
</div>
```

```css
.parent {
  width: 100%;
  padding: 16px;
  /* Центрируем изображение */
  text-align: center;
}
```

<iframe title="Пример выравнивания изображения по горизонтали" src="../demos/image-align/" height="116"></iframe>

