---
title: "`Date`"
description: "Класс для работы с датой и временем"
baseline:
  - group: date
    features:
      - javascript.builtins.Date
authors:
  - kseniaSs
contributors:
  - solarrust
related:
  - js/math
  - tools/oop
  - tools/how-to-test-and-why
tags:
  - doka
---

## Кратко

`Date` — класс для работы со временем. Его используют, чтобы выводить даты и считать разницу между ними.

Время можно прочитать двумя способами:

1. UTC — время по Гринвичу.
1. В текущей часовой зоне (например, UTC+3 для Москвы).

Поэтому у части методов есть два варианта: для UTC и для текущей часовой зоны.

<aside>

🧐 Часовая зона или часовой пояс — правильный перевод английского _timezone_. В русскоязычной разработке также часто говорят _<!-- yaspeller ignore:start -->таймзона<!-- yaspeller ignore:end -->_.

</aside>

## Пример

Создадим новый экземпляр даты:

```js
const currentDate = new Date('2022-08-14T14:15:30')
```

Получим разные части даты:

```js
console.log(currentDate.getDay())
// 0

console.log(currentDate.getHours())
// 14

console.log(currentDate.getTime())
// 1660475730000

console.log(currentDate.getFullYear())
// 2022

console.log(currentDate.toISOString())
// 2022-08-14T11:15:30.000Z
```

<aside>

💡 Дата задана по местному времени автора текста, а `toISOString()` выводит её в UTC, поэтому часы разные. Здесь и дальше примеры без явной часовой зоны выполнены в Москве (UTC+3). В другой часовой зоне вывод `getTime()`, `toISOString()` и `getTimezoneOffset()` будет другим.

</aside>

Установим новую дату. Месяцы в `Date` считаются с 0, поэтому `0` — это январь:

```js
currentDate.setMonth(0, 1)

console.log(currentDate.toLocaleDateString('ru-RU'))
// 01.01.2022
```

Также можно создавать дату в формате UTC. Месяц `8` здесь — сентябрь:

```js
const utcDate = new Date(Date.UTC(2022, 8, 14, 14, 15, 30))

console.log(utcDate.toISOString())
// 2022-09-14T14:15:30.000Z
```

## Как понять

Внутри `Date` хранит одно число — количество миллисекунд, прошедших с 1 января 1970 года UTC. Часовой зоны внутри нет. Местное время и UTC — это два способа прочитать одно и то же число.

Поэтому `Date` подходит и для вывода даты в разных форматах, и для поиска разницы между датами.

Выберите часовую зону. Число внутри `Date` и строка `toISOString()` не изменятся, а местное время и смещение будут другими:

<iframe title="Одна дата в разных часовых зонах" src="demos/time-zones/" height="520"></iframe>

## Как пишется

`Date` может запутать: одни значения считаются с 0, другие — с 1.

- Месяц считается с 0: 0 — январь.
- День недели тоже с 0: 0 — воскресенье.
- Год и день месяца — как в календаре: первое число месяца — 1.

### Основные методы

#### Создание

Создать новый экземпляр класса можно несколькими способами:

`new Date()` создаёт экземпляр `Date` с текущей датой и временем.

`new Date(значение)` создаёт `Date` из строки с датой. Во всех браузерах одинаково работает только формат из спецификации — упрощённый ISO 8601, например `'2022-12-31T00:00:00'`.

Другие форматы, вроде `'August 14, 2022'`, браузеры могут разбирать по-разному.

Строку только с датой, вроде `'2022-12-31'`, `Date` считает временем UTC. А строку с датой и временем без смещения — местным временем.

```js
console.log(new Date('2022-12-31').toISOString())
// 2022-12-31T00:00:00.000Z

console.log(new Date('2022-12-31T00:00').toISOString())
// 2022-12-30T21:00:00.000Z
```

`new Date(год, месяц, день, часы, минуты, секунды, миллисекунды)` создаёт экземпляр `Date` в текущей часовой зоне. Год и месяц — обязательные параметры. Остальные параметры, начиная с часов, будут по умолчанию равны 0, а день — 1.

`new Date(миллисекунды)` создаёт `Date` со временем в миллисекундах. Количество миллисекунд измеряется с 1 января 1970 года UTC.

```js
const millisecondsDate = new Date(120000)

console.log(millisecondsDate.toISOString())
// 1970-01-01T00:02:00.000Z
```

<aside>

💡 Отсчёт от 1 января 1970 года пришёл из Unix и называется Unix-временем. Только Unix-время обычно считают в секундах, а `Date` — в миллисекундах.

</aside>

#### Получение значений

- `getFullYear()` — возвращает год;
- `getMonth()` — возвращает месяц с 0 до 11;
- `getDate()` — возвращает день месяца с 1 до 31;
- `getDay()` — возвращает порядковый номер дня недели с 0 до 6;
- `getHours()` — возвращает часы с 0 до 23;
- `getMinutes()` — возвращает минуты от 0 до 59;
- `getSeconds()` — возвращает секунды от 0 до 59;
- `getMilliseconds()` — возвращает миллисекунды от 0 до 999.

