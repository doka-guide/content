Есть когнитивное искажение, называемое [«Закон инструмента»](https://ru.wikipedia.org/wiki/Золотой_молоток):

> Если из инструментов у вас только молоток, всё вокруг кажется гвоздями

Так и `switch` часто превращается в такой молоток. Конечно, у `switch` есть свои преимущества: можно использовать разом несколько `case`, в условиях можно написать различную логику и прочее.

```js
function greet(role) {
  switch (role) {
    case 'admin':
    case 'moder':
      return 'Приветствую, смотритель порядка'
    case 'user':
      trackUserVisit()
      return 'Здравствуй, пользователь'
    case 'guest':
      return 'Здравствуй, гость'
    default:
      return 'Привет, некто'
  }
}
```

Однако часто нам нужно **просто** соотнести одно значение с другим. И в таких случаях лучше завести словарь:

```js
const roleToGreeting = {
  admin: 'Приветствую, босс',
  moder: 'Приветствую, смотритель порядка',
  user: 'Здравствуй, пользователь',
  guest: 'Здравствуй, гость',
}

const greetings = (role) => roleToGreeting[role] ?? 'Привет, некто'
```

Есть ещё шаблон `switch (true)`, который якобы сокращает `if...else if...else`:

```js
function getCategoryByAge(age) {
  switch (true) {
    case (age >= 0 && age <= 12):
      return "Child"
    case (age >= 13 && age <= 19):
      return "Teenager"
    case (age >= 20 && age <= 35):
      return "Young Adult"
    case (age >= 36 && age <= 55):
      return "Adult"
    case (age > 55):
      return "Senior"
    default:
      return "Invalid age"
  }
}
```

Использование `switch (true)` является спорным вопросом. Он выглядит скорее как хак, нежели задуманный сценарий использования языка. Также учтите, что вашим коллегам эта конструкция может быть непривычна, в отличие от обычных условий, которые понятны всем. Сторонники `switch (true)` утверждают, что он позволяет сократить код, но пример выше напротив будет более лаконичным без него:

```js
function getCategoryByAge(age) {
  if (age >= 0 && age <= 12) return "Child"
  if (age >= 13 && age <= 19) return "Teenager"
  if (age >= 20 && age <= 35) return "Young Adult"
  if (age >= 36 && age <= 55) return "Adult"
  if (age > 55) return "Senior"

  return "Invalid age"
}
```
