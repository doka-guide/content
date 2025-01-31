---
title: "Тултип"
description: "Верстаем статичный и адаптивный тултип."
authors:
  - akhmadullin
keywords:
  - tooltip
  - intersection observer
  - popover
  - css anchor positioning
related:
  - a11y/role-tooltip
  - html/popover
  - js/intersection-observer
tags:
  - article
---

## Задача

Тултип — небольшая всплывающая подсказка с дополнительной информацией о функциях интерактивного элемента. Появляется при наведении курсора на элемент или взаимодействии с ним с клавиатуры. Это распространённый паттерн в веб-интерфейсах.

Тултип полезен, когда у элемента нет подписи, только иконка. Или когда нужно подробнее раскрыть его назначение.

Тултип может быть двух типов:

- статичный – будет показываться только с одной, заранее выбранной, стороны;
- адаптивный – будет появляться сверху, справа, снизу и слева от элемента в зависимости от наличия свободного места на экране.

В статье разберём три способа создания тултипа:

1. статичный;
1. адаптивный на основе [Intersection Observer](/js/intersection-observer/);
1. адаптивный на основе [Popover API](/html/popover/) и [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning).

## Статичный

### Готовое решение

Для начала создадим HTML-разметку со всеми необходимыми элементами:

```html
<div
  class="tooltip-container"
>
  <button
    class="button tooltip-anchor"
    id="tooltip-anchor"
    aria-describedby="tooltip"
  >
    ❤️
  </button>
  <div
    class="tooltip hidden"
    role="tooltip"
    id="tooltip"
    data-position="top"
  >
    Добавить в «Избранное»
  </div>
</div>
```

Внешнее оформление тултипа и элемента, к которому он привязан, опишем с помощью следующих [CSS-правил](/css/css-rule/):

```css
.button {
  display: block;
  min-width: 210px;
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 9px 15px;
  color: #000000;
  font-size: inherit;
  font-weight: 300;
  font-family: inherit;
  transition: background-color 0.15s ease-in;
  cursor: pointer;
  background-color: #C56FFF;
}

.button:hover {
  background-color: #FFFFFF;
}

.button:focus-visible {
  border: 2px solid #FFFFFF;
  outline: none;
}

.button:focus {
  border: 2px solid #FFFFFF;
  outline: none;
}

@media (width < 768px) {
  .button {
    min-width: 60px;
  }
}

.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  width: max-content;
  max-width: 300px;
  padding: 10px 40px;
  background-color: #FFFFFF;
  color: #000000;
  text-align: center;
}

.tooltip::after {
  content: '';
  position: absolute;
  border: 7px solid transparent;
}

.tooltip[data-position=top] {
  bottom: calc(100% + 14px);
  left: 50%;
  translate: -50% 0;
}

.tooltip[data-position=top]::after {
  bottom: -14px;
  left: 50%;
  translate: -50% 0;
  border-top-color: #FFFFFF;
}

.tooltip[data-position=bottom] {
  top: calc(100% + 14px);
  left: 50%;
  translate: -50% 0;
}

.tooltip[data-position=bottom]::after {
  top: -14px;
  left: 50%;
  translate: -50% 0;
  border-bottom-color: #FFFFFF;
}

.tooltip[data-position=right] {
  left: calc(100% + 14px);
  top: 50%;
  translate: 0 -50%;
  max-width: 200px;
}

.tooltip[data-position=right]::after {
  left: -14px;
  top: 50%;
  translate: 0 -50%;
  border-right-color: #FFFFFF;
}

.tooltip[data-position=left] {
  right: calc(100% + 14px);
  top: 50%;
  translate: 0 -50%;
  max-width: 200px;
}

.tooltip[data-position=left]::after {
  right: -14px;
  top: 50%;
  translate: 0 -50%;
  border-left-color: #FFFFFF;
}

.hidden {
  visibility: hidden;
}
```

Реализуем отображение и скрытие тултипа с помощью JavaScript-методов:

