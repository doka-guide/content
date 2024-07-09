---
title: "Стилизация чекбоксов и радиокнопок"
description: "Сверстаем красивые и доступные чекбоксы и радиокнопки разными способами"
authors:
  - lonlylokly
keywords:
  - checkbox
  - radio
  - css чекбокс стили
  - css радиокнопка
  - стилизация чекбокса
  - стилизация радиокнопки
  - красивый чекбокс
  - красивая радиокнопка
  - оформление чекбокса и радиокнопки
  - css checkbox style
  - css radio style
related:
  - css/appearance
  - css/accent-color
  - css/checked
tags:
  - article
---

## Задача

Стандартные чекбоксы и радиокнопки часто не соответствуют дизайну веб-приложений и сайтов. Их вид может отличаться в разных браузерах, что затрудняет создание единообразного пользовательского интерфейса. Кроме того, стандартные чекбоксы и радиокнопки предоставляют ограниченные возможности для стилизации, что может не соответствовать современным требованиям к дизайну.

Задача состоит в том, чтобы создать кастомные элементы форм, которые будут:

- соответствовать дизайну сайта или приложения;
- выглядеть одинаково во всех браузерах и операционных системах;
- обеспечивать хорошую доступность для пользователей с ограниченными возможностями;
- поддерживать все стандартные функции интерактивного элемента формы (отмечен/не отмечен, фокус, взаимодействие с клавиатуры).

Рассмотрим три способа стилизации чекбокса и радиокнопки, каждый из которых имеет свои преимущества и недостатки.

## Решение

### `accent-color`

Самый простой способ изменить внешний вид интерактивных элементов управления в веб-формах — использовать CSS-свойство [`accent-color`](/css/accent-color/). Это свойство позволяет изменить акцентный цвет выделения элемента.

<iframe title="accent-color" src="demos/checkbox-radio-accent-color/" height="300"></iframe>

```html
<form>
  <input type="checkbox" id="checkbox1" />
  <label for="checkbox1">Чекбокс 1</label>
  <input type="radio" id="radio1" name="radio" />
  <label for="radio1">Радиокнопка 1</label>
</form>
```

```css
input[type="checkbox"],
input[type="radio"] {
  accent-color: #C56FFF;
  width: 20px;
  height: 20px;
}
```

Преимущества:

