---
title: "Мгновенная валидация форм"
description: "На лету проверяем, правильно ли пользователь заполнил поля формы."
authors:
  - makarovaiuliia
contributors:
  - skorobaeus
  - tatianafokina
  - kozlovtseva
related:
  - js/forms
  - html/form
  - a11y/accessible-forms
tags:
  - article
---

## Задача

Кто из нас не знаком с той неприятной ситуацией, когда усердно заполняешь форму, вводишь данные, а потом, с надеждой нажимая на кнопку «Отправить», обнаруживаешь, что что-то пошло не так и все усилия пропали даром? Для этого есть решение — мгновенная валидация при помощи JavaScript!

Отличный пользовательский опыт — ключ к успеху. Валидация форм с помощью HTML не может предоставить того уровня UX (пользовательского опыта), который требуется стандартами веб-разработки. Ему на помощь приходит валидация через JavaScript. Она обеспечивает мгновенную обратную связь при заполнении формы и аккуратно подсказывает, что нужно исправить прежде чем форма отправится.

## Готовое решение

Пример стандартной HTML-разметки формы:

```html
<form
  class="form"
  name="form"
  method="POST"
  novalidate
>
  <div class="form__field-container">
    <label class="form__field">
      <span class="form__label">Имя:</span>
      <input
        type="text"
        id="input__name"
        class="form__type-input"
        placeholder="Иван"
        pattern="^[a-zA-Zа-яА-ЯЁё \-]+$"
        data-error-message="Разрешены символы латиницы,
        кириллицы, знаки дефиса и пробелы."
        aria-describedby="name-error"
        required
      >
    </label>
    <span
      class="form__error
      input__name-error"
      id="name-error"
      aria-live="polite"
    >
    </span>
  </div>
  <div class="form__field-container">
    <label class="form__field">
      <span class="form__label">Фамилия:</span>
      <input
        type="text"
        id="input__surname"
        class="form__type-input"
        placeholder="Васильевич"
        pattern="^[a-zA-Zа-яА-ЯЁё\s\-]+$"
        data-error-message="Разрешены символы латиницы,
        кириллицы, знаки дефиса и пробелы."
        aria-describedby="surname-error"
        required
      >
    </label>
    <span
      class="form__error
      input__surname-error"
      id="surname-error"
      aria-live="polite"
    >
    </span>
  </div>
  <div class="form__field-container">
    <label class="form__field">
      <span class="form__label">Почта:</span>
      <input
        type="email"
        id="input__e-mail"
        class="form__type-input"
        placeholder="menyaet.professiyu@ivan.com"
        aria-describedby="email-error"
        required
      >
    </label>
    <span
      class="form__error input__e-mail-error"
      id="email-error"
      aria-live="polite"
    >
    </span>
  </div>
  <div class="form__field-container">
    <label class="form__field">
      <span class="form__label">Возраст:</span>
      <input
        type="number"
        id="input__age"
        class="form__type-input"
        placeholder="40"
        min="18"
        max="100"
        aria-describedby="age-error"
        required
      >
    </label>
    <span
      class="form__error input__age-error"
      id="age-error"
      aria-live="polite"
    >
    </span>
  </div>
  <div class="form__field-container">
    <label class="form__checkbox-label">
      <input
        type="checkbox"
        id="input__checkbox"
        class="form__type-checkbox"
        checked
        aria-describedby="checkbox-error"
        required
      />
      <span class="form__type-checkbox-title">
        Я согласен быть царём
      </span>
    </label>
    <span class="form__error input__checkbox-error" id="checkbox-error" aria-live="polite"></span>
  </div>
  <button
    type="submit"
    class="button"
    aria-describedby="empty-error"
  >
    Отправить
  </button>
  <span
    class="form__empty-error"
    id="empty-error"
    aria-live="assertive"
  >
  </span>
</form>
```

Код JavaScript для валидации всех полей формы:

