---
title: "`window.close()`"
description: "Закройте окно, а то что-то холодно."
baseline:
  - group: window
    features:
      - api.Window.close
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

Метод `close()` объекта `window` закрывает окно, ранее открытое с использованием [`window.open()`](/js/window-open/).

## Пример

Создадим пример, демонстрирующий создание и закрытие окна.

```js
// Создаём функцию для открытия окна с Докой
const openWindow = () => window.open('https://doka.guide/')
// Создаём функцию для закрытия окна
const closeWindow = (windowProxy) => windowProxy.close()

// Открываем окно
const currentWindow = openWindow()

// Работаем с новым окном
// ...

// Закрываем открытое ранее окно
closeWindow(currentWindow)
```

<iframe title="Открываем и закрываем новое окно" src="demos/open-close-window/" height="450"></iframe>

Также закрытие можно сделать с помощью `close()` у объекта `window` в созданном окне.

<iframe title="Закрываем новое окно изнутри" src="demos/close-window/" height="450"></iframe>

## Как пишется

```js
openedWindow.close()
```
`openedWindow` — объект [`windowProxy`](https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-windowproxy-exotic-object), результат ранее выполненного `window.open()`, или глобальный объект `window`.

Метод `close()` не имеет параметров и возвращает `undefined`.

## Как понять

Метод `close()` закрывает окно, только если его открыли через [`window.open()`](/js/window-open/). Это ограничение связано с вопросами безопасности в браузерах: так они предотвращают закрытие окон, которые открыл сам пользователь.

Например, с помощью этого метода невозможно закрыть открытую с помощью браузера вкладку или сам браузер.

## Подсказки

💡 Используйте `window.close()`, только когда пользователь готов к закрытию окна. Для этого можно добавить поп-ап с согласием.
