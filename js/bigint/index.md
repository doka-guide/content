---
title: "Большое целое"
description: "В математике числа бесконечны, а в программировании — нет. Если число не влезает в стандартный `number`, то есть его старший брат."
baseline:
  - group: bigint
    features:
      - javascript.builtins.BigInt
authors:
  - ra1nbow1
contributors:
  - solarrust
related:
  - js/number
  - js/typecasting
  - tools/json
tags:
  - doka
---

## Кратко

Тип большого целого `BigInt` — примитивный тип для целых чисел произвольной величины. Чаще всего его берут для чисел больше 2<sup>53</sup>−1 или меньше −(2<sup>53</sup>−1): не каждое такое число [тип `number`](/js/number/) может хранить точно.

Его используют для 64-битных идентификаторов, больших счётчиков и других данных, где нужна точность.

## Пример

Обычное число `number` теряет точность после 2<sup>53</sup>−1, а `BigInt` — нет:

```js
console.log(9007199254740993)
// 9007199254740992

console.log(9007199254740993n)
// 9007199254740993n
```

## Как пишется

Создать `BigInt` можно двумя способами.

1️⃣ Добавить суффикс `n` в конец записи числа:

```js
const biggy = 9997000254740991n
```

2️⃣ Вызвать функцию `BigInt()`. Большое число передавайте строкой: число больше 2<sup>53</sup>−1 может потерять точность ещё при разборе кода, до того как попадёт в `BigInt()`.

```js
const alsoBig = BigInt('9997000254999999')
// 9997000254999999n

const broken = BigInt(9997000254999999)
// 9997000255000000n
```

Оператор `new` не нужен: `new BigInt()` приведёт к [ошибке `TypeError`](/js/errors/). Дробное число `BigInt()` тоже не примет и выбросит `RangeError`: `BigInt(1.5)` не округляется до `1n`.

С `BigInt` работают обычные операторы: `+`, `-`, `*`, `%`, `**`. Деление `/` тоже работает, но отбрасывает дробную часть:

```js
const seven = 7n
const five = 5n

console.log(seven / five)
// 1n
```

### Преобразование типов

В арифметических операциях нельзя смешивать `BigInt` и обычные числа `number`: это приведёт к ошибке.

```js
const biggy = 10n
const number = 5

console.log(biggy + number)
// Uncaught TypeError: Cannot mix BigInt and other types,
// use explicit conversions
```

Чтобы сложить `BigInt` с обычным числом, [преобразуйте](/js/typecasting/) одно из них к типу другого:

```js
const biggy = 10n
const number = 5

console.log(biggy + BigInt(number))
// 15n

console.log(Number(biggy) + number)
// 15
```

При преобразовании в `number` большое значение может потерять точность. Преобразуйте, только если число по модулю не больше 2<sup>53</sup>−1.

Сравнивать `BigInt` с обычными числами `number` можно и без преобразования. Нестрогое равенство сравнивает значения, а строгое учитывает тип:

```js
console.log(2n > 1)
// true

console.log(1n == 1)
// true

console.log(1n === 1)
// false
```

### Ограничения

**Не работает с `Math`**. Методы объекта [`Math`](/js/math/), например `Math.max()`, не принимают `BigInt` и выбрасывают ошибку `TypeError`.

**Нет унарного плюса и `>>>`**. `BigInt` не поддерживает [унарный плюс](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus) и [сдвиг вправо без знака `>>>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift). Знаковый сдвиг `>>` работает.

### Передача в JSON

`JSON.stringify()` не умеет превращать `BigInt` в [JSON](/tools/json/) и выбрасывает ошибку `TypeError`. Перед отправкой на сервер превратите такое число в строку. Это сделает функция во втором аргументе `JSON.stringify()`:

```js
const data = { id: 9007199254740993n }

const json = JSON.stringify(data, (key, value) => {
  return typeof value === 'bigint' ? String(value) : value
})

console.log(json)
// {"id":"9007199254740993"}
```

Обратный путь опаснее: ошибки нет, но точность теряется. `JSON.parse()` превращает большое число в `number` ещё при разборе:

```js
const data = JSON.parse('{"id":9007199254740993}')

console.log(data.id)
// 9007199254740992
```

Поэтому просите сервер присылать такие числа строкой. Обратно в `BigInt` строку превратит функция `BigInt()`.

## Подсказки

💡 Продолжайте использовать тип `number` для стандартных вычислений с небольшими числами. Этот тип занимает меньше памяти, и операции с ним быстрее.

💡 Строку из формы или API проверяйте заранее: `BigInt('')` молча вернёт `0n`, а `BigInt('12abc')` выбросит `SyntaxError`.

💡 Не используйте `BigInt` для криптографии. Операции с ним идут разное время в зависимости от значения, и по этому времени можно узнать что-то о секретном ключе. Для шифрования берите Web Crypto API (`crypto.subtle`).
