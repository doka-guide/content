---
title: "`.length`"
description: "Свойство возвращает количество символов в строке."
baseline:
  - group: strings
    features:
      - javascript.builtins.String.length
authors:
  - nlopin
related:
  - js/arrays
  - js/if-else
  - js/objects-objects-everywhere
tags:
  - doka
---

## Кратко

Свойство `length` хранит длину [строки](/js/string/), которое обычно совпадает с количеством символов в ней. Если в строке есть _непростые_ символы, вроде эмодзи, они могут удлинять строку больше, чем на единицу.

Длина пустой строки равна 0.

## Пример

```js
const phrase = 'Съешь ещё этих мягких французских булок, да выпей же чаю'
console.log(phrase.length)
// 56

const empty = ''
console.log(empty.length)
// 0

const emoji = '👩‍💻'
console.log(emoji.length)
// 5 🤷‍♂️
```

## Как понять

Строки в JavaScript хранятся в виде последовательности символов в формате [UTF-16](https://en.wikipedia.org/wiki/UTF-16). UTF-16 использует понятие юнита — одного значения из таблицы UTF-16. Все символы мировых алфавитов представляются в виде одного юнита.

Редкие символы могут использовать несколько юнитов. Если вы решите использовать символы из древнеегипетской письменности, то каждый из них будет занимать два юнита:

```js
console.log('𓀿'.length)
// 2
```

Эмодзи состоят из нескольких юнитов. Количество использованных юнитов зависит от эмодзи:

```js
console.log('👩‍💻'.length)
// 5
console.log('😀'.length)
// 2
```

<aside>

🤓 В Интернете есть [подробная статья об устройстве эмодзи](https://habr.com/ru/company/itelma/blog/549366/).

</aside>
