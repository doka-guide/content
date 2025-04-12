---
title: "Кастомный кроссбраузерный ползунок диапазона"
description: "Стилизуем сложный, но нужный элемент интерфейса. Разберёмся с ситуацией, когда нужны две ручки."
authors:
  - lonlylokly
  - vitya-ne
keywords:
  - слайдер
  - слайдер диапазона
  - range
related:
  - html/input
  - recipes/checkbox-radio-style
  - css/accent-color
tags:
  - article
---

## Задача

При помощи `<input type="range">` можно выбирать числовые значение из заданного диапазона. Браузерные стили этого элемента часто не соответствует дизайну и функциональности веб-приложений, поэтому приходится его кастомизировать. В рецепте ниже описан один из способов стилизации ползунка диапазона, а также приведён пример ползунка с двумя ручками. Особое внимание уделено доступности с учётом рекомендации WCAG.

## Анатомия

Сначала разберём ползунок на детали.

Термины:

- **трэк** — полоска во всю длину элемента;
- **прогресс-бар** — полоска заполнения диапазона;
- **ручка** — элемент, с помощью которого пользователь меняет значение;
- **шкала значений** — подписи значений диапазона рядом с трэком.

## Простой вариант

### Обычный ползунок и его атрибуты

Создадим стандартный `<input type="range">`.

<iframe title="Стандартный ползунок" src="demos/input-range-1/" height="180"></iframe>

```html
<div class="range">
  <label class="range-label" for="tailmetr">
    Хвост-о-метр (cм)
  </label>
  <input
    class="range-input"
    id="tailmetr"
    type="range"
    min="0"
    max="100"
    value="50"
    step="1"
  >
</div>
```

Расположим подпись над ползунком.

```css
.range {
  display: grid;
  gap: 20px;
  width: 200px;
}
```

Добавим свой цвет с помощью свойства `accent-color`.

```css
.range-input {
  accent-color: #c56fff;
}
```

Если вы используете нативный интерактивный элемент `<input type="range">`, то добавлять aria-атрибуты не нужно. Однако, если вы используете [`<div>`](/html/div/) или другой тег вместо [`<input>`](/html/input/), то обязательно добавьте атрибуты доступности:

- [`aria-valuemin`](/a11y/aria-valuemin/);
- [`aria-valuemax`](/a11y/aria-valuemax/);
- [`aria-valuenow`](/a11y/aria-valuenow/);
- [`aria-labeledby`](/a11y/aria-labelledby/);
- [`aria-label`](/a11y/aria-label/);
- [`aria-orientation`](/a11y/aria-orientation/).

### Ручка

Для создания своего ползунка нужно сбросить дефолтные стили браузера у `<input>`.

<iframe title="Стилизация ползунка" src="demos/input-range-2/" height="180"></iframe>

Высота ползунка в Firefox определяется как высота элемента `<input>`. Для WebKit потребуются дополнительные стили.

```css
.range-input {
  appearance: none;
  height: 15px;
}
```

В данный момент стилизовать компонент можно только через псевдоэлементы с префиксом (В WebKit и Firefox они отличаются).

<aside>

☝️ Обратите внимание, стили псевдоэлементов описаны отдельно для разных движков, так как иначе могут возникнуть проблемы с отображением.

</aside>

Добавляем стили трэка.

```css
.range-input::-webkit-slider-runnable-track {
  box-sizing: border-box;
  height: 15px;
  background-color: #2b2a33;
}

.range-input::-moz-range-track {
  box-sizing: border-box;
  background-color: #2b2a33;
}
```

Добавляем стили ручке.

```css
.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 30px;
  height: 30px;
  margin-top: -7.5px;
  border: none;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 0 5px inset #c56fff;
  transition: 300ms;
}

.range-input::-moz-range-thumb {
  width: 30px;
  height: 30px;
  margin-top: 0;
  border: none;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 0 5px inset #c56fff;
  transition: 300ms;
}
```

Стилизуем состояние фокуса ([`:focus-visible`](/css/focus-visible/)) и ховера ([`:hover`](/css/hover/)).

