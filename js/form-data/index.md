---
title: "`FormData`"
description: "Специальная коллекция данных `[ключ, значение]` для отправки на сервер"
authors:
  - vitalybaev
tags:
  - doka
---

## Кратко

`FormData` — это специальная коллекция данных, которая позволяет передавать данные в виде пар `[ключ, значение]` на сервер при помощи [`fetch()`](/js/fetch/) или `XMLHttpRequest`. При этом используется точно такой же формат данных, какой использует тег [`<form>`](/html/form/) с типом кодирования `"multipart/form-data"`.

Основные методы для работы с `FormData`:

- `append(ключ, значение)` — добавляет значение для ключа с сохранением предыдущих значений;
- `set(ключ, значение)` — устанавливает значение для ключа, перезаписывая предыдущие значения;
- `get(ключ)` — возвращает значение;
- `getAll(ключ)` — возвращает значение;
- `has(ключ)` — проверяет наличие переданного ключа;
- `values()` — возвращает [итератор](/js/iterator/) всех значений коллекции;
- `keys()` — возвращает [итератор](/js/iterator/) всех ключей коллекции;
- `entries()` — возвращает [итератор](/js/iterator/) пар `[ключ, значение]`;
- `delete(ключ)` — удаляет конкретное значение;

## Как пишется

Предположим, что мы пишем функцию, которая отправляет на сервер два поля `name` и `email`, которые она получает через аргументы:

```javascript
async function sendData(name, email) {
  // Создаем объект FormData
  const data = new FormData()

  // Добавляем значение переменной name в объект FormData под ключом "name"
  data.append("name", name)

  // Аналогично добавляем значение переменной email
  data.append("email", email)

  return await fetch('/api/subscribe/', {
    method: "POST",
    // Для корректной работы необходимо задать заголовок `Content-Type` в "multipart/form-data"
    headers: { "Content-Type": "multipart/form-data" },
    body: data,
  })
}
```

## Как понять

`FormData` ведёт себя как обычная HTML-форма, поэтому пример выше можно представить следующим образом без JavaScript:

```html
<form method="post" action="/api/subscribe/" enctype="multipart/form-data">
  <input type="text" name="name" value="" />
  <input type="email" name="email" value="" />
  <button type="submit">Отправить</button>
</form>
```

`FormData` просто даёт нам возможность использовать такой способ отправки информации на сервер программно. В отличие от другого популярного способа кодирования данных `"application/json"`, в котором данные представляют собой обычный JSON, `FormData` не может иметь вложенных данных.

### Создание `FormData`

Создать новый объект `FormData` можно с помощью конструктора:

```javascript
// В переменной data будет храниться пустой объект FormData
const data = new FormData()
```

Также, конструктор может принимать в качестве аргумента DOM-элемент формы, в этом случае `FormData` запишет текущие значения полей формы:

```html
<form id="user-form">
  <input type="text" name="name" value="Аня" />
  <input type="text" name="language" value="JavaScript" />
</form>
```

```javascript
const form = document.querySelector("#user-form")

const data = new FormData(form)

for (let [key, value] of data) {
  console.log(`${key} - ${value}`)
}
// "name - Аня"
// "language - JavaScript"
```

### Работа с коллекцией

Для добавления данных в коллекцию, есть метод `append()`:

```javascript
const data = new FormData()

data.append("name", "Вася")
```

Теперь в коллекции появилось одно значение с ключом `name` и значением _"Вася"_.

<aside>

☝️ `FormData` можно хранить несколько значений для одного ключа! Метод `append()`, вызванный для ключа, по которому уже есть значение, добавит для этого ключа новые данные, не удаляя старые.

</aside>

```javascript
const data = new FormData()

data.append("name", "Вася")
data.append("name", "Лена")
// Теперь в коллекции два значения ("Вася" и "Лена") для одного ключа `name`
```

`FormData` поддерживает ещё один метод для записи данных: `set()`. В отличие от `append()`, он перезапишет старые данные для переданного ключа, если они были:

```javascript
const data = new FormData()

data.set("name", "Вася")
data.set("name", "Лена")
// В коллекции у ключа `name` одно значения "Лена", потому что его записали позднее и оно удалило старые значения
```

<aside>

☝️ `FormData` может хранить только строки или файлы в качестве значений. Поэтому все данные других типов будут [преобразованы](/js/typecasting/) в строку!

</aside>

