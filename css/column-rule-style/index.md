---
title: "`column-rule-style`"
description: "Не хотите скучную декоративную линию между колонками? Сделайте её пунктирной или двойной!"
authors:
  - xpleesid
related:
  - css/border-style
  - css/column-rule
  - css/columns
tags:
  - doka
---

## Кратко

Свойство `column-rule-style` отвечает за стиль линии между колонками в многоколоночной вёрстке.

## Как понять

Стиль межколоночной линии задаётся при помощи ключевых слов. Более подробно можно прочесть в описании [`border-style`](/css/border-style/), стиль межколоночной линии задаётся так же, как и стиль рамки.

## Как пишется

Чтобы задать пунктирную межколоночную линию, мы напишем:

```css
p {
  column-count: 3;
  column-rule-style: dashed;
}
```

Также `column-rule-style` — это второе значение в свойстве [`column-rule`](/css/column-rule/).

## Пример

В примере ниже вы можете поменять стиль линии между колонками. По умолчанию заданы такие стили:

```css
.text-wrapper {
  column-count: 3;
  column-rule: 5px solid #ffd829;
  column-gap: 25px;
}
```

<iframe title="Варианты значений column-rule-style" src="demos/multiple-values/" height="380"></iframe>
