# Дока API

Материалы Доки полностью доступны для использования, согласно [лицензиям](license.md). Данный контентный API предоставляет удобный формат взаимодействия для использования в сторонних приложениях.

## Краткая справка по разделу

Обычно в доках хранится описание методов, свойств, тегов — вы можете использовать их в качестве краткой справки. В своих приложениях или плагинах можно получить такую справку по всем материалам разделов в виде списков:

- HTML: [https://doka.guide/html/index.json](https://doka.guide/html/index.json)
- CSS: [https://doka.guide/css/index.json](https://doka.guide/css/index.json)
- JavaScript: [https://doka.guide/js/index.json](https://doka.guide/js/index.json)
- Рецепты: [https://doka.guide/recipes/index.json](https://doka.guide/recipes/index.json)
- Доступность: [https://doka.guide/a11y/index.json](https://doka.guide/a11y/index.json)
- Веб-платформа: [https://doka.guide/tools/index.json](https://doka.guide/tools/index.json)

Формат информации для каждой доки в списке:

```js
{
  "название доки": {
    "path": "путь к доке",
    "related": [список связанных материалов],
    "summary": [строчки из краткого описания]
  },
}
```

## Информация об участниках

**Краткую информацию** об участниках Доки в виде списка можно получить по ссылке [https://doka.guide/people/info.json](https://doka.guide/people/info.json). Информация доступна в следующем формате для каждого:

```js
{
  "id": "идентификатор участника в Доке",
  "name": "Имя Пользователя",
  "photoURL": "ссылка на аватар пользователя, если есть",
  "pageLink": "ссылка на страницу пользователя",
  "stat": { // количество материалов в разделе
    "наименование раздела": int,
  },
  "practices": { // количество советов в разделе
    "наименование раздела": int,
  },
  "answers": { // количество ответов на вопросы в разделе
    "наименование раздела": int,
  },
  "mostContributedCategory": "раздел с наибольшим вкладом",
  "totalArticles": int, // всего материалов
  "totalPractices": int, // всего советов
  "totalAnswers": int, // всего ответов на вопросы
  "contributionStat": { // активность в репозитории
    "issues": int, // количество ишью
    "pr": int, // количество пулреквестов
  },
  "contributionActions": {}, // действия внутри репозитория
  "url": "ссылка на удобный пользователю ресурс (обычно GitHub)"
}
```

**Полную информацию** об участнике можно получить, зная его идентификатор в Доке, по ссылке такого формата:

```
https://doka.guide/people/{ идентификатор участника в Доке }/info.json
```

Формат данных:

```js
{
  "pageLink": "ссылка на страницу пользователя",
  "name": "Имя Пользователя",
  "url": "ссылка на удобный пользователю ресурс (обычно GitHub)",
  "contributionStat": {}, // активность в репозитории
  "badges": [], // подробный список значков
  "practicesIndex": {}, // подробный список советов с информацией о каждом
  "articlesIndex": {}, // подробный список статей и док с информацией о каждой
  "issuesLink": "https://github.com/doka-guide/content/issues?q=is%3Aissue+author%3Atachisis",
  "pullRequestsLink": "https://github.com/doka-guide/content/pulls?q=is%3Apr+author%3Atachisis"
}
```
