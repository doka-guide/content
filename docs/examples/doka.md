# Пример доки

**Дока** — это справочный материал, кратко и формально описывающий некое понятие, например, свойство или тег. Как спецификация, только по-русски и понятным языком.

Мы помечаем доку тегом _doka_ в шапке.

Структура доки примерно такова:

## Шапка

<details>
  <summary>Код шапки</summary>

```markdown
---
title: "Название статьи"
authors:
  - Никнейм основного автора
contributors:
  - Никнеймы всех соавторов и контрибьюторов
designers: Никнейм дизайнера
summary:
  - Альтернативные теги для работы поиска
cover:
  desktop: 'images/desktop.png'
  mobile: 'images/mobile.png'
  alt: 'Альтернативное описание для обложки'
tags:
  - doka
---
```

</details>

## Кратко

Кратко даём основное определение.

## Пример

Приводим наглядный пример с кодом и визуализацией.

HTML

```html
<div class="element"></div>
```

CSS

```css
.element {
  height: 100vh;
  background-color: #a91517;
  background-image: url("https://l.imgt.es/resource-preview-imgs/1d9806ec-7ef9-49ea-b60c-f1c9ca956b0a%2Fbaymax.crop_316x237_0%252C26.preview.png?profile=max500x190");
  background-repeat: no-repeat;
}
```

[https://codepen.io/solarrust/pen/Ygrypa?editors=1100](https://codepen.io/solarrust/pen/Ygrypa?editors=1100)

## Как это понять

Объясняем, как лучше понять этот термин, и в чём его нюансы.

## Как пишется

Рассказываем о синтаксисе.

## Подсказки

💡 Делимся лайфхаками, которые помогают понять те или иные нюансы.

## В работе

Рассказываем, как не сесть в лужу, если используешь этот элемент в работе. Создайте в папке статьи подпапку _practice_, а в ней файл, поименованный вашим ником.
