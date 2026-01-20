---
title: "Web Application Firewall"
description: "Web Application Firewall, инструмент защиты для веб-сайтов."
authors:
  - disinterpreter
keywords:
  - веб-сервер
  - waf
  - настройка
related:
  - tools/web-server
  - tools/tcp-udp-protocols
  - tools/nginx-web-server
tags:
  - article
---

## Кратко

_Web Application Firewall_ он же _WAF_ — комплекс мер по предупреждению и защите вашего сайта.
WAF существуют в виде ПО, которое мы разворачиваем поверх своего [веб-сервера](https://doka.guide/tools/web-server/), либо, которое может разворачиваться у облачного провайдера, например, CloudFlare.

Мы рассмотрим настройку базового WAF на своём веб-сервере.

## Как понять

Firewall (межсетевой экран), в понимании работы сети, подразумевает ПО, которое выполняет защиту и разграничение доступа.
Web Application Firewall это ПО, которое выполняет защиту веб-сайта, отбивая подозрительные или потенциально плохие HTTP-запросы.
Из-за большого количества уязвимостей, WAF рекомендуется для любых сайтов, особенно, для тех, где присутствует бекенд.

Принцип работы WAF достаточно прост, есть набор правил — _сигнатур_, по которым межсетевой экран проверяет каждый пришедший HTTP-запрос. Сам набор сигнатур называется OWASP Top Ten, он содержит правила для 10 типов уязвимостей, их список опубликован на сайте https://owasp.org/Top10/2025/#top-102025-list

## Установка и настройка

Мы будем использовать веб-сервер [Angie](https://angie.software/) это форк nginx с исправленными проблемами и готовыми скомпилированными пакетами на все случаи.

В данной статье мы не будем расписывать установку, так как она доступна на сайте и затрагивает все современные ОС
https://angie.software/angie/docs/installation/oss_packages/
Однако, в качестве примера мы будем использовать Debian.

Вы можете попробовать проделать те же самые шаги на веб-серверах nginx и Apache HTTP Server, однако процесс настройки и установки зависит от операционных систем и их пакетов.
Вы также можете использовать данный способ как "фронтенд веб-сервер" проксируя очищенные данные с него на ваш веб-сервер или произвести [миграцию](https://angie.software/angie/docs/configuration/migration/) на Angie с nginx.

### Пример конфигурации по умолчанию

Это упрощенный пример любого веб-сайта на сервере Angie
```nginx
server {
    # Открыл один сокет для v6 и v4 одновременно
    listen       [::]:80 ipv6only=off;
    server_name  webserver.internal;
    location / {
        root   /usr/share/angie/html;
        index  index.html index.htm;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/angie/html;
    }
}
```

### Установка плагина
Необходимо добавить WAF. Сначала установим angie-модуль для работы с WAF. Он называется ModSecurity.
Это можно сделать командой `apt install angie-module-modsecurity`

После установки мы получим такое сообщение:

```
----------------------------------------------------------------------

The ModSecurity dynamic module for Angie has been installed.
To enable this module, add the following to /etc/angie/angie.conf
and reload angie:

    load_module modules/ngx_http_modsecurity_module.so;

Please refer to the module documentation for further details:
https://github.com/owasp-modsecurity/ModSecurity-nginx

----------------------------------------------------------------------
```
Ему же и будем следовать, добавим в файл `/etc/angie/angie.conf` эту строку.
Добавить можно в любое глобальное место, например, перед директивой events
```nginx
load_module modules/ngx_http_modsecurity_module.so;

events {
    worker_connections  65536;
}
```

### Установка сигнатур

Для работы с WAF нам нужны сигнатуры.
Самый популярный набор это [coreruleset](https://github.com/coreruleset/coreruleset/), данный набор соответствует OWASP Top Ten.
На момент написания статьи, последняя версия набора сигнатур была 4.22.0, её и будем ставить.

Загрузим сигнатуры через git-теги, этими командами
```bash
cd /var/lib/angie/modsecurity/
git clone -b v4.22.0 https://github.com/coreruleset/coreruleset
```
И включим минимально необходимые примеры конфигурации ModSecurity
Предупреждаем, делайте это находясь в директории `/var/lib/angie/modsecurity/`
```bash
cp coreruleset/crs-setup.conf.example coreruleset/crs-setup.conf
cp coreruleset/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf.example coreruleset/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf
cp coreruleset/rules/RESPONSE-999-EXCLUSION-RULES-AFTER-CRS.conf.example coreruleset/rules/RESPONSE-999-EXCLUSION-RULES-AFTER-CRS.conf
```
Добавим сигнатуры в сам ModSecurity, раскомментировав путь до новых файлов.
Для этого надо зайти в файл `/etc/angie/modsecurity/rules.conf` и раскомментировать эти строки
```
Include /var/lib/angie/modsecurity/coreruleset/crs-setup.conf
Include /var/lib/angie/modsecurity/coreruleset/rules/*.conf
```

### Добавление ModSecurity на веб-сайт
ModSecurity добавлен на сам веб-сервер, осталось подключить его к нужному веб-сайту.
Для этого надо добавить две строки в конфигурацию вашего виртуального хоста.
Если взять пример конфигурации выше, то эти строки можно добавить после директивы `server_name`.
Конечная конфигурация будет выглядеть:
```nginx
server {
    # Открыл один сокет для v6 и v4
    listen       [::]:80 ipv6only=off;
    server_name  webserver.internal;
    modsecurity on;
    modsecurity_rules_file /etc/angie/modsecurity/rules.conf;
    location / {
        root   /usr/share/angie/html;
        index  index.html index.htm;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/angie/html;
    }
}
```

Проверяем весь конфиг командой `angie -t`, должны получить:
```
angie: the configuration file /etc/angie/angie.conf syntax is ok
angie: configuration file /etc/angie/angie.conf test is successful
```

И перезапускаем веб-сервер командой `systemctl restart angie` или `service angie restart`

## Тестирование

Кажется, всё включено, но надо это протестировать.
Тут всё очень просто, достаточно curl команды
```bash
curl http://webserver.internal/?id=1%27%20OR%201=1--
```
Идём читать лог-файлы по пути `/var/log/angie/modsecurity/audit.log`

Там будет лежать полная информация о срабатывании в формате от A до Z

```text
---YfbqJyDU---A--
[10/Jan/2026:12:04:30 +0300] 176803587034.394162 ::ffff:192.168.1.10 30579 ::ffff:192.168.1.123 80
---YfbqJyDU---B--
GET /?id=1%27%20OR%201=1-- HTTP/1.1
Host: webserver.internal
User-Agent: curl/8.0.1
Accept: */*

---YfbqJyDU---D--

---YfbqJyDU---E--
<!DOCTYPE html>\x0a<html>\x0a<head>\x0a<title>Welcome to Angie!</title>\x0a<style>\x0ahtml { color-scheme: light dark; }\x0abody { width: 35em; margin: 0 auto;\x0afont-family: Tahoma, Verdana, Arial, sans-serif; }\x0a</style>\x0a</head>\x0a<body>\x0a<h1>Welcome to Angie!</h1>\x0a<p>If you see this page, the Angie web server is successfully installed and\x0aworking. Further configuration is required.</p>\x0a\x0a<p>For online documentation and support please refer to\x0a<a href="https://en.angie.software/">angie.software</a>.</p>\x0a\x0a<p><em>Thank you for using Angie.</em></p>\x0a</body>\x0a</html>\x0a

---YfbqJyDU---F--
HTTP/1.1 200
Server: nginx/1.29.3
Date: Sat, 10 Jan 2026 09:04:30 GMT
Content-Length: 546
Content-Type: text/html
Last-Modified: Mon, 29 Dec 2025 19:50:50 GMT
Connection: keep-alive
ETag: "6952db9a-222"

---YfbqJyDU---H--
ModSecurity: Warning. detected SQLi using libinjection. [file "/var/lib/angie/modsecurity/coreruleset/rules/REQUEST-942-APPLICATION-ATTACK-SQLI.conf"] [line "46"] [id "942100"] [rev ""] [msg "SQL Injection Attack Detected via libinjection"] [data "Matched Data: s&1c found within ARGS:id: 1' OR 1=1--"] [severity "2"] [ver "OWASP_CRS/4.22.0"] [maturity "0"] [accuracy "0"] [tag "application-multi"] [tag "language-multi"] [tag "platform-multi"] [tag "attack-sqli"] [tag "paranoia-level/1"] [tag "OWASP_CRS"] [tag "OWASP_CRS/ATTACK-SQLI"] [tag "capec/1000/152/248/66"] [hostname "webserver.internal"] [uri "/"] [unique_id "176803587034.394162"] [ref "v9,11"]
ModSecurity: Warning. Matched "Operator `Ge' with parameter `5' against variable `TX:BLOCKING_INBOUND_ANOMALY_SCORE' (Value: `5' ) [file "/var/lib/angie/modsecurity/coreruleset/rules/REQUEST-949-BLOCKING-EVALUATION.conf"] [line "222"] [id "949110"] [rev ""] [msg "Inbound Anomaly Score Exceeded (Total Score: 5)"] [data ""] [severity "0"] [ver "OWASP_CRS/4.22.0"] [maturity "0"] [accuracy "0"] [tag "anomaly-evaluation"] [tag "OWASP_CRS"] [hostname "webserver.internal"] [uri "/"] [unique_id "176803587034.394162"] [ref ""]

---YfbqJyDU---I--

---YfbqJyDU---J--

---YfbqJyDU---Z--
```

Стоит упомянуть, на данном этапе ModSecurity работает в режиме **только уведомлений**, после того как вы сделаете исправления на вашем сайте, чтобы не было ложных срабатываний, вы должны перевести WAF в режим отбрасывания вредных запросов.

## Включение WAF в работу по отбиванию вредоносного трафика
Необходимо зайти в файл `/etc/angie/modsecurity/modsecurity.conf`
И поменять параметр с
```text
SecRuleEngine DetectionOnly
```
на
```text
SecRuleEngine On
```
Не забудьте проверить конфигурацию и сделайте перезапуск веб-сервера.

## Окончательное тестирование

Исполним curl команду из прошлого тестирования и посмотрим на результат в лог-файле.

```text
---AUbE1s6z---A--
[10/Jan/2026:12:10:28 +0300] 176803622855.594605 ::ffff:192.168.1.10 30723 ::ffff:192.168.1.123 80
---AUbE1s6z---B--
GET /?id=1%27%20OR%201=1-- HTTP/1.1
Host: webserver.internal
User-Agent: curl/8.0.1
Accept: */*

---AUbE1s6z---D--

---AUbE1s6z---E--
<html>\x0d\x0a<head><title>403 Forbidden</title></head>\x0d\x0a<body>\x0d\x0a<center><h1>403 Forbidden</h1></center>\x0d\x0a<hr><center>Angie/1.11.1</center>\x0d\x0a</body>\x0d\x0a</html>\x0d\x0a

---AUbE1s6z---F--
HTTP/1.1 403
Server: nginx/1.29.3
Date: Sat, 10 Jan 2026 09:10:28 GMT
Content-Length: 153
Content-Type: text/html
Connection: keep-alive

---AUbE1s6z---H--
ModSecurity: Warning. detected SQLi using libinjection. [file "/var/lib/angie/modsecurity/coreruleset/rules/REQUEST-942-APPLICATION-ATTACK-SQLI.conf"] [line "46"] [id "942100"] [rev ""] [msg "SQL Injection Attack Detected via libinjection"] [data "Matched Data: s&1c found within ARGS:id: 1' OR 1=1--"] [severity "2"] [ver "OWASP_CRS/4.22.0"] [maturity "0"] [accuracy "0"] [tag "application-multi"] [tag "language-multi"] [tag "platform-multi"] [tag "attack-sqli"] [tag "paranoia-level/1"] [tag "OWASP_CRS"] [tag "OWASP_CRS/ATTACK-SQLI"] [tag "capec/1000/152/248/66"] [hostname "webserver.internal"] [uri "/"] [unique_id "176803622855.594605"] [ref "v9,11"]
ModSecurity: Access denied with code 403 (phase 2). Matched "Operator `Ge' with parameter `5' against variable `TX:BLOCKING_INBOUND_ANOMALY_SCORE' (Value: `5' ) [file "/var/lib/angie/modsecurity/coreruleset/rules/REQUEST-949-BLOCKING-EVALUATION.conf"] [line "222"] [id "949110"] [rev ""] [msg "Inbound Anomaly Score Exceeded (Total Score: 5)"] [data ""] [severity "0"] [ver "OWASP_CRS/4.22.0"] [maturity "0"] [accuracy "0"] [tag "anomaly-evaluation"] [tag "OWASP_CRS"] [hostname "webserver.internal"] [uri "/"] [unique_id "176803622855.594605"] [ref ""]

---AUbE1s6z---I--

---AUbE1s6z---J--

---AUbE1s6z---Z--
```

Обратим внимание на поле E, теперь, после включения WAF в режим отбивания, веб-сервер отдаёт код 403, а не 200.

Другими словами, всё работает!
