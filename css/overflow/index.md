---
title: "overflow"
authors:
  - realetive
tags:
  - doka
---

## Кратко

Свойство `overflow` позволяет буквально определить, что делать с содержимым блочного (то есть для элемента, у которого `display` определяется как `block`, `inline-block`, `flex` или `grid`) элемента, если оно не влезает в размеры — отобразить или обрезать (с полосами прокрутки или без).

## Пример

```css
.article {
  width: 300px; /* Задаём ограничения по размеру блока */
  height: 300px;
  overflow: hidden;
  /* Если содержимое блока будет больше, чем границы блока, оно будет «обрезано» */
}
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="Realetive" data-slug-hash="wvzBqxp" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="overflow demo">
  <span>See the Pen <a href="https://codepen.io/Realetive/pen/wvzBqxp">
  overflow demo</a> by Roman Ganin (<a href="https://codepen.io/Realetive">@Realetive</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Как пишется

```css
.selector {
    overflow: visible;
    overflow: hidden;
    overflow: clip;
    overflow: scroll;
    overflow: auto;
}
```

## Как это понять

Синтаксис свойства позволяет задать два значения — для x- и y-оси (аналогичного результат можно добиться, используя самостоятельные CSS-свойства `overflow-x` и `overflow-y`). Если указано одно значение, оно равнозначно применяется для обеих осей.

## Значения

- `visible` — начальное значение, содержимое отображается снаружи родительского блока, если его размеры больше размеров «родительского» блока;
- `hidden` — содержимое, выходящее за пределы «родительского» блока, обрезается по его границам без прокрутки;
- `clip` — новое экспериментальное свойство (поддерживается только в Firefox), похожее по результату по `hidden`, но границы родительского блока рассчитываются с учётом padding-отступов;
- `scroll` — контент обрезается по границам «родительского» блока, но внутри этой области содержимое доступно с помощью прокрутки;
- `auto` — если содержимое переполняет блок, контент будет доступен для прокрутки.

## Подсказки

💡 Чтобы контент внутри блока можно было скроллить, его содержимое должно явно превышать высоту родительского блока. Этого можно добиться или явно задав ему `height`, или ограничив высоту родительского блока.

💡 Задавая родительскому блоку фиксированную высоту, учитывайте, что, если не указан `box-sizing: border-box`, то это значение не учитывает внутренние отступы, заданные с помощью `padding`, что может спровоцировать появление нежелательной прокрутки.
