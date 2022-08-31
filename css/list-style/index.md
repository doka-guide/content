---
title: "`list-style`"
authors:
  - doka-dog
contributors:
  - blueingreen68
tags:
  - doka
---

## Кратко

Шорткат `list-style` позволяет одновременно задать значение для следующих свойств:

- [`list-style-type`](/css/list-style-type/);
- [`list-style-position`](/css/list-style-position/);
- [`list-style-image`](/css/list-style-image/).

## Пример

Код ниже задаёт всем элементам списка стиль маркера `upper-alpha` и делает маркер частью содержимого элемента списка.

```css
li {
    list-style: upper-alpha inside;
}
```

## Как пишется

Значения свойства можно задавать в любом порядке и в любом количестве от 1 до 3:

```css
ul {
  /* image, type */
  list-style: none;
  /* type, position */
  list-style: disc inside;
  /* type, image, position */
  list-style: decimal url('marker.png') outside;
}
```

Браузер сам найдёт подходящие значения для нужных свойств.

## Использование значения `none`

Использовать значение `none` в сокращении стоит аккуратно, потому что это значение можно указать как для свойства `list-style-image` так и для свойства `list-style-type`.

Например, код ниже установит значение `none` для свойства `list-style-image`, а для свойства `list-style-type` значение `disc`:

```css
ul {
  list-style: none disc;
}
```
А здесь установит значение `url(doka.png)` для свойства `list-style-image`, а для свойства `list-style-type` значение `none`:

```css
ul {
  list-style: none url(doka.png);
}
```

Если установить просто значение `none` свойству `list-style`, то значение `none` примениться только к свойствам `list-style-image`, `list-style-type`, но не к свойству `list-style-position`, потому что у него нет значения `none`.

```css
ul {
  /* Устанавливает значение none для свойств list-style-image, list-style-type */
  list-style: none;
  /* Не сработает. У свойства list-style-position нет значения none. */
  list-style: none disc url(doka.png);
}
```

## Подсказки

💡 Как и с любым шорткатом, со свойством `list-style` нужно обращаться осторожно. Если потребуется переопределить всего одно из заданных значений, то нужно будет переписать и все остальные.

💡 Если в рамках шортката не задано значение для какого-то из свойств и в коде ниже оно не прописано, то свойству устанавливается значение по умолчанию.

💡 Записанные выше отдельные свойства переопределяются заданным ниже свойством `list-style`.