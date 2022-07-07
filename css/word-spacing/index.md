---
title: "`word-spacing`"
authors:
  - ra1nbow1
keywords:
  - отступы между символами
  - отступы в тексте
tags:
  - doka
---

## Кратко

Свойство `word-spacing` устанавливает размер пробела между словами и тегами в тексте.

## Пример

Ключевое слово:
```css
div {
  word-spacing: normal;
}
```

Значения в пикселях и других единицах измерения:
```css
div {
  word-spacing: 10px;
}
```

```css
div {
  word-spacing: 150%;
}
```

```css
div {
  word-spacing: 2rem;
}
```

Глобальные значения
```css
div {
  word-spacing: initial;
  }
```

```css
div {
  word-spacing: unset;
  }
```

Варианты значений:

<iframe title="Варианты значений" src="demos/basic/" height="375"></iframe>

## Как пишется

```css
div {
  word-spacing: normal|length|percentage|initial|inherit;
}
```

### Значения

- `normal` - нормальный интервал между словами, определённый текущим шрифтом и/или браузером;
- `length` - определяет дополнительный интервал в дополнение к внутреннему интервалу между словами, определяемому шрифтом;
- `percentage` - определяет дополнительный интервал как процент от предварительной ширины символа.