```css
.range-input:focus-visible {
  outline-offset: 10px;
  outline: 1px solid #c56fff;
}

.range-input:hover::-webkit-slider-thumb,
.range-input:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 10px inset #c56fff;
}

.range-input:hover::-moz-range-thumb,
.range-input:focus-visible::-moz-range-thumb {
  box-shadow: 0 0 0 10px inset #c56fff;
}
```

Стилизуем активное состояние ползунка ([`:active`](/css/active/)).

```css
.range-input:active::-webkit-slider-thumb {
  box-shadow: 0 0 0 30px inset #c56fff;
}
.range-input:active::-moz-range-thumb {
  box-shadow: 0 0 0 30px inset #c56fff;
}
```

И не забываем про неактивное состояние ([`:disabled`](/css/disabled-enabled/)).

```css
.range-input:disabled::-webkit-slider-thumb {
  box-shadow: 0 0 0 30px inset gray;
}

.range-input:disabled::-moz-range-thumb {
  box-shadow: 0 0 0 30px inset gray;
}
```

По рекомендациям WCAG также следует выделять фокусом не только сам элемент, но и отдельно ползунок, который будет перемещаться.

```css
.range-input:focus-visible::-webkit-slider-thumb {
  outline: 3px solid #41e847;
}

.range-input:focus-visible::-moz-range-thumb {
  outline: 3px solid #41e847;
}
```

### Трэк

Убираем фон у слайдера, чтобы он не перекрывал трэк.

<iframe title="Стилизация трэка" src="demos/input-range-3/" height="180"></iframe>


```css
.range-input {
  appearance: none;
  background: none;
}
```

Стилизация дефолтного трэка в данный момент также доступна только через псевдоэлементы с префиксами браузеров.

```css
.range-input::-webkit-slider-runnable-track {
  box-sizing: border-box;
  height: 8px;
  background-color: #ababab;
  border-radius: 10px;
}

.range-input::-moz-range-track {
  box-sizing: border-box;
  height: 8px;
  background-color: #ababab;
  border-radius: 10px;
}
```

С помощью свойства [`margin-top`](/css/margin/) добавим выравнивание вертикального положения ручки для WebKit.

```css
.range-input::-webkit-slider-thumb {
  margin-top: -11px;
}
```

Подкорректируем стилизацию состояния фокуса.

```css
.range-input:focus-visible {
  outline: none;
}

.range-input:focus-visible::-webkit-slider-runnable-track {
  outline-offset: 15px;
  outline: 1px solid #c56fff;
}

.range-input:focus-visible::-moz-range-track {
  outline-offset: 15px;
  outline: 1px solid #c56fff;
}
```

### Прогресс-бар

<iframe title="Стилизация прогресс-бара" src="demos/input-range-4/" height="180"></iframe>

К сожалению, в современных браузерах нет кроссбраузерной поддержки стилизации прогресс-бара. В Firefox есть псевдоэлемент с префиксом `-moz-range-progress`.

Для Firefox используйте такой метод:

```css
.range-input::-moz-range-progress {
  height: 8px;
  border-radius: 10px;
  background-color: #c56fff;
}
```

В WebKit и Chrome пока нет поддержки стилизации прогресс-бара. Для обхода этих ограничений можно воспользоваться трюком.

Добавляем ползунку границу в виде градиента в свойстве [`border-image`](/css/border-image/).

```css
.range-input::-webkit-slider-thumb {
  border-image:
    linear-gradient(90deg, #c56fff 50%, #ababab 0)
    0 1 /
    calc(50% - 4px)
    100vw/0 100vw;
}
```

Если разобрать это свойство по частям, то получится следующий код.

```css
.range-input::-webkit-slider-thumb {
  border-image-outset: 0 100vw;
  border-image-repeat: stretch;
  border-image-slice: 0 1;
  border-image-source: linear-gradient(90deg, #c56fff 50%, #ababab 0);
  border-image-width: calc(50% - 4px) 100vw;
}
```

Прячем то, что выходит за рамки `<input>`.

```css
.range {
  gap: 8px;
  height: 65px;
  overflow: hidden;
}

.range-input {
  height: 30px;
}
```

Если использовать такой вариант стилизации, то можно столкнуться с ограничениями и проблемами. Например, нет возможности скруглить края, а так же нет возможности отображать состояние фокуса с использование свойства [`outline`](/css/outline/).

