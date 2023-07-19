---
title: "`aria-brailleroledescription`"
description: "Атрибут для описания роли элемента своими словами, которые преобразуются в шрифт Брайля."
authors:
  - doka-dog
related:
  - a11y/aria-roledescription
  - a11y/aria-description
  - a11y/aria-attrs
tags:
  - doka
  - placeholder
---

## Кратко

[Глобальное свойство](/a11y/aria-attrs/#globalnye-atributy) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для описания роли элемента своими словами, которые преобразуются в шрифт Брайля.

На это свойство похоже [`aria-roledescription`](/a11y/aria-roledescription/). Главная разница в том, что `aria-roledescription` описывает роли для скринридеров, а `aria-braillelabel` — для [дисплеев Брайля](https://ru.wikipedia.org/wiki/%D0%91%D1%80%D0%B0%D0%B9%D0%BB%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D0%B4%D0%B8%D1%81%D0%BF%D0%BB%D0%B5%D0%B9).

<aside>

👶 Это атрибут из [черновика ARIA 1.3](https://w3c.github.io/aria/). Он пока плохо поддерживается, так что сейчас его лучше не использовать.

</aside>

## Как пишется

Добавьте к любому тегу `aria-brailleroledescription` со значением в виде [символов из Брайля](https://en.wikipedia.org/wiki/Braille_Patterns) или других символов. Главное, чтобы это не была [роль `generic`](/a11y/role-generic/), которая есть по умолчанию у [`<div>`](/html/div/) и [`<span>`](/html/span/). Обратите внимание, что их нельзя смешивать. Также этот атрибут всегда задавайте вместе с `aria-roledescription`.

Используйте `aria-brailleroledescription` в редких случаях, когда название встроенной или явно заданной роли плохо описывает функции элемента.
