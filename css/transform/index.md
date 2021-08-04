---
title: "transform"
authors:
  - ezhkov
contributors:
  - skorobaeus
keywords:
  - трансформация
tags:
  - doka
---

## Кратко

Свойство `transform` используем, когда нам нужно применить к элементу какие-либо трансформации: искажение, поворот, смещение, масштабирование.

## Пример

Смещаем визуальное представление элемента на 120 пикселей вправо:

```css
.selector {
  transform: translateX(120px);
}
```

## Как пишется

Ключевые слова:

```css
.selector {
  transform: none;
}
```

Функции в качестве значения:

```css
.selector {
  transform: matrix(1, 2, 3, 4, 5, 6);
  transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  transform: perspective(100px);
  transform: rotate(0.25turn);
  transform: rotate3d(1, 2, 3, 10deg);
  transform: rotateX(10deg);
  transform: rotateY(1.55rad);
  transform: rotateZ(10deg);
  transform: translate(12px, 50%);
  transform: translate3d(12px, 50%, 3em);
  transform: translateX(2em);
  transform: translateY(3in);
  transform: translateZ(2px);
  transform: scale(2, 0.5);
  transform: scale3d(2.5, 1.2, 0.3);
  transform: scaleX(2);
  transform: scaleY(0.5);
  transform: scaleZ(0.3);
  transform: skew(90deg, 120deg);
  transform: skewX(10deg);
  transform: skewY(0.7rad);
}
```

Несколько значений:

```css
.selector {
  transform: translateX(10px) rotate(10deg) translateY(5px);
  transform: perspective(500px) translate(10px, 0, 20px) rotateY(3deg);
}
```

Глобальные значения:

```css
.selector {
  transform: inherit;
  transform: initial;
  transform: unset;
}
```

## Как это понять

Часто бывает необходимо каким-то образом трансформировать визуальное представление элемента (масштабировать, повернуть, переместить) и при этом никак не затронуть соседние элементы в документе. Для подобных преобразований используется свойство `transform`. В качестве значения выступают различные функции трансформации: `rotate`, `translate`, `scale`, `skew`.

<iframe title="Песочница Transform" src="demos/playground.html"></iframe>

Стоит обратить особое внимание на тот факт, что трансформируемый элемент при трансформациях никак не взаимодействует с соседними элементами. Он как бы «приподнимается» над остальным содержимым. При этом он не уходит из потока документа, и остальные элементы располагаются так, как располагались до применения трансформаций.

## Подсказки

💡 Трансформировать можно только трансформируемые элементы. Звучит как «масло масляное», но на странице существуют определённые типы элементов, к которым не применима стандартная блочная модель. Нельзя трансформировать инлайновые и табличные элементы.

💡 Если среди значений есть функция `perspective()`, то она должна быть первой среди всех значений:

```css
/* Неправильно */
.selector {
  transform: translate(10px, 0, 20px) rotateY(3deg) perspective(500px);
}

/* Правильно */
.selector {
  transform: perspective(500px) translate(10px, 0, 20px) rotateY(3deg);
}
```

💡 Можно применять трансформации сразу к нескольким осям, используя сокращённые функции:

```css
.selector {
  transform: translateX(10px) translateY(0) translateZ(20px);
}

/* Можно собрать в кучку: */
.selector {
  transform: translate(10px, 0, 20px);
}
```

💡 Если свойство `transform` имеет значение, отличное от `none`, то создаётся новый контекст наложения. Это означает, что относительно этого элемента теперь будут позиционироваться все дочерние элементы, у которых `position: fixed` или `position: absolute`.

💡 Чтобы трансформации вдоль оси Z работали и выглядели максимально естественно, трансформируемый элемент должен лежать в родителе, которому задано свойство `perspective`:

```css
.parent {
  perspective: 500px;
}

.child {
  transform: translateZ(100px) rotateX(25deg);
}
```
