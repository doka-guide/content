🛠 Этот псевдокласс можно использовать совместно с псевдоклассом [`:invalid`](/css/invalid-valid) для стилизации некорректно заполненных полей ввода.

🛠 Иногда длина подсказки больше ширины текстового поля. В результате она некрасиво обрезается. Можно использовать псевдокласс `:placeholder-shown`, чтобы сделать обрезку чуть симпатичнее:

```html
<p>Обычная обрезка</p>
<input type="text" placeholder="Можно искать по номеру телефона, фамилии или email">

<p>Красивая обрезка</p>
<input type="text" placeholder="Можно искать по номеру телефона, фамилии или email" class="ellipsis">
```

```css
.ellipsis:placeholder-shown {
  text-overflow: ellipsis;
}
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="WNoxXbW" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="placeholder-shown">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/WNoxXbW">
  placeholder-shown</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
