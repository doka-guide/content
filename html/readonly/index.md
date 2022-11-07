---
title: "Атрибут `readonly`"
description: "Этим атрибутом помечают поля формы, которые доступны только для чтения."
authors:
  - tanugladkih
related:
  - js/boolean
  - html/form
  - css/pseudoclasses
tags:
  - doka
  - placeholder
---

## Кратко

Атрибут `readonly` добавляется полям формы, которые пользователь не сможет редактировать. Они будут доступны только для чтения.

## Пример

В данном примере нельзя отредактировать дату своего рождения:

```html
<form>
  <div class="group">
    <input type="date" value="1995-04-04" readonly="readonly" id="date">
    <label for="date">Дата рождения</label>
  </div>
</form>
```

## Как пишется

Атрибут `readonly` булевый, его можно добавить со значением: `readonly="readonly"`, или без него — `<input type="text" readonly>`.

Атрибут `readonly` можно использовать для [`<textarea>`](/html/textarea/) и [`<input>`](/html/input/) со следующими типами:

- `text`,
- `search`,
- `url`,
- `tel`,
- `email`,
- `password`,
- `date`,
- `month`,
- `week`,
- `time`,
- `datetime-local`,
- `number`.

Не используется:

- с тегом [`<select>`](/html/select/);
- c любым типом кнопок (даже если это изображение);
- если у поля есть атрибут [`hidden`](/html/hidden/).

Также для полей с атрибутом `readonly` не сработает атрибут [`required`](/html/required/).

## Как понять

Есть разница между [`disabled`](/html/disabled/) и `readonly`. Так, поля, доступные только для чтения (`readonly`), по-прежнему могут получать фокус и будут отправляться вместе с формой в отличие от неактивных полей (`disabled`).

## Подсказки

💡 Поле с атрибутом `readonly` можно стилизовать при помощи псевдокласса `:read-only`, а поля без этого атрибута - `:read-write`.
