---
title: "`@font-feature-values`"
description: "Задаём имена для значений OpenType‑фич конкретного шрифта и используем их через font-variant-alternates."
authors:
  - drakesbot12
keywords:
  - opentype
  - стилистические
  - наборы
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

`@font-feature-values` позволяет назначить понятные имена числовым значениям OpenType-фич для конкретного шрифта (семейства). Затем эти имена можно использовать в `font-variant-alternates`, не вспоминая номера `ss01`, `cv12` и т. п.

## Пример

```html
<p class="sample sample--default">Hamburgefonstiv 012345</p>
<p class="sample sample--alt">Hamburgefonstiv 012345</p>
```

```css
/* Даём имена альтернативам для выбранного шрифта */
@font-feature-values "Source Serif 4" {
  @styleset {
    cool: 1; /* ss01 */
    so-cool: 2; /* ss02 */
  }
  @character-variant {
    cv-g: 1; /* cv01 */
  }
}

.sample { font-family: "Source Serif 4", serif; }

.sample--alt {
  /* без алиасов */
  font-feature-settings: "ss01" 1, "ss02" 1;

  /* с алиасами */
  font-variant-alternates: styleset(cool, so-cool);
}
```

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

Эффект зависит от того, поддерживает ли шрифт нужные OpenType-фичи — если шрифт не содержит `ss02`, визуальных изменений не будет.

## Подсказки

💡 Сохраняйте директиву рядом с подключением шрифта и используйте точные имена семейства.
💡 Для кросс‑браузерности можно использовать как fallback через `font-feature-settings`, если `font-variant-alternates` не поддерживается.
💡 Не смешивайте алиасы разных шрифтов: одна директива — для одного семейства.
💡 Проверяйте набор доступных фич в спецификациях шрифта или с помощью инспекторов (DevTools, FontGoggles, Axis‑Praxis и т. п.).
