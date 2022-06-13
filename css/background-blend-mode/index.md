---
title: "`background-blend-mode`"
description: "Смешиваем картинки и цвет почти как в Photoshop, но только в CSS."
authors:
  - doka-dog
keywords:
  - смешение фонов
  - наложение фонов
related:
  - css/background-color
  - css/web-colors
  - css/background-image
tags:
  - doka
  - placeholder
---

## Кратко

Свойство `background-blend-mode` даёт возможность смешивать разные фоны между собой.

## Как пишется

- `normal` — значение по умолчанию, фоны не смешиваются, верхний слой остаётся непрозрачным.

### Режим контраста

- `overlay` — [`background-color`](/css/background-color/) смешивается с [`background-image`](/css/background-image/), чтобы отразить светлые или тёмные участки фона.
- `hard-light` — если `background-image` светлее `background-color`, то результатом будет `muliply`, а если светлее, то результатом будет `screen`.
- `soft-light` — конечный результат похож на `hard-light`, но более мягкий, как будто на изображение попал рассеянный прожектор.

### Режим затемнения

- `darken` — если `background-image` темнее `background-color`, то изображение заменяется, в противном случае оно остаётся прежним.
- `multiply` — `background-image` и `background-color` перемножаются, и обычно это приводит к получению более тёмного изображения, чем исходное.
- `color-burn` — `background-color` инвертируется, делится на `background-image` и снова инвертируется. Похоже на `multiply`.

### Режим осветления

- `lighten` — если `background-image` светлее `background-color`, то изображение заменяется, в противном случае оно остаётся прежним.
- `screen` — и изображение, и цвет инвертируются, умножаются и затем снова инвертируются.
- `color-dodge` — `background-color` делится на обратную величину `background-image`. Это очень похоже на `screen`.

### Режим сравнения

- `difference` — результат вычитания тёмного цвета `backgroound-image` и `background-color` из самого светлого. Часто изображение будет иметь очень высокий контраст.
- `exclusion` — результат очень похож на `difference`, но с меньшим контрастом.

### Компонентный режим

- `saturation` — сохраняет насыщенность `background-image`, смешивая при этом оттенок и светимость `background-color`.
- `color` — сохраняет оттенок и насыщенность `background-image` и светимость `background-color`.
- `luminosity` — светимость верхнего цвета сохраняется, при этом используются насыщенность и оттенок `background-color`.
- `hue` — результатом будет оттенок `background-image` в сочетании со светлотой и насыщенностью `background-color`.
