---
title: "`.hidden`"
description: "Свойство, с помощью которого узнают или изменяют значение HTML-атрибута `hidden`."
baseline:
  - group: dom
    features:
      - api.HTMLElement.hidden
authors:
  - windrushfarer
contributors:
  - solarrust
related:
  - html/hidden
  - js/dom
  - css/display
tags:
  - doka
---

## Кратко

Свойство `hidden` позволяет узнать значение [HTML-атрибута `hidden`](/html/hidden/) или изменить его. Когда `hidden` равен `true`, элемент скрыт на странице и недоступен для [скринридеров](/a11y/screenreaders/). Ещё у свойства есть значение `'until-found'`: элемент скрыт, но его находит поиск по странице.

## Пример

Покажем подсказку, когда пользователь ушёл из поля с неправильной почтой. Роль [`alert`](/a11y/role-alert/) попросит скринридер прочитать подсказку, когда она появится:

```html
<label for="email">Почта</label>
<input id="email" type="email">
<div class="error" role="alert" hidden>Неправильная почта</div>
```

```js
const input = document.querySelector('input')
const error = document.querySelector('.error')

input.addEventListener('blur', () => {
  error.hidden = input.validity.valid
})
```

## Как пишется

Свойство `hidden` вернёт `true`, если у элемента есть HTML-атрибут `hidden` с любым значением, кроме `until-found`. Если атрибута нет, результат будет `false`:

```html
<input type="email" placeholder="email@example.com">
<div class="error" hidden>Неправильная почта</div>
```

```js
const input = document.querySelector('input')
const error = document.querySelector('.error')

console.log(input.hidden)
// false

console.log(error.hidden)
// true
```

Если присвоить свойству `hidden` новое значение, изменится и атрибут. В зависимости от значения элемент скроется или появится. Скроем поле ввода из примера выше:

```js
input.hidden = true
```

В результате у поля ввода появится атрибут `hidden`, и элемент скроется:

```html
<input type="email" placeholder="email@example.com" hidden>
```

Если присвоить `false`, браузер удалит атрибут, и элемент снова станет видимым.

Браузер проверяет, есть ли атрибут, а его значение не учитывает. Исключение одно, значение `until-found`. Поэтому `hidden="false"` в разметке тоже скроет элемент.

При присвоении работает то же правило: строка `'false'` поставит атрибут. Убирают его только `false`, пустая строка, `0`, `NaN`, `null` и `undefined`.

## Как понять

HTML-атрибут `hidden` без значения работает так же, как [`display: none`](/css/display/). Элемент не только пропадает с экрана, но и не занимает места, будто его совсем нет.

Скрывать элементы через `display` можно в CSS или с помощью свойства [`style`](/js/element-style/), но атрибутом `hidden` удобно управлять из JavaScript.

<aside>

❗️ Правило `display: none` для `hidden` задают стили браузера. Любое значение `display` из ваших стилей его перебивает. Например, если у `.error` из примера стоит `display: flex`, то `error.hidden = true` подсказку не скроет.

Чтобы атрибут работал всегда, добавьте в стили:

```css
[hidden]:not([hidden="until-found" i]) {
  display: none !important;
}
```

Исключение для `until-found` нужно, чтобы не сломать поиск по такому элементу.

</aside>

### Значение `until-found`

Если присвоить свойству строку `'until-found'`, блок тоже скроется, но текст внутри найдёт поиск по странице (<kbd>Ctrl</kbd> + <kbd>F</kbd>) и переход по якорной ссылке. Так удобно делать свёрнутые блоки, например ответы в списке вопросов.

Когда браузер находит текст, он запускает на блоке событие `beforematch`, убирает атрибут `hidden` и прокручивает страницу к найденному месту.

Скрывает такой блок не `display: none`, а `content-visibility: hidden`. Содержимое пропадает, а рамки и отступы самого блока остаются на странице. Поиск не раскроет блок, если у него `display: inline`, `contents` или `none`.

Раскрывать блок по клику и сворачивать обратно браузер не умеет, это нужно написать самому. В примере перед ответом стоит кнопка-вопрос. Её атрибут [`aria-expanded`](/a11y/aria-expanded/) сообщает скринридеру, раскрыт ли ответ:

```html
<button type="button">Как вернуть заказ?</button>
<div class="answer">Напишите в поддержку, и мы пришлём курьера.</div>
```

```js
const button = document.querySelector('button')
const answer = document.querySelector('.answer')

answer.hidden = 'until-found'
button.setAttribute('aria-expanded', 'false')

console.log(answer.hidden)
// 'until-found' там, где значение поддерживается

button.addEventListener('click', () => {
  const isOpen = !answer.hidden
  answer.hidden = isOpen ? 'until-found' : false
  button.setAttribute('aria-expanded', String(!isOpen))
})

answer.addEventListener('beforematch', () => {
  // Браузер нашёл текст и сейчас покажет блок
  button.setAttribute('aria-expanded', 'true')
})
```

Из-за строки `'until-found'` строгое сравнение `answer.hidden === true` даст `false`.

Не сворачивайте блок через `answer.hidden = !answer.hidden`. После второго клика там окажется `true`, блок скроется обычным `hidden`, и поиск его больше не найдёт.

Значение `until-found` работает в Chrome и Edge с версии 102, в Firefox со 148 и в Safari с 26.2. Safari пока неточно прокручивает к найденному месту.

В браузерах без поддержки блок с `hidden="until-found"` просто скрыт, как с обычным `hidden`, а свойство возвращает `true`. Поиск там текст не найдёт. Поэтому всегда делайте свою кнопку раскрытия.

Если нужен готовый раскрывающийся блок, возьмите [`<details>`](/html/details/). Он раскрывается по клику. А свежие версии Chrome, Edge, Firefox и Safari раскрывают его и сами, когда поиск находит текст внутри.
