🛠 Когда у нас много однотипных элементов с одинаковой обработкой событий хорошим решением может быть использование делегирования событий.

Делегирование событий (event delegation) — это техника, при которой обработчик событий вешается не на каждый дочерний элемент, а на их общего родителя.

Этот приём работает благодаря [всплытию событий](/js/events/#vsplytie-sobytiy), а так же тому, что событие содержит данные о том, какой элемент его вызвал:

- `event.target` — на ком произошло событие (нажали, навели...);
- `event.currentTarget` — текущий элемент. Элемент, к которому добавлен слушатель  и на котором в данный момент выполняется обработчик.

```js
parentElement.addEventListener(
  'click',
  (event) => {
    if (event.target) {
      console.log('Кликнули на:', event.target.textContent);
    }
  }
)
```
Рассмотрим простой пример, где по клику нужно вычеркнуть элемент списка. В примере вешаем обработчик только на родительский элемент ul:

```html
<ul id="tasks">
  <li>Купить хлеб</li>
  <li>Покормить кота</li>
  <li>Сделать ДЗ</li>
</ul>
```
```js
const tasksList = document.getElementById('tasks')

tasksList.addEventListener('click', (event) => {
  const li = event.target.closest('li'); // Ищем ближайший li

  if (li) {
    li.classList.toggle('completed'); // Зачеркиваем задачу
  }
});
```

<iframe title="Делегирование событий" src="../demos/delegation/" height="250"></iframe>