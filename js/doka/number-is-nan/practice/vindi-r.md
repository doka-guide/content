---
permalink: false
tags:
  - practice
---
🛠 При анализе ввода пользователя всегда нужно проверять результаты вычислений, иначе пользователь вместо расчёта — например «Итого» в корзине увидит непонятные для себя символы. Вот, к примеру, очень приятная цена ✈️

![NaN цена за билет](../images/1.png)

Попробуй имитировать ошибку и ввести в поле что-то помимо числа скидки, без проверки тоже получится `NaN`:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="vindi-r" data-slug-hash="XQPBGG" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="isNaN - в работе">
  <span>See the Pen <a href="https://codepen.io/vindi-r/pen/XQPBGG">
  isNaN - в работе</a> by vindi-r (<a href="https://codepen.io/vindi-r">@vindi-r</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
