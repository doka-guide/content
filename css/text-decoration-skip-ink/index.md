---
title: "`text-decoration-skip-ink`"
authors:
  - parabolabam
keywords:
  - text-decoration-skip-ink
tags:
  - doka
  - text-decoration-skip-ink
---

## Кратко

Свойство `text-decoration-skip-ink` позволяет контролировать тип подчеркивания и надчеркивания. Если текст нужно перечеркнуть, то свойтсво `text-decoration-skip-ink` будет благородно проигнорировано.

## Как пишется

Возможные значения:

- `none` — линия рисуется с нижней стороны текста. Рисуется сквозь глифы;
- `auto` — линия ~может~ рисоваться так, что не касается глифа (значение по умолчанию);
- `all` — линия должна рисоваться так что не касается глифа.

### Пример

Создадим несколько абзацев текста. Применим свойство `text-decoration-skip-ink` для них вместе со свойством [`text-decoration: underline`](/css/text-decoration/).

```css
p {
  text-decoration: underline;
}
```

<iframe title="Примеры свойства `text-decoration-skip-ink` с нижним подчеркиванием" src="demos/text-decoration-skip-ink-underline/" height="400"></iframe>


```css
p {
  text-decoration: overline;
}
```

<iframe title="Примеры свойства `text-decoration-skip-ink` с верхним подчеркиванием" src="demos/text-decoration-skip-ink-overline/" height="400"></iframe>

## Подсказки

💡 `text-decoration-skip-ink` работает только вместе с [`text-decoration`](/css/text-decoration/). Например, если написать
```css
p {
  text-decoration-skip-ink: auto
}
```
`text-decoration-skip-ink` применится, но не сработает корректно.


Чтобы избежать такого, нужно просто исправить немного код выше

```css
p {
  text-decoration: underline;
  text-decoration-skip-ink: auto
}
```
💡 `text-decoration-skip-ink` при наличии [`text-decoration: overline`](/css/text-decoration/) корректно не сработает, так как линия отрисуется поверх самого высокого глифа текста.
