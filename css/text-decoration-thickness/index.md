---
title: "`text-decoration-thickness`"
description: "Какой будет толщина декоративной линии под (или над) текстом?"
baseline:
  - group: text-decoration
    features:
      - css.properties.text-decoration-thickness
      - css.properties.text-decoration-thickness.auto
      - css.properties.text-decoration-thickness.from-font
      - css.properties.text-decoration-thickness.percentage
authors:
  - nailheart
contributors:
  - vitya-ne
keywords:
  - толщина декоративной линии
related:
  - css/text-decoration
  - css/text-decoration-line
  - recipes/multicolor-text
tags:
  - doka
---

## Кратко

Свойство `text-decoration-thickness` управляет толщиной декоративной линии у текста, если она задана свойством [`text-decoration`](/css/text-decoration/).

## Пример

Для примера создадим три абзаца текста и зададим для них разные значения.

```html
<p class="thin">Текст с голубым подчёркиванием в 1px.</p>
<p class="thick">Текст с голубым подчёркиванием в 3px.</p>
<p class="shorthand">Текст с голубым подчёркиванием в 5px.</p>
```

```css
.thin {
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: #2e9aff;
  text-decoration-thickness: 1px;
}

.thick {
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: #2e9aff;
  text-decoration-thickness: 3px;
}

.shorthand {
  text-decoration: underline solid #2e9aff 5px;
}
```

Свойство `text-decoration` является шорткатом и позволяет указать все значения сразу.

<iframe title="Толщина декоративной линии" src="demos/basic/" height="440"></iframe>

## Как пишется

Возможные значения:

- `auto` — значение по умолчанию, браузер сам определит толщину линии.
- `from-font` — если в файле шрифта прописана предпочтительная толщина декоративной линии, то будет использована она. Если нет, то значение будет установлено в `auto`.
- Толщина в единицах измерения — можно задать толщину линии во всех доступных [единицах измерения](/css/numeric-types/).

## Подсказки

💡 Свойство `text-decoration-thickness` может менять толщину подчёркивания у ссылок ([`<a>`](/html/a/)), а также его можно анимировать при помощи [`transition`](/css/transition/).
