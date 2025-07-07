---
title: "GitHub-плитка коммитов за год"
description: "Отображаем активность коммитов в GitHub-репозиторий."
authors:
  - vitya-ne
related:
  - js/fetch
  - js/date
  - /css/web-colors
tags:
  - article
---

## Задача

«GitHub-плитка» — легко узнаваемый компонент [страницы профиля пользователя GitHub](recipes/github-new-profile/). Создадим подобный компонент для отображения активности коммитов в репозиторий.

## Готовое решение

В ходе воплощения идеи мы будем использовать:
- GitHub-API;
- рендеринг html-элементов с помощью JavaScript;
- манипуляции с датами и цветами.

![Пример GitHub-плитки](images/GitHub-grid-example.png)

## Готовое решение

Создадим основу html-разметки:

```html
<div id="mainContainer" class="main-container">
  <div class="description">
    <span class="loading">
      Загрузка...
    </span>
  </div>

  <div class="total-row hidden">
    <span class="total-label">
      Общее количество коммитов за год:
    </span>
  </div>

  <div
    class="tooltip hidden"
    role="tooltip"
    id="tooltip"
    data-position="top"
  />
</div>
```

Добавим стили. Большинство из них потребуются в дальнейшем:

```css
  html {
    color-scheme: dark;
  }

  body {
    min-height: 100vh;
    margin: 0;
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: #18191C;
    color: #FFFFFF;
    font-family: "Roboto", sans-serif;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    min-width: 200px;
    padding: 1rem;
    position: relative;
    background-color: #18191C;
  }

  .main-container div {
    box-sizing: border-box;
  }

  .description {
    display: flex;
    flex-direction: row;
    gap: .5rem;
    font-size: 1.5rem;
  }

  .repo-name,
  .total-row,
  .tooltip,
  .error-value {
    color: #FFF;
  }

  .description,
  .loading,
  .total-label {
    color: #C56FFF;
  }

  .loading {
    font-size: 1.5rem;
    margin: auto;
  }

  .year {
    flex: 1 1 ;
    display: flex;
    max-width: 100%;
    min-width: 100px;
    overflow-y: hidden;
    overflow-x: auto;
    padding: 2rem 1rem 1rem 1rem;
    background-color: #0C0C0E6B;
    border: 1px solid #363636;
    border-radius: 5px;
  }

  .weekday-label,
  .month-label {
    font-size: .75rem;
    color: #FFF;
  }

  .weekday-label {
    margin: 10px 4px 0 0;
  }

  .month-label {
    width: 0;
    margin-top: -1rem;
    overflow-x: visible;
  }

  .weekday-labels,
  .week {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
  }

  .day {
    width: 10px;
    height: 10px;
    margin: 1px;
    border: 1px solid #88888818;
    border-radius: 2px;
  }
  .day:hover {
    border-color: #8885;
  }
  .day.has-commits:hover {
    border-color: #888a;
  }

  .cell {
    background-color: #28e628;
  }

  .tooltip {
    position: absolute;
    width: max-content;
    max-width: 400px;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #555;
  }

  .hidden {
    visibility: hidden;
  }
```

Основную работу будет выполнять JS. Рассмотрим его далее.

Итоговый результат выглядит так:

<iframe title="GitHub-плитка активности репозитория" src="demos/commit-activity-demo/" height="600"></iframe>

## Разбор решения
