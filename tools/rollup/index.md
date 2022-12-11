---
title: "`Rollup`"
description: "Сборщик проектов JavaScript."
authors:
  - bellabzhu
related:
  - tools/webpack
  - tools/bundlers
tags:
  - article
  - placeholder
keywords:
  - сборщик
  - бандл
---

## Кратко

[`Rollup`](https://rollupjs.org/guide/en) это [`сборщик проекта`](/tools/bundlers/) для JavaScript. [`Webpack`](/tools/webpack/) более популярный, но, попробовав Rollup, многие разработчики [остаются](https://2021.stateofjs.com/en-US/libraries/build-tools/) на нем.

## Установка
Для установки требуется [`Node.js`](/tools/nodejs/) версии 8.0.0 или выше. Установить через __[`npm`](/tools/package-managers/)__ нужно командой в консоли:

```bash
npm install --global rollup
```

`--global` устанавливает пакет глобально, поэтому команды `Rollup` будут доступны из любой папки проекта.

## Как пользоваться

🧑‍💻 По отзывам разработчиков `Rollup` проще и понятнее, чем `Webpack`.

Обычно `Rollup` используют из командной строки, но у него есть ещё и [JavaScript API](https://rollupjs.org/guide/en/#javascript-api)

Посмотреть список команд можно так:

```bash
rollup --help
```

А эта команда собирает бандл:

```bash
# main.js - входная точка (entry point) вашего проекта;
# bundle.js - имя будущего бандла;
# скомпилируется в <script>, содержащий самозапускающуюся функцию ('iife');
rollup main.js --file bundle.js --format iife
```

Кстати, _entry point_ в `Rollup` может быть не только файл _.js_, но и _.html_. Правда для этого нужен плагин, например _rollup-plugin-html-entry_.

## Как настроить

Для настройки сборки нужно создать файл _rollup.config.js_ в корне проекта. Пропишем в нем базовую настройку:

```js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
};
```

Для использования запустим команду:

```bash
rollup -c
```

## Что умеет

  - пересобирает бандл в реальном времени при изменении кода;
  - проверяет синтаксис и форматирование кода;
  - может сделать из одного проекта несколько бандлов: для ES6, ES5 для старых браузеров, версию для Node.js;
  - убирает пробелы в коде для уменьшения веса файлов;
  - поддерживает плагины;
  - использует Tree Shaking;
  - использует разделение кода _(code splitting)_;

### Tree Shaking

Когда приложение разрастается, то найти вручную неиспользуемые строки становится сложно. [`Tree Shaking`](https://en.wikipedia.org/wiki/Tree_shaking) - это метод оптимизации, который анализирует и убирает лишний код. Это позволяет уменьшить вес и улучшить быстродействие приложения. Но работает он в довольно ограниченном количестве случаев.

`Tree Shaking` работает в `Rollup` по умолчанию и его не надо активировать как в `Webpack`.

### Разделение кода _(code splitting)_

Когда бандлер собрал большой проект в единый файл, может возникнуть проблема с долгой загрузкой. В таких случаях `Rollup` использует разделение кода [_(code splitting)_](https://developer.mozilla.org/en-US/docs/Glossary/Code_splitting). Это значит, что код будет подгружаться постепенно и именно тот, который нужен сейчас пользователю - стратегия [`lazy load`](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading).
