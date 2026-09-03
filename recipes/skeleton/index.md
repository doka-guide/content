---
title: "Скелетон"
description: "Верстаем анимированный скелетон на одном блоке."
authors:
  - akhmadullin
keywords:
  - skeleton
  - скелетон
  - заглушка
related:
  - css/linear-gradient
  - css/background
  - css/keyframes
tags:
  - article
---

## Задача

Скелетон — это временная «заглушка». Он показывается вместо основного контента страницы на время загрузки данных. Пользователь видит не пустоту, а однотонные блоки, похожие на будущее содержимое: текст, кнопки или картинки. Часто их анимируют, что создаёт эффект загрузки. Это распространённый паттерн в веб-интерфейсах.

Скелетон выполняет ту же роль, что и спиннер, но воспринимается приятнее. Пользователь не только видит, что страница загружается, но и примерно понимает, какой контент появится после загрузки.

В рецепте разберём создание анимированного скелетона для карточки статьи:

<iframe title="Карточка для статьи" src="demos/card/" height="540"></iframe>

## Готовое решение

Для создания скелетона потребуется немного HTML.

```html
<div class="skeleton"></div>
```

И чуть побольше CSS.

```css
.skeleton {
  /* Общий цвет для блоков внутри скетелона */
  --skeleton-bg-color: #5F377D;
  /* Внутренний отступ для текста внутри карточки */
  --padding: 15px;

  /* Параметры для анимации загрузки */
  --blur-width: 600%;
  --blur-height: 200%;
  --blur-start-position: 130%;
  --blur-end-position: 0%;
  --blur-background: linear-gradient(
      130deg,
      transparent 0,
      transparent 35%,
      #18191c99 40%,
      #18191ce6 50%,
      #18191c99 60%,
      transparent 70%,
      transparent 100%
  );

  /* Параметры для скелетона картинки */
  --image-width: 100%;
  --image-height: 250px;
  --image-x: 0px;
  --image-y: 0px;
  --image-position: var(--image-x) var(--image-y);
  --image-skeleton: linear-gradient(var(--skeleton-bg-color), var(--skeleton-bg-color));

  /* Параметры для скелетона заголовка */
  --title-width: calc(80%);
  --title-height: 40px;
  --title-x: var(--padding);
  --title-y: calc(var(--image-height) + 25px);
  --title-position: var(--title-x) var(--title-y);
  --title-skeleton: linear-gradient(var(--skeleton-bg-color), var(--skeleton-bg-color));
  --title-margin-bottom: 25px;

  /* Общие параметры скелетонов для текстовых блоков */
  --text-gap: 18px;
  --text-line-height: 18px;

  /* Параметры для скелетона первой строки текста */
  --text-line-first-width: calc(100% - var(--padding) - var(--padding));
  --text-line-first-height: var(--text-line-height);
  --text-line-first-x: var(--padding);
  --text-line-first-y: calc(var(--title-y) + var(--title-height) + var(--title-margin-bottom));
  --text-line-first-position: var(--text-line-first-x) var(--text-line-first-y);
  --text-line-first-skeleton: linear-gradient(var(--skeleton-bg-color), var(--skeleton-bg-color));

  /* Параметры для скелетона второй строки текста */
  --text-line-second-width: calc(100% - var(--padding) - var(--padding));
  --text-line-second-height: var(--text-line-height);
  --text-line-second-x: var(--padding);
  --text-line-second-y: calc(var(--text-line-first-y) + var(--text-line-first-height) + var(--text-gap));
  --text-line-second-position: var(--text-line-second-x) var(--text-line-second-y);
  --text-line-second-skeleton: linear-gradient(var(--skeleton-bg-color), var(--skeleton-bg-color));

  /* Параметры для скелетона третьей строки текста */
  --text-line-third-width: 70%;
  --text-line-third-height: var(--text-line-height);
  --text-line-third-x: var(--padding);
  --text-line-third-y: calc(var(--text-line-second-y) + var(--text-line-second-height) + var(--text-gap));
  --text-line-third-position: var(--text-line-third-x) var(--text-line-third-y);
  --text-line-third-skeleton: linear-gradient(var(--skeleton-bg-color), var(--skeleton-bg-color));

  width: 340px;
  height: 450px;

  /* Цвет фона */
  background-color: #5F377D33;
  /* no-repeat нужен, чтобы скелетоны вложенных блоков не повторялись */
  background-repeat: no-repeat;

  /* Задаём цвет и форму вложенных блоков */
  background-image:
    var(--blur-background),
    var(--image-skeleton),
    var(--title-skeleton),
    var(--text-line-first-skeleton),
    var(--text-line-second-skeleton),
    var(--text-line-third-skeleton);

  /* Задаём размеры вложенных блоков */
  background-size:
    var(--blur-width) var(--blur-height),
    var(--image-width) var(--image-height),
    var(--title-width) var(--title-height),
    var(--text-line-first-width) var(--text-line-first-height),
    var(--text-line-second-width) var(--text-line-second-height),
    var(--text-line-third-width) var(--text-line-third-height);

  /* Задаём расположение вложенных блоков */
  background-position:
    var(--blur-start-position),
    var(--image-position),
    var(--title-position),
    var(--text-line-first-position),
    var(--text-line-second-position),
    var(--text-line-third-position);

  /* Добавляем анимацию загрузки */
  animation: loading 1.8s ease-in infinite;
}

/*
  Анимация загрузки работает за счет сдвига блюра.
  Все остальные блоки неподвижны: не меняют своей позиции.
*/
@keyframes loading {
  to {
    background-position:
      var(--blur-end-position),
      var(--image-position),
      var(--title-position),
      var(--text-line-first-position),
      var(--text-line-second-position),
      var(--text-line-third-position);
  }
}
```

