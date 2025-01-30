🛠 Для улучшения UX добавляйте визуальную подсказку, что поле нельзя редактировать:

```css
[readonly] {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
```

🛠 Если нужно временно запретить редактирование поля, удобно переключать `readonly` через JavaScript:

```js
const toggleReadOnly = (event) => {
  const input = document.querySelector('input')
  input.readOnly = !input.readOnly
}
```
