Есть когнитивное искажение, называемое [«Закон инструмента»](https://ru.wikipedia.org/wiki/Золотой_молоток):

> Если из инструментов у вас только молоток, всё вокруг кажется гвоздями

Вот `switch` часто становится именно таким молотком.

К примеру тут у `switch` есть преимущество, что можно использовать два `case` подряд:

```js
function greetings(role) {
  switch (role) {
    case 'admin':
      return 'Приветствую, босс'
    case 'moder':
      return 'Приветствую, смотритель порядка'
    case 'user':
      return 'Здравствуй, пользователь'
    case 'guest':
      return 'Здравствуй, гость'
    default:
      return 'Привет, некто'
  }
}
```

Однако чаще всего для одного ключа требуется одно значение, и в таких случаях уместнее использовать объект (словарь):

```js
const greetingsDict = {
  admin: 'Приветствую, босс',
  moder: 'Приветствую, смотритель порядка',
  user: 'Здравствуй, пользователь',
  guest: 'Здравствуй, гость',
}

const greetings = (role) => greetingsDict[role] ?? 'Привет, некто'
```

Есть ещё шаблон `switch (true)`, который якобы сокращает `if...else if...else`:

```js
function getCategoryByAge(age) {
  switch (true) {
    case (age >= 0 && age <= 12):
      return "Child";
    case (age >= 13 && age <= 19):
      return "Teenager";
    case (age >= 20 && age <= 35):
      return "Young Adult";
    case (age >= 36 && age <= 55):
      return "Adult";
    case (age > 55):
      return "Senior";
    default:
      return "Invalid age";
  }
}
```

Лично я считаю `switch (true)` вообще вредной практикой (возможно коллеги со мной не согласятся). Почти всегда его применяют в функциях, и поскольку первый `return` завершает выполнение функции, код выше с обычным `if` будет проще для восприятия:

```js
function getCategoryByAge(age) {
  if (age >= 0 && age <= 12) return "Child";
  if (age >= 13 && age <= 19) return "Teenager";
  if (age >= 20 && age <= 35) return "Young Adult";
  if (age >= 36 && age <= 55) return "Adult";
  if (age > 55) return "Senior";

  return "Invalid age";
}
