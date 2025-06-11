---
title: "@view-transition"
description: "CSS-правило для создания плавных анимаций при переходе между страницами."
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
  :root {
    --demo-iframe-background-color: #f5f5f5;
  }

  @media (prefers-color-scheme: light) {
    :root {
      --demo-iframe-background-color: #f5f5f5;
    }
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --demo-iframe-background-color: #121212;
    }
  }

  .demo-iframe {
    background-color: var(--demo-iframe-background-color) !important;
  }
</style>

## Кратко

`@view-transition` — это CSS-директива для создания плавных анимаций перехода между страницами сайта.

## Пример

Настроить переход можно в одно правило. Браузер применит дефолтную cross-fade анимацию:

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

Полный пример.

<iframe id="mpa" class="demo-iframe" title="Переход между страницами" src="demos/mpa/" height="600"></iframe>

Обратите внимание, как анимация повторяется: обе страницы исчезают и появляются одинаково. Такой эффект даёт использование парных анимаций.

- Главная появляется через `zoomIn`, а предыдущая страница уходит через `slideOut`.
- Страница детального описания появляется через `slideIn`, а предыдущая уходит через `zoomOut`.

В примере всего две страницы, но этот паттерн можно легко масштабировать. Он отлично подходит для создания визуальной иерархии между переходами.

## Как пишется

Базовый синтаксис:

```css
@view-transition {
  navigation: auto;
}
```

Свойство `navigation` внутри директивы принимает два звачения:

- `none` — значение по умолчанию, плавные переходы отключены.
- `auto` — браузер применяет стандартную анимацию перехода.

Опциональная настройка анимации перехода:

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

Теперь `header` будет анимироваться независимо от основного перехода страницы. Ниже пример.

<iframe class="demo-iframe" id="mpa-with-granular-animations" title="Гранулярная анимация" src="demos/mpa-with-granular-animations/" height="600"></iframe>

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
