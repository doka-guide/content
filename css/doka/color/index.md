---
title: "color"
author: grachev
---

## Кратко

Свойство `color` определяет цвет текста.

## Пример

Наследует значение свойства color у ближайшего родителя, у которого оно указано:

```css
.element {
  color: currentColor;
}
```

Задаёт значение по названию цвета:

```css
.element {
  color: red;
  color: orange;
  color: tan;
  color: rebeccapurple;
}
```

HEX-код цвета:

```css
.element {
  color: #090;
  color: #009900;
  color: #090a;
  color: #009900aa;
}
```

Значение RGB:

```css
.element {
  color: rgb(34, 12, 64, 0.6);
  color: rgba(34, 12, 64, 0.6);
  color: rgb(34 12 64 / 0.6);
  color: rgba(34 12 64 / 0.3);
  color: rgb(34 12 64 / 60%);
  color: rgba(34.6 12 64 / 30%);
}
```

Значение HSL:

```css
.element {
  color: hsl(30, 100%, 50%, 0.6);
  color: hsla(30, 100%, 50%, 0.6);
  color: hsl(30 100% 50% / 0.6);
  color: hsla(30 100% 50% / 0.6);
  color: hsl(30 100% 50% / 60%);
  color: hsla(30.2 100% 50% / 60%);
}
```

Наследует цвет у родительского элемента оставляет изначальный или оставляет произвольный:

```css
.element {
  color: inherit;
  color: initial;
  color: unset;
}
```
