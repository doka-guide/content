---
title: "`DataView`"
description: "Объект для представления бинарных данных из буфера в нужном порядке байтов."
authors:
  - doka-dog
keywords:
  - typed array
  - indexed collection
  - javascript collection
  - typed array view
related:
  - js/typed-array
  - js/shared-array-buffer
  - js/array-buffer
tags:
  - doka
  - placeholder
---

## Кратко

Объект, который предоставляет низкоуровневое API (Application Programming Interface, интерфейс программирования приложения) для записи и чтения данных из [`ArrayBuffer`](/js/array-buffer/) или [`SharedArrayBuffer`](/js/shared-array-buffer/). Является частью типизированного массива.

Типизированные массивы упрощают работу с тяжёлыми данными, например, видео, аудио и анимациями. Их часто используют с различными API — WebGL, Canvas 2D, XMLHttpRequest2 и так далее.

## Пример

```js
const littleEndian = (() => {
  const buffer = new ArrayBuffer(2)
  new DataView(buffer).setInt16(0, 256, true)

  return new Int16Array(buffer)[0] === 256
})()

console.log(littleEndian)
// true или false
```

## Как пишется

`DataView`, как и `TypedArray`, используют для представления данных из `ArrayBuffer`. Этот объект позволяет контролировать порядок байтов, который может не совпадать с их порядком в операционной системе пользователя. К примеру, через `DataView` можно установить порядок от младшего к старшему (little-endian) или смешанный (middle-endian).

Чтобы создать `DataView`, обязательно используйте оператор `new`. Обратите внимание, что значение `DataView` нельзя изменять. Оно устанавливается один раз при создании объекта.

### Свойства

- `buffer` — на какой `ArrayBuffer` ссылается представление. Только для чтения.
- `byteLength` — размер представления в байтах. Только для чтения.
- `byteOffset` — смещение представления в байтах от начального значения в `ArrayBuffer`. Только для чтения.

### Методы

В качестве методов используют разные числовые форматы. Методы `get()` читают дынные из нужного буфера, а `set()` их записывают. Например, `.getInt8()`, `.getUnit8()`, `.setFloat64()`, `.setBigInt64()`.

[Список всех методов `DataView`](https://tc39.es/ecma262/multipage/structured-data.html#sec-dataview.prototype.constructor).

## Как понять

_Порядок байтов (endianness)_ — последовательность байтов, в которой информация хранится в памяти компьютера. По умолчанию используется порядок от старшего к младшему (big-endian).

Про память подробнее узнаете из статьи «[Как устроена память](/tools/trivial-memory-model/)».
