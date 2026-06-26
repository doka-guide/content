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

`@font-feature-values` позволяет дать понятные имена загадочным кодам вроде `ss01` или `cv02` для конкретного шрифта (семейства). Затем эти имена можно использовать в `font-variant-alternates`, не вспоминая номера `ss01`, `cv12` и т. п.

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

Когда вы используете профессиональные шрифты (например, для красивых заголовков или логотипов), у них часто есть «дополнительные настройки» или «фичи». Это как переключатели, которые меняют внешний вид букв: например, можно включить красивые завитушки (`swash`) или использовать другой вариант написания буквы `g`.

В CSS эти фичи обычно включаются с помощью малопонятных кодов, вроде `ss01` или `cv02`.

Представьте, что у вас на пульте управления вместо подписей «Включить подсветку» и «Усилить басы» — просто номера кнопок `#1` и `#2`. Сложно запомнить, правда?

`@font-feature-values` решает эту проблему. Это как наклейки на пульт: вы берёте конкретный шрифт (например, «Source Serif 4») и даёте этим загадочным номерам простые и понятные имена, например:

- Код `ss01` → имя `cool`
- Код `ss02` → имя `so-cool`

Теперь, когда вы захотите применить фичу, вы просто пишете `font-variant-alternates: styleset(cool)`, а не вспоминаете номер. Код становится чистым и понятным для всей команды.

Важно: Это всего лишь «переводчики» для конкретного шрифта. Если ваш шрифт не умеет делать завитушки (не поддерживает эту фичу), то, какой бы код вы ни написали, ничего не изменится.

## Подсказки

💡 Сохраняйте директиву рядом с подключением шрифта и используйте точные имена семейства.
💡 Для кросс‑браузерности можно использовать как fallback через `font-feature-settings`, если `font-variant-alternates` не поддерживается.
💡 Не смешивайте алиасы разных шрифтов: одна директива — для одного семейства.
💡 Проверяйте набор доступных фич в спецификациях шрифта или с помощью инспекторов (DevTools, FontGoggles, Axis‑Praxis и т. п.).
💡 Если вы просто хотите включить фичу и не заморачиваться с именами, используйте `font-feature-settings: "ss01" 1`. Но если проект большой — лучше `@font-feature-values`.
