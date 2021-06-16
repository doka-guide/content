---
tags:
  - practice
permalink: false
---

:::callout ☝️

Всегда старайтесь стилизовать элементы с помощью CSS-классов. Если анимацию можно сделать с помощью смены классов, описывайте стили в них.

:::

Менять стили элементов напрямую может быть полезно, когда вы пишете анимацию, напрямую зависящую от действий пользователя, а их нельзя предсказать.

В примере ниже мы используем [Прокрутчик](https://bespoyasov.ru/scroller/), чтобы таскать блоки мышью и крутить их с инерцией:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="result" data-user="bespoyasov" data-slug-hash="bGeJQvO" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="doka-scroller-example">
  <span>See the Pen <a href="https://codepen.io/bespoyasov/pen/bGeJQvO">
  doka-scroller-example</a> by Alexander Bespoyasov (<a href="https://codepen.io/bespoyasov">@bespoyasov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Мы позиционируем элементы с помощью скриптов, потому что не знаем, когда и как пользователь захочет прокрутить ленту с блоками.

Старайтесь анимировать свойства [`transform`](/css/transform) и [`opacity`](/css/opacity), чтобы сделать сайт или приложение более отзывчивыми. [Как браузер рисует страницы](/js/how-the-browser-creates-pages)
