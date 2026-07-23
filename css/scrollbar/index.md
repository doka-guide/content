---
title: "`::-webkit-scrollbar`"
description: "Нестандартные псевдоэлементы для стилизации полосы прокрутки в движках WebKit/Blink. Позволяют изменять трек, ползунок и другие части скроллбара."
authors:
  - drakesbot12
related:
  - css/overflow
  - css/scrollbar-color
  - css/pseudoelements
keywords:
  - скроллбар
  - scrollbar
  - прокрутка
  - полоса
  - прокрутки
  - webkit
  - blink
tags:
  - doka
---

## Кратко

`::-webkit-scrollbar` и родственные ему псевдоэлементы — это нестандартный способ стилизовать полосу прокрутки в браузерах на движках WebKit/Blink (Chrome, Edge, Safari, Opera). Можно менять толщину, цвета, скругления и состояния отдельных частей скроллбара. Спецификации у этих селекторов нет, поведение и поддержка могут меняться.

## Пример

```css
/* Общая ширина скроллбара */
*::-webkit-scrollbar {
  width: 12px;   /* вертикальный */
  height: 12px;  /* горизонтальный */
}

/* Трек (фон) */
*::-webkit-scrollbar-track {
  background: #1e1f22;
}

/* Ползунок */
*::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 8px;
  border: 3px solid #1e1f22; /* создаём «внутренний отступ» */
}

/* Состояние при наведении */
*::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
```

```html
<div class="scrollbox">
  Очень длинный контент... Очень длинный контент... Очень длинный контент...
</div>
```

```css
.scrollbox {
  max-height: 180px;
  overflow: auto;
  padding: 12px;
  background: #111216;
  color: #fff;
  border-radius: 12px;
}
```

<iframe title="Пример с несколькими разными скроллбарами" src="demos/basic/" height="400"></iframe>

## Как пишется

Семейство нестандартных псевдоэлементов:

- `::-webkit-scrollbar` — вся полоса прокрутки (задаёт размеры);
- `::-webkit-scrollbar-thumb` — ползунок;
- `::-webkit-scrollbar-track` — трек (фон);
- `::-webkit-scrollbar-track-piece` — участок трека, не занятый ползунком;
- `::-webkit-scrollbar-button` — кнопки со стрелками;
- `::-webkit-scrollbar-corner` — уголок при одновременных осях;
- `::-webkit-resizer` — «хваталка» для изменения размера в углу.

Используются как обычные псевдоэлементы:

```css
.container::-webkit-scrollbar-thumb { background: #888; }
```

## Как понять

- Это WebKit/Blink‑специфика. В Firefox эти селекторы не работают. Для Firefox есть стандартные свойства [`scrollbar-width`](/css/scrollbar-width/) и [`scrollbar-color`](/css/scrollbar-color/).
- Рендер и доступные свойства могут отличаться между браузерами и версиями. Считайте это «best‑effort» API без гарантий стабильности.

## Подсказки

💡 Избегайте слишком толстых/ярких скроллбаров — они могут мешать контенту.
💡 Чтобы создать «зазор» внутри ползунка, используйте [`border`](/css/border/) цвета трека.
💡 Проверьте тёмную/светлую темы и контрастность, особенно у `thumb` и `track`.
💡 Для достижения наилучшей кроссбраузерности и контроля над стилями:

- Стандартные свойства ([`scrollbar-width`](/css/scrollbar-width/), [`scrollbar-color`](/css/scrollbar-color/)) работают во всех современных браузерах (Chrome 121+, Edge 121+, Firefox 64+, Safari 18.2+) и должны использоваться как основной способ стилизации;
- Для более тонкой настройки (скругления, цвета фона трека и точная ширина), которые не доступны через стандартные свойства, используйте семейство `::-webkit-scrollbar`;
- Важно! В браузерах на основе Chromium (Chrome, Edge) стандартные свойства имеют приоритет. Чтобы ваши стили на основе `::-webkit-scrollbar` гарантированно применялись, убедитесь, что вы не задали конфликтующие значения для [`scrollbar-width`](/css/scrollbar-width/) и [`scrollbar-color`](/css/scrollbar-color/) в том же блоке правил.
