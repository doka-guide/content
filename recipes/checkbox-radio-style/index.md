---
title: "Стилизация чекбоксов и радиокнопок"
description: "Верстаем красивые и доступные чекбоксы и радиокнопки несколькими способами."
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

Стандартные чекбоксы и радиокнопки часто не соответствуют дизайну веб-приложений и сайтов. Их вид может отличаться в разных браузерах, что затрудняет создание единообразного пользовательского интерфейса. Кроме того, браузерные стили для чекбоксов и радиокнопок могут выглядеть несовременно.

Задача состоит в том, чтобы создать кастомные элементы форм, которые будут:

- соответствовать дизайну сайта или приложения;
- выглядеть одинаково во всех браузерах и операционных системах;
- быть доступными для пользователей с особенностями здоровья;
- поддерживать стандартные функции интерактивного элемента формы (отмечен или не отмечен, фокус, взаимодействие с клавиатуры).

Рассмотрим три способа стилизации чекбокса и радиокнопки. У каждого есть преимущества и недостатки.

## Решение

### `accent-color`

Самый простой способ изменить внешний вид интерактивных элементов управления в веб-формах — использовать CSS-свойство [`accent-color`](/css/accent-color/). Оно изменяет акцентный цвет выделения элемента.

<iframe title="Стилизация при помощи accent-color" src="demos/checkbox-radio-accent-color/" height="300"></iframe>

```html
<form>
  <input type="checkbox" id="checkbox1">
  <label for="checkbox1">Чекбокс 1</label>
  <input type="radio" id="radio1" name="radio">
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
- сохранение стандартного поведения элемента (доступен для [скринридеров](/a11y/screenreaders/), поддерживает навигацию с клавиатуры);
- хорошая [поддержка `accent-color` браузерами](https://caniuse.com/mdn-css_properties_accent-color), как и [`appearance`](/css/appearance/).

Недостатки:

- ограниченные возможности кастомизации (только цвет);
- нельзя изменить форму элемента.

### Псевдоэлементы

Метод с псевдоэлементами [`::before`](/css/before/) и [`::after`](/css/after/) для создания кастомного чекбокса или радиокнопки.

<iframe title="Стилизация при помощи псевдоэлемента" src="demos/checkbox-radio-pseudo-elements/" height="400"></iframe>

Напишем простую разметку.

```html
<form>
  <div class="checkbox">
    <input class="checkbox-input" type="checkbox" id="checkbox2">
    <label class="checkbox-label" for="checkbox2">
      Чекбокс 2
    </label>
  </div>
  <div class="radio">
    <input class="radio-input" type="radio" id="radio2" name="radio">
    <label class="radio-label" for="radio2">
      Радиокнопка 2
    </label>
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
  background: #C56FFF;
  box-shadow: inset 0 0 5px rgb(0 0 0 / 0.2);
  border-radius: 10px;
  border: 1px solid #FFFFFF;
  transition: 500ms;
}

