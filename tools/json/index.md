---
title: "JSON"
description: "Самый популярный формат обмена данными между приложениями."
authors:
  - stegur
contributors:
  - skorobaeus
  - vitya-ne
tags:
  - doka
related:
  - tools/api
  - recipes/progress
  - tools/nodejs
---

## Кратко

JSON — самый популярный формат обмена данными между приложениями. Этот формат очень похож на объекты JavaScript. Объекты легко трансформируются в JSON для отправки на сервер.

## Как пишется

```json
{
  "brand": "Apple",
  "model": "iPhone 11 Pro",
  "isAvailable": true,
  "display": 5.8,
  "memories": [64, 256, 512],
  "features": {
    "tripleCamera": true,
    "faceId": true,
    "touchId": false,
    "eSIM": true
  }
}
```

JSON состоит из пар ключ-значение. Пары разделяются между собой запятыми — `,`, а ключ отделяется от значения через двоеточие — `:`. Ключом может быть **только** строка, обёрнутая в двойные кавычки. А вот значением — почти всё что угодно:

- Строка в двойных кавычках — `"I love JSON!"`;
- Число — `21`;
- Логические значения — `true` и `false`;
- Массив — `[18, true, "lost", [4, 8, 15, 16, 23, 42]]`;
- Объект — `{"isValid": true, "isPayed": false}`.
- [`null`](/js/null-primitive/)

JSON основан на JavaScript, но остаётся независимой от языка спецификацией для данных.

<aside>

🗃️ Если нужно сохранить JSON в файл, то используют расширение `.json`.

</aside>

## Как понять

Спецификация формата JSON определена стандартом [ECMA-404](https://ecma-international.org/publications-and-standards/standards/ecma-404/).

JSON определяет небольшой набор правил форматирования для переносимого представления структурированных данных и может применяться почти с любым языком программирования.

То как JSON используется в JavaScript, описывает [Спецификация ECMAScript](https://262.ecma-international.org/14.0/#sec-json-object).

В процессе преобразования JavaScript-объекта в JSON не попадут:

- Поля со значением, равным примитивам [`undefined`](/js/undefined/) или [`Symbol`](/js/symbol/);
- Функции (методы объектов) — `{greetings() {alert("Hello World!")}}`;
- Поля с `Symbol`-ключами.

Некоторые значения преобразуются в `null`:

- Поля со значением, равным [«специальным» числам»](/js/number-wrapper/#proverki-na-specialnye-znacheniya) `Infinity` и `NaN`;
- Элементы полей-массивов, равные `undefined`.

Значения, равные объектам [`Map`](/js/map/) и [`Set`](/js/set/), будут преобразованы в `{}`.

JSON используется для того, чтобы получить данные от сервера. Типичная схема работы:

1. Отправляем запрос на сервер;
2. Ждём ответ;
3. Получаем JSON с набором данных;
4. Превращаем JSON в объект JavaScript;
5. Используем данные.

Пример:

<iframe title="Демонстрация работы — JSON — Дока" src="demos/step-by-step/" height="750"></iframe>

### Преобразование в JSON

Для того что бы превратить данные в JSON-код, используйте метод `JSON.stringify()`. Первым аргументом метод принимает значение, которое нужно преобразовать.

Преобразуем [JavaScript-объект](/js/object/) в JSON:

```js
const hero = {
  nickname: "BestHealerEver",
  level: 7,
  age: 141,
  race: "Gnome",
  isImmortal: false,
  things: ["sword", "helmet", "belt"],
  money: {
    gold: 6387,
    silver: 1264,
    bronze: 931,
    diamonds: 2,
  },
}

console.log(typeof hero)
// object
console.log(typeof JSON.stringify(hero))
// string
console.log(JSON.stringify(hero))
// '{"nickname":"BestHealerEver","level":7,"age":141,"race":"Gnome","isImmortal":false,"things":["sword","helmet","belt"],"money":{"gold":6387,"silver":1264,"bronze":931,"diamonds":2}}'
```

Результатом конвертации будет строка.

`JSON.stringify()` также поддерживает два дополнительных аргумента:
- `replacer` — функция или массив, позволяющие изменить стандартное преобразование. Например, если `replacer` это массив `['nickname', 'age']`, то только эти свойства объекта попадут в результирующую строку.
- `space` — строка или число пробелов, которые будут использоваться для форматирования результата. Это позволяет улучшить читаемость и представить результат в более наглядном виде.

Например, отформатируем результат предыдущего примера:

```js
console.log(JSON.stringify(hero, null, 2))

// {
//   "nickname": "BestHealerEver",
//   "level": 7,
//   "age": 141,
//   "race": "Gnome",
//   "isImmortal": false,
//   "things": [
//     "sword",
//     "helmet",
//     "belt"
//   ],
//   "money": {
//     "gold": 6387,
//     "silver": 1264,
//     "bronze": 931,
//     "diamonds": 2
//   }
// }
```

### Пример преобразования объекта JavaScript в формат JSON

<iframe title="Преобразование в JSON — JSON — Дока" src="demos/transform-json/" height="410" loading="lazy"></iframe>

### Преобразование из JSON

Преобразовать строку с JSON в объект JavaScript можно с помощью метода `JSON.parse()`. Он принимает JSON-строку в качестве аргумента.

Попробуем преобразовать JSON:

```json
{
  "name": "Luke Skywalker",
  "height": "172",
  "mass": "77",
  "hair_color": "blond",
  "skin_color": "fair",
  "eye_color": "blue",
  "birth_year": "19BBY",
  "gender": "male"
}
```

С помощью `JSON.parse()` мы получим стандартный объект, с которым можно взаимодействовать:

```js
const json =
  '{"name":"Luke Skywalker","height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"19BBY","gender":"male"}'
const jedi = JSON.parse(json)

console.log(jedi.name)
// Luke Skywalker
console.log(jedi.gender)
// male
console.log(jedi.birth_year)
// 19BBY
```

В случае, если строка невалидный JSON-код, метод `JSON.parse()` выбросит ошибку `SyntaxError.`
