---
title: "Деструктуризация"
description: "Извлекаем свойства объектов в отдельные переменные."
baseline:
  - group: destructuring
    features:
      - javascript.operators.destructuring
authors:
  - vitya-ne
related:
  - js/object
  - js/arrays
  - js/var-let
tags:
  - article
---

## Кратко

Деструктуризация — это синтаксис, позволяющий упростить присваивание переменным значений свойств объекта или элементов массива. Для краткости будем использовать общепринятый термин «деструктуризация», хотя в спецификации ECMAScript используется понятие _деструктурирующее присваивание (Destructuring assignment)_.

Рассмотрим простой пример. Нужно извлечь из объекта `person` поля `name` и `age`.

```js
const person = {name: 'Александр', age: '37'}
```

Это можно сделать так:

```js
const name = person.name
const age = person.age
```

Используя деструктуризацию, можно сократить код до:

```js
const {name, age} = person
```

А вот пример с массивом. Извлечём из массива `planets` три первых элемента.

```js
const planets = ['Меркурий', 'Венера', 'Земля', 'Марс']
```

Это можно сделать, получая значения по индексу:

```js
const first = planets[0]
const second = planets[1]
const third = planets[2] // Мы тут!
```

А можно, используя деструктуризацию:

```js
const [first, second, third] = planets
```

## Как пишется

Синтаксис деструктуризации во многом похож на определение объектов или массивов с использованием литералов, но при этом `[]` или `{}` будут находиться слева от оператора присваивания:

```js
const [element] = array // element = array[0]
let {field} = obj // field = obj.field
```

## Деструктуризация объектов

Пока что разобрали простые примеры. Преимущества и гибкость деструктуризации раскрываются во всей полноте в сложных случаях.

Для извлекаемых свойств объекта можно предусмотреть значения по умолчанию. Это может понадобиться, если объект не содержит полей с указанными именами.

```js
const point = {x: 120, y: 30}

const {x, y, color = 'black'} = point

console.log(x, y)
// 120 30

console.log(color)
// black
```

Допустим, объект содержит свойства, которые мы хотим извлечь и записать в переменные под другими именами. Вот как это выполнить:

```js
const shape = {'name.ru': 'квадрат', 'color-str': 'black'}

const {
  'name.ru': name,
  'color-str': color
} = shape

console.log(name, color)
// квадрат black
```

Имена свойств, которые извлекаем из объекта, можно указывать динамически. Выполним это вот так:

```js
const record = {id: '#2514', value: 45, format: 'число', type: 'a'}

// Имя извлекаемого свойства
const key = 'value'

const {id, [key]: recordValue} = record

console.log(id, ":", recordValue)
// #2514 : 45
```

Оператор `rest (...)` может собрать неизвлечённые свойства в новый объект. Этот приём удобен, когда получаем объект, созданный на основе исходного объекта, за исключением указанных полей:

```js
const point = {x: 120, y: 30, color: 'blue', opacity: 0.4}

const {color, opacity, ...restPoint} = point

console.log(restPoint)
// { x: 120, y: 30 }
```

Деструктуризация может выполняться для объектов любой вложенности. Допустим, у нас есть такой объект:

```js
const creator = {
  person: {
    name: {
      firstName: 'Брендан',
      lastName: 'Эйх'
    },
    year: 1961
  },
  creation: 'JavaScript'
}
```

Извлекаем свойства вложенных объектов:

```js
// Извлечём свойства firstName, year, creation.
// Переменные person и name не создаются
const {person: {name: {firstName}, year}, creation} = creator

console.log(firstName, year, creation)
// Брендан 1961 JavaScript
```

С помощью деструктуризации можно не только извлечь указанные в объекте свойства, но и те, которые установлены в прототипах. Извлечём `name` (свойство объекта `node`), метод `setParent` (определён в прототипе `Node`) и `valueOf` (определён в прототипе `Object`):

```js
// Функция-конструктор
function Node(name) {
  this.name = `#${name}`
}

// Указанный в прототипе метод setParent
Node.prototype.setParent = parentNode =>
  this.parent = parent

// Создаём объект
const node = new Node(24)

// Извлекаем свойства
const {name, setParent, valueOf} = node

console.log(name)
// #24

console.log(setParent)
// [Function (anonymous)]

console.log(valueOf)
// [Function: valueOf]
```

При деструктуризации объявление переменных с помощью `let` или `const` обычно происходит вместе с их назначением:

```js
const {foo, bar} = obj
```

Если определили переменные ранее, нужно обернуть операцию в скобки:

```js
let foo
// ⚠️ Внимание! Без `;` в конце строки будет ошибка
let bar;
// ...
( { foo, bar } = obj )
```

## Деструктуризация массивов

При деструктуризации массива можете пропускать элементы, значения которых получать не нужно. Для пропуска элемента используют оператор `,`:

```js
const animals = ['🐱', '🐴', '🦆', '🐶', '🐸', '🐹']

const [cat, , , dog] = animals // Пропускаем '🐴', '🦆'

console.log(cat, dog)
// 🐱 🐶
```

Можно пропускать один элемент, несколько элементов подряд или их групп:

```js
const animals = ['🐱', '🐴', '🦆', '🐶', '🐸', '🐹']

const [, , duck, , frog] = animals // Пропускаем '🐱', '🐴', '🐶'

console.log(duck, frog)
// 🦆 🐸
```

Можно предусмотреть значения по умолчанию. Понадобится, если массив пустой или в нём незаполненные элементы.

```js
const options = Array(5) // [ <5 empty items> ]

const [first = 'Опция по умолчанию', second] = options

console.log(first)
// Опция по умолчанию

