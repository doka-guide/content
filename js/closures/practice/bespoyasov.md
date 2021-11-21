Используйте `let` и `const` вместо `var`, чтобы не сойти с ума.

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

