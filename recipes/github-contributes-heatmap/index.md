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

«GitHub-плитка» — легко узнаваемый компонент на [странице профиля пользователя GitHub](recipes/github-new-profile/).

<aside>

Визуализация данных, где значения в таблице отображаются с помощью цвета называется тепловая карта (heatmap) и применяется уже больше ста лет!

</aside>

Создадим подобный компонент для отображения активности коммитов в репозиторий.

## Готовое решение

В ходе воплощения идеи мы будем использовать:
- GitHub-API;
- манипуляции с датами и цветами;
- рендеринг html-элементов с помощью JavaScript.

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

Основную работу по созданию всего компонента будет выполнять JS. Рассмотрим его далее.

Итоговый результат выглядит так:

<iframe title="GitHub-плитка активности репозитория" src="demos/commit-activity-demo/" height="600"></iframe>

## Разбор решения

Нашу задачу можно разделить на несколько частей:
1. получение данных с помощью запроса к GitHub API;
1. преобразование полученных данных;
1. отображение плитки.

### Получение данных с помощью запроса к GitHub API

GitHub предоставляет удобное [API](/tools/api/) и документацию по его использованию. Мы будем использовать [запрос для получения данных об активности коммитов за последний (прошедший начиная с сегодняшнего дня) год](https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28&versionId=free-pro-team%40latest&category=repos&subcategory=repos#get-the-last-year-of-commit-activity).

Вот как выглядит запрос:

```
GET https://api.github.com/repos/{owner}/{repo}/stats/commit_activity
```

где:
`{owner}` - имя владельца репозитория
`{repo}` - имя репозитория

Мы будем получать данные об активности [репозитория с контентом Доки](https://github.com/doka-guide/content).

Напишем функцию формирования пути запроса. Мы используем функцию вместо константы, чтобы иметь возможность проще расширять функционал в дальнейшем:

```js
// имя в формате owner/repo
const REPO = 'doka-guide/content'

function createURL(repo = REPO) {
  return `https://api.github.com/repos/${repo}/stats/commit_activity`
}
```

Документация описывает необходимые заголовки (headers) API-запрса:

- `'X-GitHub-Api-Version': '2022-11-28'` — версия API. Этот параметр гарантирует получение задукоментированной структуры ответа, даже при изменении этой структуры в других версиях API;
- `'Accept': 'application/vnd.github+json'` — формат файла ответа. Документация [рекомендует](https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28#accept) добавлять заголовок `Accept` для уточнения желаемого формата данных.

Напишем функцию выполнения запроса. Функция принимает в качестве параметра путь запроса и возвращает [промис](/js/fetch/):

```js
function requestGitHubData(url) {
  try {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
  } catch (error) {
    console.error(error)
    return []
  }
}
```

Документация предупреждает о возможности получить [пустой ответ со статусом 202](https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#best-practices-for-caching). Чтобы корректно обработать такую ситуацию, предусмотрим возможность выполнения повторных запросов с задержкой.

Для этого нам понадобится функция, проверяющая статус ответа и выполняющая повторные запросы. Функция принимает объект параметров выполнения запроса:

```js
// количество повторных попыток
const REQ_MAX_ATTEMPTS = 3
// пауза между попытками, мс
const REQ_ATTEMPT_TIMEOUT = 20000
// сообщение об ошибке в случае получения ответа со статусом 202
const ERR_202 = 'Данные не готовы'

async function fetchCommitActivity(requestParams = {}) {
  try {
    const {
      url,
      requestAttempts = REQ_MAX_ATTEMPTS,
      requestAttemptTimeout = REQ_ATTEMPT_TIMEOUT
    } = requestParams

    const response = await requestGitHubData(url)

    if (response.status === 202) {
      if (requestAttempts > 0) {
        // пауза перед повторным запросом
        await new Promise(r => setTimeout(r, requestAttemptTimeout));

        // рекурсивно вызываем функцию, уменьшая счётчик повторов
        return fetchCommitActivity({
          url,
          requestAttempts: requestAttempts - 1
        })
      }

      // кидаем ошибку если все попытки были безуспешны
      throw new Error(ERR_202)
    }

    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
```

### Преобразование полученных данных

Успешный ответ запроса будет содержит массив объектов, например:

```js
[
  {
    "days": [ 0, 3, 26, 20, 39, 1, 0 ],
    "total": 89,
    "week": 1336280400
  },
  ...
]
```

где каждый элемент массива, это объект с информацией о неделе:
days — массив значений количества коммитов за каждый день недели (начиная с воскресения);
total — общее количество коммитов за неделю;
week —  дата первого дня недели в виде [Unix timestamp](/js/date/#poluchenie-tekushchego-vremeni)

Преобразуем полученные данные для упрощения отображения в формат:
```js
[
  {
    "total": number,
    "weekDate": Date // Date-объект для даты начала недели
    "days": [
      {
        count: number, // количество коммитов в вс.
        dateFormated: string // дата в формате `ГГГГ.MM.ДД`
      },
      {
        count: number // количество коммитов в пн.
        dateFormated: string
      },
      ...
    ],
    month: string // сокращённое название месяца (для первой недели месяца)
  },
  ...
]
```

Нам понадобятся функции форматирования дат:

```js
// формат `ГГГГ.MM.ДД`
const DATE_FORMATTER = new Intl.DateTimeFormat('ru', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
})
// сокращённое имя месяца
const DATE_MONTH_FORMATTER = new Intl.DateTimeFormat('ru', {
  month: 'short',
})

// Функция преобразования timestamp в экземпляр Date
function getWeekDate(weekTimestamp) {
  return new Date(weekTimestamp * 1000)
}

// Функция преобразования экземпляра Date в строку формата `ГГГГ.MM.ДД`
function getDateFormat(date) {
  return DATE_FORMATTER.format(date)
}

// Функция преобразования экземпляра Date в строку с сокращённым именем месяца
function getMonthName(date) {
  return DATE_MONTH_FORMATTER.format(date)
}
```

Создадим функцию преобразования полученных данных:

```js

function parseCommitActivity(responseData = []) {
  if (!Array.isArray(responseData)) {
    throw new Error('Данные не найдены')
  }

  // текущая дата
  const currDate = new Date()

  let isFirstWeekOfMonth

  return responseData.map((weekItem, weekIndex) => {
    const { total, days: commitsPerDay, week: weekTimestamp } = weekItem

    // Date-объект первого дня недели
    const weekDate = getWeekDate(weekTimestamp)

    const firstWeekDay = weekDate.getDate()
    let dayDate

    const days = commitsPerDay.map((count, dayIndex) => {
      dayDate = new Date(weekDate)
      dayDate.setDate(firstWeekDay + dayIndex)
      if (dayDate > currDate) {
        return {
          isFuture: true
        }
      }

      const dateFormated = getDateFormat(dayDate)

      return {
        count,
        dateFormated
      }
    })

    const lastDay = dayDate.getDate()
    isFirstWeekOfMonth = ( weekIndex === 0 && firstWeekDay < 10 ) || lastDay <= 7

    return {
      total,
      weekDate,
      days,
      month: isFirstWeekOfMonth
        ? getMonthName(dayDate)
        : ''
    }
  })
}
```




