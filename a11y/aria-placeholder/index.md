---
title: "`aria-placeholder`"
description: "ARIA-атрибут, который добавляет плейсхолдер к полю ввода."
authors:
  - doka-dog
keywords:
  - доступность
  - ARIA
  - ARIA-атрибут
  - плейсхолдер
  - placeholder
related:
  - a11y/aria-intro
  - a11y/aria-attrs
  - html/placeholder
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya), которое устанавливает плейсхолдер для поля ввода.

Аналог `aria-placeholder` в HTML — атрибут [`placeholder`](/html/placeholder/).

## Пример

```html
<span id="label">Любимое животное:</span>
<span role="textbox" aria-labelledby="label" aria-placeholder="К примеру, голубоногая олуша" contenteditable></span>
```

## Как пишется

Добавьте к тегу `aria-placeholder` с короткой текстовой подсказкой по заполнению поля. Атрибут можно использовать только для [`<input>`](/html/input/), [`<textarea>`](/html/textarea/), семантически нейтральных [`<div>`](/html/div/) и [`<span>`](/html/span/) или роли `textbox`.

Для `<input>` и `<textarea>` лучше использовать атрибут `placeholder`.

## Как понять

Плейсхолдер — это короткая подсказка по заполнению поля. Она отображается внутри поля и исчезает при фокусе на нём. Плейсхолдер не заменяет подпись к полю.
