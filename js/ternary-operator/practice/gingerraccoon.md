При выборе между [`if...else`](/js/if-else/) и тернарным оператором в приоритет нужно ставить читабельность. Код читается чаще, чем пишется, поэтому чем лучше код читается, тем легче его понимать и изменять.

Разберём выбор между тернарным оператором и `if...else` на примерах.

Допустим, нужно по-разному поприветствовать нового и уже зарегистрированного пользователя. Здесь удобно использовать тернарный оператор, так как проверка короткая:

```js
const greetings = function(isRegistered, userName) {
  return isRegistered ? `Привет, ${userName}!` : 'Привет, незнакомец'
}
```

Когда появляются вложенные тернарные операторы, лучше переходить на `if...else`. Сравните код с тернарным оператором:

```js
const greetings = function(isRegistered, userName, bePolite) {
  return isRegistered ? `Привет, ${userName}!` : bePolite ? 'Здравствуйте!' : 'Привет, незнакомец'
}
```

И код с `if...else`:

```js
const greetings = function(isRegistered, userName, bePolite) {
  if (isRegistered) {
    return `Привет, ${userName}!`
  } else if (bePolite) {
    return 'Здравствуйте!'
  } else {
    return 'Привет, незнакомец'
  }
}
```

Если же приветствие зависит от роли, то цепочки вложенных тернарных операторов становятся нечитаемыми:

```js
const greetings = function(role) {
  return result = role === 'admin' ? 'Приветствую, босс' : role === 'moder' ? 'Приветствую, смотритель порядка' : role === 'user' ? 'Здравствуй, пользователь' : role === 'guest' ? 'Здравствуй, гость' : 'Привет, некто'
}
```

Такой код можно улучшить форматированием, но лучше использовать [`switch`](/js/switch/):

```js
const greetings = function(role) {
    switch (role) {
        case 'admin':
            return 'Приветствую, босс'
        case 'moder':
            return 'Приветствую, смотритель порядка'
        case 'user':
            return 'Здравствуй, пользователь'
        case 'guest':
            return 'Здравствуй, гость'
        default:
            return 'Привет, некто'
    }
}
```
