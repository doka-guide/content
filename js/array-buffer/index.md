---
title: "`ArrayBuffer`"
description: "Объект с бинарными данными фиксированной длины."
authors:
  - doka-dog
keywords:
  - typed array
  - indexed collection
  - javascript collection
related:
  - js/shared-array-buffer
  - js/typed-array
  - js/data-view
tags:
  - doka
  - placeholder
---

## Кратко

Объект с сырыми данными фиксированного размера, который представляет собой кусочек памяти. Работать напрямую с данными из объекта нельзя, однако можно создавать отображения этих данных и манипулировать содержимым `ArrayBuffer` через них.

Типизированные массивы – отображения содержимого `ArrayBuffer`. Они упрощают работу с тяжёлыми данными, например, видео, аудио и анимациями. Их часто используют с различными API — WebGL, Canvas 2D, XMLHttpRequest2 и так далее.

## Пример

```js
const buffer = new ArrayBuffer(3)
const view = new Int8Array(buffer)

console.log(view)
// Int8Array(3) [0, 0, 0, buffer: ArrayBuffer(3),
// byteLength: 3, byteOffset: 0, length: 3,
// Symbol(Symbol.toStringTag): 'Int8Array']
```

## Как пишется

Элементами из `ArrayBuffer` нельзя манипулировать без представления. По сути это просто ссылка на часть памяти, в которой хранятся сырые данные.

Всегда используйте оператор `new` для создания `ArrayBuffer`. Первый аргумент конструктора объекта `ArrayBuffer` определяет количество байт, которое нужно выделить для хранения данных.

```js
new ArrayBuffer(8)
```

Представление можно создать при помощи объектов `TypedArray` или [`DataView`](/js/data-view/). Они позволяют читать и записывать данные из буфера в нужном формате.

```js
const buffer = new ArrayBuffer(1)
const asUInt =  new Uint8Array(buffer)
const asInt = new Int8Array(buffer)

asInt[0] = 1
console.log(asUInt[0])
// 1

asInt[0] = -1
console.log(asUInt[0])
// 255
```

В этом примере создали два отображения для одного и того же буфера данных — знаковый и беззнаковый `Int`. Записывая `-1`, мы получаем следующие бинарные данные: 0b11111111. Это соответствует значению 255.

`ArrayBuffer` можно открепить от соответствующей ему области памяти, в отличие от [`SharedArrayBuffer`](/js/shared-array-buffer/). Чаще всего это нужно при передаче объекта между потоками. `ArrayBuffer`, переданный в новый поток, становится откреплённым в старом потоке. Из него больше нельзя читать данные.

### Свойства

- `length` — длина `ArrayBuffer` в байтах. По умолчанию равна 1.
- `byteLength` — размер `ArrayBuffer` в байтах, если для буфера используется метод `ArrayBuffer.prototype.resize()`.
- `maxByteLength` — максимальный размер `ArrayBuffer` в байтах, до которого может быть увеличен буфер.
- `resizable` — можно ли изменять размер буфера. Возвращает `true` или `false`.
- `detached` — был ли отсоединён новый массив от старого. Возвращает `true` или `false`.

### Методы

- `.isView()` — возвращает представление буфера. Это может быть `true` или `false`.
- `.resize()` — увеличивает размер `ArrayBuffer` в байтах до указанного числа.
- `.slice()` — возвращает новый `ArrayBuffer`, который содержит копию старого.
- `.transfer()` — возвращает новый `ArrayBuffer`, который, в том числе, содержит данные из старого.
- `.transferToFixedLength()` — создаёт новый `ArrayBuffer` с неизменяемым размером и отсоединяет его от старого.

## Как понять

Буфер — пространство в памяти, где хранятся бинарные данные. Про память подробнее узнаете из статьи «[Как устроена память](/tools/trivial-memory-model/)».