<iframe title="Анимированный скелетон для карточки" src="demos/card-skeleton/" height="540"></iframe>

## Разбор решения

### Разметка

Для создания скелетона карточки нам потребуется всего один `div`.

```html
<div class="skeleton"></div>
```

Вложенные блоки нарисуем на CSS.

### Стили

Для создания заглушек содержимого карточки используем [линейный градиент](/css/linear-gradient/) и свойства семейства [`background`](/css/background/):

- [`background-color`](/css/background-color/);
- [`background-repeat`](/css/background-repeat/);
- [`background-image`](/css/background-image/);
- [`background-size`](/css/background-size/);
- [`background-position`](/css/background-position/).

Для начала заведём [CSS-переменные](/css/custom-properties/), чтобы не повторять одни и те же значения и проще ориентироваться в коде. Параметры каждого нижеследующего блока используют размер и положение предыдущего. Важно, чтобы размеры и форма блоков были похожи на части контента, для которого делается скелетон.

```css
.skeleton {
  /* Общий цвет для блоков внутри скетелона */
  --skeleton-bg-color: #5F377D;
  /* Внутренний отступ для текста внутри карточки */
  --padding: 15px;

  /* Параметры для анимации загрузки */
  --blur-width: 600%;
  --blur-height: 200%;
  --blur-start-position: 130%;
  --blur-end-position: 0%;
  --blur-background: linear-gradient(
      130deg,
      transparent 0,
      transparent 35%,
      #18191c99 40%,
      #18191ce6 50%,
      #18191c99 60%,
      transparent 70%,
      transparent 100%
  );

  /* Параметры для скелетона картинки */
  --image-width: 100%;
  --image-height: 250px;
  --image-x: 0px;
  --image-y: 0px;
  --image-position: var(--image-x) var(--image-y);
  --image-skeleton: linear-gradient(var(--skeleton-bg-color), var(--skeleton-bg-color));

  /* Параметры для скелетона заголовка */
  --title-width: calc(80%);
  --title-height: 40px;
  --title-x: var(--padding);
  --title-y: calc(var(--image-height) + 25px);
  --title-position: var(--title-x) var(--title-y);
  --title-skeleton: linear-gradient(var(--skeleton-bg-color), var(--skeleton-bg-color));
  --title-margin-bottom: 25px;

  /* Общие параметры скелетонов для текстовых блоков */
  --text-gap: 18px;
  --text-line-height: 18px;

  /* Параметры для скелетона первой строки текста */
  --text-line-first-width: calc(100% - var(--padding) - var(--padding));
  --text-line-first-height: var(--text-line-height);
  --text-line-first-x: var(--padding);
  --text-line-first-y: calc(var(--title-y) + var(--title-height) + var(--title-margin-bottom));
  --text-line-first-position: var(--text-line-first-x) var(--text-line-first-y);
  --text-line-first-skeleton: linear-gradient(var(--skeleton-bg-color), var(--skeleton-bg-color));

  /* Параметры для скелетона второй строки текста */
  --text-line-second-width: calc(100% - var(--padding) - var(--padding));
  --text-line-second-height: var(--text-line-height);
  --text-line-second-x: var(--padding);
  --text-line-second-y: calc(var(--text-line-first-y) + var(--text-line-first-height) + var(--text-gap));
  --text-line-second-position: var(--text-line-second-x) var(--text-line-second-y);
  --text-line-second-skeleton: linear-gradient(var(--skeleton-bg-color), var(--skeleton-bg-color));

  /* Параметры для скелетона третьей строки текста */
  --text-line-third-width: 70%;
  --text-line-third-height: var(--text-line-height);
  --text-line-third-x: var(--padding);
  --text-line-third-y: calc(var(--text-line-second-y) + var(--text-line-second-height) + var(--text-gap));
  --text-line-third-position: var(--text-line-third-x) var(--text-line-third-y);
  --text-line-third-skeleton: linear-gradient(var(--skeleton-bg-color), var(--skeleton-bg-color));
}
```

