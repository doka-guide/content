---
title: "`@position-try`"
description: "Объединяем набор фолбэк стилей для позиционирования под одним именем."
baseline:
  - group: anchor-positioning
    features:
      - css.at-rules.position-try
authors:
  - akhmadullin
related:
  - css/position-area
  - css/position-try-fallbacks
  - css/position-try
tags:
  - doka
---

## Кратко

Директива `@position-try` объединяет набор стилей для альтернативного расположения элемента под именем, которое можно использовать в качестве значения для свойства [`position-try-fallbacks`](/css/position-try-fallbacks/).

## Пример

```css
@position-try --bottom {
  position-area: bottom;
  margin-top: 20px;
}
```

## Как пишется

В общем виде директива записывается следующим образом:

```css
@position-try --try-option-name {
    property: value;
}
```

`--try-option-name` так же, как и значение для [`anchor-name`](/css/anchor-name/), должно начинаться с двух символов тире (`--`).

Внутри директивы `@position-try` можно указать не все возможные CSS-свойства, а только те, что влияют на расположение и размер таргет элемента:

- [inset-свойства](/css/inset/);
- [margin-свойства](/css/margin/);
- sizing-свойства (например, [`width`](/css/width/), [`height`](/css/height/));
- self-alignment-свойства (например, [`justify-self`](/css/justify-self/), [`align-self`](/css/align-self/));
- [`position-anchor`](/css/position-anchor);
- [`position-area`](/css/position-area).

## Как понять

Иногда в качестве фолбэка не достаточно использовать просто другое значение свойство `position-area`. Порой нужно ещё и отступы добавить, или размеры элемента поменять.

Чтобы решить эту проблему была придумана директива `@position-try`, которая позволяет объеденить под одним именем набор из нескольких css-свойств и затем применить их в качестве фолбэка внутри свойства [`position-try-fallbacks`](/css/position-try-fallbacks/).

Рассмотрим пример, чтобы лучше понять, как работает директива.

```css
.target {
  width: 200px;
  position-area: top;
  position-try-fallbacks: --bottom;
}

/*
  перемещаем элемент вниз,
  увеличиваем ширину и добавляем отступ
*/
@position-try --bottom {
  position-area: bottom;
  margin-top: 40px;
  width: 400px;
}
```

Попробуйте переместить якорный элемент сверху-вниз и обратно.

<iframe title="Показываем работу директивы @position-try" src="demos/position-try-rule/" height="400"></iframe>