```javascript
const tooltip = document.querySelector('#tooltip')
const tooltipAnchor = document.querySelector('#tooltip-anchor')

const showTooltip = () => {
  tooltip.classList.remove('hidden')
}

const hideTooltip = () => {
  tooltip.classList.add('hidden')
}

tooltipAnchor.addEventListener('mouseenter', showTooltip)
tooltipAnchor.addEventListener('focus', showTooltip)

tooltipAnchor.addEventListener('mouseleave', hideTooltip)
tooltipAnchor.addEventListener('blur', hideTooltip)

tooltipAnchor.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hideTooltip()
  }
})
```

<iframe title="Статичный тултип, открывающийся сверху" src="demos/static-top/" height="480"></iframe>

Статичный тултип может показываться с одной из четырех сторон, но сторона должна быть выбрана заранее. «На лету» статичный тултип не сможет подстроиться под изменения на экране. Он будет продолжать показываться с выбранной стороны, даже если она скрыта за вьюпортом.

<iframe title="Четыре статичных тултипа, открывающихся с одной, заранее выбранной стороны" src="demos/static-four-sides/" height="480"></iframe>

### Разбор решения

В качестве интерактивного элемента будем использовать [кнопку](/html/button/), а с помощью атрибута [`aria-describedby`](/a11y/aria-describedby/) свяжем её с тултипом.

За основу тултипа возьмём [`<div>`](/html/div/). Добавим ему соответствующую `role` — [`tooltip`](/a11y/role-tooltip/), чтобы ассистивные технологии понимали назначение элемента.

Обернём кнопку и тултип в контейнер — относительно него мы спозиционируем всплывающую подсказку.

#### Разметка

```html
<div
  class="tooltip-container"
>
  <button
    class="button tooltip-anchor"
    id="tooltip-anchor"
    aria-describedby="tooltip"
  >
    ❤️
  </button>
  <div
    class="tooltip hidden"
    role="tooltip"
    id="tooltip"
    data-position="top"
  >
    Добавить в «Избранное»
  </div>
</div>
```

#### Стили

Сделаем контейнер [строчно-блочным](/css/display/) и зададим для свойства [`position`](/css/position/) значение `relative`. Это позволит позиционировать тултип относительно кнопки.

```css
.tooltip-container {
  position: relative;
  display: inline-block;
}
```

Опишем базовые стили для тултипа и его хвостика.

```css
.tooltip {
  position: absolute;
  width: max-content;
  max-width: 300px;
  padding: 10px 40px;
  background-color: #FFFFFF;
  color: #000000;
  text-align: center;
}

/* хвостик тултипа */
.tooltip::after {
  content: '';
  position: absolute;
  border: 7px solid transparent;
}
```

Зададим стили для каждого из четырёх положений.

```css
/* тутлтип сверху */
.tooltip[data-position=top] {
  bottom: calc(100% + 14px);
  left: 50%;
  translate: -50% 0;
}

/* хвостик тутлтипа сверху */
.tooltip[data-position=top]::after {
  bottom: -14px;
  left: 50%;
  translate: -50% 0;
  border-top-color: #FFFFFF;
}

/* тутлтип снизу */
.tooltip[data-position=bottom] {
  top: calc(100% + 14px);
  left: 50%;
  translate: -50% 0;
}

/* хвостик тутлтипа снизу */
.tooltip[data-position=bottom]::after {
  top: -14px;
  left: 50%;
  translate: -50% 0;
  border-bottom-color: #FFFFFF;
}

/* тутлтип справа */
.tooltip[data-position=right] {
  left: calc(100% + 14px);
  top: 50%;
  translate: 0 -50%;
  max-width: 200px;
}

/* хвостик тутлтипа справа */
.tooltip[data-position=right]::after {
  left: -14px;
  top: 50%;
  translate: 0 -50%;
  border-right-color: #FFFFFF;
}

/* тутлтип снизу */
.tooltip[data-position=left] {
  right: calc(100% + 14px);
  top: 50%;
  translate: 0 -50%;
  max-width: 200px;
}

/* хвостик тутлтипа снизу */
.tooltip[data-position=left]::after {
  right: -14px;
  top: 50%;
  translate: 0 -50%;
  border-left-color: #FFFFFF;
}
```

