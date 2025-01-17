---
title: "Псевдоприватные кастомные свойства"
descriptioin: "Удобный способ работать с кастомными свойствами и использовать их как аргументы миксинов у препроцессоров"
authors:
  - alex-andr-19
related:
  - tools/preprocessors
  - css/layer
  - css/cascade
  - css/custom-properties
  - css/var
tags:
  - article
---

Может возникнуть такая ситуация, когда дизайнеры создали классный дизайн для карточки продуктов. Но основной цвет может отличаться в зависимости от типа товара (скидки, популярное, новое и тд).

В классическом варианте мы можем сделать следующим образом.

```html
<section class="product-list">
  <div class="product-list__item product-card">Карточка 1</div>
  <div class="product-list__item product-card new">Карточка 2</div>
  <div class="product-list__item product-card">Карточка 3</div>
  <div class="product-list__item product-card">Карточка 4</div>
  <div class="product-list__item product-card top">Карточка 5</div>
</section>
```

```css
.product-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  .product-list__item {
    width: 100%;
    aspect-ratio: 4/5;
  }
}

.product-card {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #46ad8e;
  border-radius: 12px;
  box-shadow: 2px 5px 5px 1px #398f75;

  font-size: 48px;
  line-height: 58px;
  color: white;

  &.new {
    background-color: #45b9bb;
    box-shadow: 4px 5px 5px 1px #3ba0a2;

    color: black;
  }

  &.top {
    background-color: #ffd700;
    box-shadow: 4px 5px 5px 1px #dcbb02;

    color: black;
  }
}
```

<iframe title="Красивая карточка" src="demos/products-demo/default.html" height="300"></iframe>

Можно увидеть, что основной цвет `#46ad8e`, `#45b9bb`, `#ffd700` влияет на бОльшую часть стилизации карточки: цвет фона, падающей тени и текста.
Каждый раз подбирать нужный цвет тени и определять нужную степень контраста текста будет сложно, особенно когда появится необходимость масштабирования подобного рода типов карточек.

## Возможное решение

Классическим решением такой задачи может стать использование [кастомных свойств](/css/custom-properties/) и CSS-функции. Недостатки такого подхода станут очевидны после его реализации.

```css
:root {
  --card-default: #46ad8e;
  --card-new: #45b9bb;
  --card-top: #ffd700;
}

.product-card {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--card-default);
  border-radius: 12px;
  box-shadow: 2px 5px 5px 1px hsl(from var(--card-default) h s calc(l * 0.8));

  font-size: 48px;
  line-height: 58px;
  color: hsl(from var(--card-default) 0 0 calc((50 - l) * 100));

  &.new {
    background-color: var(--card-new);
    box-shadow: 4px 5px 5px 1px hsl(from var(--card-new) h s calc(l * 0.8));

    color: hsl(from var(--card-new) 0 0 calc((50 - l) * 100));
  }

  &.top {
    background-color: var(--card-top);
    box-shadow: 4px 5px 5px 1px hsl(from var(--card-top) h s calc(l * 0.8));

    color: hsl(from var(--card-top) 0 0 calc((50 - l) * 100));
  }
}
```

При таком подходе объём кода не увеличился, а читаемость стала значительно ниже. Также прямое использование кастомных свойств не дало возможности масштабирования таких классов.
В таком случае очень хочется применить миксины или функции из препроцессоров.

Приносить в проект препроцессоры для решения задачи перекраски карточек не выглядит разумным решением.

## Что такое псевдоприватность?

В языках программирования, которые не имеют в своём движке инкапсуляцию полей и методов внутри экземпляра класса принято использовать псевдоприватность, которая основывается на нейминге.
Например, в `JS'е` и `Python'е` принято писать нижнее подчёркивание перед самим именем поля/метода:
```js
const someObj = {
  publicValue: 42,
  _privateValue: "42"
};
```
Также существует вариант с подчеркиванием в конце имени.

Если разработчик захочет напрямую обратиться к полям с подбным названием, то `TS` будет выбрасывать ошибки.

## Псевдоприватность в CSS

Кастомные свойства CSS наследуются внутрь всех дочерних элементов по умолчанию.

Так же нет возможности инкапсулировать свойство для конкреного класса:
```html
<div class="first second"></div>
```

Все кастомные свойства, которые определены в классе `first`, будут также доступны для чтения и изменения в классе `second`.

В этот момент и возникает необходимость псевдоприватности кастомных свойств.

```html
<div class="product-card new">
  Карточка 1
</div>
```

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

В данном случае мы видим, что в разных классах существуют незвисимые кастомные свойства. В классе `product-card` свойства "закрыты" псевдоприватностью.  
При всём этом цвет тени напрямую зависит от цвета фона в каждом из классов.  
Фактически значение `box-shadow` зависит только от кастомного свойства.

## Взаимодействие кастомных свойств с разной приватностью

Так как `--background-color` в классе `new` не "защищено" псевдоприватностью, можно использовать его в смежных классах. Например в `product-card`.

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

Таким образом мы передали значение цвета фона в `product-card` из `new`.
Но обязательно нужно предохраниться от ситуации, в которой переменная `--background-color` не была создана в смежных классах:

```css
.product-card {
  --_background-color: var(--background-color, #45b9bb);
  ...
}
```

## Как псевдоприватность может заменить миксины препроцессоров?

Выше описан способ "передачи" кастомных свойств в другие между смежными классами.  
Такое можно сравнить с передачей аргументов функции или, в контексте стилей, миксину препроцессора.

Аналогия с миксинами:
1. Имя миксина – имя атомарного класса
2. Стили миксина – стили атомарного класса
3. Аргумент – кастомное свойство, принимаемое псевдоприватным
4. Внутренняя переменная – псевдоприватное кастомное свойство

## Решение посталенной задачи

```css
.product-card {
  /* Псевдоприватное кастомное свойство */
  --_background-color: var(--background-color, #46ad8e);
  /* ---------------------------------- */

  --_darker-color: hsl(from var(--_background-color) h s calc(l * 0.8));
  --_text-color: hsl(from var(--_background-color) 0 0 calc((50 - l) * 100));

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--_background-color);
  border-radius: 12px;
  box-shadow: 2px 5px 5px 0 var(--_darker-color);

  font-size: 48px;
  line-height: 58px;
  color: var(--_text-color);

  &.new {
    /* Значение псевдоприватного кастомного свойства */
    --background-color: #45b9bb;
    /* --------------------------------------------- */
  }
  &.top {
    /* Значение псевдоприватного кастомного свойства */
    --background-color: #ffd700;
    /* --------------------------------------------- */
  }
}
```

<iframe title="Красивая карточка" src="demos/products-demo/" height="300"></iframe>
