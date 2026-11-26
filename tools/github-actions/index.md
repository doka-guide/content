---
title: "GitHub Actions"
description: "Собираем пример CI/CD-пайплайна в GitHub."
authors:
  - igsekor
contributors:
  - furtivite
  - solarrust
related:
  - tools/static-analysis
  - tools/how-to-test-and-why
  - tools/webpack
tags:
  - article
---

<aside>

📚 В этой статье мы говорим про инструменты CI/CD (Continuous Integration и Continuous Delivery). Под этими терминами понимается итерационный процесс сопровождения кода: тестирование и отладка кода, автоматизация рутинных действий, сборка приложений, размещение приложений в магазинах приложений и так далее. Подробно об этом говорится в статье «[Что такое CI/CD](/tools/ci-cd/)».

</aside>

## Кратко

GitHub Actions — это инструмент автоматизации, встроенный в GitHub. Он запускает тесты, собирает и публикует приложения и берёт на себя другую рутину разработки.

## Как понять

Инструментов для сборки кода и публикации его для пользователей много. Среди популярных платформ — [GitLab CI/CD](/tools/gitlab-ci-cd/), Bitbucket Pipelines, Jenkins, JetBrains TeamCity и GitHub Actions.

Например, в проекте на [Node.js](/tools/nodejs/) есть линтер [EditorConfig](https://editorconfig.org). Он установлен как зависимость для разработки (`devDependencies`) и проверяет файлы по правилам из _.editorconfig_. В IDE или через скрипт разработчик проверит код локально. Но если он правит файл в блокноте или в веб-интерфейсе GitHub, проверки не будет.

Тут поможет экшен: файл с описанием автоматизации. Он запускает проверку при каждом [`git push`](/tools/git-cli/):

```yaml
name: EditorConfig

on:
  push

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
      - run: npm ci
      - run: npm run editorconfig
```

Положите файл в папку _.github/workflows_. Имя файла — любое, расширение — _.yml_ или _.yaml_. Экшен запустится сам и покажет результат проверки на вкладке «Actions».

## Как пользоваться

Экшен описывают в файле формата [YAML](/tools/yaml/). В документации GitHub такой файл называют workflow (рабочий процесс). В статье для простоты называем его экшеном.

Соберём экшен для тестирования приложения на Node.js по секциям.

Секция `name` задаёт название экшена в интерфейсе GitHub, например `name: Тестирование`. Название может быть и по-русски. Секция необязательна.

Секция `on` перечисляет триггеры — события, которые запускают экшен. Этот экшен запускается на события `push` и `pull_request` в ветке `main`:

```yaml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```

Полный список событий и их типов — в [документации GitHub](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows). Самые распространённые:

- `push`;
- `pull_request`;
- `schedule`.

Ключ `branches` ограничивает ветки для `push` и `pull_request`, как в примере выше. Для `push` есть ещё ключ `tags`, он так же работает с тегами. Ключ `branches-ignore` работает наоборот: он исключает ветки, и экшен запускается для всех остальных.

Событие `schedule` запускает экшен по расписанию. Время записывают в формате `cron`, это пять позиций через пробел: `'* * * * *'`.

1. минуты (0–59);
1. часы (0–23);
1. день месяца (1–31);
1. месяц: номер или сокращение на английском (1–12 или JAN–DEC);
1. день недели: номер или сокращение на английском (0–6 или SUN–SAT).

`*` значит «любое значение». В одной позиции можно записать несколько значений:

- `,` перечисляет значения: `1,10,20`;
- `-` задаёт диапазон: `9-18`;
- `/` задаёт шаг: `20/15` — с 20-й минуты каждые 15 минут.

```yaml
on:
  schedule:
    - cron: '20/15 9-18 1,10,20 * *'
```

Этот экшен запускается 1-го, 10-го и 20-го числа каждого месяца. Он срабатывает каждый час с 9 до 18 на 20-й, 35-й и 50-й минуте. Первый запуск в 9:20, последний — в 18:50.

По умолчанию GitHub считает время в UTC. Другой часовой пояс задают ключом `timezone` рядом с `cron`. Так экшен запустится по будням в 9:00 по московскому времени:

```yaml
on:
  schedule:
    - cron: '0 9 * * 1-5'
      timezone: 'Europe/Moscow'
```

Расписание срабатывает только в ветке по умолчанию. Запускать экшен чаще раза в пять минут нельзя. В начале часа нагрузка на GitHub высокая, и запуск может опоздать или пропасть.

Секция `jobs` описывает джобы — наборы действий, которые выполняет экшен. Каждый джоб записывают под своим ключом, например `first-test`. Ключ начинается с латинской буквы или `_` и может содержать латинские буквы, цифры, `-` и `_`. Подпись для интерфейса, в том числе по-русски, задают ключом `name` внутри джоба.

По умолчанию джобы запускаются параллельно. Если джоб должен дождаться другого, укажите зависимость в ключе `needs`. Вот схема зависимых джобов, шаги и `runs-on` в ней опущены:

```yaml
jobs:
  job1:
  job2:
    needs: job1
  job3:
    needs: [job1, job2]
```

Ключ `runs-on` выбирает раннер — виртуальную машину, на которой запускается джоб. Он обязателен для джоба с шагами:

```yaml
first-test:
  runs-on: ubuntu-latest
```

GitHub предоставляет раннеры с Linux, Windows и macOS. Чаще всего используют метки с `-latest`:

- `ubuntu-latest` — Linux (Ubuntu);
- `windows-latest` — Windows Server;
- `macos-latest` — macOS на процессорах Apple.

Можно указать и конкретную версию системы, например `ubuntu-24.04`. GitHub со временем убирает старые версии, а метки `-latest` переводит на новые, поэтому за версией в `-latest` стоит следить. Актуальный список — в [документации GitHub](https://docs.github.com/en/actions/reference/runners/github-hosted-runners#standard-github-hosted-runners-for-public-repositories).

Иногда приложение нужно проверить на нескольких версиях Node.js или на разных системах. Для этого есть стратегия `matrix`. GitHub запускает джоб для каждой комбинации значений из списков. В примере две системы и три версии Node.js, всего шесть запусков:

```yaml
runs-on: ${{ matrix.os }}
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node-version: [22, 24, 26]
```

Значение `os` из матрицы попадает в `runs-on` через выражение `${{ matrix.os }}`. Так джоб запускается на каждой системе из списка.

`matrix` — один из контекстов, то есть наборов данных о запуске. Данные любого контекста подставляют так же, через `${{ }}`.

Например, `${{ github.sha }}` — хэш коммита, а `${{ github.workflow }}` — имя экшена. Все данные контекста `github` перечислены в [документации](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#github-context). Другие контексты:

- [`env`](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#env-context) — переменные, заданные ключом `env` в экшене, джобе или шаге;
- [`job`](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#job-context) — данные о текущем джобе, доступные только внутри него;
- [`steps`](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#steps-context) — данные о шагах текущего джоба, которые уже выполнились;
- [`runner`](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#runner-context) — данные о раннере, на котором запущен текущий джоб;
- [`needs`](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#needs-context) — выходные данные и результат запуска джобов, от которых зависит текущий джоб.

Часть этих данных доступна и через переменные окружения. Их видят команды и скрипты внутри шага:

```yaml
- run: echo "Коммит $GITHUB_SHA"
```

Список переменных — в [документации](https://docs.github.com/en/actions/reference/workflows-and-actions/variables#default-environment-variables).

Ключ `steps` перечисляет шаги джоба. Они выполняются строго по порядку. Шаг бывает двух видов:

- `uses` подключает готовый шаг из публичного или приватного репозитория. В документации GitHub экшенами называют именно такие шаги. Готовые шаги ищут в [GitHub Marketplace](https://github.com/marketplace?type=actions), а как сделать свой, рассказывает [документация](https://docs.github.com/en/actions/how-tos/create-and-publish-actions).
- `run` выполняет команды терминала, подробнее о нём — в статье «[Интерфейс командной строки](/tools/cli/)». Несколько команд подряд пишут построчно после вертикальной черты `|`.

```yaml
steps:
  - uses: actions/checkout@v7
  - name: Использование Node.js ${{ matrix.node-version }}
    uses: actions/setup-node@v7
    with:
      node-version: ${{ matrix.node-version }}
  - run: npm ci
  - shell: bash
    run: |
      npm run build
      npm test
```

На Windows шаги по умолчанию выполняет PowerShell. Если в блоке из нескольких строк упадёт не последняя команда, шаг всё равно может завершиться успешно. Поэтому для таких блоков указывают `shell: bash`: он остановит шаг на первой ошибке.

Полностью пример конфигурации для тестирования приложения Node.js выглядит так:

```yaml
name: Тестирование

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        node-version: [22, 24, 26]
    steps:
      - uses: actions/checkout@v7
      - name: Использование Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v7
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - shell: bash
        run: |
          npm run build
          npm test
```

Кроме Node.js, экшены работают со многими другими платформами. Инструкции по настройке — в [документации GitHub](https://docs.github.com/en/actions/tutorials).
