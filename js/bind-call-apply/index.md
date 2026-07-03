---
title: "bind(), call() и apply()"
description: "Методы привязки контекста: bind(), call() и apply()"
authors:
  - lira-bazh
related:
  - js/function-context
  - js/function-as-datatype
  - js/function
keywords:
  - bind
  - call
  - apply
  - методы привязки контекста
tags:
  - doka
---

## Кратко

Для изменения [контекста выполнения](/js/function-context/) функции используется один из трёх методов (ведь функция в JavaScript [является объектом](/js/function-as-datatype/) и, как любой объект, может иметь собственные методы):

- `bind()` — возвращает новую функцию с привязанным [`this`](/js/function-context/);
- `call()` — выполняет функцию, передавая ей [`this`](/js/function-context/) и аргументы;
- `apply()` — выполняет функцию, передавая ей [`this`](/js/function-context/) и массив аргументов.

## Bind

Создаёт новую функцию с указанным [`this`](/js/function-context/) и (опционально) аргументами.

### Как пишется

```js
const newFunc = func.bind(context, arg1, arg2, ...)
```

### Как понять

Возвращает новую функцию. Первый аргумент становится [`this`](/js/function-context/) внутри функции — и его нельзя изменить повторным вызовом `bind()`.

```js
const cat = { name: 'Барсик' }
const dog = { name: 'Шарик' }

function sayHi() {
  console.log(`Привет, я ${this.name}`)
}

// Привязываем к коту
const bound = sayHi.bind(cat)
bound()
// "Привет, я Барсик"

// Пытаемся переопределить контекст
bound.call(dog)
// "Привет, я Барсик" — не изменилось!
bound.apply(dog)
// "Привет, я Барсик" — не изменилось!

const boundAgain = bound.bind(dog);
boundAgain()
// "Привет, я Барсик" — даже двойной bind не помог!
```

Аргументы после первого подставляются в функцию один за другим. Можно указать не все, а только первые — остальные добавить уже при вызове получившейся функции. Пример:

```js
const customer = { name: 'Анна' };

function orderPizza(size, topping) {
  console.log(`${this.name} заказала ${size} пиццу с ${topping}`);
}

// Фиксируем size = 'большую'
const annasOrder = orderPizza.bind(customer, 'большую');

annasOrder('грибами');
// "Анна заказала большую пиццу с грибами"

annasOrder('пепперони');
// "Анна заказала большую пиццу с пепперони"
```

### Когда использовать

