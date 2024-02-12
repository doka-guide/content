---
title: "`.closest()`"
description: "Возвращает ближайший родительский элемент в документе соответствующий указанному CSS-селектору."
authors:
  - doka-dog
contributors:
  - vitya-ne
related:
  - html/article
  - js/element-addeventlistener
  - js/dom
tags:
  - doka
  - placeholder
---

## Кратко

Метод `Element.closest()` возвращает сам элемент или ближайший родительский элемент соответствующий указанному CSS-селектору. Если ни один элемент не соответствует указанному CSS-селектору возвращается `null`.

## Пример

```html
<article class="container">
  <header class="container-header container">
    <div class="element">
      <span class="title">Заголовок</span>
    </div>
  </header>
</article>
```

```javascript
const element = document.querySelector('element')
const closestElement = element.closest('.container')

console.log(closestElement)
// Вернёт тег <header>
```

## Как пишется

Чтобы найти ближайший элемент, укажите нужный [CSS-селектор](/css/#selektory). Например значение `id` или название тега.
