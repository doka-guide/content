---
title: "`::cue`"
description: "Псевдоэлемент для стилизации реплик WebVTT (субтитров и подсказок) в `<video>` с подключённой дорожкой `<track>`."
authors:
  - drakesbot12
related:
  - html/video
  - html/track
  - css/pseudoelements
keywords:
  - субтитры
  - captions
  - WebVTT
  - текстовые
  - дорожки
tags:
  - doka
---

## Кратко

`::cue` — псевдоэлемент для стилизации реплик WebVTT (субтитров, описаний и прочих подсказок) внутри элемента [`<video>`](/html/video/), если подключена дорожка [`<track kind="subtitles">`](/html/track/). Можно менять цвет текста, фон плашки, шрифты и оформление.

## Пример

```html
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <track src="captions.vtt" kind="subtitles" srclang="ru" label="Русский" default />
  Ваш браузер не поддерживает видео.
</video>
```

```css
video {
  width: 100%;
}

video::cue {
  font-size: 1rem;
  color: yellow;
}

::cue(u) {
  color: red;
}

```

## Как пишется

Синтаксис:

- Форма `::cue` применяет стили ко всем репликам.
```css
::cue {
  /* стили для всех реплик */
}
```

- Форма `::cue(<селектор>)` позволяет выбрать внутренние узлы текста реплик (например, [`u`](/html/u/), [`b`](/html/b/), [`i`](/html/i/), [`ruby`](/html/ruby/), [`rt`](/html/ruby/), [`lang`](/html/global-attrs/#lang)) и стилизовать только их.

```css
::cue(<селектор>) {
  /* стили для внутреннего содержимого реплик */
}
```

## Как понять

- Стили из правила с `::cue` применяются к набору реплик в целом, как к единому блоку. Исключение — свойства фона: [`background`](/css/background/) и его лонгхэнды применяются к каждой реплике отдельно, чтобы фон не перекрывал излишне большую область видео.
- `::cue(<селектор>)` работает только с внутренними узлами WebVTT-текста, а не с реальными HTML-элементами страницы.

### Разрешённые свойства

Внутри правил с `::cue` разрешён ограниченный набор свойств:

- [`background`](/css/background/), `background-*`
- [`color`](/css/color/)
- шрифтовые свойства: [`font`](/css/font/), `font-*`
- [`outline`](/css/outline/), `outline-*`
- [`ruby-position`](/css/ruby-position/)
- `text-combine-upright`
- [`text-decoration`](/css/text-decoration/), `text-decoration-*`
- [`text-shadow`](/css/text-shadow/)
- [`visibility`](/css/visibility/)
- [`white-space`](/css/white-space/)

## Подсказки

💡 Для читабельности субтитров соблюдайте контраст: светлый текст на тёмной полупрозрачной плашке или наоборот.
💡 Не переусердствуйте с декоративностью: сложные шрифты и насыщенные эффекты ухудшают восприятие.
💡 Поддержка `::cue(<селектор>)` может отличаться: в некоторых браузерах она недоступна. Всегда проверяйте в целевых браузерах.
💡 Помните о локалях и длине строк: используйте [`white-space`](/css/white-space/), [`line-height`](/css/line-height/) и шрифты с нужной поддержкой алфавитов.
