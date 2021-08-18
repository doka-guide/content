---
title: ":is()"
authors:
  - doka-dog
keywords:
  - псевдокласс
tags:
  - doka
  - placeholder
---

## Кратко

Функция-псевдокласс `:is()` принимает один или несколько селекторов в качестве аргумента. Браузер при чтении применяет стили к любому из селекторов-аргументов.

Пока является экспериментальной функцией и не поддерживается всеми браузерами. Проверяйте поддержку на [Can I use](https://caniuse.com/css-matches-pseudo).

## Как пишется

Применяем стили по наведению курсора на абзацы, вложенные в [`<header>`](/html/header), [`<main>`](/html/main) или [`<footer>`](/html/footer):

```css
:is(header, main, footer) p:hover {
  color: red;
  cursor: pointer;
}
```
