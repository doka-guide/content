---
title: "`.closest()`"
description: "Как найти ближайший элемент в документе."
authors:
  - doka-dog
related:
  - html/article
  - js/element-addeventlistener
  - js/dom
tags:
  - doka
  - placeholder
---

## Кратко

Метод, который возвращает ближайший родительский элемент или его самого.

## Пример

```html
<article class="container">
  <span class="element-one">Первый элемент</span>
  <span class="element-two">Второй элемент</span>
  <span class="element-three">Третий элемент</span>
</article>
```

```javascript
const element = document.querySelector('.element-one')
const neighbourElement = element.closest(':not(span)')

console.log(neighbourElement)
// Вернёт тег <article>
```

## Как пишется

Чтобы найти ближайший элемент, укажите нужный [CSS-селектор](/css/#selektory). Например значение `id` или название тега.
