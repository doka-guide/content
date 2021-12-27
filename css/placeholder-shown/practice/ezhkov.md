🛠 Этот псевдокласс можно использовать совместно с псевдоклассом [`:invalid`](/css/invalid-valid/) для стилизации некорректно заполненных полей ввода.

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

<iframe title="Пример placeholder-shown" src="../demos/example/" height="182"></iframe>
