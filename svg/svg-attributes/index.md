---
title: "Общие атрибуты в SVG"
description: "Изучите основные атрибуты SVG для создания визуальных элементов на веб-страницах"
authors:
  - Elizaveta Kurochkina
contributors:
  - Никнеймы всех соавторов и контрибьюторов
editors:
  - Никнеймы всех редакторов
keywords:
  - SVG, атрибуты
related:
  - svg/svg
  - html/style
tags:
  - doka
---

## Кратко

В векторном формате графики SVG можно использовать знакомые из HTML атрибуты. К таким атрибутам относятся id, lang, autofocus, style, class, tabindex. Данные атрибуты можно указывать для любого SVG элемента.

## Атрибут id

Аналогично атрибуту id в HTML, в SVG id используется, чтобы присвоить  уникальное имя элементу.

Атрибут id должен быть уникальным в дереве DOM, не должен содержать пустую строку и пробелы. Идентификатор элемента также не может начинаться с цифры, символа точки или с дефиса.

## Пример

```html
<svg 
  id="rectangle-id"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 60 60"
>
  <path 
  fill="#E37979"
  stroke="#BB4F4F"
  stroke-width="2" 
  d="M1 1h58v58H1z"
  />
</svg>
```

## Атрибут lang

Атрибут lang используется для определения языка содержимого элемента, а также любого атрибута элемента, который содержит текст.

## Пример

```html
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <text lang="en-US">This is some English text</text>
</svg>
```

## Атрибут autofocus

Autofocus автоматически устанавливает фокус на элементе после загрузки страницы.
Атрибут не имеет никакого эффекта, если элемент еще не доступен для фокусировки.
Аналогичен атрибуту autofocus в HTML.

## Пример

```html
<svg autofocus viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
</svg>
```

## Атрибут style

Атрибут style позволяет встраивать стили CSS в разметку SVG. Атрибут индентичен атрибуту style в HTML.

```html
<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
  <rect
    width="80"
    height="40"
    x="10"
    y="10"
    style="fill: skyblue; stroke: cadetblue; stroke-width: 2;"/>
</svg>
```

В примере в атрибут style записаны значения цветов для заполнения фигуры и для ее обводки, а также ширина обводки.

## Атрибут class

Как и HTML, SVG поддерживает атрибут class. Данный атрибут присваивает имя класса или набор имен классов. Класс позволяет назначить определенные стили элементу.

## Атрибут tabindex

Данный атрибут позволяет контролировать доступен ли элемент для фокусировки и должен ли он участвовать в последовательной навигации по всей странице с помощью клавиатуры и в каком порядке.

Атрибут может принимать положительное или отрицательное целочисленное значение, а также значение 0.

- Если указано отрицательное число, то элемент может быть выделен, но он не будет учавствовать в последовательной навигации.

- Если у tabindex значение равно 0, то элемент может быть выделен и будет учавствовать в последовательной навигации, но порядок навигации определяется платформой.

- Положительное значение tabindex определяет порядок элемента при последовательной навигации, а также обозначает, что элемент может быть выделен и достигнут. Если несколько элементов имеют одно и то же значение tabindex, то их порядок навигации определяется расположением в DOM.

```html
<svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="60" r="15" tabindex="0" />
  <circle cx="60" cy="160" r="30" tabindex="0" />
  <circle cx="160" cy="60" r="30" tabindex="0" />
  <circle cx="160" cy="160" r="60" tabindex="0" />
</svg>
```

### Документация MDM Web Docs

- [Статья про атрибут tabindex](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/tabindex);
- [Статья про атрибут class на русском](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute/class);
- [Статья про атрибут style](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/style);
- [Статья про атрибут id на русском](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute/id);
- [Статья про атрибут lang на русском](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute/lang);
- [Справочник атрибутов SVG](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute);

### Спецификация SVG2

-[Спецификация SVG2 на английском языке](https://svgwg.org/svg2-draft/struct.html#CommonAttributes);

