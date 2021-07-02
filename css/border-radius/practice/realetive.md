🛠 Если вы не уверены, что блок всегда будет квадратным, то для подстраховки можно указывать закругление в абсолютных единицах.  Причём указать значение, бо́льшая чем максимальная ширина и высота блока. Например, `border-radius: 9999px`. Если в этой ситуации указывать закругление в процентах, то значение будет считаться от ширины и высоты. Что приведёт к вытягиванию блока в _яйцо_:

<p class="codepen" data-height="588" data-theme-id="light" data-default-tab="result" data-user="Realetive" data-slug-hash="yLaXjqp" data-preview="true" style="height: 588px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="border-radius">
  <span>See the Pen <a href="https://codepen.io/Realetive/pen/yLaXjqp">
  border-radius</a> by Roman Ganin (<a href="https://codepen.io/Realetive">@Realetive</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
