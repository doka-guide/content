---
title: "`<dialog>`"
description: "Тег для создания всплывающего окна без боли и страданий."
baseline:
  - group: dialog
    features:
      - api.HTMLDialogElement
      - api.HTMLDialogElement.close
      - api.HTMLDialogElement.open
      - api.HTMLDialogElement.returnValue
      - api.HTMLDialogElement.show
      - api.HTMLDialogElement.showModal
      - html.elements.dialog
      - html.elements.dialog.open
authors:
  - baileys-li
contributors:
  - tatianafokina
  - skorobaeus
  - solarrust
keywords:
  - диалог
  - модальное окно
  - модалка
related:
  - a11y/role-dialog
  - html/form
  - js/deal-with-forms
tags:
  - doka
---

## Кратко

Тег создаёт всплывающее окно или диалог. По умолчанию не показывается на странице.

Может открываться в двух режимах:

1. немодальное окно: не блокирует взаимодействие со страницей;
1. модальное окно: открывается поверх страницы с фоновым затемнением, остальное содержимое недоступно для взаимодействия.

## Пример

```html
<button commandfor="hello" command="show-modal">
  Открыть окно
</button>

<dialog id="hello" aria-labelledby="hello-title">
  <h2 id="hello-title">Привет!</h2>
  <button commandfor="hello" command="close">
    Закрыть
  </button>
</dialog>
```

## Как пишется

Парный тег `<dialog></dialog>`, внутри которого находится содержимое всплывающего окна. У `<dialog>` нельзя использовать [атрибут `tabindex`](/html/tabindex/).

```html
<dialog>
  Привет, мир!
</dialog>
```

Также у окна обязательно должно быть имя — его краткое название. Благодаря этому пользователи вспомогательных технологий знают, что это за элемент и какое у него содержимое.

Имя окну можно добавить двумя способами:

- [`aria-label`](/a11y/aria-label/);
- [`aria-labelledby`](/a11y/aria-labelledby/).

`aria-label` добавляет имя, которого нет на экране. Его получают только вспомогательные технологии, например, [скринридеры](/a11y/screenreaders/).

```html
<dialog aria-label="Приветствие">
  Привет, мир!
</dialog>
```

`aria-labelledby` связывает `<dialog>` с именем, которое видно на экране.

```html
<dialog aria-labelledby="dialog-name">
  <h3 id="dialog-name">
    Привет, мир!
  </h3>
  <p>Вы не ждали, а вот он я.</p>
</dialog>
```

### Как открыть

Как и у элемента [`<details>`](/html/details/), по умолчанию содержимое окна скрыто от пользователя, но его можно отобразить через атрибут `open`.

```html
<dialog open>
  Я виден. Привет! 👋
</dialog>

<dialog>
  Я скрыт от пользователя 🥷
</dialog>
```

Атрибут `open` подходит для окна, которое видно сразу. Обычно же окно открывают по нажатию на кнопку. Для этого есть два способа.

Первый — команды кнопок, без JavaScript. Атрибут `commandfor` указывает `id` окна, а `command` — что с ним сделать:

- `show-modal` — открыть как модальное окно;
- `close` — закрыть;
- `request-close` — попросить закрыть: браузер запустит событие `cancel`, и закрытие можно отменить.

Как это выглядит, видно в разделе «Пример» выше.

Команды `show-modal` и `close` работают в Chrome 135, Firefox 144 и Safari 26.2 и новее. Команда `request-close` — в Chrome 139 и в тех же версиях Firefox и Safari. Открыть немодальное окно командой нельзя: из JavaScript это делает метод `show()`.

Второй способ — методы JavaScript:

1. `show()` — открывает немодальное окно и не блокирует страницу. Добавляет атрибут `open`.
1. `showModal()` — открывает модальное окно. Добавляет атрибут `open` и подложку — псевдоэлемент [`::backdrop`](/css/backdrop/), который можно стилизовать.

```html
<button type="button" onclick="window.myDialog.show()">
  Просто открыть
</button>
<button type="button" onclick="window.myDialog.showModal()">
  Открыть как модалку
</button>
<dialog id="myDialog" aria-label="Пожелание">
  🖖 Живи долго и процветай!
</dialog>
```

<iframe title="Пример dialog в модальном и обычном режиме" src="demos/basic/" height="440"></iframe>

### Как закрыть

Окно можно закрыть:

- из JavaScript с помощью метода `close()`;
- кнопкой с атрибутами `commandfor` и `command="close"`;
- клавишей <kbd>Esc</kbd>: модальное окно — по умолчанию, немодальное — с атрибутом `closedby` (о нём ниже);
- из HTML по [событию `submit`](/js/event-submit/) (например, по нажатию кнопки [`<button type="submit">`](/html/button/)), если в `<dialog>` есть [тег `<form>`](/html/form/) с атрибутом `method="dialog"`.

```html
<dialog
  open
  id="closeMe"
  aria-labelledby="heading"
>
  <h2 id="heading">Закрой меня! 🙏</h2>
  <p>Результат этих кнопок одинаковый.</p>

  <button type="button" onclick="window.closeMe.close()">
    Закрыть с помощью JavaScript
  </button>

  <form method="dialog">
    <!-- Если у тега <button> не указан type, то по умолчанию
    он будет type="submit"! -->
    <button>
      Закрыть с помощью формы
    </button>
  </form>
</dialog>
```

<iframe title="Варианты закрытия" src="demos/close-variants/" height="390"></iframe>

#### Атрибут `closedby`

Атрибут `closedby` задаёт, как пользователь может закрыть окно:

