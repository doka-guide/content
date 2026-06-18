---
title: "`@property`"
description: "Современная строгая типизация переменных CSS"
authors:
  - drakesbot12
keywords:
  - CSS custom properties
  - CSS variables
  - типизация CSS переменных
related:
  - css/transition
  - css/animation
  - css/keyframes
tags:
  - doka
---

## Кратко

`@property` — это `CSS` директива, которая позволяет строго типизировать зарегистрированную `CSS`-переменную.

С его помощью можно задать:
- какой тип значений принимает переменная;
- начальное значение;
- будет ли она наследоваться.

Это делает `CSS`-переменные предсказуемыми и даёт возможность анимировать их напрямую.

## Пример

```html
<div class="conic-effect"></div>
```

```css
@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.conic-effect {
  --color: #2E9AFF;
  height: 200px;
  width: 200px;
  border-radius: 50%;

  background: conic-gradient(
    var(--color) var(--angle),
    transparent 0
  );

  animation: conic-effect 2s ease-in-out infinite alternate;
}

@keyframes conic-effect {
  0% { --angle: 0deg; }
  100% { --angle: 360deg; }
}
```

<iframe title="Анимация с использованием @property" src="demos/basic/" height="300"></iframe>

## Как понять

Обычные `CSS`-переменные (`--var`) — это просто строки.

Без `@property`:
- `CSS` переменные = строки
- браузер не знает тип
- анимация работает плохо или не работает

С `@property`:
- переменная становится типизированной
- браузер понимает, как интерполировать значения
- можно анимировать напрямую `CSS`-переменные

## Как пишется

```css
@property --name {
  syntax: "<type>";
  inherits: true | false;
  initial-value: value;
}
```

Имя переменной всегда начинается с `--`.

## Дескрипторы

### `syntax`

Определяет, какие значения разрешены для переменной.

Это **строка**, внутри которой описывается тип данных.

### Основные типы:

#### Примитивные типы

- `<color>` — любой `CSS`-цвет: `red`, `#fff`, `rgb(0 0 0)`
- `<length>` — длина: `px`, `em`, `rem`, `vh`
- `<percentage>` — проценты: `50%`, `100%`
- `<number>` — число без единиц измерения: `1`, `0.5`, `10`
- `<angle>` — угол: `45deg`, `1turn`, `0.5rad`

#### Комбинации типов

Можно задавать несколько вариантов:

```css
@property --size {
  syntax: "<length> | <percentage>";
  inherits: false;
  initial-value: 100px;
}
```

→ разрешены либо длины (к примеру, `5px`), либо проценты (к примеру, `5%`).

#### Списки значений

- `+` — список значений через пробел

```css
@property --colors {
  syntax: "<color>+";
  inherits: false;
  initial-value: red blue green;
}
```

- `#` — список значений через запятую

```css
@property --palette {
  syntax: "<color>#";
  inherits: false;
  initial-value: red, blue, green;
}
```

#### Любые значения

```css
@property --anything {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
```

→ разрешает любое значение
(но тогда типизация фактически отключается)

### `inherits`

Определяет, наследуется ли значение переменной:
- `true` → значение передаётся от родителя к потомку
- `false` → каждый элемент имеет своё независимое значение

#### Пример наследования

```css
@property --theme-color {
  syntax: "<color>";
  inherits: true;
  initial-value: black;
}

body {
  --theme-color: blue;
}

p {
  color: var(--theme-color); /* blue */
}
```

Если бы было `inherits: false`, `p` не получил бы значение от `body` и был бы равен значению по умолчанию (`initial-value`).

### `initial-value`

Значение по умолчанию, которое используется если переменная не задана.

```css
@property --gap {
  syntax: "<length>";
  inherits: false;
  initial-value: 10px;
}
```

<aside>

⚠️ Важно:
- `initial-value` обязателен, если `syntax` не равен `"*"`;
- оно должно быть **независимым вычислительно**.

</aside>

#### Что значит "вычислительно независимое"

Допустимо:

```css
initial-value: 10px;
```

```css
initial-value: 45deg;
```

Но недопустимо:

```css
initial-value: 3em; /* зависит от font-size родителя! */
```

## Подсказки

💡 Если переменная должна анимироваться — почти всегда стоит использовать `@property`.
💡 Если не указать `initial-value`, правило может стать невалидным.
💡 Особенно полезно для:
- градиентов;
- прогресс-баров;
- темизации;
- UI-анимаций без `JavaScript`.
