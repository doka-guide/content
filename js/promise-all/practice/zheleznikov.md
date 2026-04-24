🛠 `Promise.all()` удобно использовать, когда нужно дождаться нескольких независимых асинхронных операций и продолжить работу только после того, как все они завершатся успешно.

Например, перед отправкой формы регистрации нужно проверить, свободны ли email и логин, действителен ли промокод.

```js
const emailCheck = checkEmail(email) // Проверка, что email свободен
const loginCheck = checkLogin(login) // Проверка, что логин доступен
const promoCodeCheck = checkPromoCode(promoCode) // Проверка промокода

Promise.all([emailCheck, loginCheck, promoCodeCheck])
  .then(() => submitRegistration({ email, login, promoCode }))
  .catch((error) => {
    console.error('Не удалось проверить данные формы:', error)
  })
```

Если все проверки завершатся успешно, выполнится обработчик `then()`, и форму можно будет отправить. Если хотя бы одна из них завершится ошибкой, промис, возвращённый `Promise.all()`, будет отклонён и сработает обработчик `catch()`.
