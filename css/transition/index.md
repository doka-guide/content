---
title: "`transition`"
description: "Меняем состояние элемента плавно, а не резко."
baseline:
  - group: transition-behavior
    features:
      - css.properties.transition-behavior
cover:
  author: kirakusto
  desktop: 'images/covers/desktop.svg'
  mobile: 'images/covers/mobile.svg'
  alt: 'Девочка на пляже под зонтиком, а рядом стрелка, которая становится прозрачнее, чем выше к солнцу'
authors:
  - ezhkov
contributors:
  - skorobaeus
  - solarrust
keywords:
  - transition
  - transition-behavior
  - allow-discrete
related:
  - css/transition-timing-function
  - css/transition-property
  - css/will-change
tags:
  - doka
---

## Кратко

Свойство `transition` применяют, когда нужно плавно изменить CSS-свойства между двумя состояниями элемента. Например, при наведении мышкой.

## Пример

<iframe title="Плавное изменение цвет" src="demos/color-transition/" height="250"></iframe>

## Подробно

Свойство `transition` — это шорткат. Как, например, [`margin`](/css/margin/) или [`background`](/css/background/). Оно включает в себя несколько подсвойств:

- [`transition-property`](/css/transition-property/) — указываем свойство, которое хотим плавно изменить;
- [`transition-duration`](/css/transition-duration/) — длительность перехода;
- [`transition-timing-function`](/css/transition-timing-function/) — функция, описывающая скорость изменения свойства;
- [`transition-delay`](/css/transition-delay/) — задержка перед началом изменения.

## Как пишется

Применить к одному свойству:

- Порядок записи: имя свойства | длительность:

```css
.selector {
  transition: transform 4s;
}
```

- Порядок записи: имя свойства | длительность | задержка:

```css
.selector {
  transition: transform 4s 1s;
}
```

- Порядок записи: имя свойства | длительность | временная функция | задержка:

```css
.selector {
  transition: transform 4s ease-in-out 1s;
}
```

Применить к двум свойствам:

```css
.selector {
  transition: transform 4s, color 1s;
}
```

Применить ко всем свойствам, которые будут меняться:

```css
.selector {
  transition: all 0.5s ease-out;
}
```

Длительность перехода можно задавать в секундах (`0.3s`) или в миллисекундах (`300ms`). Ноль перед точкой можно не писать (`.3s`).

## Как понять

Предположим, у нас есть кнопка, у которой мы хотим изменить фон при наведении мышкой.

```html
<button class="button">Кнопка</button>
```

Тогда можно сказать, что у кнопки есть два состояния:

1. Базовое состояние, когда мышка не над кнопкой.
1. Состояние при наведении курсора мыши (ховер-состояние).

Вторым состоянием необязательно должно быть состояние при наведении. Это может быть состояние [`:focus`](/css/focus/), [`:active`](/css/active/), [`:checked`](/css/checked/) или, например, появление дополнительного класса.

Стили для двух этих состояний можно записать в CSS вот так 👇

Стили для базового состояния:

```css
.button {
  background-color: blue;
}
```

Стили для ховер-состояния:

```css
.button:hover {
  background-color: white;
}
```

Чтобы при наведении фон кнопки изменялся не скачком, а плавно, мы используем свойство `transition` для плавного изменения цвета фона.

Стили для базового состояния:

```css
.button {
  background-color: blue;
  transition: background-color 0.6s;
}
```

Стили для ховер-состояния:

```css
.button:hover {
  background-color: white;
}
```

<iframe title="Transition одного или двух свойств" src="demos/transition-of-properties/" height="275"></iframe>

Если мы хотим плавно изменить два свойства и более, нужно просто перечислить их через запятую.

Стили для базового состояния:

```css
.button {
  background-color: pink;
  transition: background-color 0.6s, transform 0.5s;
}
```

Стили для ховер-состояния:

```css
.button:hover {
  background-color: white;
  transform: scale(110%);
}
```

Не забывай о том, что вместе с изменяемым свойством нужно указывать длительность изменения (`.5s`).

Мы можем настроить `transition` таким образом, что при изменении состояния переход будет выполняться с одной скоростью, а при обратном изменении состояния — с другой.

Стили для базового состояния:

```css
.button {
  background-color: pink;
  transition: background-color 0.3s, transform 0.2s;
}
```

Стили для hover-состояния:

```css
.button:hover {
  background-color: white;
  transform: scale(110%);
  transition: background-color 3s, transform 2.5s;
}
```

<iframe title="Разная скорость transition" src="demos/transition-speed/" height="275"></iframe>

