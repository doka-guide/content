---
title: "`::selection`"
description: "Меняем вид выделенного текста."
baseline:
  - group: selection
    features:
      - css.selectors.selection
authors:
  - rusakov
editors:
  - tachisis
contributors:
  - solarrust
keywords:
  - ::selection
  - псевдоэлемент
related:
  - css/pseudoelements
  - css/text-shadow
  - css/background-color
tags:
  - doka
---

## Кратко

[Псевдоэлемент](/css/pseudoelements/) `::selection` меняет вид выделенного текста, например выделенного мышью.

<aside>
⚠️ На iOS и iPadOS псевдоэлемент не работает. Браузеры там используют движок WebKit, а он на этих системах не поддерживает `::selection`.
</aside>

## Пример

Чтобы увидеть `::selection` в действии, выделите текст в демке мышью или сочетанием клавиш <kbd>Ctrl</kbd> + <kbd>A</kbd> (<kbd>Cmd</kbd> + <kbd>A</kbd> в macOS).

<iframe title="Пример базовой работы ::selection" src="demos/variants/" height="440"></iframe>

## Как пишется

```css
::selection {
  /* Стили */
}
```

Псевдоэлемент пишут только с двойным двоеточием: вариант `:selection` браузеры не поймут.

Можно оформить выделение в отдельных элементах, например `p::selection`, или на всей странице. Для всей страницы напишите `::selection` без селектора слева, как в примере выше.

Внутри `::selection` работают только эти свойства:

- [`color`](/css/color/);
- [`background-color`](/css/background-color/), в том числе через шорткат [`background`](/css/background/): из него браузер возьмёт только цвет;
- шорткат [`text-decoration`](/css/text-decoration/) и его отдельные свойства, но пока только в Chrome и Edge с версии 105;
- [`text-shadow`](/css/text-shadow/);
- [`fill`](/css/fill/), [`stroke`](/css/stroke/) и `stroke-width` для текста в SVG, но пока только в Chrome, Edge и Safari;
- [пользовательские свойства](/css/custom-properties/).

Остальные CSS-свойства внутри правила браузер проигнорирует.

`color` и `background-color` работают в паре. Если задать только `color`, фон выделения станет прозрачным. Если задать только `background-color`, текст останется обычного цвета. Поэтому задавайте оба свойства сразу.

В Chrome и Edge с версии 134 вложенный элемент без своего правила берёт стили выделения у `::selection` родителя. Например, `p::selection` оформит и выделенный текст во вложенном [`<strong>`](/html/strong/). А если в правиле для `<strong>` задан только `color`, то `background-color` он возьмёт у `p::selection`.

Firefox и Safari так пока не умеют. Чтобы вложенные элементы получили те же стили во всех браузерах, добавьте селектор для потомков:

```css
p::selection,
p ::selection {
  color: #ffffff;
  background-color: #0066cc;
}
```

Общее правило `::selection` без селектора слева срабатывает для каждого элемента, в том числе для `<strong>`. Оно перебивает стили, которые пришли бы от `p::selection`. Селектор `p ::selection` из примера выше решает и эту проблему.

## Подсказки

💡 Меняйте вид выделения, только если это действительно нужно дизайну: пользователь мог настроить цвета выделения в системе под себя.

💡 Проверяйте [контраст](/a11y/color-contrast/) текста и фона выделения. Для обычного текста нужно не меньше 4,5:1, для крупного (от 24 px или от 18,66 px при жирном начертании) — 3:1. Если фон выделения не задан, сравнивайте цвет текста с фоном элемента под выделением.
