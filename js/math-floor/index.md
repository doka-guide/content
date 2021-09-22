---
title: "`Math.floor()`"
authors:
  - nlopin
tags:
  - doka
---

## Кратко

Объект `Math` содержит набор методов, который используется для округления чисел:

- `round` — округление по обычным правилам;
- `floor` — округление вниз;
- `ceil` — округление вверх;

## Как пишется

```js
let num = 15.52
// Обычное округление
console.log(Math.round(num)) // 16
// Округление до ближайшего целого в большую сторону
console.log(Math.ceil(num)) // 16
// Округление до ближайшего целого в меньшую сторону
console.log(Math.floor(num)) // 15
```

<iframe title="Название — Math.floor() — Дока" src="demos/Lopinopulos-RzNGZQ/" height="150"></iframe>