console.log(second)
// undefined
```

С помощью оператора `rest (...)` соберём в новый массив элементы, оставшиеся неизвлечёнными.

```js
const numbers = [2, 4, 8, 16, 32 ,64]

const [elem0, , elem2, ...restNumbers] = numbers

console.log(elem0, elem2)
// 2 8

console.log(restNumbers)
// [ 16, 32, 64 ]
```

Учитывайте, что `rest`-оператор указывают последним, иначе произойдёт ошибка:

```js
const numbers = [2, 4, 8, 16, 32 ,64]

const [elem0, ...restNumbers, elemLast ] = numbers
// SyntaxError: Rest element must be last element
```

Также можете произвести деструктуризацию в массиве, образуемом `rest`-оператором:

```js
const numbers = [2, 4, 8, 16, 32 ,64]

const [elem0, elem1, ...[ elem2, ...restNumbers ] ] = numbers

console.log(elem2)
// 8

console.log(restNumbers)
// [16, 32, 64]
```

С помощью деструктуризации удобно извлекать значения из вложенных массивов.

```js
const numbers = [
  1,
  [2, [2.3, 2.89]],
  4
]

// Извлечём значения первого элемента массива
const [, [elem10, [elem11, elem12]]] = numbers

console.log(elem10, elem11, elem12)
// 2 2.3 2.89
```

## Использование деструктуризации

Синтаксис деструктуризации улучшает читаемость кода. Рассмотрим несколько примеров.

### Передача множества параметров в функцию

Лучше избегать ситуаций, когда функция принимает множество параметров. При вызове такой функции легко запутаться в очерёдности аргументов, особенно если часть из них не обязательна:

```js
function createOption(title, hint="" , description="", callback, classes) {
  // Реализация
}

// Пример вызова
const loadFileOption = createOption(
  'Открыть файл',
  undefined,
  undefined,
  loadFileHandler,
  'option'
)
```

Можем улучшить этот код, заменив множества отдельных параметров на один объект. Тут как раз и пригодится деструктуризация. За счёт минимальных изменений получаем:

- названия свойств передаваемого объекта помогают понять смысл параметра;
- нет необходимости строгого соблюдения порядка аргументов при вызове.

```js
function createOption({title, hint="" , description="", callback, classes}) {
  // Реализация
}

// Пример вызова
const loadFileOption = createOption({
  title: 'Открыть файл',
  classes:'option'
  callback: loadFileHandler
})
```

### Уточнение аргумента колбэка в методах массива

Допустим, мы хотим отфильтровать массив объектов на основе нескольких свойств:

```js
const images = [
  {
    name: 'Кот в сапогах',
    data: {
      type: 'book',
      size: [800, 600]
    }
  },
  {
    name: 'Тётя-тётя Кошка',
    data: {
      type: 'book',
      size: [640, 480]
    },
  },
  {
    name: 'Васька слушает, да ест',
    data: {
      type: 'mem',
      size: [1024, 768]
    }
  },
]

// Получаем значения нужных свойств внутри колбэк-функции
const bookImages = images.filter((item) => {
  if (item.data.type === 'book' && item.data.size[0] > 640) {
    return true
  }
  return false
})
```

Деструктуризация поможет извлечь нужные свойства при передаче параметра в колбэк. Это упростит код функции:

```js
const bookImages = images.filter(({data:{type, size:[width]}}) => {
  if (type === 'book' && width > 640) {
    return true
  }
  return false
})
```

### Получение из функции нескольких значений

Иногда удобно получать из функции несколько значений. Деструктуризация результата выполнения функции не создаст временный массив при получении:

```js
function getMinMax (numbers = []) {
  const minValue = Math.min(...numbers)
  const maxValue = Math.max(...numbers)
  return [minValue, maxValue]
}

const [min, max] = getMinMax([2, 0, 10, 5, 8])

console.log(min, max)
// 0 10
```

## Трюки

Рассмотрим несколько неочевидных возможностей применения деструктуризации.

### Обмен значений переменных одной операцией

Скорее всего, этого не потребуется в реальном проекте, но такая возможность есть.

```js
let a = 8
// ⚠️ Внимание! Без `;` в конце строки будет ошибка
let b = 16;

[a, b] = [b, a]

console.log(a, b)
// 16 8
```

### Копирование свойств в объект

При деструктуризации объекта извлекаемые значения можно напрямую помещать в другой, ранее созданный объект:

```js
function getDeviceParams () {
  // Объект-приёмник
  // ⚠️ Внимание! Без `;` в конце строки будет ошибка
  const data = {lastCall: Date.now(), window: {}};

  // Копируем нужные свойства из объекта window в объект data
  ( {
    screen: {
      orientation: {type: data.orientation}
      availWidth: data.window.availableWidth
      availHeight: data.window.availableHeight
    },
    navigator: {language: data.lang}
  } = window )

  return data
}

console.log(getDeviceParams())
// {
//   lang: 'en-US',
//   lastCall: 1726815477972,
//   orientation: 'landscape-primary',
//   window: { availableHeight: 1040, availableWidth: 1920 }
// }
```

### Извлечение крайних элементов массива одной операцией

Так как массив — это также и объект, с помощью деструктуризации можем извлекать его свойства. Разберём решения по частям.

Элементы массива доступны как свойства с именами-индексами:

```js
const numbers = [5, 7, 9, 3]

const {0: first, 1: second} = numbers

console.log(first, second)
// 5 7
```

Зная размер массива, получим доступ к последнему элементу:

```js
const { [numbers.length - 1]: last } = numbers

console.log(last)
// 3
```

А теперь объединим всё вместе:

```js
const numbers = [5, 7, 9, 3]

const { 0: first, [numbers.length - 1]: last } = numbers

console.log(first, last)
// 5 3
```
