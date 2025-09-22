---
title: "`object-view-box`"
description: "Кадрируем изображение с помощью CSS."
baseline:
  - group: object-view-box
    features:
      - css.properties.object-view-box
      - css.properties.object-view-box.none
authors:
  - akhmadullin
related:
  - html/img
  - css/object-fit
  - css/object-position
tags:
  - doka
---

## Кратко

Свойство `object-view-box` задаёт, какая часть изображения должна быть видна.

## Пример

```css
.cropped-element {
  object-view-box: inset(20%);
}
```

## Как понять

По своему поведению свойство `object-view-box` похоже на атрибут `viewBox` в [SVG](/html/svg/).

Оно устанавливает размеры окна отображения в _замещаемых_ элементах, вроде [`<img>`](/html/img/), [`<video>`](/html/video/), [`<canvas>`](/html/canvas/). Контент, попавший в заданную область будет виден, остальной скрыт.

Область отображения, заданную через `object-view-box`, браузер воспринимает в качестве исходного элемента, и свойства вроде [`object-fit`](/css/object-fit/) и [`object-position`](/css/object-position/) применяются именно к этой области. За счёт этого можно реализовать кадирование изображения без изменения самого файла.

## Как пишется

Возможные значения `object-view-box`:

- `none` — значение по умолчанию, окно отображения не задаётся;
- `<basic-shape-rect>` – окно отображения задаётся в виде прямоугольника с помощью функций [`inset()`](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/inset), [`xywh()`](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/xywh).

## Использование

```css
.object-view-box-inset {
  object-view-box: inset(15% 15% 15% 15%);
}
```

<iframe title="Задаём область отображения через inset()" src="demos/inset/" height="770"></iframe>

```css
.object-view-box-xywh {
  object-view-box: xywh(10% 10% 75% 75%);
}
```

<iframe title="Задаём область отображения через xywh()" src="demos/xywh/" height="770"></iframe>
