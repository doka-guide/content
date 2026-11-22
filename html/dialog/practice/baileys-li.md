#### Блокируем скролл

Несмотря на то, что модальное окно перекрывает всё остальное содержимое на странице с помощью псевдоэлемента `::backdrop`, вся остальная страница всё равно доступна для прокрутки. Это может смущать пользователя, если на заднем плане будет что-то мельтешить.

Решить эту проблему можно, ставя [`overflow: hidden`](/css/overflow/) на [`<body>`](/html/body/). В демке ниже скрипт добавляет на `<body>` класс `scroll-lock`.

Также с помощью [`scrollbar-gutter`](/css/scrollbar-gutter/) можно «зарезервировать» место под скроллбар, чтобы содержимое не прыгало, когда скроллбар исчезает.

```css
html,
body {
  scrollbar-gutter: stable;
}
```

Не забываем также вернуть всё, как было, при закрытии.

```javascript
dialogOpener.addEventListener("click", openModalAndLockScroll);
dialog.addEventListener("close", returnScroll);

function openModalAndLockScroll() {
  dialog.showModal();
  document.body.classList.add("scroll-lock");
}

function returnScroll() {
  document.body.classList.remove("scroll-lock");
}
```

<iframe title="Блокируем скролл при открытии модальных окон" src="../demos/scroll-lock/" height="320"></iframe>

#### Закрываем по клику на `::backdrop`

Частый UX-сценарий, что модальное окно закрывается по клику на подложку (оверлей). Проще всего задать диалогу атрибут `closedby="any"`, но в стабильном Safari он пока не работает. Поэтому пригодится и запасной вариант на JavaScript.

Подложка у `<dialog>` — псевдоэлемент `::backdrop`, и просто навесить на него обработчик клика не выйдет. Однако клик по `::backdrop` считается и кликом по самому элементу `<dialog>`. Значит, можно обернуть всё содержимое окна в `<div>` и отлавливать, когда клик проходит по самому диалогу, а когда по содержимому в нём.

```html
<dialog class="dialog" closedby="any">
  <div class="dialog__wrapper">
    Содержимое диалога
  </div>
</dialog>
```

У элемента диалога есть стандартные браузерные отступы и обводка. А значит, их нужно обнулить и поставить на обёртку, чтобы она перекрывала всю «полезную область окна». Иначе клики по отступам тоже будут закрывать модальное окно.

```css
.dialog {
  border: none;
  padding: 0;
}

.dialog__wrapper {
  padding: 1em;
}
```

Теперь добавим обработчик клика на элемент диалога. Если пользователь нажал на подложку, то `currentTarget` будет совпадать с `target`. Иначе клик пришёл на дочерний DOM-узел, и `target` укажет на него.

```javascript
const supportsClosedBy = "closedBy" in HTMLDialogElement.prototype;

if (!supportsClosedBy) {
  dialogElement.addEventListener("click", closeOnBackDropClick);
}

function closeOnBackDropClick({ currentTarget, target }) {
  const dialogElement = currentTarget;
  const isClickedOnBackDrop = target === dialogElement;
  if (isClickedOnBackDrop) {
    dialogElement.close();
  }
}
```

У этого способа есть слабое место. Если пользователь зажмёт кнопку мыши внутри окна, например, выделяя текст, и отпустит её на подложке, событие `click` придёт на сам `<dialog>`, и окно закроется. `closedby="any"` так не ошибается: он закрывает окно, только если кнопку и нажали, и отпустили мимо окна. Поэтому обработчик в примере подключается, только если браузер не знает `closedby`.

<iframe title="Закрытие dialog по клику на ::backdrop" src="../demos/backdrop-close/" height="350"></iframe>

⚠️ Помните, что клик по подложке — вспомогательный способ закрытия. Если ваш дизайнер не нарисовал явный элемент для закрытия, то убедите его это сделать. Ну или убедите себя, если вы сами дизайнер.

#### Закрываем немодальное окно кликом мимо него

Этот пример для немодального окна, открытого через `show()`. С `closedby="any"` такое окно тоже закрывается кликом мимо него, а скрипт пригодится как запасной вариант.

Обработчик висит на всём документе. Если клик пришёл не в диалог и не в его потомка, окно закрывается.

```javascript
function closeDialogOnOutsideClick({ target }) {
  const isClickOnDialog = target === dialogElement;
  const isClickOnDialogChildrenNodes = dialogElement.contains(target);

  const isClickOutsideOfDialog = !(
    isClickOnDialog || isClickOnDialogChildrenNodes
  );

  if (isClickOutsideOfDialog) {
    dialogElement.close();
  }
}
```

Обработчик на `document` вешайте не сразу в обработчике кнопки, а после текущего клика, например, через `setTimeout()`. Иначе тот же клик по кнопке дойдёт до `document` и сразу закроет окно.

<iframe title="Закрытие диалога кликом по свободной области" src="../demos/close-dialog-outside/" height="295"></iframe>
