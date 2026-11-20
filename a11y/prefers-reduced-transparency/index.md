---
title: "`prefers-reduced-transparency`"
description: "Значение директивы `@media`, которое отслеживает настройки прозрачности."
baseline:
  - group: prefers-reduced-transparency
    features:
      - css.at-rules.media.prefers-reduced-transparency
authors:
  - tatianafokina
contributors:
  - skorobaeus
keywords:
  - a11y
  - ＠-правило
  - media
  - media-query
  - accessible glassmorphism
related:
  - a11y/prefers-reduced-motion
  - css/media
  - a11y/prefers-contrast
tags:
  - doka
---

## Кратко

Одно из значений директивы [`@media`](/css/media/) для проверки пользовательских настроек. Отслеживает отключение или уменьшение прозрачности в операционной системе.

<aside>

🚧 У `prefers-reduced-transparency` пока что не самая впечатляющая поддержка. Следить за поддержкой можете [на Can I Use](https://caniuse.com/?search=prefers-reduced-transparency).

</aside>

## Пример

```css
article span {
  background: #18191C;
  opacity: 0.9;
}

@media (prefers-reduced-transparency: reduce) {
  article span {
    opacity: 1;
  }
}
```

<iframe title="Пример с полупрозрачным фоном для текста" src="demos/basic-example/" height="600"></iframe>

## Как пишется

Задайте после `@media` в скобках условие `prefers-reduced-transparency` с одним из значений:

- `no-preference` — прозрачность в системе по умолчанию.
- `reduce` — прозрачность уменьшена или полностью выключена.

С помощью `prefers-reduced-transparency` можно отменять прозрачность, заданную фону через [`opacity`](/css/opacity/), перемещать текст под блок с фоновыми картинками, паттернами и так далее.

На сайтах часто встречаются карточки с фоновыми картинками и текстом. В примере для первой карточки используем стили без `prefers-reduced-transparency`, для второй устанавливаем специальные CSS-правила на случай отключения прозрачности. Они переносят текст под картинку.

```html
<div class="with-mediaquery">
  <code>reduce</code>
  <article>
    <img src="./images/walking.png" alt="">
    <span>
      <h3>Прогулки</h3>
      <p>Выгуляем животных вместо вас.</p>
    </span>
  </article>
</div>
```

```css
@media (prefers-reduced-transparency: reduce) {
  .with-mediaquery span {
    padding: 0;
    background: unset;
  }

  .with-mediaquery article > * {
    grid-area: unset;
  }
}
```

<iframe title="Пример с градиентом и фоновой картинкой" src="demos/card-with-bg-image/" height="840"></iframe>

Если любите глассморфизм, то `prefers-reduced-transparency` тоже спешит на помощь. На этот раз покажем эффект матового стекла только тогда, когда не изменена настройка прозрачности.

```css
article {
  color: #FFFFFF;
  background-color: #18191C;
}

@media (prefers-reduced-transparency: no-preference) {
  article {
    color: #000000;
    backdrop-filter: blur(15px);
    background: hsl(none none 100% / 20%);
  }
}
```

<iframe title="Пример с эффектом матового стекла" src="demos/card-with-glass-effect/" height="590"></iframe>

### Тестирование и отладка

Условие `prefers-reduced-transparency` можно тестировать в браузере или отключив прозрачность в системе.

В Chrome эмуляция `prefers-reduced-transparency` находится в дополнительной вкладке «Отрисовка» (Rendering) в инструменте разработчика. Чтобы добраться до неё, откройте список с дополнительными настройками (кнопка с тремя точками рядом с кнопкой закрытия), а потом разверните список «Другие инструменты» (More tools).

<video controls width="640">
  <source src="video/chrome-devtools.mp4" type="video/mp4">
  <track
    label="Russian"
    kind="subtitles"
    srclang="ru"
    src="video/closed-captions.vtt"
  >
</video>

В операционных системах настройки прозрачности находятся в разделах доступности и специальных возможностей. В некоторых системах прозрачность можно уменьшить, в других полностью отключить.

<details>
  <summary>Windows 10</summary>

  Настройки > Персонализация > Цвета > Эффекты прозрачности

</details>

<details>
  <summary>Windows 11</summary>

  Настройки > Универсальный доступ > Визуальные эффекты > Эффекты прозрачности

</details>

<details>
  <summary>macOS</summary>

  Системные настройки > Универсальный доступ > Дисплей > Уменьшить прозрачность

</details>

<details>
  <summary>iOS</summary>

  Настройки > Основные > Универсальный доступ > Экран и размер текста > Уменьшить прозрачность

</details>

<details>
  <summary>Android</summary>

  Настройки > Специальные возможности > Улучшение видимости > Уменьшить прозрачность и размытие

</details>

## Как понять

Прозрачный фон увеличивает когнитивную нагрузку на пользователей и уменьшает уровень читаемости текста. Этой настройкой пользуются:

- Люди с особенностями зрения. Например, с астигматизмом или сниженным зрением.
- Пользователи с когнитивными особенностями. К примеру, люди с дислекси́ей или синдром дефицита внимания.
- Люди с мигренями и головными болями.

<aside>

🧠 Когнитивная нагрузка — это нагрузка на рабочую память человека, где хранится информация, которая помогает решать текущие задачи.

</aside>
