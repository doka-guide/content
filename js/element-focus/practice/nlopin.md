🛠 Если нужно установить фокус на элемент сразу после загрузки страницы, то лучше добавить атрибут `autofocus` прямо в вёрстку. Браузер установит фокус на элемент самостоятельно:

```html
<form action="/apply" method="POST">
  <label>
    Your name:
    <input type="text" name="name" autofocus>
  </label>

  <label>
    Email:
    <input type="email" name="email">
  </label>

  <button type="submit">Подать заявку</button>
</form>
```

🛠 Чтобы программно убрать фокус с элемента, нужно либо вызвать метод `blur()`, либо переместить фокус на другой элемент.

🛠 В Firefox нельзя вызвать метод `focus()` в обработчике события `onblur`. Это [баг, найденный в сентябре 2000 г.](https://bugzilla.mozilla.org/show_bug.cgi?id=53579), и он до сих пор не исправлен.

🛠 За рамку элемента в фокусе отвечает CSS-свойство [`outline`](/css/outline). [Не скрывайте её](http://www.outlinenone.com/), если на сайте нет альтернативного способы выделения элементов в фокусе.
