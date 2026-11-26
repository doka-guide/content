---
title: "`performance`"
description: "Изучаем, какие инструменты предоставляет браузер для измерения времени работы программ и функций."
baseline:
  - group: performance
    features:
      - api.performance
keywords:
authors:
  - mighty-peach
contributors:
  - nlopin
  - solarrust
related:
  - tools/how-the-browser-creates-pages
  - tools/multitasking-and-processes
  - tools/web-app-types
tags:
  - doka
---

## Кратко

Performance API — набор методов браузера, которые измеряют время работы кода. Методы доступны через глобальный объект `performance` и возвращают время в миллисекундах с дробной частью.

## Пример

### Создание меток и измерений

Получаем время, прошедшее с начала перехода на страницу:

```js
const t = performance.now()
console.log(t)
// 471359.4
```

Создаём именованную метку. Она сохраняет время в миллисекундах с начала перехода на страницу:

```js
const m = performance.mark('старт приложения')
console.log(m.startTime)
// 471360.5
```

Вычисляем время между двумя метками:

```js
performance.mark('начало')
performance.mark('конец')

const total = performance.measure('итого', 'начало', 'конец')
console.log(total.duration)
// Количество миллисекунд между метками 'начало' и 'конец'
```

### Работа с записанными данными

Получаем список меток и измерений:

```js
for (const entry of performance.getEntries()) {
  console.log(`
    Запись "${entry.name}", тип ${entry.entryType}.
    Старт в ${entry.startTime}мс,
    продолжительность ${entry.duration}мс
  `)
}
```

Очищаем список меток и измерений:

```js
performance.clearMeasures()
performance.clearMarks()
```

## Как пишется

### Создание меток

Метка (mark) — именованная отметка времени. Она хранит, сколько миллисекунд прошло с начала перехода на страницу до её создания. Начало перехода — это, например, клик по ссылке или подтверждение URL в адресной строке.

Первым аргументом `mark()` передают строку — имя метки. По этому имени метку потом можно найти:

```js
const markName = 'старт выполнения функции'
performance.mark(markName)

const entries = performance.getEntriesByName(markName)
console.log(entries)
```

Объект метки содержит значение `mark` в поле `entryType`.

### Создание измерений

Измерение (measure) — разница во времени между двумя метками. Метод `performance.measure()` принимает до трёх аргументов:

- имя измерения;
- имя первой метки, необязательно; если не указать, отсчёт пойдёт от начала перехода на страницу;
- имя второй метки, необязательно; если не указать, концом измерения будет вызов `performance.now()` в момент создания измерения.

Метод `measure()` возвращает созданное измерение — объект `PerformanceMeasure`.

Вместо имён меток вторым аргументом можно передать объект с настройками:

- `start` — начало измерения: имя метки или время в миллисекундах;
- `end` — конец измерения: имя метки или время в миллисекундах;
- `duration` — продолжительность в миллисекундах;
- `detail` — любые свои данные, они сохранятся в измерении.

```js
const markOne = 'метка_1'
const markTwo = 'метка_2'
performance.mark(markOne)
performance.mark(markTwo)

const m1 = performance.measure('с начала перехода')
const m2 = performance.measure('от первой метки', markOne)
const m3 = performance.measure(
  'между метками',
  markOne,
  markTwo
)
const m4 = performance.measure('с настройками', {
  start: markOne,
  end: markTwo,
  detail: { page: 'главная' }
})

console.log({ m1, m2, m3, m4 })
```

В объекте должно быть `start` или `end`. `duration` указывают вместе с одним из них, все три сразу передать нельзя. Если правила нарушить, браузер выбросит [`TypeError`](/js/errors/).

### Способы получения меток и измерений

Получить измерения и метки можно тремя способами:

1. `performance.getEntries()` — получить список всех меток и измерений, включая записываемые браузером;
1. `performance.getEntriesByType(тип)` — получить список из записей заданного типа, например, `mark` или `measure`;
1. `performance.getEntriesByName(имя)` — получить список из записей с указанным именем.

Любой из способов вернёт массив записей:

