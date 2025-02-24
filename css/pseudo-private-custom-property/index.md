---
title: "Псевдоприватные кастомные свойства"
descriptioin: "Удобный способ работать с кастомными свойствами и использовать их как аргументы миксинов у препроцессоров."
authors:
  - alex-andr-19
contributors:
  - skorobaeus
related:
  - tools/preprocessors
  - css/layer
  - css/cascade
  - css/custom-properties
  - css/var
tags:
  - article
---

## Введение

Начнём с простого. **Что такое псевдоприватность?**

В языках программирования, которые не имеют в своём движке инкапсуляцию, для защиты полей и методов принято использовать соглашение о нейминге.

Например, в JavaScript и Python принято писать нижнее подчёркивание перед самим именем поля или метода:

```js
const someObj = {
  publicValue: 42,
  _privateValue: "42"
}
```

Также существует вариант с подчёркиванием в конце имени.

## Псевдоприватность в CSS

[Кастомные свойства](/css/custom-properties/) CSS наследуются внутрь всех дочерних элементов по умолчанию. Определив кастомное свойство в родительском элементе, мы сможем переиспользовать его в любом дочернем.

Также нет возможности инкапсулировать свойство для конкретного класса:

```html
<div class="first second"></div>
```

Все кастомные свойства, которые определены в классе `first`, будут также доступны для чтения и изменения в классе `second` и наоборот.

Чтобы защитить свойства от чтения и записи и возникает необходимость **псевдоприватности кастомных свойств**.

```css
.first {
  --_background-color: darkgreen;

  background-color: var(--_background-color);
  color: var(--color);
}

.second {
  --background-color: blue;
  --color: white;
}
```

Здесь цвет фона блока не будет изменён из класса `second`, а останется таким, каким его определил `first`.

### Применение

Псевдоприватность позволяет делать защищённые утилитарные классы и оставлять «снаружи» только «аргументы».

Например, утилитарный класс `rect-size` описывает параметры квадратного блока, а «снаружи» через класс `logo` можно контролировать только его размер:

```html
<img src="/img/logo.svg" class="logo rect-size"> />
```

```css
.rect-size {
  --_size: var(--size, 24px);

  min-width: var(--_size);
  min-height: var(--_size);
  width: var(--_size);
  height: var(--_size);
  max-width: var(--_size);
  max-height: var(--_size);
  aspect-ratio: 1;
}

.logo {
  --size: 32px;
}
```

Или ограничим количество отображаемых строк, оставив возможность указать нужное через «аргумент»:

```html
<p class="description clamp-text-lines">
  И восстали машины из пепла ядерного огня, и пошла война на уничтожение
  человечества. И шла она десятилетия, но последнее сражение состоится
  не в будущем, оно состоится здесь, в наше время, сегодня ночью.
</p>
```

```css
.clamp-text-lines {
  --_lines-count: var(--lines-count, 3);

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--_lines-count);
  overflow: hidden;
}

.description {
  --lines-count: 2;
}
```

Перечисленные «утилитарные» классы можно расположить в одном файле, например, `utilities.css` и сразу подключить его к `index.html`. Так, просто применив класс к DOM-элементу, мы получим ожидаемое поведение, которое каждый раз прописывать руками было бы неприятно.

### Применение псевдоприватности даёт:

1. Изоляцию стилей на уровне CSS, без экспериментальных технологий.
1. Гибкость в использовании.
1. Возможность переписать миксины препроцессоров на нативный CSS.

## Реальная задача

Может возникнуть такая ситуация, что дизайнеры создали классный дизайн для карточек продуктов, у которых цвет отличается в зависимости от типа товара (скидки, популярное, новое и т. д.).

В классическом варианте решения можно добавить уникальные классы каждой карточке:

```html
<section class="product-list">
  <div class="product-list__item product-card">Глубина шторма</div>
  <div class="product-list__item product-card new">Электро-лазурь</div>
  <div class="product-list__item product-card top">Сахарная вата</div>
</section>
```

И затем задать стили этим уникальным классам:

```css
.product-card {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #123E66;
  box-shadow: 10px 10px 0 0 #0D2B47;

  font-size: 18px;
  color: #FFFFFF;

  &.new {
    background-color: #2E9AFF;
    box-shadow: 10px 10px 0 0 #006DD3;

    color: #000000;
  }

  &.top {
    background-color: #F498AD;
    box-shadow: 10px 10px 0 0 #E92D58;

    color: #000000;
  }
}
```

<iframe title="Базовое решение" src="demos/classes/" height="350"></iframe>

