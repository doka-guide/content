Оператор `typeof` возвращает строку, представляющую тип данных операнда.

```js
console.log(typeof 42);         // "number"
console.log(typeof "Hello");    // "string"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object"
console.log(typeof {});         // "object"
console.log(typeof []);         // "object"
console.log(typeof function(){});// "function"
```

Но есть некоторые важные моменты, связанные с операторатором `typeof`:

1. null: Одна из известных особенностей - `typeof null` возвращает `object`. Это считается ошибкой в языке, но сохранено из-за обратной совместимости.

2. функции: `typeof` для функций возвращает `function`. Функции в JavaScript - это объекты, но оператор `typeof` позволяет их отличить от обычных объектов.

3. массивы: `typeof []` возвращает `object`, поскольку массивы в JavaScript являются разновидностями объектов. Для проверки, является ли переменная массивом, можно воспользоваться методом
[Array.isArray](/js/array-isarray/).


Использование `typeof`: часто применяется для проверки типов переменных в условиях, чтобы выполнить различные действия в зависимости от типа данных.
