---
title: "<meter>"
authors:
  - doka-dog
keywords:
  - сброс стилей
tags:
  - doka
  - placeholder
---

## Кратко

Тег `<meter>` используется для визуального отображения числового значения в заданном диапазоне. Браузеры, поддерживающие этот тег, отрисовывают его в виде прогресс-бара, заполненного в зависимости от значения атрибута `value` и раскрашенного в разные цвета.

![Прогресс бар в браузере Google Chrome](images/meter-chrome.png)

## Как пишется

Возможные атрибуты:

- `value` — текущее числовое значение. По умолчанию равно `0`.
- `min` — нижняя граница диапазона. По умолчанию равно `0`.
- `max` — верхняя граница диапазона. По умолчанию равно `1`.
- `low` — определяет, что считать «низким значением». По умолчанию равно значению `min`.
- `high` — определяет, что считать «высоким значением». По умолчанию равно значению `max`.
- `optimum` — определяет оптимальное значение.

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="MWmdQov" data-user="solarrust" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/solarrust/pen/MWmdQov">
  Элемент &lt;meter&gt;</a> by Alena (<a href="https://codepen.io/solarrust">@solarrust</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
