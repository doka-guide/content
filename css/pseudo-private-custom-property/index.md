---
title: "Псевдоприватные кастомные свойства"
descriptioin: "Как создать миксины на чистом CSS."
authors:
  - alex-andr-19
related:
  - tools/preprocessors
  - css/layer
  - css/cascade
tags:
  - article
---

## Задача

В силу перехода CSS к нативному нестингу, а также из-за естественного развития CSS многие преимущества препроцессоров стали отходить на второй план. Появились [кастомные свойства](/css/custom-properties/), произошёл взрыв CSS-функций (`color-mix`, [`counter`](/css/css-counters/), тригонометрические функции и другие).

Миксины — последняя причина держаться за препроцессоры. Некоторые особенности миксинов всё ещё заменить не получится. Но есть решение, которое заменит собой большую часть миксинов – _псевдоприватные кастомные свойства_.

## Решение

```html
<section class="product-list">
  <div class="product-list__item product-card primary"></div>
  <div class="product-list__item product-card primary"></div>
  <div class="product-list__item product-card secodary"></div>
  <div class="product-list__item product-card advertisment"></div>
  <div class="product-list__item product-card advertisment"></div>
</section>
```

```css
.product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  .product-list__item {
    width: 100%;
    aspect-ratio: 4/5;
  }
}

.product-card {
  --_background-color: var(--background-color, #46ad8e);
  --_border-color: var(--border-color, #ffffff);

  background-color: var(--_background-color);
  border: 1px solid var(--_border-color);
  border-radius: 12px;

  &.secondary {
    --background-color: #999999;
  }

  &.advertisment {
    --background-color: #efcf2f;
  }
}
```

<iframe title="Пример использования кастомных свойств" src="demos/products-demo/" height="300"></iframe>
