🛠 В современных фреймворках, таких как React или Vue, можно интегрировать атрибут `accept` напрямую в ваш компонентный подход. Например, в React компоненте это может выглядеть так:

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
