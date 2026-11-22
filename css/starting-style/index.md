---
title: "`@starting-style`"
description: "Директива для описания начальных стилей элемента в момент его появления на экране."
baseline:
  - group: starting-style
    features:
      - css.at-rules.starting-style
authors:
  - akhmadullin
contributors:
  - solarrust
related:
  - html/dialog
  - html/popover
  - css/opacity
tags:
  - doka
---

## Кратко

Директива `@starting-style` задаёт начальные стили, с которых начинается плавный переход ([`transition`](/css/transition/)), когда элемент _появляется_ на странице.

## Пример

```css
.banner {
  transition: background-color 0.4s ease-in;
  background-color: tomato;
}

@starting-style {
  .banner {
    background-color: orange;
  }
}
```

## Как понять

Иногда элемент должен появиться плавно: например, блок при загрузке сайта или диалог при открытии.

Обычный `transition` тут не поможет. Он срабатывает, когда стили элемента меняются. У только что появившегося элемента нет прошлых стилей, от которых можно начать переход. Директива `@starting-style` задаёт для него начальные стили.

Браузер применяет начальные стили каждый раз, когда у элемента нет прошлых стилей:

- при загрузке страницы;
- при вставке элемента в DOM;
- когда сам элемент или его предок перестаёт быть [`display: none`](/css/display/), например при каждом открытии диалога.

От начальных стилей браузер запускает переход к основным. Когда меняются стили уже видимого элемента, `@starting-style` не участвует.

## Как пишется

В общем виде синтаксис выглядит так:

```css
.element {
  /*
    Стили для основного состояния элемента.
    Действуют после появления элемента на странице.
  */
}

@starting-style {
  .element {
    /*
      Стили для начального состояния элемента.
      Действуют в момент появления элемента на странице.
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

Когда `.promo-block` появится на странице, браузер возьмёт [`opacity: 0`](/css/opacity/) из `@starting-style` как начальное значение и за 0,4 секунды плавно доведёт его до `1`.

## Использование

С `@starting-style` плавно открываются [диалог](/html/dialog/) и [поповер](/html/popover/). Например, так появляется диалог:

```css
/* Стили для открытого диалога */
dialog {
  opacity: 1;
  scale: 1;
  transition:
    opacity 0.4s ease-in,
    scale 0.4s ease-in,
    display 0.4s ease-in allow-discrete,
    overlay 0.4s ease-in allow-discrete;
}

/* Стили для открывающегося диалога */
@starting-style {
  dialog {
    opacity: 0;
    scale: 1.1;
  }
}

/* Стили для закрывающегося диалога */
dialog:not([open]) {
  opacity: 0;
  scale: 0.8;
}
```

На закрытие `@starting-style` не влияет. Для плавного закрытия нужны ещё два перехода. Переход `display` с ключевым словом `allow-discrete` держит закрывающийся диалог видимым, пока идёт переход. Переход `overlay` на это время оставляет диалог в верхнем слое, поверх остального содержимого страницы.

Подложке [`::backdrop`](/css/backdrop/) у модального диалога нужен отдельный переход со своими начальными стилями:

```css
dialog::backdrop {
  background-color: rgb(0 0 0 / 0);
  transition:
    background-color 0.4s ease-in,
    display 0.4s ease-in allow-discrete,
    overlay 0.4s ease-in allow-discrete;
}

dialog[open]::backdrop {
  background-color: rgb(0 0 0 / 0.5);
}

@starting-style {
  dialog[open]::backdrop {
    background-color: rgb(0 0 0 / 0);
  }
}
```

<iframe title="Анимация появления диалога" src="demos/dialog-animation/" height="360"></iframe>

Так же можно сделать переход для поповера:

```css
[popover] {
  transition:
    opacity 0.4s ease-in,
    scale 0.4s ease-in,
    translate 0.4s ease-in,
    display 0.4s ease-in allow-discrete,
    overlay 0.4s ease-in allow-discrete;
}

/* Стили для открытого поповера */
[popover]:popover-open {
  opacity: 1;
  scale: 1;
  translate: 0;
}

/* Стили для открывающегося поповера */
@starting-style {
  [popover]:popover-open {
    opacity: 0;
    scale: 0.5;
    translate: 0 70px;
  }
}

/* Стили для закрывающегося поповера */
[popover]:not(:popover-open) {
  opacity: 0;
  scale: 0.5;
  translate: 0 50px;
}
```

<iframe title="Анимация появления поповера" src="demos/popover-animation/" height="360"></iframe>

<aside>

🚧 Появление работает во всех современных браузерах. С закрытием модального диалога и поповера сложнее, потому что не везде есть переход `display` и свойство `overlay`:

- В Firefox нет ни того, ни другого. Диалог и поповер закрываются сразу.
- Safari анимирует `display` с версии 18, но не поддерживает `overlay`. При закрытии элемент сразу покидает верхний слой.

Из-за этого модальный диалог в Safari теряет подложку. Он прыгает туда, где стоит в разметке, поверх соседних элементов, и только потом гаснет.

Поповер в Safari при закрытии тоже гаснет плавно, но на время перехода выходит из верхнего слоя. Его могут перекрыть другие элементы. А если у предка задан [`transform`](/css/transform/), поповер сместится к этому предку.

Чтобы диалог не прыгал, выключите `allow-discrete` в браузерах без `overlay`. Тогда диалог закроется сразу, как в Firefox:

```css
@supports not (overlay: auto) {
  dialog {
    transition-behavior: normal;
  }
}
```

Используйте тот же селектор, что и в правиле с `transition`, и поставьте блок после этого правила. Иначе оно вернёт `allow-discrete`.

</aside>

## Подсказки

💡 `@starting-style` не повышает [специфичность](/css/specificity/) и не меняет порядок [каскада](/css/cascade/). Поэтому ставьте `@starting-style` после основных стилей элемента, иначе основные стили перезапишут начальные. Порядок решает, только если у селекторов одинаковая специфичность.

💡 Движение на экране мешает людям с вестибулярными нарушениями. Если пользователь [уменьшил анимацию](/a11y/prefers-reduced-motion/) в настройках системы, уберите масштаб и сдвиг из начального и закрытого состояний:

```css
@media (prefers-reduced-motion: reduce) {
  dialog:not([open]),
  [popover]:not(:popover-open) {
    scale: 1;
    translate: 0;
  }

  @starting-style {
    dialog,
    [popover]:popover-open {
      scale: 1;
      translate: 0;
    }
  }
}
```

Переходы остались прежними, но `scale` и `translate` больше не меняются. Поэтому диалог и поповер только плавно появляются и гаснут. Поставьте этот блок после основных стилей диалога и поповера.
