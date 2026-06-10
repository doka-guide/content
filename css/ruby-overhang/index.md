---
title: "`ruby-overhang`"
description: "Позволяем (или нет) выходить руби-подписи за пределы основного текста."
baseline:
  - group: ruby-overhang
    features:
      - css.properties.ruby-overhang
      - css.properties.ruby-overhang.auto
      - css.properties.ruby-overhang.none
authors:
  - drakesbot12
keywords:
  - руби
  - ruby
  - надписи
  - пределы
related:
  - css/ruby-align
  - css/ruby-position
  - html/ruby
tags:
  - doka
---
## Кратко

Свойство `ruby-overhang` определяет, может ли руби-подпись (`<rt>`) выходить за пределы основного текста ([`<ruby>`](/html/ruby/)) и частично накладываться на соседний контент.

## Пример

```html
<ruby class="auto">
  表
  <rp> (</rp>
  <rt>поверхность</rt>
  <rp>) </rp>
</ruby>
<ruby class="none">
  現
  <rp> (</rp>
  <rt>проявление</rt>
  <rp>) </rp>
</ruby>
```

```css
.auto {
  ruby-overhang: auto;
}

.none {
  ruby-overhang: none;
}
```

<iframe title="Пример работы ruby-overhang" src="demos/basic/" height="180"></iframe>

<aside>

⚠️ На данный момент свойство поддерживается только в Safari 18.2+, остальные браузеры игнорируют его. Проверяйте поддержку на [Can I Use](https://caniuse.com/mdn-css_properties_ruby-overhang).

</aside>

## Как пишется

```css
ruby {
  ruby-overhang: auto;
}
```

Допустимые значения:

`auto` — разрешает выходить руби-подписи за границы основного текста, если это необходимо;
`none` — запрещает выход аннотации за пределы блока [`<ruby>`](/html/ruby/).

## Как понять

Если аннотация слишком длинная, браузер по умолчанию может позволить ей немного выступить за границы базового текста. Это помогает избежать сжатия текста или нарушения ритма строки.

Если же вы хотите, чтобы аннотации строго укладывались в рамки, используйте `ruby-overhang: none`.

## Подсказки

💡 Свойство `ruby-overhang` полезно, когда:
- аннотация длиннее базового текста (например, фуригана к иероглифу);
- вы хотите сохранить аккуратную типографику;
- нужно избежать наложений с другими элементами.
💡 Хорошо сочетается с `ruby-align`:
```css
.combined-example {
  ruby-overhang: auto;
  ruby-align: space-between;
  ruby-position: over;
}
```
