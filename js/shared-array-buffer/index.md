---
title: "`SharedArrayBuffer`"
description: "Объект с бинарными данными для разделяемой области памяти."
baseline:
  - group: shared-memory
    features:
      - javascript.builtins.SharedArrayBuffer
  - group: resizable-buffers
    features:
      - javascript.builtins.SharedArrayBuffer.grow
authors:
  - solarrust
keywords:
  - typed array
  - indexed collection
  - javascript collection
related:
  - js/arrays
  - js/typed-array
  - js/data-view
tags:
  - doka
---

## Кратко

Объект, который содержит буфер с бинарными данными. В отличие от [`ArrayBuffer`](/js/array-buffer/), его память можно разделить между основным потоком и [воркерами](/js/web-workers/). Все они читают и пишут в один и тот же буфер, без копирования.

Сам по себе буфер нельзя читать и менять. Для этого поверх него создают [типизированный массив](/js/typed-array/), например `Int32Array`, или [`DataView`](/js/data-view/).

⚠️ `SharedArrayBuffer` доступен, только если страница изолирована от других источников. Подробнее — в разделе «Как пишется».

## Пример

```js
// Основной поток
const sab = new SharedArrayBuffer(1024)
const counter = new Int32Array(sab)

const worker = new Worker('worker.js')
worker.postMessage(sab)

// worker.js
self.addEventListener('message', (event) => {
  const counter = new Int32Array(event.data)
  Atomics.add(counter, 0, 1)
})

// Основной поток, чуть позже
// Изменение видно в разделяемой памяти без всяких сообщений
console.log(Atomics.load(counter, 0))
// 1
```

[`Atomics`](/js/atomics/) безопасно меняет и читает значения в разделяемой памяти. Зачем он нужен, разбираем в разделе «Как понять».

## Как пишется

`SharedArrayBuffer` создают через оператор `new`. Первый аргумент задаёт размер буфера в байтах. Второй аргумент необязательный: в нём указывают максимальный размер, до которого буфер сможет увеличиться. Без второго аргумента размер буфера фиксированный.

```js
const buffer = new SharedArrayBuffer(8, { maxByteLength: 16 })

buffer.grow(12)
```

Буфер передают в выделенный воркер (`Worker`) методом `postMessage()`. Service Worker и Shared Worker разделяемую память получить не могут: по спецификации вместо сообщения у них сработает событие `messageerror`.

Браузеры дают доступ к `SharedArrayBuffer` при двух условиях:

- страница открыта по HTTPS или на `localhost`;
- страница изолирована от других источников (_cross-origin isolated_). Источник — это сочетание протокола, домена и порта.

Для изоляции сервер отдаёт страницу с двумя заголовками:

```http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

Скрипт воркера сервер тоже отдаёт с заголовком `Cross-Origin-Embedder-Policy`. Иначе браузер не загрузит воркер на изолированной странице.

Проверить, изолирована ли страница, можно через свойство `crossOriginIsolated`:

```js
if (crossOriginIsolated) {
  const sab = new SharedArrayBuffer(1024)
} else {
  console.log('Страница не изолирована')
}
```

Изоляция защищает от атак вроде Spectre. Такой атаке нужен точный таймер, и `SharedArrayBuffer` его даёт: воркер в цикле увеличивает счётчик в разделяемой памяти, а основной поток его читает. С таким таймером атака читает чужие данные в памяти [процесса](/tools/multitasking-and-processes/) страницы, например картинки и скрипты других сайтов. На изолированной странице в процесс не попадает ничего чужого без разрешения.

`Cross-Origin-Opener-Policy` разрывает связь страницы с окнами других источников:

- `window.opener` становится `null`;
- у окна, которое вернул [`window.open()`](/js/window-open/), свойство `closed` сразу равно `true`.

Поэтому ломаются попапы с других источников, которые общаются со страницей через `window.opener`. Например, окна входа через соцсети и оплаты.

`Cross-Origin-Embedder-Policy` запрещает загружать ресурсы с других источников, если они явно этого не разрешили. Разрешение дают через [CORS](/tools/cors/) или заголовок `Cross-Origin-Resource-Policy`.

Если изоляция ломает попапы или загрузку чужих ресурсов:

- `Document-Isolation-Policy` изолирует страницу без `Cross-Origin-Opener-Policy`, и попапы продолжают работать. Это экспериментальный заголовок в Chrome и Edge с версии 137. Firefox и Safari его пока не поддерживают.
- `Cross-Origin-Embedder-Policy: credentialless` вместо `require-corp` загружает чужие ресурсы без разрешения, но без [кук](/js/cookie/). Его поддерживают Chrome, Edge и Firefox, но не Safari.
- `Cross-Origin-Opener-Policy: same-origin-allow-popups` не подойдёт. Попапы с ним работают, но страница не изолирована, и `SharedArrayBuffer` недоступен.

### Свойства

- `byteLength` — размер буфера в байтах.
- `growable` — может ли буфер увеличиваться. Возвращает `true` или `false`.
- `maxByteLength` — максимальный размер, до которого может увеличиться `SharedArrayBuffer`.

### Методы

- `grow()` — увеличивает размер буфера до указанного числа байтов. Уменьшить буфер нельзя.
- `slice()` — возвращает новый `SharedArrayBuffer` с копией байтов от одного индекса до другого.

## Как понять

Буфер — пространство в памяти, где хранятся бинарные данные. Про память подробнее узнаете из статьи «[Как устроена память](/tools/trivial-memory-model/)».

Обычный `ArrayBuffer` при передаче в воркер через `postMessage()` не делится:

- по умолчанию браузер скопирует данные, и потоки будут работать с разными копиями;
- если указать буфер в списке передачи, во втором аргументе `postMessage()`, основной поток потеряет к нему доступ.

_Разделяемая, или общая, память (shared memory)_ — это один участок памяти, к которому одновременно обращаются несколько потоков. Такую память и даёт `SharedArrayBuffer`.

Если два потока одновременно меняют одно и то же значение, одно из изменений может потеряться. Чтобы этого не случилось, для разделяемой памяти используют атомарные операции объекта `Atomics`: `Atomics.add()`, `Atomics.load()`, `Atomics.store()` и другие. Каждая такая операция выполняется целиком, и другой поток не может вмешаться посередине.
