---
title: "Загрузка файла с прогресс-баром"
description: "Создадим несложный вариант передачи файлов на сервер с индикацией процесса загрузки."
authors:
  - webdb81
contributors:
  - skorobaeus
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

#uploadForm_File {
  text-transform: lowercase;
  cursor: pointer;
}

#uploadForm_File,
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

.form-upload__submit:focus-visible {
  border: 2px solid #ffffff;
  outline: none;
}

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

.form-upload__status:empty + span {
  display: none;
}
```

В конце HTML-страницы или в отдельном JS-файле добавим код, который обеспечит связь между пользователем и сервером:

```javascript
const BYTES_IN_MB = 1048576

const form = document.getElementById('uploadForm')
const fileInput = document.getElementById('uploadForm_File')
const sizeText = document.getElementById('uploadForm_Size')
const statusText = document.getElementById('uploadForm_Status')
const progressBar = document.getElementById('progressBar')

fileInput.addEventListener('change', function () {
  const file = this.files[0]
  if (file.size > 5 * BYTES_IN_MB) {
    alert('Принимается файл до 5 МБ')
    this.value = null
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const fileToUpload = fileInput.files[0]
  const formSent = new FormData()
  const xhr = new XMLHttpRequest()

  if (fileInput.files.length > 0) {
    formSent.append('uploadForm_File', fileToUpload)

    // собираем запрос и подписываемся на событие progress
    xhr.upload.addEventListener('progress', progressHandler, false)
    xhr.addEventListener('load', loadHandler, false)
    xhr.open('POST', 'upload_processing.php')
    xhr.send(formSent)
  } else {
    alert('Сначала выберите файл')
  }
  return false
});

function progressHandler(event) {
  // считаем размер загруженного и процент от полного размера
  const loadedMb = (event.loaded/BYTES_IN_MB).toFixed(1)
  const totalSizeMb = (event.total/BYTES_IN_MB).toFixed(1)
  const percentLoaded = Math.round((event.loaded / event.total) * 100)

  progressBar.value = percentLoaded
  sizeText.textContent = `${loadedMb} из ${totalSizeMb} МБ`
  statusText.textContent = `Загружено ${percentLoaded}% | `
}

function loadHandler(event) {
  statusText.textContent = event.target.responseText
  progressBar.value = 0
}
```

<iframe title="Пример загрузки одного файла" src="demos/single-file/" height="330"></iframe>

Полный вариант загрузки файла с его сохранением на сервере выглядит так:

<video controls width="640">
  <source src="video/progress.mp4" type="video/mp4">
  <source src="video/progress_safari.mp4" type="video/mp4">
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

Файл для отправки пользователь сможет выбрать с помощью элемента [`<input>`](/html/input/), для которого установлен тип `file`. Формат файлов, которые можно будет загрузить, устанавливается значением атрибута `accept`. В данном случае допускается использование изображений любого формата.

Отправка файла на сервер выполняется при отправке формы. Для этого в JS-коде мы подписываемся на событие `submit`. Обработчик этого события будет обрабатывать выбранный файл и передавать его на сервер.

Ход выполнения загрузки будет показываться с использованием специального элемента [`<progress>`](/html/progress/).

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

#uploadForm_File {
  cursor: pointer;
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

```javascript
// сколько байтов в мегабайте
const BYTES_IN_MB = 1048576

const form = document.getElementById('uploadForm')
const fileInput = document.getElementById('uploadForm_File')
const sizeText = document.getElementById('uploadForm_Size')
const statusText = document.getElementById('uploadForm_Status')
const progressBar = document.getElementById('progressBar')
```

Чтобы отправить файл на сервер без перезагрузки страницы, воспользуемся `XMLHttpRequest` — набором механизмов для обмена данными между клиентом и сервером без перезагрузки. Более подробно о нём можно почитать на [странице документации MDN](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest). Чаще всего для отправки данных используется метод [`fetch`](/js/fetch/), но он не позволяет отслеживать прогресс загрузки файлов.

Загрузка файлов большого размера увеличивает нагрузку на сервер, поэтому установим максимальный размер файла в 5 МБ, что составляет 5242880 Б. Проверку размера файла выполним на этапе его выбора пользователем. Для этого получим информацию о файле с помощью выражения `this.files[0]`.

```javascript
fileInput.addEventListener('change', function () {
  const file = this.files[0]
  if (file.size > 5 * BYTES_IN_MB) {
    alert('Принимается файл до 5 МБ')
    this.value = null
  }
});
```

Основную работу будет выполнять функция-обработчик отправки формы. Она которая принимает выбранный пользователем файл и отправляет его на сервер. Функция выполняется после нажатия кнопки «Загрузить файл».

Первым делом объявляем переменные:

- `fileToLoad` получает данные выбранного файла;
- `formSent`, в которой с использованием объекта `FormData` будут храниться данные формы для отправки;
- `xhr` для обращения к серверу с использованием `XMLHttpRequest`.

```javascript
const fileToUpload = fileInput.files[0]
const formSent = new FormData()
const xhr = new XMLHttpRequest()
```

После этого указываем последовательность работы `XMLHttpRequest` при передаче файла на сервер:

- если файл выбран — выполняется его обработка, иначе появляется предупреждение;
- выбранный файл сохраняется для отправки;
- для `XMLHttpRequest` добавляется обработчик события `progress`, который выполняет отслеживание состояния загрузки файла;
- для `XMLHttpRequest` добавляется обработчик события `load`, который отслеживает статус загрузки;
- метод `open()` выполняет POST-запрос к управляющему файлу, который хранится на сервере;
- выбранный пользователем файл передаётся на сервер с использованием `FormData`.

```javascript
if (fileInput.files.length > 0) {
  formSent.append('uploadForm_File', fileToUpload)

  xhr.upload.addEventListener('progress', progressHandler, false)
  xhr.addEventListener('load', loadHandler, false)
  xhr.open('POST', 'upload_processing.php')
  xhr.send(formSent)
} else {
  alert('Сначала выберите файл')
}
```

Для показа индикации загрузки файла создадим функцию `progressHandler()`. Функция будет вызываться при загрузке каждого нового пакета. Это позволит показывать и обновлять прогресс-бар в реальном времени. Посчитаем нужные данные: сколько мегабайт уже загружено, размер файла и процент загрузки. Воспользуемся полученными значениями, чтобы обновить текст на экране.

```javascript
function progressHandler(event) {
  const loadedMb = (event.loaded/BYTES_IN_MB).toFixed(1)
  const totalSizeMb = (event.total/BYTES_IN_MB).toFixed(1)
  const percentLoaded = Math.round((event.loaded / event.total) * 100)

  progressBar.value = percentLoaded
  sizeText.textContent = `${loadedMb} из ${totalSizeMb} МБ`
  statusText.textContent = `Загружено ${percentLoaded}% | `
}
```
