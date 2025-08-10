---
title: "`@viewport`"
description: "Устаревшая директива CSS Device Adaptation для управления вьюпортом. Почти нигде не поддерживается — используйте `<meta name=\"viewport\">`."
authors:
  - drakesbot12
keywords:
  - viewport
  - device
  - adaptation
  - -ms-viewport
  - meta
  - viewport
related:
  - html/meta
  - css/media
  - css/vw-vh
tags:
  - doka
---

## Кратко

`@viewport` — попытка стандартизировать управление параметрами вьюпорта из CSS (ширина, масштаб и др.). Директива из черновика CSS Device Adaptation так и не получила кросс‑браузерной поддержки и сейчас считается устаревшей. На практике вместо неё используют HTML‑метатег `<meta name="viewport">`.

## Пример

```css
/* Идея директивы */
@viewport {
  width: device-width;
  zoom: 1;
}

/* Исторический префикс для IE 10–11 */
@-ms-viewport {
  width: device-width;
}
```

Эквивалентно (и правильно сегодня) задать в HTML:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## Как пишется

Синтаксис задумывался как блок с дескрипторами:

```css
@viewport {
  width: auto | device-width | <length>;
  min-width: <length>;
  max-width: <length>;
  height: auto | device-height | <length>;
  min-height: <length>;
  max-height: <length>;
  zoom: auto | <number>;
  min-zoom: <number>;
  max-zoom: <number>;
  user-zoom: zoom | fixed; /* разрешить/запретить масштабирование */
  orientation: auto | portrait | landscape;
}
```

Однако большинство браузеров эти дескрипторы не поддерживают. Рабочими были лишь префиксные варианты в старых IE (`@-ms-viewport`).

## Как понять

Задача — управлять поведением мобильного вьюпорта из CSS вместо HTML. Подход не прижился из‑за совместимости, безопасности и перекрытия с уже де‑факто стандартным `<meta name="viewport">`. В совремённой вёрстке управление вьюпортом выполняют через HTML и медиа‑запросы [`@media`](/css/media/), а размеры интерфейса адаптируют с помощью единиц [`vw`/`vh`](/css/vw-vh/).

## Подсказки

💡 Не используйте `@viewport` в новых проектах — полагайтесь на `<meta name="viewport">`.
💡 Если поддерживаете IE 10–11, можно добавить блок `@-ms-viewport { width: device-width; }` как временную совместимость.
💡 Не отключайте масштабирование жестами у пользователей (и в метатеге, и в гипотетическом `user-zoom: fixed`). Это ухудшает доступность.
