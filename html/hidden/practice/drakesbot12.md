🛠 Спрячем рекламу от пользователей с премиум-подпиской.

Идея простая: если у пользователя есть подписка, прячем рекламный блок и блок с кнопкой «Стать премиум» через `hidden`. Если подписки нет, показываем их. Переключать состояние можно с помощью JavaScript, меняя свойство `hidden` у элемента.

```html
<section class="controls" aria-label="Переключатель премиума">
  <button id="become-premium" type="button">
    Стать премиум
  </button>
  <button id="cancel-premium" type="button" hidden>
    Отменить премиум
  </button>
  <p id="premium-msg" role="status"></p>
</section>

<aside id="ad" class="ad" aria-label="Рекламный блок">
  Реклама: купите слона 🐘 — только сегодня скидка 50%!
</aside>

<section class="content">
  <p>
    Это основное содержимое. Когда включён премиум,
    реклама прячется с помощью атрибута <code>hidden</code>.
  </p>
</section>
```

```js
let isPremium = false;
const ad = document.getElementById('ad');
const premiumMessage = document.getElementById('premium-msg');
const becomeButton = document.getElementById('become-premium');
const cancelButton = document.getElementById('cancel-premium');

function render() {
  ad.hidden = isPremium;
  // Кнопки: показываем нужную
  becomeButton.hidden = isPremium;
  cancelButton.hidden = !isPremium;
}
becomeButton.addEventListener('click', () => {
  isPremium = true;
  render();
  premiumMessage.textContent = 'Вы премиум! Реклама скрыта.';
  cancelButton.focus();
});
cancelButton.addEventListener('click', () => {
  isPremium = false;
  render();
  premiumMessage.textContent =
    'Премиум отключён. Реклама снова видна.';
  becomeButton.focus();
});
render();
```

<iframe title="Прячем рекламу для премиум-подписки" src="../demos/drakesbot12/" height="380"></iframe>

Сообщение с [`role="status"`](/a11y/role-status/) не прячем: скринридер объявляет только изменения в области, которая уже есть на странице. Поэтому меняем только текст сообщения. При отмене подписки тоже пишем новый текст, а не стираем старый: удаление скринридер не объявит.

После клика переносим фокус на кнопку, которая появилась. Иначе фокус пропадёт вместе со спрятанной кнопкой.

В настоящем проекте убирайте рекламу для премиум-пользователей ещё на сервере. `hidden` прячет блок от глаз, но рекламные скрипты всё равно загрузятся.
