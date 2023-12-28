---
title: "`<sup>`"
description: "Выводит надстрочный текст."
authors:
  - xpleesid
contributors:
  - tatianafokina
  - skorobaeus
keywords:
  - надстрочный
  - индекс
  - семантика
  - screen reader
  - ридер
related:
  - a11y/role-superscript
  - css/tag-selector
  - html/var
tags:
  - doka
---

## Кратко

Тег `<sup>` позволяет выводить надстрочный текст, например, в математических уравнениях: c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup>.

## Пример

Чаще всего `<sup>` используется для вывода степеней в математических формулах.

```html
<p>
  Теорема Пифагора — одна из
  основополагающих теорем евклидовой
  геометрии c<sup>2</sup> =
  a<sup>2</sup> + b<sup>2</sup>.
</p>
```

<iframe title="Теорема пифагора" src="demos/basic/" height="400"></iframe>

## Как пишется

Помимо описанного выше примера, можно использовать тег `<sup>` внутри тега [`<var>`](/html/var/).

```html
<p>
  Квадрат суммы может быть вычислен как сумма
  квадратов слагаемых и их удвоенное произведение:
  <var>(a + b)<sup>2</sup> = a<sup>2</sup> + 2 × a × b + b<sup>2</sup></var>
</p>
```

```css
var {
  font-style: normal;
}
```

<iframe title="Пример с математической формулой" src="demos/variables/" height="400"></iframe>

Теги `<sup>` можно вкладывать друг в друга, тогда на каждом шаге текст будет подниматься вверх, а его размер будет уменьшаться.

```html
<p>
  Первый уровень
  <sup>второй уровень
    <sup>третий уровень
      <sup>четвёртый уровень</sup>
    </sup>
  </sup>
</p>
```

<iframe title="Пример с математической формулой" src="demos/nested/" height="470"></iframe>

Также `<sup>` можно комбинировать с тегом [`<sub>`](/html/sub/) для построения сложных формул.

```html
<p>
  <var>
    X
    <sup>
      2 × log<sub>3</sub>(Z<sup>2</sup>)
    </sup>
  </var>
</p>
```

<iframe title="Пример с тегом sub" src="demos/sub/" height="300"></iframe>

### Доступность

У `<sup>` есть роль [`superscript`](/a11y/role-superscript/). [Скринридеры](/a11y/screenreaders/) пока не сообщают об этой роли и не выделяют содержимое тега интонацией, но это добавляет семантический вес и приносит потенциальную пользу для доступности.
