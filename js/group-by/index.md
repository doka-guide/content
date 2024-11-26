---
title: "`.groupBy()`"
description: "Группирует элементы итерируемого объекта."
baseline:
  - group: array-group
    features:
      - javascript.builtins.Object.groupBy
      - javascript.builtins.Map.groupBy
authors:
  - fpetrakov
contributors:
  - baileys-li
related:
  - js/array-map
  - js/for-of
  - js/typecasting
tags:
  - doka
---

## Кратко

Статический метод `groupBy()` группирует элементы [итерируемого объекта](/js/iterator/), опираясь на переданную колбэк-функцию. Она должна возвращать ключ группы, в которую стоит положить текущий элемент. `Object.groupBy()` сгруппирует элементы в новый объект, а `Map.groupBy()` — в новую [Map](/js/map/).

## Пример `Object.groupBy()`

```js
const colors = [
  { value: '50% 0.2 12', name: 'oklch' },
  { value: '198, 35, 109', name: 'rgb' },
  { value: '55% 0.2 0', name: 'oklch' },
]

const groupedColors = Object.groupBy(colors, (color, index) => {
  return color.name === 'oklch' ? 'easyToUnderstand' : 'notEasyToUnderstand'
})

console.log(groupedColors)
/*
{
  easyToUnderstand: [
    { value: '50% 0.2 12', name: 'oklch' },
    { value: '55% 0.2 0', name: 'oklch' }
  ],
  notEasyToUnderstand: [
    { value: '198, 35, 109', name: 'rgb' }
  ]
}
*/
```

## Пример `Map.groupBy()`

Метод `Map.groupBy()` будет полезен, если нам в качестве ключей нужно использовать типы, которые не могут быть ключами объекта. Например, другие объекты:


```js
const users = {
  1: { id: 1, firstName: "Василий", lastName: "Пупкин", email: "vasya@pupkin.person" },
  2: { id: 2, firstName: "Анна", lastName: "Иванова", email: "anna@ivanova.person" },
  3: { id: 3, firstName: "Игорь", lastName: "Сидоров", email: "igor@sidorov.person" },
};

const orders = [
  { id: 1, customerID: 1, price: 1500, goods: ["Молоко", "Хлеб"] },
  { id: 2, customerID: 2, price: 2500, goods: ["Хлеб", "Яйца", "Сыр"] },
  { id: 3, customerID: 1, price: 3000, goods: ["Сыр", "Картофель"] },
  { id: 4, customerID: 3, price: 1800, goods: ["Молоко", "Картофель"] },
  { id: 5, customerID: 2, price: 1200, goods: ["Хлеб", "Сыр"] },
];

const userOrders = Map.groupBy(orders, (order) => users[order.customerID]);

for (const [user, orders] of userOrders) {
  console.groupCollapsed(`${user.firstName} ${user.lastName} (${user.email})`);
  for (const order of orders) console.log(`Заказ #${order.id}: ${order.goods.join(", ")} на сумму ${order.price} руб.`);

  console.groupEnd();
}

/*
Василий Пупкин (vasya@pupkin.person)
  Заказ #1: Молоко, Хлеб на сумму 1500 руб.
  Заказ #3: Сыр, Картофель на сумму 3000 руб.
Анна Иванова (anna@ivanova.person)
  Заказ #2: Хлеб, Яйца, Сыр на сумму 2500 руб.
  Заказ #5: Хлеб, Сыр на сумму 1200 руб.
Игорь Сидоров (igor@sidorov.person)
  Заказ #4: Молоко, Картофель на сумму 1800 руб.
*/
```

## Как пишется

`Object.groupBy(items, callbackFn)` или `Map.groupBy(items, callbackFn)`, где:

- `items` — итерируемый объект, например, массив;
- `callbackFn` — колбэк-функция. В неё будут передаваться два аргумента:
  - `element` — текущий элемент `items`;
  - `index` — индекс текущего элемента.

`callbackFn` должна вернуть ключ, по которому элемент будет добавлен в группу. В случае `Object.groupBy()` ключом будет строка или символ, в случае `Map.groupBy()` — любой тип данных.

<aside>

☝️ Хотите узнать больше о том, как JavaScript приводит (преобразует) типы? Прочитайте [статью о преобразовании типов](/js/typecasting/).

</aside>
