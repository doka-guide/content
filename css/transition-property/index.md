---
title: "`transition-property`"
description: "Указываем точно, какое свойство будет меняться плавно."
baseline:
  - group: transitions
    features:
      - css.properties.transition-property
authors:
  - ezhkov
related:
  - css/transition
  - css/animation
  - css/transform
tags:
  - doka
---

## Кратко

Если нам нужно анимировать переход нескольких свойств элемента (например, цвета и размера шрифта), то удобно перечислить их в свойстве `transition-property`.

## Пример

```css
.box {
  transition-property: color, font-size;
  transition-duration: 0.3s, 0.5s;
}
```

## Как пишется

Одно значение:

```css
.selector {
  transition-property: color;
}
```

Несколько значений:

```css
.selector {
  transition-property: transform, height, color;
}
```

Анимируем всё подряд:

```css
.selector {
  transition-property: all;
}
```

## Как понять

Когда нужно анимировать переход сразу нескольких свойств элемента, то лучше использовать не комплексное свойство [`transition`](/css/transition/), а каждое из подсвойств в отдельности. Код получится более понятным и вы не запутаетесь в длинных строчках. Сравним:

```css
.box {
  transition: color 0.2s, transform 0.3s, padding-left 0.5s, padding-right 0.5s;
}

.box {
  transition-property: color, transform, padding-left, padding-right;
  transition-duration: 0.2s, 0.3s, 0.5s, 0.5s;
}
```

Во втором примере строк больше, но он выглядит понятнее и проще читается.

## Подсказки

💡 Чтобы свойство анимировалось, не забывайте добавлять [`transition-duration`](/css/transition-duration/), иначе браузер не поймёт, какой длительности должны быть переходы свойств.

💡 `transition-property` может принимать значение `all`, что говорит браузеру о том, что нужно будет плавно изменять **все** возможные свойства элемента. Такая запись сильно короче, но заставляет браузер выполнять лишнюю работу по проверке каждого CSS-свойства. Поэтому правилом хорошего тона считается не использовать `all`, а перечислить только изменяющиеся свойства.
