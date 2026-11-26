---
title: "Что такое Deno"
description: "Альтернатива Node.js от создателя Node.js."
authors:
  - dreamshaded
contributors:
  - solarrust
keywords:
  - deno
  - js runtime
  - альтернатива node js
  - jsr
related:
  - tools/nodejs
  - tools/nodejs-tooling
  - tools/gateway-bff
tags:
  - article
---

## Кратко

Deno — это рантайм, или среда выполнения, для JavaScript и [TypeScript](/tools/static-types/). Его в 2018 году придумал [Райан Дал](https://en.wikipedia.org/wiki/Ryan_Dahl), автор [Node.js](/tools/nodejs/). Deno исправляет проблемы Node.js: улучшает безопасность и удобство разработки.

## Ключевые отличия от Node.js

Одной из главных проблем Райан считал безопасность. По умолчанию Node.js даёт скрипту неограниченный доступ к файловой системе, сети и переменным окружения. Это опасно, если запускаете чужой код.

В Deno всё наоборот: код выполняется в песочнице, и доступ к файловой системе, сети и переменным окружения нужно разрешить явно флагами командной строки.

Например, чтобы разрешить скрипту доступ к сети, запустите его с флагом:

```bash
deno run --allow-net my-script.js
```

В файле _my-script.js_ напишем следующий код:

```javascript
const url = 'https://api.github.com/users/denoland'

async function fetchData() {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Request error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Data: ', data)
  } catch (error) {
    console.error('Error fetching data: ', error)
  }
}

fetchData()
```

Пример запуска скрипта с флагами доступа к файловой системе:

```bash
deno run --allow-read --allow-write my-other-script.js
```

Содержимое файла _my-other-script.js_:

```javascript
const { readTextFile, writeTextFile } = Deno

async function modifyFileContent() {
  try {
    // Путь может быть абсолютным или относительным:
    const inputFile = 'input.txt'
    const inputContent = await readTextFile(inputFile)

    console.log(`Read from ${inputFile}: ${inputContent}`)

    // Приведём строки к верхнему регистру:
    const modifiedContent = inputContent.toUpperCase()
    const outputFile = 'output.txt'

    await writeTextFile(outputFile, modifiedContent)

    console.log(`Written to ${outputFile}: ${modifiedContent}`)
  } catch (error) {
    console.error('Error with file operations: ', error)
  }
}

modifyFileContent()
```

Если запустить скрипт в терминале без нужного флага, Deno спросит разрешение:

```bash
deno run my-other-script.js
┏ ⚠️  Deno requests read access to "input.txt".
┠─ Requested by `Deno.readFile()` API.
┠─ Learn more at: https://docs.deno.com/go/--allow-read
┠─ Run again with --allow-read to bypass this prompt.
┗ Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all read permissions) >
```

Без терминала, например в [CI](/tools/ci-cd/), Deno не спрашивает, а сразу выбрасывает ошибку `NotCapable`. В нашем примере её поймает [блок `catch`](/js/try-catch/).

Выключить песочницу целиком можно флагом `-A` (`--allow-all`). Флаги `--allow-run` и `--allow-ffi` почти равны ему. Первый разрешает запускать другие программы, второй — вызывать нативные библиотеки: код на C, C++ или Rust, собранный в машинный код. Песочница на них не действует.

Похожий механизм со временем появился и в Node.js: это стабильная модель разрешений, которую включает флаг `--permission`. Но в Node.js она выключена по умолчанию. И [по словам документации](https://nodejs.org/api/permissions.html), она не защищает от вредоносного кода: это страховка для своего, доверенного кода.

Вторая проблема — управление зависимостями. В Node.js библиотеки и фреймворки устанавливают с помощью [npm](/tools/package-managers/). У каждой библиотеки могут быть свои зависимости. Например, библиотека «A» зависит от «B» и «C», а у тех свои зависимости. Получается дерево, в котором трудно уследить за версиями.

Если двум библиотекам нужны разные версии одной зависимости, npm положит обе копии в разные папки _node_modules_. Проект от этого тяжелеет. А библиотеки, которым нужен один общий экземпляр зависимости, могут сломаться.

Раньше пакет мог пропасть из реестра. Сообщество не забыло [инцидент с left-pad](https://en.wikipedia.org/wiki/Npm_left-pad_incident): в 2016 году автор удалил из npm крошечный пакет, и у тысяч проектов сломалась сборка. После этого npm запретил удалять пакеты, от которых зависят другие.

В Deno 2 зависимости подключают префиксами прямо в импорте:

- `jsr:` берёт пакет из реестра [JSR](https://jsr.io), который создала команда Deno;
- `npm:` берёт пакет из npm.

Как это выглядит на практике:

```javascript
// Импорт стандартной библиотеки Deno из реестра JSR:
import { assertEquals } from 'jsr:@std/assert@1'

// Импорт из npm:
import express from 'npm:express@5'

// Импорт по URL, например с собственного сервера:
import { SimpleButton }
  from 'https://example.com/chamomile-ui@1.1.2/index.ts'
```

Сначала Deno предлагал импортировать модули прямо по URL с локальным кешированием. На практике так неудобно обновлять версии и легко получить в проекте несколько копий одной библиотеки. Импорт по URL по-прежнему работает, но используют его всё реже.

Версии зависимостей удобно держать в поле `imports` файла настроек _deno.json_, о нём подробнее ниже. Ещё Deno 2 понимает _package.json_ и может работать с существующими проектами на Node.js. Но пакеты из npm приносят с собой то же дерево зависимостей, что и в Node.js.

С модулями Deno сразу пошёл по стандарту: основной формат — [ES-модули](/js/modules/), как в браузере. В Node.js исторически основной была система CommonJS с `require()`. Сейчас Node.js тоже хорошо работает с ES-модулями, но для этого обычно указывают `"type": "module"` в _package.json_ или используют расширение _.mjs_.

CommonJS Deno 2 тоже понимает, но ради совместимости:

- в пакетах из npm;
- в файлах _.cjs_;
- в проектах, где в _package.json_ указано `"type": "commonjs"`.

С асинхронными операциями Deno тоже сразу выбрал современный путь. В Node.js исторически основой были колбэки: например, `fs.readFile()` принимает путь до файла и колбэк для обработки прочитанных данных. API на [промисах](/js/promise/) появилось позже, в отдельном модуле `fs/promises`.

В Deno асинхронные функции сразу возвращают промисы, например `Deno.readTextFile()`. А для случаев, когда нужна синхронная работа, есть парные функции вроде `Deno.readTextFileSync()`.

Ещё одно крупное нововведение — встроенные инструменты для работы с качеством кода. В Node.js для проверки и форматирования кода нужны отдельные пакеты, например ESLint и Prettier. Встроенный тест-раннер `node:test` в Node.js со временем появился. А Deno поставляет всё это «из коробки»:

- `deno lint` найдёт ошибки и опасные приёмы в коде;
- `deno fmt` отформатирует код;
- `deno test` запустит тесты.

Ещё Deno избавляет от пачки конфигурационных файлов для линтеров, инструментов форматирования и прочих утилит. Всё это настраивают в одном файле, _deno.json_:

```json
{
  "imports": {
    "@std/assert": "jsr:@std/assert@^1.0.0"
  },
  "tasks": {
    "dev": "deno run --watch main.ts"
  },
  "lint": {
    "include": ["src/"],
    "exclude": ["src/testdata/", "src/fixtures/**/*.ts"],
    "rules": {
      "tags": ["recommended"],
      "include": ["ban-untagged-todo"],
      "exclude": ["no-unused-vars"]
    }
  },
  "fmt": {
    "useTabs": true,
    "lineWidth": 80,
    "indentWidth": 4,
    "semiColons": true,
    "singleQuote": true,
    "proseWrap": "preserve",
    "include": ["src/"],
    "exclude": ["src/testdata/", "src/fixtures/**/*.ts"]
  }
}
```

И, конечно, Deno с первой версии запускает TypeScript без установки дополнительных пакетов. При запуске типы он не проверяет, для этого есть команда `deno check` и флаг `--check`.

Node.js тоже научился запускать файлы _.ts_: начиная с версий 22.18 и 23.6 он делает это без флагов. Но Node.js только вырезает аннотации типов. Синтаксис TypeScript, который нужно превращать в JavaScript, например `enum`, он не поддерживает. Для него понадобится сторонний инструмент вроде `tsx`. А Deno превращает в JavaScript весь синтаксис TypeScript.

Последнее значительное отличие Deno от Node.js — исходный код. Оба рантайма работают на движке V8, и многие их API написаны на JavaScript. Но нативный код вокруг движка у Node.js написан на C и C++, а у Deno — на Rust. Компилятор Rust ловит многие ошибки работы с памятью и потоками ещё до запуска программы.

Ядро Deno можно встроить в свою программу на Rust. А из JavaScript-кода можно вызывать нативные библиотеки через FFI (интерфейс внешних функций). Именно это разрешает флаг `--allow-ffi`.

## Использование

На конец 2026 года на Deno работают, например, Edge Functions в Netlify. Supabase запускает Edge Functions в своём рантайме, совместимом с Deno. А у Slack есть SDK на Deno для приложений своей платформы.

В октябре 2026 года [команда Deno объявила](https://deno.com/blog/cloudflare), что переходит в Cloudflare. Что это значит:

- облачную платформу Deno Deploy закроют через полгода после объявления;
- рантайм ещё год будет получать ежемесячные исправления ошибок и безопасности, потом команда прекратит его разработку;
- код Deno останется открытым;
- реестр JSR продолжит работать.

## Минусы

Deno называют работой над ошибками Node.js, но минусы у него тоже есть:

1. Экосистема. Node.js развивается с 2009 года, и почти все библиотеки пишут в первую очередь для него. Deno 2 понимает _package.json_ и большинство пакетов из npm, но совместимость всё ещё не полная. Пакеты с нативными модулями или с зависимостью от внутренних API Node.js могут не заработать.
1. Стабильность, поддержка. Deno моложе Node.js, и его API менялись быстрее. LTS-версии (с долгосрочной поддержкой) у Deno есть, но их поддерживают несколько месяцев. LTS-версии Node.js получают исправления несколько лет.
1. Будущее. Команда Deno прекращает разработку осенью 2027 года, дальше рантайм могут развивать другие. Прежде чем начинать на Deno новый проект, проверьте, кто его сейчас развивает.
