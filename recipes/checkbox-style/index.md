---
title: "Стилизация чекбоксов"
description: "Сверстаем красивые и доступные чекбоксы разными способами"
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

Стандартные HTML-чекбоксы часто не соответствуют дизайну веб-приложений и сайтов. Их вид может отличаться в разных браузерах, что затрудняет создание единообразного пользовательского интерфейса. Кроме того, стандартные чекбоксы предоставляют ограниченные возможности для стилизации, что может не соответствовать современным требованиям к дизайну.
Задача состоит в том, чтобы создать кастомный чекбокс, который будет:

- Соответствовать дизайну сайта или приложения;
- Выглядеть одинаково во всех браузерах и операционных системах;
- Обеспечивать хорошую доступность для пользователей с ограниченными возможностями;
- Поддерживать все стандартные функции чекбокса (выбор/снятие выбора, фокус, взаимодействие с клавиатуры).

Рассмотрим три способа стилизации чекбокса, каждый из которых имеет свои преимущества и недостатки.

## Решение

### `accent-color`

Самый простой способ изменить внешний вид чекбокса - использовать CSS-свойство [`accent-color`](/css/accent-color/). Это свойство позволяет изменить акцентный цвет выделения чекбокса.

<iframe title="accent-color" src="demos/checkbox1/" height="130"></iframe>

```html
<form>
  <input type="checkbox" id="checkbox1" />
  <label for="checkbox1">Чекбокс 1</label>
</form>
```

```css
input[type="checkbox"] {
  accent-color: #ff6600;
}
```

Преимущества:

