---
title: "`flex`"
description: "Короткая запись для управления размерами флекс-элемента."
baseline:
  - group: flexbox
    features:
      - css.properties.flex
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - flexbox
related:
  - css/flex-grow
  - css/flex-basis
  - css/flex-shrink
tags:
  - doka
---

## Кратко

Свойство-шорткат, с помощью которого можно указать значение трёх свойств одновременно: `flex-grow`, `flex-shrink` и `flex-basis`.

## Пример

В примере ниже элемент с классом `.item` не будет сужаться или растягиваться. Ширина будет равна 250 пикселям.

```css
.container {
  display: flex;
}

.item {
  flex: 0 0 auto;
  width: 250px;
}
```

## Как понять

Короткий способ одновременно указать сразу несколько значений, сэкономив пару строк кода.

## Как пишется

Первое значение является обязательным, остальные опциональны.

Значение по умолчанию: `0 1 auto`, что расшифровывается как `flex-grow: 0`, `flex-shrink: 1`, `flex-basis: auto`.

### Возможные значения

Равно значению `0 0 auto`:

```css
.element {
  flex: none;
}
```

Одно значение, число без единиц — `flex-grow`:

```css
.element {
  flex: 2;
}
```

Одно значение, ширина или высота — `flex-basis`:

```css
.element {
  flex: 10em;
  flex: 30px;
  flex: auto;
  flex: content;
}
```

Два значения — `flex-grow` и `flex-basis`:

```css
.element {
  flex: 1 30px;
}
```

Два значения — `flex-grow` и `flex-shrink`:

```css
.element {
  flex: 2 2;
}
```

Три значения — `flex-grow`, `flex-shrink` и `flex-basis`:

```css
.element {
  flex: 2 2 10%;
}
```

Глобальные значения:

```css
.element {
  flex: inherit;
  flex: initial;
  flex: unset;
}
```

## Подсказки

💡 С шорткатом `flex` стоит быть осторожным, как и со всеми прочими шорткатами. Хоть он и позволяет экономить пару строк кода, но в случае переопределения одного из значений придётся переписывать свойство целиком, повторяя остальные значения, которые не меняются. В этот момент проще было бы иметь три отдельных свойства и менять значения отдельно.

<aside>

📝 Полный список свойств флексбоксов можно посмотреть в [гайде по flexbox](/css/flexbox-guide/).

</aside>
