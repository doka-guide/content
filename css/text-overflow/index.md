---
title: "`text-overflow`"
authors:
  - solarrust
tags:
  - doka
---

## Кратко

Свойство `text-overflow` определяет, как будет обрезаться текст, если он не влезает в доступную область полностью. Работает только если элементу заданы также свойства [`white-space`](/css/white-space/) со значением `nowrap` и [`overflow`](/css/overflow/) со значением `hidden`, `scroll` или `auto`.

## Пример

Код ниже обрежет текст, добавив в конце строки многоточие. Также добавлены свойства, без которых `text-overflow` не сработает:

```css
p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
```

## Как пишется

Доступны два значения этого свойства:

- `clip` — текст обрезается ровно по краю родительского блока.
- `ellipsis` — при обрезке текста в конце строки добавляется многоточие «…», показывая незавершённость предложения.

<iframe title="Разница значений clip и ellipsis" src="demos/values/" height="200"></iframe>
