---
title: "`list-style-image`"
description: "Скучные маркеры списка можно заменить на картинку."
baseline:
  - group: list-style
    features:
      - css.properties.list-style-image
authors:
  - ezhkov
contributors:
  - skorobaeus
keywords:
  - стили списка
  - список
related:
  - html/ul
  - css/url
  - css/list-style-type
tags:
  - doka
---

## Кратко

Свойство устанавливает картинку в качестве маркера у списка.

## Пример

```css
ul {
  list-style-image: url("rocket.svg");
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

## Подсказки

💡 Размером и положением маркера нельзя управлять, поэтому он будет равен размеру картинки и выровнен по базовой линии текста. Из этой особенности следует, что картинку-маркер следует заранее подготовить, подогнав под нужный размер.

<iframe title="Варианты list-style-image" src="demos/every/" height="489"></iframe>

💡 Это наследуемое свойство, поэтому чаще всего его задают тегу списка, чтобы все внутренние элементы унаследовали его. Но при желании каждому элементу списка [`<li>`](/html/li/) можно задать его индивидуально.

💡 Если по какой-то причине изображение не загрузится, будет показан маркер по умолчанию. Для [`<ol>`](/html/ol/) это нумерация, для [`<ul>`](/html/ul/) — маркер, соответствующий уровню вложенности.

💡 Согласно справочникам свойство не анимируется, но в некоторых браузерах (Chrome, Safari) есть поддержка плавной смены картинки с использованием [`transition`](/css/transition/).

```css
li {
  list-style-image: url("marker.png");
  transition: list-style-image 0.3s;
}

li:hover {
  list-style-image: url("marker_hover.png");
}
```

<iframe title="Анимация list-style-image" src="demos/transition/" height="417"></iframe>
