---
title: "Селектор по тегу"
authors:
  - ezhkov
editor:
  - tachisis
keywords:
  - селектор
tags:
  - doka
---

## Кратко

Селектор по тегу находит элемент на странице по имени тега.

## Пример

```html
<span>Немного текста</span>
<ul>
  <li>Взять носки</li>
  <li><span>Взять документы</span></li>
  <li>Взять топор</li>
</ul>
<p>Немного <span>другого</span> текста</p>
```

```css
span {
  background-color: chocolate;
}
```

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="result" data-user="ezhkov" data-slug-hash="JjRoLBa" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="tag selector">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/JjRoLBa">
  tag selector</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Как пишется

```css
h1 {
  font-weight: 400;
}
```

## Как это понять

Когда нужно применить одни и те же правила к определённым тегам, используется селектор по тегу. Он применяется ко всем тегам с таким названием вне зависимости от вложенности.

## Подсказки

:::callout❗

Старайтесь не злоупотреблять селектором по тегу из-за его очень широкого охвата. Правила, написанные для тега, будут применены ко всем таким тегам на странице вне зависимости от вложенности и заданных атрибутов. Это может привести к нежелательным последствиям.

:::

Яркий пример — мы задали стиль подчёркивания для всех ссылок при помощи селектора по тегу. Убираем встроенное подчёркивание и имитируем вместо него пунктирное подчёркивание при помощи нижней рамки:

```css
a {
  text-decoration: none;
  border-bottom: 1px dashed coral;
}
```

И это повлечёт за собой появление нижнего подчёркивания не только у текстовых ссылок, но и любых других (например, ссылок с иконкой, либо ссылочных картинок).
