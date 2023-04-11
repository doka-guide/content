---
title: "`.style`"
description: "Меняем CSS-стили из кода."
authors:
  - bespoyasov
related:
  - css/specificity
  - js/dom
  - tools/code-style
tags:
  - doka
---

## Кратко

Свойство [`style`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) получает и устанавливает инлайновые стили элемента, то есть те, что записываются через [HTML-атрибут `style`](/html/style/).

С помощью него можно управлять стилем элемента. [Специфичность](/css/specificity/) этого свойства такая же, как у атрибута `style`.

## Как пишется

Чтобы получить значения инлайновых стилей с помощью свойства `style`, мы можем записать:

```js
const element = document.getElementById('someElement')
const inlineStyles = element.style
```

В этом случае в значение `inlineStyles` запишется объект [`CSSStyleDeclaration`](https://developer.mozilla.org/ru/docs/Web/API/CSSStyleDeclaration), который будет содержать в себе все инлайновые стили элемента `element`.

Чтобы задать стили для элемента, мы можем использовать несколько способов. Либо через `cssText`, чтобы указать несколько свойств разом. (Тем же эффектом обладает установка стиля через `setAttribute()`.) Либо через отдельные свойства в `style.[propertyName]`.

Следующие две записи работают одинаково и устанавливают несколько стилей в одном выражении:

```js
element.style.cssText = 'color: blue; border: 1px solid black'
element.setAttribute('style', 'color:red; border: 1px solid blue;')
```

Следующая — устанавливает значение определённого свойства, оставляя другие значения стиля нетронутыми:

```js
element.style.color = 'blue'
```

## Как понять

Свойство [`style`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) — это механизм для работы со стилями на элементе. С его помощью можно управлять отображением элементов в «рантайме», то есть во время выполнения скрипта.

Этот механизм позволяет «перетирать» стили, описанные в CSS-таблицах, так как специфичность стилей в атрибуте `style` выше (за исключением стилей с [`!important`](/css/important/)).

Чтобы указать значение конкретного CSS-свойства, мы можем использовать одноимённое отображение в `style`:

```js
// Если мы хотим указать color:
element.style.color = 'red' // или 'rgb(255,0,0)', или '#f00'

// Если хотим указать font-family:
element.style.fontFamily = 'Arial'
```

Обратите внимание, что имена свойств в `style.[propertyName]` записываются в camelCase, в отличие от CSS-свойств, которые записываются через дефис.

Таким образом `font-family` превращается в `fontFamily`, а, например, `background-color` — в `backgroundColor`.

При сомнениях в том, как правильно называется то или иное свойство, воспользуйтесь списком соответствий:

<details>
  <summary>CSS-свойства в JS-нотации</summary>

| CSS | JavaScript |
| --- | --- |
| [background](/css/background/) | background |
| [background-attachment]() | backgroundAttachment |
| [background-color](/css/background-color/) | backgroundColor |
| [background-image](/css/background-image/) | backgroundImage |
| [background-position](/css/background-position/) | backgroundPosition |
| [background-repeat](/css/background-repeat/) | backgroundRepeat |
| [border](/css/border/) | border |
| [border-bottom](/css/border/) | borderBottom |
| [border-bottom-color](/css/border/) | borderBottomColor |
| [border-bottom-style](/css/border/) | borderBottomStyle |
| [border-bottom-width](/css/border/) | borderBottomWidth |
| [border-color](/css/border-color/) | borderColor |
| [border-left](/css/border/) | borderLeft |
| [border-left-color](/css/border/) | borderLeftColor |
| [border-left-style](/css/border/) | borderLeftStyle |
| [border-left-width](/css/border/) | borderLeftWidth |
| [border-right](/css/border/) | borderRight |
| [border-right-color](/css/border/) | borderRightColor |
| [border-right-style](/css/border/) | borderRightStyle |
| [border-right-width](/css/border/) | borderRightWidth |
| [border-style](/css/border-style/) | borderStyle |
| [border-top](/css/border/) | borderTop |
| [border-top-color](/css/border/) | borderTopColor |
| [border-top-style](/css/border/) | borderTopStyle |
| [border-top-width](/css/border/) | borderTopWidth |
| [border-width](/css/border-width/) | borderWidth |
| [clear]() | clear |
| [clip]() | clip |
| [color](/css/color/) | color |
| [cursor](/css/cursor/) | cursor |
| [display](/css/display/) | display |
| [filter]() | filter |
| [float](/css/float/) | cssFloat |
| [font]() | font |
| [font-family](/css/font-family/) | fontFamily |
| [font-size](/css/font-size/) | fontSize |
| [font-variant]() | fontVariant |
| [font-weight](/css/font-weight/) | fontWeight |
| [height](/css/height/) | height |
| [left]() | left |
| [letter-spacing](/css/letter-spacing/) | letterSpacing |
| [line-height](/css/line-height/) | lineHeight |
| [list-style]() | listStyle |
| [list-style-image](/css/list-style-image/) | listStyleImage |
| [list-style-position](/css/list-style-position/) | listStylePosition |
| [list-style-type](/css/list-style-type/) | listStyleType |
| [margin](/css/margin/) | margin |
| [margin-bottom](/css/margin/#kratko) | marginBottom |
| [margin-left](/css/margin/#kratko) | marginLeft |
| [margin-right](/css/margin/#kratko) | marginRight |
| [margin-top](/css/margin/#kratko) | marginTop |
| [overflow](/css/overflow/) | overflow |
| [padding](/css/padding/) | padding |
| [padding-bottom](/css/padding/#kratko) | paddingBottom |
| [padding-left](/css/padding/#kratko) | paddingLeft |
| [padding-right](/css/padding/#kratko) | paddingRight |
| [padding-top](/css/padding/#kratko) | paddingTop |
| [page-break-after]() | pageBreakAfter |
| [page-break-before]() | pageBreakBefore |
| [position](/css/position/) | position |
| [stroke-dasharray]() | strokeDasharray |
| [stroke-dashoffset]() | strokeDashoffset |
| [stroke-width]() | strokeWidth |
| [text-align](/css/text-align/) | textAlign |
| [text-decoration](/css/text-decoration/) | textDecoration |
| [text-indent]() | textIndent |
| [text-transform](/css/text-transform/) | textTransform |
| [top]() | top |
| [vertical-align](/css/vertical-align/) | verticalAlign |
| [visibility](/css/visibility/) | visibility |
| [width](/css/width/) | width |

</details>
