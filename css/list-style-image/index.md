---
title: "list-style-image"
authors:
  - ezhkov
contributors:
  - skorobaeus
keywords:
  - стили списка
  - список
tags:
  - doka
---

## Кратко

Свойство устанавливает картинку в качестве маркера у списка.

## Пример

```css
ul {
  list-style-image: url("https://myimages.com/media/examples/rocket.svg");
}
```

## Как пишется

Ключевые слова:

```css
.selector {
  list-style-image: none;
}
```

URL в качестве значения:

```css
.selector {
  list-style-image: url("starsolid.gif");
}
```

Глобальные значения:

```css
.selector {
  list-style-image: inherit;
  list-style-image: initial;
  list-style-image: unset;
}
```

## Подсказки

💡 Размером и положением маркера нельзя управлять, поэтому он будет равен размеру картинки и выровнен по базовой линии текста. Из этой особенности следует, что картинку-маркер следует заранее подготовить, подогнав под нужный размер.

<iframe title="Варианты list-style-image" src="demos/every.html"></iframe>

💡 Это наследуемое свойство, поэтому чаще всего его задают тегу списка, чтобы все внутренние элементы унаследовали его. Но при желании каждому элементу списка `<li>` можно задать его индивидуально.

💡 Если по какой-то причине изображение не загрузится, будет показан маркер по умолчанию. Для `<ol>` это нумерация, для `<ul>` — маркер, соответствующий уровню вложенности.

💡 Согласно справочникам свойство не анимируется, но в некоторых браузерах (Chrome, Safari) есть поддержка плавной смены картинки с использованием [`transition`](/css/transition).

```css
li {
  list-style-image: url("marker.png");
  transition: list-style-image 0.3s;
}

li:hover {
  list-style-image: url("marker_hover.png");
}
```

<iframe title="Анимация list-style-image" src="demos/transition.html"></iframe>