```javascript
const data = new FormData()

// Записываем число 30
data.append("age", 30)
// Однако при попытке прочитать значение видим тип string
console.log(data.get("age") === 30);
// false
console.log(data.get("age") === "30");
// true
console.log(typeof data.get("age"));
// "string"
```

Для получения записанных значений есть два метода: `get()` и `getAll()`. `get()` вернёт _первое_ значение для ключа или `null`, если для указанного ключа значений не было:

```javascript
const data = new FormData()

console.log(data.get("name"))
// null

data.append("name", "Вася")
data.append("name", "Лена")
console.log(data.get("name"))
// "Вася"
```

В примере выше второе значение _"Лена"_ при помощи метода `get()` недоступно, потому что он всегда возвращает только первое значение. Поэтому, чтобы получить все значения, на помощь приходит `getAll()`. Он всегда возвращает массив значений для указанного ключа. Если значений не было, возвращаемый массив будет пустой:

```javascript
const data = new FormData()

console.log(data.getAll("name"))
// []

data.append("name", "Вася")
data.append("name", "Лена")
console.log(data.getAll("name"))
// ["Вася", "Лена"]
```

Чтобы проверить, есть ли в коллекции данные для определенного ключа, есть метод `has()`, он вернёт _true_ или _false_:

```javascript
const data = new FormData()

console.log(data.has("name"))
// false
data.append("name", "Вася")
console.log(data.has("name"))
// true
```

Для удаления значений для определенного ключа можно воспользоваться методом `delete()`. Важно помнить, что если у указанного ключа несколько значений, то удалятся все значения:

```javascript
const data = new FormData()

data.append("name", "Вася")
data.append("name", "Лена")

data.delete("name")
// Теперь коллекция снова пустая, потому что перед удалением было два значения, но в одном ключе
```

### Обход значений

`FormData` предоставляет встроенный [итератор](/js/iterator/) для обхода значений:

```javascript
const data = new FormData()

data.append("name", "Вася")
data.append("name", "Лена")
data.append("language", "JavaScript")

for (let [key, value] of data) {
  console.log(`${key} - ${value}`)
}
// name - Вася
// name - Лена
// language - JavaScript
```

Тот же итератор доступен при помощи метода `entries()`. Обратите внимание, что каждый элемент итератора — массив из двух элементов. Первый элемент — ключ, а второй — значение.

В дополнение к этому, `FormData` предоставляет два других итератора: только ключей при помощи метода `.keys()` и только значений при помощи `.values()`. Каждый ключ при перечислении ключей будет появляться ровно столько раз, сколько значений он содержит:

```javascript
const data = new FormData()

data.append("name", "Вася")
data.append("name", "Лена")
data.append("language", "JavaScript")

console.log("Проходимся по значениям:")
for (let value of data.values()) {
  console.log(value)
}
// "Вася"
// "Лена"
// "JavaScript"

console.log("Проходимся по ключам:")
for (let key of data.keys()) {
  console.log(key)
}
// "name"
// "name"
// "language"
```

### Загрузка файлов

Сильной стороной `FormData` является то, что с помощью него удобно загружать файлы на сервер. Если при использовании `"application/json"` файлы необходимо дополнительно кодировать каким-то способом, чтобы привести к строке (и точно так-же декодировать на сервере), то `FormData` умеет это делать «из коробки».

Например, если мы хотим после выбора файла сразу же загрузить его на сервер, то нам понадобится следующий HTML:

```html
<input id="file-input" type="file" />
```

А для отправки на сервер необходимо сделать следующее:

```javascript
// Объявляем функцию загрузки файла
function sendFile(file) {
  const data = new FormData();

  // Просто добавляем файл, как обычное значение
  data.append("document", file)

  return fetch('/api/upload/', {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: data,
  })
}

// Находим инпут и записываем в переменную
const fileInput = document.querySelector("#file-input")

// Вешаем обработчик на событие _change_
fileInput.addEventListener("change", (event) => {
  // Получаем файл. Обратите внимание, что файлов может быть несколько если у инпута стоит атрибут `multiple`
  const file = event.target.files[0]

  // Отправляем файл на сервер при помощи созданной функции
  sendFile(file)

  // Очищаем текущее значение инпута. Если этого не делать, то при ошибке загрузки, повторный выбор того же файла не вызовет событие _change_
  event.target.value = null
})
```

<aside>

🦄 В Доке есть отличная статья «[Загрузка файла с прогресс-баром](/recipes/progress/)», где можно посмотреть подробнее про загрузку файлов с использованием `FormData`.

</aside>
