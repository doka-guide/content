---
title: "`:read-only`"
description: "Задаёт стили полям ввода, которые доступны только для чтения."
authors:
  - kamenskaya
related:
  - css/link
  - css/hover
  - css/focus
keywords:
  - стили для чтения
tags:
  - doka
  - placeholder
---


## Кратко

Псевдокласс `:read-only` используется для задания стилей полям ввода только для чтения. Другими словами - данные в этом поле ввода пользователь не может изменить или удалить. Поле ввода при этом получает фокус, а данные в поле можно выделить и скопировать.


## Как пишется

Псевдокласс `:read-only` применяется к тегам для ввода текста ([`<input>`](/html/input/) или [`<textarea>`](/html/textarea/)) с атрибутом `readonly`. Также может быть применён к html-тегам, для которых установлен атрибут [`contenteditable`](/html/global-attrs/).
После селектора для поля ввода текста ([`<input>`](/html/input/) и [`<textarea>`](/html/textarea/)) или селектора с атрибутом [`contenteditable`](/html/global-attrs/) ставим двоеточие и пишем ключевое слово `read-only`.
В браузере Firefox `:read-only` поддерживается с префиксом -moz: `:-moz-read-only`.
