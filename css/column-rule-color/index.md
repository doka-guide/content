---
title: "`column-rule-color`"
authors:
  - xpleesid
tags:
  - doka
---

## Кратко

Свойство `column-rule-color` отвечает за цвет линии между колонками в многоколоночной вёрстке.

## Как пишется

Можно использовать любые допустимые [значения цветов](/css/web-colors/). По умолчанию установлено значение [`currentColor`](/css/web-colors/#currentcolor).

Для того, чтобы задать межколоночной линии красный цвет, мы напишем:

```css
p {
  column-count: 3;
  column-rule-color: red;
}
```

Также `column-rule-color` — это третье значение в свойстве [`column-rule`](/css/column-rule/).

## Пример

Зададим межколоночной линии жёлтый цвет:

```css
p {
  column-count: 3;
  column-rule: 3px solid;
  column-rule-color: yellow;
}
```

<iframe title="Пример для свойства column-rule-color" src="demos/basic/" height="320"></iframe>
