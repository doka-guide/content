---
title: "`scroll-timeline`"
description: "Связывает прогресс анимации с прокруткой элемента, превращая скролл в источник времени"
authors:
  - drakesbot12
keywords:
  - scroll timeline
  - scroll-driven animation
  - CSS scroll animation
  - animation timeline
related:
  - css/animation
  - css/animation-timeline
  - css/keyframes
tags:
  - doka
---

## Кратко

`scroll-timeline` — это CSS-свойство, которое создаёт именованную временную шкалу, основанную на прокрутке элемента.

Проще говоря:
- обычная анимация зависит от времени;
- `scroll-timeline` делает так, чтобы анимация зависела от скролла.

Элемент становится «источником времени» для анимации.

## Пример

Создадим контейнер со скроллом и прогресс-баром, который заполняется по мере прокрутки.

```html
<div class="container">
  <div class="progress"></div>
  <div class="content">
    <h1>Большая статья</h1>

    <p>...</p>
    <p>...</p>
    <p>...</p>

    <p>Вы дочитали статью до конца!</p>
  </div>
</div>
```

```css
.container {
  position: relative;
  width: 320px;
  height: 350px;

  overflow-y: auto;

  border-radius: 16px;
  border: 1px solid #2E9AFF;
  background: rgba(255,255,255,0.05);

  scroll-timeline: --scroll-block y;
}

.progress {
  position: sticky;
  top: 0;

  height: 5px;
  width: 100%;
  background: #2E9AFF;

  transform-origin: left;
  transform: scaleX(0);

  animation: fill 1ms linear both;
  animation-timeline: --scroll-block;
}

@keyframes fill {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

<iframe title="Анимация, зависящая от прокрутки" src="demos/basic/" height="500"></iframe>

## Как понять

Обычная анимация:

```
время → 0% → 100%
```

`scroll-timeline`:

```
скролл → верх → низ
```

То есть:
- вместо времени используется прогресс прокрутки;
- анимация «привязывается» к движению страницы.

Когда контейнер находится в самом начале прокрутки, анимация находится в начале своего выполнения. Когда пользователь долистывает до конца — анимация доходит до последнего кадра.

Для работы `scroll-timeline` нужны два элемента:
1. Источник таймлайна — прокручиваемый контейнер.
2. Элемент с анимацией, который будет использовать этот таймлайн.

Сначала на контейнере создаётся именованная шкала прокрутки:

```css
.container {
  scroll-timeline: --article-scroll y;
}
```

После этого анимацию можно привязать к этой шкале:

```css
.progress {
  animation-timeline: --article-scroll;
}
```

Получается такая связь:

```
Контейнер со скроллом → scroll-timeline → animation-timeline → Анимация
```

Каждый раз, когда пользователь прокручивает контейнер, браузер вычисляет текущий прогресс прокрутки и передаёт его анимации.

## Как пишется

```css
scroll-timeline: <name> <axis>;
```

- `<name>` - название таймлайна, всегда начинается с `--`.
- `<axis>` - ось прокрутки, которая управляет прогрессом.

Типы осей прокрутки:
- `block` — вертикальная прокрутка (по умолчанию)
- `y` — вертикальная прокрутка
- `inline` — горизонтальная прокрутка
- `x` — горизонтальная прокрутка

Значение `none` отключает scroll timeline.

Чтобы `scroll-timeline` заработал:
- элемент должен прокручиваться (`overflow: scroll | auto`)
- внутри должен быть контент больше контейнера
- таймлайн должен быть привязан к анимации через `animation-timeline`

## Подсказки

💡 Без переполнения (`overflow`) таймлайна не будет
💡 Это не анимация само по себе — только источник прогресса
💡 Чаще всего используется вместе с `animation-timeline`
💡 Отлично подходит для прогресс-баров и UI-индикаторов
