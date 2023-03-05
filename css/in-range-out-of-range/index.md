---
title: "`:in-range`, `:out-of-range`"
description: "Правильно ли заполнено поле ввода с цифрами? Проверяем прямо в браузере."
authors:
  - ezhkov
contributors:
  - skorobaeus
editors:
  - tachisis
keywords:
  - валидация
  - число
  - диапазон
related:
  - html/input
  - css/placeholder-shown
  - html/form
tags:
  - doka
---

## Кратко

Эти псевдоклассы используются для стилизации полей ввода, поддерживающих атрибуты `min` и `max`:

- `:in-range` для полей, в которых введённое значение **попадает в** диапазон от `min` до `max`;
- `:out-of-range` для полей, в которых введённое значение **не попадает в** диапазон от `min` до `max`.

## Пример

```html
<input class="with-range" type="number" min="10" max="20" step="1">
```

```css
.with-range {
  border: 1px solid black;
}

.with-range:in-range {
  border-color: green;
  background-color: rgb(0 255 0 / 20%);
}

.with-range:out-of-range {
  border-color: red;
  background-color: rgb(255 0 0 / 20%);
}
```

<iframe title="Поле ввода с диапазоном" src="demos/input-with-range/" height="200"></iframe>

## Как понять

Поля ввода с типами `date`, `month`, `week`, `time`, `datetime-local`, `number` и `range` могут иметь атрибуты `min` и `max`. Эти атрибуты задают диапазон допустимых значений, которые пользователь может вводить в поле. В зависимости от того, попадает ли введённое значение в диапазон, будут применяться стили для псевдоклассов `:in-range` и `:out-of-range`.

## Как пишется

```css
input:in-range + span {
  color: rgb(0 255 0 / 20%);
}

input:out-of-range + span {
  color: rgb(255 0 0 / 20%);
}
```

## Подсказки

💡 Если в поле не введено никакого значения, то срабатывает псевдокласс `:in-range`.

💡 Если атрибуты `min` и `max` не заданы, то при пустом поле сработает `:in-range`, а при введённом значении ни один из псевдоклассов не сработает.

💡 Если нужно, чтобы при пустом поле не срабатывал `:in-range`, можно расширить селектор псевдоклассом [`:placeholder-shown`](/css/placeholder-shown/):

<iframe title="Поле ввода с placeholder-shown" src="demos/input-with-placeholder-shown/" height="200"></iframe>
