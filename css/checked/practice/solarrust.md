🛠 Псевдокласс `:checked` выручает, когда вы делаете свой элемент управления на основе чекбокса или радиокнопок. Стандартный элемент прячут, а `:checked` переключает стили без JavaScript.

Например, вот это выпадающее меню сделано на HTML и CSS с помощью трюка с чекбоксом:

```html
<div class="dropdown">
  <input type="checkbox" id="menu">
  <label for="menu">Выбери черепашку</label>
  <ul>
    <li><button type="button">Леонардо</button></li>
    <li><button type="button">Рафаэль</button></li>
    <li><button type="button">Донателло</button></li>
    <li><button type="button">Микеланджело</button></li>
    <li><button type="button">Боттичелли</button></li>
    <li><button type="button">Караваджо</button></li>
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

.dropdown button {
  border: none;
  background-color: transparent;
  color: #000000;
  font-size: inherit;
  text-decoration: underline;
  cursor: pointer;
}

.dropdown :checked ~ label {
  color: #2E9AFF;
}

.dropdown :checked ~ ul {
  display: inline-block;
}
```

<iframe title="Выпадающее меню" src="../demos/choose/" height="330"></iframe>

Учтите, что чекбокс со [`display: none`](/css/display/) недоступен с клавиатуры: до такого меню не добраться клавишей <kbd>Tab</kbd>. Если делаете переключатель на чекбоксе, прячьте его через [`opacity: 0`](/css/opacity/) и оформляйте фокус, как в демке из раздела «Пример» основной статьи. Так чекбокс останется в порядке обхода с клавиатуры.

Но для настоящих выпадающих меню трюк всё равно не лучший выбор. Скринридер объявит переключатель как чекбокс и не сообщит, открыто меню или нет. Удобнее [Popover API](/html/popover/) с кнопкой, у которой есть атрибут `popovertarget`. Браузер сам откроет и закроет всплывающий элемент, закроет его по <kbd>Esc</kbd> и клику мимо и передаст скринридеру, открыт ли он.

🛠 Раньше `:checked` дотягивался только до соседей чекбокса, которые стоят после него в разметке: через [комбинаторы](/css/combined-selectors/) `+` и `~`. С псевдоклассом [`:has()`](/css/has/) можно оформить любого предка. Например, подсветить карточку тарифа, в которой отметили радиокнопку:

```css
.plan:has([type="radio"]:checked) {
  border-color: #2E9AFF;
}
```
