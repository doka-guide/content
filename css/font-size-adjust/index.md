---
title: "`font-size-adjust`"
description: "Масштабирует резервный шрифт по заданной метрике, чтобы текст не менял видимый размер при замене шрифта."
baseline:
  - group: font-size-adjust
    features:
      - css.properties.font-size-adjust
      - css.properties.font-size-adjust.from-font
      - css.properties.font-size-adjust.none
      - css.properties.font-size-adjust.two-values
      - svg.global_attributes.font-size-adjust
      - css.at-rules.font-face.size-adjust
authors:
  - solarrust
related:
  - css/font-size
  - css/font-variant
  - css/font-optical-sizing
  - css/font-feature-settings
tags:
  - doka
---

## Кратко

Масштабирует шрифты в стеке `font-family` так, чтобы строчные буквы оставались одной высоты при переключении с одного на другой. Текст не «прыгает», когда нужный шрифт не загрузился.

## Пример

```html
<p class="reference">Hamburgefons — Arial</p>
<p class="without">Hamburgefons — Times New Roman</p>
<p class="with">Hamburgefons — Times New Roman + font-size-adjust</p>
```

```css
.reference {
  font-family: Arial, sans-serif;
  font-size: 40px;
}

.without {
  font-family: "Times New Roman", serif;
  font-size: 40px;
}

.with {
  font-family: "Times New Roman", serif;
  font-size: 40px;
  font-size-adjust: 0.52; /* выравниваем по x-height Arial */
}
```

<iframe title="font-size-adjust — сравнение шрифтов" src="demos/basic/?embed=1" height="380"></iframe>

Arial и Times New Roman при одинаковом `font-size: 40px` выглядят по-разному: у Times New Roman строчные буквы заметно ниже. С `font-size-adjust: 0.52` Times New Roman масштабируется так, что его строчные совпадают по высоте с Arial.

## Как понять

У каждого шрифта есть **аспектное значение** — соотношение высоты строчных букв к `font-size`. Например, у Arial оно около 0.52: строчная `x` равна примерно 52% от `font-size`. У Times New Roman это значение около 0.45.

Когда первый шрифт в `font-family` не загружается, браузер переключается на следующий. `font-size` при этом остаётся прежним, а соотношение строчных у нового шрифта другое. Строчные буквы становятся заметно выше или ниже — текст визуально «прыгает» и абзац занимает другой объём пространства.

`font-size-adjust` устраняет это: браузер пересчитывает размер подставленного шрифта так, чтобы его строчные совпали по высоте с указанным значением. Сам `font-size` при этом не меняется.

Свойство особенно заметно на мелком тексте: там разница в этом соотношении сильнее влияет на читаемость.

## Как пишется

```css
p {
  font-size-adjust: 0.5;               /* числовое значение */
  font-size-adjust: from-font;         /* взять метрику из шрифта */
  font-size-adjust: none;              /* отключить */
  font-size-adjust: cap-height 0.72;   /* явная метрика + число */
  font-size-adjust: cap-height from-font;
}
```

### `none`

Значение по умолчанию. Масштабирование отключено.

### `<число>`

Положительное число без единиц измерения: соотношение целевой метрики к `font-size`. По умолчанию метрика — это x-height (высота строчной буквы). Значение `0` делает текст невидимым.

Чтобы узнать аспектное значение нужного шрифта, можно воспользоваться сервисом [Font Style Matcher](https://meowni.ca/font-style-matcher/) или найти данные в документации шрифта.

### `from-font`

Браузер сам извлекает нужное значение из метрик первого доступного шрифта в стеке. Не нужно подбирать число вручную:

```css
p {
  font-family: "Ideal Sans", Arial, sans-serif;
  font-size-adjust: from-font;
}
```

Если «Ideal Sans» загружен, браузер берёт его x-height. Если нет — берёт x-height Arial как первого доступного шрифта в стеке.

### Двузначный синтаксис

По умолчанию браузер выравнивает по x-height. Можно указать другую метрику явно:

```css
p {
  font-size-adjust: cap-height from-font;
  font-size-adjust: cap-height 0.72;
  font-size-adjust: ch-width 0.5;
}
```

Доступные метрики:
- `ex-height` — высота строчной `x`, то есть x-height (значение по умолчанию);
- `cap-height` — высота прописной (заглавной) буквы;
- `ch-width` — ширина символа `0`, актуально для моноширинных шрифтов;
- `ic-width` — ширина символа `水` (U+6C34), для китайских, японских и корейских шрифтов;
- `ic-height` — высота символа `水`, для вертикальных текстов на этих же языках.

## Подсказки

💡 `from-font` — самый практичный выбор в большинстве случаев. Браузер сам найдёт нужную метрику, и не нужно искать числа в документации шрифта.

💡 Свойство работает при любой смене шрифта в `font-family`, а не только при недоступности основного. Если несколько шрифтов в стеке резко отличаются по x-height, `font-size-adjust` сглаживает переход между ними.