### Кроссбраузерный вариант и текущее значение

Перепишем ползунок заново.

Для удобной кроссбраузерной и читабельной версии используем отдельные теги `<div>` для трэка и прогресс-бара. А также [кастомные свойства](/css/custom-properties/) для изменения заполненности прогресс-бара с помощью JavaScript.

<iframe title="Кроссбраузерный вариант" src="demos/input-range-5/" height="250"></iframe>

```html
<div class="range" style="--value: 80;">
  <label class="range-label" for="tailmetr">
    Хвост-о-метр (cм)
  </label>
  <div class="track"></div>
  <div class="progress"></div>
  <div class="thumbs">
    <input
      class="range-input"
      id="tailmetr"
      type="range"
      min="0"
      max="100"
      value="80"
      step="1"
    >
  </div>
</div>
```

Отдельно стоит обратить внимание на атрибут `style="--value: 80;"`. Это начальное значение слайдера в виде кастомного свойства.

```html
<div class="range" style="--value: 80;">
  ...
</div>
```

На каждое изменение будет вызываться функция `handleInputRange()`. Для этого добавим обработку события [`input`](/js/event-input/).

```js
const range = document.querySelector('.range-input')
range.addEventListener('input', handleInputRange)
```

Напишем функцию изменения значения слайдера.

```js
function handleInputRange() {
  event.target.parentNode.parentNode.style.setProperty(
    '--value',
    event.target.value
  )
}
```

Обращаемся к объекту события (`event`). В нём обращаемся к свойству `target` (тегу `<input>`), в котором произошло событие. Потом обращаемся к родительскому элементу (`parentNode`) и ещё раз к родительскому элементу (`parentNode`), это будет `<div class="range" style="--value: 80;">"`. И уже в нем меняем значение CSS-переменной `--value` на новое, которое выставил пользователь (`event.target.value`).

Для добавления текущего значение нужно немного изменить структуру HTML, добавив тег [`<output>`](/html/output/) сразу после `<input>`.

```html
<div class="range" style="--value: 80;">
  <label class="range-label" for="tailmetr">
    Хвост-о-метр (cм)
  </label>
  <div class="track"></div>
  <div class="progress"></div>
  <div class="thumbs">
    <input
      class="range-input"
      id="tailmetr"
      type="range"
      min="0"
      max="100"
      value="80"
      step="1"
    >
    <!-- Текущее значение слайдера -->
    <output
      class="range-output"
      id="output"
      or="tailmetr"
    >
      80
    </output>
  </div>
</div>
```

Допишем код функции обработки события `input`, изменение значения тега `<output>`.

```javascript
function handleInputRange() {
  event.target.parentNode.parentNode.style.setProperty(
    '--value',
    event.target.value
  )
  // изменение значения тега `<output>`
  event.target.nextElementSibling.value = event.target.value;
}
```

Используем дополнительные кастомные свойства для указания положения элементов слайдера. Эти переменные пригодятся для дальнейшей стилизации.

Добавляем переменные расположения и смещения для тега `<output>` с текущим значением. Смещение нужно, чтобы число располагалось точно над ползунком, так как оно увеличивается с однозначного 0, до трёхзначного 100.

Так как значение переменной `--value` это просто строка «80», то её нужно переводить в проценты. Для этого используются хитрость с умножением на 1% `calc(var(--value) * 1%)`.


```css
.range {
  --range-track-top: 70px;
  --range-output-left: calc(var(--value) * 1%);
  --range-output-offset-xy: calc(var(--value) * -1%), 0;
}

.range-label {
  margin-block-end: 40px;
}

.track {
  position: absolute;
  top: var(--range-track-top);
}

.progress {
  position: absolute;
  top: var(--range-track-top);
  width: calc(var(--value) * 1%);
}
```

Стилизуем текущее значение. Располагаем его над ползунком, указываем размер, отступы, центрируем число в центре элемента, указываем шрифты, смещение, убираем возможность выделения.

