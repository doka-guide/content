---
title: "Тултип"
description: "Верстаем тултип с использования Popover API и CSS Anchor Positioning"
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

Тултип – распространённый паттерн в веб-интерфейсах. Представляет собой небольшую всплывающую подсказку к интерактивному элементу с дополнительной информацией о его функциях. Появляется при наведении на элемент или взаимодействии с ним с клавиатуры.

Тултип может быть полезен, когда у элемента нет подписи, только иконка. Или когда нужно более подробно пояснить его назначение.

В статье разберем способ создания тултипа, который может адаптироваться под изменение местоположения элемента. Тултип будет уметь рисоваться сверху, справа, снизу, слева от элемента, к которому он привязан, в зависимости от наличия свободного места на экране. Использовать для этого будет [`Popover API`](/html/popover/) и `CSS Anchor Positioning`.

<aside>

🚧 Рецепт работает только в Chromium браузерах, так как на момент написания статьи `CSS Anchor Positioning` доступен только в них. Проверяйте поддержку на [Can I use](https://caniuse.com/css-anchor-positioning).

</aside>

## Готовое решение

Для начала создадим HTML-разметку со всеми необходимыми элементами:

```html
<button class="button tooltip-anchor" id="tooltip-anchor" aria-describedby="tooltip">
    ❤️
</button>
<div class="tooltip" id="tooltip" role="tooltip" popover="manual">
    <div class="tooltip-content">
        Добавить в «Избранное»
    </div>
</div>
```

Внешнее оформление тултипа и его умение адаптироваться под местоположение элемента, к которому он приязан, опишем с помощью следующих [CSS-правил](/css/css-rule/):

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

.tooltip-anchor {
    anchor-name: --button-el;
}

.tooltip {
    inset: unset;
    width: max-content;
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
}

@position-try --right {
    position-area: right;
}

.tooltip-content {
    background-color: inherit;
}

.tooltip::before,
.tooltip::after,
.tooltip .tooltip-content::before,
.tooltip .tooltip-content::after  {
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
    transform: translateY(7px) rotate(45deg);
}

.tooltip::after {
    top: anchor(--tooltip-el end);
    bottom: anchor(--button-el start);
    transform: translateY(-7px) rotate(45deg);
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
    transform: translateX(7px) rotate(45deg);
}

.tooltip .tooltip-content::after {
    left: anchor(--tooltip-el end);
    right: anchor(--button-el start);
    transform: translateX(-7px) rotate(45deg);
}
```

Реализуем открытие и закрытие тултипа с помощью JavaScript-методов:

```javascript
const tooltip = document.querySelector('#tooltip')
const tooltipAnchor = document.querySelector('#tooltip-anchor')

const showTooltip = () => {
    tooltip?.showPopover()
};

const hideTooltip = () => {
    tooltip?.hidePopover()
};

tooltipAnchor?.addEventListener('mouseenter', showTooltip)
tooltipAnchor?.addEventListener('focus', showTooltip)

tooltipAnchor?.addEventListener('mouseleave', hideTooltip)
tooltipAnchor?.addEventListener('blur', hideTooltip)

tooltipAnchor?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideTooltip()
    }
})
```

<iframe title="Пример тултипа" src="demos/tooltip-demo/" height="480"></iframe>

## Разбор решения

### Разметка

В качестве интерактивного элемента будем использовать [кнопку](/html/button/). С помощью атрибута [`aria-describedby`](/a11y/aria-describedby/) связываем ее с тултипом.

В качестве тултипа будем использовать [`div`](/html/div/). Добавляем ему соответствующую `role` – [`tooltip`](/a11y/role-tooltip/), чтобы ассистивные технологии понимали назначение элемента. Добавляем атрибут [`popover`](/html/popover/), чтобы уметь переключать видимость тултипа. Значение `manual` необходимо, чтобы тултип не скрывался при клике на кнопку.

В данном рецепте мы специально не связываем тултип с кнопкой с помощью атрибута [`popovertarget`](/html/popover/), так как нам необходим показ тултипа на ховер или [фокус](/js/element-focus/), а не на [клик](/js/element-click/).

```html
<button class="button tooltip-anchor" id="tooltip-anchor" aria-describedby="tooltip">
    ❤️
