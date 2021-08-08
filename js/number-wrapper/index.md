---
title: "Number"
authors:
  - nlopin
keywords:
  - число
  - обёртка числа
  - округлить число
  - isnan
  - isfinite
tags:
  - doka
---

## Кратко

Обычно в JavaScript работают с примитивным числовым типом. Например, так `let n = 58*4;`.

`Number` — обёртка над стандартным числовым типом. Её используют нечасто, но есть несколько функций, которые могут быть полезны.

## Как пишется

```js
let primitive = 50 // простое примитивное число
let num = new Number(100) // обёртка с доп.функциями

console.log(num == 100) // напечатает true, потому что при приведении к числовому типу значения будут одинаковыми
console.log(num === 100) // напечатает false, потому что разный тип данных (обёртка vs примитив)
```

## Как это понять

Числа в JavaScript реализованы по стандарту IEEE 754. Этот стандарт определяет к числам не только числовые, но и специальные значения:

- `Infinity` — бесконечность, больше любого числа;
- `-Inifinty` — минус бесконечность, меньше любого числа;
- `NaN` — Not a Number, то есть «не число». Значение, которое возвращается при неопределённом результате вычисления (например, при делении 0 на 0). Фишка `NaN` в том, что он не равен самому себе: `NaN == NaN` всегда вернёт `false`. Для проверки на `NaN` существует отдельная функция.

Так работают как примитивный тип, так и обёртка. Обёртка лишь содержит дополнительные функции для работы с числами.

### 💡 Проверка значения на `NaN`

Мы выяснили `NaN`, что не равен самому себе: `NaN == NaN` всегда вернёт `false`. Как тогда проверить, что в переменной лежит `NaN`?

Запомни две полезные проверки, которые работают как обычные функции — `Number.isNaN` и `Number.isFinite`.

`Number.isNaN` проверяет, является ли переданный аргумент `NaN`. Возвращает `true` или `false`:

```js
let goodNum = 50
let badNum = NaN
let infinity = Infinity

console.log(NaN === NaN) // это сравнение всегда false

console.log(Number.isNaN(goodNum)) // false
console.log(Number.isNaN(badNum)) // true <--- тут NaN!
console.log(Number.isNaN(infinity)) // false

console.log(Number.isNaN("NaN")) // false, потому что передали строку
```

`Number.isFinite` — более широкая проверка. Она проверяет, что переданный аргумент — конечное число. Вернёт `true` если передали число и `false`, если передали `NaN`, `Infinity` или нечисловой тип:

```js
let goodNum = 50
let badNum = NaN
let infinity = Infinity

console.log(Number.isFinite(goodNum)) // true
console.log(Number.isFinite(badNum)) // false
console.log(Number.isFinite(infinity)) // false
console.log(Number.isFinite("Hola!")) // false, не число
```

### 💡 Форматирование числа

Обёртка полезна, когда нужно отформатировать числа в соответствии с языком пользователя. По-программистски, настройки языка и особенности отображения информации на этом языке называют _локалью_. Для этого используется метод `toLocaleString()` обёртки. Аргументом передают локаль — строку особого формата ([список](https://github.com/ladjs/i18n-locales)). Если ничего не передать, система возьмёт локаль пользователя:

```js
let bigNumber = 100000000
let bigNumberWrapper = new Number(bigNumber)
console.log(bigNumberWrapper.toLocaleString("ru")) // 100 000 000
console.log(bigNumberWrapper.toLocaleString("en_US")) // 100,000,000
console.log(bigNumberWrapper.toLocaleString("ar-EG")) // ١٠٠٬٠٠٠٬٠٠٠
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="Lopinopulos" data-slug-hash="orxXgx" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Number.toLocaleString">
  <span>See the Pen <a href="https://codepen.io/Lopinopulos/pen/orxXgx">
  Number.toLocaleString</a> by Nikolai Lopin (<a href="https://codepen.io/Lopinopulos">@Lopinopulos</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
