🛠 `finally()` отлично работает в случаях, когда нужно убрать лоадер со страницы или кнопки. Он сработает вне зависимости от результата промиса, поэтому можно избежать дублирования кода.

Вместо:

```js
// используем, флаг чтобы показать что форма отправляется
let isLoading = true
sendForm().then((res) => {
    isLoading = false
    alert('ok')
}).catch((err) => {
    isLoading = false
    alert(`Ошибка: ${err.message}`)
})
```

Можно написать:

```js
let isLoading = true
sendForm().then((res) => {
    alert('ok')
}).catch((err) => {
    alert(`Ошибка: ${err.message}`)
}).finally(() => {
    isLoading = false
})
```
