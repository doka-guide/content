---
title: "`@container`"
description: "Контейнерные запросы: применяем стили по размерам ближайшего контейнера, а не окна браузера."
baseline:
  - group: container-queries
    features:
      - api.CSSContainerRule
      - api.CSSContainerRule.containerName
      - api.CSSContainerRule.containerQuery
      - css.at-rules.container
authors:
  - drakesbot12
keywords:
  - контейнерные
  - запросы
  - container
  - queries
  - адаптивные
  - компоненты
related:
  - css/media
  - css/has
  - css/where
tags:
  - doka
---

## Кратко

Директива `@container` включает «контейнерные запросы» — условные правила, которые зависят от размеров (и стилей) ближайшего контейнера, а не от размеров вьюпорта. Это делает компоненты по‑настоящему адаптивными и независимыми от общего макета.

## Пример

```html
<div class="cards" aria-label="Список карточек">
  <article class="card">Карточка 1</article>
  <article class="card">Карточка 2</article>
  <article class="card">Карточка 3</article>
  <article class="card">Карточка 4</article>
  <article class="card">Карточка 5</article>
</div>
```

```css
/* Объявляем контейнер: измеряем его inline‑ось (ширину в LTR/RTL) */
.cards {
  container-type: inline-size;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, 1fr);
}

/* Когда контейнер сужается, меняем компоновку — компонент адаптируется сам по себе */
@container (max-width: 600px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}

@container (max-width: 380px) {
  .cards { grid-template-columns: 1fr; }
}
```

<iframe title="Карточки перестраиваются по ширине контейнера" src="demos/basic/" height="620"></iframe>

## Как пишется

Контейнерный запрос срабатывает только в пределах контейнера. Чтобы он заработал, нужно:

1) Объявить контейнер на элементе‑родителе компонентов.

```css
.wrapper {
  container-type: inline-size;
}
```

Сейчас блок измеряет только `inline`-размер, если задать `container-type: size`, то блок будет измерять и `inline`, и `block` размеры

2) По желанию дать контейнеру имя и ссылаться на него в `@container`:

```css
.wrapper {
  container-name: layout;
  container-type: inline-size;
}

@container layout (min-width: 700px) {
  /* правила для компонентов внутри .wrapper */
}
```

3) Написать условия как в `@media`, но изменять именно контейнер:

```css
/* Размерные запросы */
@container (min-width: 480px) { /* ... */ }
@container (width > 30rem) { /* диапазонный синтаксис */ }

/* Логические операторы */
@container (min-width: 480px) and (max-width: 768px) { /* ... */ }
@container (width < 400px) or (height < 300px) { /* ... */ }
@container not (width > 800px) { /* ... */ }

/* Стилевые запросы по вычисленным стилям */
@container style(--ui: compact) { /* ... */ }
@container style(--number > 4) and style(--theme: dark) { /* ... */ }

/* Имя контейнера + условие */
@container sidebar (width > 400px) { /* ... */ }

/* Только имя — применяется ко всем контейнерам с этим именем */
@container sidebar { /* ... */ }

/* Имя + несколько условий через запятую (ИЛИ) */
@container card (width > 400px), style(--featured: true) { /* ... */ }
```

Поддерживаются типы контейнеров:

- `inline-size` — учитывает только ширину по inline‑оси;
- `size` — учитывает и ширину, и высоту;
- `normal` — отключает контейнер.

Важно: контейнер не может влиять на размеры своих потомков, от которых он сам зависит (цикл измерений). Обычно достаточно задать «изоляцию» размеров через блок‑контекст форматирования (например, `display: grid | flow-root | flex`) или явно управлять размерами.

### Вложенные контейнеры

Можно вкладывать `@container` друг в друга, чтобы комбинировать условия:

```css
@container sidebar (width > 400px) {
  .card {
    font-size: 1.2rem;
  }
  
  @container (width > 700px) {
    .card {
      font-size: 1.5rem; /* сработает, если sidebar > 400px И его родитель > 700px */
    }
  }
}
```

### Стилевые запросы style()

Контейнерные запросы умеют проверять не только размеры, но и вычисленные стили контейнера:

```css
/* Булева форма — проверяет, что свойство отличается от initial */
@container style(--theme: dark) {
  .card {
    color: #fff;
    background: #1a1a1a;
  }
}

@container style(--accent-color: blue) and style(--padding: large) {
  .card {
    padding: 2rem;
    border-color: blue;
  }
}

@container style(--number > 4) {
  .card { /* сработает, если --number больше 4 */ }
}

@container not style(--responsive: true) {
  .card { /* если responsive не true */ }
}

/* Диапазонный синтаксис для чисел */
@container style(0 < --columns < 6) {
  .grid { grid-template-columns: repeat(var(--columns), 1fr); }
}
```

Важно: `style()` проверяет именно вычисленные значения, поэтому если у контейнера нет свойства, запрос вернёт `false`.

## Как понять

`@container` решает классическую проблему адаптивности компонентов: ваш виджет может жить в сайдбаре и в контентной колонке, а меняться он должен по ширине своего родителя, а не окна. Теперь «точки перелома» описываются около компонента и работают в любом контексте вёрстки.

Контейнерные запросы также умеют работать с:
- `scroll-state()` — проверяют состояние прокрутки (прилип ли элемент, прокручен ли контейнер);
- `anchored()` — проверяют, какое fallback-положение активно у якорно-позиционированного элемента.

Эти возможности пока экспериментальные, но уже доступны в некоторых браузерах под флагами.

## Подсказки

💡 Всегда объявляйте контейнер на ближайшем родителе компонента (`container-type`). Без этого `@container` не сработает.
💡 Используйте имена контейнеров (`container-name`), когда на странице несколько контейнеров и правила не должны пересекаться.
💡 Храните брейкпоинты рядом с компонентом — так проще сопровождать дизайн‑систему.
💡 Для производительности избегайте слишком глубоких деревьев с множеством контейнеров без необходимости.
