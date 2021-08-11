---
title: "<picture>"
authors:
  - ezhkov_d
editors:
  - tachisis
keywords:
  - картинка
  - ретина
  - retina
  - srcset
tags:
  - doka
---

## Кратко

Тег `<picture>` используется, когда для разных устройств или вариантов отображения нам нужны разные картинки.

## Пример

```html
<picture>
  <source srcset="320.jpg" media="(max-width: 800px)">
  <img src="640.jpg" alt="Абстрактное изображение">
</picture>
```

## Как это понять

Одна и та же страница может быть открыта на разных устройствах и в браузерных окнах разной ширины. У телефона небольшой экран, и было бы круто не загружать полноразмерные картинки с большим разрешением. В CSS мы можем изменять фон элемента ([`background-image`](/css/background-image)) в зависимости от ширины экрана, используя медиавыражения. Но если изображение контентное, вставлено в HTML при помощи тега [`<img>`](/html/img), то CSS нам уже не поможет. Мы должны использовать теги `<picture>` и [`<source>`](/html/source).

## Как пишется

Внутри тега `<picture>` обязательно должен находиться тег [`<img>`](/html/img), и опционально — теги [`<source>`](/html/source).

```html
<picture>
  <source srcset="https://dummyimage.com/600x600/000/fff" media="(min-width: 600px)">
  <img src="https://dummyimage.com/320x320/000/fff" alt="">
</picture>
```

Браузер анализирует каждый тег [`<source>`](/html/source) по порядку, останавливается на первом подходящем под текущие условия и отображает картинку из атрибута `srcset`. Другие теги [`<source>`](/html/source) не анализируются. Если тег `<picture>` не поддерживается браузером или ни один из тегов [`<source>`](/html/source) не подходит под условия, то отображается картинка из тега [`<img>`](/html/img).

<p class="codepen" data-height="417" data-theme-id="light" data-default-tab="result" data-user="ezhkov" data-slug-hash="OJWdPqQ" style="height: 417px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="&amp;lt;picture&amp;gt;">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/OJWdPqQ">
  &lt;picture&gt;</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

В этом примере при помощи атрибута `media` в теге [`<source>`](/html/source) мы задаём условие по аналогии с медиавыражением [`@media`](/css/media) (в работе) в CSS. Если условие определяется как ложное, то элемент `<source>` пропускается.

## Подсказки

💡 Если медиавыражение не сработало, то браузер **не** загружает для него изображение. Так что можно не экономить и писать столько условий, сколько нужно.

💡 Тег `<picture>` не является полноценным блочным контейнером, как [`<div>`](/html/div), поэтому стили необходимо применять к тегу `<img>` внутри.

💡 Старайтесь при вёрстке всегда готовить несколько версий одной и той же картинки для отображения на разных устройствах. Пользователи мобильных телефонов будут вам очень благодарны, если для них вы будете готовить картинки с меньшим разрешением. В то же время пользователям десктопов с экранами высокой чёткости можно показывать картинки с увеличенным разрешением:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="XWpObbJ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="&amp;lt;picture&amp;gt; 2">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/XWpObbJ">
  &lt;picture&gt; 2</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

В этом примере пользователи с обычными экранами увидят картинку с надписью _768x400_. Пользователи, у которых ретиновые дисплеи, увидят картинку с надписью _1536x800_.

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
