---
title: "`column-rule`"
authors:
  - xpleesid
tags:
  - doka
---

## Кратко

Свойство `column-rule` отвечает за внешний вид линии между колонками в многоколоночной вёрстке.

## Как понять

Свойство `column-rule` является шорткатом для свойств:
* [`column-rule-width`](/css/column-rule-width)
* [`column-rule-style`](/css/column-rule-style)
* [`column-rule-color`](/css/column-rule-color)

## Как пишется

Для того, чтобы задать между колонками красную пунктирную линию шириной 2px, мы напишем:

```css
p {
  column-rule: 2px dashed red;
}
```

Прослеживается сходство со свойством [`border`](/css/border). Действительно, линия между колонками описывается так же, как и граница.

## Пример

В примере ниже вы можете поменять внешний вид у линии между колонками.

<iframe title="Варианты значений column-rule" src="demos/multiple-values/" height="400"></iframe>
