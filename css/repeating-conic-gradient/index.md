---
title: "`repeating-conic-gradient()`"
description: "Всего одна функция для повторяющегося конического градиента!"
authors:
  - solarrust
tags:
  - doka
---

## Кратко

Удобная функция для создания повторяющегося конического градиента.

## Пример

В примере ниже мы описываем три цвета, последний из которых заканчивается на 45 градусах.

```css
div {
  background-image:
    repeating-conic-gradient(
      from 0deg,
      #9d6eea 0deg 15deg,
      #6600e9 15deg 30deg,
      #b394e9 30deg 45deg
    );
}
```

<iframe title="Базовый пример" src="demos/basic/" height="320"></iframe>

## Как пишется

Функция `repeating-conic-gradient()` принимает те же аргументы, что и [`conic-gradient`](/css/conic-gradient/). Основное отличие заключается в том, что градиент будет повторять себя после границы последнего цвета.

Этот эффект наиболее заметен, когда граница последнего цвета находится в пределах поля градиента.

В этом примере граница последнего цвета находится на 60 градусах. В итоге в полный круг помещается 6 полных повторений градиента.

```css
div {
  background-image:
    repeating-conic-gradient(
      from 0deg,
      #A100FFFF 0 30deg,
      #71C4FFFF 30deg 60deg
    );
}
```

<iframe title="Объяснение повторения" src="demos/repeating/" height="320"></iframe>

При помощи комбинации с [`background-size`](/css/background-size/) можно рисовать паттерны:

```css
body {
  background-size: 260px 260px;
  background-image:
    repeating-conic-gradient(
      from 45deg,
      #000 0% 25%,
      #eee 0% 50%
    );
}
```

<iframe title="Паттерн" src="demos/pattern/" height="250"></iframe>
