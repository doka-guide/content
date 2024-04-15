Начнём с [лаконичного определения](https://tc39.es/ecma262/multipage/overview.html#sec-terms-and-definitions-prototype) зафиксированного в спецификации ECMAScript:

Прототип — это объект, предоставляющий другим объектам общие (shared) свойства.

В свою очередь MDN [определяет](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes) прототипы как механизм, благодаря которому объекты получают доступ (inherit) к свойствам (features) других объектов.

Прототип позволяет указать какие свойства будут доступны созданным от него объектам, а также предоставляет доступ к своему собственному прототипу.

При попытке обратиться к свойству которое не определено в самом объекте производится поиск в прототипе объекта, а затем в прототипе прототипа и далее пока искомое свойство не будет найдено или не будет достигнут конец цепоки прототипов (prototype chain), так как у базового объекта `Object.prototype` прототипом является `null`.

У каждого объекта есть встроенное свойство указывающее на его прототип. Попробуем его получить напрямую:

☝️ При запуске `console.dir()` в Node.js для просмотра скрытых свойств объекта потребуются дополнительные параметры. Здесь и далее приводятся результаты выполнения в Node.js.

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

Но постойте, а как насчёт функций-конструкторов ? Ведь они имеют свойство `prototype` доступное напрямую. Однако свойство `prototype` и прототип функции-конструктора (ведь функция это тоже объект) это не одно и тоже:

```js
// функция-конструктор
function Person(name) {
  this.name = name;
}

console.dir(Person.prototype, {showHidden: true, depth: 0 })
// { [constructor]: [Function] }

console.dir(Object.getPrototypeOf(Person), {showHidden: true, depth: 0 })
// {
//   [length]: 0,
//   [name]: '',
//   [arguments]: [Getter/Setter],
//   [caller]: [Getter/Setter],
//   [constructor]: [Function],
//   [apply]: [Function],
//   [bind]: [Function],
//   [call]: [Function],
//   [toString]: [Function],
//   [Symbol(Symbol.hasInstance)]: [Function]
// }

```

Свойство `prototype` у функции-конструктора, используется для назначения прототипа объектам которые будут созданы с помощью этого конструктора и никак не влияет на саму функции-конструктор.

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

2. Когда объект создаётся с помощью конструктора, прототип объекта назначается в соответствии со значением поля `prototype` функции-конструктора:

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

// а, теперь добавим свойство в Bear.prototype
Bear.prototype.isBear = true;

// отобразим свойства созданного объекта
console.dir(panda, {showHidden: true })
// Bear { name: 'Панда', isBear: true }

// убедимся что свойство prototype конструктора является прототипом объекта
console.log(Object.is(Bear.prototype, pandaPrototype))
// true

// убедимся что свойство prototype и прототип конструктора это не одно и тоже
console.log(Object.is(Bear.prototype, Object.getPrototypeOf(Bear))
// false
```
☝️ Обратите внимание: свойство `id` не наследуется объектом `panda`, потому что находится в самом объекте `Bear`, а свойство `isBear` наследуется, хотя было добавлено в `Bear.prototype` уже после создания объекта `panda`.

💡 Статический метод `Object.is()` проверяет являются ли переданные ему в качестве аргументов значения идентичными.

3. Когда объект создаётся как экземпляр класса, прототип объекта назначается в соответствии со значением поля `prototype` объекта родительского класса:

```js
// родительский класс
class Person {
  constructor(name) {
    this.name = name
  }
}

// добавим метод в объект родительского класса
Person.getSkill = function() {
  return this.skill
}

// создадим экземпляр класса
const person = new Person('Иван')

// добавим свойство в Person.prototype
Person.prototype.setSkill = function(skill) {
  this.skill = skill
}

// добавим Ивану умение работать курьером
person.setSkill('Курьер')

// получим прототип объекта
const proto = Object.getPrototypeOf(person)

// отобразим свойства созданного объекта
console.dir(person, {showHidden: true})
// Person { name: 'Иван', skill: 'Курьер' }

// убедимся что свойство Person.prototype является прототипом объекта
console.log(Object.is(Person.prototype, proto))
// true
```
☝️ Обратите внимание: свойство `getSkill` не наследуется объектом `person`, а свойство `setSkill` наследуется, хотя было добавлено в Person.prototype уже после создания объекта `person`.

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
