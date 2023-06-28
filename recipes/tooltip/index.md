---
title: "Тултип"
description: "Всплывающая подсказка, вспомогательная информация, появляющаяся при наведении на элемент или при его активации"
authors:
  - GlebEliseev
keywords:
  - всплывающая подсказка
  - тултип
tags:
  - article
---

## Кратко

Тултип это компонент интерфейса, который показывает дополнительную информацию при наведении или его активации. Это можно сделать как мышкой так и клавиатурой. Ниже мы рассмотрим простые примеры реализации всплывающих подсказок.

## Пример

Самый простой пример можно описать следующим образом

```html
<div class="tooltip">Наведись на меня
  <span class="tooltiptext">Всплывающий текст</span>
</div>
```

```css
.tooltip {
  position: relative;
}

.tooltip .tooltiptext {
  visibility: hidden;
  position: absolute;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
```
<iframe title="Простой пример" src="demos/simple/" height="200"></iframe>

Как можно заметить, это выглядит не очень красиво, но уже работает.

Кажется, требуется второй подход к инструменту, чтобы сделать наш тултип красивее.
Нужно всего лишь немного стилизовать `.text` следующим образом.

```css
.tooltiptext {
  visibility: hidden;
  position: absolute;
  width: 145px;
  color: white;
  background-color: #192733;
  border-radius: 10px;
  padding: 10px 15px 10px 15px;
  top: -9px;
  left: 120%;
}
```

Теперь добавим к тултипу стрелочку, чтобы показать принадлежность к элементу.

```css
.tooltiptext::before {
  content: "";
  position: absolute;
  transform: rotate(45deg);
  background-color: #192733;
  padding: 5px;
  z-index: 1;
  top: 35%;
  left: -2%;
}
```

<iframe title="Тултип со стрелочкой" src="demos/arrow/" height="200"></iframe>

Сейчас наш тултип расположен справа от элемента. Для того, чтобы расположить его с другой стороны, достаточно просто поменять значения `top` и `left`.
