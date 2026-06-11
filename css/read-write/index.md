---
title: "`:read-write`"
description: "Показываем возможность изменения элемента."
authors:
  - delioncourts
contributors:
  - drakesbot12
keywords:
  - псевдокласс
related:
  - html/textarea
  - html/input
  - css/pseudoclasses
tags:
  - doka
---
## Кратко

Псевдокласс `:read-write` применяется к элементам формы и другим узлам, которые пользователь может редактировать. Он помогает отличать редактируемые поля от тех, которые доступны только для чтения.

К таким элементам относятся, например, `<input>`, `<textarea>` и любые элементы с атрибутом `contenteditable`.

## Пример

Покажем базовое использование: выделим редактируемое поле синей рамкой.

```html
<label>
  Редактируемое поле
  <input type="text" placeholder="Можно менять текст">
</label>
<label>
  Только для чтения
  <input type="text" value="Нельзя редактировать" readonly class="readonly">
</label>
<label>
  Textarea (редактируемое)
  <textarea placeholder="Пиши сюда..."></textarea>
</label>
```

```css
input:read-write,
textarea:read-write {
  border-color: #2E9AFF;
}
```

<iframe title="Демонстрация работы :target" src="demos/basic/" height="420"></iframe>

## Как пишется

Псевдокласс `:read-write` выбирает элементы, которые можно редактировать.

Это:

- `<input>` без атрибутов `readonly` и `disabled`
- `<textarea>` без `readonly` и `disabled`
- элементы с `contenteditable`

```css
input:read-write,
textarea:read-write,
[contenteditable]:read-write {
  border: 1px solid #2E9AFF;
}
```

## Как понять

Браузер автоматически определяет, можно ли изменять содержимое элемента.

Если элемент:

- не заблокирован (`disabled`)
- не только для чтения (`readonly`)
- или явно редактируем (`contenteditable`)

-> он попадает под `:read-write`.

## Подсказки

💡 Чаще всего `:read-write` не используют напрямую в больших проектах, потому что его поведение почти совпадает с обычными селекторами для input/textarea.
💡 Но он полезен, если у тебя есть гибкая форма, где состояние элементов меняется динамически через JavaScript.
💡 В Firefox до сих пор может использоваться префикс:
```css
input:-moz-read-write {
  border-color: #2E9AFF;
}
```
