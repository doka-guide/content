---
title: "`::selection`"
authors:
  - rusakov
# contributors:
#   - solarrust
# editors:
#   - tachisis
keywords:
  - ::selection
  - псевдоэлемент
tags:
  - doka
---

## Кратко

[Псевдоэлемент](/css/pseudoelements) `::selection` позволяет применить стили к части документа, которая была выделена пользователем (например, с помощью мыши).

## Пример

```css
/* При выделениии параграфа заливка будет зелёного цвета */

p::selection {
  background-color: green;
}
```

## Как пишется

После любого селектора ставим два раза двоеточие и пишем ключевое слово `selection`.

```css
::-moz-selection {
  /* Для Mozilla Firefox */
}

::selection {
  /* Для остальных браузеров */
}
```

💡 Обратите внимание, что *двойное двоеточие* необходимо в синтаксисе для данного псевдоэлемента, несмотря на то, что другие псевдоэлементы принимают одно двоеточие.
💡 Можно стилизовать отдельные элементы на странице прописав для них [псевдоэлемент](/css/pseudoelements), а также можно оформить всю страницу целиком - оставив `::selection`, как показано в примере выше.

## Разрешённые свойства

- color
- background-color
- cursor
- caret-color
- outline
- text-decoration
- text-emphasis-color
- text-shadow

💡 Заметим, что, в частности, свойство `background-image` игнорируется.
💡 Если вы попытаетесь прописать свойство, которого нет в списке, то оно будет проигнорировано.

## Как это понять

`::selection` предназначен для изменения стандартного поведения при выделении частей сайта. Это полезно если вы хотите изменить поведение выделения текста в соответствии с цветовой схемой вашего сайта.

## Поддержка

Поддерживается в наибольшем количестве браузеров за исключением:

- iOS Safari
- Opera Mini
- IE 6-8
- Android Browser <4.4

## Рекомендация

Есть интересный подход с использованием `::selection` и `text-shadow`, а точнее можно достичь одного интересного эффекта, используя несколько теней текста.

```css
p::selection {
  --color-shadow: #000;
  color: #fff;
  background-color: #2e9aff;
  text-shadow: 1px 0px 1px var(--color-shadow),
               0px 1px 1px var(--color-shadow),
               2px 1px 1px var(--color-shadow),
               1px 2px 1px var(--color-shadow),
               3px 2px 1px var(--color-shadow),
               2px 3px 1px var(--color-shadow);
}
```

<iframe title="Пример c text-shadow" src="demos/selection-with-text-shadow/" height="250"></iframe>
