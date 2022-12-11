---
title: "`perspective`"
authors:
  - doka-dog
tags:
  - doka
  - placeholder
---

## Кратко

Свойство `perspective` определяет расстояние от пользователя до _задней стенки_ экрана по оси _z_. Таким образом можно придать глубину элементу к которому применяется свойство [`transform`](/css/transform/). Эффект заметен только при 3D-трансформациях.

При определении свойства `perspective` для элемента, эффект применяется к его *дочерним* элементам.

## Как пишется

Значение по умолчанию — `none`. Оно отменяет перспективу.

Значением может быть положительное число в доступных [единицах измерения](/css/numeric-types/).

## Статичный пример

```css
  .parent {
    width: 200px;
    perspective: 50px;
  }

  .child {
    background-color: green;
    transform: rotateX(15deg);
  }
```

```html
  <div class="parent">
    <div class="child">Perspective: 50</div>
  </div>
```

<iframe title="Cтатичный пример свойства perspective" src="demos/static-example/" height="200"></iframe>