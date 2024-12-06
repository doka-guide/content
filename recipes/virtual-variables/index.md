---
title: "Псевдоприватные кастомные свойства"
descriptioin: "Как создать миксины на CSS"
---

## Введение

Веб-платформа не стоит на месте и стремительно развивается. Относительно недавно был принят стандарт **нативного нестинга в CSS**.
Раньше такая технология была только в препроцессорах и позволяла весьма удобно работать с БЭМом:

```scss
.parent-block {
    ...

    &__child-element {
        ...

        &_modificator-1 { ... }
        &_modificator-2 { ... }
        &_modificator-3 { ... }
    }
}
```

Ранее уникальной для препроцессоров таких как **Less, SASS и Stylus** была возможность создавать переменные прямо в стилях, что не мог предоставить CSS.  
Но этот пункт относительно давно перестал быть уникальной частью этих библиотек – были созданы `custom properties` в CSS'е:

```css
:root {
  --text-primary: #ffffff;
  --text-secondary: #999999;

  --text-negative: #f00000;
}

span.error {
  color: var(--text-negative);
}
```

## Проблемы миксинов

Возвращаясь к теме с **нативным нестингом в CSS**, я не могу не сказать о возникших сложностях в работе с последними версиями препроцессоров (в моём случае с SASS'ом).

Сразу оговорю – дальше будет показан код на SCSS в режиме `api: "modern-compiler"`.

В нативном нестинге CSS'а считается невалидной следующая ситуация:

```css
.parent-block {
  display: flex;

  &__child-element {
    ...;
  }

  gap: 20px;
}
```

в отличии от SASS'а.

Я полностью поддерживаю данное решение, потому что такая ситуация рушит читаемость кода.
Но в SASS'е такая ситуация вполне возможна на уровне интерпритации в CSS. Пример:

```scss
.parent-block {
  display: flex;
  @include child-element-mixin;
  gap: 20px;
}
```

В последних версиях SASS начинает кидать варнинги на такие кейсы.

## Решение

На случай неуникальных, но достаточно больших стилей с возможностью кастомизации я нашёл, как мне кажется, хорошее решение.

В CSS при взятии свойства через функцию `var()` можно передать второй аргумент, который вернётся, если свойство отсутствует:

```css
color: var(--text-primary, #ddd);
```

Пытаясь найти способ реализовать миксины на CSS'е, я набрёл на [видео](https://youtu.be/_2LwjfYc1x8?si=BvJFLYqov2LHI01X), в котором была показана концепция "псевдоприватных" CSS свойств. Пример:

```css
span.plain-text {
  --_text-color: var(--text-color, #ddd);
  color: var(--_text-color);
}
```

Смысл в том, чтобы использовать атомарный класс как имя миксина, а в качестве аргументов для нашего
атомарного класса будут CSS свойства, которые возвращаются в псевдоприватные свойства, которые уже и применяются.

Пример возможности кастомизации миксина выше:

```html
<span class="description plain-text">Text</span>
```

```css
.plain-text {
  --_text-color: var(--text-color, #ddd);
  color: var(--_text-color);
}

.description {
  --text-color: #fff;
}
```

## Применение

Я понял какой потенциал стоит за таким подходом я решил применить это к стилизации размера текста:

```css
[class*="static-font"] {
  --_font-size: var(--font-size, 1em);
  --_line-height: var(--line-height, calc(var(--_font-size) + 4px));

  font-size: var(--_font-size);
  line-height: var(--_line-height);
}

.static-font__M {
  --font-size: 20px;
  --line-height: 26px;

  @media (width <= 1024px) and (width >= 510px) {
    --font-size: 18px;
    --line-height: 22px;
  }

  @media (max-width < 510px) {
    --font-size: 16px;
    --line-height: 20px;
  }
}
```

Так как CSS свойства возможно переопределять в медиа запросах, реализация отдельно размера шрифта выглядит
лаконично и понятно.

И вот ещё один небольшой "миксин" для обрезания количества строк:

```css
.clamp-text-lines {
  --_lines-count: var(--lines-count, 3);

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--_lines-count);
  overflow: hidden;
}
```
