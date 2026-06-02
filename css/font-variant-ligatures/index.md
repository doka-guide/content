---
title: "`font-variant-ligatures`"
description: "Как написать æ? Нужно включить лигатуры!"
baseline:
  - group: font-variant-ligatures
    features:
      - css.properties.font-variant-ligatures
authors:
  - goingtogogo
keywords:
  - лигатуры
related:
  - css/font-variant
  - css/font-feature-settings
  - css/text-rendering
tags:
  - doka
---

## Кратко

Свойство `font-variant-ligatures` отвечает за то, какие лигатуры и контекстные формы используются при отображении текста.

## Пример

```css
.selector {
  font-variant-ligatures: common-ligatures discretionary-ligatures;
}
```

## Как пишется

В качестве значения можно указать одно или несколько значений из списка ниже:

- `normal` — включает лигатуры и контекстные формы, встроенные в шрифт (значение по умолчанию);
- `none` — отключает все лигатуры и контекстные формы;
- `common-ligatures` — включает отображение распространённых лигатур;
- `discretionary-ligatures` — включает отображение произвольных лигатур. Такие лигатуры определяет разработчик шрифта и их набор может отличаться от шрифта к шрифту. Чтобы узнать подробнее, нужно проверить документацию конкретного шрифта;
- `historical-ligatures` — включает отображение исторических лигатур;
- `contextual` — включает отображение контекстных альтернатив. Хотя эта функция не относится к лигатурам, она, как и лигатуры, обычно используется для согласования формы глифов с окружающим контекстом.


Каждому значению соответствует парное значение с префиксом `no-`, которое отключает конкретный вид лигатур или контекстных форм: `no-common-ligatures`, `no-discretionary-ligatures`, `no-historical-ligatures`, `no-contextual`.


Вот как каждое значение влияет на отображение текста:

<iframe title="Песочница" src="demos/playground/" height="785"></iframe>

## Как понять

Лигатуры помогают улучшить ритм и уменьшить визуальный шум в длинных текстах, заголовках и проектах, где важна типографика. А вот в пользовательских интерфейсах (кнопки, таблицы, меню), где важно быстро сканировать экран, лигатуры, наоборот, могут мешать.

## Подсказки

💡 `font-variant-ligatures` работает только со шрифтами, в которых заложены [OpenType](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/OpenType_fonts_guide) фичи. Если шрифт их не поддерживает, свойство не сработает.

💡 Того же поведения можно добиться используя `font-feature-settings`. Значения `font-variant-ligatures` соответствуют следующим OpenType свойствам:

- `common-ligatures` — `"liga"` и `"clig"`;
- `discretionary-ligatures` — `"dlig"`;
- `historical-ligatures` — `"hlig"`;
- `contextual` — `"calt"`.

Однако в будущем лучше использовать именно `font-variant-ligatures` для более [предсказуемого и точного управления](https://drafts.csswg.org/css-fonts/#font-feature-settings-prop).

