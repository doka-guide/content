---
title: "`anchor-size()`"
description: "Задаем размеры элемента на основе размеров якоря."
baseline:
  - group: anchor-positioning
    features:
      - css.properties.width.anchor-size
      - css.properties.height.anchor-size
      - css.properties.inline-size.anchor-size
      - css.properties.block-size.anchor-size
authors:
  - akhmadullin
related:
  - css/anchor-name
  - css/position-anchor
  - css/anchor-function
tags:
  - doka
---

## Кратко

Функция `anchor-size()` возвращает размеры якорного элемента.

## Пример

```css
.target {
  width: anchor-size(width);
}
```

## Как пишется

Функция `anchor-size()` принимает три аргумента:

- `<anchor-name>` — имя якоря, размеры которого нужно получить. Необязатальный аргумент, если его опустить, то функция будет ссылаться на значение указанное в свойстве [`position-anchor`](/css/position-anchor/);
- `<anchor-size>` — параметр, значение которого нужно получить, например, [`width`](/css/width/) или [`height`](/css/height/);
- `<length-percentage>` – фолбэк-значение, применится, если функция не нашла якорный элемент, на который мы пытаемся сослаться, или если передали некорректное значение для `<anchor-size>`. Необязатальный аргумент.

```css
.anchor {
  anchor-name: --my-anchor;
}

.target {
  /*
    Функция anchor-size() будет использовать якорь --my-anchor,
    указанный в свойстве anchor-name,
    поскольку в неё явно не передан никакой другой якорь.
  */
  width: anchor-size(width);
  /*
    В данном случае функция anchor-size() будет ссылаться на якорь --custom-anchor.
    Якорь --my-anchor из свойства anchor-name будет проигнорирован.
  */
  width: anchor-size(--custom-anchor width);
  /*
    В этом примере target элемент будет иметь width: 200px,
    если по каким-то причинам функция anchor-size()
    не сможет получить размеры ширины переданного якоря.
  */
  width: anchor-size(--custom-anchor width, 200px);
}
```

В отличие от [`anchor()`](/css/anchor-function/) функция `anchor-size()` умеет работать со значениями из противоположной оси.

```css
.target {
  /*
    Можно задать ширину таргет элемента на основе ширины якоря.
  */
  width: anchor-size(width);
  /*
    Также можно задать ширину таргета на основе высоты якоря.
  */
  width: anchor-size(height);
}
```

Также при работе с функцией `anchor-size()` можно использовать её значение в вычислениях

```css
.target {
  width: calc(anchor-size(width) + 50px);
}
```

и взаимодействовать с [логическими свойствами](/css/logical-properties/)

```css
.target {
  inset-size: anchor-size(inline);
}
```

## Как понять

С помощью `anchor-size()` можно получить значения ширины и высоты якорного элемента. Функция пригодится, если размеры таргет элемента должны зависеть от размеров якоря.

Лучше понять работу функции `anchor-size()` поможет демка ниже.

<iframe title="Демонстрация работы функции anchor-size()" src="demos/anchor-size/" height="480"></iframe>