Обратите внимание, в этом случае свойство `transition` задаётся для обоих состояний.

## Плавное появление и скрытие элемента

Значение свойства `visibility` записывается строкой, но его в связке с `opacity` можно плавно изменять при помощи `transition`. Кроме изменения внешнего вида элемента, это пригодится для задач с появлением элементов — например, при реализации тултипов или всплывающих меню:

```html
<div>
  <h2>Fade in</h2>
  <div class="tooltip-cnt">
    <span class="tooltip-target">Наведи на меня</span>
    <div class="tooltip">Эта подсказка проявилась</div>
  </div>
</div>

<div class="transitioned">
  <h2>Slide up</h2>
  <div class="tooltip-cnt">
    <span class="tooltip-target">Наведи на меня</span>
    <div class="tooltip">Это подсказка, которая всплыла</div>
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
  /* Второй тултип ещё опускаем вниз */
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

<iframe title="Анимация подсказки при помощи transition" src="demos/tooltip-transition/" height="250"></iframe>

**Обратите внимание**, что мы прописали `visibility` как одно из свойств, которое нужно плавно изменить. Это работает в связке с `opacity` и позволяет элементу плавно появляться и скрываться:

```css
.tooltip {
  transition: opacity 0.4s, visibility 0.4s;
}
```

Если использовать только `opacity`, то элемент станет невидимым, но будет доступен для взаимодействия с мышкой и клавиатурой.

Если использовать только `visibility`, то скрытие и появление не будет плавным.

### Через display и transition-behavior: allow-discrete

По умолчанию `transition` не умеет плавно переключать свойства с дискретной анимацией, то есть такие, у которых нет промежуточных значений. Самый частый пример — [`display`](/css/display/): значение либо `none`, либо что-то другое, без «половинчатого» состояния. Раньше, чтобы анимированно скрыть и показать элемент, приходилось совмещать `display: none` с `opacity` и `visibility` (как в примере с тултипом выше), сам `display` в переходе не участвовал.

Свойство `transition-behavior` со значением `allow-discrete` разрешает переходу подхватывать и дискретные свойства, включая `display` и `content-visibility`. При появлении элемент сразу получает `display: block`, а при скрытии — только в конце перехода, чтобы анимация успела доиграть.

```css
.menu {
  display: none;
  opacity: 0;
  transition: display 0.3s allow-discrete, opacity 0.3s;
}

.menu.is-open {
  display: block;
  opacity: 1;
}

/* Стартовое состояние для появления из display: none */
@starting-style {
  .menu.is-open {
    opacity: 0;
  }
}
```

`@starting-style` тут обязателен: без него браузер не поймёт, с какого значения `opacity` нужно начинать переход, когда элемент только что перестал быть `display: none`, и анимация не запустится.

<iframe title="Плавное появление элемента с display: none" src="demos/allow-discrete/" height="330"></iframe>

`allow-discrete` можно указать и для всех свойств сразу через `transition-behavior: allow-discrete` отдельно от `transition`, но чаще удобнее прописать его прямо в шорткате, как в примере выше.

## Подсказки

💡 Обратите внимание, что свойство `transition` мы задали в стилях для базового состояния. Таким образом, мы заранее говорим браузеру, какое свойство должно изменяться плавно.

💡 С помощью `transition` можно плавно изменять любое свойство, у которого значение записывается с помощью чисел (например, `margin`). Исключение — [`z-index`](/css/z-index/): его значение тоже число, но анимировать его нельзя никаким способом. Со свойством [`visibility`](/css/visibility/) тоже есть нюанс, смотри раздел про плавное появление и скрытие элемента выше.

💡 По возможности старайтесь не использовать слово `all` для описания перехода (`transition: all .3s`). Да, это проще на первоначальном этапе, но позже из-за этого в какой-то момент могут начать плавно изменяться свойства, которые не должны этого делать. Ну и вообще, когда браузер встречает слово `all`, он начинает перебирать каждое свойство элемента в поисках нужного. Это ненужная нагрузка.

💡 Старайтесь использовать для анимации в первую очередь свойства [`transform`](/css/transform/) и [`opacity`](/css/opacity/) — они самые производительные, потому что не приводят к перезапуску процессов [Layout](/tools/how-the-browser-creates-pages/#vychislenie-pozicii-i-razmerov-layout) и [Paint](/tools/how-the-browser-creates-pages/#neposredstvenno-otrisovka-paint). Изменяйте свойства `left`, `top`, `inset`, `margin`, `padding`, `width`, `inline-size`, `height`, `block-size` и прочие с осторожностью, только когда без этого никак не обойтись.
