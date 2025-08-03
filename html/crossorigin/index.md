---
title: "Атрибут `crossorigin`"
description: "Расскажем как этот атрибут помогает браузеру правильно загружать ресурсы с других источников, учитывая их CORS политику"
authors:
  - drakesbot12
keywords:
  - cors
  - кроссдоменные
  - use-credentials
  - crossorigin
related:
  - html/rel
  - html/video
  - html/audio
tags:
  - doka
---

## Кратко

Атрибут `crossorigin` указывает браузеру, как обращаться с внешними (кроссдоменными) ресурсами, чтобы соблюсти политику [Cross-Origin Resource Sharing](/tools/cors/).

Используется, например, с изображениями, шрифтами, видео, аудио, скриптами и стилями, подключёнными с других доменов.

## Пример

```html
<!-- Подключаем шрифт с другого домена -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Manrope&display=swap"
  crossorigin="anonymous"
/>

<!-- Видео с другого домена, требующее авторизации -->
<video controls crossorigin="use-credentials">
  <source src="https://example.com/secure/video.mp4" type="video/mp4" />
</video>
```

## Как пишется

Атрибут `crossorigin` может принимать три значения:

- `anonymous` — отправляет запрос без учётных данных (cookies, заголовков авторизации и client certificates). Но ответ должен содержать заголовок `Access-Control-Allow-Origin`.
- `use-credentials` — отправляет запрос с учётными данными. Ответ от сервера в этом случае должен включать:

```yaml
Access-Control-Allow-Origin: [точный домен]
Access-Control-Allow-Credentials: true
```

- Значение по умолчанию — `anonymous`.

Применяется в таких тегах: [`<img>`](/html/img/), [`<script>`](/html/script/), [`<link>`](/html/link/), [`<audio>`](/html/audio/), [`<video>`](/html/video/), [`<iframe>`](/html/iframe/), `<use>` (в SVG).

## Как понять

Браузер защищает сайты от того, чтобы внешние ресурсы получали доступ к приватной информации пользователя (например, к cookies или токенам). Атрибут `crossorigin` явно говорит браузеру, как вести себя при загрузке ресурсов с других источников, особенно когда результат нужен для JS (например, отрисовка изображения на `<canvas>` или доступ к видео).

Если политика не соблюдена — может не загрузиться ресурс или возникнуть CORS-ошибка в консоли.

## Подсказки
💡 Если вы подключаете ресурсы с CDN, и они не загружаются, попробуйте добавить `crossorigin="anonymous"`.
💡 Без `crossorigin` некоторые теги работают, но доступ к данным ресурса через JavaScript (например, для анализа аудио) будет невозможен.
💡 Проверяйте консоль браузера — она подскажет, если нарушена политика [CORS](/tools/cors/).
