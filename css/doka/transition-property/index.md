---
title: "transition-property"
name: transition-property
author: ezhkov
tags:
  - sprint-2
summary:
  - transition
  - transition-property
---

## Кратко

Если нам нужно анимировать переход нескольких свойств элемента (например, цвета и размера шрифта), то удобно перечислить их в свойстве `transition-property`

## Пример

```css
.box {
  transition-property: color, font-size;
  transition-duration: 0.3s, 0.5s;
}
```

## Как пишется

```css
/* Одно значение */
transition-property: color;

/* Несколько значений */
transition-property: transform, height, color;

/* Служебные значения */
transition-property: inherit;
transition-property: initial;
transition-property: unset;
transition-property: none;
transition-property: all;
```

## Как это понять

Когда нужно анимировать переход сразу нескольких свойств элемента, то лучше использовать не комплексное свойство [transition](/css/doka/transition/), а каждое из подсвойств в отдельности. Код получится более понятным и ты не запутаешься в длинных строчках. Сравни:

```css
.box {
  transition: color 0.2s, transform 0.3s, padding-left 0.5s, padding-right 0.5s;
}

.box {
  transition-property: color, transform, padding-left, padding-right;
  transition-duration: 0.2s, 0.3s, 0.5s, 0.5s;
}
```

Во втором примере строк больше, но он выглядит понятнее и проще читается

## Подсказки

❗Чтобы свойство анимировалось, не забывай обязательно добавлять [transition-duration](/css/doka/transition-duration/), иначе браузер не поймёт, какой длительности должны быть переходы свойств

❗`transition-property` может принимать значение `all`, что говорит браузеру о том, что нужно будет плавно изменять **все** возможные свойства элемента. Такая запись сильно короче, но заставляет браузер выполнять лишнюю работу по проверке каждого CSS-свойства. Поэтому правилом хорошего тона считается не использовать `all`, а перечислить только изменяющиеся свойства.
