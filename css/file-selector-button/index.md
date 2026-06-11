---
title: "`::file-selector-button`"
description: "Псевдоэлемент для стилизации встроенной кнопки выбора файла внутри `<input type=\"file\">`."
baseline:
  - group: file-selector-button
    features:
      - css.selectors.file-selector-button
authors:
  - drakesbot12
related:
  - html/input
  - css/pseudoelements
  - css/hover
keywords:
  - загрузка файла
  - file input
  - кнопка выбора файла
tags:
  - doka
---

## Кратко

`::file-selector-button` — псевдоэлемент, представляющий кнопку внутри поля [`<input type="file">`](/html/input/). Позволяет стилизовать её так же, как любую кнопку интерфейса: менять фон, бордеры, скругления, состояния наведения/фокуса и т. п.

## Пример

```html
<label>
  Загрузить файл
  <input class="uploader" type="file" />
</label>
```

```css
.uploader::file-selector-button {
  padding: 0.5rem 0.75rem;
  border: 1px solid #2e6be6;
  border-radius: 0.5rem;
  background: #2e6be6;
  color: white;
  font: inherit;
  cursor: pointer;
}

.uploader::file-selector-button:hover {
  background: #1f4fb3;
  border-color: #1f4fb3;
}

.uploader::file-selector-button:focus {
  outline: 2px solid #94b6ff;
  outline-offset: 2px;
}
```

<iframe title="Стилизация кнопки выбора файла через ::file-selector-button" src="demos/basic/" height="250"></iframe>

## Как пишется

Селектор вида:

```css
input[type="file"]::file-selector-button { ... }
```

- Работает только на элементах [`<input type="file">`](/html/input/).
- Наследует шрифт родительского входа не всегда. Чтобы текст кнопки совпадал с дизайном, задайте [`font: inherit`](/css/font/).
- Поддерживаются обычные состояния: [`:hover`](/css/hover/), [`:active`](/css/active/), [`:focus`](/css/focus/), [`:disabled`](/css/disabled/) и [медиа-запросы](/css/media/).

## Как понять

По умолчанию браузер рисует системную кнопку «Выбрать файл». Псевдоэлемент `::file-selector-button` даёт контроль над её оформлением, не ломая семантику и доступность. Текст внутри кнопки задаётся браузером/локалью и не изменяется CSS — это особенность системного элемента.

## Подсказки

💡 Задавайте [`font: inherit`](/css/font/), чтобы кнопка выглядела консистентно с остальными элементами формы.
💡 Контролируйте размеры через [`padding`](/css/padding/), а высоту входа — через [`line-height`](/css/line-height/) и [`font-size`](/css/font-size/).
💡 Для лучшей доступности обеспечьте заметные стили фокуса ([`outline`](/css/outline/), [`outline-offset`](/css/outline-offset/)).
💡 Для старых браузеров можно добавить префиксные аналоги: `::-webkit-file-upload-button` (WebKit) и `::-ms-browse` (устаревший IE/Edge).
