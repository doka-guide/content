---
title: "Тултип"
description: "Верстаем тултип с использованием Popover API и CSS Anchor Positioning."
authors:
  - akhmadullin
keywords:
  - tooltip
  - popover
  - css anchor positioning
related:
  - html/popover
  - a11y/role-tooltip
  - a11y/aria-describedby
tags:
  - article
---

## Задача

Тултип – небольшая всплывающая подсказка с дополнительной информацией о функциях интерактивного элемента. Появляется при наведении курсора на элемент или взаимодействии с ним с клавиатуры. Это распространённый паттерн в веб-интерфейсах.

Тултип полезен, когда у элемента нет подписи, только иконка. Или когда нужно подробнее раскрыть его назначение.

В статье разберём способ создания тултипа, который может адаптироваться под изменение местоположения элемента. Он будет появляться сверху, справа, снизу и слева от элемента в зависимости от наличия свободного места на экране. Использовать для этого будем [`Popover API`](/html/popover/) и `CSS Anchor Positioning`.

<aside>

🚧 Рецепт работает только в Chromium браузерах, так как на момент написания статьи `CSS Anchor Positioning` доступен только в них. Проверяйте поддержку на [Can I use](https://caniuse.com/css-anchor-positioning).

</aside>

## Готовое решение

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

Внешнее оформление тултипа и его умение адаптироваться под местоположение элемента, к которому он привязан, опишем с помощью следующих [CSS-правил](/css/css-rule/):

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

@media (max-width: 768px) {
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

<iframe title="Пример тултипа" src="demos/tooltip-demo/" height="480"></iframe>

## Разбор решения

### Разметка

В качестве интерактивного элемента будем использовать [кнопку](/html/button/), а с помощью атрибута [`aria-describedby`](/a11y/aria-describedby/) свяжем её с тултипом.

За основу тултипа возьмём [`div`](/html/div/). Добавим ему соответствующую `role` – [`tooltip`](/a11y/role-tooltip/), чтобы ассистивные технологии понимали назначение элемента. Не забудем атрибут [`popover`](/html/popover/), чтобы переключать видимость тултипа. Значение `manual` необходимо, чтобы тултип не скрывался при клике на кнопку.

В рецепте мы специально не связываем тултип с кнопкой с помощью атрибута [`popovertarget`](/html/popover/#obyazatelnye-atributy), так как хотим показывать тултип на ховер или [фокус](/js/element-focus/), а не на [клик](/js/element-click/).

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

### Стили

Сперва необходимо связать кнопку с тултипом. Для этого дадим кнопке «якорное имя» `--button-el` и затем сошлёмся на него через `position-anchor`.

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

Далее опишем доступные положения тултипа относительно кнопки. Дефолтное – `top`. Если расположить тултип сверху не удалось, попросим браузер отрисовать тултип снизу, слева или справа через фолбэки `--bottom`, `--left` и `--right`.

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

Создадим хвостики тултипа с помощью псевдо-элементов [`::after`](/css/after/) и [`::before`](/css/before/). Фактически, у нас будет 4 хвостика, но в каждом из возможных четырёх положений тултипа (сверху, снизу, справа, слева) увидим только один.

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

Хвостики для вертикальной ориентации опишем с помощью [`::after`](/css/after/) и [`::before`](/css/before/) у элемента `.tooltip`.

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

Хвостики для горизонтальной ориентации опишем с помощью [`::after`](/css/after/) и [`::before`](/css/before/) у элемента `.tooltip-content`.

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

### JavaScript

Для начала найдём все элементы, которые понадобятся нам для работы с тултипом, — сам тултип и кнопку, к которой он привязан.

```javascript
const tooltip = document.querySelector('#tooltip')
const tooltipAnchor = document.querySelector('#tooltip-anchor')
```

Напишем функции для отображения и скрытия тултипа.

```javascript
const showTooltip = () => {
  tooltip.showPopover()
}

const hideTooltip = () => {
  tooltip.hidePopover()
}
```

Навесим соответствующие обработчики событий на кнопку. Теперь она умеет показывать тултип на наведение мышью или фокусе с клавиатуры. Закрываться тултип будет при потере кнопкой ховера или фокуса, а также при нажатии на клавишу <kbd>Escape</kbd>.

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
