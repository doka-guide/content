---
title: "Мгновенная валидация форм"
description: "На лету проверяем, правильно ли пользователь заполнил поля формы."
authors:
  - makarovaiuliia
related:
  - js/forms
  - html/form
  - a11y/accessible-forms
tags:
  - article
---

## Задача

Кто из нас не знаком с той неприятной ситуацией, когда ты усердно заполняешь форму, вводишь данные, а потом, с надеждой нажимая на кнопку «Отправить», обнаруживаешь, что что-то пошло не так и все твои усилия пропали даром? Не беспокойтесь, для этого есть решение — мгновенная валидация при помощи JavaScript!

Традиционные способы валидации форм, основанные исключительно на HTML, потихоньку уходят в прошлое. JavaScript приходит на помощь, внося изменения в привычные сценарии валидации и тем самым значительно улучшая общий пользовательский опыт (UX). Скриптовая валидация форм это как волшебная палочка: она обеспечивает вас мгновенной обратной связью при заполнении формы и аккуратно подсказывает, что нужно исправить прежде чем форма отправится.

## Готовое решение

Пример стандартной HTML-разметки формы:

```html
<form class="form" name="form" novalidate>
  <label class="form__field">
    <span class="form__label">Имя:</span>
    <input  type="text"
            id="input__name"
            class="form__type-input"
            placeholder="Иван"
            minlength="2"
            maxlength="40"
            pattern="^[a-zA-Zа-яА-ЯЁё\s\-]+$"
            data-error-message="Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы."
            required>
    <span class="form__error input__name-error"></span>
  </label>
  <label class="form__field">
    <span class="form__label">Фамилия:</span>
    <input  type="text"
            id="input__surname"
            class="form__type-input"
            placeholder="Васильевич"
            minlength="2"
            maxlength="40"
            pattern="^[a-zA-Zа-яА-ЯЁё\s\-]+$"
            data-error-message="Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы."
            required>
    <span class="form__error input__surname-error"></span>
  </label>
  <label class="form__field">
    <span class="form__label">E-mail:</span>
      <input  type="email"
              id="input__e-mail"
              class="form__type-input"
              placeholder="menyaet.prefessiy@ivan.com"
              required>
    <span class="form__error input__e-mail-error"></span>
  </label>
  <label class="form__field">
    <span class="form__label">Возраст:</span>
    <input  type="number"
            id="input__age"
            class="form__type-input"
            placeholder="40"
            min="18"
            max="100"
            required>
    <span class="form__error input__age-error"></span>
  </label>
  <label class="form__checkbox-label">
    <input  type="checkbox" id="input__checkbox" class="form__type-input form__type-checkbox" checked required>
    <span class="form__type-checkbox-title">Я согласен быть царём</span>
    <span class="form__error input__checkbox-error"></span>
  </label>
  <button type="submit" class="button">Отправить</button>
</form>
```

Код JavaScript для валидации всех полей формы:

``` js
const form = document.querySelector('.form');
const inputList = Array.from(document.querySelectorAll('.form__type-input'));
const buttonElement = form.querySelector('.button')

startValidation();

function startValidation() {
  toggleButton()
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  })
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement);
      toggleButton();
    })
  })

function checkInputValidity(inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity(checkLengthMismatch(inputElement));
  }
  if (!inputElement.validity.valid) {
    toggleErrorSpan(inputElement, inputElement.validationMessage);
  } else {
    toggleErrorSpan(inputElement);
  }
}

function checkLengthMismatch(inputElement) {
  if (inputElement.type !== 'text') {
    return ""
  }
  const valueLength = inputElement.value.trim().length;
  if (valueLength < inputElement.minLength) {
    return `Минимальное количество символов: ${inputElement.minLength}`
  }
  return ""
}

function hasInvalidInput() {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });

function toggleErrorSpan(inputElement, errorMessage){
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  if (errorMessage) {
    inputElement.classList.add('form__type-input-error')
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__error-active')
  } else {
    inputElement.classList.remove('form__type-input-error')
    errorElement.textContent = '';
    errorElement.classList.remove('form__error-active')
  }

function toggleButton() {
  if (hasInvalidInput()) {
    buttonElement.classList.add('button-inactive');
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove('button-inactive');
    buttonElement.removeAttribute("disabled");
  }
}
```

