---
title: "`overscroll-behavior`"
description: "Задаёт поведение прокрутки при достижении границы элемента."
baseline:
  - group: overscroll-behavior
    features:
      - css.properties.overscroll-behavior
      - css.properties.overscroll-behavior-block
      - css.properties.overscroll-behavior-block.auto
      - css.properties.overscroll-behavior-block.contain
      - css.properties.overscroll-behavior-block.none
      - css.properties.overscroll-behavior-inline
      - css.properties.overscroll-behavior-inline.auto
      - css.properties.overscroll-behavior-inline.contain
      - css.properties.overscroll-behavior-inline.none
      - css.properties.overscroll-behavior-x
      - css.properties.overscroll-behavior-x.auto
      - css.properties.overscroll-behavior-x.contain
      - css.properties.overscroll-behavior-x.none
      - css.properties.overscroll-behavior-y
      - css.properties.overscroll-behavior-y.auto
      - css.properties.overscroll-behavior-y.contain
      - css.properties.overscroll-behavior-y.none
      - css.properties.overscroll-behavior.auto
      - css.properties.overscroll-behavior.contain
      - css.properties.overscroll-behavior.none
authors:
  - akhmadullin
related:
  - css/overflow
  - css/scroll-behavior
  - css/scroll-padding
tags:
  - doka
---

## Кратко

Свойство `overscroll-behavior` контролирует, как браузер реагирует на достижение конца области прокрутки.

## Пример

```css
.element {
  overscroll-behavior: contain;
}
```

## Как понять

Допустим, есть два вложенных друг в друга элемента. У обоих есть прокрутка. Если пользователь пролистает дочерний элемент, то при достижении его границы прокрутка перейдет на родительский элемент. Подобное поведение называется _цепочкой прокрутки_.

<iframe title="Цепочки прокрутки" src="demos/scroll-chaining/" height="550"></iframe>

Этот пример лучше смотреть с телефона. В мобильных браузерах при достижении границы прокрутки контент элемента немного оттягивается в направлении скролла, создавая _эффект отскока_.

<iframe title="Эффект отскока" src="demos/bounce-effect/" height="350"></iframe>

Изменить поведение прокрутки в обоих примерах может свойство `overscroll-behavior`. С его помощью можно настроить прокрутку так, чтобы вложенные элементы не передавали скролл родителю, а страница не прыгала при достижении границ.

Синтаксис свойства позволяет задать два значения — для оси _x_ и оси _y_. Если указано одно значение, оно применится к обеим осям. Можно использовать самостоятельные CSS-свойства `overscroll-behavior-x` и `overscroll-behavior-y` для отдельных осей или их логические эквиваленты `overscroll-behavior-inline`, `overscroll-behavior-block`.

## Как пишется

Возможные значения `overscroll-behavior`:

- `auto` — значение по умолчанию. При достижении границы элемента создаётся цепочка прокрутки либо эффект отскока в зависимости от устройства;
- `contain` — предотвращает создание цепочек прокрутки, но сохраняет эффект отскока;
- `none` — отключает создание цепочек прокрутки и эффект отскока.

## Использование

```css
.overscroll-behavior-auto {
  overscroll-behavior: auto;
}

.overscroll-behavior-contain {
  overscroll-behavior: contain;
}

.overscroll-behavior-none {
  overscroll-behavior: none;
}
```

Попробуйте прокрутить дочерний элемент, применяя разные значения свойства `overscroll-behavior`.

<iframe title="Варианты поведения прокрутки" src="demos/values/" height="600"></iframe>

## На практике

Свойство `overscroll-behavior` со значением `contain` может пригодиться при создании диалоговых окон или каруселей. Оно предотвратит выход скролла за пределы элементов.

<iframe title="Предотвращение выхода прокрутки за пределы диалога" src="demos/dialog/" height="500"></iframe>

Значение `none` поможет в разработке одностраничных приложений (_SPA_). Оно отключит эффект отскока, который в мобильных браузерах может вызвать ненужную перезагрузку страницы.
