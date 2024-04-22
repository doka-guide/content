---
title: "`Intl.DateTimeFormat`"
description: "Объект для форматирования даты и времени с учётом локали."
authors:
  - antongorelov
related:
  - js/date
  - js/object
  - js/geolocation-api
tags:
  - doka
---

## Кратко

`Intl.DateTimeFormat` — объект, содержащий функции форматирования даты и времени с учётом локали.

Конструктор объекта принимает следующие параметры:

1. `locales` — код или массив идентификаторов локалей. Элементы этого массива могут обозначать язык, например, `en`, язык и регион, к примеру, `en-US`. Также используют дополнительные обозначения, например, `zh-Hans-CN` (китайский язык, упрощённый китайский скрипт и регион Китай).
1. `options` — дополнительные опции.

## Как понять

Форматирование объекта [`Date`](/js/date/) — настоящая головная боль. Чтобы красиво отображать дату и время, не обязательно подключать тяжеловесные сторонние библиотеки. Можно воспользоваться встроенным объектом `Intl.DateTimeFormat`.

Этот способ форматирования поддерживается всеми современными браузерами.

## Пример

Чтобы отобразить дату несколькими способами, создадим объект даты при помощи статического метода `Date.UTC()`. Этот метод возвращает количество миллисекунд с момента начала Unix-эпохи. `Date.UTC()` работает со [всемирным координатным временем (UTC)](https://ru.wikipedia.org/wiki/%D0%92%D1%81%D0%B5%D0%BC%D0%B8%D1%80%D0%BD%D0%BE%D0%B5_%D0%BA%D0%BE%D0%BE%D1%80%D0%B4%D0%B8%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5_%D0%B2%D1%80%D0%B5%D0%BC%D1%8F).

```js
const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738))
```

Стандартное форматирование в зависимости от локали:

```js
console.log(new Intl.DateTimeFormat('en-US').format(date))
// 12/20/2020
```

```js
console.log(new Intl.DateTimeFormat('ru', {
  weekday: 'short',
  year: '2-digit',
  month: 'long',
  day: 'numeric'})
  .format(date)
)
// Вс, 20 декабря 20 г.
```

Укажем формат даты и времени, используя параметр `style` (`full`, `long`, `medium`, `short`):

```js
console.log(new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'full',
  timeStyle: 'long',
  timeZone: 'Australia/Sydney'})
  .format(date)
)
// Sunday, 20 December 2020 at 14:23:16 GMT+11
```

## Как пишется

Создадим экземпляр:

```js
const formattedDate = new Intl.DateTimeFormat('ru').format(date)
```

### Опции

- `timeZone` — значение часового пояса. `UTC`, `America/New_York`, `Europe/Paris` и т. д.
- `calendar` — значение выбранного календаря. `chinese`, `gregory`, `indian` и т. д.
- `numberingSystem` — используемая система счисления. `arab`, `beng`, `latin` и т. д.
- `localeMatcher` — алгоритм для согласования выбранной локали.
  - `lookup` — поиск следует алгоритму поиска, определённому в [BCP 47](https://tools.ietf.org/html/rfc4647#section-3.4);
  - `best fit` (наилучший, подходящий) — позволяет среде выполнения выбрать локаль.
- `formatMatcher` — алгоритм для форматирования. `basic`, `best fit`.
- `hour12` — 12-часовой формат, если значение `true`.
- `hourCycle` — часовой формат. `h11`, `h12`, `h23`, `h24`.
- `dateStyle` — стиль форматирования даты. `full`, `long`, `medium`, `short`.
- `weekday` — день недели. `long`, `short`, `narrow`.
- `day` — день месяца. `numeric`, `2-digit`.
- `month` — месяц. `numeric`, `2-digit`, `long`, `short`, `narrow`.
- `year` — год. `numeric`, `2-digit`.
- `era` — эпоха. `long`, `short`, `narrow`.
- `timeStyle` — стиль форматирования времени. `full`, `long`, `medium`, `short`.
- `hour` — часы. `numeric`, `2-digit`.
- `minute` — минуты. `numeric`, `2-digit`.
- `second` — секунды. `numeric`, `2-digit`.
- `dayPeriod` — часть дня (утро, вечер и другое). `narrow`, `short`, `long`.
- `timeZoneName` — название часового пояса (UTC, PTC). `long`, `short`.

### Методы

`Intl.DateTimeFormat.format()` — геттер, который форматирует дату в соответствии с языковым стандартом и параметрами форматирования объекта.

Возвратим текущую дату в кратком виде (`dateStyle: short`) в виде строки.

```js
const date = Date.now()

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
})

formatter.format(date)
// суббота, 27.05.2023 г., 10:55:18 PM
```

`Intl.DateTimeFormat.formatToParts()` — форматирует передаваемую строку по частям с учётом `DateTimeFormat`. Возвращает массив объектов, представляющих строку даты в частях, которые можно использовать для настраиваемого форматирования с учётом локали.

```js
formatter.formatToParts(date)
```

В консоли мы получим следующее:

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

`Intl.DateTimeFormat.prototype.resolvedOptions()` — возвращает новый объект со свойствами, отражающими локаль и параметры форматирования, которые вычислены при инициализации объекта.

```js
{
  calendar: 'gregory',
  day: '2-digit',
  hour: 'numeric',
  hour12: true,
  hourCycle: 'h11',
  locale: 'ru',
  minute: '2-digit',
  month: '2-digit',
  numberingSystem: 'latn',
  second: '2-digit',
  timeZone: 'UTC',
  weekday: 'long',
  year: 'numeric'
}
```

`Intl.DateTimeFormat.prototype.formatRange()` — получает две даты и форматирует их диапазон самым кратким образом на основе языкового стандарта и параметров, предоставленных при создании экземпляра `DateTimeFormat`.

```js
const date1 = new Date(Date.UTC(2018, 0, 10, 10, 0, 0))
const currentDate = Date.now()

const fmt1 = new Intl.DateTimeFormat('en', {
  year: '2-digit',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
})

console.log(fmt1.formatRange(date1, currentDate))
// 1/10/18, 1:00 PM – 5/28/23, 2:08 AM
```

`Intl.DateTimeFormat.prototype.formatRangeToParts()` — получает две даты и возвращает массив объектов, содержащих токены. Они зависят от языкового стандарта и представляют каждую часть отформатированного диапазона дат. Возвращает формат, аналогичный `formatToParts(date)`.

```js
const date1 = new Date(Date.UTC(2018, 0, 10, 10, 0, 0))
const currentDate = Date.now()

const dateTimeFormat = new Intl.DateTimeFormat('en', {
  hour: 'numeric',
  minute: 'numeric'
})

const parts = dateTimeFormat.formatRangeToParts(date1, currentDate)
for (const part of parts) {
  console.log(part)
}
```

В консоли увидим следующее:

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

### Преобразование в ISO

У объекта [`Date`](/js/date/) есть метод [`toISOString()`](/js/date/#avtokorrekciya-daty). Он возвращает строку в [расширенном ISO-формате](https://www.iso.org/iso-8601-date-and-time-format.html) — `YYYY-MM-DDTHH:mm:ss.sssZ`. Часовой пояс всегда равен UTC, что обозначено суффиксом `Z`.

`Intl.DateTimeFormat` не позволяет выбрать в качестве формата `iso8601`. Код ниже упадёт с ошибкой:

```js
const date = new Date()
const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
}

const isoDate = new Intl.DateTimeFormat(
  ['iso8601'], options).format(date)
// Uncaught RangeError:
// Incorrect locale information provided at new DateTimeFormat…
```

Почему возникает такая ошибка?

Дело в том, что `Intl` работает только с локалью. Так как в формате [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) нет никакой локали, то и отформатировать его не получится.

Можно вручную преобразовать дату в формат, совместимый с ISO-8601:

```js
const date = new Date()
const dateOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
}

const formattedDate =
  new Intl.DateTimeFormat('en-ca', dateOptions).format(date)

const timeOptions = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hourCycle: 'h24',
}

const formattedTime =
  new Intl.DateTimeFormat('en-ca', timeOptions).format(date)

const dateTime
  = `${formattedDate}T${formattedTime}Z`
// 2023-05-29T15:00:00Z
```
