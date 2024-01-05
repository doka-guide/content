## Начальная конфигурация для старта проекта

При старте нового проекта часто копирую из заметок одну из этих заготовок.

1. Если приложение слушает определённый порт и нужен обратный прокси (reverse proxy) с локального хоста. Это решение подходит, чтобы крутить на сервере Node.js-приложения и отдавать результаты по запросу на определённый домен. Подходит, чтобы запускать Next, Nuxt, Express и всё подобное на собственном домене.

```nginxconf
server {
  listen 80;
  listen [::]:80;
  server_name yourdomain.com www.yourdomain.com;

  location / {
    proxy_redirect off;
    proxy_pass http://localhost:3000;
  }
}
```

Эта конфигурация позволит обращаться к приложению, которое слушает порт 3000 по адресу yourdomain.com (без порта).

Для простоты тут описан 80 порт, но вы, конечно же настроите себе HTTPS-сертификаты, и порт изменится на 443. Приложение тоже может использовать любой другой порт,  не обязательно `:3000`.

2. Бывает хочется, чтобы к вашим HTML-страницам на сайте можно было обращаться без указания расширения. Вот так: `https://mydomain.com/hello`, а не так `https://mydomain.com/hello.html`. При этом, если в дочерней директории окажется файл с именем `index.html`, нужно чтобы этот файл вызывался без указания своего имени внутри директории. Другими словами, нужен конфиг, который обслуживает такую структуру файлов:

```
|--index.html
|--about.html
|--posts
|--|--index.html
|--|--post-1.html
```

По URL-адресу `https://mydomain.com/about` откроется страница `about.html`, а по адресу `https://mydomain.com/posts` — страница `/posts/index.html`.

Вот готовое решение:

```nginxconf
server {
  root /path-to-your-static-files;
  index index.html index.htm index.nginx-debian.html;
  server_name mydomain.com www. mydomain.com;

  location / {
    rewrite ^/([^.]+)$ /$1.html break;
    try_files $uri $uri/ /$1/index.html;
  }
}
```
