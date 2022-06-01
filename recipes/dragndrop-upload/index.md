---
title: "Драг-н-дроп для загрузки файлов"
description: "Будем загружать файлы простым перетаскиванием без кликов."
authors:
  - webdb81
keywords:
  - drag and drop
  - загрузка файла
  - ajax
tags:
  - doka
---

## Задача

Загрузка пользователем файлов на сервер — часто встречающаяся задача при создании сайтов и приложений. Текущие возможности JavaScript позволяют нам выбирать нужный файл простым его перетаскиванием в установленную область страницы браузера.

Широкую поддержку событий перетаскивания обеспечивают современные десктопные браузеры, среди мобильных браузеров такая поддержка пока низкая. Поэтому, если необходимо реализовать передачу файла на сервер также и для пользователей мобильных устройств, стоит добавлять возможность выбрать файл с использованием элемента `<input type="file">`.

В статье будет рассматриваться вариант выбора файла с использованием перетаскивания.

Загрузка файла на сервер состоит из трёх частей:

1. Выбор пользователем файла на своём устройстве.
1. Проверка параметров обработки файла и формирование данных с обращением к серверу.
1. Обработка данных на сервере и отправка ответа клиенту.

Организовать полный процесс загрузки файла возможно только с использованием серверной части, реализация которой выходит за рамки данной статьи. Поэтому далее будет рассмотрена организация отправки файла на стороне клиента: HTML-разметка, стилизация элементов и JS-код для передачи файла на сервер.

