---
title: "`:active`"
description: "Один из псевдоклассов, показывающих, что интерфейс откликается на действия пользователя"
baseline:
  - group: user-action-pseudos
    features:
      - css.selectors.active
authors:
  - solarrust
contributors:
  - skorobaeus
editors:
  - tachisis
keywords:
  - LVFHA
  - активное состояние
related:
  - css/hover
  - css/visited
  - css/transition
tags:
  - doka
---

## Кратко

Псевдокласс `:active` позволяет задать стили для элемента, с которым происходит взаимодействие прямо сейчас. Например, можно задать кнопке стиль, который будет виден в тот краткий миг, когда на кнопке зажата клавиша мыши.

<video controls muted width="700">
  <source src="video/mouse-active.mp4" type="video/mp4">
  <source src="video/mouse-active_safari.mp4" type="video/mp4">
</video>

## Пример

Сделаем объёмную кнопку, у которой будет меняться цвет фона и текста в _активной фазе_.

```css
button {
  padding: 2.5rem;
  border: 0;
  border-radius: 2.5rem;
  font-size: 2.5rem;
  background-color: #bada55;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

button:active {
  color: white;
  background-color: purple;
}
```

## Как пишется

К любому селектору добавляем двоеточие и ключевое слово `active`.

### Селектор по тегу в состоянии `:active`

```css
a:active {
  /* Стили */
}
```

### Селектор по классу в состоянии `:active`

```css
.link:active {
  /* Стили */
}
```

### Составной селектор в состоянии `:active`

```css
li .link:active {
  /* Стили */
}
```

### Селектор по id в состоянии `:active`

```css
#id:active {
  /* Стили */
}
```

### Селектор по классу и его псевдоэлемент в состоянии `:active`

```css
.link::before:active {
  /* Стили */
}
```

## Как понять

В момент нажатия на элемент при помощи кнопки мыши или клавиши клавиатуры этому самому элементу присваивается виртуальный класс `:active`, который можно стилизовать. За присвоение этого класса отвечает движок браузера, нам о самом процессе присвоения думать не нужно.

## Подсказки

💡 Смену стилей между состояниями можно анимировать при помощи [`transition`](/css/transition/) 🎉

💡 Часто, если дизайнер не позаботился об отрисовке состояния `:active` для кнопок, можно задать стили сразу и для наведения курсора и для активного состояния:

```css
button:hover,
button:active {
  /* Стили */
}
```