.radio-input {
  border-radius: 50%;
}
```

Теперь добавим галочку внутрь чекбоксов и радиокнопок через псевдоэлемент `::after`. Есть три способа сделать это:

1. Символ в значении свойства [`content`](/css/content/).
1. Ссылка на [SVG-файл](/html/svg/) с иконкой.
1. Инлайн SVG-иконка.

Галочка символом. Символ можно вставить прямо в CSS-файл.

```css
.checkbox-input::after,
.radio-input::after {
  content: "\2714";
  position: absolute;
  top: -5px;
  left: 2px;
  width: 0px;
  height: 0px;
  font-size: 26px;
  transition: 500ms;
  overflow: hidden;
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

Галочка инлайнового SVG. Для конвертации SVG можете найти онлайн-сервис по запросу «SVG конвертация инлайн CSS».

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
  background-image: url("data:image/svg+xml,%3csvg width='28' height='28' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M9.88 23C12.6 23 14.2 21.32 15.52 19.52C16.84 21.32 18.44 23 21.16 23C22.16 23 23.04 22.72 23.04 21.8C23.04 21.24 22.6 20.72 21.96 20.72C21.72 20.72 21.28 20.8 21 20.8C19.72 20.8 18.2 19.12 17.36 17.92C19.08 16.08 20.96 13.72 20.96 11.12C20.96 8.12 18.68 6 15.52 6C12.36 6 10.08 8.12 10.08 11.12C10.08 13.72 11.96 16.08 13.68 17.92C12.84 19.12 11.32 20.8 10.04 20.8C9.76 20.8 9.32 20.72 9.08 20.72C8.44 20.72 8 21.24 8 21.8C8 22.72 8.88 23 9.88 23Z' fill='white'/%3e%3c/svg%3e");
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

- разные варианты стилизации;
- использование векторных иконок или Unicode-символов;
- сохранение стандартного поведения элемента (доступен с клавиатуры).

Недостаток — мало возможностей для анимации.

### Псевдоэлементы и дополнительный контейнер

Этот метод похож на предыдущий, но в нём используем дополнительный `<div>`, который перекрывает `<input>` для более сложных эффектов или анимаций.

<iframe title="Стилизация при помощи псевдоэлемента и контейнера" src="demos/checkbox-radio-pseudo-elements-div/" height="370"></iframe>

Напишем HTML для кастомных чекбокса и радиокнопки. В нашем случае это мордочка Доки с открытыми и закрытыми глазками 👁️👄👁️ Не забудем указать атрибут [`aria-hidden: true`](/a11y/aria-hidden/), чтобы пользователям скринридеров не пришлось слушать названия символов, которые используем в иконке U•ᴥ•U.

```html
<form>
  <label class="checkbox">
    <input class="checkbox-input" type="checkbox" id="myCheckbox">

    <div class="checkbox-new" aria-hidden="true">
      <div class="checkbox-new_checked">
        U
        <span class="eye">•</span>
        <span class="nose">ᴥ</span>
        <span class="eye">•</span>U
      </div>
      <div class="checkbox-new_unchecked">
        U
        <span class="eye">x</span>
        <span class="nose">ᴥ</span>
        <span class="eye">x</span>U
      </div>
    </div>

    <span class="checkbox-label">Гав!</span>
  </label>

  <label class="radio">
    <input class="radio-input" type="radio" id="myRadio" name="radio">

    <div class="radio-new" aria-hidden="true">
      <div class="radio-new_checked">
        U
        <span class="eye">•</span>
        <span class="nose">ᴥ</span>
        <span class="eye">•</span>U
      </div>
      <div class="radio-new_unchecked">
        U
        <span class="eye">x</span>
        <span class="nose">ᴥ</span>
        <span class="eye">x</span>U
      </div>
    </div>

    <span class="radio-label">Радио Гав!</span>
  </label>
</form>
```

Добавляем стили для новых элементов. Указываем относительное позиционирование, центрируем их и подпись.

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

Сбрасываем стили по умолчанию у элемента, указываем размер и новые стили таким образом, чтобы при навигации с клавиатуры пользователь видел рамку фокуса.

```css
.checkbox-input,
.radio-input {
  appearance: none;
  position: relative;
  width: 90px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #FFFFFF;
}
```

Добавляем отступ для подписи.

```css
.checkbox-label,
.radio-label {
  padding-left: 10px;
}
```

Позиционируем чекбокс и радиокнопку на место элементов по умолчанию. Добавляем нужные стили.

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

Стилизуем состояние отмеченного элемента. Используем сложное сочетание селекторов, чтобы добраться до соседнего элемента для `<input>`, а потом до вложенного в него элемента.

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

Преимущества:

- можно использовать сложные эффекты и анимацию;
- сохраняет базовую доступность, так как используем скрытый стандартный элемент;
- легко стилизовать.

Недостатки:

- более сложная реализация;
- нужно дополнительно поработать над доступностью элементов.

## Доступность

В некоторых случаях нужно дополнительно поработать над фокусом чекбоксов и радиокнопок, стилизованных при помощи псевдоэлементов или вложенных в один контейнер.

Контейнер с новым чекбоксом или радиокнопкой может перекрыть фокус у `<input>`. Чтобы пользователь не потерял элемент, добавьте стили фокуса для нового контейнера с помощью псевдокласса [`:focus-visible`](/css/focus-visible/).

```css
.checkbox-input:focus-visible + .checkbox-new {
  outline: 3px solid orange;
}
```

Когда из-за стилей для кастомных чекбоксов и радиокнопок на них не устанавливается фокус с клавиатуры, может помочь атрибут [`tabindex="0"`](/html/tabindex/). Помните, что это крайняя мера.

Какие-то чекбоксы и радиокнопки могут быть отмеченными (`checked`) и одновременно неактивными (`disabled`). Например, когда в личном кабинете всегда выбрана одна настройка и от неё нельзя отказаться. Чтобы передать это скринридерам, пригодится атрибут [`aria-disabled: true`](/a11y/aria-disabled/). В отличие от стандартного HTML-атрибута `disabled`, ARIA-атрибут `aria-disabled` остаётся в порядке фокуса и его зачитывают скринридеры. Так пользователи наверняка узнают, на что они по умолчанию соглашаются или какую настройку не могут изменить.

На что ещё обратить внимание:

- продумать стили выбранных/невыбранных, активных/неактивных чекбоксов и радиокнопок;
- следить за соотношением контрастности между элементами, их фокусом и фоном;
- обеспечить видимый фокус при навигации с клавиатуры;
- сделать область клика достаточно большой (минимум 24x24 пикселя, идеально 48х48);
- связывать элемент с подписью к нему при помощи атрибута `for` или оборачивать чекбокс и радиокнопку сразу в `<label>`;
- группировать элементы, когда связаны по смыслу: оборачивать в [`<fieldset>`](/html/fieldset/) и называть группу через [`<legend>`](/html/legend/).

## Заключение

Рассмотренные способы стилизации чекбоксов и радиокнопок имеют свои преимущества и недостатки. Можно найти и другие вариантов реализации, но все они будут иметь те или иные особенности, рассмотренные в рецепте. Выбор метода зависит от требований в проекте, его целевой аудитории и степени кастомизации.

Вариант с `accent-color` идеально подходит для простых проектов, где нужна минимальная стилизация и важна максимальная доступность и скорость реализации.

Варианты с псевдоэлементами и дополнительным контейнером имеют хороший баланс между кастомизацией и сохранением базовой функциональности, но требуют больше усилий.

Когда выбираете метод стилизации интерактивных элементов управления, помните об их доступности и удобстве использования. Их важно тестировать на различных устройствах, в разных браузерах. Большим плюсом будет тестирование со вспомогательными технологиями. Так обеспечите наилучший пользовательский опыт для всех пользователей сайта или приложения.
