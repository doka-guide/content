---
title: "`min()`"
description: "Функция, выбирающая меньшее значение. Удобно для адаптивной вёрстки и не только!"
authors:
  - gingerraccoon
contributors:
  - rrramble
keywords:
  - наименьшее из двух
  - наименьшее из нескольких
related:
  - js/function
  - css/calc
  - css/numeric-types
tags:
  - doka
---

## Кратко

Функция `min()` возвращает минимальное значение из указанных.

## Пример

```css
.selector {
  width: min(50%, 500px);
}
```

## Как пишется

Функция принимает один или несколько аргументов. Все аргументы разделяются запятыми.

Аргументы могут быть:

- абсолютными, например, `500px`;
- относительными, например, `50%` или `20vw`, или `1rem`;
- комбинацией абсолютных и относительных;
- математическими выражениями, например, `20rem * 2`;
- другими функциями: [`max()`](/css/max/), [`clamp()`](/css/clamp/), `min()`.

Пример вложения других функций и математического выражения:

```css
.selector {
  width: min(20rem * 2, max(100px, 30%));
}
```

Использовать `min()` можно в любых CSS-свойствах, значение которых является числом, например:

```css
.selector {
  background: linear-gradient(135deg, #2c3e50, #2c3e50 min(20vw, 60%), #3498db);
}
```

## Как понять

При отрисовке браузер определяет минимальное значение и подставляет его в стили.

<iframe title="Работа функции min()" src="demos/view/index.html" height="470"></iframe>

В примере выше указано `min(50vw, 350px)`, что означает: элемент занимает 50% ширины [вьюпорта](/css/vw-vh/#vw), но не больше 350 px.

## Подсказки

💡 Удобно с помощью функции `min()` ограничивать ширину компонента в зависимости от ширины родителя.