```css
.range-output {
  position: absolute;
  bottom: 40px;
  left: var(--range-output-left);
  padding: 0 4px;
  background: transparent;
  border-radius: 10px;
  font-size: 18px;
  text-align: end;
  transform: translate(var(--range-output-offset-xy));
  user-select: none;
  transition: 300ms;
}
```

### Шкала значений

Шкалу значений нужно добавлять с помощью тегов [`<datalist>`](/html/datalist/) и [`<option>`](/html/option/). А также указать в теге `<input>` атрибут `list="tickmarks"` c идентификатором тега со списком значений, чтобы ползунок немного прилипал к этим значениям, когда пользователь доводит до них.

<iframe title="Стилизация шкалы значений" src="demos/input-range-6/" height="250"></iframe>

Создадим кастомные свойства для положения элементов шкалы. Немного корректируем вычисление положения текущего значения.

```css
.range {
  --tickmarks-w: calc(100% - 18px);
  --option-after-h: 30px;
  --option-after-top: -30px;

  --range-output-offset-xy: calc(var(--value) * -0.95%), 0;
  --range-output-margin: calc(6 / (var(--value) + 1) * 1px);
}
```

Дополняем стили текущего состояния `margin-left` для более точной подстройки положения элемента.

```css
.range-output {
  position: absolute;
  top: 25px;
  left: var(--range-output-left);
  margin-left: var(--range-output-margin);
  padding: 0 4px;
  background: transparent;
  border-radius: 10px;
  font-size: 18px;
  text-align: end;
  transform: translate(var(--range-output-offset-xy));
  user-select: none;
  transition: 300ms;
}
```

Стилизуем состояние когда `<input>` находится в фокусе или с ховером.

```css
.range-input:focus-visible {
  outline-offset: 7px;
  outline: 1px solid #c56fff;
}

.range-input:hover + .range-output,
.range-input:focus-visible + .range-output {
  background-color: #c56fff;
  transition: 0ms;
}
```

Добавляем шкалу значений и её стили.

```html
<div class="range" style="--value: 80">
  <label
    class="range-label"
    for="tailmetr"
  >
    Хвост-о-метр (cм)
  </label>
  <div class="track"></div>
  <div class="progress"></div>
  <input
    class="range-input"
    id="tailmetr"
    type="range"
    min="0"
    max="100"
    value="80"
    step="1"
    aria-valuemin="0"
    aria-valuemax="100"
    list="tickmarks"
  >
  <output class="range-output" id="output" for="tailmetr">80</output>
  <datalist id="tickmarks" class="tickmarks">
    <option value="0 to 20">0</option>
    <option>20</option>
    <option>40</option>
    <option>60</option>
    <option>80</option>
    <option>100</option>
  </datalist>
</div>
```

```css
.tickmarks {
  width: var(--tickmarks-w);
  height: 30px;
  padding-inline: 4px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
}

option {
  position: relative;
  padding-top: 10px;
  padding-left: 4px;
  width: 10px;
  font-size: 14px;
}

option::after {
  content: "";
  display: initial;
  position: absolute;
  top: var(--option-after-top);
  left: 10px;
  width: 3px;
  height: var(--option-after-h);
  margin: 0 auto;
  background: #c6c6c6;
  z-index: -1;
}
```

## Сложные варианты

### Две ручки

Часто требуется сделать слайдер с двумя ручками, чтобы указать диапазон чего-то. Например, диапазон цен в фильтре поиска товаров.
За основу возьмём слайдер, реализованный ранее.

<iframe title="Слайдер с 2-мя ручками" src="demos/input-range-7/" height="250"></iframe>

```html
<!-- Инициализируем css переменные для обоих ползунков --value-1 и --value-2 -->
<div class="range" style="--value-1: 20; --value-2: 40;">
  <label class="range-label" for="tailmetr">Хвост-о-метр (cм)</label>
  <div class="track"></div>
  <div class="progress"></div>
  <div class="thumbs">
    <input
      class="range-input"
      id="tailmetr1"
      type="range"
      min="0"
      max="100"
      value="20"
      step="1"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-orientation="horizontal"
      list="tickmarks"
    >
    <output
      class="range-output"
      id="output"
      for="tailmetr1"
      style="--value: var(--value-1);"
    >
      20
    </output>
    <!-- Второй ползунок -->
    <input
      class="range-input"
      id="tailmetr2"
      type="range"
      min="0"
      max="100"
      value="40"
      step="1"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-orientation="horizontal"
      list="tickmarks"
    >
    <!-- Вывод текущего значения для второго ползунка -->
    <output
      class="range-output"
      id="output"
      for="tailmetr2"
      style="--value: var(--value-2);"
    >
      40
    </output>
  </div>
  <datalist id="tickmarks">
    <option value="0 to 20">0</option>
    <option>20</option>
    <option>40</option>
    <option>60</option>
    <option>80</option>
    <option>100</option>
  </datalist>
</div>
```