```js
const mark = performance.mark('старт')
const measure = performance.measure('прошло со старта', 'старт')
const entries = performance.getEntries()
const byName = performance.getEntriesByName('прошло со старта')
const onlyMarks = performance.getEntriesByType('mark')

console.log(entries)
console.log(byName)
console.log(onlyMarks)
```

### Способы очистить записи

Записи хранятся, пока страница открыта. Метки и измерения с одинаковыми именами не перезаписывают друг друга: `getEntriesByName()` вернёт их все.

Если страницу долго не перезагружают, записи копятся в памяти. Поэтому старые метки и измерения стоит удалять, особенно если имена повторяются или создаются динамически. Для этого есть несколько методов.

`performance.clearMarks(имя_метки)` — очистить все записанные метки с переданным именем. Если имя не передать, метод удалит все метки, созданные методом `performance.mark()`.

`performance.clearMeasures(имя_измерения)` — очистить все записанные измерения с переданным именем. Если имя не передать, метод удалит все измерения, созданные методом `performance.measure()`.

`performance.clearResourceTimings()` — очистить записи типа `resource`. Браузер создаёт их, когда загружает внешние ресурсы: CSS, скрипты, запросы к API. Метки и измерения метод не трогает.

```js
const mark = performance.mark('метка')
const measure = performance.measure('измерение')

console.log(performance.getEntriesByName('метка').length)
// 1

performance.clearMarks('метка')
performance.clearMeasures('измерение')

console.log(performance.getEntriesByName('метка').length)
// 0

performance.clearResourceTimings()
```

Записи `resource` браузер хранит в буфере. По спецификации в нём помещается не меньше 250 записей. Когда буфер заполнен, браузер вызывает событие `resourcetimingbufferfull`. Если в обработчике события не очистить буфер или не увеличить его методом `performance.setResourceTimingBufferSize()`, новые записи пропадут.

## Как понять

Когда нужно проверить скорость работы кода, провести тесты производительности или найти узкие места, используйте Performance API.

<aside>

⏱ Время можно измерить и через [`Date.now()`](/js/date/): разница двух вызовов покажет время работы функции. Но `Date.now()` зависит от системных часов. Если часы переведут во время замера, результат будет неверным, даже отрицательным. Время `performance.now()` только растёт и не зависит от системных часов. Оно точнее, а метки можно назвать через `performance.mark()`.

</aside>

Время в Performance API имеет тип `DOMHighResTimeStamp`. Его точность зависит от браузера и настроек страницы:

- по спецификации браузер округляет время не точнее, чем до 0,1 мс;
- на странице, изолированной от чужих источников (с заголовками `Cross-Origin-Opener-Policy` и `Cross-Origin-Embedder-Policy`), — до 5 микросекунд;
- браузер может округлять и грубее: Firefox по умолчанию округляет до 1 мс.

Performance API хранит записи разных типов. Тип записи хранится в поле `entryType`:

- `mark` — именованная метка времени;
- `measure` — измерение, продолжительность между двумя метками;
- `element` — время отрисовки картинок и текстовых блоков с атрибутом `elementtiming`;
- `navigation` — один объект с данными об этапах загрузки страницы, например, `domInteractive` и `loadEventEnd`;
- `resource` — время загрузки внешних ресурсов (CSS, запросы к API);
- `paint` — время первой отрисовки (`first-paint`) или первой отрисовки контента (`first-contentful-paint`), Safari записывает только вторую;
- `longtask` — участки работы главного потока дольше 50 мс, их записывает [Long Tasks API](https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API);
- `largest-contentful-paint`, `layout-shift`, `event` — данные для Core Web Vitals, ключевых метрик Google: скорости загрузки, стабильности вёрстки и отзывчивости.

Метки и измерения мы создаём сами. Записи остальных типов создаёт браузер.

Записи `element`, `longtask`, `largest-contentful-paint`, `layout-shift` и `event` нельзя получить через `getEntries()`. Их получает только `PerformanceObserver` — наблюдатель, который получает новые записи по мере появления.

Чтобы наблюдатель получил и записи, созданные до его подключения, передайте в `observe()` настройку `buffered: true`:

```js
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.entryType, entry.startTime)
  }
})

observer.observe({
  type: 'largest-contentful-paint',
  buffered: true
})
```
