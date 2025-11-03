---
title: "Iterator.prototype.take()"
description: "Возвращает итератор, завершающийся после фиксированного числа шагов"
baseline:
  - group: iterator-methods
    features:
      - javascript.builtins.Iterator.take
authors:
  - vitya-ne
related:
  - js/iterator
  - js/iterator-to-array
  - js/generators
tags:
  - doka
---

## Кратко

Метод `Iterator.prototype.take()` возвращает итератор, завершающийся после указанного количества успешных шагов итерации или раньше, если исходный итератор завершится. О том, что такое итератор, можно прочитать в статье [«Итератор»](/js/iterator/).

## Пример

У нас есть коллекция фильмов и итератор для её обхода:

```js
const movies = [
  'Братство кольца',
  'Две крепости',
  'Возвращение короля',
  'Нежданное путешествие'
]

const baseIterator = movies.values()
```

Создадим из `baseIterator` новый итератор, для обхода только части коллекции, например для получения только 2-x значений:

```js
const limitIterator = baseIterator.take(2)

for ( item of limitIterator ) {
  console.log(item)
}
// Братство кольца
// Две крепости
```

## Как пишется

`Iterator.prototype.take()` принимает один обязательный аргумент — число, определяющее максимальное количество значений, которые может вернуть созданный итератор.

При выполнении метода произойдёт преобразование аргумента в целое положительное число, поэтому тип аргумента не ограничен `Integer`. Например, равнозначными будут значения:

- 1
- "1"
- `true`
- [1]
- 1.7

Если переданное значение не может быть преобразовано или является отрицательным числом, будет брошена ошибка `RangeError`.
Попытка вызвать метод без аргумента так же приведёт к ошибке `RangeError`.

`Iterator.prototype.take()` возвращает новый итератор.

## Как понять

Работая с итераторами можно столкнуться с ситуацией, когда необходимо ограничить количество получаемых значений. Самым простым примером когда это может понадобиться является "бесконечный" итератор — итератор не имеющий конечного состояния (`{ done:true }`).

Рассмотрим пример. У нас есть функция-генератор паролей:

```js
function* passwordGenerator(length = 8) {
  charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'

  while (true) {
    let password = '';
    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * charset.length);
      password += charset[random];
    }
    yield password;
  }
}
```

При её вызове будет создан итератор, возвращающий строку-пароль:

```js
const passwords = passwordGenerator()

console.log(passwords.next().value)
// Z@1pivgS
console.log(passwords.next().value)
// PXoDm)B8
```