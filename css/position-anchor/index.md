---
title: "`position-anchor`"
description: "Задаёт якорный элемент по умолчанию."
baseline:
  - group: anchor-positioning
    features:
      - css.properties.position-anchor
      - css.properties.position-anchor.auto
      - css.properties.position-anchor.none
      - css.properties.position-anchor.normal
authors:
  - akhmadullin
contributors:
  - solarrust
related:
  - css/position
  - css/anchor-name
  - css/anchor-function
tags:
  - doka
---

## Кратко

Свойство `position-anchor` определяет якорный элемент, к которому должен быть привязан текущий.

## Пример

```css
.target {
  position-anchor: --my-anchor;
}
```

## Как пишется

Возможные значения `position-anchor`:

- `normal` — значение по умолчанию. Если у текущего элемента задано свойство [`position-area`](/css/position-area/), работает как `auto`, если нет — как `none`.
- `none` — у текущего элемента нет якоря по умолчанию.
- `auto` — якорем становится неявный якорь, если он есть. Это якорь, который браузер связывает с элементом сам, без `anchor-name`. Например, кнопка, которая открыла [поповер](/html/popover/).
- `<anchor-name>` — имя, заданное в свойстве [`anchor-name`](/css/anchor-name/) якорного элемента, должно начинаться с двух дефисов.

Значение `normal` появилось в Chrome, Edge и Firefox 151 и в Safari 27. В более старых версиях значением по умолчанию было `auto`, а в Chrome и Edge с 144 по 150 версию — `none`.

```css
.anchor {
  anchor-name: --my-anchor;
}

.target {
  position: absolute;
  position-anchor: --my-anchor;
  position-area: bottom center;
}
```

## Как понять

Свойство `position-anchor` указывает якорный элемент по умолчанию, относительно которого будет позиционироваться текущий. Свойство `position-area` всегда работает от этого якоря. Функции [`anchor()`](/css/anchor-function/) и [`anchor-size()`](/css/anchor-size-function/), отвечающие за расположение и размер текущего элемента, тоже используют значение `position-anchor`, если в них явно не передать имя другого якоря.

## Подсказки

💡 Значение по умолчанию `normal` подхватывает неявный якорь, только если задано `position-area`. Если вы позиционируете поповер через `anchor()` без `position-area`, укажите `position-anchor: auto` явно. Иначе у элемента не будет якоря, и объявления с `anchor()` без имени якоря не сработают.

💡 Не забудьте указать `position: absolute` или `position: fixed` для таргет элемента, так как [Anchor Positioning](/css/anchor-positioning-guide/) работает только с этими видами позиционирования.
