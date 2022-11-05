---
title: "`border-collapse`"
description: "Задаёт поведение границ таблицы и её ячеек."
authors:
  - starhamster
keywords:
  - схлопывание границ
  - рамки таблицы
related:
  - css/border-spacing
  - html/tables
  - css/border-style
tags:
  - doka
---

## Кратко

Свойство `border-collapse` управляет отображением границ таблицы и её ячеек.

## Пример

```css
.separate {
  border-collapse: separate;
}

.collapse {
  border-collapse: collapse;
}
```

<iframe title="Сравнение значений свойства border-collapse" src="demos/all/" height="710"></iframe>

## Как пишется

В качестве значения для свойства `border-collapse` используются следующие ключевые слова:

- `separate` — границы отображаются отдельно друг от друга. Это значение по умолчанию.
- `collapse` — соседние границы отображаются как одна граница.

## Как понять

По умолчанию, границы в таблице отображаются отдельно друг от друга. Это значит, что если у неё или её ячеек есть границы, то между ними будет пространство (размерами которого можно управлять с помощью [`border-spacing`](/css/border-spacing/)). Если задать свойству `border-collapse` значение `collapse`, то все смежные границы будут отображаться как одна.
