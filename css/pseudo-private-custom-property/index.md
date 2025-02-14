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

В языках программирования, которые не имеют в своём движке инкапсуляцию полей и методов, принято использовать псевдоприватность, которая основывается на нейминге.

Например, в JavaScript и Python принято писать нижнее подчёркивание перед самим именем поля или метода:

```js
const someObj = {
  publicValue: 42,
  _privateValue: "42"
}
```

Также существует вариант с подчеркиванием в конце имени.

Если разработчик захочет напрямую обратиться к полям с подобным названием, то TypeScript будет выбрасывать ошибки.

## Псевдоприватность в CSS

Кастомные свойства CSS наследуются внутрь всех дочерних элементов по умолчанию.

Также нет возможности инкапсулировать свойство для конкретного класса:

```html
<div class="first second"></div>
```

Все кастомные свойства, которые определены в классе `first`, будут также доступны для чтения и изменения в классе `second` и наоборот.

В этот момент и возникает необходимость **псевдоприватности кастомных свойств**.

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

Здесь цвет фона блока, не будет изменён из класса `second`, а останется таким, каким его определил `first`.

### Применение
Создание квадратного блока
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

Ограничение количества изображаемых строк
```html
<p class="description clamp-text-lines">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi odio minima ullam asperiores molestias. Ullam eaque repudiandae fugit, vitae, ipsum veritatis, in eligendi autem iste non eveniet optio fuga doloremque dicta dolorum!
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
```

Перечисленые "утилитарные" классы можно расположить в одном файле `utils.css` и сразу подключить к `index.html`. Так что просто применив класс к DOM-элементу, мы получаем ожидаемое поведение, которое каждый раз прописывать руками было бы неприятно.

### Применение псевдоприватности даёт:
1. Изоляцию стилей на уровне CSS, без эксперементальных технологий
1. Гибкость в использовании
1. Возможность переписать миксины препроцессоров на нативный CSS

## Реальная задача

Может возникнуть такая ситуация, когда дизайнеры создали классный дизайн для карточки продуктов. Но основной цвет может отличаться в зависимости от типа товара (скидки, популярное, новое и так далее).

В классическом варианте можно добавить уникальные классы каждой карточке:

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

Каждый раз подбирать нужный цвет тени и определять нужную степень контраста текста будет сложно, особенно когда появится необходимость расширить набор карточек подобного рода.

## Возможное решение

Классическим решением такой задачи может стать использование [кастомных свойств](/css/custom-properties/) и CSS-функции. Недостатки такого подхода станут очевидны после его реализации.

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

При таком подходе объём кода увеличился и читаемость стала значительно ниже. Также прямое использование кастомных свойств не дало возможности увеличить количество классов.

В таком случае очень хочется применить миксины или функции из препроцессоров.

Приносить в проект препроцессоры для решения задачи перекраски карточек не выглядит как разумное решение.



```css
.product-card {
  --_background-color: #46ad8e;
  --_border-radius: 12px;

  background-color: var(--_background-color);
  border-radius: var(--_border-radius);
  box-shadow: 4px 5px 5px 1px hsl(from var(--_background-color) h s calc(l * 0.8));
}

.new {
  --background-color: #45b9bb;

  box-shadow: 4px 5px 5px 1px hsl(from var(--background-color) h s calc(l * 0.8));
}
```

В данном случае мы видим, что в разных классах существуют незвисимые кастомные свойства. В классе `product-card` свойства «закрыты» псевдоприватностью.

При всём этом цвет тени напрямую зависит от цвета фона в каждом из классов.

Фактически значение [`box-shadow`](/css/box-shadow/) зависит только от кастомного свойства.

## Взаимодействие кастомных свойств с разной приватностью

Так как `--background-color` в классе `new` не «защищено» псевдоприватностью, можно использовать его в смежных классах. Например, в `.product-card`.

```css
.product-card {
  --_background-color: var(--background-color);
  --_border-radius: 12px;

  background-color: var(--_background-color);
  border-radius: var(--_border-radius);
  box-shadow: 4px 5px 5px 1px hsl(from var(--_background-color) h s calc(l * 0.8));
}

.new {
  --background-color: #45b9bb;
}
```

Таким образом мы передали значение цвета фона в `.product-card` из `.new`.

Но обязательно нужно предохраниться от ситуации, в которой переменная `--background-color` не была создана в смежных классах:

```css
.product-card {
  --_background-color: var(--background-color, #45b9bb);
  ...
}
```

## Как псевдоприватность может заменить миксины препроцессоров?

Выше описан способ «передачи» кастомных свойств в другие между смежными классами.

Такое можно сравнить с передачей аргументов функции или, в контексте стилей, миксину препроцессора.

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
