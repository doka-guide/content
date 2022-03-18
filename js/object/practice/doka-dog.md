🛠 Современные версии JavaScript содержат много упрощений синтаксиса.

Например, методы объявлять по-старому:

```js
const cat = {
  name: 'Том',
  meow: function () {
    console.log('мяу мяу')
  },
}
```

А можно использовать короткий синтаксис:

```js
const cat = {
  name: 'Том',
  meow() {
    console.log('мяу мяу')
  },
}
```

Если у вас есть переменная со значением, и вы хотите создать свойство с тем же именем, то вместо старого подхода:

```js
const firstName = 'Иван'
const username = 'Killer3000'

const user = {
  firstName: firstName,
  username: username
}

console.log(user)
// { firstName: 'Иван', username: 'Killer3000' }
```

Можно сократить запись:

```js
const firstName = 'Иван'
const username = 'Killer3000'

const user = {
  firstName,
  username
}

console.log(user)
// { firstName: 'Иван', username: 'Killer3000' }
```

🛠 Если название свойства хранится в переменной, его значение можно прочитать через синтаксис квадратных скобок:

```js
const user = {
  firstName: 'Марина',
  username: 'zloyDuh'
}

const prop = 'firstName'
console.log(user[prop])
// Марина
```

🛠 Для проверки, есть ли свойство у объекта, используйте оператор `in`:

```js
const user = {
  firstName: 'Марина',
  username: 'zloyDuh'
}

console.log('firstName' in user)
// true
console.log('age' in user)
// false
```

🛠 Чтобы обойти все ключи объекта, используют цикл [`for...in`](/js/for-in/)

🛠 Для копирования объектов используется спред-синтаксис:

```js
const user = {
  firstName: 'Марина',
  username: 'zloyDuh'
}

const copy = { ...user }
console.log(copy)
// { firstName: 'Марина', username: 'zloyDuh'}
```

При этом происходит поверхностное копирование — полностью копируются только свойства первого уровня вложенности. Подробнее об этом читайте статью [«Поверхностное и глубокое копирование»](/js/shallow-or-deep-clone/).
