🛠 «Выключать» взаимодействие с кнопками или другими элементами формы удобнее именно атрибутом `disabled`, потому что он сразу же отключает возможность нажать на этот элемент без дополнительных стилей. И, ориентируясь на него, гораздо удобнее прописывать стили для неактивных элементов, используя псевдокласс `disabled`.

Код для кнопки из моего последнего проекта:

Стили для активной кнопки в обычном состоянии:

```css
.additional-btn {
  padding: 2rem 3rem;
  border: 1px solid currentColor;
  font-family: inherit;
  font-size: 1.6rem;
  color: #FF6650;
  text-decoration: none;
  background-color: transparent;
  transition: border 0.3s, color 0.3s;
  cursor: pointer;
  user-select: none;
}
```

Стили для кнопки при наведении курсора или клике:

```css
.additional-btn:active,
.additional-btn:hover {
  color: #FF5050;
  transition: none;
}
```

Стили для кнопки, когда она неактивна:

```css
.additional-btn:disabled {
  cursor: default;
  color: #A44234;
}
```

<iframe title="Стилизация состояний кнопок" src="../demos/buttons/" height="320"></iframe>