- при передаче функции в [setTimeout](/js/settimeout/)/[setInterval](/js/setinterval/)/[addEventListener](/js/element-addeventlistener/), чтобы она не потеряла контекст выполнения;
- фиксация [`this`](/js/function-context/) в функции;
- создание функции с предустановленными аргументами, [каррирование](/tools/fp/#karrirovanie).

Пример:

```js
const bakery = {
  name: 'Хлебница',

  order(clientName, product) {
    console.log(`${clientName} заказал(а) ${product} в пекарне «${this.name}»`)
  }
}

// 1. Передача в setTimeout (сохранение контекста)
setTimeout(bakery.order.bind(bakery, 'Анна', 'багет'), 1000)
// через секунду: "Анна заказал(а) багет в пекарне «Хлебница»"

// 2. Фиксация this
const placeOrder = bakery.order.bind(bakery)
placeOrder('Пётр', 'круассан')
// "Пётр заказал(а) круассан в пекарне «Хлебница»"

// 3. Каррирование (фиксация клиента пекарни)
const annaOrder = bakery.order.bind(bakery, 'Анна')
annaOrder('эклер')
// "Анна заказал(а) эклер в пекарне «Хлебница»"
annaOrder('пирожок')
// "Анна заказал(а) пирожок в пекарне «Хлебница»"
```

## Call

Вызывает функцию с указанным [`this`](/js/function-context/) и аргументами по порядку.

### Как пишется

```js
func.call(context, arg1, arg2, ...)
```
### Как понять

Метод выполняет функцию. Первый аргумент становится [`this`](/js/function-context/) внутри функции, а все остальные аргументы передаются в функцию по порядку.

```js
function addOrder(ingredient1, ingredient2) {
  console.log(`${this.customer} заказал(а) пиццу с ${ingredient1} и ${ingredient2}`);
}

const order1 = { customer: "Мария" };
const order2 = { customer: "Пётр" };

addOrder.call(order1, "сыром", "грибами");
// Мария заказал(а) пиццу с сыром и грибами

addOrder.call(order2, "ветчиной", "ананасами");
// Пётр заказал(а) пиццу с ветчиной и ананасами
```

### Когда использовать

Для вызова функции с конкретным [`this`](/js/function-context/), если аргументы находятся не в массиве.

## Apply

Вызывает функцию с указанным [`this`](/js/function-context/) и аргументами в виде массива.

### Как пишется

```js
func.apply(context, [arg1, arg2, ...])
```

### Как понять

Метод выполняет функцию. Первый аргумент становится [`this`](/js/function-context/) внутри функции, а второй (массив) — её аргументами.

```js
function makePizza(...toppings) {
  console.log(`${this.chef} готовит пиццу с: ${toppings.join(", ")}`);
}

const pizzeria1 = { chef: "Алессандро" };
const pizzeria2 = { chef: "Фабрицио" };

const toppings1 = ["пепперони", "сыром", "базиликом"];
const toppings2 = ["курицей", "ананасами"]

makePizza.apply(pizzeria1, toppings1);
// Алессандро готовит пиццу с: пепперони, сыром, базиликом
makePizza.apply(pizzeria2, toppings2);
// Фабрицио готовит пиццу с: курицей, ананасами
```

### Когда использовать

Для вызова функции с конкретным [`this`](/js/function-context/), если аргументы уже в массиве.

До появления [spread-оператора](/js/spread/) `apply()` был единственным удобным способом найти максимум/минимум в массиве чисел, т. к. в `Math.max()` и `Math.min()` нельзя передать массив:

```js
const prices = [12, 18, 14, 22, 16];

// Математическая функция ожидает отдельные числа, а не массив
console.log(Math.max(prices))
// NaN — не работает!

// Математическая функция не использует this, поэтому можно передать null
console.log(Math.max.apply(null, prices))
// 22 — всё работает!

// Современный способ — spread-оператор:
console.log(Math.max(...prices))
```

## Сравнение методов

Каждый из методов по-своему решает задачу привязки [`this`](/js/function-context/) функции:

| Метод       | Выполняет функцию?   | Возвращает       | Передача аргументов      |
|-------------|----------------------|------------------|--------------------------|
| `call`      | да                   | результат функции| по одному, через запятую |
| `apply`     | да                   | результат функции| массивом                 |
| `bind`      | нет                  | новую функцию    | по одному (можно частями)|

Пример со всеми тремя методами:

```js
const customer = { name: 'Анна' }

function orderPizza(size, topping) {
  console.log(`${this.name} заказала ${size} пиццу с ${topping}`)
}

// call — сразу, аргументы через запятую
orderPizza.call(customer, 'большую', 'грибами')
// "Анна заказала большую пиццу с грибами"

// apply — сразу, аргументы массивом
orderPizza.apply(customer, ['среднюю', 'пепперони'])
// "Анна заказала среднюю пиццу с пепперони"

// bind — возвращает новую функцию
const annasOrder = orderPizza.bind(customer, 'маленькую')
annasOrder('сыром и помидорами')
// "Анна заказала маленькую пиццу с сыром и помидорами"
annasOrder('ветчиной')
// "Анна заказала маленькую пиццу с ветчиной"
```

## Стрелочные функции

Все три метода не работают со стрелочными функциями для изменения [`this`](/js/function-context/). Стрелочные функции полностью игнорируют первый аргумент, переданный в `bind()`, `call()` или `apply()`, но применяют остальные переданные аргументы:

```js
const user = { name: 'Анна' }

// Обычная функция
function regular(greeting) {
  console.log(`${greeting}, я ${this.name}`)
}

// Стрелочная функция
const arrow = (greeting) => {
  console.log(`${greeting}, я ${this.name}`)
}

regular.call(user, 'Привет')
// "Привет, я Анна"
arrow.call(user, 'Привет')
// "Привет, я undefined"

regular.apply(user, ['Здравствуйте'])
// "Здравствуйте, я Анна"
arrow.apply(user, ['Здравствуйте'])
// "Здравствуйте, я undefined"

const boundRegular = regular.bind(user, 'Hi')
boundRegular()
// "Hi, я Анна"
const boundArrow = arrow.bind(user, 'Hi')
boundArrow()
// "Hi, я undefined"
```

При этом `bind()` можно использовать для каррирования стрелочной функции:

```js
const log = (prefix, message) => {
  console.log(`[${prefix}] ${message}`)
}

// Фиксируем prefix = 'ERROR'
const error = log.bind(null, 'ERROR')
// Фиксируем prefix = 'INFO'
const info = log.bind(null, 'INFO')

error('Что-то пошло не так')
// "[ERROR] Что-то пошло не так"
info('Сервер запущен')
// "[INFO] Сервер запущен"
```
