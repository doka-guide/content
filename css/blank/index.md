---
title: "`:blank`"
description: "Совпадает с элементами ввода, значение которых пустое или состоит только из пробельных символов. Удобно стилизовать «пустые» поля."
author:
  - drakesbot12
keywords:
  - blank
  - пустое поле
  - whitespace-only
  - формы
related:
  - css/placeholder
  - css/user-valid-invalid
  - css/required
tags:
  - doka
---

## Кратко

`:blank` — псевдокласс, который совпадает с элементами, принимающими текстовый ввод (например, [`<input>`](/html/input/), [`<textarea>`](/html/textarea/)), когда их значение пусто или состоит только из пробельных символов.

Отличается от [`:placeholder-shown`](/css/placeholder-shown/) тем, что работает и без атрибута [`placeholder`](/css/placeholder/), а также считает строку из одних пробелов «пустой».

<aside>

⚠️ Является экспериментальным псевдоклассом и на данный момент не поддерживается ни в одном браузере.

</aside>

## Пример

Подсветим пустые поля и спрячем подсказку, когда пользователь что‑то ввёл.

```css
/* Пустые поля — неконтрастная рамка и подсказка */
input:blank,
textarea:blank {
  border: 1px solid #979797;
}

/* Когда поле непустое — выделим основным цветом раздела */
input:not(:blank),
textarea:not(:blank) {
  border-color: #2E9AFF;
}

/* Текстовую подсказку показываем только для пустых */
input:blank + .hint,
textarea:blank + .hint {
  display: block;
  color: #979797;
}

input:not(:blank) + .hint,
textarea:not(:blank) + .hint {
  display: none;
}
```

```html
<label>
  Ваш ник
  <input type="text">
  <span class="hint">Можно латиницей, 3–20 символов</span>
  <!-- Когда в поле только пробелы, :blank всё ещё совпадает -->
  <!-- Когда в поле любой непробельный символ, совпадать перестаёт -->
</label>
```

## Как пишется

```css
/* Совпадает, когда значение пустое или состоит только из пробелов */
input:blank { /* ... */ }

/* Обратный случай — когда есть хоть один непробельный символ */
input:not(:blank) { /* ... */ }
```

## Как понять

- `:blank` анализирует текущее значение элемента. Пустая строка и строка из одних пробельных символов — это «пусто».
- [`:placeholder-shown`](/css/placeholder-shown/) зависит от наличия и отображения плейсхолдера. Поле без [`placeholder`](/css/placeholder/) при пустом значении не будет [`:placeholder-shown`](/css/placeholder-shown/), но будет `:blank`.
- [`:empty`](/css/empty/) — про узлы в DOM (нет дочерних элементов/текста), а не про значение полей формы.
- Валидность ([`:invalid / :invalid`](/css/invalid-valid/), [`:user-invalid`](/css/user-valid-invalid/)) — другая плоскость: поле может быть одновременно `:blank` и [`:invalid`](/css/invalid-valid/) (например, [`required`](/css/required/)).

## Подсказки

💡 Комбинируйте с [`:focus`](/css/focus/)/[`:focus-visible`](/css/focus-visible/), чтобы аккуратно подсвечивать только активные пустые поля: `input:blank:focus { … }`.
💡 Используйте [`:not(:blank)`](/css/not/) для показа «кнопки очистки» или счётчика символов только когда поле непустое.
💡 Помните, что неразрывный пробел и другие пробельные символы тоже делают поле `:blank`.