``` js
const form = document.querySelector('.form')
const inputList = Array.from(form.querySelectorAll('.form__type-input'))
const checkboxElement = form.querySelector('.form__type-checkbox')
const buttonElement = form.querySelector('.button')
const formErrorElement = form.querySelector('.form__empty-error')

startValidation()

function startValidation() {
  toggleButton()
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (hasInvalidInput()) {
      formError()
      inputList.forEach((inputElement) => {
        checkInputValidity(inputElement)
        toggleInputError(inputElement)
      })
      toggleInputError(checkboxElement)
    }
  })
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement)
      toggleButton()
    })
    inputElement.addEventListener('blur', () => {
      toggleInputError(inputElement)
    })
    inputElement.addEventListener('focus', () => {
      toggleErrorSpan(inputElement)
    })
    checkboxElement.addEventListener('change', () => {
      toggleInputError(checkboxElement)
      toggleButton()
    })
  })
}

function checkInputValidity(inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity(checkLengthMismatch(inputElement))
  }
}

function checkLengthMismatch(inputElement) {
  if (inputElement.type !== 'text') {
    return ''
  }
  const valueLength = inputElement.value.trim().length
  if (valueLength < inputElement.minLength) {
    return `Минимальное количество символов: ${inputElement.minLength}`
  }
  return ''
}

function hasInvalidInput() {
  return (
    inputList.some(inputElement => !inputElement.validity.valid) || !checkboxElement.validity.valid
  )
}

function toggleErrorSpan(inputElement, errorMessage){
  const errorElement = document.querySelector(`.${inputElement.id}-error`)
  if (errorMessage) {
    inputElement.classList.add('form__type-input-error')
    errorElement.textContent = errorMessage
    errorElement.classList.add('form__error-active')
  } else {
    inputElement.classList.remove('form__type-input-error')
    errorElement.textContent = ''
    errorElement.classList.remove('form__error-active')
  }
}

function toggleButton() {
  if (hasInvalidInput()) {
    buttonElement.classList.add('button-inactive')
    buttonElement.setAttribute('aria-disabled', 'true')
  } else {
    buttonElement.classList.remove('button-inactive')
    buttonElement.setAttribute('aria-disabled', 'false')
    formErrorElement.textContent = ''
  }
}

function formError() {
  const errorMessage = 'Заполните все поля для отправки формы.'
  formErrorElement.textContent = errorMessage
}
```

CSS-стили, которые будут использоваться при валидации:

``` css
/* Для изменения цвета обводки элемента формы при валидации */
.form__type-input-error {
  border: 1px solid #FF8630;
  background-color: rgb(255 134 48 / 0.1);
}

/* Для отображения span-элемента с ошибкой */
.form__error-active {
  display: block;
}

/* Для блокировки кнопки submit */
.button-inactive {
  cursor: default;
  background-color: rgb(211 211 211 / 0.6);
}
```

<iframe title="Мгновенная валидация полей" src="demos/final-form/" height="780"></iframe>

## Разбор решения

Сначала сообщаем браузеру, что он не должен валидировать форму стандартным способом, добавляя атрибут [`novalidate`](/html/novalidate/) к тегу [`<form>`](/html/form/).

```html
<form class="form__field" novalidate>
  <!-- Содержимое формы -->
</form>
```

### Разметка

Взгляните на пример разметки элемента формы, чтобы лучше понять, как осуществляется валидация.

Добавим атрибуты:

