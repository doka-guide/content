---
title: "`@font-feature-values`"
description: "Задаём имена для значений OpenType‑фич конкретного шрифта и используем их через font-variant-alternates."
baseline:
  - group: font-feature-values
    features:
      - css.at-rules.font-feature-values
      - css.at-rules.font-feature-values.styleset
      - css.at-rules.font-feature-values.character-variant
      - css.at-rules.font-feature-values.swash
      - css.at-rules.font-feature-values.stylistic
      - css.at-rules.font-feature-values.ornaments
      - css.at-rules.font-feature-values.annotation
      - css.at-rules.font-feature-values.historical-forms
authors:
  - drakesbot12
keywords:
  - opentype
  - стилистические наборы
  - stylistic
  - sets
related:
  - css/font-variant-alternates
  - css/font-feature-settings
  - css/font-variant
tags:
  - doka
---

## Кратко

`@font-feature-values` позволяет дать читаемые имена числовым значениям OpenType‑фич для конкретного шрифта (семейства). Затем эти имена можно использовать в `font-variant-alternates`, не вспоминая номера `ss01`, `cv12` и т. п.

## Пример

```html
<p class="sample sample--default">Hamburgefonstiv 012345</p>
<p class="sample sample--alt">Hamburgefonstiv 012345</p>
```

```css
/* Даём имена альтернативам для выбранного шрифта */
@font-feature-values "Source Serif 4" {
  @styleset {
    alt-a: 1; /* ss01 */
    alt-g: 2; /* ss02 */
  }
  @character-variant {
    cv-g: 1; /* cv01 */
  }
}

.sample { font-family: "Source Serif 4", serif; }

.sample--alt {
  /* Читаемые имена вместо номеров */
  font-variant-alternates: styleset(alt-a, alt-g), character-variant(cv-g);
}
```

<iframe title="Именованные значения OpenType‑фич для конкретного шрифта" src="demos/basic/" height="300"></iframe>

## Как пишется

Общая форма:

```css
@font-feature-values <family-name># {
  @styleset { <custom-ident>: <number>[, <number>]*; }      /* ss## */
  @character-variant { <custom-ident>: <number>[, ...]; }   /* cv## */
  @stylistic { <custom-ident>: <number>; }                  /* salt */
  @swash { <custom-ident>: <number>; }                      /* swsh */
  @ornaments { <custom-ident>: <number>; }                  /* ornm */
  @annotation { <custom-ident>: <number>; }                 /* nalt */
  @historical-forms;                                        /* hist */
}
```

- `family-name` — одно или несколько имён семейства шрифта в кавычках. Имена должны точно совпадать с `font-family`.
- Внутренние блоки соответствуют OpenType‑фичам и принимают пользовательские идентификаторы, которым сопоставляются один или несколько числовых аргументов.
- Далее эти идентификаторы используются в `font-variant-alternates` как функции: `styleset(name)`, `character-variant(name)` и т. д.

## Как понять

OpenType‑фичи часто адресуются номерами (`ss01`, `cv01`, `swsh`). Это плохо читается и привязывает код к конкретному шрифту. `@font-feature-values` позволяет ввести «смысловые» алиасы и использовать их в свойствах высокого уровня (`font-variant-*`). Так код становится понятнее и переносимее внутри проекта.

Важно помнить, что эффект зависит от поддержки конкретным шрифтом указанных фич и номеров — если шрифт не содержит `ss02`, визуальных изменений не будет.

## Подсказки

💡 Сохраняйте директиву рядом с подключением шрифта и используйте точные имена семейства.
💡 Для кросс‑браузерности можно дублировать алиасы низкоуровневым `font-feature-settings` на случай, если `font-variant-alternates` не сработает.
💡 Не смешивайте алиасы разных шрифтов: одна директива — для одного семейства.
💡 Проверяйте набор доступных фич в спецификациях шрифта или с помощью инспекторов (DevTools, FontGoggles, Axis‑Praxis и т. п.).
