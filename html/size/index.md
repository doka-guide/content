---
title: "Атрибут `size`"
description: "Задаёт размеры тегам `<input>` и `<select>`."
baseline:
  - group: input
    features:
      - html.elements.input.size
  - group: select
    features:
      - html.elements.select.size
authors:
  - inventoris
contributors:
  - skorobaeus
  - tatianafokina
related:
  - html/input
  - html/select
  - css/font-family
tags:
  - doka
---

## Кратко

Атрибутом `size` можно задать ширину поля [`<input>`](/html/input/) в символах или количество видимых опций списка в случае [`<select>`](/html/select/).

## Пример

Зададим ширину `<input>` с помощью `size`. Поле ввода растянется так, чтобы в видимую часть поместилось не меньше 9 символов моноширинного шрифта.

```html
<label for="input-field">Поле ввода:</label>
<input id="input-field" size="9" placeholder="123456789">
```

<iframe title="Использование атрибута size в поле" src="demos/basic-input/" height="250"></iframe>

В примере ниже зададим `size` для `<select>`. Число 3 определит количество видимых параметров списка.

```html
<label for="city-select">Ваш город:</label>
<select id="city-select" size="3">
  <option value="novosibirsk">Калининград</option>
  <option value="petrozavodsk">Петрозаводск</option>
  <option value="petrozavodsk">Зеленоград</option>
  <option value="petersburg">Санкт-Петербург</option>
  <option value="samara">Самара</option>
  <option value="perm">Пермь</option>
</select>
```

<iframe title="Использование атрибута size в select" src="demos/basic-select/" height="400"></iframe>

Поскольку `size="3"`, видимая часть списка содержит только 3 города. Чтобы изучить остальные, нужно воспользоваться прокруткой.

## Как понять

В случае `<input>` задать ширину с помощью атрибута `size` можно не для всех типов ввода. Подойдут лишь те, что принимают текстовые данные:

- `type="text"`
- `type="password"`
- `type="email"`
- `type="url"`
- `type="tel"`
- `type="search"`

Если шрифт будет не моноширинный, выставить ширину для `<input>` с помощью атрибута `size` окажется затруднительно — внутрь поля ввода может поместиться непредсказуемое число символов.

```css
body {
  /* Подключаем немоноширинный шрифт */
  font-family: "Roboto", sans-serif;
}

input {
  font-family: inherit;
}
```

```html
<label for="input-field">Поле ввода:</label>
<input id="input-field" size="3" placeholder="123456789">
```

<iframe title="Использование атрибута size в input без моноширинного шрифта" src="demos/input-size-without-monospace/" height="250"></iframe>

Как видно из примера, в `<input>` помещается куда больше трёх символов, хотя атрибут `size="3"` задан. Причина в нашем шрифте `Roboto`, — он не моноширинный, а значит для `<input>` каждый символ занимает немного разное пространство, и ему очень тяжело определиться с размерами 🤕

## Подсказки

💡 Если поставить в теге `<select>` атрибут [`multiple`](/html/multiple/) и задать `size="1"`, из списка получится обыкновенная «прокрутка».

💡 Хотя атрибут `size` выглядит удобным, использовать его для `<input>` следует с осторожностью. Порой даже с моноширинными шрифтами он может сделать что-то странное, растягивая поле ввода на неожиданное число символов.
