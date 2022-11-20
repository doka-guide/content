---
title: "`text-decoration`"
authors:
  - solarrust
contributors:
  - furtivite
  - skorobaeus
keywords:
  - декорирование текста
  - подчёркивание текста
  - перечёркнутый текст
  - надчёркнутый текст
tags:
  - doka
---

## Кратко

Свойство `text-decoration` позволяет добавить декоративные линии тексту. Текст можно подчеркнуть, перечеркнуть или добавить линию над текстом.

`text-decoration: underline` часто встречается при работе со ссылками.

## Пример

Создадим четыре абзаца текста. По одному для каждого из доступных значений свойства `text-decoration`.

```html
<div class="parent">
  <p class="none">Диакритические знаки...</p>
  <p class="underline">В типографике...</p>
  <p class="line-through">Диакритическими знаками не могут...</p>
  <p class="overline">Черта сверху — типографический знак...</p>
</div>
```

```css
.none {
  /* Значение по умолчанию, ничего не меняется */
  text-decoration: none;
}

.underline {
  /* Нижнее подчёркивание */
  text-decoration: underline;
}

.line-through {
  /* Перечёркнутый текст */
  text-decoration: line-through;
}

.overline {
  /* Линия над текстом */
  text-decoration: overline;
}
```

<iframe title="Декор текста" src="demos/basic/" height="460"></iframe>

## Как понять

По факту свойство `text-decoration` является шорткатом и позволяет указать значения для свойств:

- [`text-decoration-line`](/css/text-decoration-line/) — положение декоративной линии;
- [`text-decoration-style`](/css/text-decoration-style/) — стиль декоративной линии;
- [`text-decoration-color`](/css/text-decoration-color/) — цвет декоративной линии.

Но, как правило, его используют только для указания положения линии.

## Как пишется

### Положение линии

Пишем свойство `text-decoration` и после двоеточия указываем одно из доступных значений:

- `underline` — подчёркнутый текст.
- `line-through` — перечёркнутый текст.
- `overline` — надчёркнутый текст, линия находится над словами.
- `none` — отменяет все эффекты.

Выше указаны стандартные значения, с которыми вы будете сталкиваться чаще всего.

### Стиль линии

Не многие знают, что после ключевого слова, означающего положение линии, можно указать ещё и стиль этой линии и её цвет.

Для управления стилем линии используются следующие ключевые слова:

- `solid` — сплошная линия. Значение по умолчанию.
- `double` — двойная линия.
- `dotted` — точечная линия.
- `dashed` — пунктирная линия.
- `wavy` — волнистая линия.

Управлять стилем подчёркивания обычно не требуется, но об этой возможности знать нужно.

Как будет выглядеть двойное перечёркивание:

```css
selector {
  text-decoration: line-through double;
}
```

Стиль линии можно указать отдельно при помощи свойства [`text-decoration-style`](/css/text-decoration-style/).

<iframe title="Стиль линии декора текста" src="demos/style/" height="460"></iframe>

### Цвет линии

Цвет линии по умолчанию совпадает с цветом текста, для которого задаётся свойство `text-decoration`.

Мы можем изменить это значение, указав после ключевых слов типа и стиля линии код цвета в любом доступном в вебе формате.

Например, сделаем двойное подчёркивание красного цвета:

```css
selector {
  text-decoration: underline double #ff0000;
}
```

Цветом линии можно управлять отдельно при помощи свойства [`text-decoration-color`](/css/text-decoration-color/):

<iframe title="Стиль и цвет линии декора текста" src="demos/style-color/" height="460"></iframe>

## Подсказки

💡 Свойство не наследуется.

💡 Значение по умолчанию для обычного текста — `none`. Но для ссылок ([`<a>`](/html/a/)) значение по умолчанию — `underline`.

💡 Свойство `text-decoration` целиком нельзя анимировать при помощи свойства `transition` 😒

Но можно анимировать цвет линии!

Пусть по умолчанию цвет линий будет совпадать с цветом текста, а по наведению курсора цвет будет меняться на другой за 0.3 секунды.

```html
<p class="none">К диакритикам...</p>
<p class="underline">Дополнение подчёркивается...</p>
<p class="line-through">Эпанортозис...</p>
<p class="overline">В большинстве языков...</p>
```

```css
p {
  transition: text-decoration-color 0.3s;
}

.none {
  text-decoration: none;
}

.underline {
  text-decoration: underline;
}

.line-through {
  text-decoration: line-through;
}

.overline {
  text-decoration: overline;
}

.dotted {
  text-decoration-style: dotted;
}

.double {
  text-decoration-style: double;
}

.wavy {
  text-decoration-style: wavy;
}

.blue:hover {
  text-decoration-color: #1a5ad7;
}

.red:hover {
  text-decoration-color: #ed6742;
}

.green:hover {
  text-decoration-color: #49a16c;
}
```

<a name="example"></a>

<iframe title="Анимированный декор текста" src="demos/color/" height="460"></iframe>

💡 Нельзя управлять толщиной и точным положением линии, заданной при помощи `text-decoration`.

💡 Если по дизайну требуется задать тексту или ссылке подчёркивание, отличающееся от стандартного по толщине или положению, а также если нужно анимировать появление / пропадание линии, то используй псевдоэлементы [`::before`](/css/before/) или [`::after`](/css/after/).
