---
title: "`:lang()`"
description: "Задавайте стили тексту в зависимости от языка, на котором он написан."
baseline:
  - group: lang
    features:
      - css.selectors.lang
authors:
  - almadef
related:
  - html/meta
  - tools/http-protocol
  - html/global-attrs
tags:
  - doka
---

## Кратко

Псевдокласс `:lang()` выбирает элементы в зависимости от их языка, который определяется комбинацией атрибута [`lang`](/html/global-attrs/#lang), тега [`<meta>`](/html/meta/) и иногда информацией из протокола передачи данных (такой, как [заголовки HTTP](/tools/http-protocol/#ispolzovanie-zagolovkov)).

## Пример

Предложениям будут присвоены стили в зависимости от языка, который указан в атрибуте [`lang`](/html/global-attrs/#lang).

```html
<blockquote lang="de">
  <p>Der Mensch, versuche die Gotter nicht.</p>
</blockquote>

<blockquote lang="fr">
  <p>Ce que femme veut, Dieu le veut.</p>
</blockquote>

<blockquote lang="en">
  <p>То be or not to be.</p>
</blockquote>
```

```css
blockquote p::before {
  content: open-quote;
}

blockquote p::after {
  content: close-quote;
}

blockquote:lang(de) {
  quotes: "„" "“";
}

blockquote:lang(fr) {
  quotes: "«" "»";
}

blockquote:lang(en) {
  quotes: "“" "”";
}
```

<iframe title="Несколько языков" src="demos/many-lang/" height="130"></iframe>

## Как пишется

После любого [селектора](/css/css-rule/#selektor) ставим двоеточие и пишем ключевое слово `lang()`. В скобках указываем, для какого языка применяются правила. Список доступных языков можно посмотреть в [ISO 639-1 Language Codes](http://xml.coverpages.org/iso639a.html).

```css
p:lang(es) {
  background-color: orange;
  font-size: 16px;
}
```

## Как понять

Иногда на странице текст может состоять из разных языков, например, основной текст написан на русском, но имеет цитаты на английском. В этом случае с помощью `:lang()` можно придать особое оформление конкретному языку.

## Подсказки

💡 Тег [`<q>`](/html/q/) автоматически изменяет вид кавычек в зависимости от языка.

```html
<p><q lang="ru">слово</q></p>
<p><q lang="es">palabra</q></p>
<p><q lang="pl">cześć</q></p>
```

<iframe title="Кавычки" src="demos/q/" height="130"></iframe>
