🛠 Работа атрибута `hidden` на примере показа рекламы пользователям без премиума.

Идея простая: если пользователь имеет статус премиум — прячем рекламный блок и блок с кнопкой “Стать премиумом” через `hidden`. Если не премиум — показываем их. Переключать состояние можно с помощью JavaScript, меняя булевый атрибут.

```html
<section class="controls" aria-label="Переключатель премиума">
  <button id="become-premium" type="button">Стать премиум</button>
  <button id="cancel-premium" type="button" hidden>Отменить премиум</button>
  <p id="premium-msg" role="status" hidden>Вы премиум! Реклама скрыта.</p>
</section>

<aside id="ad" class="ad" aria-label="Рекламный блок">
  Реклама: купите слона 🐘 — только сегодня скидка 50%!
</aside>

<section class="content">
  <p>Это основное содержимое. Когда включён премиум, реклама скрывается с помощью булевого атрибута <code>hidden</code>.</p>
</section>
```

```js
let isPremium = false
const ad = document.getElementById('ad')
const upsell = document.getElementById('upsell')
const premiumMsg = document.getElementById('premium-msg')
const becomeBtn = document.getElementById('become-premium')
const cancelBtn = document.getElementById('cancel-premium')

function render() {
  ad.hidden = isPremium
  premiumMsg.hidden = !isPremium
  // Кнопки: показываем нужную
  becomeBtn.hidden = isPremium
  cancelBtn.hidden = !isPremium
}
becomeBtn.addEventListener('click', () => { isPremium = true; render() })
cancelBtn.addEventListener('click', () => { isPremium = false; render() })
render()
```

<iframe title="Скрываем рекламу для премиум" src="demos/drakesbot12/" height="300"></iframe>

Обратите внимание: `hidden` полностью убирает элемент из потока документа и из дерева доступности — скринридеры его не увидят.