Визуально скрывать тултип будем с помощью свойства [`visibility`](/css/visibility/).

```css
.hidden {
  visibility: hidden;
}
```

#### JavaScript

Для начала найдём все элементы, которые понадобятся нам для работы с тултипом: сам тултип и кнопку, к которой он привязан.

```javascript
const tooltip = document.querySelector('#tooltip')
const tooltipAnchor = document.querySelector('#tooltip-anchor')
```

Напишем функции для отображения и скрытия тултипа.

```javascript
const showTooltip = () => {
  tooltip.classList.remove('hidden')
}

const hideTooltip = () => {
  tooltip.classList.add('hidden')
}
```

Навесим соответствующие обработчики событий на кнопку. Теперь она умеет показывать тултип на наведение курсора мыши или фокусе с клавиатуры. Закрываться тултип будет при потере кнопкой ховера или фокуса, а также при нажатии на клавишу <kbd>Escape</kbd>.

```javascript
tooltipAnchor.addEventListener('mouseenter', showTooltip)
tooltipAnchor.addEventListener('focus', showTooltip)

tooltipAnchor.addEventListener('mouseleave', hideTooltip)
tooltipAnchor.addEventListener('blur', hideTooltip)

tooltipAnchor.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hideTooltip()
  }
})
```

## Адаптивный на основе Intersection Observer

Пользователь может по-разному взаимодействовать с интерфейсом. Он может вызвать всплывающую подсказку в начале страницы или пролистав её почти до конца. В этот момент статично заданое положение тултипа может быть скрыто за границами вьюпорта. Избежать подобной ситуации поможет тултип, который умеет адаптироваться под свободное место на экране.

Разберём рецент адаптивного тултипа.

### Готовое решение

Опишем необходимую HTML-разметку:

```html
<div
  class="tooltip-container"
>
  <button
    class="button tooltip-anchor"
    id="tooltip-anchor"
    aria-describedby="tooltip"
  >
    ❤️
  </button>
  <div
    class="tooltip hidden"
    role="tooltip"
    id="tooltip"
    data-position="top"
  >
    Добавить в «Избранное»
  </div>
</div>
```

Добавим стилизацию:

```css
.button {
  display: block;
  min-width: 210px;
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 9px 15px;
  color: #000000;
  font-size: inherit;
  font-weight: 300;
  font-family: inherit;
  transition: background-color 0.15s ease-in;
  cursor: pointer;
  background-color: #C56FFF;
}

.button:hover {
  background-color: #FFFFFF;
}

.button:focus-visible {
  border: 2px solid #FFFFFF;
  outline: none;
}

.button:focus {
  border: 2px solid #FFFFFF;
  outline: none;
}

@media (width < 768px) {
  .button {
    min-width: 60px;
  }
}

.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  width: max-content;
  max-width: 300px;
  padding: 10px 40px;
  background-color: #FFFFFF;
  color: #000000;
  text-align: center;
}

.tooltip::after {
  content: '';
  position: absolute;
  border: 7px solid transparent;
}

.tooltip[data-position=top] {
  bottom: calc(100% + 14px);
  left: 50%;
  translate: -50% 0;
}

.tooltip[data-position=top]::after {
  bottom: -14px;
  left: 50%;
  translate: -50% 0;
  border-top-color: #FFFFFF;
}

.tooltip[data-position=bottom] {
  top: calc(100% + 14px);
  left: 50%;
  translate: -50% 0;
}

.tooltip[data-position=bottom]::after {
  top: -14px;
  left: 50%;
  translate: -50% 0;
  border-bottom-color: #FFFFFF;
}

.tooltip[data-position=right] {
  left: calc(100% + 14px);
  top: 50%;
  translate: 0 -50%;
  max-width: 200px;
}

.tooltip[data-position=right]::after {
  left: -14px;
  top: 50%;
  translate: 0 -50%;
  border-right-color: #FFFFFF;
}

.tooltip[data-position=left] {
  right: calc(100% + 14px);
  top: 50%;
  translate: 0 -50%;
  max-width: 200px;
}

.tooltip[data-position=left]::after {
  right: -14px;
  top: 50%;
  translate: 0 -50%;
  border-left-color: #FFFFFF;
}

.hidden {
  visibility: hidden;
}
```

