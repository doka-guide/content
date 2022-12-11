🛠 Если нужно добавить текст в элемент, то всегда используйте свойство `textContent`. Другие свойства обрабатывают HTML, это может привести к дырам в безопасности.

🛠 Для работы с классами элемента есть удобные методы, доступные через свойство [`classList`](/js/element-classlist/):

- добавить класс — метод `add()`.
- удалить класс — метод `remove()`.

```js
const element = document.getElementsByTagName('div')[0]
element.classList.add('hello')
element.classList.remove('bye')
```

🛠 В HTML часто используют data-атрибуты. Они используются, когда нужно передать данные через HTML. Например, когда сервер собирает стартовый HTML, он может поместить значения в data-атрибуты. Фронтендер затем может использовать их, вместо того, чтобы отправлять запрос на сервер. Название таких атрибутов начинаются с префикса `data-`. Для доступа к ним из JavaScript используется свойство [`dataset`](/js/element-dataset/):

```js
const element = document.getElementsByTagName('div')[0]

// получить значение атрибута data-columns тега div
console.log(element.dataset.columns)
// изменить значение
element.dataset.columns = 99
```

🛠 У элементов очень много свойств. Если нужно что-то получить из элемента, то скорее всего уже есть свойство, которое хранит эти данные.

🛠 Если нужно удалить элемент и все вложенные в него, воспользуйтесь методом `remove()`:

```js
const element = document.querySelector('#some-element')
element.remove()
```
