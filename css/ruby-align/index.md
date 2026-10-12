---
title: "`ruby-align`"
description: "Выравниваем аннотации относительно базового текста с помощью нативного CSS!"
baseline:
  - group: ruby-align
    features:
      - css.properties.ruby-align
      - css.properties.ruby-align.center
      - css.properties.ruby-align.space-around
      - css.properties.ruby-align.space-between
      - css.properties.ruby-align.start
authors:
  - drakesbot12
keywords:
  - руби
  - ruby
  - выравнивание
  - японский
related:
  - html/ruby
  - css/ruby-position
  - css/writing-mode
tags:
  - doka
---

## Кратко

Свойство `ruby-align` определяет, как аннотации (руби-текст) выравниваются относительно базового текста в элементе [`<ruby>`](/html/ruby/). Это полезно при работе с восточноазиатскими языками, особенно японским.

## Пример

```html
<ruby>
  風林
  <rp> (</rp><rt>Ветер и лес</rt><rp>) </rp>
</ruby>
<ruby>
  火山
  <rp> (</rp><rt>Огонь и гора</rt><rp>) </rp>
</ruby>
<ruby>
  雨月
  <rp> (</rp><rt>Дождь и луна</rt><rp>) </rp>
</ruby>
```

```css
ruby {
  ruby-align: center;
}
```

<iframe title="Выравнивание аннотаций ruby-align" src="demos/basic/" height="200"></iframe>

## Как пишется

```css
.element {
  ruby-align: start;
}
```

- `start` — аннотация выравнивается по началу текста (значение по умолчанию).
- `center` — аннотация выравнивается по центру символов базового текста.
- `space-between` — аннотации распределяются с равными промежутками между символами основного текста.
- `space-around` — аннотации распределяются с равными промежутками вокруг символов.

Свойство работает только внутри элементов с `display: ruby` и аннотациями `<rt>`.

## Как понять

Когда вы используете аннотации над или под иероглифами (например, японскими), важно контролировать, как они соотносятся с основным текстом. Это особенно критично при сложных фразах или вертикальном письме. `ruby-align` позволяет точно управлять этим выравниванием.

<iframe title="Интерактивная демка по ruby-align" src="demos/practis/" height="250"></iframe>

## Подсказки

💡 Свойство `ruby-align` применяется только к родительскому элементу [`<ruby>`](/html/ruby/).
💡 Чтобы аннотации были видны, используйте элементы [`<ruby>`](/html/ruby/) и `<rt>`, а также корректный HTML-структурный контент.
💡 Подробнее о всех свойствах руби-аннотаций можно прочитать в официальной [спецификации CSS Ruby Layout Module Level 1](https://www.w3.org/TR/css-ruby-1/).
