---
title: "<!DOCTYPE>"
tags:
  - doka
authors:
  - grachev
contributors:
  - vladimir
  - solarrust
  - pepelsbey
summary:
  - doctype
  - тэг
  - тег
  - <!doctype>
  - доктайп
---

## Кратко

`<!DOCTYPE>` или «доктайп » —  это сокращение «тип документа» (document type). Доктайп  говорит браузеру «работай со страницей в стандартном режиме, плиз». Единственный доктайп, который вам нужно знать `<!DOCTYPE html>` — поставьте его первой строчкой HTML-документа и браузер обработает его правильно.

## Пример

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Дока</title>
    <link rel="stylesheet" href="/assets/styles/main.css">
  </head>
</html>
```

## Как пишется

```html
<!DOCTYPE html>
```

## Как это понять

Есть несколько исторических версий HTML, включая специальную — XHTML. Все они обозначались своими доктайпами и их вариациями, которые вы можете встретить в старом коде:

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

Сегодня доктайп [по спецификации](https://html.spec.whatwg.org/multipage/syntax.html#the-doctype) не нужен, но без него браузеры переключатся в режим совместимости (quirks mode) со старым кодом. Поверьте, вы не хотите оказаться в режиме совместимости. Любой из упомянутых доктайпов переключит браузер в стандартный режим (standards mode), ведь каждый из них содержит самое важное: `<!DOCTYPE HTML` — что идёт дальше браузер уже не интересует, лишь бы оно заканчивалось закрывающей скобкой `>`.

Поэтому проще всего писать: `<!DOCTYPE html>`.

Теги и атрибуты в HTML не зависят от регистра (хотя доктайп это не тег, строго говоря), поэтому все вариации ниже абсолютно равнозначны, даже последняя — но лучше не надо так писать.

```html
<!DOCTYPE html>
<!DOCTYPE HTML>
<!doctype HTML>
<!doctype html>
<!DoCtYPe hTMl>
```

Доктайп стал для HTML чем-то вроде [`use strict`](/js/language-versions/#строгий-режим) из JS.
