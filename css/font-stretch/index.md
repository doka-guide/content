---
title: "`font-stretch`"
authors:
  - doka-dog
tags:
  - doka
  - placeholder
---

## Кратко

Свойство `font-stretch` устанавливает узкое, нормальное или широкое начертание шрифта. Как и в случае [`font-weight`](/css/font-weight/), браузер не меняет рисунок шрифта, а выбирает из доступных шрифтов подходящие начертания, если они описаны в `@font-face` или есть в системном шрифте.

## Как пишется

Возможные значения:

- `normal` — нормальная или «текстовая» ширина шрифта (значение по умолчанию).
- `semi-condensed`, `condensed`, `extra-condensed`, `ultra-condensed` — сжатое начертание разной степени.
- `semi-expanded`, `expanded`, `extra-expanded`, `ultra-expanded` — расширенное начертание разной степени.
- проценты — точное указание процентов в диапазоне от 50 до 200, не включая границы. Отрицательные значения недопустимы.

Сопоставление ключевых слов с числовыми значениями:

- `ultra-condensed` — 50%
- `extra-condensed` — 62.5%
- `condensed` — 75%
- `semi-condensed` — 87.5%
- `normal` — 100%
- `semi-expanded` — 112.5%
- `expanded` — 125%
- `extra-expanded` — 150%
- `ultra-expanded` — 200%
