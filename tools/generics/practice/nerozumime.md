### Лишние параметры типов

При написании generic функций и классов не нужно использовать больше параметров, чем необходимо.

```ts
// ❌ Плохо - лишний generic параметр U
function doSomething<T, U>(data: T): T {
  return data;
}

// ✅ Хорошо
function doSomething<T>(data: T): T {
  return data;
}
```

### Неправильные ограничения

Неверный выбор ограничений generic параметров делает их бесполезными. К примеру, нам нужно написать функцию для получения свойства length у объекта.

```ts
// ❌ Плохо - слишком строгие ограничения
// подходит только для использования со строкой
function getLength<T extends string>(obj: T): number {
  return obj.length;
}

// ✅ Хорошо - правильные ограничения
// можем передать любой объект со свойством length
function getLength<T extends { length: number }>(obj: T): number {
  return obj.length;
}
```