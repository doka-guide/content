---
title: "`aria-autocomplete`"
description: "ARIA-атрибут для указания на то, что поле можно автоматически заполнить."
authors:
  - doka-dog
related:
  - a11y/aria-attrs
  - html/select
  - a11y/role-combobox
tags:
  - doka
  - placeholder
---

## Кратко

[Свойство виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для указания на то, что у поля есть выпадающий список с вариантами для автозаполнения. Обычно такое встречается в комбинированных списках и полях для поиска.

## Как пишется

Задайте тегу `aria-autocomplete` с нужным значением. Свойство можно задавать только [`<textarea>`](/html/textarea/), [`<input>`](/html/input/) с типами `text`, `email`, `tel`, `url` или роли [`textbox`](/a11y/role-textbox/), [`<select>`](/html/select/) или [`combobox`](/a11y/role-combobox/), [`<input type="search">`](/html/input/#type) или [`searchbox`](/a11y/role-searchbox/).

Возможные значения `aria-autocomplete`:

- `none` (по умолчанию) — нет вариантов для автозаполнения.
- `inline` — есть опция для автозаполнения, которую можно сразу выбрать и подставить в поле.
- `list` — есть список из нескольких опций для автозаполнения.
- `both` — есть список из нескольких опций для автозаполнения, при этом можно сразу выбрать и подставить в поле одну из них.