- Простота реализации;
- Сохранение стандартного поведения чекбокса;
- Хорошая поддержка браузерами ([Can I use](https://caniuse.com/mdn-css_properties_accent-color)).

Недостатки:

- Ограниченные возможности кастомизации (только цвет);
- Невозможность изменить форму или размер чекбокса.

### Псевдоэлементы

Этот метод использует псевдоэлементы [`::before`](/css/before/) и [`::after`](/css/after/) для создания кастомного внешнего вида чекбокса, переписывая стандартные стили.

<iframe title="Псевдоэлементы" src="demos/checkbox2/" height="140"></iframe>

```html
<form>
  <div class="checkbox">
    <input class="checkbox-input" type="checkbox" id="checkbox2" />
    <label class="checkbox-label" for="checkbox2">Чекбокс 2</label>
  </div>
</form>
```

Центрируем чекбокс и лейбл внутри обёртки.

```css
.checkbox {
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

Добавляем отступ для подписи.

```css
.checkbox-label {
  padding-left: 5px;
}
```

Сбрасываем браузерные стили чекбокса. Добавляем относительное позиционирование для псевдоэлементов и стилизуем чекбокс.

```css
.checkbox-input {
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
```

Теперь нам нужно добавить галочку нашему чекбоксу через псевдоэлемент `::after`. Есть три способа сделать это:

1.  символ в значении свойства [`content`](/css/content/);
1.  ссылка на [SVG-файл](/html/svg/) с иконкой;
1.  инлайн SVG-иконка.

Галочка символом.

```css
.checkbox-input::after {
  content: "\2714";
  position: absolute;
  width: 0px;
  height: 0px;
  font-size: 30px;
  transition: 500ms;
}
```

Галочка SVG-файлом.

```css
.checkbox-input::after {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  font-size: 30px;
  background-image: url("images/check.svg");
  background-repeat: no-repeat;
  transition: 500ms;
}
```

Галочка инлайн svg.

```css
.checkbox-input::after {
  content: "";
  position: absolute;
  width: 0px;
  height: 0px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='30px' viewBox='0 -960 960 960' width='30px' stroke='%232E9AFF' stroke-width='30' fill='%232E9AFF'%3E%3Cpath d='M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  transition: 500ms;
}
```

Добавляем состояние [`:checked`](/css/checked/) чекбоксу.

```css
.checkbox-input:checked::after {
  width: 30px;
  height: 30px;
  transition: 500ms;
}
```

Добавляем состояние [`:disabled`](/css/disabled-enabled/).

```css
.checkbox-input:disabled {
  background: #ccc;
  border-color: #ccc;
}

.checkbox-input:disabled::after {
  filter: grayscale(100%);
}
```

Преимущества:

- Высокая степень кастомизации;
- Использование векторных иконок или символов Unicode;
- Сохранение стандартного поведения чекбокса (присутствует доступность с клавиатуры).

Недостатки:

- Мало возможностей для анимации

### Псевдоэлемнеты и дополнительный контейнер

Этот метод похож на предыдущий, но использует дополнительный `<div>`, который перекрывает `<input>` для создания более сложных эффектов или анимаций.

<iframe title="Псевдоэлемнеты и дополнительный контейнер" src="demos/checkbox3/" height="220"></iframe>

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
</form>
```

Добавляем стили для нового чекбокса. Указываем относительное позиционирование, центрируем чекбокс и лейбл.

```css
.checkbox {
  position: relative;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

Сбрасываем дефолтные стили у чекбокса, указываем размер нашего чекбокса и стили таким образом, чтобы при фокусе с клавиатуры пользователь мог видеть выделение чекбокса.

```css
.checkbox-input {
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
.checkbox-label {
  padding-left: 10px;
}
```

Позиционируем новый чекбокс на место дефолтного. Добаляем нужные стили.

```css
.checkbox-new {
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

Стилизуем состояние отмеченного чекбокса. Используем сложное сочетание селекторов, чтобы добраться до соседнего элемента от `<input>`, а потом и до вложенного в него элемента.

```css
.checkbox-new_checked,
.checkbox-input:checked + .checkbox-new > .checkbox-new_unchecked {
  display: none;
}

.checkbox-input:checked {
  background: #f498ad;
}
```

Пишем стили для состояние невыбранного чекбокса.

```css
.checkbox-input:checked + .checkbox-new > .checkbox-new_checked,
.checkbox-input:not(:checked) + .checkbox-new > .checkbox-new_unchecked {
  display: initial;
}
```

И не забываем про состояние дизейбл.

```css
.checkbox-input:disabled {
  background: gray;
}
```

Преимущества:

- Возможность создания сложных эффектов и анимаций;
- Высокая степень кастомизации.

Недостатки:

- Более сложная реализация;
- Может понадобиться дополнительная работа для обеспечения доступности.(Расположить div так, чтобы не перекрывать `input` выделенный с клавиатуры).

## Доступность

Доступность каждого варианта чекбокса.

Способ 1:

- Полностью доступен, так как использует стандартный элемент формы;
- Поддерживает навигацию с клавиатуры и работу со скринридерами без дополнительных усилий.

Способы 2 и 3:

- Сохраняют базовую доступность, так как использует скрытый стандартный чекбокс;
- Может потребовать дополнительной работы для обеспечения видимого фокуса при навигации с клавиатуры.

Для улучшения доступности во всех способах рекомендуется:

- Использовать достаточный контраст цветов;
- Обеспечить видимый фокус при навигации с клавиатуры;
- Сделать область клика достаточно большой (минимум 24x24 пикселя по рекомендациям WCAG);
- Связывать чекбокс с текстом метки с помощью `for` атрибута или оборачивать чекбокс в <label>.

## Кроссбраузерная поддержка

Поддержка свойства [`appearance`](/css/appearance/) поддерживается во всех современных браузерах.

```css
.checkbox-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
```

Свойство `accent-color` поддерживается всеми современными браузерами.

## Заключение

Каждый из рассмотренных способов стилизации чекбокса имеет свои преимущества и недостатки. Можно придумать ещё несколько вариантов реализации, но все они будут иметь те или иные особенности реализации, рассмотренные в этих трёх способах. Выбор конкретного метода зависит от требований проекта, целевой аудитории и степени кастомизации.

- Способ 1 идеально подходит для простых проектов, где требуется минимальная кастомизация и важна максимальная доступность и скорость реализации;
- Способы 2 и 3 предоставляют хороший баланс между кастомизацией и сохранением базовой функциональности чекбокса, но требуют больше усилий.

При выборе метода стилизации чекбокса всегда следует помнить о доступности и удобстве использования. Важно тестировать реализацию на различных устройствах, браузерах и с использованием средств доступности, чтобы обеспечить наилучший пользовательский опыт для всех посетителей вашего сайта или приложения.

## На практике

- Ограничение по количеству выбранных чекбоксов
