---
permalink: false
---

🛠 К сожалению браузер не предоставляет никаких средств для нормальной стилизации элемента `<option>`, и это доставляет очень много головной боли фронтенд-разработчикам :( Стиль элементов `<option>` можно поменять, только если тегу [`<select>`](/html/select/) задан атрибут `multiple`. Тогда список целиком становится частью потока страницы, и мы имеем возможность применять стили к его элементам:

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="PoGOowj" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="select multiple styling">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/PoGOowj">
  &lt;select multiple&gt; styling</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
