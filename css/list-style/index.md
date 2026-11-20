---
title: "`list-style`"
description: "Шорткат, которым удобно стилизовать маркеры списка."
baseline:
  - group: list-style
    features:
      - css.properties.list-style
authors:
  - blueingreen68
contributors:
  - solarrust
related:
  - html/li
  - css/list-style-position
  - css/list-style-type
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

Значения свойства можно задавать в любом порядке и в любом количестве от 1 до 3.

Установим значение `none` для изображения и типа маркера:

```css
ul {
  list-style: none;
}
```

Зададим значение `disc` для типа маркера и `inside` для позиции:

```css
ul {
  list-style: disc inside;
}
```

Зададим значение `decimal` для типа, укажем путь до картинки и расположим маркер снаружи пункта списка:

```css
ul {
  list-style: decimal url('marker.png') outside;
}
```


Браузер сам найдёт подходящие значения для нужных свойств.

## Использование значения `none`

Использовать значение `none` в сокращении стоит аккуратно, потому что это значение можно указать как для `list-style-image` так и для `list-style-type`.

Например, код ниже установит значение `none` для `list-style-image`, а для `list-style-type` значение `disc`:

```css
ul {
  list-style: none disc;
}
```

А здесь установит значение `url(doka.png)` для `list-style-image`, а для `list-style-type` значение `none`:

```css
ul {
  list-style: none url(doka.png);
}
```

Если установить просто значение `none` свойству `list-style`, то значение `none` применится только к `list-style-image` и `list-style-type`, но не к свойству `list-style-position`, потому что у него нет значения `none`.

Код ниже устанавливает значение `none` для свойств `list-style-image` и `list-style-type`:

```css
ul {
  list-style: none;
}
```

А такой код не сработает. У свойства `list-style-position` нет значения `none`:

```css
ul {
  list-style: none disc url(doka.png);
}
```

## Подсказки

💡 Как и с любым шорткатом, со свойством `list-style` нужно обращаться осторожно. Если потребуется переопределить всего одно из заданных значений, то нужно будет переписать и все остальные.

💡 Если в рамках шортката не задано значение для какого-то из свойств и в коде ниже оно не прописано, то свойству устанавливается значение по умолчанию.

💡 Записанные выше отдельные свойства переопределяются заданным ниже свойством `list-style`.
