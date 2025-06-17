---
title: "@view-transition"
description: "Создаём плавные анимации при переходе между страницами."
baseline:
  - group: cross-document-view-transitions
    features:
      - css.at-rules.view-transition
authors:
  - kotosha-real
keywords:
  - анимированная навигация
  - плавная навигация
  - анимированные переходы
  - плавные переходы
related:
  - css/transition
  - css/animation
  - css/transform
tags:
  - doka
---

<style>
  .demo-iframe {
    background-color: #18191C !important;
  }
</style>

## Кратко

`@view-transition` — это CSS-директива для создания плавных анимаций перехода между страницами сайта.

## Пример

Настроить переход можно в одно правило. Браузер применит дефолтную _cross-fade_ анимацию:

```css
@view-transition {
  navigation: auto;
}
```

Если нужно закастомить, можно добавить свою:

```css
::view-transition-old(root) {
  animation: 0.3s ease-in-out both slideOut;
}

::view-transition-new(root) {
  animation: 0.3s ease-in-out both zoomIn;
}
```

Вот что получится:

<iframe id="mpa" class="demo-iframe" title="Переход между страницами" src="demos/mpa/" height="500"></iframe>

Обратите внимание, как анимация повторяется: обе страницы исчезают и появляются одинаково. Такой эффект даёт использование парных анимаций.

- Главная появляется через `zoomIn`, уходит через `zoomOut`.
- Страница подробностей появляется через `slideIn`, уходит через `slideOut`.

Тонкость в том, что мы можем описать уходящую анимацию только в новой странице. Поэтому уходящая анимация `zoomOut` описана на странице подробностей, а `slideOut` — на главной.

При должной аккуратности этот паттерн можно легко масштабировать. Он отлично подходит для создания визуальной иерархии между переходами.

## Как пишется

Базовый синтаксис:

```css
@view-transition {
  navigation: auto;
}
```

Свойство `navigation` внутри директивы принимает одно из двух значений:

- `none` — значение по умолчанию, плавные переходы отключены.
- `auto` — браузер применяет стандартную анимацию перехода.

Вот как добавить свою анимацию перехода:

```css
::view-transition-old(root) {
  animation: 0.3s ease-in-out both slideOut;
}

::view-transition-new(root) {
  animation: 0.3s ease-in-out both zoomIn;
}
```

## Как понять

`@view-transition` работает как контейнер для определения правил перехода между страницами. При навигации браузер автоматически создаёт анимацию перехода при указанном `@view-transition`.

Обе страницы должны находиться на одном `origin`. `origin` — это комбинация протокола, домена и порта (если он указан). Например, `doka.guide` — это домен, а `https://doka.guide` — `origin`.

## Опциональная анимация

По умолчанию директива `@view-transition` со значением `auto` применяется всегда. При желании её можно ограничить с помощью условных директив.

Например, можно пощадить пользователей, которые предпочитают минимальное количество анимаций:

```css
@media screen and (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
  }
}
```

Или включить плавные переходы только для определённых размеров экрана:

```css
@media screen and (width > 70em) {
  @view-transition {
    navigation: auto;
  }
}
```

## Гранулярная анимация

Помимо анимации всей страницы, можно независимо анимировать отдельные элементы. Для этого нужно:

1. Задать уникальное имя перехода с помощью свойства `view-transition-name`.
2. Задать отдельную анимацию для перехода.

```css
header {
  view-transition-name: header;
}

::view-transition-old(header) {
  animation: 0.3s ease-in-out both fadeOut;
}

::view-transition-new(header) {
  animation: 0.3s ease-in-out both fadeIn;
}
```

Теперь `<header>` будет анимироваться независимо от основного перехода страницы. Ниже пример.

<iframe class="demo-iframe" id="mpa-with-granular-animations" title="Гранулярная анимация" src="demos/mpa-with-granular-animations/" height="500"></iframe>

<script>
  const initiallyNormalizedIframes = {};

  window.addEventListener('message', ({ data }) => {
    try {
      if ('id' in data && 'height' in data) {
        const { id, height } = data;
        const iframe = document.getElementById(id);

        if (iframe) {
          if (!initiallyNormalizedIframes[id]) {
            iframe.setAttribute('height', height);
            initiallyNormalizedIframes[id] = true;
          }

          if (iframe.getBoundingClientRect().height < height) {
            iframe.setAttribute('height', height);
          }
        }
      }
    } catch (err) {
      console.warn(err);
    }
  });
</script>
