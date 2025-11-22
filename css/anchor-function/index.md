---
title: "`anchor()`"
description: "Позиционируем элемент относительно одной из сторон якоря."
baseline:
  - group: anchor-positioning
    features:
      - css.properties.top.anchor
      - css.properties.right.anchor
      - css.properties.bottom.anchor
      - css.properties.left.anchor
      - css.properties.left.anchor
      - css.properties.inset-block-end.anchor
      - css.properties.inset-block-start.anchor
      - css.properties.inset-block.anchor
      - css.properties.inset-inline-end.anchor
      - css.properties.inset-inline-start.anchor
      - css.properties.inset-inline.anchor
      - css.properties.inset.anchor
authors:
  - akhmadullin
related:
  - css/position
  - css/anchor-name
  - css/position-anchor
tags:
  - doka
---

## Кратко

Функция `anchor()` привязывает таргет элемент к одной из сторон якорного элемента.

## Пример

```css
.target {
  top: anchor(bottom);
}
```

## Как понять

Функция `anchor()` ссылается на параметры позиционирования якорного элемента. Её можно использовать, чтобы расположить таргет элемент в нужном месте относительно якоря. Может быть применена только в [inset-свойствах](/css/inset/).

## Как пишется

Функция `anchor()` принимает три аргумента:

- `<anchor-name>` — имя якоря, относительно которого нужно спозиционировать текущий таргет элемент. Необязятальный аргумент, если его опустить, то функция будет ссылаться на значение указаное в свойстве [`position-anchor`](/css/position-anchor/);
- `<anchor-size>` — сторона якорного элемента, относительно которой нужно спозиционировать текущий таргет элемент;
- `<length-percentage>` – фолбэк-значение, применится, если функция не нашла якорный элемент, на который мы пытаемся сослаться, или если передали некорректное значение для `<anchor-size>`. Необязятальный аргумент.

```css
.anchor {
  anchor-name: --my-anchor;
}

.target {
  /*
    Функция anchor() будет использовать якорь --my-anchor,
    указанный в свойстве anchor-name,
    поскольку в неё явно не передан никакой другой якорь.
  */
  top: anchor(bottom);
  /*
    В данном случае функция anchor() будет ссылаться на якорь --custom-anchor.
    Якорь --my-anchor из свойства anchor-name будет проигнорирован.
  */
  top: anchor(--custom-anchor bottom);
  /*
    В этом примере target элемент будет иметь top: 50%,
    если по каким-то причинам функция anchor() не сможет привязаться
    к указанной стороне переданного якоря.
  */
  top: anchor(--custom-anchor bottom, 50%);
}
```

Чтобы лучше понять, как функция работает, давайте рассмотрим её работу на примере демки:

```css
.anchor {
  anchor-name: --my-anchor;
}

.target {
  position: absolute;
  position-anchor: --my-anchor;
  top: anchor(bottom);
  left: anchor(right);
}
```

<iframe title="Позиционируем элемент с помощью функции anchor()" src="demos/anchor-function-top-left/" height="540"></iframe>

Стоит отметить, что в качестве аргумента `<anchor-size>` в функцию можно передавать только значения, соответствующие оси inset-свойства, для которого функция применяется.

```css
.target {
  /*
    top и bottom находятся в одной оси (вертикальной),
    поэтому следующие две строки будут работать.
  */
  top: anchor(top);
  top: anchor(bottom);
  /*
    top находится в вертикальной оси, left и right в горизонтальной.
    Оси разные, поэтому строчки ниже работать не будут.
  */
  top: anchor(left);
  top: anchor(right);
}
```

Также при работе с функцией `anchor()` можно использовать процентные значения

```css
.target {
  top: anchor(50%);
}
```

использовать её значение в вычислениях

```css
.target {
  top: calc(anchor(bottom) + 10px);
}
```

и взаимодействовать с [логическими свойствами](/css/logical-properties/)

```css
.target {
  inset-block-end: anchor(start);
}
```

Помимо этого в качестве `<anchor-size>` можно ещё использовать значения `inside`, `outside`:

- `inside` – соответствует той же самой стороне, для которой применяется функция `anchor()`;
- `outside` – соответствует противоположной.

<iframe title="Позиционируем элемент с помощью функции anchor() и значений inside, outside" src="demos/anchor-function-inside-outside/" height="440"></iframe>
