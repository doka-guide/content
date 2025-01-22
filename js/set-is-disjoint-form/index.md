---
title: "`.isDisjointFrom()`"
description: "Метод сравнения коллекций, который позволяет проверить не имеют ли два множества общих элементов"
baseline:
  - group: set-methods
    features:
      - javascript.builtins.Set.isDisjointFrom
authors:
  - punkmachine
related:
  - js/set
  - js/set-has
  - js/set-foreach
tags:
  - doka
---

## Кратко

Метод `isDisjointFrom()` позволяет проверить, не имеют ли два множества общих элементов. Возвращает `true`, если множества не пересекаются, и `false` — если есть хотя бы один общий элемент.

## Пример

У нас есть два набора навыков разных разработчиков, представленных в виде массивов строк. Им стало интересно, есть ли у них хотя бы один общий навык в своих направлениях, для чего они могут использовать метод `isDisjointFrom()`:

```js
const frontendSkills = new Set(['JavaScript', 'HTML', 'CSS', 'Vue.js']);
const backendSkills = new Set(['Python', 'Node.js', 'PostgreSQL', 'Redis']);

console.log(frontendSkills.isDisjointFrom(backendSkills));
// true, т.к. ни один из навыков не пересекается
```

Как выяснилось, у них нет пересечений в навыках, но на самом деле frontend-разработчик забыл, что он также умеет писать код на `Node.js`.

```js
// Добавим навык в существующее множество.
frontendSkills.add('Node.js');

console.log(frontendSkills.isDisjointFrom(backendSkills));
// false, т.к. Node.js уже есть в обоих множествах
```

## Как пишется

Метод `isDisjointFrom()` принимает один обязательный аргумент — объект, который содержит множество для сравнения. Если аргумент не указан, будет брошено исключение `TypeError: Set.prototype.isDisjointFrom argument must be an object`.

Аргументом для метода `isDisjointFrom()` может быть множество, созданное через [конструктор `new Set()`](/js/set-constructor/), а также [`Map`](/js/map/).

## Как понять