Реализуем методы отображения, скрытия и изменения положения тултипа:

```javascript
const tooltip = document.querySelector('#tooltip')
const tooltipAnchor = document.querySelector('#tooltip-anchor')

const showTooltip = () => {
  tooltip.classList.remove('hidden')
}

const hideTooltip = () => {
  tooltip.classList.add('hidden')
}

tooltipAnchor.addEventListener('mouseenter', showTooltip)
tooltipAnchor.addEventListener('focus', showTooltip)

tooltipAnchor.addEventListener('mouseleave', hideTooltip)
tooltipAnchor.addEventListener('blur', hideTooltip)

tooltipAnchor.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hideTooltip()
  }
})

const defineTooltipPosition = (boundingClientRect, intersectionRect) => {
  if (boundingClientRect.bottom > intersectionRect.bottom) {
    return 'top'
  } else if (boundingClientRect.right > intersectionRect.right) {
    return 'left'
  } else if (boundingClientRect.left < intersectionRect.left) {
    return 'right'
  } else if (boundingClientRect.top < intersectionRect.top) {
    return 'bottom'
  } else {
    return 'top'
  }
}

const observerOptions = {
  root: document,
  rootMargin: '-20px',
  threshold: 1
}

const observerCallback = (entries) => {
  entries.forEach(({ isIntersecting, boundingClientRect, intersectionRect }) => {
    if (!isIntersecting) {
      tooltip.dataset.position = defineTooltipPosition(boundingClientRect, intersectionRect)
    }
  })
}

const observer = new IntersectionObserver(observerCallback, observerOptions)

observer.observe(tooltip)
```

Попробуйте проскроллить к разным краям вьюпорта — тултип сможет адаптироваться.

<iframe title="Адаптивный тултип на основе Intersection Observer" src="demos/adaptive-js/" height="480"></iframe>

### Разбор решения

#### Разметка и стили

Разметка и стили точно такие же, как в рецепте статичного тултипа. Повторно их разбирать не будем.

#### JavaScript

Методы отображения и скрытия тултипа идентичны методам статичного тултипа.

Разберём логику переноса тултипа в свободную область экрана.

Сперва опишем метод определения положения тултипа. Если какая-то из сторон всплывающей подсказки будет близка к выходу за границы окна браузера, начнем показывать его с противоположной стороны кнопки.

```javascript
const defineTooltipPosition = (boundingClientRect, intersectionRect) => {
  // если тултип выходит за нижнюю границу, показываем его сверху
  if (boundingClientRect.bottom > intersectionRect.bottom) {
    return 'top'
  // выходит за правую — показываем слева
  } else if (boundingClientRect.right > intersectionRect.right) {
    return 'left'
  // выходит за левую — показываем справа
  } else if (boundingClientRect.left < intersectionRect.left) {
    return 'right'
  // выходит за верхнюю — показываем снизу
  } else if (boundingClientRect.top < intersectionRect.top) {
    return 'bottom'
  // дефолтное положение — сверху
  } else {
    return 'top'
  }
}
```

Далее применим этот метод внутри колбэка для `IntersectionObserver`.

```javascript
/* 
  Отслеживаем приближение тултипа к границе вьюпорта меньше,
  чем на 20 пикселей
*/
const observerOptions = {
  root: document,
  rootMargin: '-20px',
  threshold: 1
}

const observerCallback = (entries) => {
  entries.forEach(({ isIntersecting, boundingClientRect, intersectionRect }) => {
    if (!isIntersecting) {
      // если пересёк установленную границу — обновляем положение тултипа
      tooltip.dataset.position = defineTooltipPosition(boundingClientRect, intersectionRect)
    }
  })
}

const observer = new IntersectionObserver(observerCallback, observerOptions)

observer.observe(tooltip)
```

