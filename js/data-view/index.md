---
title: "`DataView`"
description: "Объект для нетипизированного представления бинарных данных из буфера в нужном формате и порядке байтов"
authors:
  - marss-hub
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
---

## Кратко

`DataView` — это специальный объект для обращения к _нетипизированному_ представлению данных из [`ArrayBuffer`](/js/array-buffer/). Он содержит уникальные методы, позволяющие обратиться к данным, задавая их тип в момент обращения с возможностью явно указать порядок байтов.

Поскольку `DataView` предоставляет низкоуровневое API для записи и чтения данных из `ArrayBuffer`, это делает его очень гибким инструментом для работы с бинарными форматами данных — изображениями, аудио и видеофайлами, сетевыми запросами. Если требуется взаимодействовать с буфером, где хранятся данные разного типа, то `DataView` просто необходим.

## Пример

```js
const buffer = new ArrayBuffer(4);
const dataView = new DataView(buffer);

dataView.setUint8(0, 255);
dataView.setUint8(1, 255);

console.log(dataView.getUint8(0)); 
// 255

console.log(dataView.getUint16(0)); 
// 65535
```

## Как пишется
### Создание представления

Чтобы создать `DataView` используйте оператор `new`:

```js
new DataView(buffer, [byteOffset], [byteLength]);
```

 - `buffer` — ссылка на бинарные данные `ArrayBuffer`;
 - `byteOffset` — стартовая позиция данных для представления в байтах (смещение), по умолчанию - 0;
 - `byteLength` — количество читаемых данных (в байтах) из `buffer`, по умолчанию - до конца буфера.

<aside>

Обратите внимание:
 ⚠️ В отличие от типизированных массивов `DataView` никогда не создает буфер автоматически.
 ⚠️ Значение `DataView` задается один раз при создании объекта и не изменяемо в дальнейшем.

</aside>

Мы можем просто создать представление `DataView` для всего буфера:

```js
// Создание буфера указанного размера
const buffer = new ArrayBuffer(16);
// Создание представления DataView
const dataView = new DataView(buffer);
```

Или создать представление для его части, указав в аргументах `byteOffset` и `byteLength`:

```js
const buffer = new ArrayBuffer(16);
// Создание представления, в котором со смещением на 2 считываем 4 байта
const dataView = new DataView(buffer, 2, 4);
```

### Свойства
Свойства `DataView` аналогичны аргументам его конструктора:
- `buffer` — ссылка на `ArrayBuffer` на который ссылается представление. Только для чтения;
- `byteLength` — размер представления в байтах. Только для чтения;
- `byteOffset` — смещение представления `DataView` в байтах от начального значения в `ArrayBuffer`. Только для чтения.

### Методы

Имена методов `DataView` удобно связаны с числовыми типами (`uint8`, `float64`, ...), при этом методы начинающиеся с `get` читают данные из буфера, а начинающиеся с `set` их записывают. Например: `.getInt8()`, `.getUint8()`, `.setFloat64()`, `.setBigInt64()` и т. д.

```js
// Создаем бинарный массив размером 4 байта
const buffer = new Uint8Array([0, 42, 0, 42]).buffer;
const dataView = new DataView(buffer);

// Получим 8-битное число на позиции 0
console.log(dataView.getUint8(0));
// 0

// Теперь на той же позиции 0, получим 16-битное число, но оно уже состоит из двух байт
console.log(dataView.getUint16(0));
// 42

// Теперь на той же позиции 0, получим 32-битное число, но оно уже состоит из четырех байт
console.log(dataView.getUint32(0));
// 2752554

// Запишем нули на позицию 0 для 16-битного числа
dataView.setUint16(0, 0);

// Теперь 32-битное число изменилось
console.log(dataView.getUint32(0));
// 42
```

[Список всех методов `DataView`](https://tc39.es/ecma262/multipage/structured-data.html#sec-dataview.prototype.constructor).


### Указание порядка байтов

_Порядок байтов (endianness)_ — последовательность байтов, в которой информация хранится в памяти компьютера. По умолчанию в `DataView` используется порядок от старшего к младшему (big-endian). Про память подробнее вы можете узнать из статьи «[Как устроена память](/tools/trivial-memory-model/)».

`DataView` дает возможность явно указывать порядок байтов в момент чтения или записи данных. В обычных `TypedArray` такой возможности нет. Возможность указания порядка байтов особенна важна когда порядок байтов в данных отличается от используемого в операционной системе. [Подробнее о порядке байтов](https://developer.mozilla.org/en-US/docs/Glossary/Endianness).

```js
const buffer = new ArrayBuffer(4);
const dataView = new DataView(buffer);

// Запишем число 123 с явным указанием big-endian порядка байтов, для этого укажем false
dataView.setUint16(0, 123, false);

// Читаем число из буфера с указанием порядка big-endian
console.log(dataView.getUint16(0, false));
// 123 - все верно

// Прочитаем число из буфера КАКИМ БЫ ОНО БЫЛО с указанием порядка little-endian
console.log(dataView.getUint16(0, true));
// 31488 - совсем другое число!
```

<details>
<summary>Порядок байтов в операционной системе</summary>

Пример того, как `DataView` позволяет контролировать порядок байтов, который (как уже упоминалось выше) может не совпадать с их порядком в системе пользователя:

```js
const littleEndian = (() => {
  const buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);

  return new Int16Array(buffer)[0] === 256;
})();

console.log(littleEndian);
// true или false
```

Обратите внимание, по умолчанию `DataView` использует именно big-endian, однако многие платформы используют little-endian.

</details>

### Выход за границы буфера
`DataView` сам контролирует соблюдение границ буфера. Попытка прочитать данные за пределами переданного `ArrayBuffer` выбросит ошибку `RangeError`. Это удобно и позволяет избежать трудноуловимых багов.

```js
const buffer = new ArrayBuffer(2);
const dataView = new DataView(buffer);

console.log(dataView.getUint32(0));
// Выдаст ошибку: Uncaught RangeError: Offset is outside the bounds of the DataView
console.log(dataView.getUint16(1));
// Выдаст ошибку: Uncaught RangeError: Offset is outside the bounds of the DataView
```

### Производительность
Использование `DataView` дает большую гибкость и контроль, но ради этого приходится жертвовать скоростью. При каждом вызове метода чтения или записи, `DataView` выполняет несколько дополнительных проверок ([Согласно описанию в спецификации ECMAScript см. секции GetViewValue и SetViewValue](https://tc39.es/ecma262/#sec-getviewvalue)) — например, проверки выхода за границы буфера, проверка значения endianness и т. п.

Разница в скорости не будет заметна для большинства единичных задач. Однако в высокопроизводительных сценариях,  например, при обработке каждого пикселя в изображении использование `TypedArray` с помощью `uint8array[i]` или `uint8array.map()` будет ощутимо быстрее, чем с обработка с применением методов `DataView`.