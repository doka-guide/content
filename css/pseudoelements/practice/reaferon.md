🛠 Так как псевдоэлементы `::before` и `::after` отсутствуют в дереве DOM, то невозможно на них повесить JavaScript-событие. В большинстве случаев достаточно отслеживать события на самом элементе и через него менять свойства псевдоэлемента. Если необходимо отследить, например, клик именно по псевдоэлементу, то можно использовать хак со сравнением `offsetX`.

Например, создадим управляющий контрол, позволяющий менять количество товаров в корзине. При этом кнопки «+» и «-» у нас будут псевдоэлементами.

<aside>

🚨️ Это демонстрационный пример. В реальной жизни лучше так не делать. Используйте подходящие HTML-теги.

</aside>

```html
<span class="quantity-change">0</span>
```

Зададим стили для поля ввода:

```css
.quantity-change {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 160px;
  height: 44px;
  border-radius: 6px;
  background-color: #2E9AFF;
  color: #000000;
  font-size: 24px;
  cursor: text;
  user-select: none;
}
```

Для данного хака нужно внимательно следить за шириной элемента, так как событие будет вычисляться именно по ширине. В данном случае ширина элемента 160 px.

Управляющие контролы (в роли которых у нас выступят `::before` и `::after`) будут по 40 px:

```css
.quantity-change::before, .quantity-change::after {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  font-size: 34px;
  cursor: pointer;
}

.quantity-change::before {
  content: '–';
}

.quantity-change::after {
  content: '+';
}
```

Теперь, зная ширину элементов и контролов, считаем, что нажатие первых 40 px является событием для `::before`, а нажатие последних 40 px — для `::after`:

```javascript
const quantity = document.querySelector('.quantity-change')
let counter = Number(quantity.textContent)

quantity.addEventListener('click', (event) => {
  if(event.offsetX <= 40 && counter > 0) {
    counter--
  } else if(event.offsetX >= 120) {
    counter++
  }
  quantity.textContent = counter
})
```

Бинго! Теперь мы можем отследить нажатия на псевдоэлементы и выполнить нужные действия.

<iframe title="JavaScript-события для псевдоэлементов" src="../demos/javascript-events/" height="200"></iframe>

Данный метод стоит применять с осторожностью, с оглядкой на медиавыражения, которые могут изменить размеры элемента и всё сломать. Если есть возможность спроектировать свой код без связки «Псевдоэлементы + JavaScript», то это будет хорошим решением.
