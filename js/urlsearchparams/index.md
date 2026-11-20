---
title: "`URLSearchParams`"
description: "Получить или отформатировать поисковые параметры из URL без боли."
baseline:
  - group: url
    features:
      - api.URLSearchParams
authors:
  - akellbl4
keywords:
  - url
  - querystring
  - queryparams
  - searchstring
related:
  - js/fetch
  - js/window-location
  - tools/gateway-bff
tags:
  - doka
---

## Кратко

`URLSearchParams` — это класс, предоставляющий удобное API для формирования строки поисковых параметров, которую потом можно использовать для формирования полного адреса. Все параметры в строке будут закодированы для безопасной вставки в адрес. Также этот класс можно встретить как часть класса `URL`.

## Пример

Создаём экземпляр класса параметров поиска:

```js
const params = new URLSearchParams({ count: '10' })
```

Далее мы можем добавлять или удалять параметры:

```js
// добавление
params.append('size', 'lg')
console.log(params.toString())
// 'count=10&size=lg'

// удаление
params.delete('count')
console.log(params.toString())
// 'size=lg'
```

Повторное добавление параметра с тем же именем добавит ещё одно значение с таким же именем, а получение всех возможных значений вернёт все добавленные значения:

```js
params.append('size', 'xl')
console.log(params.getAll('size'))
// ['lg', 'xl']
```

Получение параметров в виде строки:

```js
const paramsString = params.toString()
console.log(paramsString)
// 'count=10&size=lg&size=xl'

const url = `/catalog/?${paramsSting}`
console.log(url)
// '/catalog/?count=10&size=lg&size=xl'
```

## Как понять

Когда нужно сформировать URL, включающий в себя строку поиска, то удобнее всего использовать `URLSearchParams`. Раньше для той же операции нужно было использовать цикл, в котором строка собиралась вручную, а также делать её безопасной для вставки в адрес с помощью `encodeURLComponent()`. Сейчас же можно использовать специальный класс и управлять им с помощью предоставляемого API.

## Как пишется

### Создание экземпляра класса

При создании `URLSearchParams` мы можем передать аргумент в виде объекта, состоящего из полей со строками/цифрами или поисковую строку из адреса страницы. Это создаст новый экземпляр с уже добавленными в него параметрами.

```js
const emptyParams = new URLSearchParams()
const paramsFromUrl = new URLSearchParams(window.location.search)
const params = new URLSearchParams({ minPrice: '1000', maxPrice: '2000' })

console.log(emptyParams.toString())
// ''
console.log(params.toString())
// 'minPrice=1000&maxPrice=2000'
```

### Добавление

Добавление нового параметра в поиск производится с помощью метода `append('ключ', 'значение')` и принимает пару ключ/значение.

```js
const params = new URLSearchParams()

params.append('color', 'red')
console.log(params.toString())
// 'color=red'
```

### Запись

При записи по имени, параметр добавится, если до этого такого не существовало, и заменит значение, если таковой существовал ранее.

```js
const params = new URLSearchParams()

params.set('size', 'lg')
console.log(params.toString())
// 'size=lg'

params.append('size', 'xl')
console.log(params.toString())
// 'size=lg&size=xl'

params.set('size', 'sm')
console.log(params.toString())
// 'size=sm'
```

### Получение

С помощью методов `get('ключ')` и `getAll('ключ')` можно читать уже хранящиеся параметры.

- `get()` - вернёт первое добавленное в поле значение;
- `getAll()` – вернёт все значения, добавленные в поле.

```js
const params = new URLSearchParams()

params.append('size', 'lg')
console.log(params.get('size'))
// 'lg'

params.append('size', 'xl')
console.log(params.get('size'))
// 'lg'
console.log(params.getAll('size'))
// ['lg', 'xl']
```

### Проверка наличия

`has('ключ')` – проверяет, был ли добавлен параметр с таким именем.

```js
const params = new URLSearchParams()

params.append('size', 'lg')
console.log(params.has('size'))
// true
console.log(params.has('count'))
// false
```

### Получение имён всех параметров

Можно получить имена всех параметров, записанных в поиск, используя метод `keys()`. Результатом выбора будет [итератор](/js/iterator/).

```js
const params = new URLSearchParams('count=10&size=lg&size=xl')

for (let value of params.keys()) {
  console.log(value)
}
// 'count'
// 'size'
// 'size'
```

<aside>

💡 Если параметр был добавлен несколько раз, он также будет добавлен в итератор в том же количестве, сколько раз был добавлен.

</aside>

### Получение всех значений параметров

Метод `values()` получает значения параметров аналогично получению имён их параметров из примера выше.

```js
const params = new URLSearchParams('count=10&size=lg&size=xl')

for (let value of params.values()) {
  console.log(value)
}
// '10'
// 'lg'
// 'xl'
```

### Получение всех параметров

По аналогии с предыдущими двумя методами `entries()` получает итератор, содержащий пары ключ/значение.

```js
const params = new URLSearchParams('count=10&size=lg&size=xl')

for (let [key, value] of params.entries()) {
  console.log(key, value)
}
// count 10
// size lg
// size xl
```

### Удаление

Удаляет параметр из поиска по ключу `delete('ключ')`.

```js
params.delete('size')

console.log(params.toString())
// 'count=10'
```

### Сортировка

Метод `sort()` предоставляет возможность отсортировать параметры по алфавиту.

```js
const params = new URLSearchParams('a=1&z=4&d=2&x=3')

params.sort()
console.log(params.toString())
// 'a=1&d=2&x=3&z=4'
```

### Перебор

Метод `forEach()` перебирает значения, содержащиеся в поиске. Функция, переданная в метод, будет вызвана для каждого элемента в поиске и получит три аргумента – значение параметра, название параметра и сам экземпляр поиска.

```js
const params = new URLSearchParams('count=10&size=lg&size=xl')

params.forEach((value, key, params) => {
  console.log(value, key, params)
})
// 10 count URLSearchParams { 'count' => '10', 'size' => 'lg', 'size' => 'xl' }
// lg size URLSearchParams { 'count' => '10', 'size' => 'lg', 'size' => 'xl' }
// xl size URLSearchParams { 'count' => '10', 'size' => 'lg', 'size' => 'xl' }
```

### Приведение параметров к строке

После того как параметры сформированы, можно сохранить их в строку с помощью метода `toString()` и использовать для обновления адреса страницы.

```js
const params = new URLSearchParams()

params.append('size', 'lg')
params.append('size', 'xl')

params.toString()
```
