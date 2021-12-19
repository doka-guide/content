---
title: "`performance`"
description: ""
keywords:
  - performance
authors:
  - mighty-peach
tags:
  - doka
---

## Кратко

`Performance.API` — это API браузера, позволяющее измерять время работы программы при помощи различных методов. Для этого используется очень точный тип измерения времени – `DOMHighResTimeStamp`, работающий с точностью до 5 микросекунд (в 1 миллисекунде их 1000).

## Пример

Получаем время, прошедшее с начала навигации на страницу

```js
const t = performance.now()
console.log(t)
```

Создаём именованную метку времени

```js
const t = performance.mark('computing start')
console.log(t)
```

Вычисляем время между двумя метками

```js
const start = performance.mark('start')

const finish = performance.mark('finish')
const measure = performance.measure('measure between start and finish loading', 'start', 'finish')
console.log(measure)
```

Получаем список меток и измерений

```js
const entries = performance.getEntries()

for (let i = 0; i < entries.length; i += 1) {
  console.log(entries[i].name)
  console.log(entries[i].entryType)
  console.log(entries[i].startTime)
  console.log(entries[i].duration)
}
```

Очищаем список меток и измерений

```js
performance.clearMeasures()
performance.clearMarks()
```

Или можем очистить всё сразу

```js
performance.clearResourceTimings()
```

## Как понять

Когда нужно проверить скорость работы кода, провести тесты производительности или найти узкие места — удобнее всего использовать `Performance.API` с его удобными методами и точностью измерений.

## Как пишется

### Создание меток

Метка - время со старта навигации на страницу до создания метки в миллисекундах.

При создании меток мы можем передать первым аргументом строку - имя метки. В дальнейшем, мы можем обращаться к этому имени для поиска.

```js
const markName = 'start evaluate function'
performance.mark(markName)

const entries = performance.getEntriesByName(markName)
console.log(entries)
```

### Создание измерений

Измерение - разница во времени между двумя метками. Измерение принимает несколько аргументов:

1. Имя измерения - строка для поиска и именования измерения.
1. Имя первой метки - не обязательный параметр, если не указать, то первой меткой будет время со старта навигации на страницу.
1. Имя второй метки - не обязательный параметр, если не указать, то второй меткой будет вызов `performance.now()` в момент создания измерения.

```js
const mark_name_1 = 'mark_1'
const mark_name_2 = 'mark_2'
performance.mark(mark_name_1);
performance.mark(mark_name_2);

const m1 = performance.measure('measure between two marks', mark_name_1, mark_name_2)
const m2 = performance.measure('measure from navigation start'), undefined, performance.now())
const m3 = performance.measure('measure from mark_1 to now', mark_name_1)

console.log({ m1, m2, m3 })
```

### Способы получения меток и измерений

Мы можем получать наши измерения и метки тремя разными способами:

1. `performance.getEntries()` - получаем список всех меток и измерений, включая записываемые браузером.
1. `performance.getEntriesByType(entryType)` - возвращает список из сущностей заданного типа, например, “mark” или “measure”.
1. `performance.getEntriesByName(entryName)` - возвращает список из сущностей с указанными именем.

Любой из способов вернёт массив сущностей.

```js
const mark = performance.mark('start')
const measure = performance.measure('form start', 'start')
const entries = performance.getEntries()
const entriesByName = performance.getEntriesByName('from start')
const onlyMarks = performance.getEntriesByType('mark')

console.log(entries)
console.log(entriesByName)
console.log(onlyMarks)
```

### Способы очистить записи

Мы можем очистить записанные метки и измерения разными методами:

1. `performance.clearResourceTimings()` - очищаем все записанные метки и измерения, включая записанные браузером автоматически.
1. `performance.clearMarks()` - очищаем все записанные марки.
1. `performance.clearMeasures()` - очищаем все записанные измерения.

```js
const mark = performance.mark('mark')
const measure = performance.measure('measure')

performance.clearMarks()
performance.clearMeasures()
performance.clearResourceTimings()
```
