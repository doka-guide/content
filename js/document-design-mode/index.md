---
title: "`document.designMode`"
description: "Свойство, которое помогает поиграть в браузере с цветами и даже больше."
authors:
  - doka-dog
related:
  - js/dom
  - js/element
  - js/window-print
tags:
  - doka
  - placeholder
---

## Кратко

Свойство, которое переключает [режим редактирования](https://html.spec.whatwg.org/multipage/interaction.html#attr-contenteditable) для всего документа.

## Пример

```js
iframeNode.contentDocument.designMode = 'on'
```

## Как пишется

`document.designMode` принимает два значения — `on` и `off`. По умолчанию имеет значение `off`.
