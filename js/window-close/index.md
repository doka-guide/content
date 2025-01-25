---
title: "`window.close()`"
description: "Закройте окно, а то что-то холодно."
authors:
  - ra1nbow1
contributors:
  - vitya-ne
related:
  - js/window-open
  - js/window-history
  - js/window-print
tags:
  - doka
---

## Кратко

Метод `.close()` объекта `window` закрывает окно ранее открытое с использованием [`windiw.open()`](/js/window-open/).

## Пример

```js
// Создаём функцию для открытия окна с Докой
const openWindow = () => window.open('doka.guide/index.html')
// Создаём функцию для закрытия окна
const closeWindow = (windowProxy) => windowProxy.close()

// Открываем окно
const currentWindow = openWindow();

// Работаем с новым окном
// ...

// Закрываем открытое ранее окно
closeWindow(currentWindow)
```

## Интерактивный пример

<iframe title="Закрываем открытое окно" src="demos/open-close-window/" height="695"></iframe>

## Как пишется

```js
openedWindow.close()
```
`openedWindow` — `windowProxy`-объект, результат ранее выполненного `window.open()`.

Метод `close()` не имеет параметров и возвращает `undefined`.

## Как понять

Метод `close()` закрывает окно, только если окно было открыто через [`window.open()`](/js/window-open/). Это ограничение связано с вопросами безопасности в браузерах: оно предотвращает закрытие окон, которые открыл сам пользователь.

Например, с помощью этого метода невозможно закрыть открытую с помощью браузера вкладку или сам браузер.

## Подсказки

💡 Используйте `window.close()`, только когда пользователь готов к закрытию окна. Для этого можно добавить поп-ап с согласием.
