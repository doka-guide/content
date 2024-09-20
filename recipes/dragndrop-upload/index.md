---
title: "Драг-н-дроп для загрузки файлов"
description: "Будем загружать файлы простым перетаскиванием без кликов."
authors:
  - webdb81
contributors:
  - skorobaeus
keywords:
  - drag and drop
  - загрузка файла
  - ajax
tags:
  - article
---

## Задача

Загрузка пользователем файлов на сервер — часто встречающаяся задача при создании сайтов и приложений. Текущие возможности JavaScript позволяют нам выбирать нужный файл простым его перетаскиванием в установленную область страницы браузера.

Широкую поддержку событий перетаскивания обеспечивают современные десктопные браузеры, среди мобильных браузеров такая поддержка пока низкая. Поэтому, если необходимо реализовать передачу файла на сервер также и для пользователей мобильных устройств, стоит добавлять возможность выбрать файл с использованием элемента [`<input type="file">`](/html/input/).

В статье будет рассматриваться вариант выбора файла с использованием перетаскивания.

Загрузка файла на сервер состоит из трёх частей:

1. Выбор пользователем файла на своём устройстве.
1. Проверка параметров обработки файла и формирование данных с обращением к серверу.
1. Обработка данных на сервере и отправка ответа клиенту.

Организовать полный процесс загрузки файла возможно только с использованием серверной части, реализация которой выходит за рамки данной статьи. Поэтому далее будет рассмотрена организация отправки файла на стороне клиента: HTML-разметка, стилизация элементов и JavaScript-код для передачи файла на сервер.

