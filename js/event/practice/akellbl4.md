🛠 В событии есть два похожих поля: `target` и `currentTarget`. Их отличие легко увидеть на примере.

Создадим кнопку, положим в неё текст, обёрнутый в тег [`<span>`](/html/span/), и навесим обработчик событий на кнопку. При клике на кнопку можно заметить, что `currentTarget` всегда будет кнопкой, на которой обрабатывается событие. При этом `target` будет меняться в зависимости от того, куда на кнопке мы кликнули — на `span` внутри кнопки или на неё саму.

```html
<button class="button" type="button">
  <span>Моя кнопочка</span>
</button>
```

```js
document.querySelector('.button').addEventListener('click', function (event) {
  console.log('Событие инициировано на', event.target)
  console.log('Событие поймано на', event.currentTarget)
})
```

<iframe title="Разница между target и currentTarget" src="../demos/target-vs-currenttarget/" height="400"></iframe>

`currentTarget` всегда будет элементом, к которому привязан обработчик, то есть элементом, на котором вызывался [`addEventListener()`](/js/element-addeventlistener/).

`target` — это элемент, на котором произошло событие. Оно может не совпадать с `currentTarget`, потому что большинство [событий всплывают](/js/events/#vsplytie-sobytiy).