Обратите внимание, что помимо добавления второго тега `<input>`, также был добавлен тег `<output>` для текущего значения второго элемента. А в обёртку слайдера добавлена инициализация сразу двух кастомных свойств для обоих ползунков `--value-1` и `--value-2`. Также были изменены функции, указанные в атрибуте `oninput`. Для каждого ползунка будет своя функция обработки `handleInputRange1()` и `handleInputRange2()`.

Напишем новые функции для обработки изменения значения ползунков.

```javascript
function handleInputRange1() {
  event.target.parentNode.parentNode.style.setProperty(
    '--value-1',
    event.target.value
  );
  event.target.nextElementSibling.value = event.target.value
}

function handleInputRange2() {
  event.target.parentNode.parentNode.style.setProperty(
    '--value-2',
    event.target.value
  );
  event.target.nextElementSibling.value = event.target.value
}
```

По сути это та же самая функция `handleInputRange()`, только в каждой из них изменяется свое значение `--value-1` и `--value-2`.

Также нужно чтобы ползунки находились на одной дорожке.

```css
.thumbs {
  display: grid;
}

.range-input {
  grid-area: 1 / 1;
  pointer-events: none;
}
```

Запрещаем элементу `<input>` реагировать на события указателя, такие как ховер. Теперь эти события будут обрабатываться каждой ручкой отдельно.

Изменяем положение и размер прогресс-бара, чтобы он заполнял значение между левым и правым ползунками.

Вычисляем размер прогресс-бара, вычитая правое значение из левого и взяв модуль от результата `calc((var(--value-2) - var(--value-1)) * 1%);`. Также вычисляем значение начального расположения прогресс-бара. Для этого нам нужно взять минимальное значение из двух — то, что ближе находится к началу: `min(calc(var(--value-1) * 1%), calc(var(--value-2) * 1%));`.

Определяем кастомные свойства для элементов отображающих текущее значение.

```css
.range {
  --range-progress-w: calc((var(--value-2) - var(--value-1)) * 1%);
  --range-progress-left: min(
    calc(var(--value-1) * 1%),
    calc(var(--value-2) * 1%)
  );
}

.range-output {
  --range-output-left: calc(var(--value) * 1%);
  --range-output-offset-xy: calc(var(--value) * -0.95%), 0;
  --range-output-margin: calc(6 / (var(--value) + 1) * 1px);
}
```

### Ограничение перемещения ручек

Иногда требуется, чтобы ползунки не могли поменяться местами, а при пересечении они упирались друг в друга.

<iframe title="Слайдер с ограничениями для ручек" src="demos/input-range-8/" height="250"></iframe>

Напишем ограничители для ручек. Если значение текущего ползунка больше либо равно значению второго, то значение текущего ползунка приравнивается значению второго. Если значение текущего ползунка равно максимальному значению, то он должен находиться выше второго, чтобы пользователь мог изменить его значения, иначи ползунки будут блокировать друг друга.

```javascript
function handleInputRange1() {
  // Достает значение второго(правого) ползунка
  const value2 =
    event.target.parentNode.parentNode.style.getPropertyValue('--value-2')

  if (parseInt(event.target.value) >= parseInt(value2)) {
    event.target.value = value2
  }

  if (event.target.value === '100') {
    event.target.style.zIndex = '100'
  } else {
    event.target.style.zIndex = '0'
  }
  event.target.parentNode.parentNode.style.setProperty(
    '--value-1',
    event.target.value
  )
  event.target.nextElementSibling.value = event.target.value
}

function handleInputRange2() {
  // Достает значение первого(левого) ползунка
  const value1 =
    event.target.parentNode.parentNode.style.getPropertyValue('--value-1');

  if (parseInt(event.target.value) <= parseInt(value1)) {
    console.log(event.target.value)
    event.target.value = value1
  }

  if (event.target.value === '0') {
    event.target.style.zIndex = '100'
  } else {
    event.target.style.zIndex = '0'
  }
  event.target.parentNode.parentNode.style.setProperty(
    '--value-2',
    event.target.value
  )
  event.target.nextElementSibling.value = event.target.value
}
```

