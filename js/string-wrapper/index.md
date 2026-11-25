---
title: "Обёртка `String`"
description: "Обёртка с дополнительными методами для работы со строками."
baseline:
  - group: strings
    features:
      - javascript.builtins.String
authors:
  - nlopin
contributors:
  - furtivite
  - solarrust
related:
  - js/number-wrapper
  - js/typecasting
  - js/arrays
tags:
  - doka
---

## Кратко

`String` — это обёртка над [примитивным строковым типом](/js/string/), которая содержит методы работы со строками:

- поиска по строке;
- строковых преобразований;
- получения отдельных символов.

## Пример

Очистим ввод от пробелов по краям, приведём к нижнему регистру и проверим, есть ли в нём нужное слово:

```js
const input = '  Привет, Дока!  '
const normalized = input.trim().toLowerCase()

console.log(normalized)
// привет, дока!
console.log(normalized.includes('дока'))
// true
```

## Как пишется

Методы `String` можно вызывать прямо у строки:

```js
const primitive = 'привет!'
console.log(primitive.toUpperCase())
// ПРИВЕТ!
```

Объект-обёртку можно создать и вручную, через конструктор `new String()`:

```js
const primitive = 'приветики'
const str = new String('приветики')
```

В этом случае переменные `primitive` и `str` будут разных типов:

```js
console.log(typeof primitive)
// string
console.log(typeof str)
// object

console.log(str == 'приветики')
// true, при приведении к строке значения будут одинаковыми
console.log(str === 'приветики')
// false, потому что разные типы данных
```

Объект-обёртка ведёт себя не как строка. Пустая строка в условии ложная, а обёртка над ней — истинная:

```js
console.log(Boolean(''))
// false
console.log(Boolean(new String('')))
// true
```

## Как понять

Обычно в JavaScript работают с примитивным строковым типом. Например, `const str = 'my string'`.

У примитивов нет своих методов. Методы строк хранятся в прототипе обёртки `String.prototype`.

Когда вы вызываете метод у примитива, JavaScript ищет этот метод в `String.prototype`, как если бы строка была объектом-обёрткой. Поэтому писать `new String()` не нужно: всё происходит автоматически. Встроенный метод при этом получает в `this` обычную строку, а не объект.

### Смена регистра

Метод `toLowerCase()` приводит все символы строки к нижнему регистру, а `toUpperCase()` — к верхнему:

```js
const lowercased = 'СОБАКА'.toLowerCase()
console.log(lowercased)
// собака

const uppercased = 'котик'.toUpperCase()
console.log(uppercased)
// КОТИК
```

Это пригодится, чтобы привести текст к одному виду и сравнивать результаты текстового ввода без учёта регистра. Например, почтовые сервисы обычно не различают регистр в адресе. В демке сравним адрес почты и его подтверждение без учёта регистра:

<iframe title="Сравнение адресов почты без учёта регистра" src="demos/string-tolowercase/" height="420"></iframe>

### Поиск подстроки

Для поиска одной строки внутри другой есть целый набор методов:

#### 1️⃣ `includes()`

[`includes()`](/js/includes/) принимает аргументом подстроку, которую нужно найти. Возвращает `true`, если подстрока нашлась, и `false` — если нет.

```js
const phrase = 'мама мыла раму'

console.log(phrase.includes('мы'))
// true

console.log(phrase.includes('тикток'))
// false
```

#### 2️⃣ `startsWith()`

`startsWith()` принимает аргументом подстроку, которую нужно найти. Возвращает `true`, если текущая строка _начинается с искомой_, и `false` — если нет.

```js
const phrase = 'папа мыл ногу'

console.log(phrase.startsWith('па'))
// true

console.log(phrase.startsWith('мыл'))
// false

console.log(phrase.startsWith('тикток'))
// false
```

#### 3️⃣ `endsWith()`

`endsWith()` принимает аргументом подстроку, которую нужно найти. Возвращает `true`, если текущая строка _заканчивается искомой_, и `false` — если нет.

```js
const phrase = 'брат мыл яблоко'

console.log(phrase.endsWith('яблоко'))
// true

console.log(phrase.endsWith('мыл'))
// false

console.log(phrase.endsWith('тикток'))
// false
```

#### 4️⃣ `indexOf()`

[`indexOf()`](/js/index-of/) принимает аргументом подстроку, которую нужно найти. Возвращает индекс символа, с которого начинается искомая подстрока. Если подстрока не найдена, то возвращает `-1`.

```js
const phrase = 'сестра мыла посуду'

console.log(phrase.indexOf('мыла'))
// 7

console.log(phrase.indexOf('тикток'))
// -1
```

Если вхождений несколько, метод вернёт индекс первого:

```js
const phrase = 'сестра мыла посуду'

console.log(phrase.indexOf('с'))
// 0
```

Вторым аргументом методу можно передать индекс, с которого начинать поиск:

```js
const phrase = 'сестра мыла посуду'

console.log(phrase.indexOf('с', 1))
// 2
```

Метод `indexOf()` ищет вхождение слева направо. Для поиска в обратном порядке есть зеркальный метод `lastIndexOf()`.

### Получение символа

Символ по индексу можно получить через квадратные скобки или метод `at()`. Метод `at()` понимает отрицательные индексы и отсчитывает их с конца строки:

```js
const word = 'собака'

console.log(word[0])
// с
console.log(word.at(-1))
// а
console.log(word[-1])
// undefined
```