</button>
<div class="tooltip" id="tooltip" role="tooltip" popover="manual">
    <div class="tooltip-content">
        Добавить в «Избранное»
    </div>
</div>
```

### Стили

Сперва необходимо связать кнопку с тултипом. Для этого даем кнопке «якорное имя» (`anchor-name: --button-el;`) и затем ссылаемся на него (`position-anchor: --button-el;`).

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

Далее описываем доступные расположения тултипа относительно кнопки. Дефолтное положение – сверху (`position-area: top;`). Если расположить тултип сверху не удалось, просим браузер попробовать отрисовать тултип снизу, слева или справа (` position-try-fallbacks: --bottom, --left, --right;`). И описываем, что под этим подразумеваем.

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
}

@position-try --right {
    position-area: right;
}
```

Создаем хвостики тултипа с помощью псевдо-элементов [`::after`](/css/after/) и [`::before`](/css/before/). Фактически, у нас будет 4 хвостика, но в каждом из возможных четырех положениях тултипа (сверху, снизу, справа, слева) будет виден только один хвостик.

```css
/* хвостики */
.tooltip::before,
.tooltip::after,
.tooltip .tooltip-content::before,
.tooltip .tooltip-content::after  {
    /* якоримся на тот же элемент, что и тултип */
    position-anchor: --button-el;
    content: '';
    position: fixed;
    background: inherit;
    margin: auto;
}
```

Делаем тултип якорем. Он будет нужен для управлению видимостью хвостиков.

```css
.tooltip-anchor {
    /* делаем тултип якорем */
    anchor-name: --tooltip-el;
}
```

Описываем стили, которые будут управлять видимостью хвостиков. Мы растягиваем хвостики по высоте между двумя якорями: `--button-el` и `--tooltip-el`. Хвостик, у которого высота приняла положительное значение, будет виден, остальные нет.

Хвостики для вертикальной ориентации описываем с помощью [`::after`](/css/after/) и [`::before`](/css/before/) у элемента `.tooltip`.

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
    transform: translateY(7px) rotate(45deg);
}

/* для кейса, когда тултип над кнопкой */
.tooltip::after {
    /* растягиваем хвостик между двумя якорями */
    top: anchor(--tooltip-el end);
    bottom: anchor(--button-el start);
    transform: translateY(-7px) rotate(45deg);
}
```

Хвостики для горизонтальной ориентации описываем с помощью [`::after`](/css/after/) и [`::before`](/css/before/) у элемента `.tooltip-content`.

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
    transform: translateX(7px) rotate(45deg);
}

/* для кейса, когда тултип слева от кнопки */
.tooltip .tooltip-content::after {
    /* растягиваем хвостик между двумя якорями */
    left: anchor(--tooltip-el end);
    right: anchor(--button-el start);
    transform: translateX(-7px) rotate(45deg);
}
```

### JavaScript

Для начала найдём все элементы, которые понадобятся нам для работы с тултипом — сам тултип и кнопка, к которой он привязан:

```javascript
const tooltip = document.querySelector('#tooltip')
const tooltipAnchor = document.querySelector('#tooltip-anchor')
```

Напишем функции для открытия и закрытия тултипа.

```javascript
const showTooltip = () => {
    tooltip?.showPopover()
};

const hideTooltip = () => {
    tooltip?.hidePopover()
};
```

Навесим соответствующие обработчики событий на кнопку. Теперь она умеет показывать тултип на наведение мышью или фокусе с клавиатуры. Закрываться тултип будет при потери кнопкой ховера или фокуса, а также при нажатии на клавишу `Escape`.

```javascript
tooltipAnchor?.addEventListener('mouseenter', showTooltip)
tooltipAnchor?.addEventListener('focus', showTooltip)

tooltipAnchor?.addEventListener('mouseleave', hideTooltip)
tooltipAnchor?.addEventListener('blur', hideTooltip)

tooltipAnchor?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideTooltip()
    }
})
```
