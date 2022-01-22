---
title: "`caret-color`"
description: "Свойство CSS сaret-color устанавливает цвет курсора вставки, видимого маркера, в который будет вставлен следующий введенный символ."
authors:
  - mishamad
tags:
  - doka
---

## Кратко

Свойство `caret-color` задаёт цвет текстового курсора в полях ввода, например, [`<input>`](/html/input/) или [`<textarea>`](/html/textarea/).

## Как пишется

Значением для `caret-color` может быть любое поддерживаемое `CSS` [обозначение цвета](/css/web-colors/). Кроме того доступны ключевые слова:
- `auto` — значение по умолчанию, пользовательский агент выбирает подходящий цвет для каретки. Обычно это `currentcolor`, но пользовательский агент может выбрать другой цвет, чтобы обеспечить хорошую видимость и контраст с окружающим содержимым, принимая во внимание значение currentcolor, фон, тени и другие факторы.
- `transparent` — можно использовать везде, где допустимо значение цвета. Это позволяет вам сделать элементы прозрачными, чтобы любой фоновый элемент был виден.
- `currentcolor` — соответствует значению свойства `color` для текущего элемента. Это позволяет использовать значение цвета для свойств, которые не получают его по умолчанию.

## Пример

<iframe title="Как красить каретку" src="demos/paint-the-caret" height="330"></iframe>

## Как понять

Простое CSS-свойство, служащее единственной цели — кастомизации цвета для текстового курсора в полях ввода.
Текстовый курсор — это видимый маркера, в который будет вставлен следующий введенный символ.
Свойство является наследуемым, поэтому его можно указать глобально или для формы, и не указывать каждому полю ввода.

## Ещё пример

В данном примере мы создадим форму с несколькими полями ввода, для формы зададим оранжевый цвет каретки, [`<input>`](/html/input/) будет наследовать свойство от формы,
для [`<textarea>`](/html/textarea/) переопределим его на синий, а для параграфа с атрибутом [`contenteditable`](/html/global-attrs/) зададим зелёный цвет каретки:

```html
<form>
  <input type="text">
  <textarea cols="30" rows="10"/>
</form>

<p contenteditable>Зелёная каретка</p>
```

```css
form {
  caret-color: #ff8630;
}

form textarea {
  caret-color: #0d47a1;
}

form p {
  caret-color: #00DD00;
}
```

<iframe title="Как красить каретку, второй пример" src="demos/second-example" height="330"></iframe>

## И ещё пример

Добавим немного радуги в наш [`<input>`](/html/input/)

```html
<input type="text"/>
```

```css
@keyframes rainbow {
  0% { caret-color: red; }
  20% { caret-color: orange; }
  40% { caret-color: yellow; }
  60% { caret-color: green; }
  80% { caret-color: blue; }
  100% { caret-color: purple; }
}

 input {
  display: block;
  width: 60vw;
  height: 50px;
  font-family: "Open Sans", sans-serif;
  font-size: 50px;
  caret-color: red;
  background: rgba(255,255,255,.1);
  color: #eee;
  border-radius: 1rem;
  border: 2px dotted rgba(255,255,255,.1);
}

input:focus {
  animation: 3s infinite rainbow;
}
```

<iframe title="Как красить каретку, второй пример" src="demos/rainbow-input" height="330"></iframe>
