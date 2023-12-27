---
title: "`aria-invalid`"
description: "Атрибут, который нужен для указания на ошибку при вводе данных."
authors:
  - tatianafokina
contributors:
  - skorobaeus
related:
  - a11y/aria-errormessage
  - html/required
  - a11y/aria-describedby
tags:
  - doka
---

## Кратко

[Состояние виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Нужно для обозначения того, что пользователь ввёл неправильные данные. Например, в них ошибка, они не соответствуют нужному формату, вообще не введены и другие похожие ситуации.

<aside>

⚠️ У [`required`](/html/required/) есть ARIA-атрибут `aria-invalid` со всеми значениями по умолчанию.

</aside>

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

<iframe title="Валидация пустого поля с помощью ARIA" src="demos/field-with-aria-invalid/" height="400"></iframe>

В демо показываем ошибку с текстом «Введите один любимый напиток. Например, чай, кофе или вода», когда поле пустое и нажали на кнопку «Отправить».

[Скринридер](/a11y/screenreaders/) прочтёт код примерно так: «Любимый напиток, редактировать, неверно. Введите один любимый напиток. Например, чай, кофе или вода».

## Как пишется

Добавьте к тегу `aria-invalid` с одним из следующих значений:

- `false` (по умолчанию) — нет ошибки;
- `true` — введены неверные данные;
- `grammar` — есть грамматическая ошибка;
- `spelling` — есть орфографическая ошибка.

Любое другое значение в этом атрибуте будет обработано как `true`.

При валидации ошибок не забывайте менять значение `aria-invalid` с помощью JavaScript. Лучше всего сообщать об ошибке после того, как пользователь ввёл свои данные или нажал на кнопку отправки формы.

Этот атрибут раньше использовали для всех тегов и ролей, но сейчас его можно задавать только некоторым интерактивным элементам:

- [`<textarea>`](/html/textarea/), [`<input>` с типами](/html/input/#type) `text`, `email`, `tel`, `url` или роли `textbox`.
- [`<input type="checkbox">`](/html/input/#type) или [роли `checkbox`](/a11y/role-checkbox/).
- [`<input type="range">`](/html/input/#type) или роли [`slider`](/a11y/role-slider/).
- [`<input type="number">`](/html/input/#type) или роли [`spinbutton`](/a11y/role-spinbutton/).
- [`<select>`](/html/select/) или ролям [`combobox`](/a11y/role-combobox/) и [`listbox`](/a11y/role-listbox/).
- [`<td>`](/html/tables/#td) и [`<th>`](/html/tables/#th) или роли [`cell`](/a11y/role-cell/).
- [`gridcell`](/a11y/role-gridcell/).
- [`radiogroup`](/a11y/role-radiogroup/).
- [`application`](/a11y/role-application/).
- [`tree`](/a11y/role-tree/).

Когда у `aria-invalid` значение `true`, `grammar` или `spelling`, хорошо рассказать пользователям, что пошло не так и как правильно ввести данные. С этим помогут атрибуты [`aria-describedby`](/a11y/aria-describedby/) или [`aria-errormessage`](/a11y/aria-errormessage/). С их помощью свяжите текст ошибки с элементом, где она допущена.

## Как понять

Чтобы сделать доступную всем пользователям валидацию форм, недостаточно добавить специальные стили для этого состояния и разместить рядом с нужным элементом текст ошибки. Нужно рассказать об этом и пользователям вспомогательных технологий, которые не видят интерфейс. Здесь приходит на помощь `aria-invalid`.
