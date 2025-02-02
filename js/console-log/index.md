---
title: "`console.log()`"
description: "Главный способ отладки кода в вебе."
authors:
  - doka-dog
contributors:
  - nlopin
  - corocoto
  - egorlem
related:
  - js/alert
  - tools/how-to-test-and-why
  - tools/json
tags:
  - doka
---

## Кратко

`console.log()` — это метод, предназначенный для печати в консоль браузера.

При написании скриптов иногда нужно увидеть промежуточный результат прямо в консоли браузера — это просто, удобно и не требует никакой дополнительной логики для отображения.

## Как пишется

Вызов `console.log()` выведет в консоль все переданные аргументы:

```js
console.log('hello')
// 'hello'

console.log(true, { a: true }, 100)
// true {a: true} 100
```

## Как понять

⚡️ В момент разработки все действия кажутся долгими, поэтому можно воспользоваться молниеносным выводом в консоль.

Почему консоль разработчика, а не [`alert()`](/js/alert/)?

Откройте консоль и выполните:

```js
const a = { id: 1, value: 'one text' }
alert(a)
```

Вывод при таком подходе не отражает содержимого объекта `а` — мы увидим только надпись «[object Object]». Помимо этого приходится каждый раз закрывать диалоговое окно, что раздражает.

Другое дело если совершать эти действия в консоли:

```js
const a = { id: 1, value: 'one text' }
console.log(a)
// Object { id: 1, value: "one text" }
```

Результат представлен в виде дерева, которое удобно раскрывается — видны все параметры.

<aside>

💡 Если хочется вывести отладочное сообщение на страницу, то придётся воспользоваться или `alert()` или создавать отладочный HTML-блок [`div`](/html/div/) или [`textarea`](/html/textarea/), чтобы записать туда свои вычисления с помощью записи в свойство [`innerText`](/js/element-innertext/). Перед этим не забудьте привести объект в строку с помощью [`JSON.stringify()`](/tools/json/#preobrazovanie-v-json) — проще будет читать.

</aside>

## Особенность работы в браузере

В браузере с помощью `console.log()` можно проверить мутацию [ссылочного типа](/js/ref-type-vs-value-type/). Этого можно добиться, раскрыв выведенное значение в консоли. Всё что нам нужно сделать — нажать на иконку с перевёрнутым треугольником (►).

В качестве примера создадим массив с героями диснеевских мультфильмов. Изначально в нем будет располагаться только Микки Маус, а после вызова `console.log()`, добавим и Плуто.

```js
const disneyCharacters = [{ name: 'Mickey Mouse', type: 'mouse' }]
console.log(disneyCharacters)
disneyCharacters.push({name: 'Pluto', type: 'dog' })
```

Нажмём на иконку с перевёрнутым треугольником (►) в консоли и увидим результат вывода:

![В консоли отображается массив с обоими героями](images/track-mutation.png)
В консоли выводится итоговый вид массива с добавленным Плуто

Причина в том, что значение ссылочного типа читается браузером только при его первом раскрытии. Этот процесс также называют _ленивым чтением (lazy-read)_.

<aside>

💡 Google Chrome при этом показывает информационную иконку, при наведении на которую отобразится подсказка с текстом: «This value was evaluated upon first expanding. It may have changed since then».

</aside>

## Cпецификаторы форматирования

`console.log()` в JavaScript не является прямым наследником функции `printf()` из других языков программирования, но эмулирует некоторые её особенности, включая спецификаторы форматирования.

<aside>

💡 Спецификаторы форматирования — это специальные символы, которые определяют способ представления динамических данных внутри строки.

</aside>

В качестве примера создадим массив с известными мандалорскими охотниками за головами. В исходной строке вместо имени героя фильма «Звёздные войны» оставим спецификатор, который укажет на следующий аргумент:

```js
const mandalorians = ['Джанго Фетт', 'Боба Фетт', 'Дин Джарин']

console.log('Когда-то %s был самым известным охотником за головами', mandalorians[1])
// Когда-то Боба Фетт был самым известным охотником за головами
```

#### Сводка спецификаторов форматирования

| Спецификатор | Тип |
| --- | --- |
| `%s` | Значение с типом `string` |
| `%d` или `%i` | Значение с типом `integer` |
| `%f` | Значение с типом `float` |
| `%o` | Значение с типом `Object` |
| `%O` | Значение с типом `Object` |
| `%c` | Позволяет применять CSS к выводимой строке |
