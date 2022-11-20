---
title: "`:placeholder-shown`"
authors:
  - ezhkov
editors:
  - tachisis
keywords:
  - форма
  - плейсхолдер
  - валидация
tags:
  - doka
---

## Кратко

Псевдокласс `:placeholder-shown` выбирает на странице все [`<input>`](/html/input/) или [`<textarea>`](/html/textarea/), у которых показывается подсказка (плейсхолдер).

## Пример

```html
<input placeholder="Введите ваше имя">
```

```css
input {
  border: 1px solid black;
}

input:placeholder-shown {
  border-color: teal;
}
```

## Как понять

Если полю ввода задан атрибут `placeholder` с каким-то значением, то внутри поля будет показана текстовая подсказка. Она пропадёт, если пользователь введёт хотя бы один символ. По сути псевдокласс `:placeholder-shown` будет применять стили к пустым полям ввода.

## Как пишется

Двоеточие и ключевое слово `placeholder-shown`.

```css
:placeholder-shown {
  color: teal;
}
```

## Подсказки

💡 Псевдокласс `:placeholder-shown` — это **не то же самое**, что псевдоэлемент [`::placeholder`](/css/placeholder/). Псевдокласс применит стили к самому полю ввода. А стили, применённые к псевдоэлементу [`::placeholder`](/css/placeholder/), изменят внешний вид текста-подсказки, но никак не затронут само поле ввода.
