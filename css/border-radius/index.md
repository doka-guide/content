---
title: "border-radius"
authors:
  - solarrust
contributors:
  - skorobaeus
keywords:
  - border-radius
tags:
  - doka
---

## Кратко

Свойство `border-radius` закругляет углы почти у любого элемента. И даже если у блока не задана явная рамка.

🔮 Волшебное свойство! Часто нужно в работе, поскольку дизайнеры не любят острые углы.

## Пример

Самая простая штука — кнопка с закруглёнными краями:

```html
<button class="btn">Купить</button>
```

```css
.btn {
  border: none;
  border-radius: 5px;
}
```

<iframe title="Кнопка" src="demos/basic.html"></iframe>

Обрати внимание, что мы _сбросили_ стандартную рамку кнопки, но углы тем не менее слегка закруглились.

Если при нажатии добавлять кнопке внутреннюю тень такого же цвета, что и фон, она будет «нажиматься» — получится привлекательно и современно 😉

```css
body {
  background-color: #e6e6e6;
}

.btn:focus {
  box-shadow: inset 0 0 0 3px #e6e6e6;
  transition: all 0.2s;
}
```

<iframe title="Интерактивная кнопка" src="demos/interactive.html"></iframe>

## Как это понять

Слово **border** переводится с английского как рамка. А со словом **radius** каждый знаком ещё со школьной скамьи 😏

Свойство `border-radius` задаёт радиус закругления каждого из углов элемента.

Если значение задано в процентах, то оно будет высчитываться от размеров элемента: горизонтальные размеры будут высчитываться от ширины элемента, а вертикальные — соответственно, от высоты (поэтому для квадратного элемента можно задать `border-radius: 50%`, чтобы сделать его круглым).

## Как пишется

Пройдёмся по синтаксису:

```css
selector {
  border-radius: 5px; /* радиус в пикселях */
  border-radius: 50%; /* радиус в процентах */
  border-radius: 5px 0 0 50%; /* разные радиусы для каждого из четырёх углов элемента */
}
```

Можно управлять степенью закругления каждого из углов в отдельности или задать одно значение для всех углов сразу. Причём значение на самом деле состоит из двух — скругления по горизонтальной оси и по вертикальной. Чтобы явно задать скругление для каждой из осей (т. е. получить не круглое значение, а эллипсоидное), это значение следует записывать через символ `/`:

```css
.ellipse {
  border-radius: 5em / 50%;
}
```

Такая запись совсем не означает, что наше скругление будет равно результату деления 5em на какой-то размер, а эквивалентна такой записи:

```css
.ellipse {
  border-top-left-radius: 5em 50%;
  border-top-right-radius: 5em 50%;
  border-bottom-right-radius: 5em 50%;
  border-bottom-left-radius: 5em 50%;
}
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="Realetive" data-slug-hash="ExNxgvX" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="border-radius">
  <span>See the Pen <a href="https://codepen.io/Realetive/pen/ExNxgvX">
  border-radius</a> by Roman Ganin (<a href="https://codepen.io/Realetive">@Realetive</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Подсказки

💡 Значение по умолчанию: `0`.

💡 `border-radius` сработает даже если не будет задана видимая рамка.

💡 Чтобы увидеть результат работы свойства, надо задать фоновую заливку или картинку блоку, к которому применяется закругление углов. Или рамку, или фон для родительского элемента. Что-то, что отделит белое от белого 🤗

💡 Можно управлять радиусом закругления каждого угла в отдельности при помощи свойств:

- `border-top-left-radius` — радиус закругления для левого верхнего угла.
- `border-top-right-radius` — радиус закругления для правого верхнего угла.
- `border-bottom-right-radius` — радиус закругления для правого нижнего угла.
- `border-bottom-left-radius` — радиус закругления для левого нижнего угла.
