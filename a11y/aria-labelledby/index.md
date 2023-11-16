---
title: "`aria-labelledby`"
description: "Как добавить подпись к элементу с помощью ARIA."
authors:
  - tatianafokina
contributors:
  - skorobaeus
keywords:
  - доступность
  - a11y
  - доступная подпись
  - подпись для элемента
  - подпись для тега
  - лейбл
related:
  - a11y/aria-attrs
  - a11y/aria-describedby
  - a11y/aria-label
tags:
  - doka
---

## Кратко

[Свойство связи](/a11y/aria-attrs/#atributy-svyazi) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для одного или нескольких элементов c видимым именем (подписью) для другого.

## Пример

```html
<figure aria-labelledby="group-label">
  <img
    src="images/chart.png"
    alt="Прогресс похудения за 9 недель. Сначала ёж весил 11 килограмм,
    в конце — 4 килограмма."
  >
  <figcaption id="group-label">График похудения ежа.</figcaption>
</figure>
```

<iframe title="<figure> с подписью из aria-labelledby" src="demos/figure-with-aria-labelledby/" height="480"></iframe>

[Скринридеры](/a11y/screenreaders/) прочтут пример так: «График похудения ежа, группа. Прогресс похудения за 9 недель. Сначала ёж весил 11 килограмм, в конце — 4 килограмма, графика».

## Как пишется

Задайте тегу атрибут `aria-labelledby` с одним или несколькими ID через пробел и свяжите с ним элемент с подписью при помощи `id`.

`aria-labelledby` можно использовать для всех интерактивных и неинтерактивных элементов вроде таблиц и графики, кроме:

- [`<caption>`](/html/caption/) и [роли `caption`](/a11y/role-caption/).
- [`<code>`](/html/code/) и [роли `code`](/a11y/role-code/).
- [`<dd>`](/html/dl-dd-dt/) и [роли `definition`](/a11y/role-definition/).
- [`<dt>`](/html/dl-dd-dt/), [`<dfn>`](/html/dfn/) и [роли `term`](/a11y/role-term/).
- [`<del>`](/html/del/) и [роли `deletion`](/a11y/role-deletion/).
- [`<em>`](/html/em/) и [роли `emphasis`](/a11y/role-emphasis/).
- [`<ins>`](/html/ins/) и [роли `insertion`](/a11y/role-insertion/).
- [`<mark>`](/html/mark/) и [роли `mark`](/a11y/role-mark/).
- [`<p>`](/html/p/) и [роли `paragraph`](/a11y/role-paragraph/).
- [`<strong>`](/html/strong/) и [роли `strong`](/a11y/role-strong/).
- [`<sub>`](/html/sub/) и [роли `subscript`](/a11y/role-subscript/).
- [`<sup>`](/html/sup/) и [роли `superscript`](/a11y/role-superscript/).
- [`<time>`](/html/time/) и [роли `time`](/a11y/role-time/).
- [`<span>`](/html/span/), [`<div>`](/html/div/) и [роли `generic`](/a11y/role-generic/).
- роли [`presentation`или `none`](/a11y/role-presentation-none/) и [`suggestion`](/a11y/role-suggestion/).

Для [`<input>`](/html/input/) в первую очередь используйте `<label>`. У этого HTML-тега есть важная особенность — при клике по тегу фокус перемещается на поле по умолчанию.

Ещё `aria-labelledby` можно связывать не только с видимыми элементами, но и со скрытыми с помощью [`hidden`](/html/hidden/), [`display: none`](/css/display/#kak-pishetsya) или [`visibility: hidden`](/css/visibility/#kak-pishetsya). Учитывайте, что скринридер всё равно в этом случае прочитает связанную с элементом подпись к нему.

В примере у переключателя скрыт лейбл «Ночной режим», но он всё равно доступен для вспомогательных технологий.

```html
<span id="label" hidden>Ночной режим</span>
<input type="checkbox" role="switch" aria-labelledby="label">
```

Подпись из `aria-labelledby` должна быть краткой и чётко описывать цель элемента. При этом лучше не изменять её динамически, это запутает пользователей.

`aria-labelledby` перезаписывает другие текстовые значения. К примеру, из [`aria-label`](/a11y/aria-label/) или `<label>`. Так что, используйте атрибут с осторожностью с [некоторыми ролями и тегами](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/#naming_with_child_content).

Когда у [`<table>`](/html/tables/) есть одновременно `<caption>` и `aria-labelledby`, таблица получит имя из атрибута, а содержимое `<caption>` станет её описанием.

Порядок ID в `aria-labelledby` имеет значение. Скринридер читает лейблы в том порядке, в каком они перечислены в атрибуте. Ещё он не повторяет лейблы, если ID дублируются.

В этом примере при фокусе на первом пункте скринридер прочтёт: «Вес один кг».

```html
<label id="label1" for="select">Вес</label>
<select
  id="select"
  aria-labelledby="label1 label1 select label2 label2"
>
  <option value="1">1</option>
  <option value="2">2</option>
</select>
<span id="label2">кг</span>
```

## Как понять

_Подпись_, по-другому _видимый идентификатор_ в ARIA — это видимое имя любого элемента, не только поля как в HTML. А _имя_ или _доступное имя_ элемента — краткое название элемента, которое озвучивает скринридер при фокусе или последовательном зачитывании всего контента. Оно не обязательно видно всем пользователям.

Чаще всего достаточно связать подпись с нужным тегом с помощью [`for`](/html/for/). Например, [`<label>`](/html/label/), [`<caption>`](/html/caption/) или [`<legend>`](/html/legend/).

Когда в HTML нельзя задать элементу подпись, на помощь приходит атрибут `aria-labelledby`.

## Подсказки

💡 `aria-labelledby` очень похож на `<label>`, который можно задавать не только элементам формы.

💡 Если имя элемента должен видеть только скринридер, используйте `aria-label`.

💡 Следите за [поддержкой `aria-labelledby`](https://www.davidmacd.com/blog/does-aria-label-override-static-text.html) в браузерах и у скринридеров, особенно если задаёте атрибут статичному контенту.
