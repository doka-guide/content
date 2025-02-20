---
title: "Кастомный кроссбраузерный ползунок диапазона"
description: "Стилизуем сложный, но нужный элемент интерфейса. Разберёмся с ситуацией, когда нужны две ручки."
authors:
  - lonlylokly
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

При помощи `<input type="range">` можно выбирать числовые значение из заданного диапазона. Браузерные стили этого элемента часто не соответствует дизайну и функциональности веб-приложений, поэтому приходится его кастомизировать. В рецепте ниже описан один из способов стилизации ползунка диапазона, а также приведён пример ползунка с двумя ручками. Особое внимание уделено доступности учитывая рекомендации WCAG.

"ДЕМКА СО ВСЕМИ ПРИМЕРАМИ INPUT RANGE В СТАТЬЕ"

## Анатомия

Сначала разберем ползунок на детали.

Термины:

- **трэк** - полоска во всю длину элемента;
- **прогресс-бар** - полоска заполнения диапазона;
- **ручка** - элемент, с помощью которого пользователь меняет значение;
- **шкала значений** - подписи значений диапазона рядом с трэком.

## Простой вариант ползунка

### Добавляем обычный input range в html и показываем все его атрибуты

Создаем дефолтный `<input type="range"`.

<iframe title="Пример input range" src="demos/input-range-1/" height="180"></iframe>

```html
<div class="range">
  <label class="range-label" for="tailmetr">Хвост-о-метр (cм)</label>
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

Располагаем подпись над ползунком.

```css
.range {
  display: grid;
  gap: 20px;
  width: 200px;
}
```

Добавляем свой цвет с помощью свойства `accent-color`.

```css
.range-input {
  accent-color: #c56fff;
}
```

Если вы используете нативный интерактивный элемент `<input type="range">`, то добавлять aria атрибуты не нужно. Однако если вы используете `<div>` или другой тэг вместо `<input>`, то обязательно добавьте следующие атрибуты доступности: `aria-valuemin`, `aria-valuemax`, `aria-valuenow` `aria-labeledby`, `aria-label`, `aria-orientation`.

### Ручка

Для создания своего ползунка нужно сбросить дефолтные стили браузера у `<input>`.

<iframe title="Пример input range" src="demos/input-range-2/" height="180"></iframe>

Высота ползунка в Firefox определяется как высота элемента `<input>`. Для Webkit потребуются дополнительные стили.

```css
.range-input {
  appearance: none;
  height: 15px;
}
```

В данный момент стилизовать компонент можно только через псевдоэлементы с префиксом (В Webkit и Firefox они отличаются).

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

Стилизуем состояние фокуса (`:focus-visible`) и ховера (`:hover`).

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

Стилизуем активное состояние ползунка (`:active`).

```css
.range-input:active::-webkit-slider-thumb {
  box-shadow: 0 0 0 30px inset #c56fff;
}
.range-input:active::-moz-range-thumb {
  box-shadow: 0 0 0 30px inset #c56fff;
}
```

И не забываем про неактивное состояние (`:disabled`).

```css
.range-input:disabled::-webkit-slider-thumb {
  box-shadow: 0 0 0 30px inset gray;
}

.range-input:disabled::-moz-range-thumb {
  box-shadow: 0 0 0 30px inset gray;
}
```

По рекомендациям WCAG также следует выделять фокусом не только сам input range, но и отдельно ползунок, который будет перемещаться.

```css
.range-input:focus-visible::-webkit-slider-thumb {
  outline: 3px solid #41e847;
}

