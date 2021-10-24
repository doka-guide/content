---
title: "`<legend>`"
authors:
  - realetive
contributors:
  - skorobaeus
keywords:
  - legend
  - тэг
  - тег
  - форма
tags:
  - doka
---

## Кратко

Добавляет заголовок в [`<fieldset>`](/html/fieldset), который по умолчанию оформляется браузером как текст, органично вписанный в рамку.

## Пример

```html
<fieldset>
  <legend>Заголовок для группы контролов</legend>
  …
</fieldset>
```

## Как это понять

`<legend>` позволяет описать содержимое `<fieldset>`, но семантически он не является «представителем» h1-h6-заголовков, хотя выполняет схожую функцию. Он не задаёт иерархию, а лишь характеризует контент внутри «своей» группы — как `<label>` для соответствующего контрола.

## Как пишется

```html
<fieldset>
  <legend>Заголовок для группы</legend>
  …
</fieldset>
```

:::callout ⚠️

Важно, чтобы `<legend>` был первым дочерним элементом внутри `<fieldset>`. Если внутри `<fieldset>` будет больше одного `<legend>`, отобразится только первый, все остальные отобразятся как обычные блочные элементы:

:::

<iframe title="Меняющаяся легенда" src="demos/legend-rotate/" height="200"></iframe>

## Атрибуты

У `<legend>` нет никаких своих атрибутов, ему доступны все [глобальные атрибуты](/html/global-attrs).

## Подсказки

Внешний вид оформления рамки по умолчанию у `<legend>` немного отличается в зависимости от браузера и операционной системы:

<section class="section section_column_2">
  <figure class="section__item">
    <img src="images/win-10-chrome-71.png" alt="Windows 10, Google Chrome 71.0">
    <figcaption>Windows 10, Google Chrome 71.0</figcaption>
  </figure>
  <figure class="section__item">
    <img src="images/mac-chrome-71.png" alt="macOS Big Sur, Google Chrome 71.0">
    <figcaption>macOS Big Sur, Google Chrome 71.0</figcaption>
  </figure>
  <figure class="section__item">
    <img src="images/win-10-edge-18.png" alt="Windows 10, Edge 18.0">
    <figcaption>Windows 10, Edge 18.0</figcaption>
  </figure>
  <figure class="section__item">
    <img src="images/mac-safari-14.jpg" alt="macOS Big Sur, Safari 14.0">
    <figcaption>macOS Big Sur, Safari 14.0</figcaption>
  </figure>
  <figure class="section__item">
    <img src="images/win-8-ie10.png" alt="Windows 8, Internet Explorer 10.0">
    <figcaption>Windows 8, Internet Explorer 10.0</figcaption>
  </figure>
  <figure class="section__item">
    <img src="images/win-7-ie9.png" alt="Windows 7, Internet Explorer 9.0">
    <figcaption>Windows 7, Internet Explorer 9.0</figcaption>
  </figure>
  <figure class="section__item">
    <img src="images/samsung-galaxy.png" alt="Samsung Galaxy S7">
    <figcaption>Samsung Galaxy S7</figcaption>
  </figure>
  <figure class="section__item">
    <img src="images/google-nexus.png" alt="Google Nexus 6">
    <figcaption>Google Nexus 6</figcaption>
  </figure>
</section>
