---
title: "`writing-mode`"
description: "«Зеркалим» сайт: блоки и текст пишутся не слева направо, а справа налево."
authors:
  - doka-dog
keywords:
  - поворот текста
related:
  - css/flex-direction
  - css/lang
  - css/text-orientation
tags:
  - doka
  - placeholder
---

## Кратко

Свойство `writing-mode` задаёт направление строк и блоков: как текут строки текста и где располагаются элементы. Полезно для вертикального письма и многоязычных сайтов.

## Пример

```css
.horizontal {
  writing-mode: horizontal-tb;
}

.vertical-rl {
  writing-mode: vertical-rl;
}

.vertical-lr {
  writing-mode: vertical-lr;
}
```

<iframe title="Свойство writing-mode" src="demos/basic/" height="300"></iframe>

## Как пишется

Возможные значения:

- `horizontal-tb` — значение по умолчанию, текст и блоки переносятся сверху вниз (top bottom).
- `vertical-rl` — текст и блоки переносятся справа налево (right left).
- `vertical-lr` — текст и блоки переносятся слева направо (left right).

## Подсказки

💡 Влияет на направление не только текста, но и порядок блоков, например, порядок колонок.