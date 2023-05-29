---
title: "Intl.DateTimeFormat"
description: "объект для форматирования даты и времени с учётом локали"
authors:
  - AntonGorelov
related:
  - "js/date"
tags:
  - doka
---

## Кратко

`Intl.DateTimeFormat` - объект, содержащий функции форматирования даты и времени с учётом локали.

Включает следующие параметры:

1. `locales` представляет код или массив языковых кодов.
2. `options` представляет дополнительный набор опций.

## Как понять

Форматирование объекта [`Date`](/js/date) — настоящая головная боль. Если есть такая задача, этот встроенный объект позволяет отображать дату в нужном формате, не подключая дополнительные библиотеки.

Также этот способ поддерживается всеми современными браузерами.

## Пример

Создадим экземпляр даты и на его основе рассмотрим несколько способов форматирования.

```js
const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));
```

Стандартное форматирование, в зависимости от локали:

```js
console.log(new Intl.DateTimeFormat('en-US').format(date)); 
// "12/20/2020" 
```

```js
console.log(new Intl.DateTimeFormat("ru", {
  weekday: "short", 
  year: "2-digit", 
  month: "long", 
  day: "numeric"}).format(date)) 
// сб, 5 апреля 14 г.
```

Укажем формат даты и времени, используя параметр style (full, long, medium, short):

```js
console.log(new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Australia/Sydney' }).format(date));
// "Sunday, 20 December 2020 at 14:23:16 GMT+11"
```

## Как пишется

`new Intl.DateTimeFormat([locales[, options]])`

### Опции

