🛠 Чаще всего это свойство используется в шорткате [`border`](/css/border/), а отдельно пишется, если все свойства рамки сохраняются, а цвет нужно изменить, например по событию [`:hover`](/css/hover/) или [`:focus`](/css/focus/). Или когда вы используете методологию БЭМ, и все свойства рамки прописаны у элемента, а цвет рамки — у модификатора. Вот пример:

```html
<div class="block">
  <p class="block__element">Текст</p>
  <p class="block__element block__element--modify">Текст с модификатором</p>
</div>
```

```css
.block__element {
  border-width: 1px;
  border-style: solid;
}

.block__element--modify {
  border-color: tomato;
}
```