.range-input:focus-visible::-moz-range-thumb {
  outline: 3px solid #41e847;
}
```

### Трэк

Убираем фон у слайдера, чтобы он не перекрывал наш трэк.

<iframe title="Пример input range" src="demos/input-range-3/" height="180"></iframe>


```css
.range-input {
  appearance: none;
  background: none;
}
```

Стилизация дефолтного трэка в данный момент, также доступна только через псевдоэлементы с префиксами браузеров.

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

С помощью свойства `margin-top` добавим выравнивание вертикального положения ручки для Webkit.

```css
.range-input::-webkit-slider-thumb {
  margin-top: -11px;
}
```

Подкорректируем стилизацию состояния фокуса (`:focus-visible`).

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

### Прогресс бар

<iframe title="Пример input range" src="demos/input-range-4/" height="180"></iframe>

К сожалению в современных браузерах нет кроссбраузерной поддержки стилизации прогресс бара. В Firefox есть псевдоэлемент с префиксом `-moz-range-progress`.

Пример стилизации прогресс бара в Firefox.

```css
.range-input::-moz-range-progress {
  height: 8px;
  border-radius: 10px;
  background-color: #c56fff;
}
```

В Webkit и Chrome пока нет поддержки стилизации прогресс бара. Для обхода этих ограничений можно воспользоваться CSS-трюком. (Для Firefox лучше использовать предыдущий метод, т.к могут быть артефакты)

Добавляем нашему ползунку границу в виде градиента в свойстве (`border-image`).

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
  border-image-source: linear-gradient(90deg, #c56fff 50%, #ababab 0px);
  border-image-width: calc(50% - 4px) 100vw;
}
```

Прячем то, что выходит за рамки `<input>`.

```css
.range {
  height: 65px;
  overflow: hidden;
}

.range-input {
  height: 30px;
}
```

Если использовать такой вариант стилизации, то можно столкнуться с ограничениями и проблемами. Например, нет возможности скруглить края.

### Кроссбраузерный вариант

Перепишем наш `<input type="range">` заново.
Для удобной кроссбраузерной и читабельной версии используем отдельные тэги `<div>` для трэка и прогресс бара. А также CSS переменные для изменения заполненности прогресс бара с помощью Javascript.

```html
<div class="range" style="--value: 80;">
  <label class="range-label" for="tailmetr">Хвост-о-метр (cм)</label>
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

Отдельно стоит обратить внимание на атрибут `style="--value: 80;"`. Это инициализация CSS переменной с начальным значением слайдера.

```html
<div class="range" style="--value: 80;"></div>
```

На каждое изменение будет вызываться функция `handleInputRange()`. Для этого добавим обработку события 'input'

```js
const range = document.querySelector('.range-input')
range.addEventListener('input', handleInputRange)
```

Пишем функцию обработку события изменения значения слайдера.

```javascript
function handleInputRange() {
  event.target.parentNode.parentNode.style.setProperty(
    "--value",
    event.target.value
  );
}
```

<iframe title="Пример input range" src="demos/input-range-5/" height="180"></iframe>

Если описать подробнее, то мы обращаемся к объекту события (`event`). В нём мы обращаемся к свойству `target` (тэгу `input`), в котором произошло событие. Потом обращаемся к родительскому элементу (`parentNode`) и ещё раз к родительскому элементу (`parentNode`), в нашем случае это будет `<div class="range" style="--value: 80;">"`. И уже в нем мы меняем значение CSS переменной `--value` на новое, которое выставил пользователь (`event.target.value`).

Добавляем стили для обертки нашего слайдера. Инициализируем кастомные переменные для размера и положения элементов слайдера. Эти переменные пригодятся в дальнейшем для стилизации. Указываем `relative` позиционирование и грид для последовательного расположения элементов.

```css
.range {
  /* Цвета для ползунка */
  --clr-primary: #c56fff;
  --clr-onPrimary: #fff;
  --clr-secondary: #41e847;
  --clr-bg: #ababab;
  --clr-ticks: #c6c6c6;
  --clr-outline: #41e847;

  /* Размер ползунка целиком */
  --range-w: 100%;
  --range-h: 30px;

  /* Размер ползунка */
  --range-thumb-w: 30px;
  --range-thumb-h: 30px;

  /* Размер и положение трэка */
  .track {
    --range-track-w: 100%;
    --range-track-h: 8px;
    --range-track-top: 72px;
    --range-track-bottom: 0px;
    --range-track-left: 0;
  }

  /* Размер и положение прогресс-бара */
  .progress {
    --range-progress-w: calc(var(--value) * 1%);
    --range-progress-h: 8px;
    --range-progress-top: 72px;
    --range-progress-bottom: 0px;
    --range-progress-left: none;
    --range-progress-right: none;
  }

  position: relative;
  display: grid;
  width: 80%;
}
```

Добавляем отступ подписи от слайдера.

