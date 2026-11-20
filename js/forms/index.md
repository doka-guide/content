---
title: "`.forms`"
description: "Возвращает живую коллекцию всех форм, которые есть на странице."
baseline:
  - group: dom
    features:
      - api.Document.forms
authors:
  - vchychuzhko
editors:
  - tachisis
keywords:
  - document
  - forms
  - форма
related:
  - js/deal-with-forms
  - html/form
  - tools/api
tags:
  - doka
---

## Кратко

`forms` — это поле объекта `document`. Оно хранит коллекцию всех элементов [`<form>`](/html/form/), которые есть на текущей странице.

Коллекция доступна только для чтения.

## Как пишется

Вызывается обращением к свойству объекта `document`. Так можно получить коллекцию всех форм:

```js
const collection = document.forms
```

## Как пользоваться

Для примера создадим три формы на одной странице: форму для применения промокода, форму с полем для подписки на рассылку, и форму авторизации с помощью номера телефона.

```html
<form>
  <label for="promocode">Промокод</label>
  <input
    id="promocode"
    type="text" name="promocode"
    placeholder="WIN-1234"
    required
  >
  <button type="submit">Применить</button>
</form>
...
<form id="subscriptionFormId">
  <label for="email">Почта</label>
  <input
    id="email"
    type="email"
    name="email"
    placeholder="email@example.com"
    required
  >
  <button type="submit">Подписаться</button>
</form>
...
<form id="loginFormId" name="loginFormName">
  <label for="phone">Ваш номер</label>
  <input
    id="phone"
    type="tel"
    name="phone"
    placeholder="776-2323"
    required
  >
  <button type="submit">
    Отправить код подтверждения
  </button>
</form>
```

При обращении к свойству `forms` мы получим живую коллекцию [HTMLCollection](/js/htmlcollection-and-nodelist/), которая очень напоминает массив, но позволяет также обращаться к элементам по их имени или идентификатору.

Формы, у которых указаны атрибуты [`id`](/html/global-attrs/#id) или [`name`](/html/input/#prochie-atributy), можно получить по значениям этих атрибутов. В остальных случаях получить форму можно по индексу, который совпадает с порядком описания форм на странице.

### Доступ к формам

Первая форма в примере выше не имеет атрибутов. Единственный способ обращения к ней — через её индекс в коллекции:

```js
document.forms[0]
```

У второй формы задан атрибут `id`, а значит, обращаться можно и по значению атрибута, и по индексу:

```js
document.forms['subscriptionFormId']
document.forms.subscriptionFormId
document.forms[1]
```

Третья форма содержит как атрибут `id`, так и `name`. У нас появляется возможность получить форму ещё и по имени, указанному в атрибуте `name`:

```js
// По имени
document.forms['loginFormName']
document.forms.loginFormName

// По id
document.forms['loginFormId']
document.forms.loginFormId

// По индексу
document.forms[2]
```

Атрибуты имени и идентификатора не конфликтуют, позволяя обращаться к форме и так, и так.

В случае, если элементов `<form>` на странице нет, коллекция будет доступной, но пустой. Её длина будет равна нулю.

<aside>

💡 По аналогии со свойством [`length`](/js/array-length/) у массивов, можно получить общее количество форм на странице, запросив значение длины коллекции:

```js
document.forms.length
```

</aside>

### Взаимодействие с полями

Элементы коллекции `document.forms` имеют тип `HTMLFormElement` и фактически являются ссылками на соответствующие элементы форм на странице.

Например, чтобы получить номер телефона в форме логина, мы напишем:

```js
const phone = document.forms.loginFormName.phone.value
```

Выключим кнопку отправки для промокода:

```js
document.forms[0].querySelector('[type="submit"]').disabled = true
```

Или даже вызовем интерактивную валидацию формы подписки:

```js
document.forms.subscriptionFormId.reportValidity()
```

Другими словами, работа с формой и её полями в этом случае ничем не отличается от взаимодействия с [DOM-элементом](/js/element/) формы, запрошенным по селектору.

Читайте подробнее об этом в статье «[Работа с формами](/js/deal-with-forms/#sobiraem-dannye-iz-formy)».

## Как понять

Все элементы `<form>` на странице отслеживаются браузером в реальном времени и доступны в специальном поле объекта `document`. В любой момент, из любого нашего скрипта, независимо от контекста.

Благодаря этому мы получаем ещё один вариант взаимодействия с формами в обход использования любых селекторов.

Так как свойство `forms` возвращает коллекцию, то можно пройтись по всем формам циклом. Это может быть полезно для глобальных операций на странице. Например, для сбора аналитики или отключения отправки форм из-за потери связи с сервером.

Ещё один плюсик в копилку использования тега `<form>` 🙂
