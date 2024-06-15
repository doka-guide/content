---
title: "`listbox`"
description: "ARIA-роль для выпадающего списка с несколькими опциями на выбор, в котором может быть не только текст, но и картинки."
authors:
  - doka-dog
related:
  - a11y/role-option
  - html/datalist
  - html/select
tags:
  - doka
  - placeholder
---

## Кратко

[Составная роль виджета](/a11y/aria-roles/#roli-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для выпадающего списка с несколькими опциями на выбор. В таком списке может быть не только текст, но и картинки.

В HTML эта роль есть у [`<datalist>`](/html/datalist/) и [`<select>`](/html/select/) с атрибутами `multiple` и `size` со значением больше 1.

## Как пишется

Задайте `role="listbox"` любому тегу, лучше всего [`<div>`](/html/div/), [`<span>`](/html/span/) или `<select>`.

Внутри элемента с ролью `listbox` должен быть один или несколько с ролью [`option`](/a11y/role-option/). Эта роль есть у [`<option>`](/html/option/) по умолчанию.

ARIA-роли не изменяют внешний вид и поведение элементов, поэтому не забудьте стилизовать список и добавить поддержку клавиатуры с помощью JavaScript и [`tabindex`](/html/global-attrs/#tabindex), когда используете неинтерактивный элемент.

Элемент `listbox` может быть частью комбинированного списка с `combobox`. Их связывают с помощью [`aria-controls`](/a11y/aria-controls/).

Для `listbox` можно также использовать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy), [атрибуты виджетов](/a11y/aria-attrs/#atributy-vidzhetov) [`aria-errormessage`](/a11y/aria-errormessage/), [`aria-expanded`](/a11y/aria-expanded/), [`aria-invalid`](/a11y/aria-invalid/), [`aria-multiselectable`](/a11y/aria-multiselectable/), [`aria-orientation`](/a11y/aria-orientation/), [`aria-readonly`](/a11y/aria-readonly/), [`aria-required`](/a11y/aria-required/), и ещё один [атрибут связи](/a11y/aria-attrs/#atributy-svyazi) [`aria-activedescendant`](/a11y/aria-activedescendant/).

По умолчанию у роли `listbox` есть `aria-orientation` со значением `vertical`.
