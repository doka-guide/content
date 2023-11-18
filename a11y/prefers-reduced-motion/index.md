---
title: "`prefers-reduced-motion`"
description: "Как управлять анимацией на сайте и сделать её доступной."
authors:
  - katkopikat
contributors:
  - skorobaeus
keywords:
  - ＠-правило
  - media
  - media-query
  - управление анимацией
related:
  - css/media
  - css/animation
  - a11y/chto-takoe-a11y
tags:
  - doka
---

## Кратко

Одно из значений директивы [@media](/css/media/) для проверки пользовательских настроек воспроизведения анимации.

Большинство современных операционных систем позволяют пользователю настраивать параметры анимации в настройках. Медиа-запрос `prefers-reduced-motion` позволяет определить, отключена или уменьшена анимация в системе и применять стили CSS, которые это учитывают.

С помощью `prefers-reduced-motion` можно замедлить или полностью отключить анимацию.

## Как пишется

У `prefers-reduced-motion` есть два значения:

- `no-preference` — настройки анимации по умолчанию.
- `reduce` — анимация отключена.

В примере добавляем плавную прокрутку только для пользователей, у которых не отключена анимация на уровне системы.

```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

## Зачем?

Пользователь может отключить анимацию по разным причинам, например:

- не все люди воспринимают анимацию одинаково. То, что может показаться плавным и приятным глазу одним, раздражает или отвлекает других (мигающая реклама, сложные параллаксы, автоматическое воспроизведение видео);
- медицинские аспекты: у некоторых людей могут быть [вестибулярные расстройства](https://www.a11yproject.com/posts/understanding-vestibular-disorders/), при которых даже простая анимация вызывает головокружение, чувство тошноты или судороги;
- сайты с большим количеством анимации могут быстро снижать заряд батареи мобильных устройств или использовать больше трафика. Например, для автоматического воспроизведения видео потребуется больше данных, чем для показа статического изображения.

## Примеры использования

### Отключаем или замедляем анимацию

Чтобы отключить анимацию элемента или изменить её скорость, если пользователь явно настроил предпочтение для её уменьшения, можно прописать в CSS следующее:

```css
.button {
  /*  Весёлая анимация трясущейся кнопки */
  animation: shake 300ms linear infinite both;
}

/*  Полностью отключает анимацию */
@media (prefers-reduced-motion: reduce) {
  .button {
    animation: none;
  }
}

/* Замедляет анимацию в 2 раза */
@media (prefers-reduced-motion: reduce) {
  .button {
    animation: shake 600ms linear infinite both;
  }
}
```

И, наоборот, можем проигрывать анимацию только в том случае, если у пользователя нет предпочтений в показе анимации:

```css
@media (prefers-reduced-motion: no-preference) {
  .button {
    animation: shake 300ms linear infinite both;
  }
}
```

При втором способе записи есть два преимущества:

- меньше кода;
- старые браузеры, которые не поддерживают `prefers-reduced-motion`, просто проигнорируют это правило и отобразят только оригинальный элемент без анимации.


### Плавная прокрутка

```css
html {
  scroll-behavior: smooth;
}
```

Если установить [`scroll-behaviour: smooth`](/css/scroll-behavior/) на [`<html>`](/html/html/), то, когда пользователь нажмёт на [якорную ссылку](/html/a/), страница плавно прокрутится до нужной позиции.

К сожалению, в CSS пока нет никакого контроля над скоростью прокрутки страницы. Если страница длинная, то прокрутка может быть очень быстрой. Это может оказаться неприятным опытом для людей с чувствительностью к резкой анимации.

Можно обернуть [`scroll-behavior`](/css/scroll-behavior/) в медиа-запрос, чтобы предотвратить применение плавной прокрутки и просто открыть страницу в нужном месте, если пользователь изменил настройки анимации:

```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

#### А что с JavaScript?

Если необходимо узнать предпочтения по анимации с помощью JavaScript, это можно сделать с помощью [`matchMedia`](/js/match-media/). Так выглядит эта же настройка поведения прокрутки в JavaScript:

```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)')

a.addEventListener('click', () => {
  const behavior = prefersReducedMotion.matches ? 'auto' : 'smooth'

  window.scrollTo({
    x: 0,
    y: 0,
    behavior
  })
})
```

