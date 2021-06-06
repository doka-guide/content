---
tags:
  - practice
permalink: false
---

🛠 `float` не предназначен для создания сеток или табличной раскладки! Раньше не было другого способа разбить контент на колонки и поставить их рядом друг с другом. Но сейчас для этого есть [флексы](https://y-doka.site/css/long/flexbox-guide/) и [гриды](https://y-doka.site/css/long/grid-guide/), а `float` используется для «обтекания».

🛠 Чтобы прекратить влияние `float` и вернуться к обычному потоку, после блока с обтеканием можно вставить пустой элемент, обычно с классом `clearfix`, и прописать свойство `clear`:

```css
.clearfix {
  clear: both;
}
```

Также можно не вставлять отдельный элемент в разметку, а обойтись псевдоэлементом [`::after`](https://y-doka.site/css/doka/after/) — этот вариант предпочтительнее.

<p class="codepen" data-height="350" data-theme-id="light" data-default-tab="result" data-user="lenaryan" data-slug-hash="JjEyxra" style="height: 350px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Clearfix Demo">
  <span>Посмотреть пен <a href="https://codepen.io/lenaryan/pen/JjEyxra">
  Clearfix Demo</a> на <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

🛠 Несколько лет назад для этой же цели появилось значение `flow-root` для свойства `display`. Достаточно применить его к блоку, внутри которого есть элемент с `float` — и влияние `float` не будет распространяться вне этого блока.

<p class="codepen" data-height="350" data-theme-id="light" data-default-tab="result" data-user="lenaryan" data-slug-hash="JjEyxpm" style="height: 350px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Flow-root Demo">
  <span>Посмотреть пен <a href="https://codepen.io/lenaryan/pen/JjEyxpm">
  Flow-root Demo</a> на <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
