---
title: "`DOMContentLoaded`"
description: "Запускаем код, когда браузер построил DOM-дерево 🏠"
baseline:
  - group: dom
    features:
      - api.Document.DOMContentLoaded_event
authors:
  - nlopin
contributors:
  - furtivite
  - skorobaeus
  - inventoris
related:
  - js/dom
  - js/element-addeventlistener
  - tools/how-the-browser-creates-pages
tags:
  - doka
---

## Кратко

[Событие](/js/events/) `DOMContentLoaded` происходит, когда браузер разобрал HTML-страницу и составил [DOM-дерево](/js/dom/). Если нужно, чтобы страница обязательно загрузилась полностью, лучше присмотреться к [`load`](/js/event-load/).

## Как пишется

```js
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM готов!')
})
```

## Как понять

Чтобы показать пользователю страницу, браузер делает следующие первые шаги:

1. Запрашивает HTML-страницу с сервера.
1. Обрабатывает полученный HTML и создаёт [DOM](/js/dom/) для взаимодействия между JavaScript и HTML (☝️ в конце этого этапа происходит событие `DOMContentLoaded`).

Событие `DOMContentLoaded` происходит раньше события `load` и гарантирует, что DOM готов. Можно искать по нему узлы и не бояться, что что-то не догрузилось (кроме стилей, картинок и так далее).

<iframe title="Разница между событиями load и DOMContentloaded" src="demos/overloaded/" height="530"></iframe>
