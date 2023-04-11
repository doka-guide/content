---
title: "`performance`"
description: "Изучаем, какие инструменты предоставляет браузер для измерения времени работы программ и функций."
keywords:
authors:
  - mighty-peach
contributors:
  - nlopin
related:
  - tools/how-the-browser-creates-pages
  - tools/multitasking-and-processes
  - tools/web-app-types
tags:
  - doka
---

## Кратко

Performance API — это API браузера, позволяющее измерять время работы программы при помощи различных методов. Для этого используется очень точный тип измерения времени – `DOMHighResTimeStamp`, работающий с точностью до 5 микросекунд (в одной миллисекунде их тысяча).

## Пример

### Создание меток и измерений

Получаем время, прошедшее с начала навигации на страницу

```js
const t = performance.now()
console.log(t)
// 471359
```

Создаём именованную метку времени, сохраняющую время в миллисекундах с начала навигации на страницу. Это полезно для измерения работы программы, например, можно вычислить разницу между метками и узнать время работы функции.

```js
performance.mark('старт приложения')
console.log(t)
```

Вычисляем время между двумя метками:

```js
const start = performance.mark('начало')
const finish = performance.mark('конец')

performance.measure('итого', 'начало', 'конец')
console.log(performance.getEntriesByName('итого')[0].duration)
// количество миллисекунд между метками 'начало' и 'конец'
```

### Работа с записанными данными

Получаем список меток и измерений:

```js
for (const entry of performance.getEntries()) {
  console.log(`
    Запись "${entry.name}", тип ${entry.entryType}.
    Старт в ${entry.startTime}мс, продолжительность ${entry.duration}мс
  `)
}
```

Очищаем список меток и измерений:

```js
performance.clearMeasures()
performance.clearMarks()
```

Или можем очистить всё сразу:

```js
performance.clearResourceTimings()
```

## Как пишется

### Создание меток

Метка (mark) — время с начала перехода на страницу до создания метки в миллисекундах. Например, от клика по ссылке или после подтверждения введённого урла в строку поиска.

При создании меток мы можем передать первым аргументом строку - имя метки. В дальнейшем, мы можем обращаться к этому имени для поиска.

```js
const markName = 'старт выполнения функции'
performance.mark(markName)

const entries = performance.getEntriesByName(markName)
console.log(entries)
```

Объект метки содержит значение `mark` в поле `entryType`.

### Создание измерений

Измерение (measure) - разница во времени между двумя метками. Измерение принимает несколько аргументов:

1. Имя измерения;
1. Имя первой метки - необязательный параметр, если не указать, то первой меткой будет время со старта навигации на страницу;
1. Имя второй метки - необязательный параметр, если не указать, то второй меткой будет вызов `performance.now()` в момент создания измерения.

В Firefox и некоторых мобильных браузерах вызов метода `measure()` не возвращает полученное измерение и его нужно запрашивать вручную с помощью `getEntriesByName()`. Следите за [таблицей поддержки](https://caniuse.com/mdn-api_performance_measure_returns_undefined).

```js
const markOne = 'метка_1'
const markTwo = 'метка_2'
performance.mark(markOne)
performance.mark(markTwo)

performance.measure('время со старта навигации на странице')
performance.measure('от первой метки до сейчас', markOne)
performance.measure('время между двумя метками', markOne, markTwo)


const m1 = performance.getEntriesByName('время со старта навигации на странице')[0]
const m2 = performance.getEntriesByName('от первой метки до сейчас')[0]
const m3 = performance.getEntriesByName('время между двумя метками')[0]

console.log({ m1, m2, m3 })
```

### Способы получения меток и измерений

Получить измерения и метки можно тремя разными способами:

1. `performance.getEntries()` - получить список всех меток и измерений, включая записываемые браузером.
1. `performance.getEntriesByType(тип)` - получить список из записей заданного типа, например, `mark` или `measure`.
1. `performance.getEntriesByName(имя)` - получить список из записей с указанным именем.

<details>
  <summary>Подробнее про метки автоматически записываемые браузером</summary>

  Для улучшения анализа производительности страницы, браузер автоматически записывает некоторые метки:
  1. `navigation` – события навигации браузера `domComplete`, `loadEventStart`, `loadEventEnd`, `redirectCount`, `domContentLoadedEventStart`, `domContentLoadedEventEnd`, `domInteractive`, `requestStart`, `responseStart`, `unloadEventEnd`, `unloadEventStart`.
  1. `resource` – содержат информацию о загрузке ресурсов сайтом. Например, можно узнать про загрузку стилей или выполнение запросов к API.
  1. `paint` – информация о рендере страницы, например, время отрисовки первого контента – `first-paint`, `first-contentful-paint`.

</details>

Любой из способов вернёт массив записей:

```js
const mark = performance.mark('старт')
const measure = performance.measure('прошло со старта', 'старт')
const entries = performance.getEntries()
const entriesByName = performance.getEntriesByName('прошло со старта')
const onlyMarks = performance.getEntriesByType('mark')

console.log(entries)
console.log(entriesByName)
console.log(onlyMarks)
```

### Способы очистить записи

Метки и измерения с одинаковыми именами не перезаписывают друг друга. Если одно и то же имя может использоваться в разных частях кода, например, если имена создаются динамически, может быть полезно удалять уже созданные метки перед записью новых с тем же именем. Очистить записанные метки и измерения можно разными методами:

1. `performance.clearMarks(имя_метки)` - очистить все записанные метки с переданным именем. Если имя не передать, то удалятся все метки, созданные методом `performance.mark()`.
1. `performance.clearMeasures(имя_измерения)` - очищаем все записанные измерения с переданным именем. Если имя не передать, то удалятся все измерения, созданные методом `performance.measure()`.
1. `performance.clearResourceTimings()` - очистить все метки, связанные с загрузкой ресурсов браузером.

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

## Как понять

Когда нужно проверить скорость работы кода, провести тесты производительности или найти узкие места — на помощь приходит Performance API с его удобными методами и точностью измерений.

<aside>

⏱ Для измерения времени мы можем так же использовать класс `Date` с его методом `Date.now()`, возвращающий `timestamp` – текущее время в миллисекундах. Сохранив в переменные два вызова `Date.now()` (например, перед функцией и после) мы можем вычислить разницу и узнать время работы функции. Но Performance API предоставляет удобные функции для работы со временем, позволяет именовать сохранённые метки времени и обладает большей точностью.

</aside>

Performance API представляет собой реестр записей. Записи бывают разных типов:

- `mark` — именная метка времени;
- `measure` — измерение. Продолжительность между двумя метками;
- `element` — время загрузки элементов;
- `navigation` — для записей, связанных с навигацией по сайту;
- `resource` — время получение внешних ресурсов (css, запросы API);
- `paint` — время первой отрисовки (first paint), либо первой отрисовки контента (first contentful paint);
- `longtask` — время работы задачи из [LongTasks API](http://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API);

Тип записи хранится в поле `entryType`. В ручном режиме мы работаем с метками и измерениями.
