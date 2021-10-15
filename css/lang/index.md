---
title: ":lang"
description: ""
authors:
  - Almadef
tags:
  - doka
---

## Кратко

Псевдокласс `:lang` выбирает элементы, в зависимости от их языка, который определяется комбинацией атрибута [`lang`](/html/global-attrs/#lang), тега [`<meta>`](/html/meta/) и иногда информацией из протокола передачи данных (такой, как [заголовки HTTP](/tools/http-protocol/#ispolzovanie-zagolovkov)).

## Пример

Предложениям будут присвоены стили, в зависимости от языка, который указан в атрибуте [`lang`](/html/global-attrs/#lang) тэга [`<p>`](/html/p/).

```html
<p lang="de">Предложение на немецком языке.</p>
<p lang="fr">Предложение на французском языке.</p>
<p lang="en">Предложение на английском языке.</p>
```

```css
p:lang(de) {
  font-size: 16px;
  color:Tomato;
}
p:lang(fr) {
  font-size: 12px;
  color:DodgerBlue;
}
p:lang(en) {
  font-size: 20px;
  color:MediumSeaGreen;
}
```

<iframe title="Несколько языков" src="demos/many-lang/" height="130"></iframe>

## Как пишется

После любого [селектора](/css/attribute-selector/) ставим двоеточие и пишем ключевое слово `lang`. В скобках указываем, для какого языка применяются правила. Список доступных языков можно посмотреть в [ISO 639-1 Language Codes](http://xml.coverpages.org/iso639a.html).

```css
div:lang(es) {
  background-color: orange;
  font-size: 16px;
}
```

## Как это понять

Иногда на странице текст может состоять из разных языков, например основной текст написан на русском, но имеет цитаты на английском. В этом случае с помощью `:lang` можно придать особое оформление конкретному языку.

## Подсказки

💡 Тег [`<q>`](/html/q/) автоматически изменяет вид кавычек в зависимости от языка.

```html
<p><q lang="ru">lorem</q></p>
<p><q lang="es">lorem</q></p>
<p><q lang="dech">lorem</q></p>
```

<iframe title="Кавычки" src="demos/q/" height="120"></iframe>
