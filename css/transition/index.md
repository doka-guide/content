---
title: "transition"
authors:
  - ezhkov
contributors:
  - skorobaeus
keywords:
  - transition
tags:
  - doka
---

## Кратко

Свойство `transition` используется, когда нам нужно плавно изменить CSS-свойства между двумя состояниями элемента. Например, при наведении мышкой.

## Пример

<iframe title="Color transition" src="demos/color-transition.html"></iframe>

## Подробно

Свойство `transition` комплексное. Как, например, [`margin`](/css/margin/) или `background`. Оно включает в себя несколько подсвойств:

- `transition-property` — указываем свойство, которое хотим плавно изменить
- `transition-duration` — длительность перехода
- `transition-timing-function` — функция, описывающая скорость изменения свойства
- `transition-delay` — задержка перед началом изменения

## Как записывается

Применить к одному свойству:

- Порядок записи: имя свойства | длительность:

```css
.selector {
  transition: margin-left 4s;
}
```

- Порядок записи: имя свойства | длительность | задержка:

```css
.selector {
  transition: margin-left 4s 1s;
}
```

- Порядок записи: имя свойства | длительность | временная функция | задержка:

```css
.selector {
  transition: margin-left 4s ease-in-out 1s;
}
```

Применить к двум свойствам:

```css
.selector {
  transition: margin-left 4s, color 1s;
}
```

Применить ко всем свойствам, которые будут меняться:

```css
.selector {
  transition: all 0.5s ease-out;
}
```

## Как это понять

Предположим, у нас есть кнопка, у которой мы хотим изменить фон при наведении мышкой.

```html
<button class="button">Кнопка</button>
```

Тогда можно сказать, что у кнопки есть два состояния:

1. Базовое состояние, когда мышка не над кнопкой
2. Состояние при наведении курсора мыши (hover-состояние)

Стили для двух этих состояний могут быть записаны в CSS вот так 👇


Стили для базового состояния:

```css
.button {
  padding: 10px 15px;
  background-color: #18191c;
}
```

Стили для hover-состояния:

```css
.button:hover {
  background-color: transparent;
}
```

Чтобы при наведении фон кнопки изменялся не скачком, а плавно, мы используем свойство `transition` для плавного изменения цвета фона.

Стили для базового состояния:

```css
.button {
  padding: 10px 15px;
  background-color: #18191c;
  transition: background-color 0.4s;
}
```

Стили для hover-состояния:

```css
.button:hover {
  background-color: transparent;
}
```

<iframe title="Transition одного или двух свойств" src="demos/transition-of-properties.html"></iframe>

Если мы хотим плавно изменить два и более свойств, нужно просто перечислить их через запятую.

Стили для базового состояния:

```css
.button {
  padding: 10px 15px;
  background-color: #18191c;
  transition: background-color 0.4s, padding 0.5s;
}
```

Стили для hover-состояния:

```css
.button:hover {
  padding: 10px 30px;
  background-color: transparent;
}
```

Не забывай о том, что вместе с изменяемым свойством обязательно должна указываться длительность изменения (`.5s`).

## Подсказки

💡 Обрати внимание, что свойство `transition` мы задали в стилях для базового состояния. Таким образом, мы заранее говорим браузеру, какое свойство должно изменяться плавно.

💡 С помощью `transition` можно плавно изменять любое свойство, у которого значение записывается с помощью чисел (например, `margin`). Исключения: `visibility`, `z-index`.

По возможности старайся **не использовать** слово `all` для описания перехода (`transition: all .3s`). Да, это проще на первоначальном этапе, но позже из-за этого в какой-то момент могут начать плавно изменяться свойства, которые не должны этого делать. Ну и вообще, когда браузер встречает слово `all`, он начинает перебирать каждое CSS свойство элемента в поисках необходимого. Это ненужная нагрузка.

## Особенности

💡 Вторым состоянием необязательно должно быть состояние при наведении. Это может быть состояние [`:focus`](/css/focus), [`:active`](/css/active), [`:checked`](/css/checked) или, например, появление дополнительного класса.

💡 Мы можем настроить `transition` таким образом, что при изменении состояния переход будет выполняться с одной скоростью, а при обратном изменении состояния — с другой.

Стили для базового состояния:

```css
.button {
  background-color: #18191c;
  transition: background-color .3s;
}
```

Стили для hover-состояния:

```css
.button:hover {
  background-color: transparent;
  transition: background-color 3s;
}
```

<iframe title="Разная скорость transition" src="demos/transition-speed.html"></iframe>

Обрати внимание, в этом случае свойство `transition` задаётся для обоих состояний.

💡 Длительность перехода может задаваться в секундах (`0.3s`) или в миллисекундах (`300ms`). Ноль перед точкой можно не писать (`.3s`).

💡 Значение свойства `z-index` записывается числом, но его нельзя плавно изменить никаким способом.

💡 Значение свойства `visibility` записывается строкой, но его в связке с `opacity` можно плавно изменять при помощи `transition`.

💡 Кроме использования для изменения внешнего вида элемента, `transition` прекрасно подходит для решения задач с появлением элементов. Например при реализации тултипов или всплывающих меню:

```html
<div>
  <h2>Fade in</h2>
  <div class="tooltip-cnt">
    <span class="tooltip-target">Наведи на меня</span>
    <div class="tooltip">Ты — супер!</div>
  </div>
</div>

<div class="transitioned">
  <h2>Slide up</h2>
  <div class="tooltip-cnt">
    <span class="tooltip-target">Наведи на меня</span>
    <div class="tooltip">Неожиданно, да? :)</div>
  </div>
</div>
```

```css
.tooltip-cnt {
  position: relative;
}

.tooltip {
  position: absolute;
  /* Описываем переход */
  transition: opacity 0.4s, visibility 0.4s, transform 0.4s;
  /* Прячем элемент */
  opacity: 0;
  visibility: hidden;
}

.transitioned .tooltip {
  /* Второй тултип еще опускаем вниз */
  transform: translateY(20px);
}

.tooltip-target:hover + .tooltip {
  opacity: 1;
  visibility: visible;
}

.transitioned .tooltip-target:hover + .tooltip {
  /* Поднимаем второй тултип обратно вверх при появлении */
  transform: translateY(0);
}
```

<iframe title="Анимация подсказки при помощи transition" src="demos/tooltip-transition.html"></iframe>

**Обрати внимание**, что мы прописали `visibility` как одно из свойств, которое нужно плавно изменить. Это работает в связке с `opacity` и обеспечивает возможность плавного появления/скрытия элемента:

```css
.tooltip {
  transition: opacity 0.4s, visibility 0.4s;
}
```

Если использовать только `opacity`, то элемент станет невидимым, но будет доступен для взаимодействия с мышкой и клавиатурой.

Если использовать только `visibility`, то скрытие/появление не будет плавным.
