---
title: "Атрибут `for`"
description: "Когда двум тегам нужно почувствовать связь 👉👈"
baseline:
  - group: label
    features:
      - html.elements.label.for
  - group: output
    features:
      - html.elements.output.for
authors:
  - inventoris
contributors:
  - skorobaeus
related:
  - html/input
  - html/output
  - html/label
tags:
  - doka
---

## Кратко

Атрибут `for` связывает текст в [`<label>`](/html/label/) или тег [`<output>`](/html/output/) с контролами формы.

## Пример

Попробуйте нажать на текст в примере ниже.

```html
<label for="number">Ваше любимое число:</label>
<input id="number">
```

<iframe title="Базовый пример" src="demos/basic/" height="250"></iframe>

Поле [`<input>`](/html/input/) становится активным, хотя мы его не трогали. Так получается, потому что текст связан с этим полем. Благодаря `for` они словно одно целое 😊

## Как пишется

Связь устанавливается парой атрибутов `for`-`id`, где `for` одного элемента ссылается на `id` другого (или других).

<aside>

👾 `for` можно задать только для `<label>` или `<output>`.

</aside>

А ещё не каждый элемент подойдёт для связи, годятся только из категории «связываемых»:

- [`<button>`](/html/button/);
- [`<input>`](/html/input/);
- [`<meter>`](/html/meter/);
- [`<progress>`](/html/progress/);
- [`<select>`](/html/select/);
- [`<textarea>`](/html/textarea/);
- И даже сам [`<output>`](/html/output/).

Это значит, что элементам из списка выше можно задать уникальный `id`, на который сможет сослаться атрибут `for` в `<label>` или `<output>`.

```html
<input id="name">
<input id="age">
<output for="name age"></output>
```

Значения атрибута `for` не должны повторяться на одной и той же странице. Дело в том, что благодаря ему поля связываются не только визуально, но и программно. Так пользователи [скринридеров](/a11y/screenreaders/) и других вспомогательных технологий знают, что от них хочет поле.

## Подсказки

💡 Связь между `<label>` и `<input>` возможно установить без атрибута `for` — достаточно обернуть один другим:

```html
<label>Ваше любимое число: <input id="number"></label>
```
