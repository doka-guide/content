---
title: "`Math.floor()`, `Math.round()`, `Math.ceil()` и `Math.trunc()`"
description: "Округляем разными способами."
authors:
  - nlopin
related:
  - js/number
  - js/arrays
  - js/object
tags:
  - doka
---

## Кратко

Объект `Math` содержит набор методов, который используется для округления чисел:

- `round()` — округление по обычным правилам;
- `floor()` — округление вниз;
- `ceil()` — округление вверх;
- `trunc()` — отбрасывание дробной части, не обращая внимания на знак аргумента.

## Как пишется

Для обычного округления используйте `Math.round()`:

```js
console.log(Math.round(15.52))
// 16

console.log(Math.round(15.3))
// 15
```

Округление до ближайшего целого в большую сторону — `Math.ceil()`:

```js
console.log(Math.ceil(15.52))
// 16

console.log(Math.ceil(15.3))
// 16
```

Округление до ближайшего целого в меньшую сторону — `Math.floor()`:

```js
console.log(Math.floor(15.52))
// 15

console.log(Math.floor(15.3))
// 15
```

Используйте осторожно при работе с отрицательными числами:

```js
console.log(Math.floor(-15.3))
// -16
```

Так происходит, потому что `-16` меньше, чем `-15`, а округление происходит в меньшую сторону.

Отбрасывание дробной части — `Math.trunc()`:

```js
console.log(Math.trunc(15.52))
// 15

console.log(Math.trunc(-15.3))
// -15

console.log(Math.trunc(0.123))
// 0

console.log(Math.trunc(-0.123))
// -0
```

<iframe title="Округление" src="demos/Lopinopulos-RzNGZQ/" height="150"></iframe>
