🛠️ Для улучшения пользовательского опыта можно использовать JavaScript для предварительной проверки выбранных файлов до отправки формы.

Пример:

```javascript
document.getElementById('cat-picture').addEventListener('change', function() {
  const file = this.files[0]
  if (file && !file.type.match('image.*')) {
    alert('Пожалуйста, выберите изображение.')
    this.value = ''
  }
})
```

🛠 В современных фреймворках, таких как React или Vue, можно интегрировать атрибут `accept` напрямую в ваш компонентный подход.

Например, в React компоненте это может выглядеть так:

```jsx
function UploadForm() {
  return (
    <form method="post">
      <label htmlFor="cat-picture">Прикрепите фото кота</label>
      <input
        type="file"
        id="cat-picture"
        name="cat-picture"
        accept=".jpg, .jpeg, .png"
      />
      <button>Прикрепить</button>
    </form>
  );
}
```
