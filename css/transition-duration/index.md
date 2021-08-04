---
title: "transition-duration"
authors:
  - ezhkov
keywords:
  - transition-duration
  - transition
tags:
  - doka
---

## Кратко

Когда нам нужно сделать плавное изменение какого-то CSS-свойства, то браузеру нужно понимать, какое время займёт этот переход. Это время указывается в свойстве `transition-duration`.

## Пример

```css
.box {
  transition-property: color;
  transition-duration: 0.3s;
}
```

## Как пишется

Значения времени:

```css
.selector {
  transition-duration: 6s; /* время в секундах */
  transition-duration: 120ms; /* время в миллисекундах */
  transition-duration: 0.1s, 15s; /* несколько времён в секундах */
  transition-duration: 10s, 30s, 230ms; /* несколько времён в секундах и миллисекундах */
}
```

Глобальные значения:

```css
.selector {
  transition-duration: inherit;
  transition-duration: initial;
  transition-duration: unset;
}
```

## Как это понять

Браузер анимирует изменения свойств при выполнении двух условий:

- перечислены свойства, которые нужно анимировать ([`transition-property`](/css/transition-property/))
- перечислены времена анимации для этих свойств (`transition-duration`)

В общем случае количество свойств и количество времён должны совпадать и браузер сопоставляет каждое время каждому свойству из списка в `transition-property`].

```css
.box {
  transition-property: color, font-size;
                        |       |
  transition-duration: .3s,    .5s;
}
```

Если количество свойств не совпадает с количеством времён, то браузер в качестве основного списка использует перечень свойств из `transition-property` и каждому свойству подставляет соответствующее время. Если времён больше, лишние отбрасываются. Если меньше — список времён повторяется:

```css
/* Времён больше. Лишние отбрасываются */

.box {
  transition-property: color, font-size;
                        |       |
  transition-duration: .3s,    .5s, 1s, 2s;
}

/* Времён меньше. Список повторяется с начала */
.box {
  transition-property: color, font-size, padding, transform;
                        |       |           |         |
  transition-duration: .3s,    .5s;     /* .3s       .5s */
}
```

## Подсказки

💡 Если время пишется в секундах и оно меньше одной секунды (например, `0.4s`), то ноль можно отбрасывать: `transition-duration: .4s`.
