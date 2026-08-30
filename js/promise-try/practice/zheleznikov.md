🛠 `Promise.try()` может пригодиться в UI-китах и библиотеках, которые принимают колбэк и не знают заранее, вернёт ли он значение, промис или выбросит ошибку.

Предположим, что компонент формы принимает обработчик `onSubmit`. Пользователь библиотеки может передать в него функцию, которая:

- возвращает синхронный результат;
- возвращает промис;
- выбрасывает ошибку ещё до начала асинхронной операции.

Задача компонента - одинаково обработать успешный результат и ошибку в любом из этих случаев. Для этого можно обернуть вызов `onSubmit` в `Promise.try()`:

```js
function handleSubmit(onSubmit, formData) {
  return Promise.try(onSubmit, formData)
    .then((result) => {
      console.log('Успех:', result)
    })
    .catch((error) => {
      console.error('Ошибка:', error.message)
    })
}
```

Теперь `handleSubmit()` сможет единообразно обработать любой вариант `onSubmit`:

```js
// Синхронный обработчик
handleSubmit((formData) => {
  return `Форма отправлена: ${formData.email}`
}, { email: 'user@example.com' })
// Успех: Форма отправлена: user@example.com

// Асинхронный обработчик
handleSubmit((formData) => {
  return Promise.resolve(`Данные отправлены на сервер: ${formData.email}`)
}, { email: 'user@example.com' })
// Успех: Данные отправлены на сервер: user@example.com

// Обработчик с ошибкой
handleSubmit((formData) => {
  if (!formData.email) throw new Error('Поле email обязательно')
}, {})
// Ошибка: Поле email обязательно
```

Во всех случаях результат попадёт в `then()`, а ошибка — в `catch()`.
