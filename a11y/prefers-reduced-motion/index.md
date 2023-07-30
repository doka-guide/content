---
title: "`prefers-reduced-motion`"
description: "Как сделать анимацию на сайте доступной."
authors:
  - doka-dog
keywords:
  - доступность
  - ＠-правило
  - media
  - media-query
related:
  - css/media
  - css/animation
  - a11y/chto-takoe-a11y
tags:
  - doka
  - placeholder
---

## Кратко

Одно из значений директивы [@media](/css/media/) для проверки пользовательских настроек воспроизведения анимации.
Большинство новых OS позволяют пользователю настраивать параметры анимации в настройках системы. Медиа-запрос prefers-reduced-motion позволяет определить, отключена ли или уменьшена анимация в системе, и если да, применять стили CSS, которые это учитывают.

С помощью `prefers-reduced-motion` можно замедлить или полностью отключить анимацию для людей, которые не хотят её видеть.

```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

В примере добавляем плавную прокрутку только для пользователей, у которых не отключена анимация на уровне OS.

## Как пишется

У `prefers-reduced-motion` есть два значения:

- `no-preference` — настройки анимации по умолчанию.
- `reduce` — анимация отключена.

## Зачем?

Причины, по которой пользователь может отключить анимацию могут быть разными, например:

- не все люди воспринимают анимацию одинаково. То, что может показаться плавным и приятным глазу одним, может буквально бесить или отвлекать других (мигающая реклама, сложные параллаксы, автовоспроизведение видео  и т.п.);

- медицинские аспекты: у некоторых пользователей анимация может вызывать чувство тошноты, мигрень или даже вызывать [судороги](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html);

- сайты с большим количеством анимации могут быстро снижать заряд батареи девайсов или приводить к использованию большего количества трафика (например, для автовоспроизведения видео потребуется больше данных, чем для показа статического изображения).

## На практике

Большинство новых OS позволяют пользователю настраивать параметры анимации в настройках системы. Медиа-запрос prefers-reduced-motion позволяет разработчикам определить, менял ли пользователь настройки на уровне системы и, если да, применять стили CSS, которые это учитывают.
### Пример 1: Отключаем или замедляем анимацию на элементе
Чтобы отключить анимацию элемента или изменить её скорость, если пользователь явно настроил предпочтение для её уменьшения, мы можем прописать в CSS следующее:

```css
.button {
  /*  Весёлая анимация трясущейся кнопки */
  animation: shake 300s linear infinite both;
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
    animation: shake 600s linear infinite both;
  }
}
```

И наоборот, можем проигрывать анимацию только в том случае, если у пользователя нет предпочтений в данном аспекте.

```css
@media (prefers-reduced-motion: no-preference) {
  .button {
    animation: shake 300s linear infinite both;
  }
}
```

При таком способе записи есть 2 преимущества:
- сокращается количество кода;
- старые браузеры, которые не поддерживают prefers-reduced-motion, просто проигнорируют это правило и отобразят только оригинальный элемент без анимации.


### Пример 2: Плавная прокрутка

```css
html {
  scroll-behavior: smooth;
}
```

Если мы установим [scroll-behaviour: smooth](/css/scroll-behavior/) на [html](/html/html/)-элементе, то когда пользователь нажимает на [якорную ссылку](/html/a/), страница будет плавно прокручиваться до нужной позиции на странице.

К сожалению, у нас нет контроля скорости прокрутки страницы средствам CSS. Если страница длинная, то прокрутка может быть очень быстрой, что может оказаться довольно неприятным опытом для людей с чувствительностью к резкой анимации.

Обернув [scroll-behavior](/css/scroll-behavior/) в медиа-запрос, мы можем предотвратить применение плавной прокрутки и просто открыть страницу в нужном месте, если пользователь указал свои предпочтения для снижения уровня анимированности:

```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

#### А что с JS?

Если нам необходимо узнать предпочтениям по анимации средствами JavaScript, сделать это можно, используя [matchMedia](/js/match-media/). Так выглядит эта же настройка поведения прокрутки в JS:

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

a.addEventListener('click', () => {
  const behavior = prefersReducedMotion.matches ? 'auto' : 'smooth'

  window.scrollTo({
    x: 0,
    y: 0,
    behavior
  })
})
```

### Пример 3: Оптимизация загрузки стилей и библиотек для анимации

Если у вас много CSS, связанного с анимацией, можно вынести стили для её воспроизведения в отдельный файл и не грузить его пользователям, которые отказались от анимации:

```javascript
<link rel="stylesheet" href="animations.css" media="(prefers-reduced-motion: no-preference)">
```

По аналогии, можно предотвратить и загрузку тяжёлых библиотек для анимаций. В примере функция делает возврат раньше, чем произойдёт импорт [Greensock](https://greensock.com/), если пользователь предпочитает уменьшить количество анимации.

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

const loadGSAPAndInitAnimations = () => {
  if (prefersReducedMotion.matches) return;

  import('gsap').then((object) => {
    const gsap = object.default;
    /* Здесь иИнициализируем анимацию с использованием GSAP */
  })
};

loadGSAPAndInitAnimations();
```

<aside>
❗️ Обратите внимание, что корректный синтаксис:
```javascript
window.matchMedia('(prefers-reduced-motion: reduce)');
```
а не

```javascript
window.matchMedia('prefers-reduced-motion: reduce');
```
</aside>

## Поддержка
Имеет отличную поддержку всеми современными браузерами.

## Ссылки

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [prefers-reduced-motion: Sometimes less movement is more](https://web.dev/prefers-reduced-motion/)
- [Respecting Users’ Motion Preferences](https://www.smashingmagazine.com/2021/10/respecting-users-motion-preferences/)
