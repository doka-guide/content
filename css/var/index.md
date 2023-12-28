---
title: "`var()`"
description: "Функция для использования кастомных свойств в CSS."
authors:
  - frontend-sensei
keywords:
  - кастомное свойство
related:
  - css/custom-properties
  - css/root
  - js/element-set-property
tags:
  - doka
---

## Кратко

CSS-функция `var()` позволяет подставлять [кастомные свойства](/css/custom-properties/) в качестве значения свойств.

## Пример

Объявляем кастомное свойство:

```css
:root {
  --color-cyan: #00ffff;
}
```

Используя функцию `var()` подставляем значение кастомного свойства:

```css
.button {
  background-color: var(--color-cyan);
}
```

## Как понять

Функция `var()` возвращает **текущее** значение кастомного свойства. Если оно поменяется, то функция `var()` сразу вернёт актуальное значение.

<details>
  <summary>Механизм работы <code>var()</code></summary>

Передав в функцию `var()` кастомное свойство, браузер двигается вверх по иерархии элементов в поисках значения кастомного свойства.

Он проверит, установлено ли кастомное свойство на текущем элементе:

- Если да, подставит вместо `var()` и остановит поиск.
- Если нет, переходит на родительский элемент и повторяет проверку.

Браузер будет подниматься вверх по родительским элементам до тех пор пока не найдёт значение. Последней точкой будет проверка наличия значения в [`:root`](/css/root/). Если его нет и там, то функция `var()` установит значение в `initial` или резервное значение если он передано.

</details>

Определим кастомное свойство:

```css
:root {
  --card-color: purple;
}
```

Зададим цвет фона карточке, используя функцию `var()`. Цвет будет _фиолетовый_:

```css
.card {
  background-color: var(--card-color);
}
```

Изменим кастомное свойство с помощью [`.setProperty()`](/js/element-set-property/) в JavaScript:

```js
document.documentElement.style.setProperty('--card-color', 'midnightblue')
```

Теперь там, где установлен цвет фона, функция `var()` вернёт _тёмно-синий_ цвет.

<iframe title="Подмена значения кастомного свойства" src="demos/substitution/" height="500"></iframe>

## Как пишется

### Базовый синтаксис

Функция `var()` принимает 2 аргумента:

1. Имя кастомного свойства.
1. Резервное значение (необязательный).

Если кастомное свойство, на которое ссылается первый аргумент, недопустимо, функция использует второе значение:

```css
.card {
  padding: var(--card-padding, 10px);
}
```

Значение [`padding`](/css/padding/) будет `10px`, если `--card-padding` не определено.

Можно указать несколько резервных значений. Для этого вторым аргументом нужно передать функцию `var()` с возможными значениями:

```css
.title {
  font-size: var(--font-size, var(--title-font-size, 20px));
}
```

Значение [`font-size`](/css/font-size/) будет `20px`, если `--font-size` и `--title-font-size` не определены.

### Резервное значение

Ещё один пример, но немного неочевидный. Если переменная `--font-size` не определена, то резервное значение будет: `--title-font-size, 20px`. К сожалению, оно не валидно:

```css
.title {
  font-size: var(--font-size, --title-font-size, 20px);
}
```

Дело в том, что всё, что находится после первой запятой, воспринимается как _единое значение_. То есть в качестве резервного значения функция вернёт **значение от первой запятой до закрывающей скобки**.

А такой пример валидный. Резервное значение будет: `10px, 10px`:

```css
.navigation {
  --translate: var(--my-translate, 10px, 10px);
  transform: translate(var(--translate));
}
```

<details>
  <summary>О валидности значений</summary>

```css
:root {
  --text-color: 16px;
}

.element {
  color: var(--text-color);
}
```

В этом примере кастомное свойство `--text-color` имеет значение `16px`, что технически является валидным. Но, когда браузер подставляет значение `--text-color` вместо `var(--text-color)`, он пытается использовать значение `16px`, которое не является допустимым значением для свойства [`color`](/css/color/).

Браузер рассматривает его как недопустимое значение и проверяет, наследуется ли свойство `color` от родительского элемента. Если да, он его использует. В противном случае устанавливает значение `initial`.

</details>

### Возможности

Функцию `var()` можно подставить как часть значения свойства:

```css
.card {
  --border-color: black;
  border: 1px solid var(--border-color);
}
```

Функция `var()` также работает с сокращёнными свойствами: [`margin`](/css/margin/), `padding`, [`border`](/css/border/), [`background`](/css/background/), [`transform`](/css/transform/), [`transition`](/css/transition/) и т. д.

Можно использовать для подставки как одного значения:

```css
.element {
  --margin-top: 10px;
  margin: var(--margin-top) 10px 20px 30px;
}
```

Так и для нескольких:

```css
.element {
  --margin-top-right: 10px 10px;
  margin: var(--margin-top-right) 10px 50px;
}
```

### Ограничения

Функция `var()` **не может** использоваться в качестве имён свойств, селекторов или чего-либо ещё, кроме _значений свойств_.

Например, следующий код неправильно использует кастомное свойство в качестве имени свойства:

```css
.element {
  --side: margin-top;
  var(--side): 20px;
}
```

Вы **не можете** объединять кастомное свойство и любое другое значение таким образом:

```css
.element {
  --gap: 20;
  margin-top: var(--gap)px;
}
```

Вместо этого вы можете использовать такой приём:

```css
.element {
  --gap: 20;
  margin-top: calc(var(--gap) * 1px);
}
```

Либо записать полное значение в кастомное свойство:

```css
.element {
  --gap: 20px;
  margin-top: var(--gap);
}
```

### Внутри других функций

Также работает с такими функциями:

[`calc()`](/css/calc/)

```css
.element-1 {
  --offset: 50px;
  height: calc(100vh - var(--offset));
}

.element-2 {
  --height: 100vh - 50px;
  height: calc(var(--height));
}
```

`rgb()` и `rgba()`

```css
.element-1 {
  --rgb: 0, 0, 0;
  color: rgba(var(--rgb), 1);
}

.element-2 {
  --rgb: 0 0 0;
  color: rgb(var(--rgb));
}

.element-3 {
  --red: 0;
  --green: 0;
  --blue: 0;
  color: rgb(var(--red), var(--green), var(--blue));
}
```

[`linear-gradient()`](/css/linear-gradient/) и [`radial-gradient()`](/css/radial-gradient/)

```css
:root {
  --c1: red;
  --c2: blue;
  --grad: linear-gradient(var(--c1), var(--c2));
}

.element {
  --c1: green;
  background: var(--grad);
}
```

[`url()`](/css/url/)

```css
:root {
  --url: url("https://example.com/example.jpg");
}

.element {
  background: var(--url);
}
```

Но такой пример работать не будет, так как функция `url()` воспринимает конструкцию `var(--url)` как URL:

```css
:root {
  --url: "https://example.com/example.jpg";
}

.element {
  background: url(var(--url));
}
```