```css
.range-label {
  margin-block-end: 41px;
}
```

Добавляем стили `<input type="range">`.

```css
.range-input {
  width: var(--range-w);
  height: var(--range-h);
  appearance: none;
  background: none;
}
```

Стилизуем ползунок. Указываем его размер, скругляем, добавляем ему фон, и внутреннюю тень.

```css
.range-input::-webkit-slider-thumb,
.range-input::-moz-range-thumb {
  width: var(--range-thumb-w);
  height: var(--range-thumb-h);
  border: none;
  border-radius: 50%;
  background-color: var(--clr-onPrimary);
  box-shadow: 0 0 0 5px inset var(--clr-primary);
  transition: 300ms;
}
```

Стилизуем состояние фокуса (`:focus-visible`) и ховера (`:hover`).

```css
.range-input:hover::-webkit-slider-thumb,
.range-input:hover::-moz-range-thumb,
.range-input:focus-visible::-webkit-slider-thumb,
.range-input:focus-visible::-moz-range-thumb {
  box-shadow: 0 0 0 10px inset var(--clr-primary);
  transition: 300ms;

  + .range-output {
    background-color: var(--clr-primary);
  }
}
```

Не забываем про рекомендации WCAG и выделяем фокусом не только сам слайдер целиком, но и отдельно ползунок, который будет перемещаться.

```css
.range-input:focus-visible::-webkit-slider-thumb,
.range-input:focus-visible::-moz-range-thumb {
  outline: 3px solid var(--clr-outline);
}
```

Стилизуем активное состояние ползунка (`:active`).

```css
.range-input:active::-webkit-slider-thumb,
.range-input:active::-moz-range-thumb {
  box-shadow: 0 0 0 30px inset var(--clr-primary);
  transition: 300ms;
}
```

Стилизуем неактивное состояние (`:disabled`).

```css
.range-input:disabled::-webkit-slider-thumb,
.range-input:disabled::-moz-range-thumb {
  box-shadow: 0 0 0 30px inset var(--clr-bg);
}
```

Добавляем стили трэку. Используем абсолютное расположение для гибкого перемещения внутри `.range`. Указываем размер и местоположение с помощью наших переменных созданных ранее, скругляем углы, добавляем фон и указываем `z-index: -1;`, чтобы трэк располагался под ползунком.

```css
.track {
  position: absolute;
  /* Положение в пространстве */
  top: var(--range-track-top);
  bottom: var(--range-track-bottom);
  left: var(--range-track-left);
  right: var(--range-track-right);
  /* Размер */
  width: var(--range-track-w);
  height: var(--range-track-h);
  border-radius: 10px;
  background-color: var(--clr-bg);
  z-index: -1;
}
```

Также указываем абсолютное позиционирование для прогресс-бара. Добавляем расположение, размер, скругление углов, фон и `z-index: -1;`, чтобы прогресс-бар располагался под ползунком.

```css
.progress {
  position: absolute;
  /* Положение в пространстве */
  top: var(--range-progress-top);
  bottom: var(--range-progress-bottom);
  left: var(--range-progress-left);
  right: var(--range-progress-right);
  /* Размер */
  width: var(--range-progress-w);
  height: var(--range-progress-h);
  border-radius: 10px;
  background-color: var(--clr-primary);
  z-index: -1;
}
```

Так как значение переменной `--value` это просто строка "80", то её нужно переводить в %. Для этого используются хитрость с умножением на 1% `calc(var(--value) * 1%)`.

Чтобы не использовать подобные ухищрения можно указать тип переменной через css правило `@property`.

ВОЗМОЖНО НУЖНО ПЕРЕПИСАТЬ НА НЕГО ДЕМКИ, но мне немного лень =P

```css
@property --value {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 80;
}
```

### Текущее значение

Для добавления текущего значение нужно немного изменить html структуру, добавив тэг `<output>` сразу после `<input>`.

```html
<div class="range" style="--value: 80;">
  <label class="range-label" for="tailmetr">Хвост-о-метр (cм)</label>
  <div class="track"></div>
  <div class="progress"></div>
  <div class="thumbs">
    <input class="range-input" id="tailmetr" type="range" min="0" max="100" value="20" step="1" />
    <!-- Текущее значение слайдера -->
    <output class="range-output" id="output" for="tailmetr">80</output>
  </div>
</div>
```

