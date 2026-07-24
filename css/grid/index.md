---
title: "`grid`"
description: "Короткий способ указать значения для большинства свойств гридов."
baseline:
  - group: grid
    features:
      - css.properties.grid
authors:
  - solarrust
editors:
  - tachisis
related:
  - css/grid-template
  - css/grid-auto-flow
  - css/grid-guide
tags:
  - doka
---

## Кратко

Мегашорткат, позволяющий задать значения всему и сразу. А конкретно с его помощью можно указать значения для следующих свойств:

- [`grid-template-rows`](/css/grid-template-rows/);
- [`grid-template-columns`](/css/grid-template-columns/);
- [`grid-template-areas`](/css/grid-template-areas/);
- [`grid-auto-rows`](/css/grid-auto-columns-rows/);
- [`grid-auto-columns`](/css/grid-auto-columns-rows/);
- [`grid-auto-flow`](/css/grid-auto-flow/).

## Пример

Такой блок кода:

```css
.container {
  grid: 50px 150px / 2fr 1fr;
}
```

...будет аналогичен этому коду:

```css
.container {
  grid-template-rows: 50px 150px;
  grid-template-columns: 2fr 1fr;
}
```

## Как пишется

### `none`

Значение по умолчанию. Это ключевое слово сбрасывает значения для всех свойств, входящих в этот шорткат.

```css
.container {
  display: grid;
  grid: none;
}
```

### Значение для `grid-template`

Можно указать допустимые значения для шортката [`grid-template`](/css/grid-template/):

```css
.container {
  display: grid;
  grid: repeat(4, 150px) / 1fr 200px 1fr;
}
```

В том числе можно указать имена для линий:

```css
.container {
  display: grid;
  grid:
    [row1-start] 25px [row1-end row2-start] 25px [row2-end]
    / auto 50px auto;
}
```

### Размеры колонок и рядов

Создадим два ряда и две колонки:

```css
.container {
  display: grid;
  grid: 200px 100px / 30% 30%;
}
```

### `auto-flow`

Ключевое слово `auto-flow` даёт браузеру понять, что создавать при необходимости: колонки или ряды.

Если `auto-flow` стоит справа от слэша, то будут создаваться автоматические колонки:

```css
.container {
  display: grid;
  grid: 200px 100px / auto-flow 30%;
}
```

Если `auto-flow` стоит слева от слэша, то будут создаваться автоматические ряды:

```css
.container {
  display: grid;
  grid:  auto-flow 30% / 200px 100px;
}
```

### `dense`

К ключевому слову `auto-flow` можно добавить `dense`. Оно укажет браузеру, что элементы должны стараться заполнить свободные ячейки. Подробнее про работу этого ключевого слова можно почитать в статье про [`grid-auto-flow`](/css/grid-auto-flow/).

Важно ставить это слово сразу после `auto-flow`:

```css
.container {
  display: grid;
  grid:  auto-flow dense 30% / 200px 100px;
}
```

## Подсказки

💡 Перед тем как соблазниться возможностью расписать всё в одном свойстве, дважды (а то и трижды) подумайте о читабельности кода. Учтите и то, что гриды не такая уж простая технология. Не каждый коллега сможет прочесть этот шорткат.

💡 Значение `subgrid` шорткат `grid` не принимает — только отдельные свойства `grid-template-columns` и `grid-template-rows`.

<aside>

📝 Полный список свойств гридов можно посмотреть в [гайде по grid](/css/grid-guide/).

</aside>
