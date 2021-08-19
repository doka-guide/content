---
title: "position"
authors:
  - ezhkov
editors:
  - tachisis
keywords:
  - позиционирование
tags:
  - doka
---

## Кратко

Свойство `position` задаёт способ позиционирования элемента в документе. Совместно со свойствами `left`, `right`, `top`, `bottom` элементу задаётся его местоположение на странице.

## Пример

```css
.box {
  position: absolute;
  left: 0;
  top: 20px;
}
```

## Как это понять

Иногда в процессе вёрстки требуется реализовать разные сложные идеи дизайнера про расположение элементов друг относительно друга. Например, расположить один элемент поверх другого, или немного сместить отображение элемента относительно своего начального положения. Бывают и более сложные случаи, когда требуется зафиксировать элемент относительно окна браузера, а не относительно страницы. Базовым свойством, которое изменяет способ позиционирования, является свойство `position`.

## Как пишется

### `static` — статическое позиционирование

Значение по умолчанию. Любой элемент, добавленный на страницу, будет иметь это значение и будет расположен в [нормальном потоке](/html/flow) документа согласно контексту форматирования родительского элемента. Свойства `left`, `right`, `top`, `bottom` и [`z-index`](/css/z-index) игнорируются.


:::callout❗️

Элемент со значением `position: static` **не является** позиционированным элементом. Это важный момент, потому что элементы с любым другим значением свойства `position` создают внутри себя [контекст наложения](/css/stacking-context) (в работе) и становятся **опорными**. _Опорным элементом_ будем называть такой, относительно которого позиционируются дочерние элементы.

:::

### `relative`

Элемент позиционируется так же, как и статический, но его отображение может быть смещено относительно своего начального положения при помощи свойств `left`, `right`, `top`, `bottom`. Это смещение **чисто визуальное** и не затрагивает положение соседних элементов, кроме случая, когда элемент выходит за границы родителя, имеющего возможность прокрутки.

На странице элемент будет занимать столько же места, как если бы он имел статическое позиционирование.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="oNLrdQd" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="position: relative">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/oNLrdQd">
  position: relative</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### `absolute`

Способ позиционирования, кажущийся наиболее понятным. Мы просто задаём абсолютное позиционирование и при помощи свойств `left`, `right`, `top`, `bottom` регулируем положение элемента. Есть ряд особенностей такого позиционирования:

- Элемент убирается из основного потока документа. То есть, перестаёт влиять на положение окружающих элементов и на размер родителя. Можно представить себе, что элемент уходит на слой выше и перестаёт взаимодействовать со всеми элементами, кроме своих потомков.
- Элемент позиционируется относительно ближайшего позиционированного предка. То есть, браузер идёт вверх по дереву элементов и ищет ближайшего _опорного_ родителя. И затем располагает наш элемент относительно этого родителя.
- Если элемент был частью строчного контекста форматирования, он приобретает блочный контекст форматирования. К нему становится применима блочная модель.
- Если элемент был блочным и занимал всю ширину своего родителя, то теперь его ширина будет определяться шириной контента.
- Отступы элемента с `position: absolute` не схлопываются с отступами соседних элементов.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="eYdOdEO" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="position: absolute">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/eYdOdEO">
  position: absolute</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### `fixed`

Иногда требуется позиционировать элемент не относительно родителя, а относительно окна браузера вне зависимости от вложенности. Для решения подобной задачи подходит `position: fixed`. Свойство так же, как и предыдущее, работает с указанием смещения `left`, `right`, `top`, `bottom`. У такого способа позиционирования есть ряд особенностей:

- Элемент убирается из основного потока документа. То есть, перестаёт влиять на положение окружающих элементов и на размер родителя. Можно представить себе, что элемент уходит на слой выше и перестаёт взаимодействовать со всеми элементами, кроме своих потомков.
- Элемент позиционируется относительно окна браузера, за исключением случаев, если один из родителей имеет значения свойств [`transform`](/css/transform), `perspective` или `filter`, отличные от `none`. В этом случае блок становится _опорным_, и позиционирование будет производиться уже относительно него, а не окна браузера.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="PoGYGyB" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="position: fixed">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/PoGYGyB">
  position: fixed</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### `sticky`

Элемент позиционируется в нормальном потоке так же, как и статический, а затем смещается при помощи свойств `left`, `right`, `top`, `bottom` относительно ближайшего родителя, имеющего прокрутку. Это свойство применяется, когда нам нужно зафиксировать какой-либо элемент не сразу, а при прокрутке родителя до какого-то известного положения.

Например, в следующем примере элемент будет вести себя как обычно до тех пор, пока родитель не будет прокручен таким образом, что расстояние от верха родителя до верхней границы элемента не станет меньше 10 пикселей. Как только прокрутка достигнет такого значения, элемент зафиксируется в положении 100 пикселей от верха границы родителя:

```css
.block {
  position: sticky;
  top: 10px;
}
```

У такого позиционирования есть ряд особенностей:

- Элемент ведёт себя как элемент с относительным (`relative`) позиционированием до тех пор, пока его родитель не будет прокручен до определённой границы. Как правило, эта точка совпадает с положением верхней границы нашего элемента, но может быть изменена с использованием свойства `top`.
- Элемент остаётся «приклеенным» во время прокрутки родителя до тех пор, пока не «встретит» противоположную границу своего родителя.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="ExgYNyX" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="position: sticky">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/ExgYNyX">
  position: sticky</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

:::callout 📃

Подробнее об этом значении можно почитать в статье про [липкое позиционирование](/css/sticky).

:::

## Подсказки

💡 Как правило, если элементу с `position: absolute` или `position: fixed` не заданы ширина и высота, то значение этих величин высчитывается по количеству контента. Однако можно неявно заставить блок тянуться на всю ширину или высоту родителя, задав одновременно противоположные свойства (`left` и `right`, или `top` и `bottom`). Это будет работать, только если `width` и `height` будут иметь значение `auto`.

💡 Если ширина задана явно (не `auto`), а также заданы `left` и `right`, то для `direction` `ltr` приоритет отдаётся свойству `left`. Для `rtl` - свойству `right`.

💡 Если высота задана явно (не `auto`), а также заданы `top` и `bottom`, то приоритет отдаётся свойству `top`.

💡 Если для абсолютно позиционированного элемента (`absolute` или `fixed`) задано смещение только по одной из осей (например, только `top` или только `left`), то смещение по второй из осей высчитывается, исходя из расположения элемента, если бы он был позиционирован статически. В примере ниже блоку не задано положение по вертикали, поэтому его верхний край помещается в ту же точку, где находился бы при статическом позиционировании:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="ZEpzBae" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="position: absolute 2">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/ZEpzBae">
  position: absolute 2</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
