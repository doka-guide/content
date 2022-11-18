---
title: ".setProperty()"
description: "Как задать CSS свойство используя setProperty()"
authors:
  - artem-chumak

tags:
  - doka
  - placeholder
---



## Кратко
Метод **setProperty()** позволяет установить стиль при помощи JavaScript. Может быть применён как к [DOM-элементу](/js/dom/), так и конкретному [CSS правилу](/css/css-rule/).

В первом случае [специфичность](/css/specificity/) будет как и у атрибута [style](/js/element-style/), т.к. стили будут записаны инлайн. Во втором случае специфичность не изменится.

## Как пишется
Метод `setProperty()` может принимать три параметра:

**propertyName**. Обязательная строка с названием CSS-свойства. Должна совпадать с названием свойства, например `max-width`.

**value**. Строка с новым значением свойства. Если параметр не указан, то будет передана пустая строка.

**priority**. При помощи этого параметра можно установить новому значению самый высокий приоритет [!important](/css/important/). Для этого передайте сюда строку `"important"`

```js
setProperty(propertyName, value, priority);
```

## Пример
Рассмотрим случай, когда метод применяется к конкретному CSS правилу.
У нас есть HTML-элемент со следующими классами:
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
