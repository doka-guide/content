## Публикация для сайта на 11ty

Попробуем сделать экшен для своего репозитория. Например, мы работаем с движком генератора статики [11ty](https://www.11ty.dev), и в проекте поддерживается проверка линтерами [EditorConfig](https://editorconfig.org), [stylelint](https://stylelint.io) и [ESLint](https://eslint.org), которые выполняют функцию тестирования текстов и кода. Список скриптов в файле конфигурации `package.json` будет примерно таким:

```json
{
  "scripts": {
    "start": "eleventy --serve --quiet",
    "test": "editorconfig-checker && stylelint \"src/styles/**/*.css\" && eslint src/**/*.js",
    "build": "eleventy",
    "deploy": "cd dist && rsync --archive --compress --delete . user@example.com:/var/www/example.com/html/"
  }
}
```

Тогда можно реализовать такую схему работы:

1. Загрузка репозитория;
2. Установка Node.js нужных версий;
3. Установка зависимостей;
4. Тестирование кодовой базы и контента на соответствие правилам линтеров;
5. Сборка приложения;
6. Публикация приложения.

Наложим дополнительные условия: будет отслеживаться пуш только в ветку `main` и все ветки, названия которых будет начинаться с `releases/`.

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
    strategy:
      matrix:
        node-version: [ 12.x ]
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - run: |
        npm ci
        npm run test
        npm run build
        npm run deploy
```