## Адаптивный на основе Popover API и CSS Anchor Positioning

В предыдущих рецептах мы управляли видимостью тултипа с помощью смены [CSS-классов](/css/class-selector/) и меняли расположние тултипа с помощью [Intersection Observer](/js/intersection-observer/).

Теперь подобную функциональность можно реализовать проще и с меньшим количеством JavaScript благодаря [Popover API](/html/popover/) и CSS Anchor Positioning.

<aside>

🚧 Рецепт работает только в Chromium браузерах, так как на момент написания статьи _CSS Anchor Positioning_ доступен только в них. Проверяйте поддержку на [Can I use](https://caniuse.com/css-anchor-positioning).

</aside>

### Готовое решение

Для начала создадим HTML-разметку со всеми необходимыми элементами:

```html
<button
  class="button tooltip-anchor"
  id="tooltip-anchor"
  aria-describedby="tooltip"
>
  ❤️
</button>
<div
  class="tooltip"
  id="tooltip"
  role="tooltip"
  popover="manual"
>
  <div class="tooltip-content">
    Добавить в «Избранное»
  </div>
</div>
```

Внешнее оформление тултипа и его умение адаптироваться под местоположение элемента, к которому он привязан, опишем с помощью следующих CSS-правил:

```css
.button {
  display: block;
  min-width: 210px;
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 9px 15px;
  color: #000000;
  font-size: inherit;
  font-weight: 300;
  font-family: inherit;
  transition: background-color 0.15s ease-in;
  cursor: pointer;
  background-color: #C56FFF;
}

.button:hover {
  background-color: #FFFFFF;
}

.button:focus-visible {
  border: 2px solid #FFFFFF;
  outline: none;
}

.button:focus {
  border: 2px solid #FFFFFF;
  outline: none;
}

@media (width < 768px) {
  .button {
    min-width: 60px;
  }
}

.tooltip-anchor {
  anchor-name: --button-el;
}

.tooltip {
  inset: unset;
  max-width: 300px;
  margin: 10px;
  padding: 10px 40px;
  background-color: #FFFFFF;
  color: #000000;
  text-align: center;
  position-anchor: --button-el;
  position-area: top;
  position-try-fallbacks: --bottom, --left, --right;
  anchor-name: --tooltip-el;
}

@position-try --bottom {
  position-area: bottom;
}

@position-try --left {
  position-area: left;
  max-width: 200px;
}

@position-try --right {
  position-area: right;
  max-width: 200px;
}

.tooltip-content {
  background-color: inherit;
}

.tooltip::before,
.tooltip::after,
.tooltip .tooltip-content::before,
.tooltip .tooltip-content::after {
  position-anchor: --button-el;
  content: '';
  position: fixed;
  background-color: inherit;
  margin: auto;
}

.tooltip::before,
.tooltip::after {
  left: anchor(--button-el start);
  right: anchor(--button-el end);
  width: 10px;
  max-height: 10px;
}

.tooltip::before {
  top: anchor(--button-el end);
  bottom: anchor(--tooltip-el start);
  translate: 0 7px;
  rotate: 45deg;
}

.tooltip::after {
  top: anchor(--tooltip-el end);
  bottom: anchor(--button-el start);
  translate: 0 -7px;
  rotate: 45deg;
}

.tooltip .tooltip-content::before,
.tooltip .tooltip-content::after {
  top: anchor(--button-el start);
  bottom: anchor(--button-el end);
  height: 10px;
  max-width: 10px;
}

.tooltip .tooltip-content::before {
  left: anchor(--button-el end);
  right: anchor(--tooltip-el start);
  translate: 7px;
  rotate: 45deg;
}

.tooltip .tooltip-content::after {
  left: anchor(--tooltip-el end);
  right: anchor(--button-el start);
  translate: -7px;
  rotate: 45deg;
}
```

Реализуем отображение и скрытие тултипа с помощью JavaScript-методов:

```javascript
const tooltip = document.querySelector('#tooltip')
const tooltipAnchor = document.querySelector('#tooltip-anchor')

const showTooltip = () => {
  tooltip.showPopover()
}

const hideTooltip = () => {
  tooltip.hidePopover()
}

tooltipAnchor.addEventListener('mouseenter', showTooltip)
tooltipAnchor.addEventListener('focus', showTooltip)

tooltipAnchor.addEventListener('mouseleave', hideTooltip)
tooltipAnchor.addEventListener('blur', hideTooltip)

tooltipAnchor.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hideTooltip()
  }
})
```

Попробуйте проскроллить к разным краям вьюпорта — тултип сможет адаптироваться.

<iframe title="Адаптивный тултип на основе Popover API и CSS Anchor Positioning" src="demos/adaptive-popover-and-css-anchor-positioning/" height="480"></iframe>

### Разбор решения

#### Разметка

Разметка похожа на разметку в предыдущих рецептах, но есть некоторые отличия.

В качестве интерактивного элемента по-прежнему будем использовать [кнопку](/html/button/) и свяжем её с тултипом с помощью атрибута [`aria-describedby`](/a11y/aria-describedby/).

Основа тултипа, как и раньше, [`<div>`](/html/div/) с ролью [`tooltip`](/a11y/role-tooltip/). Из новинок — добавим атрибут [`popover`](/html/popover/), чтобы переключать видимость тултипа. Значение `manual` необходимо, чтобы тултип не скрывался при клике на кнопку.

В рецепте мы специально не связываем тултип с кнопкой с помощью атрибута [`popovertarget`](/html/popover/#obyazatelnye-atributy), так как хотим показывать тултип на ховер или [фокус](/js/element-focus/), а не на [клик](/js/element-click/).

Также в данном рецепте не требуется дополнительный контейнер вокруг кнопки и тултипа, «привяжем» тултип напрямую к кнопке.

```html
<button
  class="button tooltip-anchor"
  id="tooltip-anchor"
  aria-describedby="tooltip"
>
  ❤️
</button>
<div
  class="tooltip"
  id="tooltip"
  role="tooltip"
  popover="manual"
>
  <div class="tooltip-content">
    Добавить в «Избранное»
  </div>
</div>
```

#### Стили

Сперва необходимо связать кнопку с тултипом. Для этого дадим кнопке «якорное имя» `--button-el` и затем сошлёмся на него в свойстве `position-anchor`.

```css
.tooltip-anchor {
  /* даём якорю (кнопке) имя */
  anchor-name: --button-el;
}

.tooltip {
  /* ссылаемся на якорь, к которому привязан тултип */
  position-anchor: --button-el;
}
```

Далее опишем доступные положения тултипа относительно кнопки. Дефолтное — `top`. Если расположить тултип сверху не удалось, попросим браузер отрисовать тултип снизу, слева или справа через фолбэки `--bottom`, `--left` и `--right`.

```css
.tooltip {
  /* выставляем дефолтное положение относительно якоря */
  position-area: top;
  /* добавляем фолбэки, если дефолт не отработал */
  position-try-fallbacks: --bottom, --left, --right;
}

/* описываем, что значат фолбэки */
@position-try --bottom {
  position-area: bottom;
}

@position-try --left {
  position-area: left;
  max-width: 200px;
}

@position-try --right {
  position-area: right;
  max-width: 200px;
}
```

Создадим хвостики тултипа с помощью псевдоэлементов [`::after`](/css/after/) и [`::before`](/css/before/). Фактически, у нас будет 4 хвостика, но в каждом из возможных четырёх положений тултипа (сверху, снизу, справа, слева) увидим только один.

```css
/* хвостики */
.tooltip::before,
.tooltip::after,
.tooltip .tooltip-content::before,
.tooltip .tooltip-content::after {
  /* якоримся на тот же элемент, что и тултип */
  position-anchor: --button-el;
  content: '';
  position: fixed;
  background: inherit;
  margin: auto;
}
```

Сделаем тултип якорем. Это нужно для управления видимостью хвостиков.

```css
.tooltip-anchor {
  /* делаем тултип якорем */
  anchor-name: --tooltip-el;
}
```

Опишем стили, которые будут управлять видимостью хвостиков. Мы будем растягивать хвостики по высоте между двумя якорями: `--button-el` и `--tooltip-el`. Хвостик, у которого высота примет положительное значение, будет виден, остальные нет.

Хвостики для вертикальной ориентации опишем с помощью `::after` и `::before` у элемента `.tooltip`.

```css
/* для вертикальной ориентации */
.tooltip::before,
.tooltip::after {
  left: anchor(--button-el start);
  right: anchor(--button-el end);
  width: 10px;
  max-height: 10px;
}

/* для кейса, когда тултип под кнопкой */
.tooltip::before {
  /* растягиваем хвостик между двумя якорями */
  top: anchor(--button-el end);
  bottom: anchor(--tooltip-el start);
  translate: 0 7px;
  rotate: 45deg;
}

/* для кейса, когда тултип над кнопкой */
.tooltip::after {
  /* растягиваем хвостик между двумя якорями */
  top: anchor(--tooltip-el end);
  bottom: anchor(--button-el start);
  translate: 0 -7px;
  rotate: 45deg;
}
```

Хвостики для горизонтальной ориентации опишем с помощью `::after` и `::before` у элемента `.tooltip-content`.

```css
/* для горизонтальной ориентации */
.tooltip .tooltip-content::before,
.tooltip .tooltip-content::after {
  top: anchor(--button-el start);
  bottom: anchor(--button-el end);
  height: 10px;
  max-width: 10px;
}

/* для кейса, когда тултип справа от кнопки */
.tooltip .tooltip-content::before {
  /* растягиваем хвостик между двумя якорями */
  left: anchor(--button-el end);
  right: anchor(--tooltip-el start);
  translate: 7px;
  rotate: 45deg;
}

/* для кейса, когда тултип слева от кнопки */
.tooltip .tooltip-content::after {
  /* растягиваем хвостик между двумя якорями */
  left: anchor(--tooltip-el end);
  right: anchor(--button-el start);
  translate: -7px;
  rotate: 45deg;
}
```

#### JavaScript

Для начала найдём все элементы, которые понадобятся нам для работы с тултипом: сам тултип и кнопку, к которой он привязан.

```javascript
const tooltip = document.querySelector('#tooltip')
const tooltipAnchor = document.querySelector('#tooltip-anchor')
```

Напишем функции для отображения и скрытия тултипа. Ранее мы это делали с помощью смены [CSS классов](/css/class-selector/). Теперь используем методы поповера.

```javascript
const showTooltip = () => {
  tooltip.showPopover()
}

const hideTooltip = () => {
  tooltip.hidePopover()
}
```

Навесим соответствующие обработчики событий на кнопку. Она, как и в предыдущих репептах, умеет показывать тултип на наведение мышью или фокусе с клавиатуры. Закрываться тултип будет при потере кнопкой ховера или фокуса, а также при нажатии на клавишу <kbd>Escape</kbd>.

```javascript
tooltipAnchor.addEventListener('mouseenter', showTooltip)
tooltipAnchor.addEventListener('focus', showTooltip)

tooltipAnchor.addEventListener('mouseleave', hideTooltip)
tooltipAnchor.addEventListener('blur', hideTooltip)

tooltipAnchor.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hideTooltip()
  }
})
```

## Выводы

В зависимости от требований можно использовать как статичный, так и адаптивный тултипы.

Если интерфейс не имеет скролла, то можно использовать статичный.

В остальных случаях лучше подойдёт адаптивный.

Если браузерная поддержка позволяет, то адаптивность можно реализовать с помощью CSS Anchor Positioning. Иначе придется использовать [Intersection Observer](/js/intersection-observer/).
