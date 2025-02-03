---
title: "`logical-properties-css`"
description: "Как сделать свой интерфейс более универсальным и гибким, который адаптируется к любым обстоятельствам."
authors:
  - anastasiyayarosh
keywords:
  - logical-properties
  - логический css
  - rtl
  - ltr
related:
  - css/margin
  - css/padding
  - css/root
tags:
  - article
---

## Кратко
Изначально интернет основан на загрузке документов, интерфейсы были достаточно простыми, никто не думал о многоязычных 
Using logical properties when writing CSS allows your code to adapt more naturally 
to various text directions and writing modes, such as left-to-right (LTR), right-to-left (RTL), or even vertical text.

Unlike traditional properties like margin-left or padding-top, logical properties help future-proof your designs by removing assumptions about content flow and the needs of your site visitors.

Rather than thinking in fixed directions, logical properties enable your designs to adapt automatically. This improves both consistency and flexibility, making your CSS more scalable and versatile for the different contexts it may encounter.
<!-- В основном разработчики мыслят физическими терминами право-лево и верх-низ. Изначально интернет предназначался в основном для загрузки документов, не для сайтов со сложной структурой, как сейчас. В тот момент никто не учитывал потребностей многоязычных сайтов с отличным от европейских языков написанием. Новые логические свойства дают гораздо больше возможностей управлять интерфейсами, независимо от того, на каком они языке (английский, арабский, японский или другие), с минимальными изменениями стилей. -->

## Пример

```css
.card {
  padding-inline-start: 2.5rem;
  padding-inline-end: 1rem;
  border-inline-start: 6px solid blue;
}
```

## Подробнее о проблематике

## Как пишется



## Как понять

## А как раньше?

Раньше переменные в Sass были лучшим способом поддержки сайтов с языками, пишущимися в разные стороны (RTL и LTR). Если вы хотите узнать больше, то почитайте мою статью «The Best Way to RTL Websites with Sass!»
Новые логические свойства дают нам гораздо больше возможностей управлять нашими сайтами, независимо от того, на каком они языке (английский, арабский, японский или другие), с минимальными изменениями стилей.

### Мыслить логическими CSS-свойствами

## Tailwind и логические свойства CSS

В Tailwind постепенно появилась поддержка логических свойств CSS, которая позволяет делает современные интерфейсы с гибкой раскладкой.

## Вспомогательные инструменты

Для преобразования обычного CSS, основанного на физических свойствах, в логический, можно использовать онлайн конвертеры, например, [такой](https://rtlcss.com/playground/index.html). Конечно, полагаться на 100% на него не стоит, за любым инструментом нужно перепроверять конечный результат.

## Подсказки