Дописываем в код функции обработки события `input`, изменение значения тэга `<output>`. Свойство `nextElementSibling` указывает на следующим элемент от текущего.

```javascript
function handleInputRange() {
  event.target.parentNode.parentNode.style.setProperty(
    "--value",
    event.target.value
  );
  // изменение значения тэга `<output>`
  event.target.nextElementSibling.value = event.target.value;
}
```

Добавляем переменные расположения и смещения для тэга `<output>` с текущим значением. Смещение нужно, чтобы число располагалось точно над ползунком, так как оно увеличивается с однозначного 0, до трёхзначных 100.

```css
.range {
  /* ... */
  .range-output {
    --range-output-top: 25px;
    --range-output-left: calc(var(--value) * 1%);
    --range-output-right: none;
    --range-output-offset-xy: calc(var(--value) * -1%), 0;
  }
  /* ... */
}
```

Стилизуем текущее значение. Располагаем его над ползунком, указываем размер, отступы, центрируем число в центре элемента, указываем шрифты, смещение, убираем возможность выделения.

```css
.range-output {
  position: absolute;
  top: var(--range-output-top);
  bottom: var(--range-output-bottom);
  left: var(--range-output-left);
  right: var(--range-output-right);
  width: var(--range-thumb-w);
  height: var(--range-thumb-h);
  min-width: fit-content;
  padding: 0 4px;
  display: grid;
  place-items: center;
  background: transparent;
  border-radius: 10px;
  font-size: 18px;
  text-align: end;
  transform: translate(var(--range-output-offset-xy));
  user-select: none;
  transition: 300ms;
}
```

Стилизуем, когда `<input>` находится в фокусе (`:focus-visible`) или с ховером (`:hover`).

```css
.range-input:hover + .range-output,
.range-input:focus-visible + .range-output {
  background-color: var(--clr-primary);
  transition: 0ms;
}
```

### Шкала значений

Шкалу значений нужно добавлять с помощью тэгов `<datalist>` и `<option>`. А также указать в тэге `<input>` атрибут `list="tickmarks"` c id тэга со списком значений, чтобы ползунок немного прилипал к этим значениям, когда пользователь доводит до них.

```html
<div class="range" style="--value: 80;">
  <label class="range-label" for="tailmetr">Хвост-о-метр (cм)</label>
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
    list="tickmarks"
  >
  <output class="range-output" id="output" for="tailmetr">80</output>
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

```css
.range {
  /* ... */
  #tickmarks {
    --tickmarks-w: calc(100% - 8px);
    --tickmarks-h: 30px;
    --tickmarks-p: 0 0 0 12px;
    --tickmarks-dir: row;
    --tickmarks-write-mode: horizontal-tb;
  }

  option {
    --option-p: 10px 0 0 0;
    --option-after-w: 3px;
    --option-after-h: 35px;
    --option-after-top: -33px;
    --option-after-left: 2px;
  }
  /* ... */
}
```

```css
#tickmarks {
  width: var(--tickmarks-w);
  height: var(--tickmarks-h);
  padding: var(--tickmarks-p);
  display: flex;
  flex-direction: var(--tickmarks-dir);
  justify-content: space-between;
  color: var(--clr-onPrimary);
  writing-mode: var(--tickmarks-write-mode);
}

option {
  position: relative;
  width: 10px;
  padding: var(--option-p);
  font-size: 14px;
}

option::after {
  content: "";
  display: initial;
  position: absolute;
  top: var(--option-after-top);
  left: var(--option-after-left);
  width: var(--option-after-w);
  height: var(--option-after-h);
  margin: 0 auto;
  background: var(--clr-ticks);
  z-index: -1;
}
```

### Вертикальный и горизонтальный input range

<iframe title="Пример input range" src="demos/input-range-6/" height="400"></iframe>

Дорабатываем наш HTML, добавляя атрибуты `dir="ltr"` и `aria-orientation="horizontal"`.
Повернуть input range вертикально можно двумя способами. Однако в обоих вариантах обязательно нужно указать атрибут `aria-orientation: vertical`.

```html
<div class="range" style="--value: 80;">
  <label class="range-label" for="tailmetr">Хвост-о-метр (cм)</label>
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
    dir="ltr"
    aria-orientation="horizontal"
    list="tickmarks"
  >
  <output class="range-output" id="output" for="tailmetr">80</output>
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