Далее зададим размеры скелетона.

```css
.skeleton {
  ...

  width: 340px;
  height: 450px;

  ...
}
```

И опишем вложенные блоки с помощью CSS-свойств из группы `background`:

- `background-color` — задаём цвет фона;
- `background-repeat` — отключаем повторение блоков с помощью значения `no-repeat`;
- `background-image` — задаём цвет и форму вложенных блоков;
- `background-size` — задаём размеры вложенных блоков;
- `background-position` — задаём расположение вложенных блоков.

Блоки описываем в порядке их визуального следования: сначала самый верхний (блюр), затем остальные.

```css
.skeleton {
  ...

  /* Цвет фона */
  background-color: #5F377D33;
  /* no-repeat нужен, чтобы скелетоны вложенных блоков не повторялись */
  background-repeat: no-repeat;

  /* Задаём цвет и форму вложенных блоков */
  background-image:
    var(--blur-background),
    var(--image-skeleton),
    var(--title-skeleton),
    var(--text-line-first-skeleton),
    var(--text-line-second-skeleton),
    var(--text-line-third-skeleton);

  /* Задаём размеры вложенных блоков */
  background-size:
    var(--blur-width) var(--blur-height),
    var(--image-width) var(--image-height),
    var(--title-width) var(--title-height),
    var(--text-line-first-width) var(--text-line-first-height),
    var(--text-line-second-width) var(--text-line-second-height),
    var(--text-line-third-width) var(--text-line-third-height);

  /* Задаём расположение вложенных блоков */
  background-position:
    var(--blur-start-position),
    var(--image-position),
    var(--title-position),
    var(--text-line-first-position),
    var(--text-line-second-position),
    var(--text-line-third-position);

  ...
}
```

Добавим анимацию для скелетона.

```css
.skeleton {
  ...

  /* Добавляем анимацию загрузки */
  animation: loading 1.8s ease-in infinite;
}
```

И опишем анимацию с помощью [`@keyframes`](/css/keyframes/). Для создания эффекта загрузки будем сдвигать только блюр.

```css
/*
  Анимация загрузки работает за счет сдвига блюра.
  Все остальные блоки неподвижны.
*/
@keyframes loading {
  to {
    background-position:
      var(--blur-end-position),
      var(--image-position),
      var(--title-position),
      var(--text-line-first-position),
      var(--text-line-second-position),
      var(--text-line-third-position);
  }
}
```

В итоге получился скелетон, который довольно точно описывает форму и структуру карточки.

<iframe title="Карточка и скелетон" src="demos/card-and-skeleton/" height="540"></iframe>


## Подсказки

💡 Если нужно использовать один и тот же контейнер для показа скелетона и контента, можно воспользоваться псевдоклассом [`:empty`](/css/empty/).

```css
.card {
  /* стили контента */
}

.card:empty {
  /* стили скелетона */
}
```
