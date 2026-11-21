---
title: "`@font-face`"
description: "Подключаем кастомные шрифты."
baseline:
  - group: font-face
    features:
      - css.at-rules.font-face
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - директива
  - подключение шрифта
  - шрифт
  - кастомный шрифт
related:
  - css/import
  - css/font-family
  - css/url
tags:
  - doka
---

## Кратко

Встроенных в операционные системы шрифтов часто не хватает для создания уникального дизайна сайта. Для подключения нестандартных шрифтов существует директива `@font-face`. С её помощью можно подключить и использовать на странице любой шрифт из файла.

При загрузке сайта браузер будет брать шрифт из указанного файла и отображать текст именно этим шрифтом.

## Пример

Подключим к странице шрифт **Lexend Peta** и сделаем его основным шрифтом нашего сайта.

```css
@font-face {
  font-family: "Lexend Peta";
  src: local("Lexend Peta Regular"),
    local("LexendPeta-Regular"),
    url("Lexend_Peta-webfont.woff2") format("woff2"),
    url("Lexend_Peta-webfont.woff") format("woff"),
    url("Lexend_Peta-webfont.svg") format("svg");
  font-weight: normal;
}

body {
  font-family: "Lexend Peta", sans-serif;
}
```

## Как пишется

Директива `@font-face` по своей «анатомии» отличается от стандартных CSS-правил, где есть селектор и применяемые к нему правила. Основное отличие в том, что на месте селектора мы активируем функцию, адресованную браузеру.

Внутри этого правила должно быть два обязательных свойства:

1. Название шрифта, которое мы будем использовать ниже в CSS: свойство `font-family`. Название может отличаться от настоящего названия этого шрифта.
1. Ссылки на файлы, из которых браузер может взять шрифт: свойство `src`.

Тут важно указать ссылки на файлы в нескольких форматах, чтобы любой браузер — старый или новый — мог загрузить шрифт в понятном ему формате. Принято хранить и подключать шрифты в форматах WOFF, WOFF2, SVG.

Подключение из внешних файлов происходит при помощи конструкции `url("ссылка-на-файл")`. Несколько файлов можно подключить, перечислив эти конструкции несколько раз через запятую.

Если указаны ссылки на несколько файлов в разных форматах, то после `url()` оставляют браузеру подсказку в виде записи `format("формат-подключаемого-файла")`.

Поскольку пользователь имеет возможность устанавливать в свою систему любые нестандартные шрифты, то есть вероятность, что нужный нам шрифт уже есть на его компьютере. Если это так, то браузеру будет удобнее и быстрее взять шрифт из системы, чем читать файл.

Для этого в качестве одного или нескольких значений у свойства `src` можно указать конструкцию `local("имя-шрифта-в-системе")`. Нужно указывать локальные названия до ссылок на внешние файлы, чтобы браузер, найдя шрифт в системе под таким именем, даже не пошёл загружать и читать внешние файлы.

На сайте может использоваться один и тот же шрифт, но в разных начертаниях. Например, жирный `font-weight: bold` или курсив `font-style: italic`. В этом случае вам нужно будет подключить разные файлы, содержащие эти начертания.

Тут есть два подхода.

Первый — использовать разные `@font-face` для подключения разных начертаний шрифта, называя их разными именами. Например, `"Lexend Peta Regular"`, `"Lexend Peta Bold"` и `"Lexend Peta Italic"`. Выглядеть это будет так:

```css
@font-face {
  font-family: "Lexend Peta Regular";
  src: local("Lexend Peta Regular"),
    local("LexendPeta-Regular"),
    url("Lexend Peta-webfont.woff2") format("woff2"),
    url("Lexend Peta-webfont.woff") format("woff"),
    url("Lexend Peta-webfont.svg") format("svg");
}

@font-face {
  font-family: "Lexend Peta Bold";
  src: local("Lexend Peta Bold"),
    local("LexendPeta-Bold"),
    url("Lexend Peta Bold-webfont.woff2") format("woff2"),
    url("Lexend Peta Bold-webfont.woff") format("woff"),
    url("Lexend Peta Bold-webfont.svg") format("svg");
}

@font-face {
  font-family: "Lexend Peta Italic";
  src: local("Lexend Peta Italic"),
    local("LexendPeta-Italic"),
    url("Lexend Peta Italic-webfont.woff2") format("woff2"),
    url("Lexend Peta Italic-webfont.woff") format("woff"),
    url("Lexend Peta Italic-webfont.svg") format("svg");
}
```

Далее, ниже по коду, используем в разных местах разные начертания шрифтов:

```css
body {
  font-family: "Lexend Peta Regular", sans-serif;
}

.title {
  font-family: "Lexend Peta Bold", sans-serif;
}

.accent {
  font-family: "Lexend Peta Italic", sans-serif;
}
```

Второй — подключить все файлы начертаний, но использовать для них одно и то же имя шрифта, указав дополнительно, для какого стиля и жирности этот файл. Тогда не нужно будет переопределять шрифт для разных элементов, достаточно будет указывать нужный стиль или жирность шрифта.

Говорим браузеру, что эти файлы используем для нормального начертания:

```css
@font-face {
  font-family: "Lexend Peta";
  src: local("Lexend Peta Regular"),
    local("LexendPeta-Regular"),
    url("Lexend Peta-webfont.woff2") format("woff2"),
    url("Lexend Peta-webfont.woff") format("woff"),
    url("Lexend Peta-webfont.svg") format("svg");
  font-weight: normal;
}
```

Говорим браузеру, что эти файлы используем для жирного начертания:

```css
@font-face {
  font-family: "Lexend Peta";
  src: local("Lexend Peta Bold"),
    local("LexendPeta-Bold"),
    url("Lexend Peta Bold-webfont.woff2") format("woff2"),
    url("Lexend Peta Bold-webfont.woff") format("woff"),
    url("Lexend Peta Bold-webfont.svg") format("svg");
  font-weight: bold;
}
```

Говорим браузеру, что эти файлы используем для курсива:

```css
@font-face {
  font-family: "Lexend Peta";
  src: local("Lexend Peta Italic"),
    local("LexendPeta-Italic"),
    url("Lexend Peta Italic-webfont.woff2") format("woff2"),
    url("Lexend Peta Italic-webfont.woff") format("woff"),
    url("Lexend Peta Italic-webfont.svg") format("svg");
  font-style: italic;
}
```

После этого используем в разных местах разные начертания шрифтов:

```css
body {
  font-family: "Lexend Peta", sans-serif;
  font-weight: normal;
}

.title {
  font-weight: bold;
}

.accent {
  font-style: italic;
}
```

## Подсказки

💡 Важно, чтобы файлы со шрифтами лежали на том же домене, что и сайт, на котором они используются. Если вы захотите обратиться к шрифтам из другого домена, то подобный запрос будет заблокирован по правилам безопасности запросов с разными источниками ([CORS](/tools/cors/)).

💡 `@font-face` нужно объявлять до того, как вы обратитесь в CSS к этому шрифту. Принято подключать шрифты в самом начале файла стилей (но после всех [`@import`](/css/import/)).

💡 `@font-face` нельзя объявить внутри другого CSS-правила.

💡 Важно использовать в точности то название подключённого шрифта, которое вы задаёте внутри `@font-face`. Иначе магия не сработает.
