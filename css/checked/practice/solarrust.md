🛠 Очень часто этот класс пригождается, когда вы делаете какой-то нестандартный элемент управления на основе чекбокса или радиокнопок. В этом случае стандартные элементы скрываются, но их поведение, в частности псевдокласс `:checked`, позволяет что-то переключать вообще без JavaScript.

Например, вот это выпадающее меню реализовано на чистом HTML с использованием трюка в чекбоксом:

```html
<div class="dropdown">
  <input type="checkbox" id="menu">
  <label for="menu">Выбери черепашку</label>
  <ul>
    <li><a href="#">Леонардо</a></li>
    <li><a href="#">Рафаэль</a></li>
    <li><a href="#">Донателло</a></li>
    <li><a href="#">Микеланджело</a></li>
    <li><a href="#">Боттичелли</a></li>
    <li><a href="#">Караваджо</a></li>
  </ul>
</div>
```

```css
.dropdown {
  position: relative;
}

.dropdown input,
.dropdown ul {
  display: none;
}

.dropdown label {
  cursor: pointer;
  border-bottom: 3px dashed #2E9AFF;
}

.dropdown ul {
  position: absolute;
  left: calc(100% + 25px);
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  padding: 40px 10px;
  list-style: none;
  background-color: #FFFFFF;
  font-size: 20px;
}

.dropdown a {
  color: #000000;
}

.dropdown :checked ~ label {
  color: #2E9AFF;
}

.dropdown :checked ~ ul {
  display: inline-block;
}
```

<iframe title="Выпадающее меню" src="../demos/choose/" height="330"></iframe>
