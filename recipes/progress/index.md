---
title: "Загрузка файла с прогресс-баром"
description: "Создадим несложный вариант передачи файлов на сервер с индикацией процесса загрузки."
authors:
  - webdb81
contributors:
  - skorobaeus
  - vitya-ne
keywords:
  - загрузка файла
  - ajax
  - индикация загрузки
  - progress bar
tags:
  - article
---

## Задача

Загрузка пользователем файлов на сервер — часто встречающаяся задача при создании сайтов и приложений. Если файлы большие, то хорошей практикой будет показывать пользователю прогресс и результат загрузки файла. Для этого можно использовать прогресс-бар.

Организовать полный процесс загрузки файла возможно только с использованием серверной части, реализация которой выходит за рамки данной статьи. Поэтому далее будет рассмотрена организация отправки файла на стороне клиента: HTML-разметка, стилизация элементов и JS-код для передачи файла на сервер.

Загрузка файла на сервер состоит из трёх частей:

1. Выбор пользователем файла на своём устройстве.
1. Проверка параметров обработки файла и формирование данных с обращением к серверу.
1. Обработка данных на сервере и отправка ответа.

Серверная часть для обмена файлами может быть реализована на разных языках программирования. Например, про обработку файлов на стороне сервера с использованием PHP можно подробнее узнать [в разделе документации PHP](https://www.php.net/manual/ru/features.file-upload.php).

## Решение для загрузки файла

На странице разместим HTML-разметку формы с необходимыми элементами:

```html
<div class="demo-wrapper">
  <form
    class="form-upload"
    id="uploadForm"
    method="post"
    enctype="multipart/form-data"
  >
    <label class="form-upload__label" for="uploadForm_File">
      <span class="form-upload__title">Изображение:</span>
      <input
        class="form-upload__input"
        id="uploadForm_File"
        type="file"
        name="file_name"
        accept="image/*"
      >
    </label>
    <input
      class="form-upload__submit form-upload__submit_purple"
      id="uploadForm_Submit"
      type="submit"
      value="Загрузить файл"
    >
    <progress id="progressBar" value="0" max="100"></progress>
    <div class="form-upload__container">
      <span class="form-upload__status" id="uploadForm_Status"></span>
      <span id="uploadForm_Size"></span>
    </div>
  </form>
</div>
```

Для внешнего оформления элементов формы создадим следующие [CSS-правила](/css/css-rule/):

```css
.form-upload {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.form-upload__label {
  display: flex;
  align-items: center;
}

.form-upload__title {
  max-width: 200px;
  margin-right: 55px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
}

.form-upload__input {
  text-transform: lowercase;
  font-size: 18px;
  font-weight: 300;
  font-family: inherit;
}

.form-upload__input::file-selector-button {
  min-width: 190px;
  margin-right: 30px;
  padding: 9px 15px;
  border: none;
  border-radius: 6px;
  font-weight: inherit;
  font-family: inherit;
  cursor: pointer;
}

.form-upload__input,
.form-upload__submit,
progress,
.form-upload__container {
  width: 360px;
}

.form-upload__submit {
  display: block;
  margin-top: 25px;
  padding: 9px 15px;
  border: 2px solid transparent;
  border-radius: 6px;
  color: #000000;
  font-size: 18px;
  font-weight: 300;
  font-family: inherit;
  transition: background-color 0.2s linear;
}

.form-upload__submit:hover {
  background-color: #FFFFFF;
  cursor: pointer;
  transition: background-color 0.2s linear;
}

.form-upload__submit:focus-visible,
.form-upload__submit:focus {
  border: 2px solid #ffffff;
  outline: none;
}

.form-upload__submit_purple {
  background-color: #C56FFF;
}

progress {
  height: 5px;
  margin-top: 25px;
  border: none;
  background-color: #286C2D;
}

progress::-webkit-progress-bar {
  border: none;
  background-color: #286C2D;
}

progress::-webkit-progress-value {
  background-color: #41E847;
}

progress::-moz-progress-bar {
  border: none;
  background-color: #41E847;
}

.form-upload__container {
  margin-top: 10px;
  font-size: 16px;
}

.form-upload__status:empty::before {
  content: "Не загружено";
}

```

В конце HTML-страницы или в отдельном JS-файле добавим код, который обеспечит связь между пользователем и сервером:

```javascript
const BYTES_IN_MB = 1048576

const form = document.getElementById('uploadForm')
const submitButton = form.querySelector('.form-upload__submit')
const fileInput = form.querySelector('.form-upload__input')
const sizeText = form.querySelector('#uploadForm_Size')
const statusText = form.querySelector('.form-upload__status')
const progressBar = form.querySelector('#progressBar')

function resetProgress(status = '') {
  statusText.textContent = status
  sizeText.textContent = ''
  progressBar.value = 0
}

function upload(fileToUpload) {
  const formSent = new FormData()
  formSent.append('uploadForm_File', fileToUpload)

  const xhr = new XMLHttpRequest()
  xhr.upload.addEventListener('progress', progressHandler, false)
  xhr.addEventListener('load', loadHandler, false)
  xhr.addEventListener('error', errorHandler);
  xhr.open('POST', 'upload_processing.php')

  xhr.send(formSent)
}

function updateProgress(loaded, total) {
  const loadedMb = (loaded/BYTES_IN_MB).toFixed(1)
  const totalSizeMb = (total/BYTES_IN_MB).toFixed(1)
  const percentLoaded = Math.round((loaded / total) * 100)

  progressBar.value = percentLoaded
  sizeText.textContent = `${loadedMb} из ${totalSizeMb} МБ`
  statusText.textContent = `Загружено ${percentLoaded}% | `
}

addEventListener('load', function () {
  if (fileInput.value) {
    resetProgress()
  }
})

fileInput.addEventListener('change', function () {
  const file = this.files[0]
  if (file.size > 5 * BYTES_IN_MB) {
    alert('Принимается файл до 5 МБ')
    this.value = null
  }

  resetProgress()
})

form.addEventListener('submit', function (event) {
  event.preventDefault()

  if (fileInput.files.length > 0) {
    const fileToUpload = fileInput.files[0]
    fileInput.disabled = true
    submitButton.disabled = true
    resetProgress()
    upload(fileToUpload)
  } else {
    alert('Сначала выберите файл')
  }

  return false
})

function progressHandler(event) {
  updateProgress(event.loaded, event.total)
}

function loadHandler(event) {
  if (event.target.status !== 200) {
    errorHandler()
  } else {
    statusText.textContent = event.target.responseText
    progressBar.value = 0
    fileInput.disabled = false
    submitButton.disabled = false
  }
}

function errorHandler() {
  resetProgress('Ошибка загрузки')
  fileInput.disabled = false
  submitButton.disabled = false
}
```

<iframe title="Пример загрузки одного файла" src="demos/single-file/" height="330"></iframe>

Было бы удобно иметь возможность тестировать наше решение изолированно (без реализации кода серверной части). Для этого можно добавить функцию симуляции загрузки, предусмотрев вариант завершения загрузки в результате ошибки. Следующий пример демонстрирует этот подход.

<iframe title="Эмуляция загрузки файла" src="demos/emulation/" height="330"></iframe>

Полный вариант загрузки файла с его сохранением на сервере выглядит так:

<video controls width="640">
  <source src="video/progress.mp4" type="video/mp4">
  <source src="video/progress_safari.mp4" type="video/mp4">
  <track
  label="Russian"
  kind="subtitles"
  srclang="ru"
  src="video/closed-captions.vtt">
</video>

## Разбор решения

### Разметка

```html
<div class="demo-wrapper">
  <form
    class="form-upload"
    id="uploadForm"
    method="post"
    enctype="multipart/form-data"
  >
    <label class="form-upload__label" for="uploadForm_File">
      <span class="form-upload__title">Изображение:</span>
      <input
        class="form-upload__input"
        id="uploadForm_File"
        type="file"
        name="file_name"
        accept="image/*"
      >
    </label>
    <input
      class="form-upload__submit form-upload__submit_purple"
      id="uploadForm_Submit"
      type="submit"
      value="Загрузить файл"
    >
    <progress id="progressBar" value="0" max="100"></progress>
    <div class="form-upload__container">
      <span class="form-upload__status" id="uploadForm_Status"></span>
      <span id="uploadForm_Size"></span>
    </div>
  </form>
</div>
```

Все элементы, которые участвуют в обработке и отправке файла, размещаются внутри [формы](/html/form/).

Для формы указывается атрибут `enctype` со значением `multipart/form-data`, поскольку будет использоваться элемент управления для выбора файлов.

Файл для отправки пользователь сможет выбрать с помощью элемента [`<input>`](/html/input/), для которого установлен тип `file`. Формат файлов, которые можно будет загрузить, устанавливается значением атрибута [`accept`](/html/accept/). В данном случае допускается использование изображений любого формата.

☝️ Текст на элементе [`<input type="file"`](/html/input/) может отображаться по разному в зависимости от браузера и установленного языка OC.

Отправка файла на сервер выполняется при отправке формы. Для этого в JS-коде мы подписываемся на событие `submit`. Обработчик этого события будет обрабатывать выбранный файл и передавать его на сервер.

Ход выполнения загрузки будет показываться с использованием специального элемента [`<progress>`](/html/progress/). В этот тег встроена роль [`progressbar`](/a11y/role-progressbar/), благодаря которой [скринридеры](/a11y/screenreaders/) объявляют прогресс загрузки автоматически.

Чтобы показать текстовую информацию о результатах загрузки, используются текстовые элементы [`<span>`](/html/span/).

Для каждого элемента внутри формы указывается атрибут [`id`](/html/global-attrs/#id) — это позволит JS-коду обращаться к нужным элементам для выполнения необходимых действий.

### Стили

Внешний вид элемента [`<progress>`](/html/progress/) может быть разным — это зависит от браузера и операционной системы устройства пользователя. Например, вот так прогресс-бар будет выглядеть на устройствах с macOS и Windows:

![Внешний вид прогресс-бара в macOS и Windows](images/default_progressbar.png)

Чтобы прогресс-бар выглядел одинаково в разных браузерах, необходимо создать стилевые правила. Правило ниже определяет следующие свойства индикатора:

- добавляет верхний отступ;
- убирает границу по умолчанию;
- меняет цвет фона.

```css
progress {
  height: 5px;
  margin-top: 25px;
  border: none;
  background-color: #286C2D;
}
```

В Firefox эти стили не затронут бегунок, поэтому дополнительно потребуется использовать [вендорный префикс](/css/vendor-prefixes/) `-moz`. Для стилизации в Chrome и Safari как самого элемента, так и его бегунка, необходимо использовать браузерные префиксы `-webkit`.

В итоге для одинакового отображения прогресс-бара и бегунка во всех основных браузерах, добавим следующие правила:

```css
progress::-webkit-progress-bar {
  border: none;
  background-color: #286C2D;
}

progress::-webkit-progress-value {
  background-color: #41E847;
}

progress::-moz-progress-bar {
  border: none;
  background-color: #41E847;
}
```

Остальным элементам определим стили для организации их взаимного расположения:

```css
.form-upload {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.form-upload__label {
  display: flex;
  align-items: center;
}

.form-upload__submit {
  display: block;
  margin-top: 25px;
  padding: 9px 15px;
  border: 2px solid transparent;
  border-radius: 6px;
  color: #000000;
}

.form-upload__container {
  margin-top: 10px;
}
```

### JavaScript

Для начала объявим константы и получим все необходимые элементы DOM-дерева, чтобы подписываться на события:

```js
// сколько байтов в мегабайте
const BYTES_IN_MB = 1048576

const form = document.getElementById('uploadForm')
const submitButton = form.querySelector('.form-upload__submit')
const fileInput = form.querySelector('.form-upload__input')
const sizeText = form.querySelector('#uploadForm_Size')
const statusText = form.querySelector('.form-upload__status')
const progressBar = form.querySelector('#progressBar')
```

Приступим к определению служебных функций. Вызов этих функций будет осуществляться с помощью обработчиков событий. Такое разделение логики позволяет легче ориентироваться в кодовой базе, избегать дублирования кода, и упрощает дальнейшие модификации.

Создадим функцию сброса состояния загрузки, это понадобится для очистки информации о предыдущих загрузках:

```js
function resetProgress(status = '') {
  statusText.textContent = status
  sizeText.textContent = ''
  progressBar.value = 0
}
```

Рассмотрим функцию отправки данных. Параметром функции является выбранный для отправки файл. Чтобы отправить файл на сервер без перезагрузки страницы, воспользуемся `XMLHttpRequest` — набором механизмов для обмена данными между клиентом и сервером. Более подробно о нём можно почитать на [странице документации MDN](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest).

Инициализируем необходимые объекты:
- `formSent` - объект `FormData`, в котором будут храниться данные для отправки;
- `xhr` - объект `XMLHttpRequest` для формирования запроса к серверу.
```js

const formSent = new FormData()
formSent.append('uploadForm_File', fileToUpload)
const xhr = new XMLHttpRequest()

```
После этого устанавливаем параметры `XMLHttpRequest`:
- для `XMLHttpRequestUpload` добавляется обработчик события `progress`, который выполняет отслеживание состояния загрузки файла;
- для `XMLHttpRequest` добавляются обработчики событий `load` и `error` позволяющие отслеживать результат загрузки;
- метод `open()` инициализирует POST-запрос к управляющему файлу, который хранится на сервере.

Отправка данных выполняется с помощью метода `send()`.

```js
function upload(fileToUpload) {
  const formSent = new FormData()
  formSent.append('uploadForm_File', fileToUpload)

  const xhr = new XMLHttpRequest()
  xhr.upload.addEventListener('progress', progressHandler, false)
  xhr.addEventListener('load', loadHandler, false)
  xhr.addEventListener('error', errorHandler);
  xhr.open('POST', 'upload_processing.php')

  xhr.send(formSent)
}
```

Для показа индикации загрузки файла создадим функцию `updateProgress()`. Функция будет вызываться при загрузке каждого нового пакета. Это позволит показывать и обновлять прогресс-бар в реальном времени. Посчитаем нужные данные: сколько мегабайт уже загружено, размер файла и процент загрузки. Воспользуемся полученными значениями, чтобы обновить текст на экране.

```js
function updateProgress(loaded, total) {
  const loadedMb = (loaded/BYTES_IN_MB).toFixed(1)
  const totalSizeMb = (total/BYTES_IN_MB).toFixed(1)
  const percentLoaded = Math.round((loaded / total) * 100)

  progressBar.value = percentLoaded
  sizeText.textContent = `${loadedMb} из ${totalSizeMb} МБ`
  statusText.textContent = `Загружено ${percentLoaded}% | `
}
```

Основную логику будут определять функции-обработчики.

Загрузка файлов большого размера увеличивает нагрузку на сервер, поэтому установим максимальный размер файла в 5 МБ, что составляет 5242880 Б. Проверку размера файла выполним на этапе его выбора пользователем. Для этого получим информацию о файле с помощью выражения `this.files[0]`.

```js
fileInput.addEventListener('change', function () {
  const file = this.files[0]
  if (file.size > 5 * BYTES_IN_MB) {
    alert('Принимается файл до 5 МБ')
    this.value = null
  }

  resetProgress()
});
```

После нажатия кнопки «Загрузить файл» происходит событие `submit`. В обработчике этого события мы проверяем что файл выбран и вызываем функцию `upload()`, отвечающую за отправку данных на сервер. На время выполнения запроса блокируем возможность выбора и отправки нового файла. Если файл не выбран, оповещаем об этом пользователя:

```js
form.addEventListener('submit', function (event) {
  event.preventDefault()

  if (fileInput.files.length > 0) {
    const fileToUpload = fileInput.files[0]
    fileInput.disabled = true
    submitButton.disabled = true
    resetProgress()
    upload(fileToUpload)
  } else {
    alert('Сначала выберите файл')
  }

  return false
})
```

Выполнение запроса может завершиться как успешно, так и ошибкой. С помощью обработчиков `loadHandler()` и `errorHandler()` определяем какую информацию о результате загрузки необходимо отобразить. После завершения загрузки разблокируем возможность отправки файлов:

```js
function loadHandler(event) {
  if (event.target.status !== 200) {
    errorHandler()
  } else {
    statusText.textContent = event.target.responseText
    progressBar.value = 0
    fileInput.disabled = false
    submitButton.disabled = false
  }
}

function errorHandler() {
  resetProgress('Ошибка загрузки')
  fileInput.disabled = false
  submitButton.disabled = false
}
```
