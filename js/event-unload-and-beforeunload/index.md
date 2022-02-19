---
title: "События `unload` и `beforeunload`"
authors:
  - kotosha-real
tags:
  - doka
---

## Кратко

Когда пользователь уходит со страницы, генерируется событие `unload`. Обработать это можно, [подписавшись на это событие](/js/events/) у объекта `window`.

Также мы можем спросить пользователя, точно ли он хочет уходить со страницы. За это отвечает обработка события `beforeunload`.

## Как пишется

```js
window.addEventListener('unload', function () {
  // ...
})

window.addEventListener('beforeunload', function () {
  // ...
})
```

## Как понять `unload`

В современном вебе всё увешано трекингом: клики, переходы, прокрутка до определённых секций и ещё куча всего. Почему бы не <!-- yaspeller ignore:start -->трекать<!-- yaspeller ignore:end --> уход пользователя со страницы?

```js
window.addEventListener('unload', function () {
  const someUsefulData = getSomeUsefulData();

  navigator.sendBeacon('/some-endpoint', someUsefulData);
})
```

Что происходит в коде выше? Когда пользователь покинет страницу, будет собрана некоторая информация и будет отправлена на некоторый эндпоинт. `sendBeacon` — это неблокирующий метод отправки данных, почитать про него подробнее можно [тут](https://w3c.github.io/beacon/). А [вот](https://caniuse.com/?search=sendbeacon) его поддержка.

## Как понять `beforeunload`

Мы все хотя бы раз теряли проделанную работу по какой-либо причине:
1. Нетленная классика с зависшим Word и несохранённой курсовой
2. Случайный свайп влево на ноутбуках Apple, который вместо горизонтальной прокрутки возвращает на предыдущую страницу
3. Автор этих строк однажды перепутал `git stash pop` с `git stash drop` 😰

Есть страницы, на которых выполняется некоторая работа. Если эта работа не сохраняется, например, в [localStorage](js/local-storage/), стоит защитить пользователя от фрустрации при возможной потере. В этом нам поможет обработка события `beforeunload`.

Обработка с помощью `addEventListener`:

```js
window.addEventListener('beforeunload', function (event) {
  // Отменяем поведение по умолчанию
  event.preventDefault();

  // Chrome требует наличия returnValue
  event.returnValue = '';
})
```

Обработка через определение `onbeforeunload` на объекте `window`:

```js
window.onbeforeunload = () => false;
```

Во втором случае [необязательно](https://html.spec.whatwg.org/multipage/webappapis.html#handler-window-onbeforeunload) возвращать `false`, можно вернуть любое значение, кроме `null` и `undefined`. Раньше браузеры использовали возвращаемое значение в качестве сообщения, но в [современной спецификации](https://html.spec.whatwg.org/#unloading-documents) данное поведение изменили. Встречали сайты, которые при попытке закрыть страницу показывали сообщения про нигерийских родственников или правоохранительные органы? Потому и изменили.

<iframe title="Демонстрация обработки события beforeunload" src="demos/beforeunload" height="350"></iframe>