#### [`write-mode`](/css/write-mode/)

```css
/* Вариант справо налево (0 справа, 100 слева) */
.range:has(input[aria-orientation="horizontal"][dir="rtl"]) {
  .progress {
    --range-progress-left: none;
    --range-progress-right: min(
      calc(var(--value-1) * 1%),
      calc(var(--value-2) * 1%)
    );
  }

  .range-output {
    --range-output-left: none;
    --range-output-right: calc(var(--value) * 1%);
    --range-output-offset-xy: calc(var(--value) * 1%), 0;
  }

  #tickmarks {
    --tickmarks-dir: row-reverse;
    --tickmarks-write-mode: horizontal-tb;
  }
}
```

```css
/* Вариант сверху вниз (100 внизу, 0 вверху) */
.range:has(input[aria-orientation="vertical"][dir="ltr"]) {
  --range-w: 30px;
  --range-h: 100%;

  --range-input-write-m: vertical-lr;
  --range-label-rotate: 180deg;

  --range-track-w: 8px;
  --range-track-h: 100%;
  --range-track-top: 0;
  --range-track-bottom: none;
  --range-track-left: 71px;

  --range-progress-w: 8px;
  --range-progress-h: calc(var(--value) * 1%);
  --range-progress-top: 0;
  --range-progress-bottom: none;
  --range-progress-left: 71px;

  --range-output-top: calc(var(--value) * -1% + 90%);
  --range-output-left: 28px;
  --range-output-offset-xy: 0, calc(var(--value) * -1%);

  --tickmarks-w: 30px;
  --tickmarks-h: calc(100% - 5px);
  --tickmarks-dir: column;
  --tickmarks-write-mode: horizontal-tb;

  --option-after-w: 35px;
  --option-after-h: 3px;
  --option-after-top: 15px;
  --option-after-left: -37px;

  writing-mode: vertical-lr;
}
```

```css
/* Вариант снизу вверх (0 внизу, 100 вверху) */
.range:has(input[aria-orientation="vertical"][dir="rtl"]) {
  --range-w: 30px;
  --range-h: 100%;

  --range-input-write-m: vertical-lr;
  --range-label-rotate: 180deg;

  --range-track-w: 8px;
  --range-track-h: 100%;
  --range-track-top: none;
  --range-track-bottom: 0;
  --range-track-left: 71px;

  --range-progress-w: 8px;
  --range-progress-h: calc(var(--value) * 1%);
  --range-progress-top: none;
  --range-progress-bottom: 0;
  --range-progress-left: 71px;

  --range-output-top: calc(var(--value) * 1%);
  --range-output-left: 28px;
  --range-output-offset-xy: 0, calc(var(--value) * 1%);

  --tickmarks-w: 30px;
  --tickmarks-h: calc(100% - 5px);
  --tickmarks-dir: column-reverse;
  --tickmarks-write-mode: horizontal-tb;

  --option-after-w: 35px;
  --option-after-h: 3px;
  --option-after-top: 15px;
  --option-after-left: -37px;

  writing-mode: vertical-lr;
}
```

```css
.range-label {
  transform: rotate(var(--range-label-rotate));
}
```

```css
.range-output {
  writing-mode: horizontal-tb;
}
```

#### [`transform: rotate();`](/css/rotate)

Если значение aria-valuenow не удобно для пользователя, например, день недели представлен числом, для свойства aria-valuetext устанавливается строка, которая делает значение ползунка понятным, например, «Понедельник».

## Доступность

Проговорить в подробностях про все аспекты доступности.

## Сложные варианты input range

### Две ручки

Часто требуется сделать слайдер с двумя ползунками, чтобы указать диапазон чего-то. Например диапазон цен в фильтре поиска товаров.
За основу возьмем слайдер, реализованный ранее. Он уже кроссбраузерный, доступный, с текущем значение, шкалой и может находиться в разных положениях(вертикально и горизонтально). Однако нам нехватает второго ползунка.

