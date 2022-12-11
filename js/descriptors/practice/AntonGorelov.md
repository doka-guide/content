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

Метод `Object.seal()` создаёт «запечатанный» объект — то есть принимает существующий объект, применяет к нему `Object.preventExtensions()`, а также помечает все существующие свойства как `configurable:false`.

Таким образом, вы не сможете не только добавлять свойства, но и переконфигурировать или удалить существующие (хотя вы всё ещё можете изменять их значения).

`Object.freeze()` — замораживает объект, запрещая изменение значений существующих свойств и исключает добавление новых свойств. Возвращает новый объект.

Другими словами, `Object.freeze()` создаёт замороженный объект, применяет к нему `Object.seal()` и `writable:false`, следовательно, их значения не могут быть изменены.

Обратим внимание, что метод поверхностный, у замороженного объекта остаётся возможность изменять вложенные объекты. На MDN есть пример глубокой заморозки, метод `deepFreeze()`, позволяющий сделать полностью иммутабельный объект. При этом, невозможно сделать иммутабельными [Date](/js/date/), [Map](/js/map/) или [Set](/js/set/).

Этот подход даёт наивысший уровень иммутабельности, который вы можете получить для самого объекта.

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
    name: 'DOKA',
    sections: ['HTML', 'CSS', 'JS', 'Tools', 'Recipes'],
    themes: ['light']
}

const nameDescriptors = Object.getOwnPropertyDescriptor(source, 'name')

console.log(nameDescriptors)
//{
//  'value':'DOKA',
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
    value: 'DOKA',
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
