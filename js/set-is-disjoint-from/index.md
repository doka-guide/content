---
title: "`isDisjointFrom()`"
description: "Метод проверки, имеют ли множества общие элементы."
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

Метод `isDisjointFrom()` позволяет проверить, имеют ли два множества хотя бы один общий элемент. Возвращает `true`, если множества не имеют общих элементов, и `false`, если хотя бы один элемент совпадает.

Метод можно выразить следующей математической формулой:

```
A ∩ B = ∅
```

![Два не пересекающихся множества A и B](images/set-disjoint-from.png)

## Пример

У нас есть два набора навыков разных разработчиков, представленных в виде массивов строк. Им стало интересно, есть ли у них хотя бы один общий навык, для чего они могут использовать метод `isDisjointFrom()`:

```js
const frontendSkills = new Set(['JavaScript', 'HTML', 'CSS', 'Vue.js']);
const backendSkills = new Set(['Python', 'Node.js', 'PostgreSQL', 'Redis']);

console.log(frontendSkills.isDisjointFrom(backendSkills));
// true, т.к. ни один из навыков не пересекается
```

Как выяснилось, у них нет пересечений в навыках, но выяснилось, что frontend-разработчик забыл указать, что он также умеет писать код на `Node.js`.

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

Метод `isDisjointFrom()` помогает проверить два множества на наличие хотя бы одного совпадающего элемента без прохода по ним с помощью [`forEach()`](/js/set-foreach/).
