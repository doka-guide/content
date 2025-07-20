---
title: "`background-origin`"
description: "Управляем тем, какую область фоновая картинка будет занимать внутри элемента."
baseline:
  - group: background-origin
    features:
      - css.properties.background-origin
      - css.properties.background-origin.border-box
      - css.properties.background-origin.content-box
      - css.properties.background-origin.padding-box
authors:
  - drakesbot12
keywords:
  - область положения фона
  - отрисовка фона
related:
  - css/box-model
  - css/padding
  - css/border
tags:
  - doka
---

## Кратко

Свойство background-origin определяет, откуда начинается отсчёт фона элемента — от границы (border), внутреннего отступа (padding) или содержимого (content). Это влияет на позиционирование фонового изображения или градиента.

## Пример

```css
.background-origin {
  background-origin: padding-box;
}
```

<iframe title="Пример background-origin" src="demos/basic/" height="300"></iframe>

## Как пишется

Доступные значения:

- `border-box` — фон начинает от внешней границы блока, включая рамку.
- `padding-box` — фон начинается от внутренней границы рамки, то есть с области отступа (значение по умолчанию).
- `content-box` — фон начинается от края содержимого, не затрагивая padding и border.

Можно указать несколько значений, если в свойстве [`background-image`](/css/background-image/) используется несколько изображений. Тогда порядок значений background-origin соответствует порядку фоновых изображений:

```css
.box {
  background-image:
    url("person.jpg"),
    url("main-back.png");
  background-origin: content-box, padding-box;
}
```
В этом примере первое изображение (человек) будет отрисован от края содержимого, а второе — от внутреннего отступа.

<iframe title="Интерактивная демка background-origin" src="demos/practis/" height="620"></iframe>

## Как понять

Когда вы добавляете фоновое изображение, браузер должен знать, **откуда его начинать рисовать**. Именно это определяет `background-origin`.

Важно понимать разницу:

- `background-origin` **не управляет тем, сколько места займет фон** — этим занимается свойство [`background-size`](/css/background-size/).
- Вместо этого оно **указывает точку отсчёта** — откуда именно начать отрисовку изображения внутри элемента.

Эта точка может быть:

- от внешнего края рамки (`border-box`),
- от внутреннего края рамки, то есть края отступа (`padding-box`),
- от края содержимого, исключая padding и border (`content-box`).

Если у элемента есть рамка или отступы, это визуально меняет положение фонового изображения, даже если его размер не меняется.

<aside>🧠 Значение по умолчанию — `padding-box`. Это значит, что если явно не указать `background-origin`, фон начнёт отрисовываться от области отступа.</aside>

## Подсказки

💡 Если у элемента есть заметная рамка и фон должен «пролезать» под неё — используйте `border-box`. Если рамка должна быть отдельно от фона — `padding-box`.
💡 Часто используется в паре с [`background-clip`](/css/background-clip/), чтобы управлять не только начальной точкой фона, но и областью, в которой он отображается.
💡 `background-origin` работает только с фоновыми изображениями и градиентами, а не с цветом фона [(`background-color`)](/css/background-color/).
💡 Если для фона указано `background-attachment: fixed`, то `background-origin` **игнорируется** — фон будет привязан к видимому пространству, а не к элементу.
💡 При использовании сокращённого свойства `background`, если вы не укажете `background-origin`, оно **сбросится к значению по умолчанию** — `padding-box`.
