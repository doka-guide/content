---
title: "Установка сертификатов Let’s Encrypt"
description: "Настроим HTTPS для своего сайта на основе бесплатных сертификатов"
authors:
  - igsekor
editors:
  - tachisis
tags:
  - article
---

## Задача

Правильная работа современного сайта обеспечивает защиту данных пользователя. Для этого используется сертификаты безопасности, которые позволяют использовать сайт с помощью защищённого протокола HTTPS. Перед нами стоит задача: настроить протокол HTTPS для веб-сервера Nginx на основе сертификатов [Let’s Encrypt](https://letsencrypt.org/docs/).

Подробнее о веб-сервере можно прочитать в статье «[Веб-сервер](/tools/web-server/)», подробнее о Nginx — в статье «[Веб-сервер Nginx](/tools/nginx-web-server/)». Если не совсем понятно, что такое SSL- или TLS-сертификаты, можно прочитать об этом в статье «[SSL-сертификаты](/tools/ssl-certificates/)».

## Готовое решение

Чтобы включить HTTPS для вашего сайта, вам необходимо получить сертификат от центра сертификации. Let’s Encrypt — это бесплатный, автоматизированный и открытый центр сертификации от [некоммерческой исследовательской группы по интернет-безопасности (ISRG)](https://www.abetterinternet.org/).

Этот сертификат валиден в течение 90 дней после генерации. После истечения срока его необходимо будет сгенерировать заново (это можно сделать, например, с помощью службы cron). Само собой, у вас должен быть доступ к серверу, на котором ваш сайт находится.

В зависимости от операционной системы и её настроек, установка веб-сервера и настройка файервола будет отличаться, но базовые принципы сохранятся.

Включение порта для работы с HTTPS (пример с `firewall-cmd`):

```bash
sudo firewall-cmd --add-service=https --permanent
```

Если этот файервол не установлен, на Linux, использующих RPM-пакеты (Fedora, RedHat, Oracle Linux и других) это можно сделать командой:

```bash
sudo dnf -y install firewalld
```

На Linux с deb-пакетами (Ubuntu, Debian или других):

```bash
sudo apt install firewalld
```

Затем нужно его запустить:

```bash
sudo systemctl start firewalld
```

Установка snap и certbot на дистрибутивах Linux, использующих RPM-пакеты:

```bash
sudo dnf -y install snapd
```

На Linux с deb-пакетами:

```bash
sudo apt install snapd
```

Затем нужно настроить snap и certbot:

```bash
sudo systemctl enable --now snapd.socket
sudo systemctl start snapd
sudo ln -s /var/lib/snapd/snap /snap
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

Настройка базовой конфигурации:

```nginxconf
server {
    listen 80;
    root /web/sites/example.com/www/;
    server_name example.com;
}
```

После установки базовой конфигурации необходимо проверить её корректность и перезапустить веб-сервер:

```bash
nginx -t
sudo systemctl restart nginx
```

Генерация сертификатов:

```bash
/usr/bin/certbot certonly --webroot -w /var/www/html --email root@example.com -d example.com -d www.example.com
```

Пример последующей настройки для статического сайта после автоматической генерации конфигурации:

```nginxconf
server {
    listen   80;

    server_name example.com;

    rewrite_log on;
    error_log /web/sites/example.com/logs/error.log;
    access_log /web/sites/example.com/logs/access.log;

    location / {
      return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;

    server_name example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5;
    ssl_protocols TLSv1.3 TLSv1.2 TLSv1.1;
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;

    add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload" always;

    error_log /web/sites/example.com/logs/error.log;
    access_log /web/sites/example.com/logs/access.log;

    root /web/sites/example.com/www/;
    index index.html;

    location / {
        error_page 404 /404/index.html;
        try_files $uri $uri/ /index.html =404;
    }

    location ~* \.(js|jpg|jpeg|gif|png|webp|avif|css|pdf|bmp|ico|woff2|svg)$ {
        expires 1y;
        add_header Cache-Control "must-revalidate, public, max-age=31536000";
    }
}
```

Проверка корректности конфигурации:

```bash
nginx -t
```

Перезапуск и проверка состояния Nginx:

```bash
sudo systemctl restart nginx
sudo systemctl status nginx
```
