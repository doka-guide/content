---
title: "Попап"
description: "Верстаем попап на `<dialog>` с использованием всех возможностей тега."
authors:
  - annabaraulina
contributors:
  - skorobaeus
keywords:
  - popup
  - модалка
  - модальное окно
  - dialog
related:
  - html/dialog
  - a11y/role-dialog
  - a11y/aria-haspopup
tags:
  - article
---

## Задача

Создание попапа — распространённая задача для разработчика. Попапы или модальные окна привлекают внимание. Это может быть полезно как для самого пользователя, так и для заказчика. Например, попап — это удобный способ предупреждения о невозвратности действия при попытке перезагрузки страницы, а также хороший инструмент для сбора контактов пользователей.

В статье покажем простой и понятный способ создания попапа с использование тега [`<dialog>`](/html/dialog/).

## Готовое решение

Для начала создадим HTML-разметку со всеми необходимыми элементами:

```html
<body class="parent">
  <button
    class="openDialogBtn button-violet"
    type="button"
    aria-haspopup="dialog"
    aria-controls="myDialog"
  >
    Открыть попап
  </button>
  <dialog class="child" id="myDialog">
    <div class="dialog__wrapper">
      <h2>Дока — самая добрая документация &#128579</h2>
      <button
        class="closeDialogBtn button-black"
        type="button"
      >
        Согласен &#128156
      </button>
    </div>
  </dialog>
</body>
```

Для внешнего оформления, а также правильной работы попапа, нам понадобятся следующие [CSS-правила](/css/css-rule/):

```css
body {
  min-height: 100vh;
  padding: 50px;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: #18191C;
  color: #FFFFFF;
  font-family: "Roboto", sans-serif;
}

dialog {
  position: fixed;
  height: 250px;
  width: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  padding: 0;
  background-color: #FFFFFF;
  color: #000000;
  text-align: center;
}

.openDialogBtn {
  position: fixed;
  bottom: 50px;
  right: 50px;
  min-width: 210px;
  border: 2px solid transparent;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 300;
  font-family: inherit;
  transition: background-color 0.2s linear;
}

.closeDialogBtn {
  margin: 15% auto 0;
  border: 2px solid transparent;
  min-width: 210px;
  border-radius: 6px;
  padding: 9px 15px;
  color: #000000;
  font-size: 18px;
  font-weight: 300;
  font-family: inherit;
  transition: background-color 0.2s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.dialog__wrapper {
  padding: 1em;
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.scroll-lock {
  overflow: hidden;
}
```

Реализуем открытие и закрытие попапа с помощью JavaScript-методов:

```javascript
const dialog = document.getElementById('myDialog')
const dialogOpener = document.querySelector('.openDialogBtn')
const dialogCloser = document.querySelector('.closeDialogBtn')

function closeOnBackDropClick({ currentTarget, target }) {
  const dialog = currentTarget
  const isClickedOnBackDrop = target === dialog
  if (isClickedOnBackDrop) {
    dialog.close()
  }
}

function openModalAndLockScroll() {
  dialog.showModal()
  document.body.classList.add('scroll-lock')
}

function returnScroll() {
  document.body.classList.remove('scroll-lock')
}

function close() {
  dialog.close()
  returnScroll()
}

dialog.addEventListener('click', closeOnBackDropClick)
dialogOpener.addEventListener('click', openModalAndLockScroll)
dialogCloser.addEventListener('click', (event) => {
  event.stopPropagation()
  close()
})
```

<iframe title="Пример попапа" src="demos/popup-demo/" height="480"></iframe>

## Разбор решения

### Разметка

Сделаем `<dialog>` дочерним элементом относительно [`<body>`](/html/body/). Это позволит нам в дальнейшем расположить попап по центру экрана. Текст и кнопку внутри модального окна обернём в тег с классом `dialogWrapper`. С помощью этой обёртки мы реализуем закрытия попапа по клику на тёмную область (оверлей). Атрибуты [`aria-haspopup`](/a11y/aria-haspopup/) и [`aria-controls`](/a11y/aria-controls/) сообщают вспомогательным технологиям о том, как связаны элементы. Так они повышают доступность приложения для пользователей.

```html
<body class="parent">
  <button
    class="openDialogBtn button-violet"
    type="button"
    aria-haspopup="dialog"
    aria-controls="myDialog"
  >
    Открыть попап
  </button>
  <dialog class="child" id="myDialog">
    <div class="dialog__wrapper">
      <h2>Дока — самая добрая документация &#128579</h2>
      <button
        class="closeDialogBtn button-black"
        type="button"
      >
        Согласен &#128156
      </button>
    </div>
  </dialog>
</body>
```

### Стили

Для центрирования попапа на странице присвоим ему [`position: fixed`](/css/position/), а также зададим 50% для его расположения по осям для `top` и `left`:

```css
dialog {
  position: fixed;
  height: 250px;
  width: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  padding: 0;
  background-color: #FFFFFF;
  color: #000000;
  text-align: center;
}
```

Встроенной функцией тега `<dialog>` является его подложка. Она появляется в момент открытия попапа и имеет название `::backdrop`. С помощью этого псевдоэлемента мы можем стилизовать задник модального окна, а также реализовать его закрытие по клику на оверлей. Первое реализуем с помощью правил CSS — добавим затемнение на экран за открытым попапом:

```css
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
```

Если на странице с попапом есть скролл, его можно заблокировать с помощью свойства [`scrollbar-gutter`](/css/scrollbar-gutter/) для нашего `<body>`. Это позволит нам полностью сконцентрировать внимание пользователя на модальном окне и запретить прокрутку контента на странице за ним.

```css
body {
  min-height: 100vh;
  padding: 50px;
  background-color: #18191c;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  scrollbar-gutter: stable;
}

.scroll-lock {
  overflow: hidden;
}
```

### JavaScript

Для начала найдём все элементы, которые понадобятся нам для работы с попапом — модальное окно и кнопки для его открытия и закрытия:

```javascript
const dialog = document.getElementById('myDialog')
const dialogOpener = document.querySelector('.openDialogBtn')
const dialogCloser = document.querySelector('.closeDialogBtn')
```

Напишем функции для открытия и закрытия попапа. Также поместим в них код, необходимый для блокировки скролла страницы. Не забудем вернуть скролл обратно при закрытии попапа:

```javascript
function openModalAndLockScroll() {
  dialog.showModal()
  document.body.classList.add('scroll-lock')
}

function returnScroll() {
  document.body.classList.remove('scroll-lock')
}

function close() {
  dialog.close()
  returnScroll()
}
```

Навесим соответствующие обработчики событий на наши кнопки:

```javascript
dialogOpener.addEventListener('click', openModalAndLockScroll)
dialogCloser.addEventListener('click', (event) => {
  event.stopPropagation()
  close()
})
```

В коде выше мы поместили [`stopPropagation()`](/js/event/) внутрь обработчика события на кнопку закрытия попапа. Это необходимо для того, чтобы реализовать закрытие модального окна по клику на оверлей. Снова не будем забывать о возвращении скролла странице:

```javascript
function closeOnBackDropClick({ currentTarget, target }) {
  const dialog = currentTarget
  const isClickedOnBackDrop = target === dialog
  if (isClickedOnBackDrop) {
    dialog.close()
    returnScroll()
  }
}

dialog.addEventListener('click', closeOnBackDropClick)
```

Другой функцией нашего попапа окажется его закрытие по нажатию на клавишу <kbd>Esc</kbd>. Это является встроенной функцией элемента `<dialog>` и не требует дополнительного кода.
