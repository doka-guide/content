Любой асинхронный код можно переписать в синхронном стиле через `async/await`, чтобы использовать единый стиль обработки ошибок, используя `try...catch`. Например, перепишем установку таймаута из примера выше:

```js
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function timeout(fn, ms) {
  try {
    // Ждем таймаут
    await wait(ms)

    // И выполняем функцию
    fn()
  } catch (err) {
    // Ловим ошибку
    console.log('Ошибка', err)
  }
}
```

Теперь можно вызывать функцию как прежде, ошибка будет поймана.

```js
timeout(() => {
  throw Error('ошибка')
}, 1000)
```
