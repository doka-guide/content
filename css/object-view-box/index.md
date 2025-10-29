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

## Как пишется

Возможные значения `object-view-box`:

- `none` — значение по умолчанию, окно отображения не задаётся;
- `<basic-shape-rect>` – окно отображения задаётся в виде прямоугольника с помощью функций [`inset()`](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/inset), [`xywh()`](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/xywh).

Зададим область отображения через `inset()`:

```css
.object-view-box-inset {
  object-fit: cover;
  object-view-box: inset(15% 15% 15% 15%);
}
```

<iframe title="Задаём область отображения через inset()" src="demos/inset/" height="630"></iframe>

А теперь через функцию `xywh()`:

```css
.object-view-box-xywh {
  object-fit: cover;
  object-view-box: xywh(10% 10% 75% 75%);
}
```

<iframe title="Задаём область отображения через xywh()" src="demos/xywh/" height="630"></iframe>

## Как понять

По своему поведению свойство `object-view-box` похоже на атрибут `viewBox` в [SVG](/html/svg/). Оно устанавливает размеры окна отображения в [_замещаемых элементах_](#podskazki), вроде [`<img>`](/html/img/), [`<video>`](/html/video/), [`<canvas>`](/html/canvas/). Контент, попавший в заданную область, будет виден, а остальной скроется.

Область отображения, заданную через `object-view-box`, браузер воспринимает в качестве исходного элемента, и свойства вроде [`object-fit`](/css/object-fit/) и [`object-position`](/css/object-position/) применяются именно к ней. За счёт этого можно реализовать кадрирование изображения без изменения самого файла.

Кроме `object-view-box` есть и другие способы обрезки, например, [`overflow: hidden`](/css/overflow/) и [`clip-path`](/css/clip-path/). Вот в чём разница: `object-view-box` работает с содержимым ресурса и задаёт «кадр» внутри источника — как будто кадрируем исходный файл. А `overflow: hidden` и `clip-path` задают форму или рамку снаружи, при этом весь ресурс остаётся внутри элемента, даже если часть его не видна.

Посмотрите на разницу в примере:

<iframe title="Сравниваем разные способы обрезки контента" src="demos/object-view-box-vs-others/" height="770"></iframe>

## Подсказки

💡 _Замещаемый элемент_ — это HTML-элемент, отображающий внешний ресурс, например, картинку или видео. Браузер берёт содержимое не из HTML-разметки, а подставляет готовое «встроенное» представление. В CSS мы можем менять размер и расположение такого элемента, но не управлять его внутренним содержимым.
