---
title: "`font-synthesis`"
description: "Контролируем синтез недостающих начертаний шрифта браузером."
baseline:
  - group: font-synthesis
    features:
      - css.properties.font-synthesis
authors:
  - gazievri
keywords:
  - синтез шрифтов
  - искусственный bold
  - искусственный italic
  - faux bold
  - faux italic
related:
  - css/font-face
  - css/font-weight
  - css/font-style
tags:
  - doka
---

## Кратко

Свойство `font-synthesis` контролирует, может ли браузер искусственно создавать жирное начертание, курсив и капитель, когда нужные файлы шрифта недоступны.

## Пример

Запретим браузеру синтезировать недостающие начертания:
```css
@font-face {
  font-family: 'CustomFont';
  src: url('custom-regular.woff2');
  font-weight: 400;
  font-style: normal;
}

body {
  font-family: 'CustomFont', sans-serif;
  font-synthesis: none;
}

strong {
  /* Текст останется обычным, синтеза не будет */
  font-weight: 700;
}
```

## Как понять

Когда подключаешь веб-шрифт и задаёшь `font-weight: 700`, браузер ищет соответствующий файл шрифта. Если файла с жирным начертанием нет, браузер по умолчанию пытается помочь и создаёт его сам — синтезирует.

**Для bold** браузер дублирует контур каждой буквы со смещением в 1-2 пикселя. Получается грубо и топорно.

**Для italic** браузер наклоняет буквы под углом примерно 14-20 градусов. Но настоящий курсив — это не просто наклонённые буквы, это отдельно нарисованное начертание с другой формой символов.

**Для small-caps (капитель)** браузер заменяет строчные буквы на уменьшенные заглавные. Капитель — это начертание, где вместо обычных строчных букв используются заглавные буквы меньшего размера, как в слове ТЕКСТ, где первое слово крупнее. Настоящая капитель — это отдельно нарисованные символы с правильными пропорциями.

Синтетические начертания особенно плохо смотрятся в дизайнерских шрифтах, на больших размерах текста и в заголовках. Свойство `font-synthesis` позволяет запретить браузеру создавать такие начертания.

## Как пишется

Для `font-synthesis` можно выбрать одно значение или несколько через пробел:

- `none` — запрещает любой синтез начертаний.
- `weight` — разрешает синтез жирного начертания.
- `style` — разрешает синтез курсива.
- `small-caps` — разрешает синтез капители.
- `weight style small-caps` — значение по умолчанию, разрешает синтез всех начертаний.
```css
.no-synthesis {
  font-synthesis: none;
}

.allow-bold {
  font-synthesis: weight;
}

.allow-italic {
  font-synthesis: style;
}

.allow-bold-italic {
  font-synthesis: weight style;
}
```

Значения можно комбинировать. Например, `font-synthesis: weight style` разрешит синтез жирного и курсива, но запретит капитель.

### Когда использовать

Используй `font-synthesis: none`, если работаешь с дизайнерским шрифтом и важна типографика. Это заставит явно подключать все нужные файлы начертаний.

Для системных шрифтов (`-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`) обычно не нужно менять `font-synthesis` — у них есть все начертания.

При использовании Google Fonts указывай все нужные начертания в URL. Например, `wght@400;700` подключает и regular (400), и bold (700):
```
https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap
```

Без этого для жирного текста браузер будет использовать синтез.

### Правильная загрузка шрифтов

Лучшая стратегия — подключать полное семейство шрифтов:
```css
/* Regular */
@font-face {
  font-family: 'MyFont';
  src: url('myfont-regular.woff2');
  font-weight: 400;
  font-style: normal;
}

/* Bold */
@font-face {
  font-family: 'MyFont';
  src: url('myfont-bold.woff2');
  font-weight: 700;
  font-style: normal;
}

/* Italic */
@font-face {
  font-family: 'MyFont';
  src: url('myfont-italic.woff2');
  font-weight: 400;
  font-style: italic;
}

body {
  font-family: 'MyFont', sans-serif;
  /* Синтеза не будет — браузер найдёт все начертания */
}
```
