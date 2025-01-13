---
title: "`list`"
description: "Атрибут для роли списка."
authors:
  - o-maykova
  - tatianafokina
related:
  - a11y/role-listitem
  - html/ul
  - html/ol
tags:
  - doka
---

## Кратко

[Роль структуры документа](/a11y/aria-roles/#roli-struktury-dokumenta) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya) для списков.

Списки состоят из пунктов, в которых перечисляются объекты. Если при перечислении важна последовательность, используют нумерованные списки. Когда порядок не важен, добавьте маркированный список. В нумерованных списках каждый пункт начинается с цифры, в маркированных — с маркера (буллита).

Роль `list` есть у тегов [`<ul>`](/html/ul/) и [`<ol>`](/html/ol/) по умолчанию.

## Пример

```html
<div role="list">
  <span role="listitem">Картошка.</span>
  <span role="listitem">Кружево.</span>
  <span role="listitem">Мышьяк.</span>
</div>
```

Список с атрибутом [`aria-owns`](/a11y/aria-owns/), который связывает список-родитель с пунктами-детьми:

```html
<div role="list" aria-owns="item1 item2 item3">
  <span role="listitem" id="item1">Картошка.</span>
  <span role="listitem" id="item2">Кружево.</span>
  <span role="listitem" id="item3">Мышьяк.</span>
</div>
```

Не обязательно задавать списку `aria-owns`. Скринридеры озвучат оба примера одинаково: «Список из трёх пунктов. Картошка. Кружево. Мышьяк».

## Как пишется

Добавьте к тегу атрибут `role` со значением `list`. Лучше всего задавать роль [`<div>`](/html/div/) или [`<span>`](/html/span/).

В первую очередь используйте для списков `<ul>` и `<ol>`. Роль `list` делает содержимое страницы понятным для [скринридеров](/a11y/screenreaders/) и других вспомогательных технологий, когда не хватает возможностей HTML. Явная роль списка пригодится для кастомных элементов или поддержки старого кода.

Внутри контейнера с ролью `list` должен находиться хотя бы один пункт [`listitem`](/a11y/role-listitem/), иначе скринридеры не засчитают элемент списком.

```html
<div role="list">
  <span role="listitem">Блюда.</span>
</div>
```

Можете вкладывать в кастомные списки `list` другие списки с ролью [`group`](/a11y/role-group/). Вложенные списки должны включать минимум один пункт с ролью `listitem`.

```html
<div role="list">
  <span role="listitem">Блюда:</span>
  <div role="group">
    <span role="listitem">сырники со сметаной;</span>
    <span role="listitem">запеканка;</span>
    <span role="listitem">вареники.</span>
  </div>
</div>
```

Обратите внимание, что ARIA-роль `list` не указывает на тип списка — упорядоченный или неупорядоченный.

```html
<div role="list" class="list">
  <span role="listitem" class="list__item">Повелитель мух</span>
  <span role="listitem" class="list__item">Чума</span>
  <span role="listitem" class="list__item">Процесс</span>
  <span role="listitem" class="list__item">Мамаша Кураж и её дети</span>
</div>
```

<iframe title="Кастомный список по умолчанию" src="demos/list-without-styles/" height="350"></iframe>

Так как `list` не влияет на внешний вид элемента, стилизуйте список и пункты в нём с помощью CSS.

```css
.list {
  display: flex;
  flex-direction: column;
  line-height: 1.5;
}

.list__item {
  position: relative;
  padding-left: 25px;
  text-transform: lowercase;
}

.list__item::before {
  content: "";
  position: absolute;
  top: 13px;
  left: 0;
  width: 14px;
  height: 14px;
  background-color: #10F3AF;
}

.list__item::after {
  content: ";";
}

.list__item:last-of-type::after {
  content: ".";
}
```

<iframe title="Кастомный список со стилями" src="demos/list-with-styles/" height="350"></iframe>

Обычно не рекомендуется явно дублировать роль `list` для `<ul>` и `<ol>`. Единственное исключение — исправление поведения списков в Safari. Браузер сбрасывает роль `list` у `<ul>` и `<ol>` со свойством [`list-style: none`](/css/list-style/), которые не вложены в [`<nav>`](/html/nav/). Это осознанное решение разработчиков движка WebKit.

Если вам _действительно_ важно сохранить семантику списка, задайте элементу `role="list"`:

```html
<!-- Фолбэк для Safari -->
<ul role="list">
  <li>Свобода.</li>
  <li>Равенство.</li>
  <li>Братство.</li>
</ul>
```
