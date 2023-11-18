---
title: "`window.close()`"
description: "Закройте окно, а то что-то холодно."
authors:
  - doka-dog
related:
  - js/window-open
  - js/window-history
  - js/window-print
tags:
  - doka
  - placeholder
---

## Кратко

Метод `close()` объекта `window` закрывает текущее или другое вызванное окно.

## Пример

```js
let openedWindow

function openWindow() {
  openedWindow = window.open("doka.guide.html")
}

function closeOpenedWindow() {
  openedWindow.close()
}
```

## Как пишется

Метод можно вызвать только если окно было открыто через [`window.open()`](/js/window-open/) или если это окно верхнего уровня без записей в истории.
