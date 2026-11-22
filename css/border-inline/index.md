---
title: "`border-inline`"
description: "Создаёт рамки элементу по строчной оси."
baseline:
  - group: logical-properties
    features:
      - css.properties.border-inline
authors:
  - starhamster
related:
  - css/border-width
  - css/border-style
  - css/border-color
tags:
  - doka
---

## Кратко

`border-inline` — это логическое свойство-шорткат. Оно создаёт у элемента рамки по строчной оси.

Блочная ось связана с направлением [потока сайта](/html/flow/). Так, для русского и английского языков `border-inline` рисует границу слева и справа элемента, а для японского сверху и снизу.

## Пример

```css
div {
  border-inline: 5px solid white;
}
```

<iframe title="Рамка по строчной оси" src="demos/border-inline-basic/" height="240"></iframe>

## Как понять

`border-inline` помогает располагать границы там, где они должны быть, вне зависимости от языка 😎

Нарисуем границы с помощью `border-left` и `border-right`:

```css
div {
  border-left: 7px dashed white;
  border-right: 7px dashed white;
}
```

<iframe title="Рамка блока слева и справа" src="demos/border-left-right/" height="240"></iframe>

А теперь текст будет на японском языке, для этого сменим поток и посмотрим, что будет:

```css
div {
  writing-mode: vertical-rl;
  border-left: 7px dashed white;
  border-right: 7px dashed white;
}
```

<iframe title="Рамка при смене языка" src="demos/border-language-change/" height="260"></iframe>

Язык другой, направление письма другое, а границы всё там же — справа и слева. Это не очень хорошо с точки зрения людей, которые говорят на разных языках. Попробуем исправить это с помощью свойства `border-inline`:

```css
div {
  writing-mode: vertical-rl;
  border-inline: 7px dashed white;
}
```

<iframe title="Рамка по строчной оси при смене языка" src="demos/border-inline-language-change/" height="280"></iframe>

Сейчас всё логично: стиль письма изменил своё направление и границы тоже поменялись. Использование логического свойства исправило ситуацию.

## Как пишется

`border-inline` пишется так же, как и [`border`](/css/border/), а ещё сокращает такие же свойства. Отличие лишь в том, что `border` в записи заменяется на `border-inline`:

- `border-inline-width` — ширина границы;
- `border-inline-style` — стиль границы;
- `border-inline-color` — цвет границы.

Можно отдельно стилизовать одну из границ по аналогии с `border-left` и `border-right`:

- `border-inline-start` — первая граница по направлению строчной оси;
- `border-inline-end` — вторая граница.

## Подсказки

💡 Когда нужно, чтобы видимые границы блока разместились в направлении блочной оси, используйте свойство [`border-block`](/css/border-block/).

```css
div {
  border-block: 5px solid white;
}
```

<iframe title="Рамка по блочкой оси" src="demos/border-block/" height="260"></iframe>
