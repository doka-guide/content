---
title: "Загрузка файла с прогресс-баром"
description: "Создадим несложный вариант передачи файлов на сервер с индикацией процесса загрузки."
authors:
  - webdb81
keywords:
  - загрузка файла
  - ajax
  - индикация загрузки
  - progress bar
tags:
  - doka
---

## Задача

Загрузка пользователем файлов на сервер — часто встречающаяся задача при создании сайтов и приложений. Если файлы большие, то хорошей практикой будет показывать пользователю прогресс и результат загрузки файла. Для этого можно использовать прогресс-бар.

Реализовать полный процесс загрузки файла возможно только с использованием серверной части. Поэтому в статье будет рассмотрена организация отправки файла на стороне клиента: HTML-разметка, стилизация элементов и JS-код для передачи файла на сервер.

Загрузка файла на сервер состоит из трёх частей:

1. Выбор пользователем файла на своём устройстве.
1. Проверка параметров обработки файла и формирование данных с обращением к серверу.
1. Обработка данных на сервере и отправка ответа.

Подробнее про обработку файлов на стороне сервера с использованием языка программирования PHP можно узнать [в разделе документации PHP](https://www.php.net/manual/ru/features.file-upload.php).

## Решение для загрузки файла

На странице разместим HTML-разметку формы с необходимыми элементами:

```html
<div class="demo-wrapper">
  <h2>Загрузка изображения с индикацией процесса</h2>
  <form id="uploadForm" method="post" enctype="multipart/form-data" class="form-upload">
    <input type="file" name="file_name" id="uploadForm_File" accept="image/*">
    <input type="submit" id="uploadForm_Submit" class="form-upload__submit" value="Загрузить файл">
    <progress id="progressBar" value="0" max="100"></progress>
    <div id="uploadForm_Status" class="form-upload__status"></div>
    <p id="uploadForm_Size"></p>
  </form>
</div>
```

Для внешнего оформления элементов формы создадим следующие [CSS-правила](/css/css-rule/):

```css
.form-upload {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
}

#uploadForm_File {
  margin-bottom: 12px;
  cursor: pointer;
}

.form-upload__submit {
  display: inline-flex;
  align-self: flex-start;
  margin-bottom: 16px;
  padding: 4px 8px;
  cursor: pointer;
}

progress {
  width: 100%;
  height: 16px;
  margin-bottom: 8px;
  border: none;
  border-radius: 8px;
  background-color: #f3f3f3;
}

progress::-webkit-progress-bar {
  border: none;
  border-radius: 8px;
  background-color: #f3f3f3;
}

progress::-webkit-progress-value {
  border-radius: 8px;
  background-color: #27ae60;
}

progress::-moz-progress-bar {
  border: none;
  border-radius: 8px;
  background-color: #27ae60;
}

.form-upload__status {
  margin-bottom: 16px;
  font-weight: bold;
}
```

В конце HTML-страницы или в отдельном JS-файле добавим код, который обеспечит связь между пользователем и сервером:

```javascript
document.getElementById('uploadForm_File').addEventListener('change', function () {
  let fileCheckAmount = this.files[0]
  if (fileCheckAmount.size > 5242880) {
    alert('Принимается файл до 5 МБ')
    this.value = null
  }
});

document.getElementById('uploadForm_Submit').addEventListener('click', function uploadFile(event) {
  let fileFormField = document.getElementById('uploadForm_File')
  let fileToLoad = fileFormField.files[0]
  let formSent = new FormData()
  let xhr = new XMLHttpRequest()

  if (fileFormField.files.length > 0) {
    formSent.append('uploadForm_File', fileToLoad)

    xhr.upload.addEventListener('progress', progressHandler, false)
    xhr.addEventListener('load', loadHandler, false)
    xhr.open('POST', 'upload_processing.php')
    xhr.send(formSent)
  } else {
    alert('Сначала выберите файл')
  }
  event.preventDefault()
  return false
});

function progressHandler(event) {
  let percentLoading = (event.loaded / event.total) * 100

  document.getElementById('uploadForm_Size').innerHTML = "Загружено " + (event.loaded/1048576).toFixed(1) + " МБ из " + (event.total/1048576).toFixed(1) + " МБ"
  document.getElementById('progressBar').value = Math.round(percentLoading)
  document.getElementById('uploadForm_Status').textContent = Math.round(percentLoading) + '% загружено...'
}

function loadHandler(event) {
  document.getElementById('uploadForm_Status').innerHTML = event.target.textContent
  document.getElementById('progressBar').value = 0
}
```

<iframe title="Пример загрузки одного файла" src="demos/single-file/" height="450"></iframe>

Полный вариант загрузки файла с его сохранением на сервере выглядит так:

<video controls width="640">
  <source src="video/progress_example.mp4" type="video/mp4">
</video>

## Разбор решения

### Разметка

```html
<form id="uploadForm" class="form-upload" method="post" enctype="multipart/form-data">
  <input type="file" name="file_name" id="uploadForm_File" accept="image/*">
  <input type="submit" id="uploadForm_Submit" class="form-upload__submit" value="Загрузить файл">
  <progress id="progressBar" value="0" max="100"></progress>
  <div id="uploadForm_Status" class="form-upload__status"></div>
  <p id="uploadForm_Size"></p>
</form>
```

Все элементы, которые участвуют в обработке и отправке файла, размещаются внутри [формы](/html/form/).

Для формы указывается атрибут `enctype` со значением `multipart/form-data`, поскольку будет использоваться элемент управления для выбора файлов.

Файл для отправки пользователь сможет выбрать с помощью элемента [`<input>`](/html/input/), для которого установлен тип `file`. Формат файлов, которые можно будет загрузить, устанавливается значением атрибута `accept`. В данном случае допускается использование изображений любого формата.

Отправка файла на сервер выполняется после нажатия кнопки «Загрузить файл». Для этого в JS-коде создаётся функция `uploadFile()`, которая будет выполнять обработку выбранного файла и его передачу на сервер.

Ход выполнения загрузки будет показываться с использованием специального элемента [`<progress>`](/html/progress/).

Чтобы показать текстовую информацию о результатах загрузки, используются текстовые элементы [`<p>`](/html/p/).

Для каждого элемента внутри формы указывается атрибут [`id`](/html/global-attrs/#id/) — это позволит JS-коду обращаться к нужным элементам для выполнения необходимых действий.

### Стили

Внешний вид элемента [`<progress>`](/html/progress/) может быть разным — это зависит от браузера и операционной системы устройства пользователя. Например, вот так прогресс-бар будет выглядеть на устройствах с macOS и Windows:

![Внешний вид прогресс-бара в macOS и Windows](images/default_progressbar.webp)

Для того, чтобы прогресс-бар выглядел одинаково в разных браузерах, необходимо создать стилевые правила. Правило ниже определяет следующие свойства индикатора:

- устанавливает ширину на весь родительский контейнер;
- добавляет нижний отступ;
- убирает границу по умолчанию;
- меняет цвет фона;
- задаёт скругление по краям.

```css
progress {
  width: 100%;
  height: 16px;
  margin-bottom: 8px;
  border: none;
  border-radius: 8px;
  background-color: #f3f3f3;
}
```

В Firefox эти стили не затронут бегунок, поэтому дополнительно потребуется использовать [вендорный префикс](/css/vendor-prefixes/) `-moz`. Для стилизации в Chrome и Safari как самого элемента, так и его бегунка, необходимо использовать браузерные префиксы `-webkit`.

В итоге, для одинакового отображения прогресс-бара и бегунка во всех основных браузерах, добавим следующие правила:

```css
progress::-webkit-progress-bar {
  border: none;
  border-radius: 8px;
  background-color: #f3f3f3;
}

progress::-webkit-progress-value {
  border-radius: 8px;
  background-color: #27ae60;
}

progress::-moz-progress-bar {
  border: none;
  border-radius: 8px;
  background-color: #27ae60;
}
```

Остальным элементам определим стили для организации их взаимного расположения:

```css
.form-upload {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
}

#uploadForm_File {
  margin-bottom: 12px;
  cursor: pointer;
}

.form-upload__submit {
  display: inline-flex;
  align-self: flex-start;
  margin-bottom: 16px;
  padding: 4px 8px;
  cursor: pointer;
}

.form-upload__status {
  margin-bottom: 16px;
  font-weight: bold;
}
```

### JavaScript

Чтобы отправить файл на сервер без перезагрузки страницы воспользуется `XMLHttpRequest` — набором механизмов для обмена данными между клиентом и сервером без перезагрузки. Более подробно о нём можно почитать на [странице документации MDN](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest).

Загрузка файлов большого размера увеличивает нагрузку на сервер, поэтому установим максимальный размер файла в 5 МБ. Проверку размера файла выполним на этапе его выбора пользователем:

```javascript
document.getElementById('uploadForm_File').addEventListener('change', function () {
  let fileCheckAmount = this.files[0]
  if (fileCheckAmount.size > 5242880) {
    alert('Принимается файл до 5 МБ')
    this.value = null
  }
})
```

Основную работу будет выполнять функция `uploadFile()`, которая принимает выбранный пользователем файл и отправляет его на сервер. Функция выполняется после нажатия кнопки «Загрузить файл».

Первым делом объявляем переменные:

- `fileFormField` обращается к элементу формы, который будет получать файл;
- `fileToLoad` получает данные выбранного файла;
- `formSent`, в которой с использованием объекта `FormData()` будут храниться данные формы для отправки;
- `xhr` для обращения к серверу с использованием `XMLHttpRequest`.

```javascript
let fileFormField = document.getElementById('uploadForm_File')
let fileToLoad = fileFormField.files[0]
let formSent = new FormData()
let xhr = new XMLHttpRequest()
```

После этого указываем последовательность работы `XMLHttpRequest` при передаче файла на сервер:

- если файл выбран — выполняется его обработка, иначе появляется предупреждение;
- выбранный файл сохраняется для отправки;
- обработчик события `progress` выполняет отслеживание состояния загрузки файла;
- добавляется обработчик события `load` для отслеживания статуса загрузки;
- метод `open()` выполняет POST-запрос к управляющему файлу, который хранится на сервере;
- выбранный пользователем файл передаётся на сервер с использованием `FormData()`.

```javascript
if (fileFormField.files.length > 0) {
  formSent.append('uploadForm_File', fileToLoad)

  xhr.upload.addEventListener('progress', progressHandler, false)
  xhr.addEventListener('load', loadHandler, false)
  xhr.open('POST', 'upload_processing.php')
  xhr.send(formSent)
} else {
  alert('Сначала выберите файл')
}
```

Для показа индикации загрузки файла создадим функцию `progressHandler()`. Переменная `percentLoading` получает данные о процессе загрузки файла и передаёт их прогресс-бару для показа в реальном времени. Также данные этой переменной используются для показа в текстовых элементах размера загруженного файла.

Округление значений загруженного объёма данных выполняется с использованием метода `Math.round()`.

```javascript
function progressHandler(event) {
  let percentLoading = (event.loaded / event.total) * 100

  document.getElementById('uploadForm_Size').innerHTML = "Загружено " + (event.loaded/1048576).toFixed(1) + " МБ из " + (event.total/1048576).toFixed(1) + " МБ"
  document.getElementById('progressBar').value = Math.round(percentLoading)
  document.getElementById('uploadForm_Status').innerHTML = Math.round(percentLoading) + '% загружено...'
}
```