### Много ручек

Ещё одним вариантом является реализации слайдера с разным количеством ручек.

<iframe title="Слайдер с 4-мя ползунками" src="demos/input-range-four-thumbs/" height="250"></iframe>

Возьмем предыдущий вариант слайдера с двумя ручками без ограничений по перемещению. Спрячем прогресс-бар и добавим нужное количество ручек. Пусть будет 4.

```html
<div
  class="range"
  style="--value-1: 20; --value-2: 40; --value-3: 60; --value-4: 80;"
>
  <label class="range-label" for="tailmetr">
    Хвост-о-метр (cм)
  </label>
  <div class="track"></div>
  <div class="progress"></div>
  <div class="thumbs">
    <input
      class="range-input"
      id="tailmetr1"
      type="range"
      min="0"
      max="100"
      value="20"
      step="1"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-orientation="horizontal"
      list="tickmarks"
    >
    <output
      class="range-output"
      id="output"
      for="tailmetr1"
      style="--value: var(--value-1);"
    >
      20
    </output>
    <input
      class="range-input"
      id="tailmetr2"
      type="range"
      min="0"
      max="100"
      value="40"
      step="1"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-orientation="horizontal"
      list="tickmarks"
    >
    <output
      class="range-output"
      id="output"
      for="tailmetr2"
      style="--value: var(--value-2);"
    >
      40
    </output>
    <input
      class="range-input"
      id="tailmetr3"
      type="range"
      min="0"
      max="100"
      value="60"
      step="1"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-orientation="horizontal"
      list="tickmarks"
    >
    <output
      class="range-output"
      id="output"
      for="tailmetr3"
      style="--value: var(--value-3);"
    >
      60
    </output>
    <input
      class="range-input"
      id="tailmetr4"
      type="range"
      min="0"
      max="100"
      value="80"
      step="1"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-orientation="horizontal"
      list="tickmarks"
    >
    <output
      class="range-output"
      id="output"
      for="tailmetr4"
      style="--value: var(--value-4);"
    >
      80
    </output>
  </div>
  <datalist id="tickmarks">
    <option value="0 to 20">0</option>
    <option>20</option>
    <option>40</option>
    <option>60</option>
    <option>80</option>
    <option>100</option>
  </datalist>
</div>
```

Что бы не писать однотипные функции обработки для каждой ручки, используем цикл и общую функцию.

```javascript
const createHandler = (valueName) => (event) => {
  event.target.parentNode.parentNode.style.setProperty(
    valueName,
    event.target.value
  )
  event.target.nextElementSibling.value = event.target.value
}

document.querySelectorAll('.range-input').forEach((rangeInput, idx) => {
  rangeInput.addEventListener('input', createHandler(`--value-${idx + 1}`))
})
```

### Заключение

В этой статье описан путь от базового нативного слайдера до сложных решений c несколькими ручками, уделяя внимание кроссбраузерной совместимости и критически важным аспектам доступности.

Ключевые моменты:

1. Базовая стилизация ползунка, трека и прогресс-бара.
1. Добавление текущего значения и шкалы.
1. Создание слайдера с двумя ползунками, включая логику ограничения их перемещения.
1. Расширение функционала до варианта с разным количеством ползунков.

Все решения соответствуют принципам доступности, следуя рекомендациям WCAG. Включая правильное использование ARIA-атрибутов, обеспечение клавиатурной навигации и чёткую визуальную обратную связь.

Важно отметить, что хотя был достигнут высокий уровень кастомизации, поддержание доступности и удобства использования должно оставаться приоритетом. При реализации сложных интерфейсов всегда следует учитывать баланс между эстетикой и функциональностью.
