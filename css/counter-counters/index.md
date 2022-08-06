---
title: "`counter()`, `counters()`"
description: "Функции для возвращения текущего значения счётчика."
authors:
  - blueingreen68
tags:
  - doka
---

## Кратко

Сами по себе счётчики не имею видимого эффекта, но их значения можно использовать с помощью функций `counter()` и `counters()`.

## Пример

### `counter()`

В следующем примере показано простое использование функции `counter()`:

```html
<section class="table-of-contents">
  <h1 class="title">Оглавление</h1>
  <h2 class="chapter">HTML и CSS</h2>
  <h2 class="chapter">Создание стилей и таблиц стилей</h2>
  <h2 class="chapter">Селекторы: выбор форматируемых элементов</h2>
  <h2 class="chapter">Механизм наследования стилей</h2>
  <h2 class="chapter">Управление сложной структурой стилей: каскад</h2>
  <h2 class="chapter">Поля, отступы, границы</h2>
</section>
```

Создаём счётчик с именем `chapter` на элементе [`<section>`](/html/section/) с начальным значением 0:

```css
.table-of-contents {
  counter-reset: chapter 0;
}
```

Устанавливаем увеличение значения счётчика `сhapter`, использовав свойство [`counter-increment`](/css/counter-increment). Далее подставляем значение счётчика `chapter` через функцию `counter()`:

```css
.chapter {
  counter-increment: chapter 1;
}
.chapter::before {
  content: "Глава "counter(chapter) ": ";
}
``` 

<iframe title="Демонстрация свойства" src="demos/counter-func-example" height="475"></iframe>

### `counters()`

Функция `counters()` прекрасно подходит для нумерации вложенных друг в друга списков.

Например, пронумеруем навигационную панель данной статьи, которая находится слева при помощи функции `counters()`:

```html
<ul class="table-of-contents">
  <li class="paragraph"><a href="#kratko">Кратко</a></li>
  <li class="paragraph"><a href="#primer">Пример</a>
    <ul class="table-of-contents">
      <li class="paragraph"><a href="#counter">counter()</a></li>
      <li class="paragraph"><a href="#counters">counters()</a></li>
    </ul>
  </li>
  <li class="paragraph"><a href="#kak-ponyat">Как понять</a></li>
  <li class="paragraph"><a href="#kak-pishetsya">Как пишется</a></li>
  <li class="paragraph"><a href="#argumenty">Аргументы</a></li>
</ul>
```

Создаём счётчик с именем `paragraph` на элементе [`ul`](/html/ul) с начальным значением 0:

```css
.table-of-contents {
  counter-reset: paragraph 0;
}
```

Устанавливаем увеличение значения счётчика `paragraph`, использовав свойство `counter-increment`. Далее подставляем значение счётчика `paragraph` через функцию `counters()`:

```css
.paragraph {
  counter-increment: paragraph 1;
}
.paragraph::marker {
  content: counters(paragraph, '.');
}
```

<iframe title="Демонстрация свойства" src="demos/counters-func-example" height="475"></iframe>

## Как понять 

Функции `counter()` и `counters()` служат для того, чтобы возвращать текущее значение счётчика. Передавая функции аргумент в виде имени счётчика вернётся значение этого счётчика.

Подробнее об различиях функций `counter()` и `counters()` написано в статье [«CSS-счётчики»](/css/css-counters).

Но если вкратце, функция `counter()` возвращает значение самого последнего счётчика с указанным именем в наборе всех CSS счётчиков, которые унаследовал элемент.

Функция `counters()` в свою очередь возвращает значения всех счётчиков в наборе CSS счётчиков с указанным именем, которые унаследовал элемент.

## Как пишется

Функции `counter()` и `counters()` обычно используются в связке с [псевдоэлементами](/css/pseudoelements) и свойством [`content`](/css/content). 

Чтобы подставить значение счётчика на место псевдоэлемента нужно указать функцию `counter()` или `counters()` в качестве значения свойства `content` и передать ей аргумент - имя счётчика, в примере ниже это будет счётчик `chapterNum`:

```css
li::marker {
  content: counters(chapterNum, '.');
}
h2::before {
  content: counter(chapterNum);
}
```

Если используется функция `counters()` важно указать вторым аргументом разделитель в виде строки, которая будет разделять значения всех счётчиков с указанным именем.

## Аргументы

Создавать новые счётчики может не только свойство [`counter-reset`](/css/counter-reset/). Представим такую ситуацию, что вы применили только функцию `counter()` или `counters()` и указали в качестве аргумента имя несуществующего счётчика.

```css
h2::before {
  content: counter(new);
}
```

В таком случае создастся новый счётчик с именем `new` и начальным значением 0. После создания счётчика, функция `counter()` или `counters()` начинает действовать как обычно.

Имена счётчиков чувствительны к регистру, например значения: `example` и `EXAMPLE` — это два разных, не связанных между собой счётчика.

Нельзя использовать ключевые слова: `none`, `initial`, `inherit`, `unset`, `default` в качестве названий счётчиков.

В обоих функциях есть два необязательных аргумента, которые указывают стиль счётчика, например, вместо использования десятичной системы счисления - данное значение устанавливается по умолчанию, можно указать заглавную римскую нумерация, то есть тип `upper-roman`:

```css
.paragraph::marker {
  content: counters(paragraph, '.', upper-roman);
}
.chapter::before {
  content: "Глава "counter(chapter, upper-roman) ": ";
}
```

<iframe title="Демонстрация свойства" src="demos/counters-func-upper-roman-example" height="475"></iframe>

<iframe title="Демонстрация свойства" src="demos/counter-func-upper-roman-example" height="475"></iframe>

Более подробно о других значениях можно посмотреть в доке по свойству [`list-style-type`](/css/list-style-type).