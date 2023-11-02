---
title: "Как анализировать алгоритмы?"
description: "Разбираемся, что такое сложность алгоритмов, как посчитать сложность по времени и по памяти."
authors:
  - eshevlyakova
related:
  -
tags:
  - doka
---

## Кратко
Разбираемся с понятием «вычислительная сложность алгоритма». Обычно оценивают две сложности:
- _временную сложность_: как связано количество операций, которые будут выполняться при работе алгоритма с объёмом данных на вход;
- _сложность по памяти_: как связано количество памяти, нужной алгоритму с размером входных данных.

Для обоих определений мы хотим оценить связь потребляемого алгоритмом ресурса (время или память) с количеством данных на входе. Интуитивно кажется, что, чем больше размер входных данных, тем медленнее будет работать алгоритм и тем больше он будет потреблять памяти, однако это не всегда так. Например, время работы функции `const doNothing = (...asManyDataAsYouLike) => { }` скорее всего не будет зависеть от количества переданных ей аргументов. Оценка сложности такой функции `O(1)`. Попробуем разобраться, что это значит.

## Обозначения
Есть несколько способов оценки сложности алгоритмов. Основная идея этих оценок – получить какое-то ограничение для функции, которая связывает размер входных данных и количество операций или размер памяти. При этом не нужно определять эту функцию точно. Нам нужна именно оценка.
Более точный термин – _асимптотическая_ сложность. Это значит, что для какого-то _достаточно большого_ значения входных данных эта оценка будет верна, но она не обязательно верна для небольшого количества данных. Точное определение можно найти [в Википедии](https://ru.wikipedia.org/wiki/%D0%92%D1%8B%D1%87%D0%B8%D1%81%D0%BB%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F_%D1%81%D0%BB%D0%BE%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D1%8C).
Вот некоторые способы оценки сложности алгоритма:
- `O` - читается как («О» или «О-большое» или «биг (big) О» описывает оценку сложности сверху. В скобках после О указывает функция, которая ограничивает сложность. Например `O(n)` Означает, что сложность алгоритма растёт линейно. При этом как именно линейно не важно. Давайте рассмотрим несколько примеров:
  ```js
    const sum = (someArray) => someArray.reduce((sum, value) => sum + value, 0);
  ```
  Вычислительная сложность этого алгоритма O(n), мы обрабатываем каждый элемент один раз, если в нашем массиве n элементов, мы выполним тело функции reduce n раз
  ```js
    const sumAndProd = (someArray) => {
        const sum = (someArray) => someArray.reduce((sum, value) => sum + value, 0);
        const prod =  (someArray) => someArray.reduce((prod value) => prod* value, 1);
        return sum * prod;
    }
  ```
  Вычислительная сложность этого алгоритма тоже будет равна O(n), мы обрабатываем каждый элемент два раза, если в нашем массиве n элементов, мы выполним тело функции reduce n раз для суммирования и n раз для произведения, итого 2 * n раз. Коэффициент не имеет значения, при условии что он не зависит от размера входных данных. O(k * n) = O(n).
- Сигма - (читается как «Сигма» или «Сигма-большая») описывает оценку сложности снизу. В скобках после `Ω` указывает функция, которая ограничивает сложность. Например `Ω(n)` означает, что сложность растёт так же или быстрее чем линейно. Например, квадратичная сложность `n * n` это тоже `Ω(n)`.
- `ϴ(n)` - (читается как «Тета» или «Тета-большая») описывает плотную оценку алгоритма. В скобках после ϴ указывает функция, которая ограничивает сложность как сверху так и снизу. Рассмотрим предыдущий пример:
  ```js
    const sumAndProd = (someArray) => {
        const sum = (someArray) => someArray.reduce((sum, value) => sum + value, 0);
        const prod =  (someArray) => someArray.reduce((prod value) => prod* value, 1);
        return sum * prod;
    }
  ```
Наш алгоритм выполняет (условно) 2 * n операций. Это значит что сверху количество ограничено функцией от n, например `2 * n < 3 * n`, снизу это тоже ограничено функцией от n, например `2 * n > n`.

Для полноты картины приведём точные формулировки для каждого из определений.

- _f(n) = O(g(n))_ – существует положительное число `c`, такое что начиная с какого-то n всегда выполняется условие `0 <= f(n) < c * g(n)`;
- _f(n) = Ω(g(n))_ – существует положительное число `c`, такое что начиная с какого-то n всегда выполняется условие `0 <= f(n) <= c * g(n)`;
- _f(n) = ϴ(g(n))_ – существуют два положительных числа `c1` и `c2`, таких что начиная с какого-то n всегда выполняется условие  `c1 * g(n) <= f(n) <= c2 * n`.

Также есть алгоритмы, которые имеют вычислительную сложность `O(1)` по памяти, их называют алгоритмами на месте (in-place). Такие алгоритмы могут использовать дополнительную память, но размер этой памяти не зависит от размера входных данных. Например, чтобы посчитать сумму всех чисел мы используем переменную в которой храним сумму. Эта переменная занимает место, но не зависит от того сколько чисел мы складываем.

## Примеры

Для лучшего понимания давайте рассмотрим ещё несколько примеров. Представим, что мы хотим сменить наш логотип и выбрать дизайнера с наибольшим опытом. У нас есть массив с числами в годах и, следовательно, нам нужно найти максимальное число:

```js
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
```

Этот код имеет временную сложность `O(n)`, потому что он выполняет одну операцию для каждого элемента массива. Если есть массив из `x` элементов, то этот код выполнится за `x` операций.

Теперь представим, что у нас есть отсортированный по возрастанию массив с опытом дизайнеров, и мы всё так же хотим найти самого опытного дизайнера:

```js
function findMax(arr) {
  return arr[arr.length - 1];
}
```

Этот код имеет временную сложность `ϴ(1)`, потому что он выполняет только одну операцию, независимо от размера массива.

Наконец, представим, что у есть массив чисел, которые также обозначают опыт дизайнеров, и мы должны отсортировать числа по возрастанию:

```js
function sortArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
```

Этот код имеет временную сложность `ϴ(n^2)`, потому что он выполняет n операций для каждого элемента массива. Итого n * n. Если массив состоит из 10 элементов, то код выполнится за 100 операций.

Теперь рассмотрим пример in-place алгоритма: представим, что у нас есть две корзины с яблоками, и мы хотим поменять их местами:
```js
  let basket1 = ["яблоко", "яблоко", "яблоко"];
  let basket2 = ["апельсин", "апельсин", "апельсин"];

  [basket1[0], basket2[0]] = [basket2[0], basket1[0]];

  console.log(basket1); // ["апельсин", "яблоко", "яблоко"]
  console.log(basket2); // ["яблоко", "апельсин", "апельсин"]
```
В этом примере мы меняем местами первые элементы двух массивов basket1 и basket2. Мы используем деструктуризацию массива для временного хранения значений этих элементов и меняем их местами непосредственно в памяти.

Для сортировки реальных массивов не стоит использовать подобные алгоритмы. Существуют более эффективные сортировки, имеющие вычислительную сложность `n * log(n)`. Меньшей вычислительной сложности для сортировки основанной на сравнении двух элементов достичь невозможно.