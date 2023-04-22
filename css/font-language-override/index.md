---
title: "`font-language-override`"
description: "Подстраиваем шрифт под конкретный язык."
authors:
  - doka-dog
related:
  - css/font-optical-sizing
  - css/font-variant
  - css/font-variant-caps
tags:
  - doka
  - placeholder
---

## Кратко

Свойство `font-language-override` контролирует использование в шрифте глифов, относящихся к конкретному языку.

## Как пишется

- `normal` — браузер смотрит на значение атрибута `lang` и использует глифы шрифта для указанного языка (значение по умолчанию).
- сокращённое обозначение языка [из списка OpenType](https://docs.microsoft.com/en-us/typography/opentype/spec/languagetags) — браузер включает специфичные глифы для языка.
