---
title: "`:checked`"
description: "Псевдокласс, который отражает состояние чекбокса, радиокнопки или пункта списка."
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
  - выбранный
  - чекбокс
  - радиокнопка
related:
  - css/pseudoclasses
  - html/option
  - js/deal-with-forms
tags:
  - doka
---

## Кратко

[Псевдокласс](/css/pseudoclasses/), который срабатывает, когда пользователь отмечает чекбокс или радиокнопку, а также когда выбирает пункт списка.

С его помощью удобно стилизовать эти элементы в отмеченном или выбранном состоянии.

## Пример

Поменяем цвет фона [`option`](/html/option/), когда он выбран, и зальём синим чекбокс или радиокнопку, когда они отмечены. В коде — правила с `:checked` и включение настраиваемого списка, а остальные стили — в демке:

```css
.checkbox:checked + .checkbox-title::after {
  content: "";
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

select,
::picker(select) {
  appearance: base-select;
}

option:checked {
  background-color: #2E9AFF;
  color: #18191C;
}
```

Чтобы цвет выбранного пункта было видно в выпадающем списке, мы включили настраиваемый [`<select>`](/html/select/). Подробнее о нём — в подсказках.

<iframe title="Стилизация выбранных элементов" src="demos/check/" height="320"></iframe>

## Как пишется

После селектора, который выбирает чекбокс, радиокнопку или пункт списка, ставим двоеточие и пишем ключевое слово `checked`.

## Как понять

Браузер присваивает чекбоксу или радиокнопке псевдокласс `:checked`, когда их отмечают, а пункту `<option>` — когда его выбирают. Снимут отметку или выберут другой пункт — псевдокласс пропадёт.

## Подсказки

💡 Этот псевдокласс есть только у тех элементов, которые можно _отметить_ или _выбрать_: [`<input>`](/html/input/) с типами `checkbox` и `radio` и `<option>`.

💡 `:checked` отражает текущее состояние элемента, а не HTML-атрибут. Селектор [по атрибуту](/css/attribute-selector/) `[checked]` найдёт чекбокс, который отмечен в разметке, даже когда пользователь снимет с него отметку. Отмеченные по умолчанию элементы ищет псевдокласс [`:default`](/css/default/).

💡 С `<option>` псевдокласс работает во всех браузерах. А вот оформить выбранный пункт в обычном выпадающем списке выйдет не везде. Firefox с версии 56 не показывает в нём стили `option:checked`. На macOS и iOS список рисует сама система, и стили выбранного пункта там тоже не работают.

Выход — настраиваемый `<select>`. Задайте [`appearance: base-select`](/css/appearance/) списку и его псевдоэлементу `::picker(select)`. Тогда пункты можно оформлять как обычные элементы. Так умеют Chrome и Edge с версии 135 и Safari с версии 27. В Firefox настраиваемый список пока включается только в экспериментальных настройках браузера. В браузерах без поддержки останется обычный список.
