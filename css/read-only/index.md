---
title: "`:read-only`"
description: "Задаёт стили полям ввода, которые доступны только для чтения."
baseline:
  - group: read-write-pseudos
    features:
      - css.selectors.read-only
authors:
  - kamenskaya
contributors:
  - drakesbot12
related:
  - css/link
  - css/hover
  - css/focus
keywords:
  - стили для чтения
  - readonly
  - поля ввода
  - псевдокласс
tags:
  - doka
---

## Кратко

Псевдокласс `:read-only` используется для задания стилей полям ввода только для чтения. Другими словами - данные в этом поле ввода пользователь не может изменить или удалить. Поле ввода при этом получает фокус, а данные в поле можно выделить и скопировать.

## Пример

Стилизуем поля только для чтения, делая их визуально отличными от обычных полей:

```css
input:read-only {
  background-color: #f5f5f5;
  color: #666;
  border-color: #ddd;
  cursor: not-allowed;
}

textarea:read-only {
  background-color: #f5f5f5;
  color: #666;
  border-color: #ddd;
  cursor: not-allowed;
}
```

```html
<input type="text" value="Это поле только для чтения" readonly>
<textarea readonly>Это текстовое поле тоже только для чтения</textarea>
<input type="text" value="Обычное поле для ввода">
```

<iframe title="Демонстрация стилизации полей только для чтения с помощью :read-only" src="demos/basic/" height="550"></iframe>

## Как пишется

Псевдокласс `:read-only` применяется к тегам для ввода текста ([`<input>`](/html/input/) или [`<textarea>`](/html/textarea/)) с атрибутом [`readonly`](/html/readonly/). Также может быть применён к html-тегам, для которых установлен атрибут [`contenteditable`](/html/global-attrs/).

После селектора для поля ввода текста ([`<input>`](/html/input/) и [`<textarea>`](/html/textarea/)) или селектора с атрибутом [`contenteditable`](/html/global-attrs/) ставим двоеточие и пишем ключевое слово `read-only`.
В браузере Firefox `:read-only`также поддерживается с префиксом -moz: `:-moz-read-only`.

```css
/* Базовый синтаксис */
input:read-only {
  /* стили */
}

/* Для Firefox */
input:-moz-read-only {
  /* стили */
}
```

## Как понять

`:read-only` применяется к элементам, которые пользователь не может редактировать, но может взаимодействовать с ними (получить фокус, выделить текст, скопировать содержимое).

**Основные случаи использования:**
- Поля с атрибутом `readonly` - пользователь видит данные, но не может их изменить
- Элементы с [`contenteditable="false"`](/html/global-attrs/#contenteditable) - контент нельзя редактировать
- Системные поля - например, поля с автоматически вычисляемыми значениями

**Отличие от `:disabled`:**
- `:read-only` - поле получает фокус, можно выделить и скопировать текст
- [`:disabled`](/css/disabled/) - поле не получает фокус, текст нельзя выделить

## Подсказки

💡 Используйте `:read-only` чтобы сделать поля только для чтения заметно отличными от обычных полей.
💡 Рекомендуется установить [`cursor: not-allowed`](/css/cursor/) для полей только для чтения, чтобы показать, что их нельзя редактировать.
💡 Используйте приглушённые цвета фона и текста для полей только для чтения
💡 `:read-only` хорошо работает вместе с [`:focus`](/css/focus/) и [`:hover`](/css/hover/) для создания интерактивных стилей.
