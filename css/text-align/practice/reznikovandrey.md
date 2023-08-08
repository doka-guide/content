🛠 Свойство `text-align` можно использовать для выравнивания изображений.

Тег [`<img>`](/html/img/) является строчным (`display: inline`).

Один из вариантов выравнивания картинки по горизонтали:
1. Убедиться, что родитель является блочным элементом (`display: block`).
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

