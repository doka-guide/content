---
permalink: false
---

🛠 Для выравнивания положения текста часто советуют использовать атрибут `align`, но он исключён из современной спецификации, а привычные CSS-правила, например, с `text-align: center` с `<legend>` работать не будут, т. к. у него блочный контекст, но уникальная инлайн-блочная контекстная модель содержимого, которая и создаёт неповторимую обводку от `<fieldset>`. Поэтому для выравнивания `<legend>` относительно ширины `<fieldset>` нужно использовать… внезапно [`margin`](/css/margin)!

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="Realetive" data-slug-hash="PobGyGb" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="legend align">
  <span>See the Pen <a href="https://codepen.io/Realetive/pen/PobGyGb">
  legend align</a> by Roman Ganin (<a href="https://codepen.io/Realetive">@Realetive</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

За счёт особой формы обтекания рамкой текста, это можно использовать для характерной стилизации блока и заголовка:

<p class="codepen" data-height="347" data-theme-id="light" data-default-tab="css,result" data-user="Realetive" data-slug-hash="BaLybry" data-preview="true" style="height: 347px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="&amp;lt;legend&amp;gt;">
  <span>See the Pen <a href="https://codepen.io/Realetive/pen/BaLybry">
  &lt;legend&gt;</a> by Roman Ganin (<a href="https://codepen.io/Realetive">@Realetive</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
