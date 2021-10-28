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

Можно использовать любые допустимые значения цветов. Более подробно можно почитать в описании свойства [`color`](/css/color). Для того, чтобы задать межколоночной линии красный цвет, мы напишем:

```css
p {
  column-count: 3;
  column-rule-color: red;
}
```

Также `column-rule-color` - это третье значение в свойстве [`column-rule`](/css/column-rule).

## Пример

Давайте зададим межколоночной линии жёлтый цвет.

```css
p {
  column-count: 3;
  column-rule: 3px solid;
  column-rule-color: yellow;
}
```

Получится такой результат:

<iframe title="Пример для свойства column-rule-color" src="demos/basic/" height="200"></iframe>
