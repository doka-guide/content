---
title: "`<fieldset>`"
description: "Объединяет элементы формы в группу с общим заголовком."
baseline:
  - group: fieldset
    features:
      - html.elements.fieldset
authors:
  - realetive
contributors:
  - skorobaeus
  - solarrust
editors:
  - tachisis
keywords:
  - группа формы
related:
  - html/form
  - css/border
  - html/disabled
tags:
  - doka
---

## Кратко

Тег `<fieldset>` группирует элементы формы (поля ввода [`<input>`](/html/input/), [`<textarea>`](/html/textarea/), выпадающие списки [`<select>`](/html/select/) и другие) в блок с рамкой. Заголовок группы задаёт тег [`<legend>`](/html/legend/).

## Пример

```html
<form>
  <fieldset>
    <legend>Прозвище Дракса из «Стражей Галактики»?</legend>
    <label>
      <input type="radio" name="answer" value="Exterminator">
      Уничтожитель
    </label>
    <label>
      <input type="radio" name="answer" value="Destroyer">
      Разрушитель
    </label>
    <label>
      <input type="radio" name="answer" value="Accuser">
      Обвинитель
    </label>
    <label>
      <input type="radio" name="answer" value="Sweet-tooth">
      Сладкоежка
    </label>
  </fieldset>
</form>
```

## Как понять

В сложной форме много элементов, и интерфейс легко перегрузить. Чтобы форму было проще понять, связанные по смыслу элементы объединяют в группы.

Группа нужна не только для вида. Для вспомогательных технологий `<fieldset>` — это группа с [ARIA-ролью](/a11y/aria-roles/) `group`. Текст из `<legend>` становится её заголовком. Когда пользователь [скринридера](/a11y/screenreaders/) переходит к полю внутри группы, он слышит и подпись поля, и заголовок группы. Например, у радиокнопок из примера выше без `<legend>` был бы непонятен вопрос.

## Как пишется

Чтобы задать группе заголовок, первым внутри `<fieldset>` поставьте один `<legend>`:

```html
<fieldset>
  <legend>Заголовок для группы</legend>
  …
</fieldset>
```

## Атрибуты

- [`disabled`](/html/disabled/) — блокирует элементы формы **внутри** тега. Исключение — элементы внутри первого `<legend>`: они остаются доступными для ввода.
- `form` — связывает `<fieldset>` с формой по её `id`, даже если он стоит вне формы. Сам `<fieldset>` ничего не добавляет в отправку. Вложенные элементы эту связь не получают: каждому нужен свой атрибут `form`.
- `name` — имя группы, по которому её можно найти в `form.elements`.
- Также для `<fieldset>` доступны все [глобальные атрибуты](/html/global-attrs/).

## Подсказки

💡 Одним атрибутом `disabled` можно заблокировать сразу всю группу, например, пока данные уходят на сервер через [`fetch()`](/js/fetch/):

<iframe title="Блокирование всей формы при помощи disabled" src="demos/disabling/" height="420"></iframe>

Вложенные элементы подходят под [`:disabled`](/css/disabled-enabled/), но атрибута у них нет: `input.disabled` вернёт `false`.

Заблокированные элементы не попадают в отправку, и браузер их не проверяет. Поэтому сначала соберите данные через [`new FormData(form)`](/js/form-data/), а потом блокируйте группу:

```js
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form, event.submitter);
  fieldset.disabled = true;
  try {
    await fetch('/answer', { method: 'POST', body: data });
  } finally {
    fieldset.disabled = false;
  }
});
```

Если фокус стоял на кнопке внутри группы, браузер переносит его на [`<body>`](/html/body/). Скринридер при этом ничего не объявляет. Сообщите об отправке через [`aria-live`](/a11y/aria-live/), а после разблокировки верните фокус на кнопку.

💡 Браузеры рисуют `<fieldset>` почти одинаково. По спецификации HTML у него:

- рамка в [стиле](/css/border-style/) `groove` толщиной два пикселя;
- внутренние отступы;
- `<legend>` в разрыве верхней линии рамки.

Оттенок рамки зависит от браузера и операционной системы. Рамку можно убрать или переделать через [`border`](/css/border/).

💡 По умолчанию `<fieldset>` не становится уже своего содержимого: у него `min-inline-size: min-content`. Поэтому в узком контейнере, например в ячейке сетки, группа может вылезти за край. Снимите это ограничение:

```css
fieldset {
  min-inline-size: 0;
}
```

Теперь сжимается сама группа, а содержимое, которое не переносится на новую строку, вылезает уже за её рамку. Длинным словам поможет [`overflow-wrap: anywhere`](/css/overflow-wrap/). Широкую таблицу оберните в блок с [`overflow-x: auto`](/css/overflow/).
