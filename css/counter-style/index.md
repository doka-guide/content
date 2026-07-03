---
title: "`@counter-style`"
description: "Создаёт собственные стили счётчиков и маркеров списков: от эмодзи‑буллетов до кастомной нумерации."
authors:
  - drakesbot12
baseline:
  - group: counter-style
    features:
      - api.CSSCounterStyleRule
      - api.CSSCounterStyleRule.additiveSymbols
      - api.CSSCounterStyleRule.fallback
      - api.CSSCounterStyleRule.name
      - api.CSSCounterStyleRule.negative
      - api.CSSCounterStyleRule.pad
      - api.CSSCounterStyleRule.prefix
      - api.CSSCounterStyleRule.range
      - api.CSSCounterStyleRule.speakAs
      - api.CSSCounterStyleRule.suffix
      - api.CSSCounterStyleRule.symbols
      - api.CSSCounterStyleRule.system
      - css.at-rules.counter-style
      - css.at-rules.counter-style.additive-symbols
      - css.at-rules.counter-style.fallback
      - css.at-rules.counter-style.negative
      - css.at-rules.counter-style.pad
      - css.at-rules.counter-style.prefix
      - css.at-rules.counter-style.range
      - css.at-rules.counter-style.suffix
      - css.at-rules.counter-style.system
      - css.at-rules.counter-style.speak-as
      - css.at-rules.counter-style.symbols
keywords:
  - счётчик
  - маркеры списков
  - нумерация
  - list-style
  - counter
related:
  - css/list-style
  - css/counter-increment
  - css/counter-reset
tags:
  - doka
---

## Кратко

`@counter-style` позволяет создать собственный стиль счётчика и использовать его в `list-style` и `list-style-type`. Так можно настроить вид маркеров для нумерованных и маркированных списков: сделать их эмодзи, буквенными, римскими, с префиксом/суффиксом и т. п.

## Пример

Кастомные «вкусные» буллеты для маркированного списка:

```css
@counter-style yummy {
  system: cyclic;            /* повторы по кругу */
  symbols: "🍊" "🍋" "🍇";  /* маркеры */
  suffix: " ";              /* пробел после маркера */
}

ul.yummy-list { list-style: yummy; }
```

```html
<ul class="yummy-list">
  <li>Апельсин</li>
  <li>Лимон</li>
  <li>Виноград</li>
  <li>Ещё один — снова с первого символа</li>
  <li>И так по кругу…</li>
  </ul>
```

Кастомная нумерация (римские цифры, упрощённо):

```css
@counter-style romans {
  system: additive;
  additive-symbols: 10 "X", 5 "V", 1 "I";
  suffix: ". ";
  fallback: decimal;  /* если что-то не поддерживается */
}

ol.roman { list-style: romans; }
```

```html
<ol class="roman">
  <li>Пункт</li>
  <li>Пункт</li>
  <li>Пункт</li>
</ol>
```

<iframe title="Пользовательские стили счётчиков: эмодзи и римские цифры" src="demos/basic/" height="420"></iframe>

## Как пишется

Общая форма с основными свойствами:

```css
@counter-style <name> {
  system: cyclic | numeric | alphabetic | symbolic | additive | fixed | <counter-style-name>;
  symbols: <symbol>+;                /* для cyclic/numeric/alphabetic/symbolic */
  additive-symbols: <value> <symbol> [, <value> <symbol>]*; /* для additive */
  range: auto | <integer> <integer> | <integer> infinite;
  pad: <integer> <symbol>;
  prefix: <string>;
  suffix: <string>;
  negative: <prefix> <suffix>;
  fallback: <counter-style-name>;
  speak-as: auto | bullets | numbers | words | spell-out | <counter-style-name>;
}
```

- `system` — модель генерации: циклическая, числовая, алфавитная, символическая, аддитивная (сумма значений), фиксированная или расширение существующего стиля.
- `symbols`/`additive-symbols` — набор символов или правил составления числа.
- `prefix`/`suffix` — то, что дописывается до/после маркера (например, точка и пробел).
- `fallback` — запасной стиль, если кастомный недоступен.
- `range`, `pad` — ограничения диапазона и дополнение слева (например, ведущими нулями).
- `speak-as` — подсказка для синтеза речи (поддержка ограничена).

Использование:

```css
ul {
  list-style: <name>;
}
ol {
  list-style-type: <name>;
}
```

## Как понять

Браузер по умолчанию рисует буллеты и нумерацию согласно встроенным стилям (`disc`, `decimal`, `lower-alpha` и т. д.). `@counter-style` открывает доступ к «конструктору» этих стилей: можно задать, как выглядят маркеры и как строится их последовательность. Это удобно для брендированных интерфейсов, неординарных списков и локализации нумерации.

`system: additive` полезен для систем, где число составляется из значимых символов (римские цифры). `system: cyclic` — для повторяющихся маркеров (эмодзи, иконки). `extends` позволяет основаться на существующем стиле и слегка изменить его.

## Подсказки

💡 Всегда задавайте `suffix: " "` или другой разделитель, чтобы текст не «прилипал» к маркеру.
💡 Добавляйте `fallback`, чтобы сохранить читаемость, если кастомные счётчики не поддерживаются.
💡 Символы можно брать из эмодзи или шрифтовых иконок; помните про межплатформенные различия глифов.
💡 Для доступности проверяйте, как список читается скринридером. `speak-as` может помочь, но поддержка ограничена — не полагайтесь на него.
💡 Комбинируйте с [`counter-reset`](/css/counter-reset/)/[`counter-increment`](/css/counter-increment), если строите сложные многоуровневые нумерации в компонентах.
