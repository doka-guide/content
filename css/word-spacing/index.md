---
title: "`word-spacing`"
authors:
  - ra1nbow1
description: "Свойство, которое задает отступ между символами"
keywords:
  - отступы между символами
  - отступы в тексте
tags:
  - doka
---

## Кратко

Свойство `word-spacing` устанавливает размер пробела между словами и тегами в тексте.

## Пример

```css
div {
  word-spacing: 5px;
}
```

## Как пишется

Возможные варианты значений:

```css
div {
  word-spacing: normal;
  word-spacing: 10px;
  word-spacing: 150%;
  word-spacing: 2rem;
  word-spacing: initial;
  word-spacing: unset;
  word-spacing: inherit;
}
```

<iframe title="Варианты значений" src="demos/basic/" height="375"></iframe>

### Значения

- `normal` - нормальный интервал между словами, определённый текущим шрифтом и/или браузером;
- `length` - указывается в паре с числовым значением. Включает в себя `px`, `rem` и другие;
- `percentage` - указывается в паре с числовым значением. Например, 20%.
