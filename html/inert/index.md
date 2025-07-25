---
title: "Атрибут `inert`"
description: "Элемент бездельничает? Не беда, ведь есть inert."
baseline:
  - group: inert
    features:
      html.global_attributes.inert
authors:
  - tatianafokina
contributors:
  - skorobaeus
keywords:
  - неактивный компонент
  - модалка
  - диалог
related:
  - html/dialog
  - html/disabled
  - html/global-attrs
tags:
  - doka
---

## Кратко

Глобальный атрибут, который делает элемент недоступными для браузеров и вспомогательных технологий. Слово `inert` можно перевести буквально как «инертный». То есть, элемент, который бездействует или ничего не делает 😴

## Пример

```html
<p>Данные загружаются…</p>
<form inert>
  <fieldset>
    <legend>Срок действия лицензии</legend>
    <label for="start">Дата начала</label>
    <input type="date" id="start">
    <label for="end">Дата окончания</label>
    <input type="date" id="end">
    <button>Применить</button>
  </fieldset>
</form>
```

## Как пишется

Добавьте к любому тегу `inert`. Это булевый атрибут, так что у него нет значений.

`inert` удаляет элемент из порядка навигации и из [дерева доступности](/a11y/a11y-tree/). Это значит, что на него нельзя кликнуть, сделать фокус, ввести данные и найти через поиск по странице. [Скринридеры](/a11y/screenreaders/) не зачитывают содержимое таких элементов и не объявляют роли. Это напоминает поведение другого [глобального атрибута `disabled`](/html/disabled/), но между ними есть разница, — `inert` можно задать любому тегу или их группе.

У `inert` по умолчанию нет стилей. Однако текст внутри блока или элемента с `inert` нельзя выделить, а в случае `disabled` можно. Если у кнопки есть кастомные стили при наведении и фокусе, то кнопка с `inert` их проигнорирует без дополнительных усилий в отличие от `disabled`.

<iframe title="Сравнение disabled и inert" src="demos/inert-vs-disabled/" height="370"></iframe>

Хотя `inert` можно использовать для всех тегов, для одиночных кнопок и других интерактивных элементов лучше задавать `disabled`. Случаи, в которых используют `inert`:

- сделать временно неактивной область с подгружающимися элементами;
- убрать содержимое страницы из порядка навигации, когда открыто модальное окно.

Учитывайте, что для области с важными элементами лучше не использовать `inert`. К примеру, делать неактивной часть формы, пока не заполнена другая.

Не забывайте стилизовать элементы с `inert`, когда это важно. Например, временно неактивная кнопка или поле. Если пропустите этот шаг, пользователям будет сложно найти визуальные отличия между активными и «инертными» элементами. При этом в случае модального окна стоит стилизовать `::backdrop`, а `inert` не трогать.

```css
[inert], [inert] * {
  opacity: 0.7;
  pointer-events: none;
  cursor: default;
  user-select: none;
}
```

<iframe title="Стилизованная область с inert" src="demos/styled-inert-area/" height="300"></iframe>

## Подсказки

💡 Когда используете метод `.showModal()` для показа [`<dialog>`](/html/dialog/), браузеры добавят `inert` к остальному содержимому сами.
