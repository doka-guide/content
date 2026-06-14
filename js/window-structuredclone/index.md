---
title: "`structuredClone()`"
description: "Разбираемся, как работает structuredClone(), чем он отличается от Object.assign() и JSON.stringify(), и какие данные умеет копировать."
authors:
- drakesbot12
keywords:
- window methods
- structuredClone
- deep clone
- cloning objects
related:
  - /js/object-assign/
  - /js/spread/
  - /js/window/
tags:
- doka
---

## Кратко

`structuredClone()` — это встроенный метод JavaScript для глубокого копирования данных.

В отличие от поверхностного копирования через [`Object.assign()`](/js/object-assign/) или оператор расширения ([`...`](/js/spread/)), метод создаёт полностью независимую копию объекта вместе со всеми вложенными объектами, массивами и другими поддерживаемыми типами данных.

## Пример

```js
const original = {
  user: {
    name: 'John',
    age: 30,
  },
};

const clone = structuredClone(original);
clone.user.name = 'Alex';

console.log(original.user.name); // John
console.log(clone.user.name); // Alex
```

После изменения копии исходный объект остаётся неизменным.

## Как пишется

Базовый синтаксис:

```js
const clone = structuredClone(value);
```

- `value` — данные, которые нужно скопировать;
- результатом работы метода становится новая независимая копия.

Например:

```js
const numbers = [1, 2, 3];
const clone = structuredClone(numbers);

console.log(clone); // [1, 2, 3]
```

## Как понять

В JavaScript объекты и массивы передаются по ссылке.

Если просто присвоить объект новой переменной:

```js
const user = {
  name: 'John',
};

const copy = user;
copy.name = 'Alex';

console.log(user.name); // Alex
```

Обе переменные будут ссылаться на один и тот же объект в памяти.

С поверхностным копированием ситуация лучше, но только для первого уровня вложенности:

```js
const user = {
  profile: {
    name: 'John',
  },
};

const copy = { ...user };
copy.profile.name = 'Alex';

console.log(user.profile.name); // Alex
```

Объект `profile` всё ещё остаётся общим для обеих переменных.

`structuredClone()` создаёт новую структуру целиком:

```js
const user = {
  profile: {
    name: 'John',
  },
};

const copy = structuredClone(user);
copy.profile.name = 'Alex';

console.log(user.profile.name); // John
```

Теперь вложенные объекты тоже независимы друг от друга.

### Какие данные поддерживаются

Метод умеет копировать большинство распространённых типов данных:

```js
const data = {
  string: 'Hello',
  number: 42,
  boolean: true,
  array: [1, 2, 3],
  object: { a: 1 },
  date: new Date(),
  map: new Map(),
  set: new Set(),
};

const clone = structuredClone(data);
```

Поддерживаются:
- объекты;
- массивы;
- строки;
- числа;
- булевы значения;
- [`Date`](/js/date/);
- [`Map`](/js/map/);
- [`Set`](/js/set/);
- [`ArrayBuffer`](/js/array-buffer/);
- `Blob`;
- `TypedArray`;
- `RegExp`;
- многие другие встроенные структуры данных.

### Циклические ссылки

`structuredClone()` умеет копировать объекты, которые содержат ссылки сами на себя.

```js
const obj = {};
obj.self = obj;

const clone = structuredClone(obj);

console.log(clone.self === clone); // true
```

Такой объект нельзя скопировать через `JSON.stringify()`, потому что возникнет ошибка.

```js
JSON.stringify(obj); // Ошибка: TypeError
```

### Что нельзя скопировать

Некоторые значения алгоритм клонирования не поддерживает.

Например, функции:

```js
const obj = {
  sayHello() {
    console.log('Hello');
  },
};

structuredClone(obj); // Ошибка: DataCloneError
```

Также нельзя клонировать:
- DOM-элементы;
- объекты с активными ссылками на окружение выполнения;
- некоторые специфические объекты браузера.

### Отличия от JSON.stringify()

Раньше для глубокого копирования часто использовали такой подход:

```js
const clone = JSON.parse(
  JSON.stringify(object)
);
```

Но у него есть недостатки.

Например:

```js
const data = {
  date: new Date(),
};

const clone = JSON.parse(
  JSON.stringify(data)
);

console.log(typeof clone.date); // string
```

Объект [`Date`](/js/date/) превращается в строку.

С `structuredClone()` тип сохраняется:

```js
const clone = structuredClone(data);

console.log(clone.date instanceof Date); // true
```

Кроме того, `structuredClone()` умеет работать с [`Map`](/js/map/), [`Set`](/js/set/), [`ArrayBuffer`](/js/array-buffer/) и другими типами, которые теряются при использовании JSON.

### Передача владения объектами

У метода есть второй параметр — объект настроек.

Он позволяет не копировать некоторые данные, а передавать владение ими новому объекту.

Чаще всего это используется с [`ArrayBuffer`](/js/array-buffer/).

```js
const buffer = new ArrayBuffer(16);

const clone = structuredClone(buffer, {
  transfer: [buffer],
});
```

После передачи исходный буфер очищается и больше не может использоваться. Владение данными переходит новому объекту.

Такой подход помогает избежать лишнего расхода памяти при работе с большими объёмами данных.

## Подсказки

💡 Не умеет копировать функции и DOM-узлы.
💡 `structuredClone()` создаёт глубокую копию данных, а не копию ссылок.
💡 Метод лучше подходит для глубокого клонирования, чем связка `JSON.stringify()` + `JSON.parse()`.
💡 Поддерживает [`Map`](/js/map/), [`Set`](/js/set/), [`Date`](/js/date/), [`ArrayBuffer`](/js/array-buffer/) и многие другие встроенные типы данных.
💡 Если нужно изменить копию объекта, не затрагивая оригинал, `structuredClone()` обычно является самым простым и надёжным решением.
