---
title: "[].flatMap()"
description: ""
authors:
  - AntonGorelov
tags:
  - doka
---

## Кратко

Метод `flatMap()` позволяет сформировать массив, применяя функцию к каждому элементу, затем уменьшает вложенность, делая плоскую структуру, и возвращает новый массив.

Был добавлен в стандарте ES2019

## Пример

```js
const orders = [
    {
        id: 01,
        products: [
            { name: 'Cheesecake', price: 1.99 },
            { name: 'Biscuit', price: 4.99 },
        ]
    },
    {
        id: 02,
        products: [
            { name: 'Chocolate', price: 5.59 },
            { name: 'Marshmallow', price: 8.99 },
        ]
    }
];
```

Вызовем метод `flatMap()`:

```js
orders.flatMap(order => order.products.map(product => product.name));
```

Увидим что функция применилась, уменьшилась вложенность и мы получили только имена из массива `products`:

```js
['Cheesecake', 'Biscuit', 'Chocolate', 'Marshmallow']
```

Посмотрим пример посложнее:

## Пример

```js
let cart = [{
		name: 'Smartphone',
		count: 1,
		price: 500,
	},
	{
		name: 'Laptop',
		count: 1,
		price: 800,
	}
];
```

Если человек покупает телефон, требуется добавить зарядное устройство:

```js
cart.flatMap(
    (item) => {
        if (item.name === 'Smartphone') {
           return [item, {
             name: 'Smart charger’,
             count: item.count,
             price: 50,
           }]
        } else {
            return [item];
        }
    }
);
```

Получаем массив элементов в корзине: 

```js
[
  {
  	name: 'Smartphone',
  	count: 1,
  	price: 500,
  },   {
  	name: 'Smart charger',
  	count: 1,
  	price: 50,
  },   {
  	name: 'Laptop',
  	count: 1,
  	price: 800,
  },
]
```

## Как пишется

Как и другим похожим методам, `flatMap` необходимо передать колбэк-функцию, которая будет возвращать какое-то значение. Именно это значение попадёт в итоговый массив.

Функция, которую мы передаём в `flatMap`, принимает три аргумента:

- `currentValue` - текущий элемент массива.
- `index` - индекс текущего элемента в массиве.
- `array` - массив, который мы перебираем.

## Как понять

Метод идентичен `map().flat()` с `depth = 1`, но более эффективный, чем вызов этих функций по отдельности; соответственно, применяется для трансформации исходных данных, с уменьшением вложенности.