---
title: "`@font-feature-values`"
description: ""
authors:
  - doka-dog
tags:
  - doka
  - placeholder
---

## Кратко

Директива `@font-feature-values` позволяет назначить для каждого шрифта удобное для человека имя и сопоставить его с индексом функций. Используя эти дружественные имена, можно легко включать похожие функции независимо от используемого шрифта (если он определил это имя для всех шрифтов). Используется в связке со свойством [`font-variant-alternates`](/css/font-variant-alternates).

## Пример

```css
@font-feature-values Otaru Kisa {
  @annotation { circled: 1; black-boxed: 3; }
}
@font-feature-values Taisho Gothic {
  @annotation { boxed: 1; circled: 4; }
}

h3.title {
  /* Форма circled определена для обоих шрифтов */
  font-family: Otaru Kisa, Taisho Gothic;
  font-variant: annotation(circled);
}
```

## Как пишется

После директивы `@font-feature-values` пишется имя шрифта. Дальше ставятся фигурные скобки и внутри них пишется одна из директив-значений:

- `@swash` — определяет имя, которое будет использовано в функции `swash()`. Допустимо одно значение.
- `@annotation` — определяет имя, которое будет использовано в функции `annotation()`.
- `@ornaments` — определяет имя, которое будет использовано в функции `ornaments()`.
- `@stylistic` — определяет имя, которое будет использовано в функции `stylistic()`.
- `@styleset` — определяет имя, которое будет использовано в функции `styleset()`.
- `@character-variant` — определяет имя, которое будет использовано в функции `character-variant()`.

У всех определений, кроме `@styleset` и `@character-variant`, допускается только одно значение.

У `@styleset` можно объявить до 99 значений. Например, `fancy-style: 2 4 12 1` будет преобразовано браузером в обращение к наборам OpenType ss02, ss04, ss12 и ss01. Технически возможно указать больше 99 значений, но числа больше 99 не будут ни с чем сопоставлены.

У `@character-variant` допускается максимум два значения. Например, `fancy-char: 3` соответствует cv03=1, а `fancy-char: 2 4` соответствует cv02=4.

