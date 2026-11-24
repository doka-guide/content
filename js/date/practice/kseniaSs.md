🛠 `Intl.DateTimeFormat` и `toLocaleDateString()` делают почти одно и то же, но работают немного по-разному.

Под капотом `toLocaleDateString()` использует тот же механизм, что и `Intl.DateTimeFormat`. Но результат форматирования может отличаться между браузерами: спецификация не фиксирует точный вид строки, а данные о языках и регионах у браузеров свои.

Основные отличия.

Если форматируете много дат одинаково, используйте `Intl.DateTimeFormat`. Объект с опциями создают один раз, и потом он форматирует любые даты. Это быстрее, чем передавать те же опции в каждый вызов `toLocaleDateString()`.

```js
const dateOne = new Date('2022-08-14T11:15:30Z')
const dateTwo = new Date('1991-12-26T00:00:30Z')

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

`toLocaleDateString()` всегда выводит дату. Даже если в опциях только часы и минуты, он добавит к ним день, месяц и год. `Intl.DateTimeFormat` с такими опциями выведет только время.

```js
const date = new Date('2022-08-14T11:15:30Z')

const options = {
  hour: 'numeric', minute: 'numeric',
  timeZone: 'UTC'
}

console.log(date.toLocaleDateString('ru-RU', options))
// 14.08.2022, 11:15

console.log(new Intl.DateTimeFormat('ru-RU', options).format(date))
// 11:15
```

🛠 Если возможностей `Date` для форматирования или разбора не хватает, посмотрите на библиотеки [day.js](https://day.js.org/docs/en/installation/installation) или [date-fns](https://date-fns.org/docs/Getting-Started). Ещё один вариант — встроенный объект `Temporal`, о нём выше в разделе «Альтернативы».

🛠 Раньше во многих проектах использовали библиотеку [moment.js](https://momentjs.com/). С 2020 года её авторы [считают](https://momentjs.com/news/) её устаревшим проектом в режиме поддержки и не советуют брать её в новые проекты. Среди причин они называют изменяемые объекты moment и то, что библиотека плохо работает с tree shaking и увеличивает размер сборки.
