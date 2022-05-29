---
title: "Дескрипторы"
description: "Не все свойства объектов работают одинаково! Задаём особые режимы работы свойств с помощью дескрипторов"
authors:
  - AntonGorelov
tags:
  - doka
---

## Кратко

[Объекты](/js/object/), как мы знаем, содержат свойства. У каждого из свойств объекта, кроме значения, есть ещё три флага конфигурации, которые могут принимать значения `true` или `false`. Эти флаги называются _дескрипторами_:

- `writable` — доступно ли свойство для записи;
- `enumerable` — является ли свойство видимым при перечислениях (например, в цикле `for..in`);
- `configurable` — доступно ли свойство для переконфигурирования.

Когда мы создаём свойство объекта «обычным способом», эти три флага устанавливаются в значение `true`.

Для изменения значений дескрипторов применяются методы:

- `Object.defineProperty()`;
- `Object.getOwnPropertyDescriptor()`.

Другими словами, дескрипторы это пары ключ-значение, которые описывают поведение свойства объекта при выполнении операций над ним (например, чтения или записи).

![Схема дескрипторов под капотом](images/scheme.png)

К каждому свойству объекта под капотом привязан набор дескрипторов

## Пример

Давайте создадим переменную и добавим свойство ОС для ноутбука. Сделаем это с помощью дескрипторов и метода `Object.defineProperty()`.

Передаем в метод:

- `value` - ключ, содержащий значение объекта;
- дескрипторы с нужными значениями.

```js
const laptop = {}

Object.defineProperty(laptop, "os", {
  value: "MacOS",
  writable: false,
  enumerable: true,
  configurable: true
})
```

Свойство `os` недоступно для перезаписи, но будет видно при перечислении и доступно для переконфигурирования.

Попробуем перезаписать свойство `os` и выведем полученный результат:

```js
laptop.os = 'Windows'

console.log(laptop)
// { "os": "MacOS" }
```

### Типы дескрипторов свойств объектов

### Дескриптор данных

Дескриптор данных - это свойство, которое определяет и хранит только значение данных.

`value` - значение свойства, по умолчанию `undefined`.

`writable` - это свойство описывает, может ли быть изменено значение с помощью оператора присваивания. По умолчанию установлено в `false` (при простом присваивании значения объекту - `true`).

### Дескриптор доступа

Дескриптор доступа - это свойство, описываемое парой функций - геттером и сеттером.

`get` - функция, используемая как геттер свойства, возвращает значение или `undefined`.

`set` - функция, используемая как сеттер свойства. Принимает единственным аргументом новое значение, присваиваемое свойству.

Дескриптор может быть только чем-то одним из этих двух типов. Он не может быть одновременно обоими!

## Как пишется

```js
Object.defineProperty(объект, имяСвойства, дескриптор)
```

Функция принимает следующие параметры:

- `объект` - объект, свойство которого изменяем или добавляем;
- `имяСвойства` - свойство, для которого нужно применить дескриптор;
- `декскриптор` - дескриптор, изменяющий поведение.

Если свойство уже существует, `Object.defineProperty()` обновит флаги.
Если свойство не существует, метод создаёт новое свойство с указанным значением и флагами. Если какой-либо флаг не указан явно, ему присваивается значение `false`.

## Как понять

Давайте разберемся на примере, что мы можем делать с помощью дескрипторов.

Добавим ноутбуку ещё одно свойство "Размер экрана".

```js
Object.defineProperty(laptop, "displaySize", {
  value: "15"
})
```

Выведем полученные данные.

```js
const descriptor = Object.getOwnPropertyDescriptor(laptop, "displaySize")
JSON.stringify(descriptor, null, 2)
```

Мы не указали флаги явно, поэтому свойство имеет следующие параметры:

```js
{
  "value": "15",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
```

Изменим значение `writable`:

