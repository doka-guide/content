---
title: "Наследование"
description: "Некоторые CSS-свойства применяются не только к самому элементу, но и к его детям."
authors:
  - realetive
contributors:
  - skorobaeus
related:
  - css/specificity
  - css/all
  - css/global-keywords
tags:
  - article
---

## Кратко

**Наследование в CSS** — это способность элементов-_потомков_ перенимать правила форматирования (свойства CSS), которые присвоены их _предкам_.

## Пример

```html
<p style="color: red">
  Весь <span>текст</span> в <em>этом</em> абзаце будет <b>красным</b>.
</p>
```

## Как понять

Для некоторых HTML-тегов предопределены особые CSS-свойства по умолчанию (их ещё называют `user agent`-стили или стили от браузера), которые характерны только для _конкретно этих элементов_, например, `margin: 8px` для [`<body>`](/html/body/), `color: #00c` для ссылок или `font-weight: bolder` для [`<b>`](/html/b/). Их можно переопределить, но некоторые свойства (цвета текста, размера шрифта, внешнего вида курсора и другие) будут применяться для любых вложенных элементов, пока для них не будет указано иного значения. Такая наследуемость не случайна и обусловлена одним очень интересным CSS-значением у этих свойств — `inherit`, что буквально и значит «наследуемое».

Если у какого-то свойства указать значение `inherit` — оно будет взято у верхнего «родителя». Для некоторых CSS-свойств это значение указано по умолчанию.

## Наследуемые свойства

- Свойства шрифта: [`font`](/css/font/) и его «производных»: [`font-style`](/css/font-style/), [`font-variant`](/css/font-variant/), [`font-weight`](/css/font-weight/), [`font-stretch`](/css/font-stretch/), [`font-size`](/css/font-size/) и [`font-family`](/css/font-family/); [`color`](/css/color/) и [`line-height`](/css/line-height/).
- Свойства межбуквенных и «межсловных» расстояний: [`letter-spacing`](/css/letter-spacing/), [`word-spacing`](/css/word-spacing/) и [`white-space`](/css/white-space/).
- Параметры текста: [`text-align`](/css/text-align/), [`text-indent`](/css/text-indent/), [`text-shadow`](/css/text-shadow/), [`text-transform`](/css/text-transform/);
- оформление пунктов списков: [`list-style`](/css/list-style/), [`list-style-type`](/css/list-style-type/), [`list-style-position`](/css/list-style-position/).
- Внешний вид курсора: [`cursor`](/css/cursor/) и отображение содержимого элемента [`visibility`](/css/visibility/).

Например, в отличие от `color`, который применится к подписи, ненаследуемое свойство [`border`](/css/border/) не будет применено к вложенным элементам:

```html
<figure>
  <img src="doggo-up.svg">
  <figcaption>Дока Дог</figcaption>
</figure>
```

```css
figure {
  border: 3px solid #18191c;
  color: blue;
}
```

<iframe title="Наследование цвета" src="demos/color-inheritance/" height="370"></iframe>

Но если мы укажем у [`<img>`](/html/img/) свойство `border` как `inherit` (т. е. наследуемое):

```css
img {
  border: inherit;
}
```

<iframe title="Наследование рамки" src="demos/border-inheritance/" height="370"></iframe>

## Подсказки

💡 Другой пример наследования — использование вместо указания цвета значения `currentColor`, который равен цвету текста текущего элемента, т. е. значению свойства `color`. Если `color` текущего элемента равен `inherit` (т. е. наследует значение «родителя»), то и `currentColor` также будет соответствовать текущему значению `color` «родителя». Причём это ключевое слово можно указывать в качестве значения для любого свойства, где значением является цвет, не только для `color`. См. раздел «На практике».

Значения [`rem` и `em`](/css/rem-em/) — также частный случай наследования кратного размера текста («родителя», если указан `em` и корневого тега в случае с `rem`).

Полный список наследуемых по умолчанию CSS-свойств помечен в [спецификации](https://www.w3.org/TR/CSS22/propidx.html) в колонке «Inherited?» значением `yes`.

Значение любого CSS-свойства можно «позаимствовать» (унаследовать) у родителя. Если «родителя» нет, `inherit` будет соответствовать значению по умолчанию для этого элемента.
