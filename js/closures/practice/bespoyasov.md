Используйте скобки в `switch`, если в `case` нужно создать блок вычислений больше одной строки. Например, это может пригодиться для улучшения читабельности в редьюсерах при работе с Redux:

```js
function someReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const users = [...state.users, action.user]
      return {...state, users}
    }
    case 'remove': {
      const users = state.users.filter(user => user.id !== action.user.id)
      return {...state, users}
    }
  }
}
```

<aside>Так как это отдельная область видимости, мы можем не беспокоиться об одинаковых названиях переменных.</aside>

Используйте IIFE для изолированных модулей или для эмуляции top-level await там, где его ещё нет:

```js
;(async () => {
  const result = await someAsyncFunction()
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
