---
title: ":in-range и :out-of-range"
tags:
  - doka
authors:
  - ezhkov
editors:
  - tachisis
keywords:
  - валидация
  - число
  - диапазон
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

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="xxqvWZg" data-user="solarrust" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/solarrust/pen/xxqvWZg">
  :in-range / :out-of-range 1</a> by Alena (<a href="https://codepen.io/solarrust">@solarrust</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## Как это понять

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

💡 Если нужно, чтобы при пустом поле не срабатывал `:in-range`, можно расширить селектор псевдоклассом [`:placeholder-shown`](/css/placeholder-shown) и задать подсказку полю ввода:

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="yLMmKOL" data-user="solarrust" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/solarrust/pen/yLMmKOL">
  :in-range / :out-of-range 2</a> by Alena (<a href="https://codepen.io/solarrust">@solarrust</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
