---
title: "`text-justify`"
description: "Как будем текст выравнивать? Добавим пробелы между словами или между символами?"
baseline:
  - group: text-justify
    features:
      - css.properties.text-justify
      - css.properties.text-justify.auto
      - css.properties.text-justify.inter-character
      - css.properties.text-justify.inter-word
      - css.properties.text-justify.none
authors:
  - kalpovskii
  - starhamster
keywords:
  - тип выравнивания текста
related:
  - css/text-align
  - css/letter-spacing
  - css/word-spacing
tags:
  - doka
---

## Кратко

Свойство `text-justify` указывает, какой тип выравнивания должен применяться к тексту, если ему уже задано свойство [`text-align: justify`](/css/text-align/).

## Пример

```css
p {
  text-align: justify;
  text-justify: inter-word;
}
```

## Как пишется

Возможные значения:

- `none` — выравнивание текста отключено. Будто `text-align: justify` не прописано для текста.
- `auto` — значение по умолчанию, браузер сам решает какой тип выравнивания применить, основываясь на балансе между скоростью и качеством, а также на том, что более подходит для языка текста (например, английского, иероглифных языков и тому подобных).
- `inter-word` — выравнивание достигается увеличением пробелов между словами.
- `inter-character` — выравнивание достигается увеличением пробелов между символами.

<aside>

⚠️ Свойство может не поддерживаться всеми браузерами. Актуальную информацию о поддержке можно посмотреть на [Can I Use](https://caniuse.com/css-text-justify).

</aside>

<iframe title="auto" src="demos/auto/" height="1050"></iframe>
