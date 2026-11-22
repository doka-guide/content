---
title: "`<track>`"
description: "Тег `<track>` добавляет субтитры, описания или переводы к видео и аудио через отдельный текстовый файл."
baseline:
  - group: text-tracks
    features:
      - html.elements.track
authors:
  - drakesbot12
keywords:
  - субтитры
  - captions
  - video
  - track
  - html
  - аудио
related:
  - html/video
  - html/audio
  - html/source
tags:
  - doka
---

## Кратко

Тег `<track>` используется внутри [`<video>`](/html/video/) или [`<audio>`](/html/audio/) и добавляет к медиаконтенту текстовые дорожки: субтитры, описания, переводы и другие вспомогательные данные. Содержимое берётся из отдельного файла формата `WebVTT` (`.vtt`).

## Пример

```html
<video controls width="400">
  <source src="video.mp4" type="video/mp4">
  <track
    src="subtitles_ru.vtt"
    kind="subtitles" srclang="ru"
    label="Русский" default
  >
  <track
    src="subtitles_en.vtt"
    kind="subtitles" srclang="en"
    label="English"
  >
</video>
```

## Как пишется

Тег `<track>` — одиночный, должен находится внутри `<video>` или `<audio>`.

Основные атрибуты:

- `src` — путь к файлу `.vtt`, содержащему субтитры или метаданные.
- `kind` — тип дорожки:
  - `subtitles` — субтитры (самый частый случай).
  - `captions` — субтитры с описанием звуков (для слабослышащих).
  - `descriptions` — словесные описания для слабовидящих.
  - `chapters` — делит медиа на главы.
  - `metadata` — любые метаданные, не предназначенные для показа пользователю.
- `srclang` — язык содержимого (например, `"ru"`, `"en"`).
- `label` — видимое имя дорожки в интерфейсе выбора.
- `default` — делает дорожку выбранной по умолчанию.

```html
<track
  src="captions.vtt"
  kind="captions" srclang="en"
  label="English captions" default
>
```

<aside>

⚠️ На данный момент `kind='descriptions'` не поддерживается ни одним браузером, проверяйте поддержку на [Can I Use](https://caniuse.com/mdn-html_elements_track_kind_descriptions)

</aside>

## Как понять

`<track>` — это вспомогательная надстройка над медиа: сам по себе тег не отображается, но его влияние видно при воспроизведении. Он подключает дополнительную текстовую информацию, которую плеер может отобразить поверх видео или использовать для других целей.

Чтобы `<track>` работал, файл должен быть в формате [WebVTT (Web Video Text Tracks)](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API), где прописаны временные метки и тексты.

Пример содержимого _subtitles_en.vtt_:

```
WEBVTT

00:00:01.000 --> 00:00:04.000
Welcome to the video!

00:00:05.000 --> 00:00:08.000
Here we explain how to use the track element.
```

## Подсказки

💡 Если вы указываете `default`, он должен быть только один на каждый тип дорожки.
💡 Расширение файла должно быть `.vtt`. Нельзя использовать `.srt`, `.txt` и другие — браузер их не поддержит.
💡 Даже если пользователь не включает субтитры, они остаются в DOM и могут быть доступны через JavaScript API.
💡 Отдельный `media` элемент не может иметь элементы `<track>` с одинаковыми значениями `kind`, `srclang` и `label`.
💡 Проверяйте работу треков в разных браузерах. Safari, например, может не отображать пользовательский интерфейс выбора субтитров по умолчанию.
💡 Если у атрибута `kind` значение не указано, то тип по умолчанию — `subtitles` (субтитры). Если атрибут отсутствует, будет использоваться `subtitles`. Если атрибут содержит недопустимое значение, оно принимает значение `metadata`.
