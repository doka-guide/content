---
title: "Как сделать превью проекта на собственном сервере"
description: "Решение позволяет сделать простую реализацию превью «у себя» из PR/MR."
authors:
  - igsekor
tags:
  - article
---

## Задача

Почти всегда в проекте существует задача смотреть на текущие сборки из неосновной ветки репозитория. В крупных проектах есть инженеры, которые занимаются такими задачами. А что, если вы один на проекте? А что, если вы работаете в опенсорс? А что, если у вас совсем маленькая команда и нет возможности нанимать инженеров с нужным опытом?

Есть несколько готовых сервисов. Если вы работает над статическим сайтом, можно использовать [GitHub Pages](https://pages.github.com), [Netlify](https://docs.netlify.com/site-deploys/deploy-previews/) или [Surge](https://surge.sh). Но это не всегда удобно по целому ряду причин. А вот если есть свой выделенный сервер, возможности резко увеличиваются. Почему бы и не использовать уже имеющийся у вас ресурс?

## Готовое решение

Моё решение основано на использовании веб-сервера [Nginx](https://nginx.org), зато кроме него ничего не понадобится. С другой стороны, вы всегда сможете приспособить моё решение под свои нужды.

Итак, давайте конкретизируем ситуацию. Например, у вас есть репозиторий на GitHub _https://github.com/success-org/success-net_ с проектом вашего статического сайта _success.net_ на движке [11ty](https://www.11ty.dev), над которым активно работает команда разработчиков. На GitHub удобно использовать [GitHub Actions](https://docs.github.com/en/actions) для сборки сайта, а Nginx используется на сервере в качестве веб-сервера. Задача состоит в том, чтобы смотреть превью сайта с новыми материалами, фичами или исправленными багами из пулреквестов. Превью будут доступны по адресу `https://0000.dev.success.net`, где вместо `0000` будет номер пулреквеста. Развёртывание сайта будет проходить от имени пользователя `deploy` на сервере, приватный ключ от которого нужно предварительно добавить в список переменных репозитория под именем `DEPLOY_KEY`. Соответствующая страница настроек будет доступна в нашем примере по ссылке _https://github.com/success-org/success-net/settings/secrets/actions_.

Создайте в директории _.github/workflows_ новый файл конфигурации для GitHub Actions. Назовём этот файл _pr-preview.yml_:

```yaml
name: PR Preview

on:
  pull_request:

jobs:
  pr-preview:
    runs-on: ubuntu-latest
    env:
      DEPLOY_DOMAIN: https://${{ github.event.pull_request.number }}.dev.success.net
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      PATH_TO_CONTENT: ./content
    steps:
      - name: Загрузка проекта
        uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: Кэширование модулей
        uses: actions/cache@v3
        env:
          cache-name: cache-node-modules
        with:
          path: ~/.npm
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-
            ${{ runner.os }}-build-
            ${{ runner.os }}-
      - name: Получение идентификатора
        id: check
        run: |
          check_suite_url=$(curl -s -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/${{ github.repository }}/actions/runs/${{ github.run_id }} | jq -r '.check_suite_url')
          check_run_id=$(curl -s -H "Accept: application/vnd.github.v3+json" $check_suite_url/check-runs | jq '.check_runs[] | .id')
          echo "::set-output name=check_id::$check_run_id"
      - name: Установка модулей
        run: npm ci
      - name: Сообщение о начале публикации превью
        uses: hasura/comment-progress@v2.2.0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          repository: ${{ github.repository }}
          number: ${{ github.event.pull_request.number }}
          id: preview-${{ github.event.pull_request.number }}
          message: "Идёт сборка и публикация превью... [Подробнее](https://github.com/${{ github.repository }}/runs/${{ steps.check.outputs.check_id }}?check_suite_focus=true)"
          recreate: true
      - name: Установка ключа для пользователя
        run: |
          set -eu
          mkdir "$HOME/.ssh"
          echo "${{ secrets.DEPLOY_KEY }}" > "$HOME/.ssh/success_deploy"
          chmod 600 "$HOME/.ssh/success_deploy"
      - name: Сборка и публикация сайта
        id: build-preview
        continue-on-error: true
        run: |
          cp .env.success .env
          npm run preview
          ssh -i $HOME/.ssh/success_deploy -o StrictHostKeyChecking=no deploy@dev.success.net mkdir -p /web/sites/dev.success.net/content/${{ github.event.pull_request.number }}
          cd dist && rsync -e "ssh -i $HOME/.ssh/success_deploy -o StrictHostKeyChecking=no" --archive --progress --compress --delete . deploy@dev.success.net:/web/sites/dev.success.net/content/${{ github.event.pull_request.number }}
          echo "Ссылка на превью — ${{ env.DEPLOY_DOMAIN }}"
          echo -e "${{ steps.links.outputs.list }}"
      - name: Сообщение о неудаче публикации превью
        uses: hasura/comment-progress@v2.2.0
        if: failure()
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          repository: ${{ github.repository }}
          number: ${{ github.event.pull_request.number }}
          id: preview-${{ github.event.pull_request.number }}
          message: "Превью контента из ${{ github.event.after }} не опубликовано. Ошибка сборки или публикации. [Подробнее](https://github.com/${{ github.repository }}/runs/${{ steps.check.outputs.check_id }}?check_suite_focus=true)"
          fail: true
          recreate: true
      - name: Сообщение об успехе публикации превью
        uses: hasura/comment-progress@v2.2.0
        if: success()
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          repository: ${{ github.repository }}
          number: ${{ github.event.pull_request.number }}
          id: preview-${{ github.event.pull_request.number }}
          message: '[Превью контента](${{ env.DEPLOY_DOMAIN }}) из ${{ github.event.after }} опубликовано'
          recreate: true
```

Готовый GitHub Action [hasura/comment-progress](https://github.com/marketplace/actions/comment-progress) позволяет оставлять комментарии к пулреквесту. Проверьте последнюю версию перед формированием файла конфигурации.

<aside>

📚 В этой статье используем сертификаты Let’s Encrypt для нашего сайта. Если не знаете, как с ними работать, прочитайте рецепт «[Установка сертификатов Let’s Encrypt](/recipes/lets-encrypt-nginx/)». Если хотите узнать о сертификатах в общем, прочитайте статью «[SSL-сертификаты](/tools//recipes/lets-encrypt-nginx/)».

</aside>

Примерный файл конфигурации для Nginx:

```nginxconf
server {
    listen   80;
    server_name *.dev.success.net;

    error_log /web/sites/dev.success.net/logs/error.log;
    access_log /web/sites/dev.success.net/logs/access.log;

    location / {
      return 301 https://$http_host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name *.dev.success.net;

    brotli on;

    ssl_certificate /etc/letsencrypt/live/dev.success.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dev.success.net/privkey.pem;

    if ($host ~* "^([0-9]+)\.dev.success.net$") {
        set $pr $1;
        break;
    }

    root /web/sites/dev.success.net/$pr;

    error_log /web/sites/dev.success.net/logs/error.log;
    access_log /web/sites/dev.success.net/logs/access.log;

    #index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

}

```

Файлы со списками ошибок и удачных сессий сайта хранятся на сервере в директории _/web/sites/dev.success.net/logs/_. Эталонная сборка сайта из основной ветки хранится в директории _/web/sites/success.net/www/_. Сборки сайта из пулреквестов хранятся в директориях _/web/sites/dev.success.net/0000_. В файле конфигурации переменная `$pr` отвечает за номер пулреквеста.

Поскольку здесь используется много поддоменов, то обычные сертификаты Let’s Encrypt не подходят, надо использовать Wild Card сертификаты. Они создаются следующим способом:

1. Выполняется команда `/usr/bin/certbot certonly --manual --preferred-challenges=dns --email hi@success.net --agree-tos -d *.success.net`. В ходе выполнения этой команды нужно зайти на DNS-сервер, вписать нужную TXT-запись и нажать клавишу <kbd>Enter</kbd> в терминале, что всё готово. В результате будут сгенерированы два файла: _fullchain.pem_ (сертификат) и _privkey.pem_ (приватный ключ).
1. Копируются файлы в нужную директорию. В нашей конфигурации эти файлы хранятся в директории по умолчанию _/etc/letsencrypt/live/dev.success.net/_.

Очевидно, что такой способ хранения версий сайтов далёк от идеального. Способов оптимизации довольно много, но можно использовать простой — периодически заменять файлы, которые не отличаются от хранящихся в эталонной версии, на символические ссылки. Вот такой скрипт можно хранить в директорию _/web/sites/dev.success.net/_ под именем _symlinks.sh_:

```bash
# Получаем список поддиректорий с собранными версиями сайта
ls -l /web/sites/dev.success.net/pr/ > buffer1.sh

# Автозаменой вывода команды `ls -l` трансформируем скрипт, чтобы можно было ходить по директориям
sed -r 's/drwxr-xr-x. [0-9]+ deploy deploy [0-9]+ [A-Za-z]+ [ ]*[0-9]+ [0-9]+[:][0-9]+ /cd \/web\/sites\/dev.success.net\/pr\//g' buffer1.sh > buffer2.sh
rm -f buffer1.sh

# Сравниваем файлы с эталонной версией сайта, формируем список кандидатов на символические ссылки, записываем в отдельные скрипты в директориях и в скрипт `pr.sh`
sed -r 's/$/ \&\& diff -rqs \/web\/sites\/success.net\/www .\/ | grep "identical" > ln.sh \&\& sed -i "s\/ are identical\/\/g" ln.sh \&\& sed -i "s\/ and\/\/g" ln.sh \&\& sed -i "s\/Files \/ln -sf \/g" ln.sh \&\& sh ln.sh \&\& rm -f ln.sh/g' buffer2.sh > pr.sh
rm -f buffer2.sh

# Выполняем и удаляем после исполнения `pr.sh`
sh pr.sh
rm -f pr.sh
```

Важно выставить необходимые права доступа. В примере предполагается, что владелец всех файлов и поддиректорий в директории _/web/sites/_ — `deploy:deploy`.

Остаётся сделать запуск скрипта _symlinks.sh_ по расписанию. Например, сделаем так, чтобы это происходило каждое утро в 5:00. Для этого воспользуемся службой _cron_ и создадим файл _deploy_ в директории _/etc/cron.d/_:

```bash
0 5 * * * deploy sh /web/sites/dev.doka.guide/symlinks.sh
```

Получилось несложное решение для реализации превью. Любой из предложенных шагов можно использовать и отдельно, применяйте с умом! 🙃
