---
title: "Array.isArray"
description: "Array.isArray — проверка на массив"
authors:
  - yurlovr
tags:
  - doka
---

### 💡 Array.isArray

Очень часто приходится сталкиваться с проверкой - а массив ли это. Так как массивы не образуют отдельный тип языка, то проверка с помощью `typeof` нам не подойдёт.

```js
const a = []
console.log(typeof a)
// 'object'
```

Поскольку массивы используются везде и повсеместно, был создан специальный метод `Array.isArray`.

Он принимает один параметр, то что мы хотим проверить — `Array.isArray(value)`.

Если был передан массив, то вернётся `true`, иначе `false`.

В следующих ситуациях метод вернёт `true`:

## Пример

```js
Array.isArray([])
// true
Array.isArray(new Array(1, 2, 3))
// true
Array.isArray([undefined])
// true
Array.isArray(Array())
// true
Array.isArray(Array.prototype)
// true
```

А вот несколько примеров, когда мы получим `false`:

## Пример

```js
Array.isArray({})
// false
Array.isArray(1)
// false
Array.isArray('array')
// false
Array.isArray(null)
// false
Array.isArray(undefined)
// false
Array.isArray(new Uint8Array())
// false
```

И еще один случай, о котором бывает, что забывают:

## Пример

```js
// Получим все элементы div
const nodes = document.querySelectorAll('div')
Array.isArray(nodes)
// false
```

Это связано с тем, что мы получаем не массив, а объект `NodeList` — это список (набор) узлов, извлеченных из документа. А это уже совсем другая история.
