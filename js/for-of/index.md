---
title: "`for`...`of`"
description: "Обходим перечисляемые свойства объекта."
authors:
  - doka-dog
related:
  - js/object
  - js/objects-objects-everywhere
  - js/for-in
tags:
  - doka
  - placeholder
---

## Кратко

Оператор `for (переменная) of (сущность)` позволяет пройти в [цикле](/js/loop/) по свойствам сущности. Оператор работает только с итерируемыми сущностями. В начале цикла оператор достаёт из сущности [итератор](https://doka.guide/js/iterator/). Каждая итерация цикла – это вызов метода `.next()` итератора.

## Пример

Обход массива:

```js
let iterable = [10, 20, 30]

for (let value of iterable) {
  value += 1
  console.log(value)
}
// 11
// 21
// 31
```

## Как пишется

Для объявления переменной внутри `for...of` можно использовать `const`, `let` или `var`.

Если обходите с помощью `for...of` [генераторы](https://doka.guide/js/generators/), их нельзя использовать дважды, даже если цикл завершился через оператор `break`, `throw` или `return`.
