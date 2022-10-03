---
title: "`<object>`"
description: "Встраиваем мультимедиа на страницу."
authors:
  - kalpovskii
keywords:
  - встраиваемый объект
related:
  - html/iframe
  - html/video
  - html/embed
tags:
  - doka
---

## Кратко

Тег `<object>` используется для встраивания на страницу других страниц или мультимедийных элементов (PDF, Flash, видео- или аудио-плееров).

## Пример

Встраивание видео с YouTube:

```html
<object
  type="video/mp4"
  data="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  width="1280"
  height="720">
</object>
```

Обычно поле `type` нужно указывать, но для YouTube-видео это необязательно.

## Как пишется

```html
<object class="pdf_example" type="application/pdf"
  data="example.pdf"
  width="300"
  height="200">
  <a href="example.pdf">Лунная соната №14 PDF</a>
</object>
```

<iframe title="Встроенный pdf с помощью <object>" src="./demos/show-pdf/" height="310"></iframe>

Если браузер не поддерживает тип встроенного файла, то он покажет вложенное содержимое в качестве фолбэка. В нашем примере, если встраивание PDF-инструкции не поддерживается, то мы увидим ссылку на её скачивание.

Доступные атрибуты:

- `data` — ссылка на встраиваемый ресурс;
- `type` — MIME-тип подгружаемого объекта;
- `name` — имя объекта;
- `usemap` — атрибут для связи объекта с тегом `<map>`;
- `width` — ширина объекта;
- `height` — высота объекта;
- `form` — связь с одной или несколькими формами.