Все методы выше возвращают значения в текущей часовой зоне. Для времени по UTC добавьте `UTC` после `get`: `getUTCFullYear()`, `getUTCHours()` и так далее.

Ещё два метода возвращают не часть даты:

`getTime()` возвращает то самое число внутри `Date`: миллисекунды с 1 января 1970 года UTC.

Месяц `11` — это декабрь: `new Date(2022, 11)` — 1 декабря 2022 года, 00:00 по Москве. В UTC в этот момент ещё 30 ноября, 21:00.

```js
const currentDate = new Date(2022, 11)

console.log(currentDate.toISOString())
// 2022-11-30T21:00:00.000Z

console.log(currentDate.getTime())
// 1669842000000
```

`getTimezoneOffset()` возвращает смещение в минутах между текущей часовой зоной и UTC. Оно зависит от часовой зоны среды и от летнего времени на эту дату. Для часовых зон восточнее UTC число отрицательное: для Москвы (UTC+3) это `-180`.

```js
const currentDate = new Date()

console.log(currentDate.getTimezoneOffset())
// -180
```

#### Установка значений

Методы установки тоже есть в двух вариантах: для текущей часовой зоны и для UTC. Для текущей:

- `setFullYear(год, месяц, день)` — устанавливает год, значения месяца и дня необязательны.
- `setMonth(месяц, день)` — устанавливает месяц, передавать день необязательно.
- `setDate(день)` — устанавливает день месяца.
- `setHours(часы, минуты, секунды, миллисекунды)` — устанавливает часы. Значения минут, секунд, миллисекунд необязательны.
- `setMinutes(минуты, секунды, миллисекунды)` — устанавливает минуты. Секунды и миллисекунды необязательны.
- `setSeconds(секунды, миллисекунды)` — устанавливает секунды. Миллисекунды передавать необязательно.
- `setMilliseconds(миллисекунды)` — устанавливает миллисекунды.

Для UTC добавьте `UTC` после `set`: `setUTCMilliseconds(миллисекунды)`.

Метод `setTime(значение)` не зависит от часовой зоны. Он принимает число миллисекунд с 1 января 1970 года UTC.

#### Разбор даты

`Date.parse(строка)` разбирает (ещё говорят _парсит_) строку с датой. Он возвращает число миллисекунд, как `getTime()`.

```js
console.log(Date.parse('2022-11-30T21:00:00.000Z'))
// 1669842000000
```

<aside>

⚠️ Правила для строки те же, что у `new Date(строка)`. Строку не в формате из спецификации один браузер разберёт, а другой вернёт `NaN`.

</aside>

#### Форматирование даты

Чтобы вывести `Date` в нужном формате, используйте метод `toLocaleDateString(локаль, опции)`.

Локаль — это необязательный параметр: строка или массив строк с языковой меткой [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag). Например, `en-US` или `de-DE`. По локали браузер выбирает, как записать дату для этого языка и региона.

Опции — необязательный параметр с объектом настроек. Доступные свойства:

- `year` — значение года. Принимает `numeric` и `2-digit`.
- `month` — значения месяца. Принимает `numeric`, `2-digit`, `narrow`, `short` и `long`.
- `day` — значения дня. Принимает `numeric` и `2-digit`.
- `weekday` — значение дня недели. Принимает `narrow`, `short` и `long`.
- `hour` — значения часа. Принимает `numeric` и `2-digit`.
- `minute` — значения минут. Принимает `numeric` и `2-digit`.
- `second` — значения секунд. Принимает `numeric` и `2-digit`.
- `hour12` — использовать ли 12-часовой формат. Принимает `true` или `false`.
- `timeZone` — часовая зона. Принимает `'UTC'`, названия часовых зон вроде `'Europe/Moscow'` и смещения вроде `'+03:00'`. По умолчанию берётся часовая зона среды выполнения.
- `timeZoneName` — формат названия часовой зоны. Принимает `long`, `short`, `shortOffset`, `longOffset`, `shortGeneric` или `longGeneric`.
- `era` — значение эры. Принимает `narrow`, `short` и `long`.
- `localeMatcher` — как выбирать локаль. Принимает значения `lookup` или `best fit`. По умолчанию `best fit`.
- `formatMatcher` — как выбирать шаблон вывода. Принимает значения `basic` или `best fit`. По умолчанию `best fit`.

Выведем дату для двух локалей:

```js
const currentDate = new Date('2022-08-14T14:15:30+03:00')

const options = {
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  timeZoneName: 'long',
  timeZone: 'Europe/Moscow'
}

console.log(currentDate.toLocaleDateString('ru-RU', options))
// 14.08.2022, 14:15:30 Москва, стандартное время

console.log(currentDate.toLocaleDateString('en-US', options))
// 8/14/2022, 2:15:30 PM Moscow Standard Time
```

Это не все опции. Есть ещё, например, `dateStyle` и `hourCycle`.

Две опции вызывают ошибку [`TypeError`](/js/errors/):