CSS-классы, которые будут использоваться при валидации:

``` css
/* Для изменения цвета обводки элемента формы при валидации */
.form__type-input-error {
  border: 1px solid #FF8630;
  background-color: rgba(255, 134, 48, 0.1);
}

/* Для отображения span-элемента с ошибкой */
.form__error-active {
  display: block;
}

/* Для блокировки кнопки submit */
.button-inactive {
  cursor: default;
  background-color: rgb(211, 211, 211, 0.2);
}
```

<iframe title="Мгновенная валидация полей" src="demos/final-form/" height="650"></iframe>

## Разбор решения

Сначала сообщаем браузеру, что он не должен валидировать форму стандартным способом, добавляя атрибут [`novalidate`](/html/novalidate/) к тегу [`<form>`](/html/form/).

```html
  <form class="form__field" novalidate>
    ...
  </form>
```

### Разметка

Давайте взглянем на пример разметки элемента формы, чтобы лучше понять, как осуществляется валидация.

Начнём с добавления атрибутов:

1. `type` — определяет ожидаемый тип данных в поле.
1. [`placeholder`](/html/placeholder/) — предоставляет подсказку пользователю о том, какие данные нужно ввести.
1. [`required`](/html/required/) — указывает на обязательность заполнения поля.

Далее связываем поле ввода и span-элемент с ошибкой с помощью идентификаторов и классов CSS. Задаём идентификатор input-элементу и присваиваем span-элементу класс, добавляя '-error'. Это позволит найти span-элемент в [`DOM`](/js/dom/) по такой схеме: `document.querySelector(${input.id}-error)`.

Переходим к установке параметров валидации. Тут мы используем как стандартные атрибуты — [`maxlength`/`minlength`](/html/minlength-maxlength/), так и нестандартные атрибуты типа [`pattern`](/html/pattern/) с регулярными выражениями. Последний позволяет настроить более точные и специфические правила для полей ввода.

Касательно атрибута `pattern`: хотя в большинстве случаев стандартных сообщений, предоставляемых системой валидации, достаточно, иногда возникает необходимость в более специфических требованиях к полям ввода. Возьмём, к примеру, ситуацию, когда требуется ввод только букв латиницы и кириллицы, дефисов и пробелов. Такой набор символов не предусмотрен стандартной валидацией, что делает необходимым использование `кастомной валидации`. Для этого мы используем регулярное выражение и записываем кастомное сообщение об ошибке в специально созданный `data-атрибут` — 'data-error-message'. Подробнее о data-атрибутах можно прочитать тут: [`.dataset`](/js/element-dataset/).

```html
<label class="form__field">
  <span class="form__label">Имя:</span>
    <input  type="text"
            id="input__name"
            class="form__type-input"
            placeholder="Иван"
            minlength="2"
            maxlength="40"
            pattern="^[a-zA-Zа-яА-ЯЁё\s\-]+$"
            data-error-message="Разрешены символы латиницы, кириллицы, знаки дефиса и пробелы."
            required>
  <!-- Span-элемент с ошибкой делаем абсолютно позиционированным -->
  <span class="form__error input__name-error"></span>
</label>
```

### JavaScript

Сначала собираем все необходимые DOM-элементы для валидации:

```js
const form = document.querySelector('.form');
const inputList = Array.from(document.querySelectorAll('.form__type-input'));
const buttonElement = form.querySelector('.button')
```

Функция `startValidation()` инициирует процесс валидации. Она добавляет обработчик событий для всей формы на событие `submit`, где используется `event.preventDefault()` для предотвращения стандартного поведения формы при отправке. Для дополнительной информации см. [Работа с формами](/js/deal-with-forms/).

Далее, на каждый элемент формы назначаются обработчики события `input`. Они активируют функции `checkInputValidity()` и `toggleButton()` при любых изменениях в полях ввода. Их мы напишем далее.