```html
<!-- Инициализируем css переменные для обоих ползунков --value-1 и --value-2 -->
<div class="range" style="--value-1: 20; --value-2: 40;">
  <label class="range-label" for="tailmetr">Хвост-о-метр (cм)</label>
  <div class="track"></div>
  <!--   <div class="progress"></div> -->
  <div class="thumbs">
    <input
      class="range-input"
      id="tailmetr1"
      type="range"
      min="0"
      max="100"
      value="20"
      step="1"
      dir="rtl"
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
      >20</output
    >
    <!-- Второй ползунок -->
    <input
      class="range-input"
      id="tailmetr2"
      type="range"
      min="0"
      max="100"
      value="40"
      step="1"
      dir="rtl"
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
      >40</output
    >
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

Обратим внимание, что помимо добавления второго тэга `<input>`, также был добавлен тэг `<output>` для текущего значения второго элемента. А в обертку нашего слайдера добавлена инициализация сразу двух css переменных для обоих ползунков `--value-1` и `--value-2`. Также были изменены функции указанные в атрибуте `oninput`. Для каждого ползунка будет своя функция обработки `handleInputRange1()` и `handleInputRange2()`.

Напишем новые функции для обработки изменения значения ползунков.

```javascript
function handleInputRange1() {
  event.target.parentNode.parentNode.style.setProperty(
    "--value-1",
    event.target.value
  );
  event.target.nextElementSibling.value = event.target.value;
}

function handleInputRange2() {
  event.target.parentNode.parentNode.style.setProperty(
    "--value-2",
    event.target.value
  );
  event.target.nextElementSibling.value = event.target.value;
}
```

По сути это та же самая функция `handleInputRange()`, только в каждой из них изменяется свое значение `--value-1` и `--value-2`.

Также нужно добавить немного стилей, чтобы ползунки находились на одной дорожке

```css
.thumbs {
  display: grid;
}
```

```css
.range-input {
  grid-area: 1/1;
}
```

Изменяем положение и размер прогресс бара, чтобы он заполнял значение между левым и правым ползунками.

```css
.range {
  .progress {
    --range-progress-w: abs((var(--value-2) - var(--value-1)) * 1%);
    --range-progress-h: 8px;
    --range-progress-top: 75px;
    --range-progress-bottom: 0px;
    --range-progress-left: min(
      calc(var(--value-1) * 1%),
      calc(var(--value-2) * 1%)
    );
    --range-progress-right: none;
  }
}
```

Вычисляем размер прогресс бара вычитая правое значение из левого и взяв модуль от результата `abs((var(--value-2) - var(--value-1)) * 1%);`. Также вычисляем значение начального расположения прогресс бара. Для этого нам нужно взять минимальное значение из двух `и` (то, что ближе находиться к началу) `min(calc(var(--value-1) * 1%), calc(var(--value-2) * 1%));`.

#### Ограничение перемещения ползунков

Иногда требуется, чтобы ползунки не могли поменяться местами, а при пересечении они упирались друг в друга.
Напишим ограничители для ползунков.

```javascript
function handleInputRange1() {
  // Достает значение второго(правого) ползунка
  const value2 =
    event.target.parentNode.parentNode.style.getPropertyValue("--value-2");
  // Если значение текущего(левого) ползунка больше либо равно правому, то значение текущего(левого) ползунка приравнивается значению правого
  if (parseInt(event.target.value) >= parseInt(value2)) {
    console.log(event.target.value);
    event.target.value = value2;
  }
  // Если значение текущего(левого) ползунка равно 100(максимальному значению), то он должен находиться выше правого, чтобы пользователь мог изменить его значения, иначи ползунки будут блокировать друг друга. (css deadlock, почти как в потоках)))
  if (event.target.value === "100") {
    event.target.style.zIndex = "100";
  } else {
    event.target.style.zIndex = "0";
  }
  event.target.parentNode.parentNode.style.setProperty(
    "--value-1",
    event.target.value
  );
  event.target.nextElementSibling.value = event.target.value;
}

