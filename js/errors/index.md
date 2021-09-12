---
title: "Errors"
description: "Ошибки, типы ошибок"
authors:
  - Stegur
  - alexbaumgertner
keywords:
  - Альтернативные теги для работы поиска
tags:
  - doka
---

## Кратко

Программа может работать правильно, только если код написан корректно и не содержит ошибок.
JavaScript умеет обрабатывать некорректный код и сообщать об ошибке в коде.
Существует 7 встроенных видов ошибок, также можно создать свои собственные.

## Как это понять

### Error
Общий конструктор ошибок.
```js
new Error('Общая ошибка. Проверьте код');
```

#### Свойства и методы
```js
const commonError = new Error('Общая ошибка. Проверьте код');

console.log(commonError.message); // 'Общая ошибка. Проверьте код'
console.log(commonError.name); // 'Error'
```
Нестандартное свойство `stack` показывает, на какой строке кода возникла ошибка.


### SyntaxError
Чаще всего встречаются опечатки — неправильные названия методов, лишние/отсутствующие точки с запятой или скобочки и
так далее.
Такой тип ошибок называется "синтактическим", `SyntaxError`:

```js
console.log(;); // SyntaxError: Unexpected token ';'
console.log((); // SyntaxError: missing ) after argument list
```

### ReferenceError

Если попытаться обратиться к несуществующей переменной, произойдёт ошибка `ReferenceError`:

```js
console.log(name); // ReferenceError: name is not defined
```

### TypeError

Если попытаться обратиться к несуществующему свойству, произойдёт ошибка `TypeError`:

```js
console.log(null.length); // TypeError: Cannot read property 'length' of null
```

### EvalError
EvalError представляет ошибку, возникающую в глобальной функции eval().

```js
eval(
  'console.log(null.length)'
);
```
Эта ошибка в настоящее время не используется и остаётся для совместимости с
предыдущими версиями js.


### InternalError (не стандарт)
Ошибка внутри движка JavaScript. Не является стандартом и в production коде не используется.
Пример: "InternalError: инициализатор массива слишком большой".


### RangeError
Ошибка для значений, которые выходят за диапазон допустимого.

```js
new Array(10000000000); // RangeError: Invalid array length
```

### URIError
Этот тип ошибок возникает при неправильном использовании обработки URI.
```js
decodeURIComponent('%'); // URIError: URI malformed
```


## Генерация ошибки
Сгенерируем ошибку TypeError в случае, если хотя бы один из аргументов функции не будет являться числом

```js
function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return TypeError('Неверный тип данных');
  }

  return a + b;
}

console.log(sum('1', 2)); // TypeError: Неверный тип данных
```

Функция будет выполняться только в том случае если оба аргумента будет числами, в противном случае функция будет
возвращать ошибку `TypeError`.
