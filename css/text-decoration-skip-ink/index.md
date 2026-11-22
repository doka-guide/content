---
title: "`text-decoration-skip-ink`"
description: "Как линию будем рисовать? Поверх хвостиков букв или не касаясь их?"
baseline:
  - group: text-decoration-skip-ink
    features:
      - css.properties.text-decoration-skip-ink
authors:
  - parabolabam
contributors:
  - zizi-shoot
keywords:
  - верхнее подчёркивание
  - нижнее подчёркивание
related:
  - css/text-decoration
  - css/after
  - css/marker
tags:
  - doka
---

## Кратко

Свойство `text-decoration-skip-ink` управляет внешним видом верхнего и нижнего подчёркиваний. Если текст нужно перечеркнуть, то свойство `text-decoration-skip-ink` будет проигнорировано.

## Как пишется

Возможные значения:

- `none` — линия рисуется под текстом сквозь глифы;
- `auto` — линия _может_ рисоваться так, что не касается глифов (значение по умолчанию);
- `all` — линия будет рисоваться, не касаясь глифов.

### Пример

Создадим несколько абзацев текста. Применим свойство `text-decoration-skip-ink` для них вместе со свойством [`text-decoration`](/css/text-decoration/) с разными значениями.

```css
a {
  text-decoration: underline;
}
```

<iframe title="Примеры свойства text-decoration-skip-ink с нижним подчёркиванием" src="demos/underline/" height="550"></iframe>

```css
a {
  text-decoration: overline;
}
```

<iframe title="Примеры свойства text-decoration-skip-ink с верхним подчёркиванием" src="demos/overline/" height="550"></iframe>

## Подсказки

💡 `text-decoration-skip-ink` работает только вместе с [`text-decoration`](/css/text-decoration/).

Если написать

```css
p {
  text-decoration-skip-ink: auto;
}
```

`text-decoration-skip-ink` применится, но не сработает корректно.

Чтобы этого избежать, нужно немного исправить код выше:

```diff
  p {
+   text-decoration: underline;
    text-decoration-skip-ink: auto;
  }
```

💡 `text-decoration-skip-ink` при наличии [`text-decoration: overline`](/css/text-decoration/) корректно не сработает, так как линия появится поверх самого высокого глифа текста.
