🛠 Очень часто этот класс пригождается, когда вы делаете какой-то нестандартный элемент управления на основе чекбокса или радиокнопок. В этом случае стандартные элементы скрываются, но их поведение, в частности псевдокласс `:checked`, позволяет что-то переключать вообще без JavaScript.

Например, вот это выпадающее меню реализовано на чистом HTML с использованием трюка в чекбоксом:

```html
<div class="dropdown">
  <input type="checkbox" id="menu">
  <label for="menu">Выбери меня</label>
  <ul>
    <li><a href="#">Леонардо</a></li>
    <li><a href="#">Рафаэль</a></li>
    <li><a href="#">Донателло</a></li>
    <li><a href="#">Микеланджело</a></li>
  </ul>
</div>
```

```css
.dropdown {
  position: relative; /* Относительное позиционирование */
}

.dropdown input,
.dropdown ul {
  display: none; /* Прячем */
}

.dropdown label {
  cursor: pointer; /* Вид курсора */
  border-bottom: 3px dashed #1a5ad7; /* Пунктир снизу */
}

.dropdown ul {
  position: absolute; /* Абсолютное позиционирование */
  left: 0;
  top: 1.4em; /* Положение меню */
  margin: 0;
  padding: 5px; /* Убираем отступы и поля */
  list-style: none; /* Убираем маркеры списка */
  background: #1a5ad7; /* Цвет фона */
  font-size: 20px;
}

.dropdown a {
  color: #fff; /* Цвет ссылок */
}

.dropdown :checked ~ ul {
  display: inline-block; /* Показываем меню */
}
```

<iframe title="Выпадающее меню" src="../demos/choose/" height="300"></iframe>
