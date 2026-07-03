---
title: "`::details-content`"
description: "Псевдоэлемент для стилизации содержимого [`<details>`](/html/details/), исключая заголовок [`<summary>`](/html/summary/). Удобен для оформления и анимации раскрывающейся части."
baseline:
  - group: details-content
    features:
      - css.selectors.details-content
authors:
  - drakesbot12
related:
  - html/details
  - css/opacity
  - css/pseudoelements
keywords:
  - details
  - раскрывающийся блок
  - summary
  - content
tags:
  - doka
---

## Кратко

`::details-content` — псевдоэлемент, представляющий содержимое элемента [`<details>`](/html/details/) без его заголовка [`<summary>`](/html/summary/). Позволяет отдельно стилизовать и анимировать раскрывающуюся часть.

## Пример

```html
<details>
  <summary>Подробнее</summary>
  <p>Контент, который можно стилизовать через ::details-content.</p>
</details>
```

```css
/* Применяем стили только если поддерживается селектор */
@supports selector(::details-content) {
  details::details-content {
    padding: 12px 16px;
    background: #111216;
    border-radius: 0 0 12px 12px;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity .2s ease, transform .2s ease;
  }

  details[open]::details-content {
    opacity: 1;
    transform: translateY(0);
  }
}
```

<iframe title="Стилизация и анимация раскрывающегося содержимого через ::details-content" src="demos/basic/" height="380"></iframe>

## Как пишется

Синтаксис простой:

```css
details::details-content { /* стили */ }
```

Псевдоэлемент существует только у [`<details>`](/html/details/). Удобно оборачивать стили в [`@supports selector(::details-content)`](/css/supports/), чтобы избежать неожиданных эффектов в неподдерживающих браузерах.

## Как понять

Раньше, чтобы отдельно стилизовать «контент без заголовка», приходилось добавлять обёртки в разметку или использовать селекторы по соседям/детям. `::details-content` даёт прямую точку стилизации для раскрывающейся части и упрощает анимации появления/исчезновения.

## Подсказки

💡 Для плавного появления используйте сочетание [`opacity`](/css/opacity/) и [`transform`](/css/transform/); геометрические свойства (`height`) анимируются хуже.
💡 Добавляйте скругления отдельно для контента (нижние углы), а у [`<summary>`](/html/summary/) — верхние, чтобы визуально объединить блоки.
💡 Обязательно тестируйте в целевых браузерах; при отсутствии поддержки используйте неблокирующий фоллбек.
