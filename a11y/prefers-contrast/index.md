---
title: "`prefers-contrast`"
description: "Значение директивы `@media`, которое отслеживает настройки контрастности."
authors:
  - doka-dog
keywords:
  - доступность
  - ＠-правило
  - media
  - media-query
  - контраст
related:
  - css/media
  - a11y/chto-takoe-a11y
  - a11y/aria-intro
tags:
  - doka
  - placeholder
---

## Кратко

Одно из значений директивы [`@media`](/css/media/) для проверки пользовательских настроек. Отслеживает выбор настроек контрастности в системе.

## Пример

```css
@media (prefers-contrast: more) {
  .image {
    border: 3px solid black;
  }
}
```

## Как пишется

У `prefers-contrast` есть несколько значений:

- `no-preference` — настройки контрастности по умолчанию.
- `more` — контрастность увеличена.
- `less` — контрастность понижена.
- `custom` — выбран режим принудительных цветов. Например, режим высокой контрастности Windows.

## Как понять

`prefers-contrast` отслеживает любые настройки контрастности, не только режим принудительных цветов как `forced-colors`.
