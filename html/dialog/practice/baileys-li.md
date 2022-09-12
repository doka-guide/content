#### Блокируем скролл

Несмотря на то, что модального окно перекрывает весь остальной контент на странице с помощью псевдоэлемента `::backdrop`, вся остальная страница всё равно доступна для прокрутки. Это может смущать пользователя, если на заднем плане будет что-то мельтешить.

Решить эту проблему можно, ставя [`overflow: hidden`](/css/overflow/) на [`<body>`](/html/body/). В демке ниже это реализовано добавлением класса `scroll-lock`.

Так же с помощью `scrollbar-gutter` можно «зарезервировать» место под скролл, чтобы контент не прыгал при его исчезновении скроллбара.

```css
html,
body {
  scrollbar-gutter: stable;
}
```

Не забываем так же вернуть всё как было, при закрытии.

```js
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

<iframe title="Блокируем срколл при открытии модальных окон" src="../demos/scroll-lock/" height="320"></iframe>

#### Закрываем по клику на `::backdrop`

Частый UX-сценарий, что модальное окно закрывается по клику на подложку (оверлей). Поскольку для `<dialog>` подложкой является псевдоэлемент `::backdrop`, то просто навесить на него обработчик клика не выйдет.

Однако клик по `::backdrop` считается и кликом по самому элементу `<dialog>`. Значит можно обернуть весь контент модального окна в обёртку и отлавливать когда клик проходит по самому диалогу, а когда по контенту в нём.

```html
<dialog class="dialog">
  <div class="dialog__wrapper">
    Контент диалога
  </div>
</dialog>
```

У элемента диалога есть стандартные браузерные отступы и обводка. А значит их нужно обнулить и поставить на обёртку, чтобы она перекрывала всю «полезную область окна». Иначе клики по отступам тоже будут закрывать модальное окно.

```css
.dialog {
  border: none;
  padding: 0;
}

.dialog__wrapper {
  padding: 1em;
}
```

Теперь на элемент диалога мы можем добавить обработчик клика. Если пользователь нажал на подложку, то `currentTarget` будет совпадать с `target`. В противном случае, клик пошёл на дочерний DOM-узел, который и будет `target`.

```js
dialogElement.addEventListener("click", closeOnBackDropClick);

function closeOnBackDropClick({ currentTarget, target }) {
  const dialogElement = currentTarget;
  const isClickedOnBackDrop = target === dialogElement
  if (isClickedOnBackDrop) {
    dialogElement.close();
  }
}
```

<iframe title="Закрытие dialog по клику на ::backdrop" src="../demos/backdrop-close/" height="350"></iframe>

⚠️ Помните, что клик по подложке это вспомогательный способ закрытия. Если ваш дизайнер не нарисовал явный элемент для закрытия, то убедите его это сделать. Ну или убедите себя, если вы сам дизайнер.

#### Закрываем диалог по клику по свободной области

Этот пример похож на предыдущий, только теперь по отслеживаем клики по всему документу и проверяем был ли кликнут диалог или его потомок. Если оба случая неверны, значит клик прошёл вне диалога и его можно закрыть.

```js
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

<iframe title="Закрытие dialog кликом по свободной области" src="../demos/close-dialog-outside/" height="295"></iframe>

#### Расширяем браузерную поддержку

По данным [Can I Use](https://caniuse.com/dialog), Firefox и Safari начали поддерживать `<dialog>` только в марте 2022 года. Для продакшена большинства проектов, по крайней мере ближайшие несколько лет, нужно поддерживать и более старые версии браузеров. Что делать? Отказываться от такого удобного элемента?

К счастью, команда Google Chrome давно разработала [полифил](https://github.com/GoogleChrome/dialog-polyfill), который имитирует работу `<dialog>` в старых браузерах. Всё что нужно это подключить скрипт и дополнительные стили.

Но стойте! Неужели ≈<sup>3</sup>/<sub>4</sub> наших пользователей придётся грузить скрипт, который им вообще не нужен? Получается, одно из главных преимуществ нативных диалоговых окон сразу отпадает. А если из-за полифила эти нативные окна будут работать [нестабильно](https://github.com/GoogleChrome/dialog-polyfill/blob/master/index.js#L533-L534)?

К счастью, этих проблем можно избежать с помощью динамического импорта:

```js
/**
 * В реальных проектах мы бы брали полифил из Node пакета.
 * Но для примера воспользуемся CDN */
const dialogPolyfillURL = "https://esm.run/dialog-polyfill";

const isBrowserNotSupportDialog = window.HTMLDialogElement === undefined;

/**
 * Подключаем полифил к каждому dialog на странице, если в браузере нет поддержки
 * */
if (isBrowserNotSupportDialog) {
  const dialogs = document.querySelectorAll("dialog");

  dialogs.forEach(async (dialog) => {
    const { default: polyfill } = await import(dialogPolyfillURL);
    polyfill.registerDialog(dialog);
  });
}
```

Помимо скрипта нужно написать и стили. Вы можете, как просто взять из того же [репозитория с полифилом](https://github.com/GoogleChrome/dialog-polyfill/blob/master/dialog-polyfill.css), либо сразу адаптировать под себя.

Обратите внимание, что скрипт полифила не может создать псевдоэлемент `::backdrop`, поэтому стили для него вам нужно дублировать и для `<div>` с классом `.backdrop`.

```css
dialog::backdrop {
  background-color: rgb(0 0 0 / 70%);
}
dialog + .backdrop {
  background-color: rgb(0 0 0 / 70%);
}
```

<iframe title="dialog с полифилом" src="../demos/polyfilled/" height="385"></iframe>
