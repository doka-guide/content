---
title: "Общие атрибуты в SVG"
description: "Основные SVG-атрибуты для создания визуальных элементов в вебе."
authors:
  - Elizaveta Kurochkina
keywords:
  - common attributes
  - SVG attributes
related:
  - svg/svg
  - html/style
  - html/global-attrs
tags:
  - doka
---

## Кратко

В векторном формате графики SVG можно использовать несколько знакомых HTML-атрибутов. К таким атрибутам относятся `id`, `lang`, `autofocus`, `style`, `class` и `tabindex`. Данные атрибуты можно указывать для любых SVG-элементов.

## `id`

Атрибут используют, чтобы присвоить уникальное имя элементу, как и [`id`](/html/global-attrs/#id) в HTML.

Значение атрибута должно быть уникальным и не повторяться на одной странице, а также не может быть пустым или содержать пробелы. Наконец, идентификатор элемента не может начинаться с цифры, точки или с дефиса.

### Пример

```svg
<svg
  id="svg-element-id"
  viewBox="0 0 60 60"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill="#FFFFFF"
    stroke="#000000"
    stroke-width="2"
    d="M1 1h58v58H1z"
  />
</svg>
```

## `lang`

Используется для определения языка текстового содержимого элемента, как и [HTML-атрибут `lang`](/html/global-attrs/#lang).

### Пример

```svg
<svg
  viewBox="0 0 200 100"
  xmlns="http://www.w3.org/2000/svg"
>
  <text lang="no">Det var bra</text>
</svg>
```

## `autofocus`

Автоматически устанавливает фокус на SVG-элементе после загрузки страницы. Атрибут не срабатывает, если на элементе пока нельзя установить фокус. Аналогичен HTML-атрибуту `autofocus`.

### Пример

```svg
<svg
  autofocus
  viewBox="0 0 200 100"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Содержимое элемента -->
</svg>
```

### `style`

Позволяет встраивать CSS-стили прямо в SVG. Индентичен [атрибуту `style`](/html/global-attrs/#style) в HTML.

### Пример

Здесь в атрибуте `style` указаны значения цветов для заполнения фигуры и для обводки, а также ширина этой обводки.

```svg
<svg
  viewBox="0 0 100 60"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect
    width="80"
    height="40"
    x="10"
    y="10"
    style="fill: skyblue; stroke: cadetblue; stroke-width: 2;"
  />
</svg>
```

## `class`

Присваивает имя класса или целый набор имён. Благодаря классам можете назначать стили разным SVG-элементам. В HTML тоже есть [атрибут `class`](/html/class/).

## `tabindex`

Позволяет управлять фокусом у SVG-элемеетов и включать их в порядок навигации на странице. Аналог в HTML — [`tabindex`](/html/tabindex/).

Принимает целое положительное (`1`), отрицательное (`-1`) значения, а также ноль (`0`). Как работают эти значения:

- Если указано отрицательное число, элемент можно выдить, но он пропадёт из последовательной навигации по странице.
- Если значение равно нулю, то на элементе можно сделать фокус и он попадёт в порядок нафигации, который определяют браузеры.
- Если значение положительное, то на элементе можно сделать фокус в порядке, который соответствует этому значению. Если у элементов одно и то же значение, например, `2`, их порядок определяется по их расположению в коде.

### Пример

```svg
<svg
  viewBox="0 0 260 260"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="60" cy="60" r="15" tabindex="0" />
  <circle cx="60" cy="160" r="30" tabindex="0" />
  <circle cx="160" cy="60" r="30" tabindex="0" />
  <circle cx="160" cy="160" r="60" tabindex="0" />
</svg>
```

## Полезные ссылки

- [Спецификация SVG2 на английском](https://svgwg.org/svg2-draft/struct.html#CommonAttributes);
- [Атрибут `tabindex`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/tabindex);
- [Атрибут `class`](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute/class);
- [Атрибут `style`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/style);
- [Атрибут `id`](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute/id);
- [Атрибут `lang`](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute/lang).
