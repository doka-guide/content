---
title: "`font-variant-position`"
description: "Включаем красивые надстрочные и подстрочные индексы."
baseline:
  - group: font-variant-position
    features:
      - css.properties.font-variant-position
      - css.properties.font-variant-position.normal
      - css.properties.font-variant-position.sub
      - css.properties.font-variant-position.super
authors:
  - goingtogogo
contributors:
  - solarrust
keywords:
  - надстрочный текст
  - подстрочный текст
  - sub
  - super
  - opentype
  - sups
  - subs
related:
  - html/sub
  - html/sup
  - css/font-feature-settings
tags:
  - doka
---

## Кратко

Свойство `font-variant-position` включает надстрочные и подстрочные индексы, которые нарисованы в самом шрифте. Дизайнер шрифта заранее сделал для них отдельные варианты символов — глифы: маленькие, поднятые или опущенные внутри обычной строки.

## Пример

```html
<p class="formula">H<sub>2</sub>O</p>
```

```css
.formula sub {
  vertical-align: baseline;
  font-size: inherit;
  font-variant-position: sub;
}
```

## Как пишется

Возможные значения:

- `normal` — отключает надстрочные и подстрочные глифы (значение по умолчанию);
- `sub` — включает подстрочные индексы, например, для химических формул (H₂O);
- `super` — включает надстрочные индексы, например, для степеней (x²).

Переключите вариант и сравните индексы из тегов [`<sub>`](/html/sub/) и [`<sup>`](/html/sup/) с глифами из шрифта. Посмотрите и на расстояние между строками:

<iframe title="Индексы из тегов и из шрифта" src="demos/playground/" height="360"></iframe>

## Как понять

Теги `<sub>` и `<sup>` уменьшают обычные символы и сдвигают их вниз или вверх. Такие индексы выходят тоньше остального текста, а строка с ними может стать выше. Глифы из шрифта нарисованы под свой размер и место: они в тон тексту и не раздвигают строки.

Используйте свойство вместе с тегами: теги отвечают за смысл, а `font-variant-position` — за вид. Если просто добавить свойство к тегу, символ уменьшится и сдвинется дважды. Поэтому в примере выше стили тега по умолчанию сброшены. Делайте так только там, где точно стоит шрифт с нужными глифами.

Без нужных глифов Chrome и Safari покажут обычные символы на обычном месте, и формула x² превратится в x2. Так бывает, если в шрифте нет функций `sups` и `subs`, веб-шрифт ещё не загрузился или символ взят из запасного шрифта. Firefox в таком случае имитирует индексы: уменьшает обычные символы и сдвигает их.

## Подсказки

💡 Свойство работает во всех браузерах, но только со шрифтами, в которых есть нужные [OpenType-функции](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/OpenType_fonts_guide) `sups` и `subs`, как у шрифта в демке выше. Проверить шрифт через [`@supports`](/css/supports/) не выйдет. Список функций шрифта покажет [онлайн-сервис для разбора шрифтов](https://wakamaifondue.com/).

💡 Отключить имитацию индексов в Firefox можно свойством `font-synthesis-position: none`. Оно входит в шорткат [`font-synthesis`](/css/font-synthesis/). Другие браузеры это свойство пока не поддерживают.

💡 Если глифы в шрифте есть, тот же результат даст [`font-feature-settings`](/css/font-feature-settings/) со значениями `"sups" 1` и `"subs" 1`. Но лучше `font-variant-position`: [спецификация советует](https://drafts.csswg.org/css-fonts/#font-feature-settings-prop) высокоуровневые свойства, а `font-feature-settings` оставляет для особых случаев. Значение `font-feature-settings` не складывается с родительским: `"sups" 1` у потомка отменит, например, унаследованный `"tnum" 1` (цифры одинаковой ширины). А ещё Firefox не имитирует индексы через `font-feature-settings`, если глифов в шрифте нет.
