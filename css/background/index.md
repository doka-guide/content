---
title: "`background`"
description: "Короткое свойство, чтобы определить всё, что нужно для фона."
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - фоновое изображение
related:
  - css/background-image
  - css/backdrop-filter
  - css/z-index
tags:
  - doka
---

## Кратко

Шорткат, позволяющий задать все свойства фона разом. Объединяет в себе:

- [`background-attachment`](/css/background-attachment/);
- [`background-clip`](/css/background-clip/);
- [`background-color`](/css/background-color/);
- [`background-image`](/css/background-image/);
- [`background-position`](/css/background-position/);
- [`background-repeat`](/css/background-repeat/);
- [`background-size`](/css/background-size/).

## Пример

Код ниже задаёт чёрную заливку фона, фоновую картинку _bkg.png_, которая не будет повторяться, будет расположена по центру по вертикали и горизонтали, а также закроет всю площадь родителя.

```css
div {
  background: #000000 url("bkg.png") no-repeat center / cover;
}
```

## Как пишется

Можно указать одно или несколько значений для разных свойств, разделяя их пробелами. Значения можно писать в любом порядке, браузер сам определит, какое значение к какому свойству относится.

<aside>

⚠️ В произвольном порядке записи свойств есть исключение: в паре `position / size` порядок записи только такой, через слэш. А ещё, если опустить `size`, то `position` сработает, но если опустить `position`, то `size` не сработает.

```css
div {
  /* Сработает */
  background: url("bkg.png") center / cover;
  /* Сработает */
  background: url("bkg.png") center;
  /* Не сработает */
  background: url("bkg.png") cover;
}
```

Лучше не полагаться слишком на это поведение и использовать полные записи: [`background-position`](/css/background-position/) и [`background-size`](/css/background-size/).

</aside>

Ни одно из значений не является обязательным, поэтому ненужные можно смело опустить.

## Подсказки

💡 Как и с любым шорткатом, со свойством `background` нужно обращаться осторожно. Если потребуется переопределить всего одно из заданных значений, то нужно будет переписать и все остальные.

💡 Если в рамках шортката не задано значение для какого-то из свойств и в коде ниже оно не прописано, то свойству устанавливается значение по умолчанию.

💡 Записанные выше отдельные свойства переопределяются заданным ниже свойством `background`.
