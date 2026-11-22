---
title: "Атрибут `multiple`"
description: "Позволяет выбрать несколько значений или файлов."
baseline:
  - group: input-file-multiple
    features:
      - html.elements.input.multiple
  - group: select
    features:
      - html.elements.select.multiple
authors:
  - inventoris
contributors:
  - tatianafokina
  - skorobaeus
keywords:
  - множественный выбор
related:
  - html/input
  - html/select
  - html/datalist
tags:
  - doka
---

## Кратко

С атрибутом `multiple` можно выбрать несколько имейлов или файлов в [`<input>`](/html/input/), либо несколько вариантов в списке [`<select>`](/html/select/).

## Пример

В списке ниже есть лишние слова. Их можно выбрать, зажав клавишу <kbd>Ctrl</kbd> для Windows или <kbd>⌘</kbd> на macOS. Ещё можно пользоваться <kbd>Shift</kbd>, но тогда выбор получится областью: от первого кликнутого слова до второго, что не очень подходит для примера.

```html
<select size="5" multiple>
  <option>Красный</option>
  <option>Классный</option>
  <option>Зелёный</option>
  <option>Синий</option>
  <option>Съел иней</option>
</select>
```

<iframe title="Базовый пример" src="demos/basic/" height="300"></iframe>

## Как пишется

Атрибут `multiple` можно указать без значения, он доступен для тега `<input>` с `type="email"` или `type="file"`, а также для тега `<select>`.

Создадим `<input>` с возможностью указать несколько имейлов через запятую. Для этого просто добавим к нему атрибут `multiple`.

Теперь, если кликнуть по полю ввода, `<input>` любезно предложит имейлы. Но когда мы что-то выберем, например «бригадира», список схлопнется.

Это нормально, потому что `<input>` нам уже подсказал имейл, а мы этим воспользовались, так что он ретировался и больше не помогает. Чтобы снова вызвать список для второго имейла, нужно добавить запятую после первого адреса внутри поля ввода — и так далее. Не работает в Safari 😔

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

<iframe title="Множественный выбор имейлов" src="demos/multiple-input-email/" height="300"></iframe>

Создадим `<input>` с атрибутом `multiple`, но теперь для возможности закачать несколько файлов.

```html
<input type="file" multiple>
```

<iframe title="Множественный выбор файлов" src="demos/multiple-input-files/" height="210"></iframe>

### Доступность

В [ARIA](/a11y/aria-intro/) есть атрибут [`aria-multiselectable`](/a11y/aria-multiselectable/). Он тоже нужен для выбора нескольких опций или файлов.

Старайтесь всегда использовать `multiple`. `aria-multiselectable` поможет в сложных ситуациях, когда создаёте кастомные элементы.
