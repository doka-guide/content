---
title: "`::-webkit-scrollbar`"
description: "Нестандартные псевдоэлементы для стилизации полосы прокрутки в движках WebKit/Blink. Позволяют изменять трек, ползунок и другие части полосы."
authors:
  - drakesbot12
contributors:
  - solarrust
related:
  - css/overflow
  - css/scrollbar-color
  - css/scrollbar-width
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

`::-webkit-scrollbar` и родственные ему псевдоэлементы стилизуют полосу прокрутки, или скроллбар. С ними можно менять толщину, цвета, скругления и состояния отдельных частей полосы. Это нестандартный способ: спецификации у этих псевдоэлементов нет.

Псевдоэлементы работают в браузерах на движках Blink и WebKit: Chrome, Edge, Opera и Safari на компьютере. На iOS почти все браузеры, включая Chrome и Edge, работают на WebKit. Там из этих стилей действует только [`display: none`](/css/display/).

## Пример

```css
/* Толщина полос прокрутки */
.scrollbox::-webkit-scrollbar {
  /* Вертикальная полоса */
  width: 14px;
  /* Горизонтальная полоса */
  height: 14px;
}

/* Трек (фон) */
.scrollbox::-webkit-scrollbar-track {
  background: #1e1f22;
}

/* Ползунок */
.scrollbox::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 8px;
  /* Создаём зазор */
  border: 3px solid #1e1f22;
}

/* Состояние при наведении */
.scrollbox::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Угол между двумя полосами */
.scrollbox::-webkit-scrollbar-corner {
  background: #1e1f22;
}
```

```html
<div class="scrollbox">
  <p>Первый абзац длинного текста…</p>
  <p>Второй абзац…</p>
  <!-- Ещё абзацы, чтобы текст не поместился по высоте -->
  <!-- И строка шире блока для горизонтальной полосы -->
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

<iframe title="Полоса прокрутки, оформленная через ::-webkit-scrollbar" src="demos/basic/" height="420"></iframe>

## Как пишется

Семейство нестандартных псевдоэлементов:

- `::-webkit-scrollbar` — вся полоса прокрутки (задаёт размеры);
- `::-webkit-scrollbar-thumb` — ползунок;
- `::-webkit-scrollbar-track` — трек (фон);
- `::-webkit-scrollbar-track-piece` — участок трека, не занятый ползунком;
- `::-webkit-scrollbar-button` — кнопки со стрелками;
- `::-webkit-scrollbar-corner` — квадрат в углу, который появляется, когда одновременно видны вертикальная и горизонтальная полосы;
- `::-webkit-resizer` — уголок для изменения размера элемента мышью (появляется при [`resize`](/css/resize/)).

## Как понять

- Это особенность движков WebKit и Blink. В Firefox для стилизации есть только стандартные свойства [`scrollbar-width`](/css/scrollbar-width/) и [`scrollbar-color`](/css/scrollbar-color/). С версии 155 Firefox частично понимает `::-webkit-scrollbar` только на коротком списке сайтов. На остальных сайтах эти стили не работают.
- Рендер и доступные свойства могут отличаться между браузерами и версиями. Считайте, что браузер применит стили по возможности, но ничего не гарантирует.

## Подсказки

💡 Стилизуйте полосы прокрутки, только если без этого не обойтись: пользователи узнают привычные системные полосы. Слишком толстые и яркие полосы мешают читать контент. В слишком тонкую полосу трудно попасть мышью.

💡 Если задать стили самому `::-webkit-scrollbar`, в macOS полоса перестанет появляться поверх содержимого. Она станет обычной: займёт место и будет видна, пока блок можно прокрутить.

💡 Чтобы создать «зазор» внутри ползунка, используйте [`border`](/css/border/) цвета трека.

💡 Проверьте тёмную и светлую темы. Контраст ползунка с треком должен быть не ниже 3:1.

💡 Стандартные свойства и `::-webkit-scrollbar` не дополняют друг друга, а заменяют. Если у блока `scrollbar-width` или `scrollbar-color` не `auto`, Chrome, Edge и Safari игнорируют его стили `::-webkit-scrollbar`.

`scrollbar-color` наследуется. Поэтому значение на `html` отключит `::-webkit-scrollbar` у всех блоков страницы. В Safari так будет с версии 26.2: в более ранних версиях `scrollbar-color` нет. Чтобы вернуть стили одному блоку, задайте ему `scrollbar-color: auto`.

Стандартные свойства работают в Chrome и Edge с версии 121 и в Firefox с версии 64. В Safari `scrollbar-width` есть с версии 18.2, а `scrollbar-color` — с версии 26.2. Чтобы старые браузеры получили `::-webkit-scrollbar`, а новые — стандартные свойства, разведите их через [`@supports`](/css/supports/):

```css
@supports (scrollbar-color: auto) {
  .scrollbox {
    scrollbar-color: #6b7280 #1e1f22;
    scrollbar-width: thin;
  }
}

@supports not (scrollbar-color: auto) {
  .scrollbox::-webkit-scrollbar {
    width: 14px;
  }

  .scrollbox::-webkit-scrollbar-thumb {
    background: #6b7280;
  }
}
```

Если скругления и состояние при наведении нужны и в новых браузерах, не задавайте стандартные свойства совсем. Тогда Firefox покажет системную полосу.
