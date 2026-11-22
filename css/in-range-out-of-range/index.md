---
title: "`:in-range`, `:out-of-range`"
description: "Правильно ли заполнено поле ввода с цифрами? Проверяем прямо в браузере."
baseline:
  - group: form-validity-pseudos
    features:
      - css.selectors.in-range
      - css.selectors.out-of-range
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
<input class="with-range" type="number" min="0" max="23" step="1">
```

```css
.with-range {
  border: 1px solid #FFFFFF;
}

.with-range:in-range {
  border-color: #41E847;
  background-color: rgb(65 232 71 / 20%);
}

.with-range:out-of-range {
  border-color: #FF8630;
  background-color: rgb(255 134 48 / 20%);
}
```

<iframe title="Поле ввода с диапазоном" src="demos/input-with-range/" height="200"></iframe>

## Как понять

Поля ввода с типами `date`, `month`, `week`, `time`, `datetime-local`, `number` и `range` могут иметь атрибуты `min` и `max`. Эти атрибуты задают диапазон допустимых значений, которые пользователь может вводить в поле. В зависимости от того, попадает ли введённое значение в диапазон, будут применяться стили для псевдоклассов `:in-range` и `:out-of-range`.

## Как пишется

```css
input:in-range {
  color: rgb(0 255 0 / 20%);
}

input:out-of-range {
  color: rgb(255 0 0 / 20%);
}
```

## Подсказки

💡 Если в поле не введено никакого значения, то срабатывает псевдокласс `:in-range`.

💡 Если атрибуты `min` и `max` не заданы, то при пустом поле сработает `:in-range`, а при введённом значении ни один из псевдоклассов не сработает.

💡 Если нужно, чтобы при пустом поле не срабатывал `:in-range`, можно расширить селектор псевдоклассом [`:placeholder-shown`](/css/placeholder-shown/):

<iframe title="Поле ввода с placeholder-shown" src="demos/input-with-placeholder-shown/" height="200"></iframe>
