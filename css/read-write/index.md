---
title: "`:read-write`"
description: "Показываем возможность изменения элемента."
authors:
  - delioncourts
keywords:
  - псевдокласс
related:
  - html/textarea
  - html/input
  - css/pseudoclasses
tags:
  - doka
  - placeholder
---

## Кратко

Псевдокласс `:read-write` показывает что элемент, например, [`<input>`](/html/input/) или [`<textarea>`](/html/textarea/), изменяется.

## Пример

Псевдокласс `:read-write` показывает, что поле ввода можно изменить.

```html
<form>
  <label for="input-field">Зима близко</label>
  <input id="input-field" type="text">
</form>
```

```css
input:read-write {
  border: 1px solid blue;
}
```

Как и другие селекторы псевдоклассов, `:read-write` может использоваться с другими псевдоэлементами и псевдоклассами.

```css
textarea:read-write:focus {
  box-shadow: 0 5px 10px gray;
}

textarea:read-write::before {
  content: "Что-то меняется...";
  color: #aaa;
}
```

## Как пишется

Элементы, к которым применяется псевдокласс `:read-write`:

- `<input>` — элементы любого типа, с возможностью редактирования и доступные не только для чтения. Это означает что у них не установлены атрибуты `:read-only` или [`disabled`](/html/disabled/).
- `<textarea>` — элементы доступны для изменения (без атрибутов `:read-only` или `disabled`).
- Любой элемент не `<input>` и не `<textarea>`, у которого установлен атрибут [contenteditable](/html/global-attrs/).

После элемента из списка выше ставим двоеточие и пишем ключевое слово `read-write`.

```css
input:read-write,
input:-moz-read-write {
  border: 1px solid red;
}
```

Псевдокласс `:read-write` поддерживается в Chrome, Safari и Opera. Firefox поддерживает псевдокласс со специальным префиксом `-moz-`.
