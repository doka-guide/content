---
title: "`:read-only`"
description: "Задает стили полям ввода, которые доступны только для чтения."
authors:
  - kamenskaya
related:
  - css/link
  - css/hover
  - css/focus
keywords:
  - стили для чтения
tags:
  - doka
  - placeholder
---


## Кратко

Псевдокласс `:read-only` используется для задания стилей полям ввода только для чтения. Применяется к полям формы, у которых задан атрибут `readonly`, или к элементам с атрибутом [`contenteditable`](/html/global-attrs/). Такое поле не может быть изменено и получить фокус.

## Пример

Псевдокласс `:read-only` может использоваться для удаления стандартного стиля полей ввода, делая входные данные похожими на абзацы текста.

```css
input:-moz-read-only,
textarea:-moz-read-only,
input:read-only,
textarea:read-only {
  border: 0;
  box-shadow: none;
  background-color: white;
}
```

## Как пишется

После селектора для поля ввода текста ([`<input>`](/html/input/) и [`<textarea>`](/html/textarea/)) или селектора с атрибутом [`contenteditable`](/html/global-attrs/) ставим двоеточие и пишем ключевое слово `read-only`.

## Как понять

Псевдокласс `:read-only` применяется к тегам для ввода текста ([`<input>`](/html/input/) и [`<textarea>`](/html/textarea/)), для которых задан атрибут `readonly`. Также может быть применен к элементам, для которых установлен атрибут [`contenteditable`](/html/global-attrs/). Не поддерживается в Internet Explorer, Firefox поддерживает альтернативный псевдокласс `:-moz-read-only`.

