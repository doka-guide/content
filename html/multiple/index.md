---
title: "Атрибут `multiple`"
description: "Позволяет выбрать несколько значений или файлов."
authors:
  - inventoris
keywords:
  - атрибут
  - multiple
tags:
  - doka
---

## Кратко

С атрибутом `multiple` можно выбрать несколько имейлов или файлов в [`input`](/html/input/), либо несколько вариантов в списке [`select`](/html/select/).

## Пример

В списке ниже есть лишние слова. Их можно выбрать клавишами `Shift` и `Ctrl`.

```html
<select size="5" multiple>
  <option>Красный</option>
  <option>Классный</option>
  <option>Зелёный</option>
  <option>Синий</option>
  <option>Съел иней</option>
</select>
```

<iframe title="Базовый пример" src="demos/basic/" height="350"></iframe>

## Как пишется

Атрибут `multiple` можно указать без значения, он доступен для тега `input` с `type="email"` или `type="file"`, а также для тега `select`.

Создадим `input` с возможностью указать несколько имейлов через запятую. Для этого просто добавим в него атрибут `multiple`.

```html
<input type="email" list="list-of-emails" multiple>
<datalist id="list-of-emails">
  <option value="nekto@doka.guide">Неизвестный</option>
  <option value="prikolist333@doka.guide">Друг шутник</option>
  <option value="anderyBoss@doka.guide">Босс Андрей</option>
  <option value="grish111a@doka.guide">Просто Гриша</option>
  <option value="brigadir@doka.guide">Бригадир</option>
  <option value="s0123tr1012dgs@doka.guide">Не знаю кто</option>
  <option value="printerDanila01@doka.guide">Почта для принтера</option>
</datalist>
```

<iframe title="Использование атрибута multiple для множественного выбора имейлов" src="demos/multiple-input-email/" height="200"></iframe>

Попробуем снова сделать `input` с атрибутом `multiple`, но теперь для возможности закачать несколько файлов.

```html
<input type="file" multiple>
```

<iframe title="Использование атрибута multiple для множественного выбора файлов" src="demos/multiple-input-files/" height="200"></iframe>