```js
const laptop = {}

Object.defineProperty(laptop, "displaySize", {
    value: '15',
    writable: false, // не перезаписываемо!
    configurable: true,
    enumerable: true
})

laptop.displaySize = '18'

console.log(laptop.displaySize)
// { "displaySize": "15" }
```

В строгом режиме `strict` mode мы получим ошибку `TypeError`, которая говорит о том, что мы не можем изменить неперезаписываемое свойство.

Изменим значение `enumerable`:

```js
const laptop = {}

Object.defineProperty(laptop, "processor",
    // сделаем `processor` перечисляемым, как обычно
    { enumerable: true, value: 'Intel Core' }
)

Object.defineProperty(laptop, "touchID",
    // сделаем `touchID` НЕперечисляемой
    { enumerable: false, value: true }
)

console.log(laptop.touchID)
// true
console.log(("touchID" in laptop))
// true
console.log(
  laptop.hasOwnProperty("touchID")
)
// true


for (let key in laptop) {
  console.log(key, laptop[key])
}
// "processor": 'Intel Core'
```

Заметьте, что `laptop.touchID` по факту существует и имеет значение, но не отображается в цикле `for..in` (при этом, оно существует, если воспользоваться оператором `in`). «Перечислимое» означает: «будет учтено, если пройти перебором по свойствам объекта».

Изменим значение `configurable`:

```js
const laptop = {
    processor: 'Intel Core'
}

laptop.processor = 'M1'
console.log(laptop.processor)
// 'Intel Core'

Object.defineProperty(laptop, "processor", {
    value: 'Intel Core',
    writable: true,
    configurable: false, // не конфигурируемо!
    enumerable: true
})

console.log(laptop.processor)
// 'Intel Core'
laptop.processor = 'M1'
console.log(laptop.processor)
// 'M1'

Object.defineProperty(laptop, "processor", {
    value: 'M1 TOP',
    writable: true,
    configurable: true,
    enumerable: true
})
// TypeError
```

Последний вызов `Object.defineProperty()` приводит к ошибке `TypeError`, вне зависимости от strict mode, если вы пытаетесь изменить значение дескриптора неконфигурируемого свойства.

<aside>
☝️ Будьте осторожны, изменение `configurable` на `false` необратимо и его нельзя отменить.
</aside>

Если для свойства уже задано `configurable: false`, то `writable` может быть изменено с `true` на `false` без ошибки, но не обратно в `true` если оно уже `false`.

А еще `configurable: false` препятствует возможности использовать оператор `delete` для удаления существующего свойства.

### Ограничение доступа ко всему объекту целиком

`Object.preventExtensions()` - запрещает добавление новых свойств объекта, но в то же время оставляет существующие свойства нетронутыми.

```js
const laptop = {
    displaySize: 15
}
Object.preventExtensions(laptop)
laptop.storage = 256
console.log(laptop.storage)
// undefined
```

В нестрогом режиме, создание `b` завершится неудачей без ошибок. В строгом режиме это приведёт к ошибке `TypeError`.

Метод `Object.seal()` создаёт «запечатанный» объект -- то есть принимает существующий объект и по сути применяет к нему `Object.preventExtensions()`, но также помечает все существующие свойства как `configurable:false`.

Таким образом, вы не можете не только добавлять свойства, но и переконфигурировать или удалить существующие (хотя вы всё еще можете изменять их значения).

`Object.freeze()` - замораживает объект, запрещая изменение значений существующих свойств и исключает добавление новых свойств. Возвращает новый объект.

Другими словами, `Object.freeze()` создает замороженный объект, применяет к нему `Object.seal()` и `writable:false`, следовательно, их значения не могут быть изменены.

Обратим внимание, что метод поверхностный, у замороженного объекта остаётся возможность изменять вложенные объекты. На MDN есть пример глубокой заморозки, метод `deepFreeze()`, позволяющий сделать полностью иммутабельный объект. При этом, невозможно сделать иммутабельными `Date`, [Map](/js/map/) или [Set](/js/set/).

Этот подход даёт наивысший уровень иммутабельности, который вы можете получить для самого объекта.