- `any` — клавишей <kbd>Esc</kbd>, жестом «назад» на Android или кликом мимо окна;
- `closerequest` — клавишей <kbd>Esc</kbd> или жестом «назад», но не кликом мимо окна;
- `none` — только кнопкой внутри окна или из кода.

```html
<dialog id="promo" closedby="any" aria-label="Акция">
  Нажмите мимо окна, чтобы закрыть его.
</dialog>
```

Если атрибута нет, модальное окно ведёт себя как с `closerequest`, а немодальное — как с `none`.

<aside>

⚠️ `closedby` работает в Chrome 134, Firefox 141 и новее. В Safari атрибут пока есть только в бета-версии 27.3.

В браузерах без поддержки:

- окно не закроется кликом мимо него, поэтому оставьте в окне явную кнопку закрытия;
- модальное окно с `closedby="none"` всё равно закроется по <kbd>Esc</kbd>.

</aside>

### Возвращаемое значение

Если кнопкам в форме задать [`value`](/html/value/), то при закрытии окна браузер запишет это значение в `dialog.returnValue`.

Присвоим двум кнопкам разные значения:

```html
<form class="options" method="dialog">
  <button class="button button--dark" value="debug">
    Дави его!
  </button>
  <button class="button button--light" value="reproduction">
    Каждая жизнь священна
  </button>
</form>
```

Если окно закрыто кнопкой «Дави его!», то количество 🐞 уменьшается. А если кнопкой «Каждая жизнь священна», то увеличивается:

```javascript
if (dialog.returnValue === "debug") {
  bugs.innerText = bugs.innerText.slice(0, -2);
} else if (dialog.returnValue === "reproduction") {
  bugs.innerText += "🐞";
}

// Сбрасываем значение, чтобы закрытие по Esc ничего не меняло
dialog.returnValue = "";
```

<iframe title="Пример использования returnValue" src="demos/return-value/" height="290"></iframe>

## Как понять

Долгое время в HTML не было тега для создания всплывающих окон. Если такая задача возникала, разработчики писали свои попапы или использовали JavaScript-методы [`alert()`](/js/alert/), [`prompt()`](/js/prompt/) и [`confirm()`](/js/confirm/), если красота была не важна.

Тег `<dialog>` появился как альтернатива. Хорошее окно — это не просто логика «Показать» и «Скрыть». В `<dialog>` реализовано то, о чём часто забывают:

- Для вспомогательных технологий `<dialog>` — аналог [`role="dialog"`](/a11y/role-dialog/). Если окно открыто как модальное, то и аналог [`aria-modal="true"`](/a11y/aria-modal/).
- Модальные окна закрываются по нажатию на <kbd>Esc</kbd>, если это не запрещено атрибутом `closedby="none"`.
- Когда модальное окно открыто, остальная страница становится инертной: на её элементы нельзя нажать и перейти клавиатурой. Доступны только интерактивные элементы самого окна.
- Браузер запоминает, какой элемент был в фокусе до открытия модального окна, и после закрытия снова переводит его в фокус. У немодального окна фокус вернётся, только если в момент закрытия он был внутри окна.

Всё это браузер делает сам, «из коробки». Поэтому пользователю не нужно скачивать лишний JavaScript.

## Подсказки

💡 Google Chrome при закрытии модального окна клавишей <kbd>Esc</kbd> ставит предыдущий элемент не просто в [`:focus`](/css/focus/), а в [`:focus-visible`](/css/focus-visible/): браузер считает, что пользователь перешёл на клавиатурную навигацию.

💡 По нажатию <kbd>Esc</kbd> браузер сначала запускает событие `cancel`, а затем `close`. В обработчике `cancel` можно вызвать `event.preventDefault()` и не закрывать окно. Например, чтобы предупредить, что изменённые данные не сохранятся. То же событие `cancel` запускают метод `requestClose()` и кнопка с `command="request-close"`.

По спецификации отменить закрытие по <kbd>Esc</kbd> можно, только если пользователь перед этим что-то сделал на странице, например, нажал на элемент. После каждой отмены нужно новое действие, иначе следующий <kbd>Esc</kbd> закроет окно. Так вредный сайт не запрёт пользователя в окне. Не все браузеры пока соблюдают это правило. У `requestClose()` и `command="request-close"` такого ограничения нет.

💡 Модальные окна открываются в верхнем слое страницы, поверх всего остального. Немодальные — нет. Элемент с более высоким [`z-index`](/css/z-index/) может перекрыть немодальное окно. Модальное окно не зависит от [контекста наложения](/css/stacking-context/) родителей. Даже если после него в разметке стоит [тег `<div>`](/html/div/) с `z-index: 99999`, окно всё равно отобразится поверх этого `<div>`. А если родитель наклонён с помощью [`skew()`](/css/transform/), модальное окно всё равно откроется без наклона.

💡 Закрытый `<dialog>` скрыт с помощью [`display: none`](/css/display/). Плавно открыть и закрыть его помогают [`@starting-style`](/css/starting-style/) и [переходы](/css/transition/) `display` и `overlay` с ключевым словом `allow-discrete`. Это слово разрешает анимировать свойства, которые меняются скачком:

```css
dialog {
  opacity: 0;
  transition:
    opacity 0.3s,
    display 0.3s allow-discrete,
    overlay 0.3s allow-discrete;
}

dialog[open] {
  opacity: 1;
}

@starting-style {
  dialog[open] {
    opacity: 0;
  }
}
```

Переход `overlay` держит модальное окно в верхнем слое, пока оно гаснет. Без него окно при закрытии сразу уходит из верхнего слоя, и анимация ломается. Переход `overlay` пока есть только в браузерах на Chromium. В Safari окно гаснет уже не поверх страницы, а в Firefox закрывается без анимации.
