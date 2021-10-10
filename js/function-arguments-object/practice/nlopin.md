🛠️ В новом коде лучше применять синтаксис остаточных параметров. В этом случае у нас появляется настоящий массив переданных аргументов. Вот как будет выглядеть пример из начала статьи в этом синтаксисе:

```js
function joinStrings(...rest) {
  return rest
    .filter(function (value) {
      return typeof value === 'string'
    })
    .join(' ')
}

const result = joinStrings('hello', 12, 'world', false, null)
console.log(result)
// hello world
```
