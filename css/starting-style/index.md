---
title: "`@starting-style`"
description: "Директива для описания начальных стилей элемента в момент его появления на экране."
baseline:
  - group: starting-style
    features:
      - css.at-rules.starting-style
authors:
  - akhmadullin
related:
  - html/dialog
  - html/popover
  - css/opacity
tags:
  - doka
---


## Кратко

Директива `@starting-style` позволяет задать начальные стили для элемента в момент его _появления_ на странице.

## Пример

```css
.element {
  transition: background-color 0.4s ease-in;
  background-color: tomato;
}

@starting-style {
  .element {
    background-color: orange;
  }
}
```

## Как понять

При вёрстке сайтов бывает нужно привлечь внимание пользователя к появлению элемента на странице. Например, плавно сменить цвет фона блока в момент загрузки сайта. Или сделать открытие диалога плавным и аккуратным. То есть необходимо осуществить переход из начального состояния элемента в основное. При этом сделать это нужно один раз и именно в момент появления элемента на экране.

Чтобы сообщить браузеру, какие должны быть стили у элемента в его начальном состоянии, используется директива `@starting-style`.

## Как пишется

В общем виде синтаксис выглядит так:

```css
.element {
  /*
    Стили для основного состояния элемента.
    Будут применены после появления элемента на странице.
  */
}

@starting-style {
  .element {
    /*
      Стили для начального состояния элемента.
      Будут применены в момент появления элемента на странице.
    */
  }
}
```

Например:

```css
.promo-block {
  transition: opacity 0.4s ease-in;
  opacity: 1;
}

@starting-style {
  .promo-block {
    opacity: 0;
  }
}
```

В момент загрузки страницы `.promo-block` будет не виден, так как в начальном состоянии [`opacity`](/css/opacity/) равен нулю. После загрузки страницы применятся стили из основного состояния: `opacity` будет равен единице и `.promo-block` отобразится на экране.

## Использование

`@starting-style` классно подходит для добавления анимации на открытие диалога или поповера.

Например, с помощью `@starting-style` мы можем сделать появление диалога более плавным:

```css
/* стили для открытого диалога */
dialog {
  opacity: 1;
  scale: 1;
  transition:
    opacity 0.4s ease-in,
    scale 0.4s ease-in,
    display 0.4s ease-in allow-discrete;
}

/* стили для открывающегося диалога */
@starting-style {
  dialog {
    opacity: 0;
    scale: 1.1;
  }
}

/* стили для закрывающегося диалога */
dialog:not([open]) {
  opacity: 0;
  scale: 0.8;
}
```

<iframe title="Анимация появления диалога" src="demos/dialog-animation/" height="360"></iframe>

Такой же подход можно применить и для анимации поповера:

```css
[popover] {
  transition:
    opacity 0.4s ease-in,
    scale 0.4s ease-in,
    translate 0.4s ease-in,
    display 0.4s ease-in allow-discrete;
}

/* стили для открытого поповера */
[popover]:popover-open {
  opacity: 1;
  scale: 1;
  translate: 0;
}

/* стили для открывающегося поповера */
@starting-style {
  [popover]:popover-open {
    opacity: 0;
    scale: 0.5;
    translate: 0 70px;
  }
}

/* стили для закрывающегося поповера */
[popover]:not(:popover-open) {
  opacity: 0;
  scale: 0.5;
  translate: 0 50px;
}
```

<iframe title="Анимация появления поповера" src="demos/popover-animation/" height="360"></iframe>

<aside>

🚧 В Firefox плавное закрытие диалога и поповера пока не работает из-за отсутствия поддержки `transition-behavior: allow-discrete`. Проверяйте поддержку на [Can I use](https://caniuse.com/mdn-css_properties_display_is_transitionable).

</aside>

## Подсказки

💡 CSS-правила внутри `@starting-style` не вводят нового порядка в каскад стилей. Это означает, что стили внутри `@starting-style` не обязательно будут «важней» стилей, описанных снаружи. Чтобы гарантировать, что стили начального состояния не будут перезаписаны стилями основного состояния, помещайте `@starting-style` после объявлений основных стилей элемента.