Сама же серверная часть для обмена файлами может быть реализована на разных языках программирования. Например, про обработку файлов на стороне сервера с использованием PHP можно подробнее узнать [в разделе документации PHP](https://www.php.net/manual/ru/features.file-upload.php).

## Решение для загрузки файла

На странице разместим HTML-разметку с необходимыми элементами:

```html
<div class="demo-wrapper">
  <p>Для загрузки изображения, перетащите его в выделенную область:</p>
  <div id="dropFile_Zone" class="upload-zone">
    <div id="uploadFile_Loader" class="upload-loader">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="upload-loader__image"><path fill="#fff" d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"/></path></svg>
    </div>
    <p id="uploadFile_Status"></p>
  </div>
</div>
```

Для внешнего оформления элементов создадим следующие [CSS-правила](/css/css-rule/):

```css
p {
  margin-top: 0;
  margin-bottom: 12px;
  text-align: center;
}

.upload-zone {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
  padding: 20px;
  border: 2px solid #ffffff;
  border-radius: 16px;
  overflow: hidden;
}

.upload-loader {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.upload-loader_visible {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5a57a6;
}

.upload-loader__image {
  width: 150px;
  height: 150px;
}
```

В конце HTML-страницы или в отдельном JS-файле добавим код, который обеспечит связь между пользователем и сервером:

```javascript
const BYTES_IN_MB = 1048576

const dropFileZone = document.getElementById('dropFile_Zone')
const outputText = document.getElementById('uploadFile_Status')
const loaderImage = document.getElementById('uploadFile_Loader')
let fileInstance

['dragover', 'drop'].forEach(function(event) {
  document.addEventListener(event, function(evt) {
    evt.preventDefault()
    return false
  })
})

dropFileZone.addEventListener('drop', function uploadFile(event) {
  fileInstance = event.dataTransfer.files[0]
  if (fileInstance.size > 5 * BYTES_IN_MB) {
    alert('Принимается файл до 5 МБ')
    return false
  }
  if (fileInstance.type.startsWith('image/')) {
    processingUploadFile(fileInstance)
  } else {
    alert('Можно загружать только изображения')
    return false
  }
})

function processingUploadFile(fileInstance_Upload) {
  if(fileInstance_Upload != undefined) {
    const dropZone_Data = new FormData()
    const xhr = new XMLHttpRequest()

    dropZone_Data.append('file', fileInstance_Upload)

    xhr.upload.addEventListener('progress', function() {
      loaderImage.classList.add('upload-loader_visible')
    })

    xhr.open('POST', 'upload_processing.php', true)

    xhr.send(dropZone_Data)

    xhr.onload = function (event){
      if (xhr.status == 200) {
        loaderImage.classList.remove('upload-loader_visible')
        outputText.textContent = `Файл «${fileInstance_Upload.name}» загружен успешно`
      } else {
        loaderImage.classList.remove('upload-loader_visible')
        outputText.textContent = `Файл не загружен. Ошибка ${xhr.status} при загрузке файла.`
      }
    }
  }
}
```

<iframe title="Пример загрузки файла перетаскиванием" src="demos/dragndrop-demo/" height="330"></iframe>

Полный вариант загрузки файла с его сохранением на сервере выглядит так:

<video controls width="640">
  <source src="video/dragndrop_upload_example.mp4" type="video/mp4">
</video>

## Разбор решения

### Разметка

Для обработки файла используется контейнер с идентификатором `dropFile_Zone`. Внутри этого блока помещаются вспомогательные элементы, которые обеспечивают информационное взаимодействие с пользователем:

- анимированный [`svg-элемент`](/html/svg/) в качестве индикатора обработки файла;
- текстовый элемент с идентификатором `uploadFile_Status`, который покажет информацию о результате загрузки.

Для каждого элемента, который участвует в процессе обработки файла, указывается атрибут [`id`](/html/global-attrs/#id) — это позволит JS-коду обращаться к нужным элементам для выполнения необходимых действий.

```html
<div class="demo-wrapper">
  <p>Для загрузки изображения, перетащите его в выделенную область:</p>
  <div id="dropFile_Zone" class="upload-zone">
    <div id="uploadFile_Loader" class="upload-loader">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="upload-loader__image"><path fill="#fff" d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"/></path></svg>
    </div>
    <p id="uploadFile_Status"></p>
  </div>
</div>
```

Для показа процесса выполнения загрузки файла также можно использовать специальный элемент [`<progress>`](/html/progress/) — этот вариант подробно рассмотрен в рецепте [«Загрузка файла с прогресс-баром»](/recipes/progress/).

### Стили

Область для загрузки файла выделим рамкой со скруглёнными углами и укажем фиксированную высоту:

```css
.upload-zone {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
  padding: 20px;
  border: 2px solid #ffffff;
  border-radius: 16px;
  overflow: hidden;
}
```

Контейнер с индикатором обработки файла изначально скрыт и с абсолютным позиционированием занимает весь родительский блок:

```css
.upload-loader {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

После появления файла в области загрузки и до конца его обработки, индикатор будет показываться с использованием дополнительного класса:

```css
.upload-loader_visible {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5a57a6;
}

.upload-loader__image {
  width: 150px;
  height: 150px;
}
```

### JavaScript

Для начала объявим переменные и получим все необходимые элементы DOM-дерева, чтобы подписываться на события:

- переменная `BYTES_IN_MB`, в которой указывается количество байтов в одном мегабайте, будет использоваться при вычислении размера файла;
- `dropFileZone` устанавливает область обработки выбранного файла;
- в переменной `outputText` указывается элемент, в котором будет показан полученный от сервера ответ;
- переменная `loaderImage` определяет графический элемент индикатора обработки файла;
- в переменной `fileInstance` будут храниться данные выбранного файла.

```javascript
const BYTES_IN_MB = 1048576

const dropFileZone = document.getElementById('dropFile_Zone')
const outputText = document.getElementById('uploadFile_Status')
const loaderImage = document.getElementById('uploadFile_Loader')
let fileInstance
```

Поскольку переменная `fileInstance` объявляется без присвоения значения, используется ключевое слово `let`. Об отличиях переменных и принципах работы с ними более развёрнуто рассказывается [в нашей статье «Переменные const, let и var»](/js/var-let/).

При отслеживании перетаскивания файла будут использоваться следующие события:

- `dragover` выполняется во время перемещения файла;
- `drop` выполняется в тот момент, когда пользователь отпустил кнопку мыши и выбранный файл был помещён («сброшен») в заданную область.

Когда при перетаскивании выбранный файл будет находиться в пределах активной страницы, браузер его откроет. Чтобы файл был обработан в назначенной для этого области, необходимо отменить стандартное поведение браузера для событий `dragover` и `drop` путём вызова метода `preventDefault()`:

```javascript
['dragover', 'drop'].forEach(function(event) {
  document.addEventListener(event, function(evt) {
    evt.preventDefault()
    return false
  })
})
```

Загрузка файлов большого размера увеличивает нагрузку на сервер, поэтому установим максимальный размер файла в 5 МБ. Проверку размера файла выполним на этапе его помещения в область загрузки. Для этого получим информацию о файле с помощью объекта `dataTransfer`, который хранит данные о событии перетаскивания. Также зададим условие, что загружать можно будет только изображения.

```javascript
dropFileZone.addEventListener('drop', function uploadFile(event) {
  fileInstance = event.dataTransfer.files[0]
  if (fileInstance.size > 5 * BYTES_IN_MB) {
    alert('Принимается файл до 5 МБ')
    return false
  }
  if (fileInstance.type.startsWith('image/')) {
    processingUploadFile(fileInstance)
  } else {
    alert('Можно загружать только изображения')
    return false
  }
})
```

Чтобы отправить файл на сервер без перезагрузки страницы, воспользуемся `XMLHttpRequest` — набором механизмов для обмена данными между клиентом и сервером без перезагрузки страницы. Подробней о нём можно почитать на [странице документации MDN](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest).

Основную работу будет выполнять функция `processingUploadFile()`, которая принимает выбранный пользователем файл `fileInstance_Upload` и отправляет его на сервер:

```javascript
function processingUploadFile(fileInstance_Upload) {
  if(fileInstance_Upload != undefined) {
    // код функции рассматривается ниже
  }
}
```

Первым делом объявляем переменные:

- `dropZone_Data`, в которой с использованием объекта `FormData` будут храниться данные для отправки на сервер;
- `xhr` для обращения к серверу с использованием `XMLHttpRequest`.

```javascript
const dropZone_Data = new FormData()
const xhr = new XMLHttpRequest()
```

После этого указываем последовательность работы `XMLHttpRequest` при передаче файла на сервер:

1. Выбранный файл сохраняется для отправки.
1. Для `XMLHttpRequest` добавляется обработчик события `progress`, который отслеживает процесс загрузки файла. Чтобы показать скрытый графический элемент индикатора загрузки, ему добавляется класс `upload-loader_visible`.
1. Метод `open()` выполняет POST-запрос к управляющему файлу, который хранится на сервере.
1. Выбранный пользователем файл передаётся на сервер.
1. Для `XMLHttpRequest` выполняется обработка события загрузки файла:
    - если файл сохранён на сервере, индикатор загрузки скрывается и пользователю показывается сообщение об успешной загрузке файла;
    - если файл не принят сервером, индикатор загрузки скрывается и пользователю показывается сообщение об ошибке.

```javascript
dropZone_Data.append('file', fileInstance_Upload)

xhr.upload.addEventListener('progress', function() {
  loaderImage.classList.add('upload-loader_visible')
})

xhr.open('POST', 'upload_processing.php', true)

xhr.send(dropZone_Data)

xhr.onload = function (event){
  if (xhr.status == 200) {
    loaderImage.classList.remove('upload-loader_visible')
    outputText.textContent = `Файл «${fileInstance_Upload.name}» загружен успешно`
  } else {
    loaderImage.classList.remove('upload-loader_visible')
    outputText.textContent = `Файл не загружен. Ошибка ${xhr.status} при загрузке файла.`
  }
}
```