- простота реализации;
- сохранение стандартного поведения элемента;
- хорошая поддержка браузерами ([Can I use](https://caniuse.com/mdn-css_properties_accent-color)).

Недостатки:

- ограниченные возможности кастомизации (только цвет);
- невозможность изменить форму элемента.

### Псевдоэлементы

Этот метод использует псевдоэлементы [`::before`](/css/before/) и [`::after`](/css/after/) для создания кастомного внешнего вида чекбокса или радиокнопки, переписывая стандартные стили.

<iframe title="Псевдоэлементы" src="demos/checkbox-radio-pseudo-elements/" height="400"></iframe>

Создаем HTML-скелет.

```html
<form>
  <div class="checkbox">
    <input class="checkbox-input" type="checkbox" id="checkbox2" />
    <label class="checkbox-label" for="checkbox2">Чекбокс 2</label>
  </div>
  <div class="radio">
    <input class="radio-input" type="radio" id="radio2" name="radio" />
    <label class="radio-label" for="radio2">Радиокнопка 2</label>
  </div>
</form>
```

Центрируем элемент и подписи внутри обёртки.

```css
.checkbox,
.radio {
  margin-top: 5px;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

Добавляем отступ для подписи.

```css
.checkbox-label,
.radio-label {
  padding-left: 5px;
}
```

Сбрасываем браузерные стили чекбокса и радиокнопки. Добавляем относительное позиционирование для псевдоэлементов и стилизуем.

```css
.checkbox-input,
.radio-input {
  appearance: none;
  position: relative;
  width: 30px;
  height: 30px;
  background: #F498AD;
  box-shadow: inset 0 0 5px rgb(0 0 0 / 0.2);
  border-radius: 10px;
  border: 1px solid black;
  transition: 500ms;
}

.radio-input {
  border-radius: 50%;
}
```

Теперь нам нужно добавить галочку нашим чекбоксам и радиокнопкам через псевдоэлемент `::after`. Есть три способа сделать это:

1.  Символ в значении свойства [`content`](/css/content/).
1.  Ссылка на [SVG-файл](/html/svg/) с иконкой.
1.  Инлайн SVG-иконка.

Галочка символом. Символ можно вставить с помощью CSS-кода.

```css
.checkbox-input::after,
.radio-input::after {
  content: "\2714";
  position: absolute;
  width: 0px;
  height: 0px;
  font-size: 30px;
  transition: 500ms;
}

.radio-input::after {
  content: "\1F78B";
}
```

Галочка SVG-файлом.

```css
.checkbox-input::after,
.radio-input::after {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  font-size: 30px;
  background-image: url("images/check.svg");
  background-repeat: no-repeat;
  transition: 500ms;
}

.radio-input::after {
  background-image: url("images/radio.svg");
}
```

Галочка инлайн SVG. Для конвертации SVG можно воспользоваться онлайн сервисом в интернете по запросу «SVG конвертация инлайн css».

```css
.checkbox-input::after,
.radio-input::after {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='30' viewBox='0 -960 960 960' width='30' stroke='%23FFFFFF' stroke-width='30' fill='%23FFFFFF'%3E%3Cpath d='M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  transition: 500ms;
}

.radio-input::after {
  background-image: url("data:image/svg+xml,%3csvg width='28' height='28' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M9.88 23C12.6 23 14.2 21.32 15.52 19.52C16.84 21.32 18.44 23 21.16 23C22.16 23 23.04 22.72 23.04 21.8C23.04 21.24 22.6 20.72 21.96 20.72C21.72 20.72 21.28 20.8 21 20.8C19.72 20.8 18.2 19.12 17.36 17.92C19.08 16.08 20.96 13.72 20.96 11.12C20.96 8.12 18.68 6 15.52 6C12.36 6 10.08 8.12 10.08 11.12C10.08 13.72 11.96 16.08 13.68 17.92C12.84 19.12 11.32 20.8 10.04 20.8C9.76 20.8 9.32 20.72 9.08 20.72C8.44 20.72 8 21.24 8 21.8C8 22.72 8.88 23 9.88 23Z' fill='white'/%3e%3c/svg%3e ");
}
```

Добавляем состояние [`:checked`](/css/checked/).

```css
.checkbox-input:checked::after,
.radio-input:checked::after {
  width: 30px;
  height: 30px;
  transition: 500ms;
}
```

Добавляем состояние [`:disabled`](/css/disabled-enabled/).

```css
.checkbox-input:disabled,
.radio-input:disabled {
  background: #ccc;
  border-color: #ccc;
}

.checkbox-input:disabled::after,
.radio-input:disabled::after {
  filter: grayscale(100%);
}
```

Преимущества:

- высокая степень кастомизации;
- использование векторных иконок или символов Unicode;
- сохранение стандартного поведения элемента (присутствует доступность с клавиатуры).

Недостатки:

- мало возможностей для анимации.

### Псевдоэлементы и дополнительный контейнер

Этот метод похож на предыдущий, но использует дополнительный `<div>`, который перекрывает `<input>` для создания более сложных эффектов или анимаций.

<iframe title="Псевдоэлемнеты и дополнительный контейнер" src="demos/checkbox-radio-pseudo-elements-div/" height="370"></iframe>

Создаем HTML-скелет для кастомных чекбокса и радиокнопки. В нашем случае это мордочка Доки с открытыми и закрытыми глазками =) И не забываем указать атрибут `aria-hidden: true`, чтобы пользователям скринридеров не нужно было каждый раз слушать названия символов, которые используются в символьной иконке U•ᴥ•U.

```html
<form>
  <label class="checkbox">
    <input class="checkbox-input" type="checkbox" id="myCheckbox" />

    <div class="checkbox-new">
      <div class="checkbox-new_checked" aria-hidden="true">
        U
        <span class="eye">•</span>
        <span class="nose">ᴥ</span>
        <span class="eye">•</span>U
      </div>
      <div class="checkbox-new_unchecked">
        U
        <span class="eye">ˇ</span>
        <span class="nose">ᴥ</span>
        <span class="eye">ˇ</span>U
      </div>
    </div>

    <span class="checkbox-label">Гав!</span>
  </label>

  <label class="radio">
    <input class="radio-input" type="radio" id="myRadio" name="radio" />

    <div class="radio-new">
      <div class="radio-new_checked" aria-hidden="true">
        U
        <span class="eye">•</span>
        <span class="nose">ᴥ</span>
        <span class="eye">•</span>U
      </div>
      <div class="radio-new_unchecked">
        U
        <span class="eye">ˇ</span>
        <span class="nose">ᴥ</span>
        <span class="eye">ˇ</span>U
      </div>
    </div>

    <span class="radio-label">Радио Гав!</span>
  </label>
</form>
```

Добавляем стили для новых чекбокса и радиокнопки. Указываем относительное позиционирование, центрируем элемент и подпись.

```css
.checkbox,
.radio {
  position: relative;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

Сбрасываем дефолтные стили у элемента, указываем размер и стили таким образом, чтобы при управлении с клавиатуры пользователь мог видеть фокус.

```css
.checkbox-input,
.radio-input {
  appearance: none;
  position: relative;
  width: 90px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid black;
}
```

Добавляем отступ для подписи.

```css
.checkbox-label,
.radio-label {
  padding-left: 10px;
}
```

Позиционируем новые чекбокс и радиокнопку на место дефолтных. Добавляем нужные стили.

```css
.checkbox-new,
.radio-new {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  width: 90px;
  height: 40px;
  padding: 3px;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 20px;
  user-select: none;
}
```

Стилизуем состояние отмеченного элемента. Используем сложное сочетание селекторов, чтобы добраться до соседнего элемента от `<input>`, а потом и до вложенного в него элемента.

```css
.checkbox-new_checked,
.checkbox-input:checked + .checkbox-new > .checkbox-new_unchecked,
.radio-new_checked,
.radio-input:checked + .radio-new > .radio-new_unchecked {
  display: none;
}

.checkbox-input:checked,
.radio-input:checked {
  background: #C56FFF;
}

.checkbox-input:checked + .checkbox-new,
.radio-input:checked + .radio-new {
  color: #000000;
}
```

Пишем стили для невыбранного состояния элемента.

```css
.checkbox-input:checked + .checkbox-new > .checkbox-new_checked,
.checkbox-input:not(:checked) + .checkbox-new > .checkbox-new_unchecked,
.radio-input:checked + .radio-new > .radio-new_checked,
.radio-input:not(:checked) + .radio-new > .radio-new_unchecked {
  display: initial;
}
```

И не забываем про неактивное состояние.

```css
.checkbox-input:disabled,
.radio-input:disabled {
  background: gray;
}
```

#### Проблема с доступностью

В некоторых случаях ваш контейнер с новым чекбоксом или радиокнопкой может перекрыть фокус `<input>` элемента. И чтобы пользователь не потерял ваш интерактивный элемент, нужно добавить фокус вашему новому контейнеру с помощью псевдокласса [`:focus-visible`](/css/focus-visible/)). Важно указывать контрастный цвет обводки, чтобы пользователи могли увидеть его.

```css
.checkbox-input:focus-visible + .checkbox-new {
  outline: 3px solid orange;
}
```

Преимущества:

- возможность создания сложных эффектов и анимаций;
- высокая степень кастомизации.

Недостатки:

- более сложная реализация;
- может понадобиться дополнительная работа для обеспечения доступности.

## Доступность

Доступность каждого варианта чекбокса и радиокнопки.

Вариант с `accent-color`:

- полностью доступен, так как использует стандартный элемент формы;
- поддерживает навигацию с клавиатуры и работу со скринридерами без дополнительных усилий.

Варианты с псевдоэлементами и дополнительным контейнером:

- сохраняют базовую доступность, так как использует скрытый стандартный элемент;
- может потребовать дополнительной работы для обеспечения видимого фокуса (псевдокласс`:focus-visible` и атрибут `tabindex="0"`) при навигации с клавиатуры.

Для улучшения доступности во всех способах рекомендуется:

- использовать достаточный контраст цветов;
- обеспечить видимый фокус при навигации с клавиатуры;
- сделать область клика достаточно большой (минимум 24x24 пикселя, а в идеале 48х48 по рекомендациям WCAG);
- связывать элемент с текстом метки с помощью атрибута `for` или оборачивать чекбокс и радиокнопку в `<label>`;
- если используется группа чекбоксов или радиокнопок, которые связаны по смыслу или с одной настройкой, то им нужен родительский тег [`<fieldset>`](html/fieldset/) и название в [`<legend>`](html/legend/), для объединения их в одну группу;
- если чекбокс или радиокнопка находятся в неактивном состоянии `disabled` и одновременно являются выбранными `:checked`, то нужно использовать атрибут [`aria-disabled: true`](a11y/aria-disabled/), чтобы скринридеры зачитывали этот выбранный чекбокс, а не пропускали его, и пользователи знали, на что они соглашаются по умолчанию или какую настройку нельзя выключить.

## Кроссбраузерная поддержка

Cвойства [`appearance`](/css/appearance/) и [`accent-color`](/css/accent-color/) поддерживаются во всех современных браузерах.

## Заключение

Каждый из рассмотренных способов стилизации имеет свои преимущества и недостатки. Можно придумать ещё несколько вариантов реализации, но все они будут иметь те или иные особенности, рассмотренные в этих трёх способах. Выбор конкретного метода зависит от требований проекта, целевой аудитории и степени кастомизации.

Вариант с `accent-color` идеально подходит для простых проектов, где требуется минимальная кастомизация и важна максимальная доступность и скорость реализации.

Варианты с псевдоэлементами и дополнительным контейнером предоставляют хороший баланс между кастомизацией и сохранением базовой функциональности, но требуют больше усилий.

При выборе метода стилизации интерактивных элементов управления всегда следует помнить о доступности и удобстве использования. Важно тестировать реализацию на различных устройствах, браузерах и с использованием средств доступности, чтобы обеспечить наилучший пользовательский опыт для всех посетителей вашего сайта или приложения.
