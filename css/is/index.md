---
title: "`:is()`"
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

Полностью поддерживается во всех стабильных браузерах с января 2021 года. Чуть более широкую поддержку можно получить, если использовать устаревшие версии с префиксами `:-webkit-any()`, `:-moz-any()` и `:matches()`. Подробнее смотрите на [Can I use](https://caniuse.com/css-matches-pseudo).

## Как пишется

Применяем стили по наведению курсора на абзацы, вложенные в [`<header>`](/html/header/), [`<main>`](/html/main/) или [`<footer>`](/html/footer/):

```css
:is(header, main, footer) p:hover {
  color: red;
  cursor: pointer;
}
```

Иначе этот селектор пришлось бы записать гораздо более многословно:

```css
header p:hover,
main p:hover,
footer p:hover {
  color: red;
  cursor: pointer;
}
```
