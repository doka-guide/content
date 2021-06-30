Используйте скобки, чтобы обозначить блок вычислений в `switch`, если он большой:

```js
switch (animalType) {
  case "dog": {
    // Если здесь нам надо выполнить несколько строчек,
    // удобно обернуть все операции в блок из {...}.
    // Тогда все переменные и операции
    // будут ограничены этим блоком.
    const legs = 4
    const species = "mammal"
    // ...
  }

  case "fish": {
    const legs = 0
    const swims = true
    // ...
  }
}
```

Используйте IIFE, чтобы создавать модули, которые не влияют на другие и не засоряют глобальную область видимости:

```js
;(function () {
  // ...Тело модуля.
})()
```

Используйте замыкания, чтобы предоставлять контролируемый доступ к внутренним значениям модуля или чтобы разграничивать области видимости и имён:

```js
function counter() {
  let state = 0

  function increase() {
    state++
  }

  function decrease() {
    state--
  }

  function valueOf() {
    console.log(state)
  }

  return {
    increase,
    decrease,
    valueOf,
  }
}

const ticktock = counter()

ticktock.increase()
ticktock.valueOf() // 1

ticktock.decrease()
ticktock.valueOf() // 0
```

Используйте `let` и `const` вместо `var`, чтобы не сойти с ума.
