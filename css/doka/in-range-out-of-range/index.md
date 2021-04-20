---
title: ":in-range, :out-of-range"
author:
  -  ezhkov
summary:
  - валидация
  - число
  - диапазон
---

## Кратко

Эти псевдоклассы используются для стилизации полей ввода, которые поддерживают атрибуты `min` и `max`:

- `:in-range` для полей, в которых введённое значение **попадает внутрь** диапазона от `min` до `max`;
- `:out-of-range` для полей, в которых введённое значение **не попадает внутрь** диапазона от `min` до `max`.

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
  background-color: #00FF0033;
}

.with-range:out-of-range {
  border-color: red;
  background-color:#FF000033;
}
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="VwmKVxy" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title=":in-range / :out-of-range 1">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/VwmKVxy">
  :in-range / :out-of-range 1</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## Как это понять

Поля ввода с типами `date`, `month`, `week`, `time`, `datetime-local`, `number` и `range` могут иметь атрибуты `min` и `max`. Эти атрибуты задают диапазон допустимых значений, которые пользователь может вводить в поле. В зависимости от того, попадает ли введённое значение в диапазон, будут применяться стили для псевдоклассов `:in-range` и `:out-of-range`.

## Как пишется

```css
input:in-range + span {
  color: #00000033;
}

input:out-of-range + span {
  color: #ff000033;
}
```

## Подсказки

💡 Если в поле не введено никакого значения, то срабатывает псевдокласс `:in-range`.

💡 Если атрибуты `min` и `max` не заданы, то при пустом поле сработает `:in-range`, а при введённом значении ни один из псевдоклассов не сработает.

💡 Если нужно, чтобы при пустом поле не срабатывал `:in-range`, можно расширить селектор псевдоклассом [`:placeholder-shown`](/doka/css/placeholder-shown) и задать плейсхолдер полю ввода:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="VwmmbXv" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title=":in-range / :out-of-range 2">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/VwmmbXv">
  :in-range / :out-of-range 2</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