### Оптимизация загрузки стилей и библиотек

Если у вас много CSS, связанного с анимацией, можно вынести стили для её воспроизведения в отдельный файл и не грузить его пользователям, которые отказались от анимации:

```javascript
<link
  rel="stylesheet"
  href="animations.css"
  media="(prefers-reduced-motion: no-preference)"
>
```

Похожим способом можно предотвратить и загрузку тяжёлых библиотек для анимаций. В примере ниже, если пользователь предпочитает уменьшить количество анимации, то функция сделает `return` и её выполнение прервётся. Благодаря этому не произойдёт импорт [GreenSock](https://greensock.com/) (GSAP).

```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)')

const loadGSAPAndInitAnimations = () => {
  if (prefersReducedMotion.matches) return

  import('gsap').then((object) => {
    const gsap = object.default
    // Здесь инициализируем анимацию с использованием GSAP
  })
};

loadGSAPAndInitAnimations()
```

<aside>

❗️ Обратите внимание, что корректный синтаксис включает круглые скобки:

```javascript
window.matchMedia('(prefers-reduced-motion: reduce)')

// Так работать не будет!
window.matchMedia('prefers-reduced-motion: reduce')
```

</aside>

## Поддержка

Имеет [отличную поддержку](https://caniuse.com/prefers-reduced-motion) всеми современными браузерами — глобальная поддержка 95.53%.

## Системные настройки

В разных операционных системах настройки могут располагаться в разных местах, но искать их нужно в разделах, которые связаны с доступностью и специальными возможностями. В некоторых системах движение можно уменьшить, в других отключить анимацию полностью. Например, как в Windows 10.

<details>
  <summary>Windows 10</summary>

  Настройки > Лёгкость доступа > Дисплей > Показать анимацию в Windows

</details>

<details>
  <summary>Windows 11</summary>

  Настройки > Универсальный доступ > Визуальные эффекты > Эффекты анимации

</details>

<details>
  <summary>macOS</summary>

  Системные настройки > Специальные возможности > Дисплей > Уменьшить движение

</details>

<details>
  <summary>iOS</summary>

  Настройки > Основные > Универсальный доступ > Уменьшить движение

</details>

<details>
  <summary>Android 9+</summary>

  Настройки > Специальные возможности > Удалить анимацию

</details>

## Тестирование и эмуляция

Если хотите посмотреть, как работает `prefers-reduced-motion`, но не хочется лезть в настройки системы, в браузерах на Chromium можно эмулировать её включение.

### Chrome

1. Откройте средства разработчика (<kbd>F12</kbd>).
1. Зайдите в «Другие инструменты» (More tools).
1. Выберите вкладку «Отрисовка» (Rendering).
1. Включите «Эмулировать медиафункцию CSS prefers-reduce-motion» (Emulate CSS media feature prefers-reduce-motion).

### Edge

1. Откройте средства разработчика (<kbd>F12</kbd>) и нажмите <kbd>CTRL SHIFT P</kbd> в Windows/Linux или <kbd>COMMAND SHIFT P</kbd> в macOS — откроется меню Команд.
1. Начните вводить __reduced__ и выберите «[Эмулировать CSS prefers-reduced-motion](https://learn.microsoft.com/ru-ru/microsoft-edge/devtools-guide-chromium/accessibility/reduced-motion-simulation-images/reduced-motion-command-menu-entry.png)», после чего нажмите <kbd>Enter</kbd>.

Посмотрите, проигрывается ли анимация ниже. При активном режиме котик должен быть статичным.

<iframe title="Отключаем анимацию" src="demos/disable-animation/" height="250"></iframe>

```html
<picture>
  <!-- Анимированный котик -->
  <source
    srcset="nyancat.gif"
    type="image/gif"
    media="(prefers-reduced-motion: no-preference)"
  >

  <!-- Статичный котик -->
  <img
    src="nyancat.png"
    alt="Котик с телом из печенья летит в космосе
      и оставляет за собой шлейф из радуги"
  >
</picture>
```

## Ссылки

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).
- [prefers-reduced-motion: Sometimes less movement is more](https://web.dev/prefers-reduced-motion/).
- [Respecting Users’ Motion Preferences](https://www.smashingmagazine.com/2021/10/respecting-users-motion-preferences/).
