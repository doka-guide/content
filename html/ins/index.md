---
title: "`<ins>`"
authors:
  - xpleesid
keywords:
  - добавить
tags:
  - doka
---

## Кратко

Тег `<ins>` используется для отображения добавленного контента. Например, нового пункта в списке дел или новой части кода.

## Как пишется

```html
<h4>Список дел</h4>
<ul>
  <li>Помыть посуду</li>
  <li>Полить цветы</li>
  <li><ins>Погулять с собакой</ins></li>
  <li><ins>Пропылесосить комнату</ins></li>
</ul>
```

<iframe title="Базовый пример" src="demos/basic/" height="200"></iframe>

## Как понять

По умолчанию браузеры применяют к `<ins>` подчёркивание с помощью `text-decoration: underline`. Такого же эффекта можно добиться, используя тег [`<u>`](/html/u/) или просто применив к тексту `text-decoration: underline`. Однако `<ins>` стоит использовать в том случае, когда нужно подчеркнуть, что какой-то контент был добавлен и это важно. Хоть визуально отличий не будет, но это поможет, например, пользователям [скринридеров](/tools/site-readers/#skrinridery).

## Атрибуты

Помимо [глобальных атрибутов](/html/global-attrs) у `<ins>` есть специфические:

- `cite` позволяет сослаться на информацию о правке;
- `datetime` позволяет указать время правки.

Оба атрибута необязательные и помогают уточнить правку.

```html
<h4>Сдача проекта</h4>
<ul>
  <li>
    <del>
      Созвониться с подрядчиком по поводу актов
    </del>
  </li>
  <li>
    <ins cite="https://our-cool-customers.com/reports/upload">
      Выгрузить отчёт в сервис заказчика
    </ins>
  </li>
  <li>
    <ins datetime="2021-12-21T11:00Z">
      Ещё раз позвонить подрядчику и напомнить про акты
    </ins>
  </li>
</ul>
```

Визуально это никак не отобразится — браузеры по умолчанию никак не выводят эти атрибуты. Но мы можем написать небольшой скрипт, который будет проходиться во всем тегам `<ins>` и, если у них есть атрибут `datetime`, выводить форматированную дату рядом.

```js
Array.from(document.querySelectorAll('ins')).forEach(element => {
  if(element.hasAttribute('datetime')){
    const attributeValue = element.getAttribute('datetime')
    const dateFormatted = new Date(attributeValue).toLocaleString()
    element.innerText += ` (${dateFormatted})`
  }
})
```

<iframe title="Атрибуты" src="demos/attributes/" height="200"></iframe>
