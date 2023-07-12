---
title: "`note`"
description: "ARIA-роль для заметок и другой дополняющей основной текст информации."
authors:
  - doka-dog
related:
  - a11y/aria-roles
  - html/aside
  - html/div
tags:
  - doka
  - placeholder
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для заметок и другого текста на странице, который дополняет основной.

В HTML нет тега с такой ролью.

## Пример

```html
<p>Чтобы пройти тест на знание тапиров, нажмите на кнопку «Начать».</p>
<div role="note">
  <p>Не забудьте завести личный аккаунт перед этим 🙂</p>
</div>
```

## Как пишется

Задайте тегу `role="note"`, лучше всего [`<div>`](/html/div/) или [`<span>`](/html/span/).

Для элементов с ролью `note` можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).
