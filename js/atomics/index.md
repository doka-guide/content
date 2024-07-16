---
title: "`Atomics`"
description: "Специальный объект, который содержит статические методы для выполнения атомарных операций."
authors:
  - doka-dog
  - vsezol
related:
  - js/array-isarray
  - js/arrays
  - js/shared-array-buffer
tags:
  - doka
---

## Кратко

`Atomics` — объект, который содержит статические методы для выполнения атомарных операций.

Потребность в использовании атомарных операций возникает при работе с `SharedArrayBuffer`, благодаря которому появляется возможность разделения общей памяти между потоками. При работе с общей памятью есть риск возникновения состояния гонки (race condition) без контроля доступа к общему состоянию.

При правильном использовании `Atomics` мы [можем гарантировать](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics#atomic_operations), что изменения записываются и читаются, а операции не прерываются и завершаются до начала следующей.

Рассмотрим пример, позволяющий лучше понять важность применения атомарных операций.

```js
const buffer = new SharedArrayBuffer(1024);
const sharedMemory = new Int32Array(buffer);

sharedMemory[0] = sharedMemory[0] + 5

// Эквивалентная запись (только при выполнении в одном потоке)
let temp = sharedMemory[0]
temp += 5
sharedMemory[0] = temp
```

При работе в одном потоке, как все мы привыкли, в такой записи не будет проблемы. Потому что в одном потоке в единый момент времени выполняется только одна функция. При работе с общей памятью подобной гарантии нет. Пока в одном потоке увеличивается значение переменной `temp`, другой поток успевает изменить значение `sharedMemory[0]`.
Для решения этой проблемы можно использовать метод `Atomics.add` и `Atomics.load`.

```js
const buffer = new SharedArrayBuffer(1024);
const sharedMemory = new Int32Array(buffer);

Atomics.add(sharedMemory, 0, 5)
// 0

Atomics.load(sharedMemory, 0)
// 5
```

## Использование `Atomics`

`Atomics` — многофункциональный инструмент, необходимый для работы с многопоточностью. К сожалению, он очень не прост в использовании из-за низкоуровнего API. По этой причине в чистом виде `Atomics` применяют не часто. Часто проще использовать более высокоуровневое API, построенное на `Atomics`.

Один из распространённых паттернов многопоточного программирования — критические секции. Вы можете знать о таких примитивах из других языков программирования, как: `Mutex`, `Semaphore`, `ReadWriteLock` и других. Их возможно реализовать и в JavaScript. Для того чтобы лучше понять область применения `Atomics`, рассмотрим пример получения состояния гонки.

### Как получить состояние гонки

Допустим, у нас есть общая переменная. В одном потоке хотим 10 000 000 раз увеличить её на 1, а в другом 10 000 000 раз уменьшить на 1. Что мы получим в результате? 0?

> В примерах специально опущены детали передачи данных между потоками, потому что это [отдельная тема](/js/web-workers/)

```js
// Главный поток (main thread)

// Инициализируем память
const buffer = new SharedArrayBuffer(1024);
const sharedMemory = new Int32Array(buffer);

// Отправка данных в worker...

for (let i = 0; i < 10_000_000; i++) {
  sharedMemory[0] = sharedMemory[0] + 1
}

// Worker
// Получаем данные из main thread
const sharedMemory = new Int32Array(buffer);

for (let i = 0; i < 10_000_000; i++) {
  sharedMemory[0] = sharedMemory[0] - 1
}
```

Вывод в консоль может выглядеть как в примере ниже, но каждый раз он будет случайным, все будет зависить от того, что у системного планировщика на уме.

```
> Main Thread Started: 0
> Worker Started: 352
> Main Thread Finished: -2573302
> Worker Finished: -2741254
```

### Разрешение состояния гонки

При разрешении состояния гонки мы можем использовать `Mutex`. `Mutex` обеспечивает механизм критических секций. Критическая секция — это часть кода между вызовами блокировки и разблокировки доступа к общему состоянию. Проще говоря, `Mutex` позволяет только одному потоку в единый момент времени владеть общим состоянием (SharedArrayBuffer в контексте JavaScript).

Если кратко, то:

- У `Mutex` есть два состояния «заблокирован» и «разблокирован».
- Пока `Mutex` заблокирован, остальные потоки ожидают получения права на блокировку общего состояния.
- В момент разблокировки `Mutex` уведомляет один ожидающий поток.
- `Mutex` не может быть разблокирован дважды.

### Реализация `Mutex` на `Atomics`

В JavaScript `Mutex` на `Atomics` реализуется разными способами. Самый распространённый основан на методах `Atomics.wait`, `Atomics.waitAsync`, `Atomics.compareExchange` и `Atomics.notify`. Посмотрим на такую реализацию.

```js
const INDEX = 0
const UNLOCKED = 0
const LOCKED = 1

class Mutex {
  constructor(sharedArrayBuffer) {
    this.arrayView = new Int32Array(sharedArrayBuffer)
  }

  lock() {
    while (true) {
      const oldValue = Atomics.compareExchange(
        this.arrayView,
        INDEX,
        UNLOCKED,
        LOCKED
      )

      if (oldValue === UNLOCKED) {
        return
      }

      Atomics.wait(this.arrayView, INDEX, LOCKED)
    }
  }

  unlock() {
    const oldValue = Atomics.compareExchange(
      this.arrayView,
      INDEX,
      LOCKED,
      UNLOCKED
    )

    if (oldValue === UNLOCKED) {
      throw new Error('Mutex уже был разблокирован!')
    }

    Atomics.notify(this.arrayView, INDEX, 1)
  }

  executeLocked(callback) {
    const tryGetLock = async () => {
      while (true) {
        const oldValue = Atomics.compareExchange(
          this.arrayView,
          INDEX,
          UNLOCKED,
          LOCKED
        );

        if (oldValue === UNLOCKED) {
          callback();
          this.unlock()

          return
        }

        const result = Atomics.waitAsync(this.arrayView, INDEX, LOCKED)

        await result.value
      }
    }

    tryGetLock()
  }
}
```

Состояние `Mutex` может принимать значения `LOCKED = 1` и `UNLOCKED = 0` и хранится по индексу `INDEX = 0`. Учитывайте, что в коде используем `Int32Array` для хранения состояния, потому что некоторые атомарные операции, такие как `Atomics.wait`, `Atomics.notify` и другие, работают только с `Int32Array` или `BigInt64Array`.

Метод `lock` пытается перевести `Mutex` в заблокированное состояние. Это делается с помощью `Atomics.compareExchange` и `Atomics.wait`. Благодаря `Atomics.compareExchange`, состояние изменяется на заблокировано только в том случае, если оно было разблокировано. `Atomics.compareExchange` возвращает предыдущее состояние. Его используют, чтобы проверить, удалось ли получить блокировку или нет. Если нет, то с помощью `Atomics.wait` ожидаем, пока кто-нибудь не разблокирует `Mutex` и не уведомит нас об этом.

С методом `unlock` всё проще. Состояние изменится на разблокировано только в том случае, если оно было заблокировано. В ином случае выкидывается ошибка. Далее, с помощью `Atomics.notify`, один ожидающий агент уведомляется о возможности получения блокировки. Если ожидающих агентов нет, уведомление игнорируется.

Метод `executeLocked` реализован по аналогии с `lock`, но он асинхронный, чтобы использовать его в главном потоке (main thread).

### Применение `Mutex` на `Atomics`

Вот так можно использовать `Mutex`, построенный на `Atomics`, для разрешения состояния гонки.

```js
// Главный поток (main thread)
const buffer = new SharedArrayBuffer(1024);
const sharedMemory = new Int32Array(buffer);

const mutexBuffer = new SharedArrayBuffer(4)
const mutex = new Mutex(mutexBuffer)

// Отправка данных в worker...

for (let i = 0; i < 10_000_000; i++) {
  // Асинхронно получаем блокировку
  mutex.executeLocked(() => {
    sharedMemory[0] = sharedMemory[0] + 1
  })
}

// Worker
// Получаем данные из main thread
const sharedMemory = new Int32Array(buffer);
const mutex = new Mutex(mutexBuffer)

for (let i = 0; i < 10_000_000; i++) {
  // Синхронно получаем блокировку
  mutex.lock()
  sharedMemory[0] = sharedMemory[0] - 1
  mutex.unlock()
}
```

Ниже пример вывода в консоль. Вне зависимости от ресурсов компьютера или очерёдности работы потоков, в результате всегда будет 0. Так поисходит благодаря `Mutex` и, в частности, `Atomics`. Потоки по очереди получают блокировку и изменяют состояние.

```
> Main Thread Started: 0
> Worker Started: 0
> Main Thread Finished: 3232452
> Worker Finished: 0
```

Конечно, в идеальной ситуации `Mutex` встраивается в структуру данных, с которой работаем. Предыдущий пример просто показывает, как используют `Atomics` в JavaScript.

## Статические методы

`Atomics.add` прибавляет заданное значение по индексу, возвращает предыдущее значение.

`Atomics.sub` вычитает заданное значение по индексу, возвращает предыдущее значение.

`Atomics.and` вычисляет побитовое «И» с заданным значением и значением по индексу. Возвращает предыдущее значение.

`Atomics.or` вычисляет побитовое «ИЛИ» с заданным значением и значением по индексу. Возвращает предыдущее значение.

`Atomics.xor` вычисляет побитовое исключающее «ИЛИ» с заданным значением и значением по индексу. Возвращает предыдущее значение.

`Atomics.compareExchange` обновляет значение по индексу только если оно равно указанному значению. Возвращает предыдущее значение.

`Atomics.exchange` обновляет заданное значение по индексу, возвращает предыдущее значение.

`Atomics.load` возвращает значение по индексу.

`Atomics.notify` уведомляет о числе агентов, ожидающих по указанному индексу. Возвращает число уведомлённых агентов.

`Atomics.store` сохраняет заданное значение по индексу, возвращает сохранённое значение.

`Atomics.wait` проверяет значение по индексу и уходит в режим ожидания до уведомления о пробуждении или истечения времени ожидания. Нельзя использовать в главном потоке в большинстве браузеров, так как является блокирующим.

`Atomics.waitAsync` — неблокирующий аналог `Atomics.wait`, возвращает `Promise`.
