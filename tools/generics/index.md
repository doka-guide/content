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

**Строгая** типизация в TypeScript позволяет избежать множество ошибок при написании кода. Однако это не означает, что конструкции языка могут работать с абсолютно любыми типами данных.

[**Дженерики**](https://www.typescriptlang.org/docs/handbook/2/generics.html) или обобщенные типы, нужны для описания похожих, но отличающихся какими-то характеристиками типов. Мы описываем общую структуру, а конкретную уже определяет пользователь дженерика.


## Как пользоваться

### Дженерик-функции

У функций есть параметры, которым во время вызова можно задать значения. Дженерик позволяет параметризовать тип. Название у обобщённого типа может быть любым.

```ts
// Функция возвращает первый элемент массива
// T — название обобщённого типа
// T может иметь любой тип данных, но при этом он будет конкретным
function getFirstElement<T>(arr: T[]): T | null {
    return arr[0] || null;
}
```

Обобщённых типов может быть несколько. В таком случае их перечисляют через запятую:

```ts
// Тип K обязательно должен быть ключом объекта T
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

**extends** - это ключевое слово, которое позволяет создавать новые типы, являющиеся более специфичными версиями других типов.

Оператор [**keyof**](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) извлекает все публичные ключи объекта и представляет в виде числового или строкового литерального объединения.


### Дженерик класса

Дженерики есть и в классах:
```ts
// Класс Component может хранить любой тип в value
class Component<T> {
  constructor(private value: T){}

  getValueWithType(){
    return `${this.value} имеет тип ${typeof this.value}`;
  }
}

const componentString = new Component('42');
console.log(componentString.getValueWithType()); // '42 имеет тип string'
const componentNum = new Component(42);
console.log(componentNum.getValueWithType()); // '42 имеет тип number'
```

## Как понять

Обобщённый тип не означает любой тип. Это определённый тип, неизвестный на момент написания функции, класса или интерфейса.

Чтобы в этом убедиться, посмотрим разницу на примере двух функций. Первая функция будет использовать в параметрах тип any, вторая функция будет принимать дженерик тип.

```ts
// Входной параметр массив любых элементов
function getFirstAnyElement(arr: any[]): any {
    return arr[0];
}

const firstAnyElement = getFirstAnyElement(['first', 'second'])
// тип переменной - any
```

```ts
// Входной параметр массив элементов конкретного типа T
function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}

const firstStringElement = getFirstElement(['first', 'second'])
// тип переменной - string
```

В функции с дженериком TypeScript сам определил тип возвращаемого значения в момент вызова функции.