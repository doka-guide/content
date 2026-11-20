---
title: "`:checked`"
description: "Псевдокласс, который отражает состояние чекбокса или радиокнопки."
baseline:
  - group: input-selectors
    features:
      - css.selectors.checked
authors:
  - solarrust
contributors:
  - skorobaeus
  - starhamster
editors:
  - tachisis
keywords:
  - отмеченный
related:
  - css/pseudoclasses
  - html/option
  - js/deal-with-forms
tags:
  - doka
---

## Кратко

[Псевдокласс](/css/pseudoclasses/), который активируется, когда пользователь отмечает чекбокс или выбирает одну из радиокнопок.

С его помощью удобно стилизовать эти элементы в их активном состоянии.

## Пример

Будем менять цвет фона [`option`](/html/option/), когда он выбран, и заполнять чекбокс или радиокнопку синим, когда они отмечены:

```css
.checkbox:checked + .checkbox-title::after {
  content: '';
  position: absolute;
  left: 6px;
  top: calc(50% - 6px);
  width: 12px;
  height: 12px;
  rotate: 45deg;
  border-radius: 3px;
  background-color: #2E9AFF;
}

.radio:checked + .radio-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: calc(50% - 12px);
  width: 25px;
  height: 25px;
  background: radial-gradient(
    circle,
    #2E9AFF 0%,
    #2E9AFF 40%,
    transparent 50%,
    transparent 100%
  );
}

option:checked {
  background-color: #2E9AFF;
  color: #18191C;
}
```

<iframe title="Стилизация выбранных элементов" src="demos/check/" height="320"></iframe>

## Как пишется

После селектора, который выбирает элемент чекбокса или радиокнопки, ставим двоеточие и пишем ключевое слово `checked`.

## Как понять

Браузер присваивает чекбоксу или радиокнопке псевдокласс `:checked`, когда они отмечены. Мы можем использовать это для стилизации элемента.

## Подсказки

💡 Этот псевдокласс есть только у тех элементов, которые можно _отметить_: `<input type="checkbox">`, `<input type="radio">`.

💡 По задумке должен работать и с [`<option>`](/html/option/), но поскольку выпадающий список сильно отличается от системы к системе и от браузера к браузеру, то пока работает только в браузере Chrome на Windows. Так что ждём и надеемся, но особо не используем.
