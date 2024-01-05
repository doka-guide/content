---
title: "`outline-color`"
description: "Отдельное свойство для управления цветом обводки элемента."
authors:
  - timbilalov
related:
  - css/focus-visible
  - css/border-color
  - css/currentcolor
tags:
  - doka
---

## Кратко

Свойство `outline-color` задаёт цвет обводки элемента. Аналог свойства [`border-color`](/css/border-color/) для цвета рамки.

Не наследуется. Часто используется в шорткате [`outline`](/css/outline/), где цвет обводки указывается наряду с толщиной и стилем.

## Пример

```html
<div>Пример блока с обводкой</div>
```

```css
div {
  outline: 1px solid;
  outline-color: tomato;
}
```

<iframe title="Пример блока с обводкой" src="demos/basic/" height="200"></iframe>

## Как пишется

Цвет обводки можно задать в любом [доступном формате](/css/web-colors/), включая `transparent`.

Также применимы любые [глобальные ключевые слова](/css/global-keywords/).

По умолчанию цвет обводки равен [`currentColor`](/css/currentcolor/) — совпадает с цветом текста элемента.

В отличие от `border-color`, нельзя прописать сразу несколько значений. Цвет обводки у элемента единый по всем четырём сторонам.

<iframe title="Различные значения цвета обводки" src="demos/values/" height="200"></iframe>

## Взаимодействие с `:focus-visible`

Обводка используется для визуального выделения элемента, когда мы переводим на него фокус, используя клавиатуру.

Мы можем задать своё значение `outline-color` для интерактивных элементов на странице. Например, когда стандартный цвет обводки выбивается из общей стилистики сайта.

<iframe title="Стили для псевдокласса :focus-visible" src="demos/focus-visible/" height="240"></iframe>

## Анимация

Для плавного изменения цвета можно использовать как [`transition`](/css/transition/), так и [`animation`](/css/animation/).

<iframe title="Анимация цвета обводки" src="demos/animation/" height="200"></iframe>
