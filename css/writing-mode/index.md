---
title: "`writing-mode`"
description: "«Зеркалим» сайт: блоки и текст пишутся не слева направо, а справа налево."
baseline:
  - group: writing-mode
    features:
      - css.properties.writing-mode
      - css.properties.writing-mode.horizontal-tb
      - css.properties.writing-mode.sideways-lr
      - css.properties.writing-mode.sideways-rl
      - css.properties.writing-mode.vertical-lr
      - css.properties.writing-mode.vertical-rl

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

Свойство `writing-mode` определяет не просто направление текста, а всю «осевую систему» страницы или контейнера. Оно устанавливает:
- Основное направление текста (inline direction) — как располагаются символы в строке.
- Направление блоков (block direction) — как располагаются строки или блочные элементы друг под другом.

## Пример

```css
.horizontal-tb {
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

- `horizontal-tb` — значение по умолчанию, строки идут горизонтально, слева направо (или справа налево — зависит от языка), а блоки располагаются сверху вниз (top to bottom).
- `vertical-rl` — строки идут вертикально сверху вниз, а блоки располагаются справа налево (right to left). Часто используется в японской, китайской и корейской письменности.
- `vertical-lr` — строки идут вертикально сверху вниз, а блоки располагаются слева направо (left to right). Реже встречается, но подходит для нестандартного вертикального макета.
- `sideways-rl` — текст идёт вертикально, но символы повёрнуты вправо на 90°, строки идут сверху вниз, а блоки — справа налево. Подходит для декоративного или бокового текста.
- `sideways-lr` — как и `sideways-rl`, но символы повёрнуты влево на 90°, строки идут снизу вверх, а блоки — слева направо.

<iframe title="Значения writing-mode" src="demos/practis/" height="500"></iframe>

## Подсказки

💡 Влияет на направление не только текста, но и порядок блоков, например, порядок колонок.