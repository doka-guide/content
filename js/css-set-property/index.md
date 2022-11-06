---
title: "Метод setProperty() для установки CSS стилей из JS"
description: "Как задать CSS свойство используя setProperty()"
authors:
  - artem-chumak
related:
  - ""
tags:
  - doka
  - placeholder
---

<!--
1. В description есть описание для соцсетей и поисковиков, не больше 200 символов
2. В authors есть ники авторов основного текста
3. В contributors перечислены ники всех соавторов и тех, кто работал над текстом (дописали «На практике»? Переписали блок? Вам сюда)
4. В keywords записаны ключевые слова для SEO: пишем сюда слова или фразы, которых нет в тексте статьи, но по ним могут искать этот материал
5. Удалены все пустые теги в шапке
6. Подпапка автора есть в папке _people/_
7. Демки лежат в подпапке _demos/_
8. В related добавлено три ссылки на материалы Доки, которые будут предлагаться в конце. Не добавляем следующий или предыдущий материал в разделе
-->

## Кратко
Метод **setProperty()** позволяет задать CSS стили при помощи JavaScript. Может быть применён как к [DOM](/js/dom/) элементу, так и конкретному CSS правилу ([CSS rule](/css/css-rule/)) из таблицы стилей ([Style Sheet](/css/cascade/)).
При этом, в первом случае [специфичность](/css/specificity/) будет как и у атрибута [style](/js/element-style/), т.к. стили будут записаны инлайн. Во втором случае специфичность не изменится.

## Как пишется
У метода есть три параметра. Один из которых обязательный.

- **propertyName**. Название CSS свойства. Является обязательным и записывается в виде строки. Соответствует названиям CSS свойств, т.е. можно писать _“width-max”_ используя дефис не прибегая к записи [camelCase](https://ru.wikipedia.org/wiki/CamelCase).
- **value**. Строка с новым значение свойства. Если параметр не указан, то будет передана пустая строка.
- **priority**. Используется для указания CSS флага [!important](css/important/). Предусмотрено три вида записи: _“important”_, _undefined_, _“”_. По умолчанию передаётся пустая строка.
```JavaScript
setProperty(propertyName, value, priority);
```

## Пример
Рассмотрим случай, когда метод применяется к конкретному CSS правилу.
У нас есть HTML элемент со следующими классами:
```html
<div class="one two" />
```
```css
.one {
  background: blue;
  width: 100px;
  height: 100px;
  transition: background .2s ease-in;
  cursor: pointer;
}

.two {
  background: grey;
}
```
Давайте изменим CSS правило для класса _.two_
```JavaScript
    // div цвет которого будем менять
    const sq = document.querySelector('div');

    // таблица стилей, где будем искать нужно нам правило
    const stylesheet = document.styleSheets[1];

    // находим нужное правило
    const newRule = [...stylesheet.cssRules].find((r) => r.selectorText === ".two");

    // при наведении div будет окрашиваться в новый цвет
    sq.addEventListener('mouseover', () => {
      newRule.style.setProperty('background', 'tomato');
    });

    // когда курсор уходит с элемента, окрашиваем div обратно в серый
    sq.addEventListener('mouseout', () => {
      newRule.style.setProperty('background', 'grey');
    });
```

<iframe title="Как использовать setProperty() для изменения стилей" src="demos/example/" height="200"> </iframe>