### Пример

```js
const laptop = {}

Object.defineProperties(laptop, {
  os: {
    value: 'MacOS',
    enumerable: true
  },
  age: {
    value: 10,
    enumerable: false
  }
})

const result = Object.keys(laptop)

console.log(result)
// ['os']
```

Получение значений дескрипторов для конкретного свойства объекта:

```js
const source = {
    name: "DOKA",
    sections: ['HTML', 'CSS', 'JS', 'Tools', 'Recipes'],
    themes: ['light']
}

const nameDescriptors = Object.getOwnPropertyDescriptor(source, 'name')

console.log(nameDescriptors)
//{
//  "value":"DOKA",
//  "writable":true,
//  "enumerable":true,
//  "configurable":true
//}
```

Получение значений дескрипторов для всех свойств объекта:

```js
const allPropertyDescriptors = Object.getOwnPropertyDescriptors(source)

console.log(allPropertyDescriptors)
```

Получим следующий ответ:

```js
{
  name: {
    value: "DOKA",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  sections: {
    value: ["HTML", "CSS", "JS", "Tools", "Recipes"],
    writable: true,
    enumerable: true,
    configurable: true,
  },
  themes: {
    value: ["light"],
    writable: true,
    enumerable: true,
    configurable: true,
  },
}
```

Если передан пустой объект без свойств, то получим пустой объект:

```js
const user = {}
const userDescriptors = Object.getOwnPropertyDescriptors(user)

console.log(userDescriptors)
// {}
```

`Object.isFrozen()` определяет, был ли объект заморожен. Возвращает true, если добавление/удаление/изменение свойств запрещено, и для всех текущих свойств установлено `configurable: false`, `writable: false`.

### Геттеры и сеттеры

Такие свойства, как геттеры и сеттеры, применяются достаточно широко. Давайте рассмотрим подробнее на примере.

Возьмём простой объект с полем `name` и объект с геттером `name`:

```js
const animal = {
  get cat() {
    return 'Кот'
  }
}

const animal = {
  cat: 'И здесь тоже кот',
}
```

Оба объекта сейчас имеют одинаковое поведение. Стоит только сказать, что свойство в первом случае представлено функцией, но для её вызова не нужно ставить скобки. Достаточно написать `animal.cat`.

Если нам понадобится изменить значение свойства `cat`, мы выполним `animal.cat = 'Серый кот'`, ничего не произойдёт. Дело в том, что с ключом `cat` не связана функция-сеттер. Таким образом можно настраивать порядок назначения новых значений свойствам объектов.

Перепишем наш пример с использованием сеттеров. В этом случае мы создаём «приватное» свойство, первым символом имени такого свойства является знак подчёркивания, который указывает на то, что это свойство предназначено для внутренних нужд объекта. Далее, мы работаем с ним при обращении к свойству объекта, а доступ регулируется геттером и сеттером.

```js
let animal = {
  get name() {
    return this._name
  },

  set name(value) {
    this._name = value
  }
}
```

Подобные функции могут понадобиться, например, для записи модифицированных свойств. В примере ниже мы модифицируем дату и записываем в нужном формате.

```js
const updatedAt = {
  get date() {
    return this._date
  },

  set date(value) {
    this._date = new Intl.DateTimeFormat('en-US').format(value)
  }
}
```

Запишем дату и время в поле `date`:

```js
updatedAt.date = new Date()
```

И получим дату в нужном формате: `5/25/2022`.

Свойства с методами доступа дают нам все возможности обработки данных с помощью функций и простоту, характерную для работы с обычными свойствами.

Периодически разработчику нужно защищать объекты от вмешательства извне. По ошибке легко изменить свойство объекта. Для защиты объектов от подобных изменений и управления их иммутабельностью предлагается использовать дескрипторы, такие как `writable` и `configurable` и методы `Object.preventExtensions()`, `Object.seal()`, и `Object.freeze()` для ограничения доступа к объекту целиком.
