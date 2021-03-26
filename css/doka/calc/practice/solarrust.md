---
tags:
  - practice
permalink: false
---

🛠 Возьмём тот же пример с тремя колонками из начала статьи. Пусть у каждой из колонок будет внешний отступ по 10px с каждой из сторон. Если зададим свойства _в лоб_, то ничего не выйдет, последний блок _падает_ на новую строку.

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="result" data-user="solarrust" data-slug-hash="JjKbxaK" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="JjKbxaK">
  <span>See the Pen <a href="https://codepen.io/solarrust/pen/JjKbxaK">
  JjKbxaK</a> by Alena (<a href="https://codepen.io/solarrust">@solarrust</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Можно использовать флексбокс. Избежим падения, но получим проблему сужения блоков чтобы уместиться в ряд. Как всего этого избежать? Высчитывать размер блоков с учётом этих боковых отступов!

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="result" data-user="solarrust" data-slug-hash="bGeBzmx" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="bGeBzmx">
  <span>See the Pen <a href="https://codepen.io/solarrust/pen/bGeBzmx">
  bGeBzmx</a> by Alena (<a href="https://codepen.io/solarrust">@solarrust</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
