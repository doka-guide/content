---
title: "`<datalist>`"
authors:
  - doka-dog
keywords:
  - список значений
tags:
  - doka
  - placeholder
---

## Кратко

В тег `<datalist>` можно обернуть несколько тегов [`<option>`](/html/option/) и связать этот список с полем ввода [`<input>`](/html/input/) при помощи атрибута `list`. Тогда при вводе данных в поле будет показан список вариантов.

## Как пишется

```html
<label for="my-browser">Выберите браузер из списка:</label>
<input list="browsers" id="my-browser" name="my-browser">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Yandex Browser">
  <option value="Opera">
  <option value="Safari">
  <option value="Microsoft Edge">
</datalist>
```

<iframe title="Выпадающий список со списком браузеров" src="demos/browsers/" height="100"></iframe>
