---
title: "Стилизация элемента input range"
description: "Стилизация элемента input range, особенности реализации двойных ползунков, вопросы кроссбраузерной совместимости и критически важные аспекты доступности согласно рекомендациям WCAG."
authors:
  - lonlylokly
keywords:
  - слайдер
related:
  -
tags:
  - article
---

## Задача

Элемент input типа "range" представляет собой интерактивный компонент пользовательского интерфейса, позволяющий выбирать числовые значение из заданного диапазона. Стандартный вид этого элемента, предоставляемый браузерами, часто не соответствует дизайну и функционалу веб-приложений, что создает необходимость в его кастомизации. В данной статье мы проведем всесторонний анализ методов стилизации input range, рассмотрим особенности работы с несколькими ползунками, обсудим вопросы кроссбраузерной совместимости и уделим особое внимание аспектам доступности согласно рекомендациям WCAG.

## Краткий обзор input range

"Демка, где подписаны элементы input range"
"Демка со всеми примерами input range в статье"

## Простой вариант input range

### Добавляем обычный инпун в html и показываем все его атрибуты

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
    aria-valuemin="0"
    aria-valuemax="100"
    aria-orientation="horizontal"
  />
</div>
```

```css
.range {
  display: grid;
  gap: 10px;
}
```

```css
.range-input {
  accent-color: #c56fff;
}
```

Прописать атрибуты доступности: aria-valuemin, aria-valuemax, aria-labeledby, aria-label, aria-orientation.
Элемент, служащий фокусируемым ползунком, имеет роль слайдера .

### Ползунок

<iframe title="Пример input range" src="demos/input-range-2/" height="180"></iframe>

```css
.range-input {
  appearance: none;
}
```

```css
.range-input::-webkit-slider-thumb,
.range-input::-moz-range-thumb {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 0 5px inset #c56fff;
  transition: 300ms;
}

.range-input:hover::-webkit-slider-thumb,
.range-input:hover::-moz-range-thumb,
.range-input:focus-visible::-webkit-slider-thumb,
.range-input:focus-visible::-moz-range-thumb {
  box-shadow: 0 0 0 10px inset #c56fff;
  transition: 300ms;
}

.range-input:active::-webkit-slider-thumb,
.range-input:active::-moz-range-thumb {
  box-shadow: 0 0 0 30px inset #c56fff;
  transition: 300ms;
}

.range-input:disabled::-webkit-slider-thumb,
.range-input:disabled::-moz-range-thumb {
  box-shadow: 0 0 0 30px inset gray;
}
```

### Трэк

<iframe title="Пример input range" src="demos/input-range-3/" height="180"></iframe>

```css
.range-input {
  appearance: none;
  background: none;
}
```

```css
.range-input::-webkit-slider-runnable-track,
.range-input::-moz-range-track {
  height: 8px;
  background-color: #ababab;
  border-radius: 10px;
}
```

### Прогресс бар

<iframe title="Пример input range" src="demos/input-range-4/" height="180"></iframe>

К сожалению в современных браузерах нет кроссбраузерной поддержки стилизации прогресс бара. В Firefox есть псевдоэлемент с префиксом `-moz-range-progress`.

```css
.range-input::-moz-range-progress {
  height: 8px;
  border-radius: 10px;
  background-color: #c56fff;
}
```

В Webkit и Chrome пока нет поддержки стилизации. Для стилизации в них можно воспользоваться css-трюком.

```css
.range-input::-webkit-slider-thumb {
  border-image: linear-gradient(90deg, #c56fff 50%, #ababab 0) 0 1 / calc(
      50% - 8px / 2
    )
    100vw/0 100vw;
}

.range-input {
  overflow: hidden;
}
```

Если использовать такой вариант стилизации, то можно сталкнуться с ограничениями и проблемами. Как пример нет возможности скруглить края.

#### Кроссбраузерный вариант

Для удобной кроссбраузерной и читабельной версти используем отдельный `<div>` для трэка и прогресс бара. А также css переменную для изменения заполненности прогресс бара с помощью javascript.

<iframe title="Пример input range" src="demos/input-range-4/" height="180"></iframe>

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
    aria-valuemin="0"
    aria-valuemax="100"
    aria-orientation="horizontal"
    oninput="handleInputRange()"
  />
</div>
```

Отдельно стоит обратить внимание на атрибут `style="--value: 80;"`. Это инициализация css переменной.

```html
<div class="range" style="--value: 80;"></div>
```

А также атрибут `oninput="handleInputRange()"`. Здесь указывается слушатель события "oninput", то есть событие изменения значения input. И на каждое изменение будет вызываться функция "onInputRange()"

```html
<input ... oninput="handleInputRange()" />
```

Это код функции обработки события. Так как мы указываем её в атрибуте события `oninput` html тэга `input`, то в ней мы можем обращаться к объекту event (событие). Если описать подробнее, то мы обращаемся к объекту события (`event`), которое вызвало эту функцию. В событии мы обращаемся к свойству `target` (тэгу `input`), в котором произошло событие. Потом обращаемся к родительскому элементу (`parentNode`) в нашем случае это `<div class="range" style="--value: 80;">"`. И уже в нем мы меняем значение css переменной `--value` на новое, которое выставил пользователь (`event.target.value`).

```javascript
function handleInputRange() {
  event.target.parentNode.style.setProperty("--value", event.target.value);
}
```

```css
.track {
  position: absolute;
  top: 45px;
  width: 100%;
  height: 8px;
  border-radius: 10px;
  background-color: #ababab;
  z-index: -1;
}
```

```css
.progress {
  position: absolute;
  top: 45px;
  width: calc(var(--value) * 1%);
  height: 8px;
  border-radius: 10px;
  background-color: #c56fff;
  z-index: -1;
}
```

### Текущее значение

### Шкала значений

### Вертикальный input range

aria-orientation: vertical,

#### [`write-mode`](/css/write-mode/)

#### [`rotate`](/css/rotate)

aria-valuenow, Если значение aria-valuenowне удобно для пользователя, например, день недели представлен числом, для свойства aria-valuetext устанавливается строка, которая делает значение ползунка понятным, например, «Понедельник».

## Доступность

Проговорить в подробностях про все аспекты доступности повторно

## Сложные варианты input range

### Один ползунок

### Два ползунка

### Много ползунков

### Круглый input range
