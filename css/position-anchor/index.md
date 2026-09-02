---
title: "`position-anchor`"
description: "Задаёт дефолтный якорный элемент."
baseline:
  - group: anchor-positioning
    features:
      - css.properties.position-anchor
      - css.properties.position-anchor.auto
authors:
  - akhmadullin
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

- `auto` — значение по умолчанию, дефолтное якорное имя не задаётся;
- `<anchor-name>` — имя, заданное в свойстве [`anchor-name`](/css/anchor-name/) якорного элемента, должно начинаться с двух дефисов.

```css
.anchor {
  anchor-name: --my-anchor;
}

.target {
  position: absolute;
  position-anchor: --my-anchor;
}
```

## Как понять

Свойство `position-anchor` указывает дефолтный якорный элемент, относительно которого будет позиционироваться текущий. Функции [`anchor()`](/css/anchor-function/) и [`anchor-size()`](/css/anchor-size-function/), отвечающие за расположение и размер текущего элемента, будут использовать значение `position-anchor`, чтобы привязаться к нужному якорному элементу, если в них явно не передать имя другого якоря.

## Подсказки

💡 Не забудьте указать `position: absolute` или `position: fixed` для таргет элемента, так как [Anchor Positioning](/css/anchor-positioning-guide/) работает только с этими видами позиционирования.