Индексы в строке считают не видимые символы, а 16-битные кодовые единицы UTF-16. Большинству символов хватает одной единицы, а эмодзи обычно занимает две. Поэтому `at(-1)` у строки с эмодзи на конце вернёт только его половину.

### Получение подстроки

Метод `substring()` возвращает часть строки. Первый аргумент — индекс, с которого начать копирование. Второй — индекс, на котором закончить. Символ на индексе окончания в результат не попадает:

```js
const phrase = 'javascript'

const script = phrase.substring(4, 10)
console.log(script)
// script

console.log(phrase.substring(4, 9))
// scrip
```

Если указан только один аргумент, то результатом будет строка, начинающаяся с указанного индекса и до конца строки:

```js
const phrase = 'javascript'
console.log(phrase.substring(1))
// avascript
console.log(phrase.substring(4))
// script
```

Похожим образом работает `slice()`. Отличий два. Первое видно, если поменять местами индекс начала и индекс окончания. Тогда `substring()` сам поменяет аргументы местами, а `slice()` вернёт пустую строку:

```js
const phrase = 'javascript'

console.log(phrase.substring(10, 4))
// script
console.log(phrase.slice(10, 4))
// ''
```

Ещё `slice()` понимает отрицательные индексы и отсчитывает их с конца строки. `substring()` считает отрицательный индекс нулём:

```js
const phrase = 'javascript'

console.log(phrase.slice(-6))
// script
console.log(phrase.substring(-6))
// javascript
```

Отрицательные индексы делают `slice()` удобным, когда нужно получить значение с конца строки. Например, частично скрывать длинный текст при отображении пользователю и показывать только первые и последние пять символов:

```js
const text = 'String — это обёртка над строковым типом'
const masked = text.slice(0, 5) + '...' + text.slice(-5)

console.log(masked)
// Strin...типом
```

Есть ещё метод `substr()`. Он устарел: стандарт оставил его для совместимости со старым кодом. Метод работает во всех браузерах, но в новом коде используйте `slice()` или `substring()`.

Второй аргумент `substr()` — длина подстроки, а не индекс окончания. Поэтому при замене вызова второй аргумент нужно пересчитать.

<aside>

🤝 Методы `substring()` и `slice()` часто используют вместе с `indexOf()`. Сначала `indexOf()` находит, где начинается нужная подстрока. Потом этот индекс передают в `substring()` как начало копирования.

</aside>

### Деление строки на слова

Метод `split()` разбивает строку на отдельные подстроки. Чаще всего это нужно, чтобы разбить строку на слова.

Метод принимает аргументом разделитель, по которому нужно делить строку на подстроки. Возвращает массив получившихся подстрок.

Например, разбить текст на слова по пробелам:

```js
const phrase = 'London is the capital of Great Britain.'
const words = phrase.split(' ')

console.log(words)
// [ 'London', 'is', 'the', 'capital',
//   'of', 'Great', 'Britain.' ]
```

Если не указать разделитель, то метод вернёт [массив](/js/arrays/) из одного элемента, исходной строки:

```js
const phrase = 'London is the capital of Great Britain.'

console.log(phrase.split())
// [ 'London is the capital of Great Britain.' ]
```

Разделителем может быть и перевод строки `\n`:

```js
const phrase = 'London is the\ncapital of\nGreat Britain.'

console.log(phrase.split('\n'))
// [ 'London is the', 'capital of', 'Great Britain.' ]
```

Если разделителей несколько, передайте регулярное выражение:

```js
const list = 'яблоки, груши;сливы'

console.log(list.split(/[,;] ?/))
// [ 'яблоки', 'груши', 'сливы' ]
```

<aside>

🔗 Склеить массив строк в одну можно методом [`join()`](/js/array-join/). Он принимает один аргумент — строку-разделитель, которую метод вставит между элементами. Например, склеить строки пробелами: `[ 'London is the', 'capital of', 'Great Britain.' ].join(' ')`.

</aside>

### Замена подстроки

Заменить часть строки на другую можно методом `replace()`.

При вызове в него нужно передать два аргумента: какую подстроку менять и на что:

```js
const str = 'Яблоко — вкусный овощ'
const correct = str.replace('овощ', 'фрукт')
console.log(correct)
// Яблоко — вкусный фрукт
```

Если строка на замену не найдена, то замены не произойдёт:

```js
const str = 'Яблоко — вкусный овощ'
const notChanged = str.replace('апельсин', 'банан')

console.log(notChanged)
// Яблоко — вкусный овощ
```

Метод `replace()` заменяет только первое вхождение. Чтобы заменить все вхождения, используйте `replaceAll()` или регулярное выражение с флагом `g`:

```js
const str = 'Какова цена яблока? Какого яблока? Я их не продаю.'

const once = str.replace('яблока', 'помидора')
console.log(once)
// Какова цена помидора? Какого яблока? Я их не продаю.

const all = str.replaceAll('яблока', 'помидора')
console.log(all)
// Какова цена помидора? Какого помидора? Я их не продаю.

const byRegexp = str.replace(/яблока/g, 'помидора')
console.log(byRegexp)
// Какова цена помидора? Какого помидора? Я их не продаю.
```

### Очистка строки

Метод [`trim()`](/js/string-trim/) убирает пробелы и переводы строк в начале и в конце строки. Аргументов он не принимает:

```js
const email = '    another@test.com   '

console.log(email.trim())
// another@test.com
```

Если нужно удалять пробелы только в начале или только в конце строки, то есть похожие методы `trimStart()` и `trimEnd()`.
