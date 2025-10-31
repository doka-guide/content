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
`DataView` помогает работать с данными в [`ArrayBuffer`](/js/array-buffer/). С его помощью можно читать и записывать данные разных типов, а указывать нужный тип прямо при обращении. При этом можно контролировать порядок байтов.

`DataView` — это низкоуровневый инструмент. Он пригодится, когда нужно работать с бинарными данными: изображениями, аудио, видео или сетевыми запросами. Если в буфере хранятся данные разного типа, то без `DataView` не обойтись.

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
Создать `DataView` можно с помощью оператора `new`:

```js
new DataView(buffer, [byteOffset], [byteLength]);
```

 - `buffer` — ссылка на бинарные данные `ArrayBuffer`;
 - `byteOffset` — позиция, с которой начинается представление (в байтах). По умолчанию — 0;
 - `byteLength` — количество байт, которые будут доступны в представлении. По умолчанию — все данные до конца буфера.

<aside>

Обратите внимание:
 ⚠️ `DataView` не создаёт буфер автоматически, в отличие от типизированных массивов.
 ⚠️ После создания `DataView` его настройки (буфер, смещение, длина) нельзя изменить.

</aside>

## Как понять
### Создание представления
Можно создать `DataView` для всего буфера:

```js
// Создаём буфер размером 16 байт
const buffer = new ArrayBuffer(16);
// Создаём представление для всего буфера
const dataView = new DataView(buffer);
```

Или части буфера, указав смещение и длину:

```js
const buffer = new ArrayBuffer(16);
// Создаём представление, которое начинается со смещением на 2 байта и занимает 4 байта
const dataView = new DataView(buffer, 2, 4);
```

### Свойства
У `DataView` есть три свойства, которые доступны только для чтения:
- `buffer` — ссылка на исходный `ArrayBuffer`;
- `byteLength` — размер представления в байтах;
- `byteOffset` — смещение представления от начала буфера в байтах.

### Методы
Методы `DataView` начинаются с `get` (чтение) или `set` (запись), а дальше указывается тип данных: `Uint8`, `Int16`, `Float32` и так далее.  Например: `.getInt8()`, `.getUint8()`, `.setUint16()`, `.setBigInt64()`.

```js
// Создаем бинарный массив размером 4 байта
const buffer = new Uint8Array([0, 42, 0, 42]).buffer;
const dataView = new DataView(buffer);

// Читаем 8-битное число с позиции 0
console.log(dataView.getUint8(0));
// 0

// Читаем 16-битное число с позиции 0 (оно состоит из двух байт)
console.log(dataView.getUint16(0));
// 42

// Читаем 32-битное число с позиции 0 (оно состоит из четырех байт)
console.log(dataView.getUint32(0));
// 2752554

// Записываем 0 на позицию 0 для 16-битного числа
dataView.setUint16(0, 0);

// Теперь 32-битное число изменилось
console.log(dataView.getUint32(0));
// 42
```

[Список всех методов `DataView`](https://tc39.es/ecma262/multipage/structured-data.html#sec-dataview.prototype.constructor).

## Подсказки
### Указание порядка байтов
_Порядок байтов (endianness)_ — это последовательность, в которой байты хранятся в памяти. По умолчанию `DataView` использует порядок от старшего к младшему (big-endian). Подробнее о памяти можно узнать из статьи «[Как устроена память](/tools/trivial-memory-model/)».

`DataView` позволяет явно указать порядок байтов при чтении или записи. В обычных типизированных массивах такой возможности нет. Это особенно важно, когда порядок байтов в данных отличается от порядка, используемого в операционной системе. [Подробнее о порядке байтов](https://developer.mozilla.org/en-US/docs/Glossary/Endianness).

```js
const buffer = new ArrayBuffer(4);
const dataView = new DataView(buffer);

// Записываем число 123 с указанием порядка big-endian (false)
dataView.setUint16(0, 123, false);

// Читаем число с указанием порядка big-endian
console.log(dataView.getUint16(0, false));
// 123 - все верно

// Читаем число, КАК БУДТО оно записано в порядке little-endian
console.log(dataView.getUint16(0, true));
// 31488 - получили другое число!
```

<details>
<summary>Порядок байтов в системе</summary>

Пример, как с помощью `DataView` можно узнать порядок байтов в системе:

```js
const littleEndian = (() => {
  const buffer = new ArrayBuffer(2);
  // Указываем, что данные записываются в формате little-endian (true)
  new DataView(buffer).setInt16(0, 256, true);

  // Типизированные массивы используют порядок байтов платформы
  return new Int16Array(buffer)[0] === 256;
})();

// Вернет true для little-endian или false для big-endian
console.log(littleEndian);
```

По умолчанию `DataView` использует big-endian, но многие платформы работают с little-endian.

Например, little-endian используется в процессорах [на архитектуре x86](https://ru.wikipedia.org/wiki/X86#Основные_особенности_архитектуры) (Intel, AMD). [Архитектура ARM](https://ru.wikipedia.org/wiki/ARM_(архитектура)) тоже [чаще использует little-endian](https://ru.wikipedia.org/wiki/Порядок_байтов#Переключаемый_порядок).


При этом популярные сетевые протоколы (TCP/IP, UDP) и форматы файлов (JPEG, PNG) [используют big-endian](https://ru.wikipedia.org/wiki/Порядок_байтов#Порядок_от_старшего_к_младшему). Поэтому важно контролировать порядок байтов.

</details>

### Выход за границы буфера
`DataView` сам следит за тем, чтобы вы не вышли за границы буфера. Если попытаться прочитать данные за пределами `ArrayBuffer`, возникнет ошибка `RangeError`. Это помогает избежать неприятных багов.

```js
const buffer = new ArrayBuffer(2);
const dataView = new DataView(buffer);

console.log(dataView.getUint32(0));
// Ошибка: Uncaught RangeError: Offset is outside the bounds of the DataView
console.log(dataView.getUint16(1));
// Ошибка: Uncaught RangeError: Offset is outside the bounds of the DataView
```

### Производительность
`DataView` даёт гибкость и контроль, но это достигается ценой производительности. При каждом чтении или записи `DataView` выполняет дополнительные проверки ([Согласно спецификации ECMAScript](https://tc39.es/ecma262/#sec-getviewvalue)) — например, проверяет границы буфера и порядок байтов.

Для большинства задач разница в скорости незаметна. Но в высокопроизводительных сценариях (например, обработка каждого пикселя изображения) использование типизированных массивов через `uint8array[i]` или `uint8array.map()` будет значительно быстрее, чем методы `DataView`.