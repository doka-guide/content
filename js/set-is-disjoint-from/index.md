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

Проверку, которую выполняет метод, можно выразить так:

```
A ∩ B = ∅
```

![Два не пересекающихся множества A и B](images/set-disjoint-from.png)

## Пример

В одной компании два разработчика, Анна и Павел, решили организовать учебный кружок по программированию. Чтобы понять, могут ли они вести занятия вместе, им нужно проверить, есть ли у них пересекающиеся области знаний. В этом им поможет метод `isDisjointFrom()`:

```js
const annaSkills = new Set(['JavaScript', 'HTML', 'CSS', 'Vue.js']);
const pavelSkills = new Set(['Python', 'Node.js', 'PostgreSQL', 'Redis']);

console.log(annaSkills.isDisjointFrom(pavelSkills));
// true, т.к. у Ани и Павла нет общих навыков
```

Как мы видим, у них нет общих навыков, но тут оказалось, что Анна забыла указать, что она также знает `Node.js`.

```js
// Добавим навык в существующее множество.
annaSkills.add('Node.js');

console.log(annaSkills.isDisjointFrom(pavelSkills));
// false, т.к. Node.js уже есть в обоих множествах
```

## Как пишется

Метод `isDisjointFrom()` принимает один обязательный аргумент — объект, который содержит множество для сравнения. Если аргумент не указан, будет брошено исключение `TypeError: Set.prototype.isDisjointFrom argument must be an object`.

Аргументом метода `isDisjointFrom()` может быть не только множество, но и любой `Set`-like объект.

<aside>

💡 У `Set`-подобного (Set-like) объекта должны быть свойство [`size`](/js/set-size/) и методы [`has()`](/js/set-has/) и [`keys()`](/js/set-keys/). Обычный массив и [`WeakSet`-объект](/js/weak-set/) не являются `Set`-подобными объектами, так как не обладают всеми требуемыми свойствами и методами.

</aside>

## Как понять

Метод `isDisjointFrom()` помогает проверить два множества на наличие хотя бы одного совпадающего элемента без прохода по ним с помощью [`forEach()`](/js/set-foreach/).
