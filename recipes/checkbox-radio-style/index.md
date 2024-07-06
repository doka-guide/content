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
Задача состоит в том, чтобы создать кастомный элементы форм, который будут:

- Соответствовать дизайну сайта или приложения;
- Выглядеть одинаково во всех браузерах и операционных системах;
- Обеспечивать хорошую доступность для пользователей с ограниченными возможностями;
- Поддерживать все стандартные функции интерактивного элемента формы (отмечен/не отмечен, фокус, взаимодействие с клавиатуры).

Рассмотрим три способа стилизации чекбокса и радиокнопки, каждый из которых имеет свои преимущества и недостатки.

## Решение

### `accent-color`

Самый простой способ изменить внешний вид интерактивных элементов управления в веб-формах - использовать CSS-свойство [`accent-color`](/css/accent-color/). Это свойство позволяет изменить акцентный цвет выделения элемента.

<iframe title="accent-color" src="demos/checkbox-radio-1/" height="230"></iframe>

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
  accent-color: #f498ad;
  width: 20px;
  height: 20px;
}
```

Преимущества:

- Простота реализации;
- Сохранение стандартного поведения элемента;
- Хорошая поддержка браузерами ([Can I use](https://caniuse.com/mdn-css_properties_accent-color)).

Недостатки:

- Ограниченные возможности кастомизации (только цвет);
- Невозможность изменить форму элемента.

### Псевдоэлементы

Этот метод использует псевдоэлементы [`::before`](/css/before/) и [`::after`](/css/after/) для создания кастомного внешнего вида чекбокса или радиокнопки, переписывая стандартные стили.

<iframe title="Псевдоэлементы" src="demos/checkbox-radio-2/" height="240"></iframe>

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
  background: #f498ad;
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

1.  символ в значении свойства [`content`](/css/content/);
1.  ссылка на [SVG-файл](/html/svg/) с иконкой;
1.  инлайн SVG-иконка.

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

Галочка инлайн SVG. Для конвертации SVG можно воспользоваться онлайн сервисом в интернете по запросу "SVG конвертация инлайн css".

```css
.checkbox-input::after,
.radio-input::after {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='30px' viewBox='0 -960 960 960' width='30px' stroke='%232E9AFF' stroke-width='30' fill='%232E9AFF'%3E%3Cpath d='M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  transition: 500ms;
}

.radio-input::after {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='29px' viewBox='0 -960 960 960' width='29px' fill='%232E9AFF'%3E%3Cpath d='M480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-252q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0-200Zm0 340 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z'/%3E%3C/svg%3E");
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

- Высокая степень кастомизации;
- Использование векторных иконок или символов Unicode;
- Сохранение стандартного поведения элемента (присутствует доступность с клавиатуры).

Недостатки:

- Мало возможностей для анимации

### Псевдоэлемнеты и дополнительный контейнер

Этот метод похож на предыдущий, но использует дополнительный `<div>`, который перекрывает `<input>` для создания более сложных эффектов или анимаций.

<iframe title="Псевдоэлемнеты и дополнительный контейнер" src="demos/checkbox-radio-3/" height="420"></iframe>

```html
<form>
  <label class="checkbox">
    <input class="checkbox-input" type="checkbox" id="myCheckbox" />

    <div class="checkbox-new">
      <div class="checkbox-new_checked">
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
      <div class="radio-new_checked">
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

Позиционируем новые чекбокс и радиокнопку на место дефолтных. Добаляем нужные стили.

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
  background: #f498ad;
}

.checkbox-input:checked + .checkbox-new,
.radio-input:checked + .radio-new {
  color: #000000;
}
```

Пишем стили для состояние невыбранного элемента.

```css
.checkbox-input:checked + .checkbox-new > .checkbox-new_checked,
.checkbox-input:not(:checked) + .checkbox-new > .checkbox-new_unchecked,
.radio-input:checked + .radio-new > .radio-new_checked,
.radio-input:not(:checked) + .radio-new > .radio-new_unchecked {
  display: initial;
}
```

И не забываем про состояние дизейбл.

```css
.checkbox-input:disabled,
.radio-input:disabled {
  background: gray;
}
```

Преимущества:

- Возможность создания сложных эффектов и анимаций;
- Высокая степень кастомизации.

Недостатки:

- Более сложная реализация;
- Может понадобиться дополнительная работа для обеспечения доступности.(Расположить div так, чтобы не перекрывать `input` выделенный с клавиатуры или стилизовать фокус нового элемента с помощью псевдокласса [`:focus-visible`](/css/focus-visible/)).

## Доступность

Доступность каждого варианта чекбокса и радиокнопки.

Способ 1:

- Полностью доступен, так как использует стандартный элемент формы;
- Поддерживает навигацию с клавиатуры и работу со скринридерами без дополнительных усилий.

Способы 2 и 3:

- Сохраняют базовую доступность, так как использует скрытый стандартный элемент;
- Может потребовать дополнительной работы для обеспечения видимого фокуса при навигации с клавиатуры.

Для улучшения доступности во всех способах рекомендуется:

- Использовать достаточный контраст цветов;
- Обеспечить видимый фокус при навигации с клавиатуры;
- Сделать область клика достаточно большой (минимум 24x24 пикселя по рекомендациям WCAG);
- Связывать элемент с текстом метки с помощью `for` атрибута или оборачивать чекбокс и радиокнопку в `<label>`.

## Кроссбраузерная поддержка

Cвойства [`appearance`](/css/appearance/) и [`accent-color`](/css/accent-color/) поддерживаются во всех современных браузерах.

## Заключение

Каждый из рассмотренных способов стилизации имеет свои преимущества и недостатки. Можно придумать ещё несколько вариантов реализации, но все они будут иметь те или иные особенности, рассмотренные в этих трёх способах. Выбор конкретного метода зависит от требований проекта, целевой аудитории и степени кастомизации.

- Способ 1 идеально подходит для простых проектов, где требуется минимальная кастомизация и важна максимальная доступность и скорость реализации;
- Способы 2 и 3 предоставляют хороший баланс между кастомизацией и сохранением базовой функциональности, но требуют больше усилий.

При выборе метода стилизации интерактивных элементов управления всегда следует помнить о доступности и удобстве использования. Важно тестировать реализацию на различных устройствах, браузерах и с использованием средств доступности, чтобы обеспечить наилучший пользовательский опыт для всех посетителей вашего сайта или приложения.

## На практике

- Ограничение по количеству выбранных чекбоксов
