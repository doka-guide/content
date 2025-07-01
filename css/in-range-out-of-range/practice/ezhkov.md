🛠 Псевдоклассы `:in-range` и `:out-of-range` можно использовать в более сложных селекторах, чтобы, например, показать ошибку ввода.

```css
.with-range:out-of-range + .validation-error {
  opacity: 1;
  visibility: visible;
}
```

<iframe title="Ошибка при неверном вводе" src="../demos/out-of-range-error/" height="200"></iframe>
