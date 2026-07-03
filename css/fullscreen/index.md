---
title: "`:fullscreen`"
description: "Совпадает с элементом, который отображается в режиме полноэкранного просмотра (Fullscreen API). Полезно менять оформление контента на весь экран."
baseline:
  - group: fullscreen
    features:
      - css.selectors.fullscreen
authors:
  - drakesbot12
keywords:
  - fullscreen
  - полноэкранный режим
  - Fullscreen API
  - псевдокласс
related:
  - css/picture-in-picture
  - html/video
  - html/audio
tags:
  - doka
---

## Кратко

`:fullscreen` — CSS‑псевдокласс, который совпадает с элементом, переведённым в полноэкранный режим с помощью Fullscreen API. Можно использовать для изменения размеров, скрытия интерфейса страницы и адаптации контента «на весь экран».

## Пример

Ниже фрагмент, показывающий, как можно адаптировать элемент и соседние части интерфейса при входе в полноэкранный режим. Вызов/выход осуществляется через Fullscreen API из JavaScript.

```css
/* Сам элемент во фуллскрине: убираем скругления, растягиваем */
.viewer:fullscreen {
  border-radius: 0;
  width: 100vw;
  height: 100vh;
}

/* Скрыть шапку и подвал страницы, пока активен фуллскрин */
.viewer:fullscreen ~ header,
.viewer:fullscreen ~ footer {
  display: none;
}

/* Кастомные контролы поверх контента во фуллскрине */
.viewer:fullscreen .controls {
  position: fixed;
  left: 20px;
  bottom: 20px;
}
```

```js
// Вход в полноэкранный режим
const el = document.querySelector('.viewer')
await el.requestFullscreen()

// Выход из полноэкранного режима
await document.exitFullscreen()
```

<iframe title="Пример псевдокласса :fullscreen" src="/demos/basic/" height="610"></iframe>

## Как понять

Fullscreen API выводит выбранный элемент (а не всю страницу) на весь экран. Пока элемент в таком режиме, к нему применяется `:fullscreen`. Это состояние снимается при выходе из полноэкранного режима или по инициативе пользователя.

Псевдокласс — только про оформление. Управление режимом делается из JavaScript: `Element.requestFullscreen()` и `document.exitFullscreen()`.

## Подсказки

💡 Скрывайте не относящийся к контенту интерфейс в `:fullscreen`, чтобы не отвлекать пользователя.
💡 Используйте фиксированное позиционирование контролов и увеличивайте размеры кликабельных областей на весь экран.
💡 Для кросс‑браузерности учитывайте, что некоторые элементы (например, встроенные видео) могут иметь собственные системные панели во фуллскрине.
