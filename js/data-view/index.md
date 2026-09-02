---
title: "`DataView`"
description: "Читаем и записываем байты в буфере, как душе угодно."
authors:
  - marss-hub
editors:
  - inventoris
keywords:
  - ArrayBuffer
  - буфер
  - байты
  - TypedArray
related:
  - js/typed-array
  - js/shared-array-buffer
  - js/array-buffer
tags:
  - doka
---

## Кратко

`DataView` помогает работать с содержимым [`ArrayBuffer`](/js/array-buffer/). С его помощью можно читать и записывать данные разных типов, а также [указывать порядок интерпритации байтов](/js/data-view/#ukazanie-poryadka-baytov).

## Пример

```js
const buffer = new ArrayBuffer(4)
const dataView = new DataView(buffer)

dataView.setUint8(0, 255)
dataView.setUint8(1, 255)

console.log(dataView.getUint8(0))
// 255

console.log(dataView.getUint16(0))
// 65535
```

## Как пишется

Создать `DataView` можно с помощью оператора `new`:

```js
new DataView(buffer, [byteOffset], [byteLength])
```

`DataView` при создании принимает следующие аргументы:

- `buffer` — объект `ArrayBuffer`;
- `byteOffset` — смещение по данным `ArrayBuffer` (в байтах), с учётом которого будет создаваться представление `DataView`. По умолчанию — 0;
- `byteLength` — количество байтов, доступных в создаваемом представлении. По умолчанию — все данные до конца буфера.

<aside>

⚠️ Обратите внимание:

1. Аргумент `buffer` - обязательный. При его отсутствии `DataView` не создаст буфер автоматически в отличие от вызова `new TypedArray()` (где буфер создастся автоматически).
1. После создания `DataView` его настройки (буфер, смещение, длина) нельзя изменить.

</aside>

### Создание представления

Можно создать `DataView` для всего буфера:

```js
// Создаём буфер размером 16 байт
const buffer = new ArrayBuffer(16)

// Создаём представление для всего буфера
const dataView = new DataView(buffer)
```

Или для части буфера, указав смещение и длину:

```js
const buffer = new ArrayBuffer(16)

// Создаём представление, которое начинается
// со смещением на 2 байта от начала buffer и занимает 4 байта
const dataView = new DataView(buffer, 2, 4)
```

### Свойства

У `DataView` есть три основных свойства:

- `buffer` — ссылка на исходный `ArrayBuffer`;
- `byteOffset` — смещение представления от начала буфера в байтах;
- `byteLength` — размер представления в байтах.

### Методы

Методы `DataView` начинаются с `get` (чтение) или `set` (запись), а дальше указывается тип данных: `Uint8`, `Int16`, `Float32` и так далее.  

<aside>

⚠️ Обратите внимание:

Методы с приставкой `Uint` (например: `getUint8`, `setUint16`) работают с _беззнаковыми_ числами — они могут быть только неотрицательными. Методы с приставкой `Int` (`getInt8`, `setInt16`) — со _знаковыми_, которые могут быть отрицательными.

Если прочитать одни и те же байты как `Uint` и как `Int`, результаты будут отличаться. Например, байт `0xFF` как `Uint8` даст 255, а как `Int8` — -1.

</aside>

Рассмотрим на примере:

```js
// Создаем бинарный массив размером 4 байта
const buffer = new Uint8Array([0, 42, 0, 42]).buffer
const dataView = new DataView(buffer)

// Читаем 8-битное беззнаковое число с позиции 0
console.log(dataView.getUint8(0))
// 0

// Читаем 16-битное беззнаковое число с позиции 0 (оно состоит из двух байт)
console.log(dataView.getUint16(0))
// 42

// Читаем 32-битное беззнаковое число с позиции 0 (оно состоит из четырех байт)
console.log(dataView.getUint32(0))
// 2752554

// Записываем 0 на позицию 0 для 16-битного беззнакового числа
dataView.setUint16(0, 0)

// Теперь 32-битное число изменилось
console.log(dataView.getUint32(0))
// 42
```

Посмотреть список всех методов `DataView` можно в [спецификации](https://tc39.es/ecma262/multipage/structured-data.html#sec-dataview.prototype.constructor).

### Указание порядка байтов

_Порядок байтов (endianness)_ — это правило, определяющее, в каком порядке байты интерпретируются при формировании числа. Например, для двух байтов `[0x01, 0x02]` при порядке от старшего к младшему (_big-endian_) получится число `0x0102` (258), а при порядке от младшего к старшему (_little-endian_) — `0x0201` (513). По умолчанию `DataView` использует big-endian. Подробнее о памяти можно узнать из статьи «[Как устроена память](/tools/trivial-memory-model/)».

`DataView` позволяет явно указать порядок интерпритации байтов т. к. принимает флаг little-endian при чтении или записи. В обычных типизированных массивах такой возможности нет. Это особенно важно, когда вы читаете данные из внешнего источника (например, из файла или по сети), который использует порядок интерпритации байтов, отличный от порядка, принятого в вашей операционной системе. Например, в сетевых протоколах часто используется big-endian, а в операционных системах персональных компьютеров — little-endian и если не указать правильный порядок, числа будут прочитаны неверно. `DataView` позволяет легко подстроиться под нужный формат.

```js
const buffer = new ArrayBuffer(4)
const dataView = new DataView(buffer)

// Записываем беззнаковое число 123 с указанием порядка big-endian (false)
dataView.setUint16(0, 123, false)

// Читаем беззнаковое число с указанием порядка big-endian
console.log(dataView.getUint16(0, false))
// 123 - все верно

// Читаем беззнаковое число, как будто оно записано в порядке little-endian
console.log(dataView.getUint16(0, true))
// 31488 - получили другое число!
```

<details>
  <summary>Порядок байтов в используемом окружении</summary>

  Вот пример, как с помощью `DataView` можно узнать порядок интерпритации байтов в используемом окружении:

  ```js
  const littleEndian = (() => {
    const buffer = new ArrayBuffer(2)
    // Указываем, что данные записываются в формате little-endian (true) для знакового 16-битного числа
    new DataView(buffer).setInt16(0, 256, true)

    // Типизированные массивы используют порядок интерпритации байтов платформы
    return new Int16Array(buffer)[0] === 256
  })()

  // Вернет true для little-endian или false для big-endian
  console.log(littleEndian)
  ```

  По умолчанию `DataView` использует _big-endian_, но многие платформы работают и с _little-endian_.

  Например, _little-endian_ используется [в x86 процессорах](https://ru.wikipedia.org/wiki/X86#Основные_особенности_архитектуры) (Intel, AMD). [Архитектура ARM](https://ru.wikipedia.org/wiki/ARM_(архитектура)) тоже [чаще использует _little-endian_](https://ru.wikipedia.org/wiki/Порядок_байтов#Переключаемый_порядок).

  При этом популярные сетевые протоколы (TCP/IP, UDP) и форматы файлов (JPEG, PNG) [используют big-endian](https://ru.wikipedia.org/wiki/Порядок_байтов#Порядок_от_старшего_к_младшему). Поэтому важно контролировать порядок байтов.

</details>

## Как понять

`DataView` — это низкоуровневый инструмент. Он пригодится, когда нужно работать с бинарными данными: изображениями, аудио, видео или сетевыми запросами.

Его особенность — возможность указать порядок интерпритации байтов при чтении и записи. Это позволяет работать с данными, у которых порядок интерпритации байтов отличается от порядка интерпритации байтов в системе. А ещё `DataView` полезен, если в буфере хранятся данные разного типа (например, сами данные и служебная информация к ним).

### Выход за границы буфера

`DataView` сам следит за тем, чтобы вы не вышли за границы буфера. Если попытаться прочитать данные за пределами `ArrayBuffer`, возникнет ошибка `RangeError`.

```js
const buffer = new ArrayBuffer(2)
const dataView = new DataView(buffer)

console.log(dataView.getUint32(0))
// Ошибка: Uncaught RangeError: Offset is outside the bounds of the DataView
console.log(dataView.getUint16(1))
// Ошибка: Uncaught RangeError: Offset is outside the bounds of the DataView
```
