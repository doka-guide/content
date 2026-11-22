---
title: "Селектор по атрибуту"
description: "Находим элемент на странице по конкретному атрибуту."
baseline:
  - group: selectors
    features:
      - css.selectors.attribute
cover:
  author: kirakusto
  desktop: 'images/covers/desktop.svg'
  mobile: 'images/covers/mobile.svg'
  alt: 'Сачок, в который поймана белая рыба. Чёрные рыбы плавают в реке'
authors:
  - ezhkov
editors:
  - tachisis
contributors:
  - skorobaeus
  - starhamster
related:
  - css/selector-list
  - html/global-attrs
  - css/class-selector
tags:
  - doka
---

## Кратко

Селектор по атрибуту находит элемент на странице по значению либо по наличию атрибута.

## Пример

```html
<blockquote cite="А. С. Пушкин">
  Октябрь уж наступил — уж роща отряхает<br>
  Последние листы с нагих своих ветвей;
</blockquote>
```

Селектор ниже _найдёт_ все цитаты ([`<blockquote>`](/html/blockquote/)) с атрибутом `cite`:

```css
blockquote[cite] {
  background-color: #2E9AFF;
}
```

<iframe title="Фон для цитаты с атрибутом cite" src="demos/cite-bkg/" height="520"></iframe>

## Как пишется

Этот тип селектора помогает нам стилизовать элементы, опираясь либо на наличие самого атрибута, либо на его значение.

После элемента в квадратных скобках указывается атрибут. При выборке по значению дополнительно указывается, что атрибут должен быть равен значению в кавычках.

### `[attr]`

Селектор выберет все элементы, у которых присутствует атрибут `attr`.

```html
<button disabled>OK</button>
```

```css
[disabled] {
  opacity: 0.5;
}
```

### `[attr=value]` или `[attr="value"]`

Селектор выберет все элементы, атрибут `attr` которых в точности равен `value`.

<aside>

ℹ️ Если в значении атрибута есть пробелы или знаки, отличные от цифр и букв, то значение нужно указывать в кавычках. В остальных случаях кавычки не обязательны.

</aside>

```html
<a href="#">Пустая ссылка</a> <a href="#one">Эта ссылка не стилизуется</a>
```

```css
[href="#"] {
  color: red;
}
```

### `[attr~=value]`

Селектор выбирает все элементы, значение атрибута `attr` это перечень слов, разделённых пробелом, и среди этих слов есть такое, чьё значение равно `value`.

```html
<blockquote cite="Александр Сергеевич Пушкин">...</blockquote>
<blockquote cite="Лев Николаевич Толстой ">...</blockquote>
```

```css
[cite~="Пушкин"] {
  border: 1px solid green;
}
```

### `[attr|=value]`

Селектор выберет все элементы, значение атрибута `attr` которых либо в точности равно `value`, либо начинается с `value`, за которым следует символ дефиса `-` (U+002D). Подобный вариант селектора чаще всего используется для выбора по коду языка (например `en-US` или `en-GB`).

```html
<div lang="en-us en-gb en-au en-nz">Hello World!</div>
<div lang="zh-CN">世界您好！</div>
<div lang="zh-TW">世界您好！</div>
```

Выберет первый `<div>`:

```css
[lang|="en"] {
  color: blue;
}
```

Выберет два других `<div>`:

```css
[lang|="zh"] {
  color: red;
}
```


### `[attr^=value]`

Селектор выберет все элементы, значение атрибута `attr` которых начинается с `value`.

```html
<a href="https://secure.com/">Ссылка по протоколу HTTPS</a>
<a href="http://secure.com/">Ссылка по протоколу HTTP</a>
```

У ссылок по протоколу HTTPS справа отображается замок:

```css
[href^="https"]::after {
  content: "🔐";
  margin-left: 3px;
}
```

### `[attr$=value]`

Селектор выберет все элементы, значение атрибута `attr` которых оканчивается на `value`.

```html
<a href="https://apple.com/">Apple US</a>
<a href="https://apple.com/ru">Apple Russia</a>
<a href="https://apple.com/it">Apple Italy</a>
```

```css
a::after {
  content: "🇺🇸";
}
a[href$="/ru"]::after {
  content: "🇷🇺";
}
a[href$="/it"]::after {
  content: "🇮🇹";
}
```

### `[attr*=value]`

Селектор выберет все элементы, атрибут `attr` которых содержит в себе значение `value`.

```html
<img src="/img/myadvertisingbanner.png">
<img src="/img/other-advert-banner.png">
<img src="/img/Advert-image.png">
```

Спрячет две первых рекламных картинки. Оба изображения в атрибуте `src` содержат подстроку _advert_.

```css
img[src*="advert"] {
  display: none;
}
```

<aside>

❗️ Третья картинка не спрячется, потому что не совпал регистр символов. `Advert` и `advert` — это разные значения с точки зрения браузера.

</aside>

### `[attr operator value i]`

Если добавить в скобки после значения атрибута `i` или `I`, то браузер будет игнорировать регистр символов.

```html
<img src="/img/myadvertisingbanner.png">
<img src="/img/other-advert-banner.png">
<img src="/img/Advert-image.png">
```

Теперь будут спрятаны все три картинки

```css
img[src*="advert" i] {
  display: none;
}
```
