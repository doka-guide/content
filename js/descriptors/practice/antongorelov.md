🛠 В жизни проще использовать именно `Object.seal()` и `Object.freeze()`потому что чаще всего нужно ограничить доступ ко всему объекту целиком.

Сначала скажу, что есть метод `Object.preventExtensions()`, чтобы проще объяснить принцип работы `Object.seal()`.

`Object.preventExtensions()` запрещает добавление новых свойств объекта, но в то же время оставляет существующие свойства нетронутыми.

```js
const laptop = {
    displaySize: 15
}
Object.preventExtensions(laptop)
laptop.storage = 256
console.log(laptop.storage)
// undefined
```

В нестрогом режиме, создание `storage` завершится неудачей без ошибок. В строгом режиме это приведёт к ошибке `TypeError`.

Метод `Object.seal()` запечатывает переданный ему объект, одновременно запрещая добавление новых свойств и конфигурирование существующих свойств, значения свойств при этом изменять можно. Другими словами `Object.seal()` является эквивалентом применения `Object.preventExtensions()` к объекту и `configurable:false` к его свойствам.

`Object.freeze()` в свою очередь, замораживает объект, одновременно запрещая добавление новых свойств и изменение существующих свойств. Что соответствует применению `Object.preventExtensions()` к объекту и `writable:false` к его свойствам.

Обратим внимание, что метод поверхностный, у замороженного объекта остаётся возможность изменять вложенные объекты. На MDN есть пример глубокой заморозки, метод `deepFreeze()`, позволяющий сделать полностью иммутабельный объект. При этом, невозможно сделать иммутабельными [Date](/js/date/), [Map](/js/map/) или [Set](/js/set/).

Этот подход даёт наивысший уровень иммутабельности, который вы можете получить для самого объекта.

Методы `Object.seal()`, `Object.freeze()` и `Object.preventExtensions()` возвращают ссылку на тот же объект, что им был передан:

```js
const foo = {}
const bar = Object.freeze(foo)
foo === bar // true
```

```js
const frozen = Object.freeze({ foo: 'bar' })
```

🛠 Для объявления нескольких свойств, воспользуйтесь статическим методом `Object.defineProperties()`:
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

🛠 Получение значений дескрипторов для конкретного свойства объекта:

```js
const source = {
    name: 'Doka',
    sections: ['HTML', 'CSS', 'JS', 'Tools', 'Recipes'],
    themes: ['light']
}

const nameDescriptors = Object.getOwnPropertyDescriptor(source, 'name')

console.log(nameDescriptors)
//{
//  'value':'Doka',
//  'writable':true,
//  'enumerable':true,
//  'configurable':true
//}
```

🛠 Получение значений дескрипторов для всех свойств объекта:

```js
const allPropertyDescriptors = Object.getOwnPropertyDescriptors(source)

console.log(allPropertyDescriptors)
```

Получим следующий ответ:

```js
{
  name: {
    value: 'Doka',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  sections: {
    value: ['HTML', 'CSS', 'JS', 'Tools', 'Recipes'],
    writable: true,
    enumerable: true,
    configurable: true,
  },
  themes: {
    value: ['light'],
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

🛠  `Object.isFrozen()` определяет, был ли объект заморожен. Возвращает `true`, если добавление/удаление/изменение свойств запрещено, и для всех текущих свойств установлено `configurable: false`, `writable: false`.
