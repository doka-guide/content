---
title: "`aria-labelledby`"
description: "Как добавить подпись к элементу с помощью ARIA."
authors:
  - tatianafokina
keywords:
  - доступность
  - ARIA
  - ARIA-атрибут
related:
  - a11y/aria-intro
  - a11y/aria-attrs
  - a11y/aria-roles
tags:
  - doka
---

## Кратко

[Свойство связи](/a11y/aria-attrs/#atributy-svyazi) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для одного или нескольких элементов c видимым именем (подписью) для другого.

## Пример

```html
<figure aria-labelledby="group-label">
  <img src="images/chart.png" alt="Прогресс похудения за 9 недель. Сначала ёж весил 11 килограмм, в конце — 4 килограмма.">
  <figcaption id="group-label">График похудения ежа.</figcaption>
</figure>
```

<iframe title="<figure> с подписью из aria-labelledby" src="demos/figure-with-aria-labelledby/index.html" height="480"></iframe>

[Скринридеры](/html/screenreaders/) прочтут пример так: «График похудения ежа, группа. Прогресс похудения за 9 недель. Сначала ёж весил 11 килограмм, в конце — 4 килограмма, графика».

## Как пишется

Задайте тегу атрибут `aria-labelledby` с одним или несколькими ID через пробел и свяжите с ним элемент с подписью при помощи `id`.

## Как понять

_Подпись_, по-другому _видимый идентификатор_ в ARIA — это видимое имя любого элемента, не только поля как в [HTML](/html/). А _имя_ или _доступное имя_ элемента — краткое название элемента, которое озвучивает скринридер при фокусе или последовательном зачитывании всего контента. Оно не обязательно видно всем пользователям.

Чаще всего достаточно связать подпись с нужным тегом с помощью [`for`](/html/for/). Например, [`<label>`](/html/label/), [`<caption>`](/html/caption/) или [`<legend>`](/html/legend/).

Когда в HTML нельзя задать элементу подпись, на помощь приходит атрибут `aria-labelledby`.

`aria-labelledby` можно использовать для всех интерактивных и неинтерактивных элементов вроде таблиц и графики, кроме:

- [`<caption>`](/html/caption/) и роли `caption`.
- [`<code>`](/html/code/) и роли `code`.
- [`<dd>`](/html/dl-dd-dt/) и роли `definition`.
- [`<dt>`](/html/dl-dd-dt/), [`<dfn>`](/html/dfn/) и роли `term`.
- [`<del>`](/html/del/) и роли `deletion`.
- [`<em>`](/html/em/) и роли `emphasis`.
- [`<ins>`](/html/ins/) и роли `insertion`.
- [`<mark>`](/html/mark/) и роли `mark`.
- [`<p>`](/html/p/) и роли `paragraph`.
- [`<strong>`](/html/strong/) и роли `strong`.
- [`<sub>`](/html/sub/) и роли `subscript`.
- [`<sup>`](/html/sup/) и роли `superscript`.
- [`<time>`](/html/time/) и роли `time`.
- [`<span>`](/html/span/), [`<div>`](/html/div/) и роли `generic`.
- роли `presentation`/`none` и `suggestion`.

Также `aria-labelledby` можно связывать не только с видимыми элементами, но и со скрытыми с помощью [`hidden`](/html/hidden/) и [`display: none`](/css/display/#kak-pishetsya) или [`visibility: hidden`](/css/visibility/#kak-pishetsya).

## Подсказки

💡 `aria-labelledby` очень похож на `<label>`, который можно задавать не только полям.

💡 Подпись из `aria-labelledby` должен быть кратким и чётко описывать цель элемента, как в случае с `<label>`.

💡 Подпись лучше не изменять динамически. Это запутает пользователей.

💡 `aria-labelledby` перезаписывает другие имена, к примеру, из `aria-label` или `<label>`.

💡 Для [`<input>`](/html/input/) в первую очередь используйте `<label>`. У этого HTML-тега есть важная особенность — при клике по тегу фокус перемещается на поле по умолчанию.

💡 Если имя элемента должен видеть только скринридер, используйте `aria-label`.

💡 Следите за [поддержкой `aria-labelledby`](https://www.davidmacd.com/blog/does-aria-label-override-static-text.html) в браузерах и у скринридеров, особенно если задаёте атрибут статичному контенту.