1. [`type`](/html/input/#type) — определяет ожидаемый тип данных в поле.
1. [`placeholder`](/html/placeholder/) — предоставляет подсказку пользователю о том, какие данные нужно ввести.
1. [`required`](/html/required/) — указывает на обязательность заполнения поля.

Свяжем поле ввода и `<span>` с ошибкой с помощью идентификаторов и классов CSS. Задаём идентификатор для [`<input>`](/html/input/) и присваиваем для `<span>` аналогичный класс, добавляя '-error' в конце. Это позволит найти `<span>` в [`DOM`](/js/dom/) по такой схеме: `document.querySelector(${input.id}-error)`. Чтобы эта связь между полем и ошибкой к нему была понятна и пользователям вспомогательных технологий, свяжем их атрибутом [`aria-describedby`](/a11y/aria-describedby/) у поля и кнопки и `id` с таким же значением у `<span>`. Чтобы вспомогательные технологии рассказывали о них автоматически, добавим ещё другой ARIA-атрибут [`aria-live`](/a11y/aria-live/).

<aside>

⚠️ Текст сообщений об ошибках по умолчанию будет на том языке, который пользователь выбрал в браузере. Так что можете столкнуться с ситуацией, когда ваши ошибки отображаются на одном языке, а стандартные браузерные — на другом.

</aside>

Настроим параметры валидации. Тут можно использовать как стандартные атрибуты — [`maxlength`/`minlength`](/html/minlength-maxlength/), так и нестандартные атрибуты типа [`pattern`](/html/pattern/) с регулярными выражениями. Последний позволяет настроить более точные и специфические правила для полей ввода.

Подробнее о `pattern`: хотя в большинстве случаев стандартных сообщений валидации достаточно, иногда возникает необходимость в более специфических требованиях к полям ввода. Возьмём, к примеру, ситуацию, когда требуется ввод только букв латиницы и кириллицы, дефисов и пробелов. Такой набор символов не предусмотрен стандартной валидацией, что делает необходимым использование _кастомной валидации_. Для этого используем регулярное выражение и записываем кастомное сообщение об ошибке в специально созданный data-атрибут — 'data-error-message'. Подробнее о data-атрибутах можно прочитать в доке про [атрибуты `data-*`](/html/data-attributes/).

```html
<label class="form__field">
  <span class="form__label">Имя:</span>
  <input
    type="text"
    id="input__name"
    class="form__type-input"
    placeholder="Иван"
    pattern="^[a-zA-Zа-яА-ЯЁё \-]+$"
    data-error-message="Разрешены символы латиницы,
    кириллицы, знаки дефиса и пробелы."
    aria-describedby="name-error"
    required
  >
</label>
<span
  class="form__error
  input__name-error"
  id="name-error"
  aria-live="polite"
>
</span>
```

### JavaScript

Сначала собираем все необходимые DOM-элементы для валидации:

```js
const form = document.querySelector('.form')
const inputList = Array.from(form.querySelectorAll('.form__type-input'))
const checkboxElement = form.querySelector('.form__type-checkbox')
const buttonElement = form.querySelector('.button')
const formErrorElement = form.querySelector('.form__empty-error')
```

Функция `startValidation()` инициирует процесс валидации. Она добавляет обработчик событий для всей формы на событие [`submit`](/js/event-submit/), где используется [`event.preventDefault()`](/js/event-prevent-default/) для предотвращения стандартного поведения формы при отправке. Для дополнительной информации читайте «[Работа с формами](/js/deal-with-forms/)».

На каждое поле ввода назначаются обработчики событий `input`, `blur` и `focus`. При любых изменениях в полях ввода активируются функции `checkInputValidity()` и `toggleButton()`. При потере фокуса активируется функция `toggleInputError()`, а при установке фокуса сбрасывается сообщение об ошибке с помощью `toggleErrorSpan()`.
Для чекбокса добавим отдельный обработчик `change`, при срабатывании такого события вызовутся функции `toggleInputError()` и `toggleButton()`. Все эти функции мы напишем далее.

```js
function startValidation() {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (hasInvalidInput()) {
      formError()
      inputList.forEach((inputElement) => {
        checkInputValidity(inputElement)
        toggleInputError(inputElement)
      })
      toggleInputError(checkboxElement)
    }
  })

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement)
      toggleButton()
    })
    inputElement.addEventListener('blur', () => {
      toggleInputError(inputElement)
    })
    inputElement.addEventListener('focus', () => {
      toggleErrorSpan(inputElement)
    })
  })

  checkboxElement.addEventListener('change', () => {
    toggleInputError(checkboxElement)
    toggleButton()
  })
}
```

Функция `checkInputValidity()` использует JavaScript-объект `ValidityState` для проверки каждого поля ввода. Если поле не валидно, показывается сообщение об ошибке.

Объект `validityState` можно увидеть, если обратиться к ключу `validity` элемента `input` (`input.validity`). Он выглядит вот так:

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

Чтобы поле ввода считалось валидным, его свойство `input.validity.valid` должно быть равно `true`. Это свойство становится `true`, когда все остальные свойства в объекте `validity` равны `false`. Подробнее о `validity` и значении каждого ключа в этом объекте можно узнать здесь: [MDN Web Docs — ValidityState](https://developer.mozilla.org/ru/docs/Web/API/ValidityState).

В функции `checkInputValidity()` как раз используется объект `validityState` и его ключи `patternMismatch` для кастомных ошибок и `valid` для стандартной проверки.

Сначала проверяется задан ли для поля ввода определённый паттерн и установлена ли минимальная длина. Если паттерн задан и не совпадает с введёнными данными, то с помощью функции [`setCustomValidity`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity) передаётся кастомное сообщение об ошибке, хранящееся в атрибуте `data-error-message`. В случае соответствия введённых данных паттерну, с помощью функции `checkLengthMismatch()` также проверяется длина введённых данных, очищенная от пробелов. Если сообщение больше установленного количества символов и не пустое, то сообщение об ошибке не передаётся, в ином случае — пользователь получает сообщение с минимально необходимым количеством символов.

В функции `toggleInputError()` реализована стандартная проверка: если свойство `input.validity.valid` равно `false`, выводится сообщение об ошибке, а если `true` — ошибка убирается.

```js
function checkInputValidity(inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity(checkLengthMismatch(inputElement))
  }
}

function checkLengthMismatch(inputElement) {
  if (inputElement.type !== 'text') {
    return ''
  }
  const valueLength = inputElement.value.trim().length
  if (valueLength < inputElement.minLength) {
    return `Минимальное количество символов: ${inputElement.minLength}`
  }
  return ''
}

function toggleInputError(inputElement) {
  if (!inputElement.validity.valid) {
    toggleErrorSpan(inputElement, inputElement.validationMessage)
  } else {
    toggleErrorSpan(inputElement)
  }
}
```

Функция `toggleButton()` устроена просто: она блокирует кнопку, когда находит невалидные поля, и вновь активирует её, если все поля заполнены корректно. Функция `hasInvalidInput()` проверяет поля ввода и чекбокс на наличие ошибок и возвращает `true` или `false`, основываясь на том, обнаружены ли невалидные данные.

Блокировка кнопки отправки формы — рискованный приём. Важно учитывать различные варианты поведения пользователя. Чтобы избежать ситуаций, когда пользователь не понимает причину блокировки кнопки, мы принимаем следующие меры:

- Применяем класс `button-inactive`, который изменяет цвет кнопки на менее яркий, подсказывая пользователю, что нажатие невозможно.
- Добавляем через этот класс свойства [`cursor: not-allowed;`](/css/cursor/), которое меняет форму курсора на символ запрета.
- При клике по кнопке отправки формы или при нажатии на неё с клавиатуры показываем ошибку, которая объясняет причину блокировки. Реализуем это с помощью JavaScript.
- В случае ввода невалидных данных в одно из полей, пользователь получает обратную связь о допущенной ошибке после потери фокуса на поле или после того, как снят маркер с обязательного чекбокса.
- Как только пользователь ввёл валидные данные, кнопка становится активной.
- Чтобы заблокированная кнопка была заметна пользователям, перемещающимся по сайту с помощью клавиши <kbd>Tab</kbd>, мы добавляем к кнопке атрибут [`aria-disabled`](/a11y/aria-disabled/).

Так же напоминаем, что при блокировке кнопки отправки формы важно удостовериться, что требования к заполнению формы разумны и могут быть выполнены всеми пользователями. Следует избегать установления _чрезмерно строгих условий_ для данных, вводимых пользователем. К примеру, пользователь может столкнуться с тем, что его имя слишком длинное для установленного в форме ограничения в 10 символов, что сделает невозможным отправку формы и ограничит доступ к вашему продукту.

```js
function toggleButton() {
  if (hasInvalidInput()) {
    buttonElement.classList.add('button-inactive')
    buttonElement.setAttribute('aria-disabled', 'true')
  } else {
    buttonElement.classList.remove('button-inactive')
    buttonElement.setAttribute('aria-disabled', 'false')
    formErrorElement.textContent = ''
  }
}

function hasInvalidInput() {
  return (
    inputList.some(inputElement => !inputElement.validity.valid) || !checkboxElement.validity.valid
  )
}

function formError() {
  const errorMessage = 'Заполните все поля для отправки формы.'
  formErrorElement.textContent = errorMessage
}
```

```css
.button-inactive {
  cursor: not-allowed;
  background-color: rgb(211 211 211 / 0.6);
}

.button-inactive:hover {
  background-color: rgb(211 211 211 / 0.2);
  border: 2px solid transparent;
}

.form__empty-error {
  padding: 10px 0;
  font-size: 18px;
  color: #FF8630;
}
```

Осталось самое лёгкое — сделать активными элементы с ошибками. Если поле ввода оказалось невалидным, то скрипт показывает заранее подготовленный элемент с сообщением об ошибке. Если поле становится валидным, то сообщение исчезает. Именно в этой функции нам пригодился трюк, где мы создавали класс ошибки по следующему шаблону: `id input-элемента + '-error'`

```js
function toggleErrorSpan(inputElement, errorMessage){
  const errorElement = document.querySelector(`.${inputElement.id}-error`)

  if (errorMessage) {
    inputElement.classList.add('form__type-input-error')
    errorElement.textContent = errorMessage
    errorElement.classList.add('form__error-active')
  } else {
    inputElement.classList.remove('form__type-input-error')
    errorElement.textContent = ''
    errorElement.classList.remove('form__error-active')
  }
}
```

Также позаботимся об ошибке про пустую форму при клике или нажатии с клавиатуры на кнопку.

```js
const formErrorElement = form.querySelector('.form__empty-error')

function startValidation() {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    // Показываем ошибку
    if (hasInvalidInput()) {
      formError()
      inputList.forEach((inputElement) => {
        checkInputValidity(inputElement)
        toggleInputError(inputElement)
      })
      toggleInputError(checkboxElement)
    }
  })
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement)
      toggleButton()
    })
    inputElement.addEventListener('blur', () => {
      toggleInputError(inputElement)
    })
    inputElement.addEventListener('focus', () => {
      toggleErrorSpan(inputElement)
    })
  })
  checkboxElement.addEventListener('change', () => {
    toggleInputError(checkboxElement)
    toggleButton()
  })
}

function toggleButton() {
  if (hasInvalidInput()) {
    buttonElement.classList.add('button-inactive')
    buttonElement.setAttribute('aria-disabled', 'true')
  } else {
    buttonElement.classList.remove('button-inactive')
    buttonElement.setAttribute('aria-disabled', 'false')
    // Удаляем текст ошибки
    formErrorElement.textContent = ''
  }
}

// Здесь храним и добавляем текст к нужному контейнеру
function formError() {
  const errorMessage = 'Заполните все поля для отправки формы.'
  formErrorElement.textContent = errorMessage
}
```

Наш код готов! Не забудьте:

1. Добавить в самое начало функции `startValidation()` функцию `toggleButton()`, чтобы ещё до ввода символов кнопка была заблокирована.
1. Вызвать функцию `startValidation()`.

```js
// Вызываем функцию
startValidation()

function startValidation() {
  toggleButton()

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (hasInvalidInput()) {
      formError()
      inputList.forEach((inputElement) => {
        checkInputValidity(inputElement)
        toggleInputError(inputElement)
      })
      toggleInputError(checkboxElement)
    }
  })

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement)
      toggleButton()
    })
    inputElement.addEventListener('blur', () => {
      toggleInputError(inputElement)
    })
    inputElement.addEventListener('focus', () => {
      toggleErrorSpan(inputElement)
    })
  })
  checkboxElement.addEventListener('change', () => {
    toggleInputError(checkboxElement)
    toggleButton()
  })
}
```

<iframe title="Мгновенная валидация полей" src="demos/final-form/" height="780"></iframe>
