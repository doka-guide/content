---
title: "TypeScript: дженерики"
description: "TypeScript поддерживает дженерики, которые позволяют писать общую логику для работы с разными типами данных."
authors:
  - nerozumime
keywords:
  - тайпскрипт
  - дженерики
related:
  - tools/static-types
tags:
  - article
---
## Кратко

[**Generic**](https://www.typescriptlang.org/docs/handbook/2/generics.html) (единственное число) это нечто параметризующееся набором дополнительных типов (сущность одна, параметров может быть сколько угодно).
Generic-поведение можно добавить к разным сущностям. Не обязательно типам. Поэтому "обобщенный тип" и generic это не одно и то же.

## Как пользоваться

### Дженерик-функции

Generic это механизм который позволяет функциям, классам, типам и интерфейсам оперировать переменными типов (а это хорошо ибо не надо повторять код)

```ts
// Функция возвращает первый элемент массива
// T - generic type parameter
// T может иметь любой тип данных, но при этом он будет однозначно определён. Например, функция getFirstElement, вызванная для массива чисел, определит тип возвращаемого значения как number.
// T[] - квадратные скобки после generic type означают, что в качестве параметра функция принимает массив элементов типа generic type.
function getFirstElement<T>(arr: T[]): T | null {
    return arr[0] || null;
}
```

Generic type параметров может быть несколько. В таком случае их перечисляют через запятую:

```ts
// Тип K должен быть типом ключа T
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

**extends** - это ключевое слово, которое определяет ограничение типа.

Оператор [**keyof**](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) извлекает все публичные ключи объекта и представляет в виде числового или строкового литерального объединения. 

Литеральное объединение в TypeScript — это тип, который объединяет несколько литеральных значений в один тип:

```ts
type Mode = 'production' | 'development' | 'test'
```


### Дженерик класса

```ts
// Аргумент value может быть любого типа
class Component<T> {
  constructor(private value: T){}

  getValueWithType(): string {
    return `${this.value} имеет тип ${typeof this.value}`;
  }
}

const componentString = new Component('42');
console.log(componentString.getValueWithType()); // '42 имеет тип string'
const componentNum = new Component(42);
console.log(componentNum.getValueWithType()); // '42 имеет тип number'
```

## Как понять

Generic type не означает любой тип. Это определённый тип, неизвестный на момент написания функции, класса или интерфейса.

Чтобы в этом убедиться, посмотрим разницу на примере двух функций. Первая функция будет использовать в параметрах тип any, вторая функция будет принимать generic type.

```ts
// Входной параметр массив элементов любого типа
function getFirstAnyElement(arr: any[]): any {
    return arr[0];
}
const firstAnyElement = getFirstAnyElement(['1', '2'])
firstAnyElement.toFixed(1);
// тип переменной - any, компилятор игнорирует вызов функции toFixed у нечислового типа

// Входной параметр массив элементов generic type T
function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}
const firstStringElement = getFirstElement(['1', '2'])
firstStringElement.toFixed(1);
// тип переменной - string, компилятор указывает на ошибку вызова функции toFixed у нечислового типа
```

В функции с дженериком TypeScript сам определил тип возвращаемого значения в момент вызова функции.