function handleInputRange2() {
  // Достает значение первого(левого) ползунка
  const value1 =
    event.target.parentNode.parentNode.style.getPropertyValue("--value-1");
  // Если значение текущего(правого) ползунка меньше либо равно левому, то значение текущего(правого) ползунка приравнивается значению левого
  if (parseInt(event.target.value) <= parseInt(value1)) {
    console.log(event.target.value);
    event.target.value = value1;
  }
  // Если значение текущего(правого) ползунка равно 0(минимальному значению), то он должен находиться выше левого, чтобы пользователь мог изменить его значения, иначе ползунки будут блокировать друг друга. (css deadlock, почти как в потоках)))
  if (event.target.value === "0") {
    event.target.style.zIndex = "100";
  } else {
    event.target.style.zIndex = "0";
  }
  event.target.parentNode.parentNode.style.setProperty(
    "--value-2",
    event.target.value
  );
  event.target.nextElementSibling.value = event.target.value;
}
```

### Много ползунков

Ещё одним частым случаем является реализации слайдера с разным количеством ползунков.

<iframe title="Слайдер с 4-мя ползунками" src="demos/input-range-four-thumbs/" height="200"></iframe>

Возьмем предыдущий вариант слайдера с двумя ползунками без ограничений по перемещению. Спрячем прогресс бар и добавим нужное количество ползунков. В нашем случае пусть будет 4.

```html
<div
  class="range"
  style="--value-1: 20; --value-2: 40; --value-3: 60; --value-4: 80;"
>
  <label class="range-label" for="tailmetr">Хвост-о-метр (cм)</label>
  <div class="track"></div>
  <!--   <div class="progress"></div> -->
  <div class="thumbs">
    <input
      class="range-input"
      id="tailmetr1"
      type="range"
      min="0"
      max="100"
      value="20"
      step="1"
      dir="rtl"
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
      >20</output
    >
    <input
      class="range-input"
      id="tailmetr2"
      type="range"
      min="0"
      max="100"
      value="40"
      step="1"
      dir="rtl"
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
      >40</output
    >
    <input
      class="range-input"
      id="tailmetr3"
      type="range"
      min="0"
      max="100"
      value="60"
      step="1"
      dir="rtl"
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
      >60</output
    >
    <input
      class="range-input"
      id="tailmetr4"
      type="range"
      min="0"
      max="100"
      value="80"
      step="1"
      dir="rtl"
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
      >80</output
    >
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

Для каждого ползунка добавим свою функцию обработки.

```javascript
function handleInputRange1() {
  event.target.parentNode.parentNode.style.setProperty(
    "--value-1",
    event.target.value
  );
  event.target.nextElementSibling.value = event.target.value;
}

function handleInputRange2() {
  event.target.parentNode.parentNode.style.setProperty(
    "--value-2",
    event.target.value
  );
  event.target.nextElementSibling.value = event.target.value;
}

function handleInputRange3() {
  event.target.parentNode.parentNode.style.setProperty(
    "--value-3",
    event.target.value
  );
  event.target.nextElementSibling.value = event.target.value;
}

function handleInputRange4() {
  event.target.parentNode.parentNode.style.setProperty(
    "--value-4",
    event.target.value
  );
  event.target.nextElementSibling.value = event.target.value;
}
```

### Заключение

В заключение, мы подробно рассмотрели процесс стилизации и кастомизации элемента `<input type="range">`. Мы прошли путь от базового нативного слайдера до сложных решений c несколькими ползунками, уделяя внимание кроссбраузерной совместимости и критически важным аспектам доступности.

Ключевые моменты, которые мы охватили:

1. Базовая стилизация ползунка, трека и прогресс-бара.
1. Добавление текущего значения и шкалы.
1. Реализация вертикальной ориентации слайдера.
1. Создание слайдера с двумя ползунками, включая логику ограничения их перемещения.
1. Расширение функционала до варианта разным количеством ползунков.

На протяжении всей статьи мы придерживались принципов доступности, следуя рекомендациям WCAG. Это включало правильное использование ARIA-атрибутов, обеспечение клавиатурной навигации и четкую визуальную обратную связь.
Важно отметить, что хотя мы достигли высокого уровня кастомизации, поддержание доступности и удобства использования должно оставаться приоритетом. При реализации сложных интерфейсов всегда следует учитывать баланс между эстетикой и функциональностью.

### Круглый input range
