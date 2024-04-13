Начнём с [лаконичного определения](https://tc39.es/ecma262/multipage/overview.html#sec-terms-and-definitions-prototype) зафиксированного в спецификации ECMAScript:

Прототип — это объект, предоставляющий другим объектам общие (shared) свойства.

В свою очередь MDN [определяет](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes) прототипы как механизм, благодаря которому объекты наследуют свойства (features) других объектов.

Прототип позволяет указать какие свойства будет наследовать созданные от него объекты, а также предоставляет доступ к своему собственному прототипу.

Единственным исключением является базовый объект `Object.prototype`. Его прототип это `null`.

У каждого объекта есть встроенное свойство указывающее на его прототип. Попробуем его получить напрямую:

☝️ При запуске `console.dir()` в Node.js для просмотра скрытых свойств объекта потребуются дополнительные параметры.

```js
const obj = { name: 'Объект' }
console.dir(obj.prototype, {showHidden: true, depth: 0 })
// undefined
```

Ничего не вышло. Дело в том, что для доступа к прототипу следует использовать специальные методы.

💡 Статический метод `Object.getPrototypeOf()` возвращает прототип объекта.

```js
const obj = { name: 'Объект' }
console.dir(Object.getPrototypeOf(obj), {showHidden: true, depth: 0 })
// [Object: null prototype] {
//   [constructor]: [Function],
//   [__defineGetter__]: [Function],
//   [__defineSetter__]: [Function],
//   [hasOwnProperty]: [Function],
//   [__lookupGetter__]: [Function],
//   [__lookupSetter__]: [Function],
//   [isPrototypeOf]: [Function],
//   [propertyIsEnumerable]: [Function],
//   [toString]: [Function],
//   [valueOf]: [Function],
//   ['__proto__']: [Getter/Setter],
//   [toLocaleString]: [Function]
// }

```

Как у объекта появляется прототип ?

1. Прототип объекта можно указать при создании объекта с помощью `Object.create()`:

```js
// объект-прототип
const shape = { color: 'green' }

// создадим новый объект на основе объекта-прототипа
const myShape = Object.create(shape)

// добавим свойство в объект-прототип
shape.isCircle = true

// получим доступ к свойству
console.log(myShape.isCircle)
// true
```
☝️ Обратите внимание: все изменения объекта-прототипа `shape` будут доступны в объекте `myShape` даже если эти изменения произойдут после создания объекта `myShape`.

2. Когда объект создаётся с помощью конструктора, прототипом объекта назначается прототип конструктора:

```js
// функция-конструктор
function Bear(name) {
  this.name = name;
}

// добавим свойство в Bear
Bear.id = 'медведь'

// создадим новый объект
const panda = new Bear('Панда')

// получим прототип объекта
const pandaPrototype = Object.getPrototypeOf(panda)

// а, теперь добавим свойство в прототип Bear
Bear.prototype.isBear = true;

// отобразим свойства созданного объекта (включая наследуемые)
console.dir(panda, {showHidden: true })
// Bear { name: 'Панда', isBear: true }

// убедимся что прототип конструктора идентичен прототипу объекта
console.log(Object.is(Bear.prototype, pandaPrototype))
// true
```
☝️ Обратите внимание: свойство `id` не наследуется объектом `panda`, потому что находится в самом объекте `Bear`, а свойство `isBear` наследуется, хотя было добавлено в прототип конструктора уже после создания объекта `panda`.

💡 Статический метод `Object.is()` проверяет являются ли переданные ему в качестве аргументов значения идентичными.

Возможно ли изменить прототип созданного объекта ?

Да, но крайне не рекомендуется. Для этого можно использовать метод `setPrototypeOf()`:

```js
// объект-прототип
const pants = {
  color: 'black',
  showInfo: () => console.log('Брюки')
};

// создадим новый объект
const myPants = Object.create(pants)

myPants.size = 48
myPants.showInfo()
// Брюки

console.dir(myPants, {showHidden: true, depth: 0 })
// { size: 48, color: 'black' }

// новый объект-прототип
const shorts = {
  color: 'white',
  showInfo: () => console.log('Элегантные шорты')
};

// брюки превращаются...
Object.setPrototypeOf(myPants, shorts);

myPants.showInfo()
// Элегантные шорты

console.dir(myPants, {showHidden: true, depth: 0 })
// { size: 48, color: 'white' }
```

⚠️ Следует избегать изменения прототипа у существующего объекта, так как это сильно снижает производительность.