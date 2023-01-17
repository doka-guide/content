🛠 💡 Так как псеводэлементы `::before` и `::after` отсутствуют в дереве DOM, то невозможно на них повесить JavaScript-событие. В большинстве случаев достаточно отслеживать события на самом элементе и через него менять свойства псевдоэлемента. Если же необходимо отследить, например, клик именно по псвдоэлементу, то можно использовать хак со сравнением offsetX.
Например, создадим управляющий контрол, позволяющий менять количество товаров в корзине. При этом кнопки "+" и "-" у нас будут псевдоэлементами.
```html
<span class="quantity-change">0</span>
```

Зададим стили для самого "инпута" (💡 кстати, теги input и img не имеют псевдоэлементов ::before и ::after)

```css
      .quantity-change {
        width: 160px;
        height: 40px;
        display: flex;
        color: #333;
        background-color: #fff;
        cursor: text;
        margin: 0;
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
        outline: 0;
        padding: 0;
        border: 1px solid #dadada;
        border-radius: 5px;
        outline: none;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        user-select: none;
      }
```

Для данного хака нужно внимательно следить за шириной элемента, так как событие будет вычисляться именно по ширине. В данном случае ширина элемента 160px. Управляющие контролы (в роли которых у нас выступят  ::before и ::after) будут у на по 40px

```css
      .quantity-change::before, .quantity-change::after {
        content: '-';
        display: flex;
        height: 40px;
        width: 40px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 24px;
      }
      .quantity-change::after {
        content: '+';
      }
```

Теперь, зная ширину элементов и контролов, считаем, что нажатие первых 40px является событием для ::before, а нажатие последних 40px - для ::after

```javascript
      const quantity = document.querySelector('.quantity-change')
      let cnt = Number(quantity.textContent)

      quantity.addEventListener("click", (evt) => {
        if(evt.offsetX <= 40 && cnt > 0) {
          cnt--
        } else if(evt.offsetX >= 120) {
          cnt++
        }
        quantity.textContent = cnt
      })
```

Бинго! Теперь мы можем отследить нажатия на ::before и ::after и выполнить какие-либо нужные действия.
<iframe title="JavaScript-события для псевдоэлементов" src="../demos/javascript-events/" height="420"></iframe>

Данный метод стоит применять с осторожностью, с оглядкой на media-запросы, которые могут изменить размеры элемента и все сломать. Если есть возможность спроектировать свой код без связки "Псевдоэлементы + JavaScript", то это будет хорошим решением.
