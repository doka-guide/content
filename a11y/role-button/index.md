---
title: "`button`"
description: "Как превратить элемент в кнопку с помощью WAI-ARIA."
authors:
  - doka-dog
contributors:
  - jkorichneva
keywords:
  - доступность
  - ARIA
  - ARIA-роль
  - кнопка
  - button
related:
  - a11y/aria-intro
  - a11y/aria-roles
  - html/button
tags:
  - doka
---

## Кратко

[ARIA-роль виджета](/a11y/aria-roles/#roli-vidzhetov) для кнопки. Роль `button` по умолчанию есть у [`<button>`](/html/button/), [`<summary>`](/html/details/) и [`<input>`](/html/input/) c типами `button`, `image`, `reset`, `submit`.

<aside>

⚠️ Обратите внимание, что наличие роли `button` даст скринридеру понять, что это кнопка, но не даёт функциональность тэга [`<button>`](/html/button/).

</aside>

## Пример

```html
<div role="button" tabindex="0">Нажми меня</div>
```
<iframe title="Несемантическая кнопка с обработчиками клавиш" src="demos/button-with-interaction/" height="150"></iframe>

## Как пишется

Добавьте к тегу `role="button"` и `tabindex="0"`, чтобы на кнопку можно было установить фокус. Лучше, чтобы это были семантически нейтральные [`<div>`](/html/div/) или [`<span>`](/html/span/). Одно из [правил использования ARIA](/a11y/aria-intro/#pravila-ispolzovaniya) — не перезаписывать роли без необходимости.

Элемент с ролью кнопки должен иметь доступное имя, это значит, что у кнопки обязательно должен быть текст внутри или [`aria-label`](/a11y/aria-label)/[`aria-labelledby`](/a11y/aria-labelledby)/[`aria-describedby`](/a11y/aria-describedby) с текстом/указанием на id элемента с текстом.
```html
<div role="button" tabindex="0" aria-label="Лайкнуть">❤️</div>
```
Во вкладке Accessibility порядок, который использует браузер для определения имени:

![Скриншот Accessibility tree браузера для определения доступного имени кнопки](./images/computed-name.png)

Если у кнопки есть текст внутри, не перезаписывайте его значение через [`aria-label`](/a11y/aria-label):
```html
<!-- ⛔ Так лучше не делать -->
<button aria-label="Принимаю условия соглашения">Согласен</button>
```
Также необходимо прописать поведение кнопки на нажатие клавиш `Enter` и `Space` через JS.

Для `button` можно использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy) и пару [атрибутов виджетов](/a11y/aria-attrs/#atributy-vidzhetov):
- [`aria-disabled`](/a11y/aria-disabled) - если у кнопки может быть состояние disabled и оно меняется;
- [`aria-pressed`](/a11y/aria-pressed/) - если кнопка является тоггл-переключателем;
<iframe title="Кнопка-переключатель" src="demos/button-toggle/" height="150"></iframe>

- [`aria-expanded`](/a11y/aria-expanded) - если кнопка раскрывает какой-то блок текста/контента или вызывает попап/выпадающее меню, является частью дропдауна. Обычно используется в связке с `aria-haspopup`;

- [`aria-haspopup`](/a11y/aria-haspopup) - если кнопка вызывает попап или выпадающее меню, является частью дропдауна.

## Как понять

Роль нужна для создания кнопок — элементов, при взаимодействии с которыми происходят какие-то действия. Например, открывается модальное окно, отправляются данные из формы, скрывается или показывается блок текста и другое.

## Подсказки

💡Если вы используете кнопку для раскрытия/скрытия блока с текстом, прочитайте про теги [`<details>,<summary>`](/html/details/), возможно, они подойдут вам лучше.

💡Если вы добавляете `aria-role="button"` для тега ссылки [`<a>`](/html/a/), то вам нужно прописать только обработчик на `Space`, так как активация на `Enter` является стандартным поведением для ссылки.

💡Используйте семантические элементы, где это возможно, так как это позволит вам создать доступные элементы без JS.

### Полезные ссылки
- [Пример доступного меню с дропдауном](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-actions-active-descendant/)


