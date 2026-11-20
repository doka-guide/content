---
title: "`.dispatchEvent()`"
description: "Инициируем отправку события."
baseline:
  - group: events
    features:
      - api.EventTarget.dispatchEvent
authors:
  - akhmadullin
related:
  - js/events
  - js/event
  - js/custom-event
tags:
  - doka
---

## Кратко

Метод `dispatchEvent` используется для программного запуска события, чтобы другие части приложения могли отреагировать на него через обработчики.

## Пример

```javascript
const event = new Event('click')

element.dispatchEvent(event)
```

## Как пишется

`element.dispatchEvent()` принимает в качестве параметра такие события:

- обычное, созданное через [`Event`](/js/event/);
- пользовательское, созданное через [`CustomEvent`](/js/custom-event/).

`element` используется для инициализации `event.target` и определяет, какие обработчики события вызвать.

Метод возвращает `false`, если событие может быть отменено и один из обработчиков вызвал [`event.preventDefault()`](/js/event-prevent-default/), либо `true` — в остальных случаях.

## Как понять

Метод `dispatchEvent` используется для инициирования события вручную, без участия пользователя. Он принимает объект события, созданный заранее, и передаёт его на обработку системе событий. Затем вызываются обработчики, «слушающие» это событие.

Метод полезен, когда нужно программно вызвать событие. Ещё он пригодится для создания собственных событий.

```javascript
const toogleMenuEvent = new CustomEvent('tooglemenuevent', {
  detail: {
    isOpen: true
  }
})

document.dispatchEvent(toogleMenuEvent)
```

Или для имитации пользовательских действий при тестировании.

```javascript
const event = new Event('click')

element.dispatchEvent(event)
```

## Подсказки

💡 Отличить событие, созданное через `dispatchEvent`, от остальных можно с помощью свойства `event.isTrusted`. Оно будет равно `true` для событий, инициированных браузером, действиями пользователя или вызовами программных методов, например `element.focus()`, и `false` для событий, вызванных через `dispatchEvent`.

```javascript
if (event.isTrusted) {
  console.log('Это событие вызвано браузером.')
} else {
  console.log('Это событие вызвано через dispatchEvent.')
}
```