- `timeZone` - значение часового пояса: `UTC`, `America/New_York`, `Europe/Paris` и т.д.
- `calendar` - значение выбранного календаря: `chinese`, `gregory`, `indian` и т.д.
- `numberingSystem`	- используемая система счисления: `arab`, `beng`, `latin` и т.д.
- `localeMatcher` - алгоритм для согласования выбранной локали:
	- `lookup` - поиск следует алгоритму поиска, определённому в [BCP 47](https://tools.ietf.org/html/rfc4647#section-3.4), 
	- `best fit` - (наилучший подходящий) позволяет среде выполнения выбрать локаль.
- `formatMatcher`	алгоритм для форматирования: basic, best fit.
- `hour12`	если имеет значение true, используется 12-часовой формат.
- `hourCycle`	часовой формат: h11, h12, h23, h24.
- `dateStyle`	стиль форматирования даты: full, long, medium, short.
- `weekday`	день недели: long, short, narrow.
- `day`	день месяца: numeric, 2-digit.
- `month`	месяц: numeric, 2-digit, long, short, narrow.
- `year`	год: numeric, 2-digit.
- `era`	эпоха: long, short, narrow.
- `timeStyle`	стиль форматирования времени: full, long, medium, short.
- `hour`	часы: numeric, 2-digit.
- `minute`	минуты: numeric, 2-digit.
- `second`	секунды: numeric, 2-digit.
- `dayPeriod`	часть дня (утро, вечер и т.п.): narrow, short, long.
- `timeZoneName`	название часового пояса (UTC, PTC): long, short.

### Методы

`Intl.DateTimeFormat.prototype.format()` - геттер, который форматирует дату, в соответствии с языковым стандартом и параметрами форматирования этого объекта DateTimeFormat. Возвращает текущую дату в кратком виде (`dateStyle: short`).

```js
const date = Date.now();

const formatter = new Intl.DateTimeFormat('ru', {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
  timeZone: 'UTC'
});

formatter.format(date);
// суббота, 27.05.2023 г., 10:55:18 PM
```

`Intl.DateTimeFormat.prototype.formatToParts()` - форматирует передаваемую строку по частям с учётом `DateTimeFormat`. Возвращает массив объектов, представляющих строку даты в частях, которые можно использовать для настраиваемого форматирования с учётом локали.

```js
formatter.formatToParts(date);
```

```js
[
	{type: 'weekday', value: 'суббота'},
	{type: 'literal', value: ', '},
	{type: 'day', value: '27'},
	{type: 'literal', value: '.'},
	{type: 'month', value: '05'},
	{type: 'literal', value: '.'},
	{type: 'year', value: '2023'},
	{type: 'literal', value: ' г., '},
	{type: 'hour', value: '10'},
	{type: 'literal', value: ':'},
	{type: 'minute', value: '55'},
	{type: 'literal', value: ':'},
	{type: 'second', value: '18'},
	{type: 'literal', value: ' '},
	{type: 'dayPeriod', value: 'PM'}
]
```

`Intl.DateTimeFormat.prototype.resolvedOptions()` - возвращает новый объект со свойствами, отражающими локаль и параметры форматирования, которые вычислены при инициализации объекта.

```js
{
	calendar: "gregory",
	day: "2-digit",
	hour: "numeric",
	hour12: true,
	hourCycle: "h11",
	locale: "ru",
	minute: "2-digit",
	month: "2-digit",
	numberingSystem: "latn",
	second: "2-digit",
	timeZone: "UTC",
	weekday: "long",
	year: "numeric"
}
```

`Intl.DateTimeFormat.prototype.formatRange()` -
получает две даты и форматирует диапазон дат наиболее кратким образом на основе языкового стандарта и параметров, предоставленных при создании экземпляра `DateTimeFormat`.

```js
const date1 = new Date(Date.UTC(2018, 0, 10, 10, 0, 0));
const currentDate = Date.now();

const fmt1 = new Intl.DateTimeFormat("en", {
  year: "2-digit",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

console.log(fmt1.formatRange(date1, currentDate));
// 1/10/18, 1:00 PM – 5/28/23, 2:08 AM
```

`Intl.DateTimeFormat.prototype.formatRangeToParts()` -
получает две даты и возвращает массив объектов, содержащих токены, зависящие от языкового стандарта, представляющие каждую часть отформатированного диапазона дат. Возвращает формат, аналогичный `formatToParts(date)`.

```js
const date1 = new Date(Date.UTC(2018, 0, 10, 10, 0, 0));
const currentDate = Date.now();

const dateTimeFormat = new Intl.DateTimeFormat('en', {
  hour: 'numeric',
  minute: 'numeric'
});

const parts = dateTimeFormat.formatRangeToParts(date1, currentDate);
for (const part of parts) {
  console.log(part);
}
```

```js
[
	{type: 'month', value: '1', source: 'startRange'},
	{type: 'literal', value: '/', source: 'startRange'},
	{type: 'day', value: '10', source: 'startRange'},
	{type: 'literal', value: '/', source: 'startRange'},
	{type: 'year', value: '2018', source: 'startRange'},
	{type: 'literal', value: ', ', source: 'startRange'},
	{type: 'hour', value: '1', source: 'startRange'},
	{type: 'literal', value: ':', source: 'startRange'},
	{type: 'minute', value: '00', source: 'startRange'},
	{type: 'literal', value: ' ', source: 'startRange'},
	{type: 'dayPeriod', value: 'PM', source: 'startRange'},
	{type: 'literal', value: ' – ', source: 'shared'},
	{type: 'month', value: '5', source: 'endRange'},
	{type: 'literal', value: '/', source: 'endRange'},
	{type: 'day', value: '29', source: 'endRange'},
	{type: 'literal', value: '/', source: 'endRange'},
	{type: 'year', value: '2023', source: 'endRange'},
	{type: 'literal', value: ', ', source: 'endRange'},
	{type: 'hour', value: '12', source: 'endRange'},
	{type: 'literal', value: ':', source: 'endRange'},
	{type: 'minute', value: '41', source: 'endRange'},
	{type: 'literal', value: ' ', source: 'endRange'},
	{type: 'dayPeriod', value: 'PM', source: 'endRange'}
]
```

### Преобразование в ISO формат

Объект [`Date`](/js/date) содержит метод [`toISOString()`](/js/date/#avtokorrekciya-daty), который возвращает строку в формате ISO (расширенный формат [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html)), который можно описать следующим образом: `YYYY-MM-DDTHH:mm:ss.sssZ`. Часовой пояс всегда равен UTC, что обозначено суффиксом "Z".

Объект `Intl.DateTimeFormat` не содержит подобного метода. При попытке указать формат `iso8601` возникает следующая ошибка:

```js
const date = new Date();
const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
};
const isoDate = new Intl.DateTimeFormat(['iso8601'], options).format(date);

// Uncaught RangeError: Incorrect locale information provided at new DateTimeFormat...
```

Почему возникает такая ошибка, а объект не позволяет конвертировать в нужный формат?

Идея, реализуемая Intl, в том, чтобы вернуть дату в формате, который соответствует условиям указанной локали. Intl не предоставляет способа указать определённые шаблоны форматирования. Другими словами, формат [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) не соответствует какой-либо конкретной локали.

Следовательно, преобразовать можно вручную.

```js
const date = new Date();
const dateOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};
const formattedDate = new Intl.DateTimeFormat('en-ca', dateOptions).format(date);

const timeOptions = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hourCycle: 'h24',
}
const formattedTime = new Intl.DateTimeFormat('en-ca', timeOptions).format(date);
const dateTime = `${formattedDate}T${formattedTime}Z`;
// '2023-05-29T15:00:00Z'
```