Сама же серверная часть для обмена файлами может быть реализована на разных языках программирования. Например, про обработку файлов на стороне сервера с использованием PHP можно подробнее узнать в [документации PHP](https://www.php.net/manual/ru/features.file-upload.php).

## Решение для загрузки файла

На странице разместим HTML-разметку с необходимыми элементами:

```html
<div id="uploadFile_Loader" class="upload-zone">
  <form class="form-upload" id="uploadForm" method="post" enctype="multipart/form-data">
    <div class="upload-zone_dragover">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" class="upload-loader__image">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9"/>
        <path d="m16 16-4-4-4 4"/>
      </svg>
      <p>Перетащи файл сюда</p>
      <span class="form-upload__hint" id="hint">Можно загружать только картинки</span>
    </div>
    <label class="form-upload__label" for="uploadForm_file">
      <span class="form-upload__title">Или нажми кнопку</span>
      <input class="form-upload__input" id="uploadForm_File" type="file" name="file_name" accept="image/*" aria-describedby="hint">
    </label>
    <div class="form-upload__container">
      <span class="form-upload__hint" id="uploadForm_Hint"></span>
    </div>
  </form>
</div>
```

Для внешнего оформления элементов создадим следующие [CSS-правила](/css/css-rule/):

```css
.form-upload {
  display: grid;
  align-items: center;
  width: 80vw;
  min-width: 360px;
}

.upload-zone_dragover {
  display: grid;
  height: 50vh;
  min-height: 360px;
  margin-bottom: 25px;
  border: 1px solid currentColor;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 18px;
  place-content: center;
  text-align: center;
}

.upload-zone_dragover svg {
  width: 10vw;
  margin: auto;
  pointer-events: none;
}

.form-upload__hint {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
}

.upload-zone_dragover._active {
  color: #c56fff;
  background-color: #c56fff77;
}

.form-upload__label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-upload__title {
  margin-right: 55px;
  font-size: 18px;
  font-weight: 500;
}

.form-upload__input {
  font-family: inherit;
  font-size: 18px;
}

.form-upload__input::file-selector-button {
  margin-right: 30px;
  border: none;
  border-radius: 6px;
  padding: 9px 15px;
  font-family: inherit;
  font-weight: inherit;
  transition: background-color 0.2s linear;
  cursor: pointer;
}

.form-upload__input::file-selector-button:hover {
  background-color: #c56fff;
}

.form-upload__container {
  width: 360px;
  margin-top: 10px;
  font-size: 16px;
}

.upload-zone_dragover {
  background-color: #593273;
}

.upload-hint,
.upload-status {
  width: 75%;
}

.upload-hint {
  display: none;
}

.upload-hint_visible {
  display: block;
  pointer-events: none;
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
  background-color: #593273;
}

.upload-loader__image {
  width: 150px;
  height: 150px;
}

@media (max-width: 768px) {
  .upload-zone {
    padding: 55px 30px;
  }

  .form-upload__title {
    display: block;
    margin-right: 0;
  }

  .form-upload__input::file-selector-button {
    min-width: initial;
    margin-right: 10px;
  }
}
```

В конце HTML-страницы или в отдельном JavaScript-файле добавим код, который обеспечит связь между пользователем и сервером:

```javascript
const dropFileZone = document.querySelector(".upload-zone_dragover")
const statusText = document.getElementById("uploadForm_Hint")
const sizeText = document.getElementById("uploadForm_Size")
const uploadInput = document.querySelector(".form-upload__input")

let setStatus = (text) => {
  statusText.textContent = text
}

const uploadUrl = "/unicorns";

["dragover", "drop"].forEach(function(event) {
  document.addEventListener(event, function(evt) {
    evt.preventDefault()
    return false
  })
})

dropFileZone.addEventListener("dragenter", function() {
  dropFileZone.classList.add("_active")
})

dropFileZone.addEventListener("dragleave", function() {
  dropFileZone.classList.remove("_active")
})

dropFileZone.addEventListener("drop", function() {
  dropFileZone.classList.remove("_active")
  const file = event.dataTransfer?.files[0]
  if (!file) {
    return
  }

  if (file.type.startsWith("image/")) {
    uploadInput.files = event.dataTransfer.files
    processingUploadFile()
  } else {
    setStatus("Можно загружать только изображения")
    return false
  }
})

uploadInput.addEventListener("change", (event) => {
  const file = uploadInput.files?.[0]
  if (file && file.type.startsWith("image/")) {
    processingUploadFile()
  } else {
    setStatus("Можно загружать только изображения")
    return false
  }
})

function processingUploadFile(file) {
  if (file) {
    const dropZoneData = new FormData()
    const xhr = new XMLHttpRequest()

    dropZoneData.append("file", file)

    xhr.open("POST", uploadUrl, true)

    xhr.send(dropZoneData)

    xhr.onload = function () {
      if (xhr.status == 200) {
        setStatus("Всё загружено")
      } else {
        setStatus("Oшибка загрузки")
      }
      HTMLElement.style.display = "none"
    }
  }
}

function processingDownloadFileWithFetch() {
  fetch(url, {
    method: "POST",
  }).then(async (res) => {
    const reader = res?.body?.getReader();
    while (true && reader) {
      const { value, done } = await reader?.read()
      console.log("value", value)
      if (done) break
      console.log("Received", value)
    }
  })
}
```

<iframe title="Пример загрузки файла перетаскиванием" src="demos/dragndrop-demo/" height="600"></iframe>

Полный вариант загрузки файла с его сохранением на сервере выглядит так:

<video controls width="640">
  <source src="video/dragndrop-upload.mp4" type="video/mp4">
  <track
    label="Russian"
    kind="subtitles"
    srclang="ru"
    src="video/closed-captions.vtt">
</video>

## Разбор решения

### Разметка

Для обработки файла используется контейнер с идентификатором `upload-zone`. Внутри этого блока помещается форма [`<form>`](/html/form/) с элементами, которые обеспечивают информационное взаимодействие с пользователем. Например, с помощью изменения цвета фона этой области при перетаскивании элемента.

Для каждого элемента, который участвует в процессе обработки файла, указывается атрибут [`id`](/html/global-attrs/#id) — это позволит JavaScript-коду обращаться к нужным элементам для выполнения необходимых действий.

```html
<div id="uploadFile_Loader" class="upload-zone">
  <form class="form-upload" id="uploadForm" method="post" enctype="multipart/form-data">
    <div class="upload-zone_dragover">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" class="upload-loader__image">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9"/>
        <path d="m16 16-4-4-4 4"/>
      </svg>
      <p>Перетащи файл сюда</p>
      <span class="form-upload__hint" id="hint">Можно загружать только картинки</span>
    </div>
    <label class="form-upload__label" for="uploadForm_file">
      <span class="form-upload__title">Или нажми кнопку</span>
      <input class="form-upload__input" id="uploadForm_File" type="file" name="file_name" accept="image/*" aria-describedby="hint">
    </label>
    <div class="form-upload__container">
      <span class="form-upload__hint" id="uploadForm_Hint"></span>
    </div>
  </form>
</div>
```

Кроме самой области для перетаскивания файла используем специальное поле для его загрузки `<input type="file" accept="image/*">`. Так добавим альтернативный способ загрузки для тех пользователей, которые не пользуются мышкой, и заодно выполним один из критериев [WCAG](/a11y/wcag/).

Поле свяжем с подсказкой о том, что можно загружать только картинки, при помощи [`aria-describedby`](/a11y/aria-describedby/). Этот атрибут программно связывает подсказку с полем и полезен для пользователей [скринридеров](/a11y/screenreaders/).

Для отображения загрузки файла также можно использовать специальный элемент [`<progress>`](/html/progress/) — этот вариант подробно рассмотрен в рецепте «[Загрузка файла с прогресс-баром](/recipes/progress/)». В этот тег уже встроена роль [`progressbar`](/a11y/role-progressbar/), благодаря которой скринридеры объявляют прогресс загрузки автоматически.

### Стили

Стилизуем область для загрузки файла. Зададим ей минимальную высоту, рамку, выровняем элементы по центру.

```css
.upload-zone_dragover {
  display: grid;
  height: 50vh;
  min-height: 360px;
  margin-bottom: 25px;
  border: 1px solid currentColor;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 18px;
  place-content: center;
  text-align: center;
}
```

При перетаскивании файла в область загрузки будем менять фоновый цвет при помощи дополнительного класса:

```css
.upload-zone_dragover {
  background-color: #593273;
}
```

### JavaScript

Для начала объявим переменные и получим все необходимые элементы DOM-дерева, чтобы подписываться на события:

- `dropFileZone` устанавливает область обработки выбранного файла;
- `statusText` указывает на подсказку о загрузке файла;
- `setStatus` нужна для хранения текста статуса;
- `uploadInput` устанавливает область кнопки для загрузки файла без перетаскивания.

```javascript
const dropFileZone = document.querySelector(".upload-zone_dragover")
const statusText = document.getElementById("uploadForm_Hint")
const uploadInput = document.querySelector(".form-upload__input")

let setStatus = (text) => {
  statusText.textContent = text
}

const uploadUrl = "/unicorns"
```

Поскольку переменная `setStatus` объявляется без присвоения значения, используется ключевое слово `let`. Об отличиях переменных и принципах работы с ними более развёрнуто рассказывается в статье «[Переменные `const`, `let` и `var`](/js/var-let/)».

При отслеживании перетаскивания файла будут использоваться следующие события:

- `dragover` выполняется во время перемещения файла над областью обработки файла;
- `dragenter` срабатывает, когда файл входит в область обработки файла;
- `dragleave` срабатывает, если файл покидает область обработки, но ещё не «сброшен»;
- `drop` выполняется в тот момент, когда пользователь отпустил кнопку мыши и выбранный файл был помещён («сброшен») в заданную область.

Когда при перетаскивании выбранный файл будет находиться в пределах активной страницы, браузер его откроет. Чтобы файл был обработан в назначенной для этого области, необходимо отменить стандартное поведение браузера для событий `dragover` и `drop` путём вызова метода `preventDefault()`:

```javascript
["dragover", "drop"].forEach(function(event) {
  document.addEventListener(event, function(evt) {
    evt.preventDefault()
    return false
  })
})

dropFileZone.addEventListener("dragenter", function() {
  dropFileZone.classList.add("_active")
})

dropFileZone.addEventListener("dragleave", function() {
  dropFileZone.classList.remove("_active")
})
```

Чтобы отправить файл на сервер без перезагрузки страницы, воспользуемся `XMLHttpRequest` — набором механизмов для обмена данными между клиентом и сервером без перезагрузки страницы. Подробней о нём можно почитать на [MDN](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest).

Основную работу будет выполнять функция `processingUploadFile()`, которая принимает выбранный пользователем файл `fileInstanceUpload` и отправляет его на сервер:

```javascript
function processingUploadFile(file) {
  // Код функции рассматривается ниже
}
```

Первым делом объявляем переменные:

- `dropZoneData`, в которой с использованием объекта `FormData` будут храниться данные для отправки на сервер;
- `xhr` для обращения к серверу с использованием `XMLHttpRequest`.

```javascript
const dropZoneData = new FormData()
const xhr = new XMLHttpRequest()
```

После этого указываем последовательность работы `XMLHttpRequest` при передаче файла на сервер:

1. Выбранный файл сохраняется для отправки.
1. Для `XMLHttpRequest` добавляется обработчик события `progress`, который отслеживает процесс загрузки файла. Чтобы показать скрытый графический элемент индикатора загрузки, ему добавляется класс `upload-loader_visible`, а подсказка о загрузке скрывается через удаление класса `upload-hint_visible`.
1. Метод `open()` выполняет POST-запрос к управляющему файлу, который хранится на сервере.
1. Выбранный пользователем файл передаётся на сервер.
1. Для `XMLHttpRequest` выполняется обработка события загрузки файла.

Если файл сохранён на сервере, индикатор загрузки скрывается и пользователю показывается сообщение об успешной загрузке файла. Если файл не принят сервером, индикатор загрузки скрывается и пользователю показывается сообщение об ошибке.

```javascript
dropZoneData.append("file", file)

xhr.open("POST", uploadUrl, true)

xhr.send(dropZoneData)

xhr.onload = function () {
  if (xhr.status == 200) {
    setStatus("Всё загружено")
  } else {
    setStatus("Oшибка загрузки")
  }
  HTMLElement.style.display = "none"
}
```

<iframe title="Загрузка файла перетаскиванием" src="demos/dragndrop-demo/" height="600"></iframe>
