🛠 Когда у нас много однотипных элементов с одинаковой обработкой событий, удобно делегировать события.

Делегирование событий (event delegation) — это техника, при которой обработчик событий вешается не на каждый дочерний элемент, а на их общего родителя.

Этот приём работает благодаря [всплытию событий](/js/events/#vsplytie-sobytiy), а также тому, что событие содержит данные о том, какой элемент его вызвал:

- `event.target` — целевой элемент. Элемент, на котором произошло событие (нажали, навели…);
- `event.currentTarget` — текущий элемент. Элемент, к которому привязан обработчик и на котором он сейчас выполняется.

```js
parentElement.addEventListener(
  'click',
  (event) => {
    console.log('Кликнули на:', event.target.textContent)
  }
)
```

Сделаем список задач, где по клику задача зачёркивается. Обработчик вешаем только на родительский элемент [`<ul>`](/html/ul/):

```html
<ul id="tasks">
  <li>
    <button class="task" type="button" aria-pressed="false">
      Купить хлеб
    </button>
  </li>
  <li>
    <button class="task" type="button" aria-pressed="false">
      Покормить кота
    </button>
  </li>
  <li>
    <button class="task" type="button" aria-pressed="false">
      Сделать ДЗ
    </button>
  </li>
</ul>
```

```js
const tasksList = document.getElementById('tasks')

tasksList.addEventListener('click', (event) => {
  // Ищем ближайшую кнопку задачи
  const task = event.target.closest('.task')

  // Проверяем, что кнопка внутри нашего списка
  if (task && tasksList.contains(task)) {
    // Отмечаем задачу выполненной или снимаем отметку
    const isDone = task.getAttribute('aria-pressed') === 'true'
    task.setAttribute('aria-pressed', String(!isDone))
  }
})
```

<iframe title="Делегирование событий" src="../demos/delegation/" height="320"></iframe>

Каждая задача — кнопка: так её можно отметить и с клавиатуры. Атрибут [`aria-pressed`](/a11y/aria-pressed/) сообщает скринридеру, выполнена ли задача.
