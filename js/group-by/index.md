---
title: "group-by"
description: "Группирует элементы итерируемого объекта."
authors:
  - fpetrakov
related:
  - js/array-map
  - js/for-each
  - js/typecasting
tags:
  - doka
---

## Кратко

Статический метод `groupBy()` группирует элементы итерируемого объекта, опираясь на переданную колбэк-функцию. Она должна возвращать название группы, в которую стоит положить текущий элемент. `groupBy()` вызовет функцию для каждого элемента и вернёт новый объект, в котором каждое свойство - группа с массивом входящих в неё элементов.

## Пример

```js
const colors = [
  { value: "50% 0.2 12", name: "oklch" },
  { value: "198, 35, 109", name: "rgb" },
  { value: "55% 0.2 0", name: "oklch" },
];

const groupedColors = Object.groupBy(colors, (color, index) => {
  return color.name === "oklch" ? "easyToUnderstand" : "notEasyToUnderstand";
});

console.log(groupedColors);
/*
{
  easyToUnderstand: [
    { value: "50% 0.2 12", name: "oklch" },
    { value: "55% 0.2 0", name: "oklch" }
  ],
  notEasyToUnderstand: [
    { value: "198, 35, 109", name: "rgb" }
  ]
}
*/
```

## Как пишется

`groupBy()` принимает два аргумента:

- итерируемый объект, например массив;
- колбэк-функцию.

Колбэк-функция принимает два аргумента: текущий элемент и индекс текущего элемента. Она также должна возвращать значение, которое можно привести к ключу объекта (строке или символу) и которое будет указывать, в какую группу стоит положить текущий элемент.