Можно увидеть, что основные цвета (`#123E66`, `#2E9AFF`, `#F498AD`) влияют на большую часть стилизации карточки: цвет фона, падающей тени и текста.

Каждый раз подбирать нужный цвет тени и определять нужную степень контраста текста будет сложно, особенно если появится необходимость расширить набор карточек подобного рода.

## Возможное решение

Решением такой задачи может стать использование [кастомных свойств](/css/custom-properties/) и CSS-функций. Недостатки такого подхода станут очевидны после его реализации:

```css
:root {
  --card-default: #123E66;
  --card-new: #2E9AFF;
  --card-top: #F498AD;
}

.product-card {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--card-default);
  box-shadow: 10px 10px 0 0 hsl(from var(--card-default) h s calc(l * 0.7));

  font-size: 18px;
  color: hsl(from var(--card-default) 0 0 calc((50 - l) * 100));

  &.new {
    background-color: var(--card-new);
    box-shadow: 10px 10px 0 0 hsl(from var(--card-new) h s calc(l * 0.7));

    color: hsl(from var(--card-new) 0 0 calc((50 - l) * 100));
  }

  &.top {
    background-color: var(--card-top);
    box-shadow: 10px 10px 0 0 hsl(from var(--card-top) h s calc(l * 0.7));

    color: hsl(from var(--card-top) 0 0 calc((50 - l) * 100));
  }
}
```

Объём кода увеличился и читаемость стала значительно ниже. Также прямое использование кастомных свойств не дало возможности увеличить количество классов.

В таком случае очень хочется применить миксины или функции из препроцессоров, но приносить в проект препроцессоры для решения задачи перекраски карточек не выглядит как разумное решение.

### Решаем задачу при помощи псевдоприватности

```css
.product-card {
  --_background-color: #123E66;

  background-color: var(--_background-color);
  box-shadow:
    10px 10px 0 0
    hsl(from var(--_background-color) h s calc(l * 0.7));
}

.new {
  --background-color: #2E9AFF;

  box-shadow:
    10px 10px 0 0
    hsl(from var(--background-color) h s calc(l * 0.7));
}
```

В данном случае в разных классах существуют независимые кастомные свойства `--_background-color` и `--background-color`. При этом в классе `product-card` свойство «закрыто» псевдоприватностью и не может быть изменено из класса `new`.

При всём этом цвет тени напрямую зависит от цвета фона в каждом из классов. Фактически значение [`box-shadow`](/css/box-shadow/) зависит только от кастомного свойства.

### Взаимодействие кастомных свойств с разной приватностью

Так как `--background-color` в классе `new` не «защищено» псевдоприватностью, можно использовать его в смежных классах. Например, в `.product-card`:

```css
.product-card {
  --_background-color: var(--background-color);

  background-color: var(--_background-color);
  box-shadow:
    10px 10px 0 0
    hsl(from var(--_background-color) h s calc(l * 0.7));
}

.new {
  --background-color: #2E9AFF;
}
```

Таким образом мы передали значение цвета фона в `.product-card` из `.new`.

Но обязательно нужно предусмотреть ситуацию, в которой переменная `--background-color` не была создана в смежных классах и задать значение по умолчанию:

```css
.product-card {
  --_background-color: var(--background-color, #123E66);
  ...
}
```

## Как псевдоприватность может заменить миксины препроцессоров?

Выше описан способ «передачи» кастомных свойств в другие между смежными классами. Это можно сравнить с передачей аргументов функции или, в контексте стилей, миксину препроцессора.

Аналогия с миксинами:

1. Имя миксина — имя атомарного класса.
1. Стили миксина — стили атомарного класса.
1. Аргумент — кастомное свойство, принимаемое псевдоприватным.
1. Внутренняя переменная — псевдоприватное кастомное свойство.

## Решение поставленной задачи

```css
.product-card {
  /* Псевдоприватное кастомное свойство */
  --_background-color: var(--background-color, #123E66);
  /* ---------------------------------- */

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--_background-color);
  box-shadow: 2px 5px 5px 0 hsl(from var(--_background-color) h s calc(l * 0.7));

  font-size: 48px;
  color: hsl(from var(--_background-color) 0 0 calc((50 - l) * 100));

  &.new {
    /* Значение псевдоприватного кастомного свойства */
    --background-color: #2E9AFF;
    /* --------------------------------------------- */
  }
  &.top {
    /* Значение псевдоприватного кастомного свойства */
    --background-color: #F498AD;
    /* --------------------------------------------- */
  }
}
```

<iframe title="Решение с псевдоприватными свойствами" src="demos/pseudo-privates/" height="350"></iframe>
