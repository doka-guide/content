## Публикация для сайта на 11ty

Попробуем сделать экшен для своего репозитория. Например, сайт собирает [генератор статических сайтов](/tools/static-site-generators/) [11ty](https://www.11ty.dev), а в проекте есть линтеры [EditorConfig](https://editorconfig.org), [stylelint](https://stylelint.io) и [ESLint](https://eslint.org), которые проверяют тексты и код. Список скриптов в _package.json_ будет примерно таким:

```json
{
  "scripts": {
    "start": "eleventy --serve --quiet",
    "ec": "editorconfig-checker",
    "css": "stylelint \"src/styles/**/*.css\"",
    "js": "eslint \"src/**/*.js\"",
    "test": "npm run ec && npm run css && npm run js",
    "build": "eleventy",
    "deploy": "rsync -az --delete _site/ $DEPLOY_TARGET"
  }
}
```

Тогда можно реализовать такую схему работы:

1. загрузка репозитория;
1. установка Node.js;
1. установка зависимостей;
1. проверка кодовой базы и контента линтерами;
1. сборка приложения;
1. публикация приложения.

Наложим дополнительные условия: экшен запускается, когда код попадает в ветку `main` и в ветки, названия которых начинаются с `releases/`, а также при пулреквестах в `main`.

Конфигурация для экшена будет выглядеть так:

```yaml
name: Публикация сайта

on:
  push:
    branches:
      - main
      - 'releases/**'
  pull_request:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - name: Установка Node.js
        uses: actions/setup-node@v7
        with:
          node-version: 24
      - run: |
          npm ci
          npm run test
          npm run build
      - name: Публикация
        if: github.ref == 'refs/heads/main'
        env:
          SSH_KEY: ${{ secrets.DEPLOY_SSH_KEY }}
          KNOWN_HOSTS: ${{ secrets.DEPLOY_KNOWN_HOSTS }}
          DEPLOY_TARGET: user@example.com:/var/www/html/
        run: |
          mkdir -p ~/.ssh
          echo "$SSH_KEY" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          echo "$KNOWN_HOSTS" >> ~/.ssh/known_hosts
          npm run deploy
```

Шаг публикации запускается только для ветки `main`. Пулреквесты и ветки `releases/` экшен проверяет и собирает, но на сервер не выкладывает. 11ty по умолчанию собирает сайт в папку `_site`, поэтому скрипт `deploy` отправляет на сервер её. Адрес сервера и папку на нём скрипт берёт из переменной `DEPLOY_TARGET`.

Для `rsync` на сервер нужен [SSH](/tools/ssh/)-ключ без пароля: в экшене его некому ввести. Храните ключ в [секретах репозитория](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets), в примере это секрет `DEPLOY_SSH_KEY`, и не записывайте в код. Вставьте ключ в секрет целиком, вместе со строками `-----BEGIN` и `-----END`.

Строки для списка известных хостов (_known_hosts_) тоже храните в секрете, здесь это `DEPLOY_KNOWN_HOSTS`. Получите их командой `ssh-keyscan example.com` и сверьте отпечаток ключа с сервером. Не вызывайте `ssh-keyscan` прямо в экшене: он запишет ключ любого сервера, который ответит по этому адресу, даже подменённого.
