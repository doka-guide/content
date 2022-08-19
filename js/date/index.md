---
title: "`Date`"
description: "Объект для манипуляции с датой и временем."
authors:
  - kseniaSs
related:
  - ""
tags:
  - doka
---

<!--
1. В description есть описание для соцсетей и поисковиков, не больше 200 символов
2. В authors есть ники авторов основного текста
3. В contributors перечислены ники всех соавторов и тех, кто работал над текстом (дописали «На практике»? Переписали блок? Вам сюда)
4. В keywords записаны ключевые слова для SEO: пишем сюда слова или фразы, которых нет в тексте статьи, но по ним могут искать этот материал
5. Удалены все пустые теги в шапке
6. Подпапка автора есть в папке _people/_
7. Демки лежат в подпапке _demos/_
8. В related добавлено три ссылки на материалы Доки, которые будут предлагаться в конце. Не добавляем следующий или предыдущий материал в разделе
-->

## Кратко

`Date` - объект для работы со временем. В основном используется для отображения и вычисления.

Время отображается в двух форматах:
1) UTC - время по Гринвичу
2) Текущей timezone (Для Москвы, например, UTC+3)

Отсюда, часть методов для взаимодействия со временем имеют два формата, для UTC и для текущей timezone.

Также в наследство от UNIX досталось измерение времени. Количество прошедших секунд/минут/часов ведётся от 1 января 1970 года.
(Именно тогда началась разработка UNIX системы)

## Пример

Создаём объект даты (обязательно в ISO формате)

```js
const currentDate = new Date('August 14, 2022 14:15:30')
```

Получаем различные метрики

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

💡 Установленная дата и метод toISOString имеют разные значения из-за timezone автора текста

</aside>

Установим новую дату

```js
currentDate.setMonth(0, 1)

console.log(currentDate.toLocaleDateString())
// 01.01.2022
```

Также можно создавать дату в UTC формате

```js
const utcDate = new Date(Date.UTC(2022, 8, 14, 14, 15, 30))

console.log(utcDate.toISOString())
// 2022-09-14T14:15:30.000Z
```

## Как пишется

Date может немного запутать, часть параметров начинают отчёт с нуля, а часть с 1.
Например, при установке месяца, отчёт идёт с 0, то есть 0 - это январь.
Также при выводе дня недели, возвращаемое значение также начинается с 0, что означает воскресенье.

Однако, для секунд/часов/дней/лет -  это правило не работает.

#### Математические операции

Найдём количество дней между двумя датами - 31 декабря 2022 и 1 января 2022.
Полученное значение = количество дней в году - 1.

```js
const utcDateOne = new Date(Date.UTC(2022, 0, 1, 0, 0, 0))
const utcDateTwo = new Date(Date.UTC(2022, 12, 0, 0, 0, 0))

console.log(utcDateOne.toUTCString())
// Sat, 01 Jan 2022 00:00:00 GMT
console.log(utcDateTwo.toUTCString())
// Sat, 31 Dec 2022 00:00:00 GMT

const result = utcDateTwo - utcDateOne
console.log(result)
// 31449600000 миллисекунд
console.log(result / (1000 * 60 * 60 * 24))
// 364
```

<aside>

⚠️ Математические операции необходимо выполнять со временем в формате UTC, так как операции не учитывают летнее время тайм зон,
поэтому результаты могут быть некорректны

</aside>

#### Отображение даты в различных форматах

Отобразим заданное время в двух форматах:

```js
const currentDate = new Date('August 14, 2022 14:15:30')

const options = {
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  timeZoneName: 'long'
}

console.log(currentDate.toLocaleDateString('ru-RU', options))
// 14.08.2022, 14:15:30 Москва, стандартное время
console.log(currentDate.toLocaleDateString('en-US', options))
// 8/14/2022, 2:15:30 PM Moscow Standard Time
```

#### Некорректная время и дата

Date исправляет некорректно введённые данные, но это касается только целых чисел.

```js
const newDate = new Date()

newDate.setFullYear(1996, 11, 24)

console.log(newDate.toISOString())
// 1996-12-24T17:54:25.502Z

```

С минусом также работает.

```js
const newDate = new Date()

newDate.setFullYear(1996, -11, 24)

console.log(newDate.toISOString())
// 1995-02-24T05:17:21.204Z
```

## Как понять

Объект Date в основном используется для отображения даты в различных форматах.
Также есть вам нужно находить разницу между датами - объект Date прекрасно может справиться.

### Альтернативы

#### Intl.DateTimeFormat

Вместо использования toLocaleDateString можно использовать объект Intl.DateTimeFormat.

Код выше можно преобразовать
```js
const currentDate = new Date('August 14, 2022 14:15:30')

const options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  timeZoneName: 'long'
}

console.log(new Intl.DateTimeFormat('ru-RU', options).format(currentDate))
// 14.08.2022, 14:15:30 Москва, стандартное время
console.log(new Intl.DateTimeFormat('en-US', options).format(currentDate))
// 8/14/2022, 2:15:30 PM Moscow Standard Time
```

#### Moment

Стоит упомянуть эту легендарную библиотеку, созданную в 2011 году.
Раньше она импортировалась повсеместно, но сейчас использование её не рекомендуется.
Moment может сильно увеличить размер собранного приложения. Стандарты современного js покрывают возможности moment.

Однако, вы можете рассмотреть использование этой библиотеки:

1) Если ваши библиотеки уже используют moment
2) Или вам нужна поддержка старых браузеров, так как, например, многие функции Intl.DateTimeFormat не поддерживаются в IE

#### Что использовать Intl.DateTimeFormat или toLocaleDateString ?

Несмотря на похожий синтаксис, внутри две эти функции могут работать по-разному.
Нет универсального решения, что именно использовать. Реализация в браузерах также может отличаться, так как
нет строгой спецификации и каждый браузер может интерпретировать по разному.
Поэтому нет уникального ответа, что быстрее, красивее и т.д.
Таким образом, основные отличия:

- В поддержке браузеров. Intl.DateTimeFormat поддерживается не всеми браузерами. Например, IE10 не поддерживает совсем,
а IE11 поддерживает не все функции.

- Вы можете использовать Intl.DateTimeFormat для форматирования групп дат. В отличии от toLocaleDateString,
он позволяет установить формат один раз.

```js
const dateOne = new Date('August 14, 2022 14:15:30')
const dateTwo = new Date('December 26, 1991 02:00:30')

const options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  timeZoneName: 'long',
  timeZone: 'UTC'
}

const formatter = new Intl.DateTimeFormat('ru-RU', options)

console.log(formatter.format(dateOne))
// 14.08.2022, 11:15:30 Всемирное координированное время
console.log(formatter.format(dateTwo))
// 26.12.1991, 0:00:30 Всемирное координированное время
```

- Различный ввод/вывод. Так как стандарт не является строгим, то передаваемые параметры могут
отличаться. Особенно это касается timezone. Значения вывода по умолчанию также могут отличаться.

```js
const date = new Date(1660475730000)

console.log(date.toLocaleString('en-US'))
// 8/14/2022, 2:15:30 PM

console.log(new Intl.DateTimeFormat('en-US').format(date))
// 8/14/2022
```



