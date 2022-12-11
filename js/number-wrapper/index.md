---
title: "Обёртка `Number`"
description: "Обёртка примитивного типа «число», которая предоставляет дополнительные методы работы с числами."
authors:
  - nlopin
keywords:
  - обёртка числа
  - округлить число
related:
  - js/typecasting
  - js/string
  - js/function
tags:
  - doka
---

## Кратко

`Number` — это обёртка над [примитивным числовым типом](/js/number/), которая содержит дополнительные значения и методы работы с числами:

- проверки на специальные значения [`isNaN()`](/js/number-is-nan/), [`isFinite()`](/js/number-isfinite/).
- конвертирование в строку [`toString()`](/js/number-tostring/) и `toLocaleString()`.

Числа автоматически оборачиваются в обёртку `Number` при вызове методов над ними.

## Как пишется

Обернуть числа в `Number` можно вручную, вызвав конструктор `new Number()`:

```js
const primitive = 50
const num = new Number(100)
```

В этом случае переменные `primitive` и `num` будут разных типов:

```js
console.log(typeof primitive)
// number
console.log(typeof num)
// object

console.log(num == 100)
// true, при приведении к числовому типу значения будут одинаковыми
console.log(num === 100)
// false, потому что разные типы данных
```

Можно вызывать методы на примитиве, JavaScript автоматически обернёт его в обёртку:

```js
const primitive = 5.001
console.log(primitive.toFixed(1))
// '5.0'

console.log(6.04.toFixed(1))
// '6.0'
```

Если необходимо вызвать методы на целом числе, то нужно либо обернуть число в скобки, либо поставить точку дважды:

```js
console.log((5).toFixed(3))
// '5.000'

console.log(6..toFixed(3))
// '6.000'

```

## Как понять

Обычно в JavaScript работают с [примитивным числовым типом](/js/number/). Например, `const num = 58`.

Обёртка содержит дополнительные функции и методы для работы с числами. Они не входят в стандарт типа данных «число» и поэтому выделены в отдельный модуль.

Обёртка используется автоматически и не требует дополнительной работы от программиста. JavaScript сам оборачивает число, когда программист вызывает метод, который находится в обёртке.

### Проверки на специальные значения

Тип данных «число» содержит [три специальных значения](/js/number/#specialnye-znacheniya): `NaN`, `Infinity` и `-Infinity`.

Обёртка предоставляет две полезные функции для проверки специальных значений:

1️⃣ Функция [`Number.isNaN()`](/js/number-is-nan/) — нативный способ проверить значение на `NaN`, потому что `NaN` не равен ничему, даже самому себе:

```js
const nanResult = 5 * undefined
console.log(nanResult == NaN)
// false
console.log(nanResult === NaN)
// false

console.log(Number.isNaN(nanResult))
// true
```

2️⃣ Функция [`Number.isFinite()`](/js/number-isfinite/) — проверит, что значение не является специальным. Возвращает `true` — если при вызове в неё было передано число и `false` — если специальное значение или нечисловой тип:

```js
const number = 4
const nan = NaN
const inf = Infinity
const string = 'hello'

console.log(Number.isFinite(number))
// true
console.log(Number.isFinite(nan))
// false
console.log(Number.isFinite(inf))
// false
console.log(Number.isFinite(string))
// false

```

### Форматирование числа

Обёртка содержит несколько методов для форматирования числа:

1️⃣ Метод [`toString()`](/js/number-tostring/) преобразует число в строку в указанной системе счисления. По умолчанию используется десятичная, но можно использовать и другую:

```js
const num = 5

console.log(num.toString())
// '5'
console.log(num.toString(2))
// '101' в двоичной системе счисления
```

2️⃣ Метод `toFixed()` преобразует число в строку с указанным количеством знаков после запятой. Если необходимо, число округляется:

```js
const num = 10.468
console.log(num.toFixed(4))
// '10.4680'
console.log(num.toFixed(3))
// '10.468'
console.log(num.toFixed(2))
// '10.47'
console.log(num.toFixed(1))
// '10.5'
console.log(num.toFixed(0))
// '10'
```

<aside>

☝️ `toFixed()` возвращает строку, а не число. Если после округления нужно производить другие арифметические операции, то лучше распарсить число с помощью [`parseFloat()`](/js/parsefloat/).

</aside>

Если нужно округлять до целого, то ноль при вызове можно не передавать:

```js
const num = 10.468
console.log(num.toFixed())
// '10'
```

3️⃣ Метод `toLocaleString()` преобразует число в строку, учитывая локаль пользователя.

Локаль — это информация о языке пользователя, а также региональных настройках: какие символы чисел используются, какие разделители между разрядами считаются стандартными и так далее.

Локаль представляет собой [строку сформированную по спецификации](https://datatracker.ietf.org/doc/html/rfc5646). Чаще всего используются два вида:

- `код_языка`. Например, `'ru'` (русский язык), `'de'` (немецкий), `'en'` (английский).
- `код_языка-код_региона`. Например, `de-AT` (австрийский немецкий), `'en-US'` (американский английский), `es-AR` (аргентинский испанский).

По умолчанию используется локаль браузера, но первым аргументов можно передать любую.

```js
const bigNumber = 100_000_000

console.log(bigNumber.toLocaleString("ru")) // 100 000 000
console.log(bigNumber.toLocaleString("en-US")) // 100,000,000
console.log(bigNumber.toLocaleString("ar-SA")) // ١٠٠٬٠٠٠٬٠٠٠
```

<iframe title="Number - метод toLocaleString" src="demos/number-format/" height="150"></iframe>

Вторым аргументом в метод можно передать объект с тонкими настройками форматирования. Например, указать, что форматируемое число — деньги:

```js
const bigNumber = 100_000_000
console.log(bigNumber.toLocaleString('es', { style: 'currency', currency: 'EUR' }))
// 100.000.000,00 €

console.log(bigNumber.toLocaleString('ru', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }))
// 100 000 000 ₽
```

### Константы

Обёртка хранит несколько полезных констант:

- `Number.MAX_SAFE_INTEGER` — максимально возможное целое значение числового типа, 2<sup>53</sup>-1;
- `Number.MIN_SAFE_INTEGER` — минимально возможное целое значение числового типа, -2<sup>53</sup>-1;
- `Number.MAX_VALUE` — максимально большое число, представимое с помощью числового типа;
- `Number.MIN_VALUE` — минимальное _положительное_ число, представимое с помощью числового типа.

Важно отметить, что `Number.MAX_VALUE` много больше, чем `Number.MAX_SAFE_INTEGER`, из-за особенностей хранения чисел с плавающей точкой.
