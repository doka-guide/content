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

### SyntaxError
Чаще всего встречаются опечатки — неправильные названия методов, лишние/отсутствущие точки с запятой или скобочки и тд.
Такой тип ошибок называется "синтактическим", `SyntaxError`:

```js
console.log(;); // SyntaxError: Unexpected token ';'
console.log((); // SyntaxError: missing ) after argument list
```

### ReferenceError

Если попытаться обратиться к несуществующей переменной, произойдет ошибка `ReferenceError`:

```js
console.log(name); // ReferenceError: name is not defined
```

### TypeError

Если попытаться обратиться к несуществующему свойству, произойдет ошибка `TypeError`:

```js
console.log(null.length); // TypeError: Cannot read property 'length' of null
```