```js
function startValidation() {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  })

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement);
      toggleButton();
    })
  })
}
```

Функция `checkInputValidity()` использует JS объект `ValidityState` для проверки каждого поля ввода. Если поле не валидно, показывается сообщение об ошибке.

Объект validityState можно увидеть, если обратиться к ключу validity элемента input (input.validity). Он выглядит вот так:

```js
{
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: true,
  valueMissing: false,
}
```

Чтобы поле ввода считалось валидным, его свойство `input.validity.valid` должно быть равно true. Это свойство становится true, когда все остальные свойства в объекте validity равны false. Подробнее о validity и значении каждого ключа в этом объекте можно узнать здесь: [MDN Web Docs — ValidityState](https://developer.mozilla.org/ru/docs/Web/API/ValidityState).

В функции `checkInputValidity()` мы как раз пользуемся объектом validityState и его ключами `patternMismatch` для кастомных ошибок и `valid` для стандартной проверки.

Сначала проверяется, задан ли для поля ввода определённый паттерн и установлена ли минимальная длина. Если паттерн задан и не совпадает с введёнными данными, то с помощью функции [`setCustomValidity`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity) передаётся кастомное сообщение об ошибке, хранящееся в атрибуте data-error-message. В случае соответствия введённых данных паттерну, с помощью функции `checkLengthMismatch()` также проверяется длина введённых данных, очищенная от пробелов. Если сообщение больше установленного количества символов и не пустое, то сообщение об ошибке не передаётся, в ином случае — пользователь получает сообщение с минимально необходимым количеством символов.

Затем проводится стандартная проверка: если свойство `input.validity.valid` равно false, выводится сообщение об ошибке, а если true — ошибка убирается.

```js
function checkInputValidity(inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity(checkLengthMismatch(inputElement));
  }
  if (!inputElement.validity.valid) {
    toggleErrorSpan(inputElement, inputElement.validationMessage);
  } else {
    toggleErrorSpan(inputElement);
  }
}

function checkLengthMismatch(inputElement) {
  if (inputElement.type !== 'text') {
    return ""
  }
  const valueLength = inputElement.value.trim().length;
  if (valueLength < inputElement.minLength) {
    return `Минимальное количество символов: ${inputElement.minLength}`
  }
  return ""
}
```

Функция `toggleButton()` работает просто: если есть невалидные поля, блокирует кнопку, и наоборот. Функция `hasInvalidInput()` исследует весь массив с полями ввода и возвращает `true` или `false` в зависимости от того, есть невалидные поля или нет.

```js
function toggleButton() {
  if (hasInvalidInput()) {
    buttonElement.classList.add('button-inactive');
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove('button-inactive');
    buttonElement.removeAttribute("disabled");
  }
}

function hasInvalidInput() {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
```

Осталось самое лёгкое — сделать активными span-элементы с ошибками. Если поле ввода оказалось невалидным, то скрипт показывает заранее подготовленный элемент с сообщением об ошибке. Если поле становится валидным, то сообщение исчезает. Именно в этой функции нам пригодился трюк, где мы создавали класс ошибки по следующему шаблону: `id input-элемента + '-error'`

```js
function toggleErrorSpan(inputElement, errorMessage){
  const errorElement = document.querySelector(`.${inputElement.id}-error`)

  if (errorMessage) {
    inputElement.classList.add('form__type-input-error')
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__error-active')
  } else {
    inputElement.classList.remove('form__type-input-error')
    errorElement.textContent = '';
    errorElement.classList.remove('form__error-active')
  }
}
```

Наш код готов! Не забудьте:

1. Добавить в самое начало функции startValidation() функцию `toggleButton()`, чтобы ещё до ввода символов кнопка была заблокирована.
1. Вызвать функцию `startValidation()`;

```js
// Вызываем функцию
startValidation()

function startValidation() {
  toggleButton()

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  })

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement);
      toggleButton();
    })
  })
}
```

<iframe title="Мгновенная валидация полей" src="demos/final-form/" height="650"></iframe>

