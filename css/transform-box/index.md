---
title: "`transform-box`"
description: "Определяет область элемента к которой применяются свойства трансформации."
authors:
  - bellabzhu
related:
  - css/animation
  - css/transform-origin
  - html/svg
tags:
  - doka
  - placeholder
---

## Кратко

Свойство `transform-box` определяет область элемента к которой применяются [трансформации](/css/transform/).

## Пример

Чаще всего `transform-box` используется при работе с векторными изображениями и анимациями.

Если указать значение `fill-box`, то [`transform-origin`](/css/transform-origin/) будет отсчитывать значение от центра векторного объекта, а не от центра всего SVG-холста. Наглядно это можно увидеть в анимации вращения.

<iframe title="Демонстрация свойства" src="demos/base/" height="500"></iframe>

## Как пишется

```html
<div class="element"></div>
```

```css
.element {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  transform: perspective(17px);
}
```

## Как понять

Разные значения `transform-box` заставляют [`transform`](/css/transform/) и [`transform-origin`](/css/transform-origin/) работать по-другому. Свойство не наследуется на дочерние объекты.

**Может принимать значения:**

- `content-box`;
- `border-box`;
- `fill-box`;
- `stroke-box`;
- `view-box` — значение по умолчанию;
