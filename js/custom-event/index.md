---
title: "Объект пользовательского события `CustomEvent`"
description: "Создаём свои события."
baseline:
  - group: events
    features:
      - api.CustomEvent
authors:
  - akhmadullin
related:
  - js/event
  - js/events
  - js/dispatch-event
tags:
  - doka
---

## Кратко

`CustomEvent` даёт возможность создавать пользовательские события с произвольным именем и дополнительной информацией. Их можно запускать вручную и отслеживать через стандартные механизмы событий.

## Пример

```javascript
const myCustomEvent = new CustomEvent('mycustomevent', {
  detail: {
    key: 'value'
  }
})
```

## Как пишется

Чтобы создать своё событие, нужно вызвать `new CustomEvent()`. Конструктор принимает в себя два аргумента:

- `type` — строка с названием события;
- `options` (необязательный) — объект со свойствами события:
  - `detail` — данные любого типа, которые необходимо передать вместе с событием, но можно ничего и не передавать;
  - `bubbles` — [всплывает ли событие](/js/events/#vsplytie-sobytiy), по умолчанию `false`;
  - `cancelable` — можно ли отменить событие, по умолчанию `false`;
  - `composed` — должно ли событие переходить из теневого [DOM](/js/dom/) в обычный, по умолчанию `false`.

## Как понять

`CustomEvent` создаёт пользовательское (кастомное) событие. Оно даёт разработчику возможность самостоятельно определить, когда событие происходит, как называется и какие данные с ним передаются. Пригодится, когда стандартных DOM-событий (например, `click` или `input`) недостаточно для описания происходящего на странице.

`CustomEvent` похож на обычный [`Event`](/js/event/). Основное отличие — `CustomEvent` позволяет передать дополнительные данные, а `Event` нет.

Отправить пользовательское событие можно с помощью [`dispatchEvent()`](/js/dispatch-event/).

## Подсказки

💡 Кастомные события пригодятся, когда нужно сообщить другим частям приложения о каком-либо действии или изменении. Использование `CustomEvent` позволяет избавиться от прямых зависимостей между модулями и сделать их менее связными.

```javascript
// Модуль А
const userLoginEvent = new CustomEvent('userlogin', {
  detail: {
    username: authData.username
  }
})

document.dispatchEvent(userLoginEvent)

// Модуль Б
const username = document.getElementById('username')

document.addEventListener('userlogin', (event) => {
  username.textContent = event.detail.username
})
```

<iframe title="Сообщаем об авторизации пользователя с помощью CustomEvent" src="demos/user-login/" height="550"></iframe>

💡 В качестве `type` в конструктор кастомного события можно передать название стандартного события, например, `click`. Когда событие инициируется, оно попадёт в обработчик события и будет обработано, однако, не приведёт к изменению состояния элемента, как это сделало бы обычное событие.

Попробуйте изменить в демке состояние чекбокса, кликнув на него и на обе кнопки:

<iframe title="Сравнение new MouseEvent(click) с new CustomEvent(click)" src="demos/event-vs-custom-event/" height="540"></iframe>
