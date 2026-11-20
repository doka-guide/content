---
title: "`border-block`"
description: "Создаёт рамки элементу по блочной оси."
baseline:
  - group: logical-properties
    features:
      - css.properties.border-block
authors:
  - inventoris
contributors:
  - starhamster
related:
  - css/border-width
  - css/border-style
  - css/border-color
tags:
  - doka
---

## Кратко

`border-block` — это логическое свойство-шорткат. Он создаёт у элемента рамки по блочной оси.

Блочная ось связана с направлением [потока сайта](/html/flow/). Например, для русского и английского языков `border-block` рисует границу сверху и снизу элемента (поток идёт сверху вниз), а для японского справа и слева (поток идёт справа налево).

## Пример

```css
div {
  border-block: 5px solid white;
}
```

<iframe title="Рамка по блочной оси" src="demos/border-block-basic/" height="250"></iframe>

## Как понять

С помощью `border-block` граница нарисуется всегда там, где нужно, вне зависимости от языка 😎

Допустим, мы хотим выделить текст сверху и снизу аккуратными границами. Попробуем сделать это с помощью свойств `border-top` и `border-bottom`:

```css
div {
  border-top: 7px dashed white;
  border-bottom: 7px dashed white;
}
```

<iframe title="Рамка сверху и снизу блока" src="demos/border-top-bottom/" height="250"></iframe>

А теперь текст будет на японском языке, для этого сменим поток и посмотрим, что будет:

```css
div {
  writing-mode: vertical-rl;
}
```

<iframe title="Рамка при смене языка" src="demos/border-language-change/" height="250"></iframe>

Язык другой, направление письма другое, а границы всё там же — сверху и снизу. Теперь используем правильное свойство `border-block` и снова понаблюдаем:

```css
div {
  writing-mode: vertical-rl;
  border-block: 7px dashed white;
}
```

<iframe title="Рамка по блочной оси при смене языка" src="demos/border-block-language-change/" height="250"></iframe>

Сейчас всё логично: стиль письма справа налево, и граница справа и слева текста, как мы и хотели. `border-block` обо всём позаботился!

<aside>

🧠 японское «鯖» из примеров переводится как «скумбрия».

</aside>

## Как пишется

`border-block` пишется так же, как и [`border`](/css/border/), а ещё сокращает такие же свойства. Отличие лишь в том, что `border` в записи заменяется на `border-block`:

- `border-block-width` — ширина границы;
- `border-block-style` — стиль границы;
- `border-block-color` — цвет границы.

Можно отдельно стилизовать одну из границ по аналогии с `border-top` и `border-bottom`:

- `border-block-start` — первая граница по направлению блочной оси;
- `border-block-end` — вторая граница.

## Подсказки

💡 Когда нужно, чтобы видимые границы блока разместились в противоположном блочной оси направлении, используйте свойство [`border-inline`](/css/border-inline/), — оно рисует видимые границы по направлению строчной оси.

```css
div {
  border-inline: 5px solid white;
}
```

<iframe title="Рамка по строчной оси" src="demos/border-inline/" height="300"></iframe>
