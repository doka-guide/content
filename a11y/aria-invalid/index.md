---
title: "`aria-invalid`"
description: "Атрибут, который нужен для указания на ошибку при вводе данных."
authors:
  - tatianafokina
related:
  - a11y/aria-intro
  - a11y/aria-attrs
  - a11y/aria-describedby
tags:
  - doka
---

## Кратко

[Состояние виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Нужно для обозначения того, что пользователь ввёл неправильные данные. Например, в них ошибка, они не соответствуют нужному формату, вообще не введены и другие похожие ситуации.

## Пример

```html
<label for="drink">Любимый напиток:</label>
<input
  id="drink"
  type="text"
  name="drink"
  aria-invalid="false"
  aria-describedby="error"
>
<span
  id="error"
  aria-live="assertive"
  aria-hidden="true"
>
</span>
<button>Рассказать</button>
```

<iframe title="Валидация пустого поля с помощью aria-invalid" src="demos/field-with-aria-invalid/" height="400"></iframe>

В демо показываем ошибку с текстом «Введите один любимый напиток. Например, чай, кофе или вода», когда поле пустое и нажали на кнопку «Отправить».

[Скринридер](/a11y/screenreaders/) прочтёт код примерно так: «Любимый напиток, редактировать, неверно. Введите один любимый напиток. Например, чай, кофе или вода».

## Как пишется

Добавьте к тегу `aria-invalid` с одним из следующих значений:

- `true` — введены неверные данные;
- `false` (по умолчанию) — ошибки нет;
- `grammar` — есть грамматическая ошибка;
- `spelling` — есть орфографическая ошибка.

Любое другое значение в этом атрибуте будет обработано как `true`.

При валидации ошибок не забывайте менять значение `aria-invalid` с помощью JavaScript. Лучше всего сообщать об ошибке после того, как пользователь ввёл свои данные или нажал на кнопку отправки формы.

Этот атрибут раньше использовали для всех тегов и ролей, но сейчас его можно задавать только некоторым интерактивным элементам:

- [`<textarea>`](/html/textarea/), [`<input>` с типами](/html/input/#type) `text`, `email`, `tel`, `url` или роль `textbox`.
- [`<input type="checkbox">`](/html/input/#type) или роль `checkbox`.
- [`<input type="range">`](/html/input/#type) или роль `slider`.
- [`<input type="number">`](/html/input/#type) или роль `spinbutton`.
- [`<select>`](/html/select/) или роли `combobox` и `listbox`.
- [`<td>`](/html/tables/#td) и [`<th>`](/html/tables/#th) или роль `gridcell`.
- `radiogroup`.
- `application`.
- `tree`.

Когда у `aria-invalid` значение `true`, `grammar` или `spelling`, хорошо рассказать пользователям, что пошло не так и как правильно ввести данные. С этим помогут атрибуты [`aria-describedby`](/a11y/aria-describedby/) или `aria-errormessage`. С их помощью свяжите текст ошибки с элементом, где она допущена.

## Как понять

Чтобы сделать доступную всем пользователям валидацию форм, недостаточно добавить специальные стили для этого состояния и разместить рядом с нужным элементом текст ошибки. Нужно рассказать об этом и пользователям вспомогательных технологий, которые не видят интерфейс. Здесь приходит на помощь `aria-invalid`.
