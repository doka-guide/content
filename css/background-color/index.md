---
title: "`background-color`"
description: "Свойство, раскрашивающее фон элемента в яркие краски!"
baseline:
  - group: background-color
    features:
      - css.properties.background-color
authors:
  - solarrust
contributors:
  - skorobaeus
  - starhamster
editors:
  - tachisis
keywords:
  - заливка фона
related:
  - css/web-colors
  - css/background
  - css/color
tags:
  - doka
---

## Кратко

При помощи свойства `background-color` можно задать цвет фона элемента. Задать фоновый цвет можно любому элементу — строчному (inline), блочному (block) или строчно-блочному (inline-block).

## Пример

```html
<p class="block">Розовый — цвет, образующийся...</p>

<span class="inline">Жёлтый — самый лёгкий и яркий цвет...</span>

<div class="inline-block">Английское слово blue...</div>
```

```css
.block {
  background-color: rgb(244, 152, 173);
}

.inline {
  background-color: yellow;
}

.inline-block {
  background-color: #2E9AFF;
}
```

<iframe title="Фоновый цвет у элементов разных типов" src="demos/types/" height="520"></iframe>

В примере выше показаны блоки всех трёх типов отображения. С фоном для блочных и строчно-блочных элементов проблем не возникает, а вот со строчными элементами всё не так просто.

Если высота строки ([`line-height`](/css/line-height/)) у строчного элемента будет больше 1, то между строками будут пробелы.

Но в заливке фона строчных элементов есть и преимущества! На последней строке фон заканчивается ровно там, где заканчивается текст.

Помимо этой особенности, в CSS-коде видно, что в качестве значения для `background-color` можно использовать любое доступное обозначение [цвета в вебе](/css/web-colors/).

## Как понять

Свойство `background-color` меняет цвет фона любого элемента.

## Как пишется

Для нужного селектора указываем свойства `background-color` и после двоеточия указываем цвет фона в любом доступном для веба формате.

Чёрный:

```css
.element {
  background-color: black;
}
```

Белый:

```css
.element {
  background-color: #ffffff;
}
```

Белый полупрозрачный:

```css
.element {
  background-color: #ffffff80;
}
```

Жёлтый полупрозрачный:

```css
.element {
  background-color: rgb(255 255 0 / 0.5);
}
```

Помимо цвета можно задать прозрачный фон при помощи ключевого слова `transparent`.

Это бывает полезно для изменения цвета при наведении курсора.

## Подсказки

💡 Свойство фона не наследуется.

💡 Значение по умолчанию — прозрачный фон: `transparent`.

💡 Фон нельзя задать частично. Блок заливается указанным цветом полностью.

💡 В качестве значения можно указать только один цвет.

💡 Изменение цвета фона можно анимировать при помощи свойства [`transition`](/css/transition/) 🥳