- `dateStyle` — вместе с опциями частей даты вроде `year` или `weekday`;
- `timeStyle` — всегда: `toLocaleDateString()` обязан вывести дату.

Опции частей даты можно сочетать как угодно. Если у локали нет точного шаблона для сочетания, браузер возьмёт ближайший. Что он применил на самом деле, покажет `new Intl.DateTimeFormat(локаль, опции).resolvedOptions()`.

#### Получение текущего времени

`Date.now()` возвращает текущее время в миллисекундах, прошедших с 1 января 1970 года UTC.

Это статический метод: его вызывают у самого класса, не создаёт экземпляр `Date` и сразу возвращает число миллисекунд:

```js
console.log(Date.now())
// 1661370397669
```

### Математические операции

Найдём количество дней между 1 января 2022 и 31 декабря 2022.

При вычитании каждая дата превращается в своё число миллисекунд. Разницу делим на число миллисекунд в сутках и получаем 364: дней в году минус 1.

```js
const utcDateOne = new Date(Date.UTC(2022, 0, 1, 0, 0, 0))
const utcDateTwo = new Date(Date.UTC(2022, 11, 31, 0, 0, 0))

console.log(utcDateOne.toUTCString())
// Sat, 01 Jan 2022 00:00:00 GMT

console.log(utcDateTwo.toUTCString())
// Sat, 31 Dec 2022 00:00:00 GMT

const result = utcDateTwo - utcDateOne
console.log(result)
// 31449600000

console.log(result / (1000 * 60 * 60 * 24))
// 364
```

<aside>

⚠️ Разность двух дат точна, а деление на число миллисекунд в сутках — нет. Если в часовой зоне меняется смещение от UTC, например при переходе на летнее время, такие сутки длятся не 24 часа. Чтобы считать разницу в днях, создавайте даты через `Date.UTC()` или округляйте результат.

</aside>

### Автокоррекция даты

Если значение выходит за пределы диапазона, `Date` переносит лишнее в соседний месяц или год. Например, 32 декабря превратится в 1 января следующего года:

```js
const newDate = new Date('2022-08-14T14:15:30')

newDate.setFullYear(2022, 11, 32)

console.log(newDate.toLocaleDateString('ru-RU'))
// 01.01.2023
```

С отрицательным значением `Date` отсчитывает назад. Месяц `-11` — это 11 месяцев назад от января 1996 года, то есть февраль 1995-го:

```js
const newDate = new Date('2022-08-14T14:15:30')

newDate.setFullYear(1996, -11, 24)

console.log(newDate.toLocaleDateString('ru-RU'))
// 24.02.1995
```

Дни месяца начинаются с 1. Если передать `0`, `Date` возьмёт последний день предыдущего месяца:

```js
const newDate = new Date('2022-08-14T14:15:30')

newDate.setDate(0)

console.log(newDate.toLocaleDateString('ru-RU'))
// 31.07.2022
```

На этом переносе строят прибавление дней:

```js
const date = new Date('2022-08-14T14:15:30')

date.setDate(date.getDate() + 30)

console.log(date.toLocaleDateString('ru-RU'))
// 13.09.2022
```

Перенос работает и в `Date.UTC()`: 13-й месяц с нулевым днём — это 31 декабря.

```js
// Обе переменные представляют одну и ту же дату
const dateOne = new Date(Date.UTC(2022, 11, 31, 0, 0, 0))
const dateTwo = new Date(Date.UTC(2022, 12, 0, 0, 0, 0))

console.log(dateOne.toISOString())
// 2022-12-31T00:00:00.000Z

console.log(dateTwo.toISOString())
// 2022-12-31T00:00:00.000Z
```

### Альтернативы

Вместо `toLocaleDateString()` можно взять класс [`Intl.DateTimeFormat`](/js/intl-datetimeformat/).

```js
const currentDate = new Date('2022-08-14T14:15:30+03:00')

const options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  timeZoneName: 'long',
  timeZone: 'Europe/Moscow'
}

const ruFormatter = new Intl.DateTimeFormat('ru-RU', options)
console.log(ruFormatter.format(currentDate))
// 14.08.2022, 14:15:30 Москва, стандартное время

const enFormatter = new Intl.DateTimeFormat('en-US', options)
console.log(enFormatter.format(currentDate))
// 8/14/2022, 2:15:30 PM Moscow Standard Time
```

На замену `Date` задуман новый встроенный объект [`Temporal`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal). Его отличия от `Date`:

- отдельные типы для даты, времени и даты с часовой зоной;
- месяцы считаются с 1;
- объекты нельзя изменить.

```js
const today = Temporal.Now.plainDateISO()
console.log(today.add({ months: 1 }).toString())
// Например, 2026-12-20
```

`Temporal` работает в Firefox 139, Chrome 144 и Edge 144. В стабильной версии Safari его пока нет. Чтобы код работал во всех браузерах, подключите полифил, например [temporal-polyfill](https://github.com/fullcalendar/temporal-polyfill).
