---
title: "`Math.floor()`, `Math.round()` и `Math.ceil()`"
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
- `ceil()` — округление вверх.

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

<iframe title="Название — Math.floor() — Дока" src="demos/Lopinopulos-RzNGZQ/" height="150"></iframe>
