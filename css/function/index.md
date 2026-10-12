---
title: "`@function`"
description: "Создаём собственные функции в CSS, переиспользуем вычисления и возвращаем значения прямо внутри стилей."
authors:
- drakesbot12
keywords:
- CSS custom functions
- пользовательские функции CSS
- кастомные функции
- CSS Functions and Mixins
related:
- css/custom-properties
- css/calc
- css/property
tags:
- doka
---

## Кратко

Директива `@function` позволяет создавать собственные функции в CSS.

Такие функции могут принимать аргументы, выполнять вычисления и возвращать результат, который затем используется в свойствах CSS.

Похоже на функции в языках программирования, только работает прямо в таблице стилей.

```css
@function --double(--value) {
  result: calc(var(--value) * 2);
}
```

После объявления функцию можно вызывать практически в любом значении свойства:

```css
.box {
  width: --double(100px); /* 200px */
}
```

<aside>

🧪 На момент написания статьи директива считается экспериментальной и поддерживается не всеми браузерами.

</aside>

## Пример

Представим карточку с внутренним блоком.

У родителя есть скругление углов `24px`, а внутренний элемент расположен на расстоянии `8px` от краёв родителя.

Формула скругления для ребёнка:

```text
радиус ребёнка = радиус родителя − отступ
```

```html
<div class="card">
  <div class="card-content">Простой внутренний блок</div>
</div>
```

```css
@function --inner-radius(--parent-radius, --offset)
returns <length> {
  result: max(0px, calc(var(--parent-radius) - var(--offset) ));
} /* 24px - 8px = 16px */

.card {
  --radius: 24px;
  --padding: 8px;

  padding: var(--padding);
  border-radius: var(--radius);
  background: #3949ab;
}

.card-content {
  border-radius: --inner-radius(var(--radius), var(--padding));

  background: rgba(255, 255, 255, 0.35);
  padding: 1rem;
}
```

<iframe title="Внутренний элемент получает радиус через функцию CSS" src="demos/basic/" height="200"></iframe>

## Как пишется

Базовый синтаксис выглядит так:

```css
@function --function-name() {
  result: значение;
}
```

Функция обязательно должна:
- иметь имя, начинающееся с `--`;
- содержать дескриптор `result`;
- возвращать какое-либо значение.

### Параметры функции

```css
@function --multiply(--value, --factor) {
  result: calc(var(--value) * var(--factor));
}
```

### Типы данных

```css
@function --transparent(--color <color>, --alpha <number>)
returns <color> {
  result: oklch(from var(--color) l c h / var(--alpha));
}
```

#### Несколько допустимых типов

Для параметра можно указать несколько допустимых типов через функцию `type()`.

```css
@function --transparent(
  --color <color>,
  --alpha type(<number> | <percentage>)
) returns <color> {
  result: oklch(from var(--color) l c h / var(--alpha));
}
```

Теперь аргумент `--alpha` может принимать как число, так и проценты:

```css
background: --transparent(red, 0.5);
background: --transparent(red, 50%);
```

#### Списки значений

Параметр может принимать список значений.

Символ `#` после типа означает список элементов, разделённых запятыми.

```css
@function --max-plus-x(--list <length>#, --x <length>) {
  result: calc(max(var(--list)) + var(--x));
}
```

При передаче списка его нужно обернуть в фигурные скобки:

```css
div {
  width: --max-plus-x({1px, 7px, 2px}, 3px); /* 10 px */
}
```

### Значения по умолчанию

```css
@function --transparent(
  --color <color>,
  --alpha <number>: 0.5
) returns <color> {
  result: oklch(from var(--color) l c h / var(--alpha));
}
```

```css
background: --transparent(red);
```

### Локальные переменные

Внутри функции можно объявлять собственные CSS-переменные.

```css
@function --anim-1s(--animation, --count) {
  --duration: 1s;
  --easing: linear;

  result: var(--animation) var(--duration) var(--count) var(--easing);
}
```

Использование:

```css
animation: --anim-1s(bounce, 2);
```

### Вложенные функции

Функции могут вызывать другие функции.

```css
@function --outer(--outer-arg) {
  --outer-local: 2;
  result: --inner();
}

@function --inner()
returns <number> {
  result: calc(var(--outer-arg) + var(--outer-local));
}
```

### Условная логика

Внутри функции можно использовать медиавыражения и другие конструкции CSS.

```css
@function --narrow-wide(
  --narrow,
  --wide
) {
  result: var(--wide);

  @media (width < 700px) {
    result: var(--narrow);
  }
}
```

## Как понять

### Функции — это переиспользуемые вычисления

До появления `@function` для повторного использования логики обычно приходилось:
- копировать формулы через `calc()`;
- создавать множество `CSS`-переменных;
- переносить вычисления в `JavaScript`.

### Область видимости параметров

Параметры функции работают как локальные `CSS`-переменные.

```css
@function --double(--value) {
  result: calc(var(--value) * 2);
}
```

Переменная `--value` существует только внутри функции.

### Доступ к переменным элемента

Функция может использовать пользовательские свойства элемента, на котором была вызвана.

```css
@function --double-z()
returns <number> {
  result: calc(var(--z) * 2);
}

div {
  --z: 3;
  z-index: --double-z();
}
```

### Приоритет переменных

Если переменная существует одновременно:
- на элементе;
- среди параметров функции;
- внутри функции;

то применяется следующий порядок приоритета:
1. локальные переменные функции;
2. параметры функции;
3. пользовательские свойства элемента.

```css
@function --add-a-b-c(--b, --c) {
  --c: 300;
  result: calc(var(--a) + var(--b) + var(--c));
}

div {
  --a: 1;
  --b: 2;
  --c: 3;
  z-index: --add-a-b-c(20, 30); /* 321 */
}
```

### Защита от некорректных значений

Типизация помогает проверять типы данных, но не проверяет корректность вычислений.

Например, при расчёте внутреннего радиуса можно случайно получить отрицательное значение.

```css
@function --inner-radius(--parent-radius <length>, --offset <length>)
returns <length> {
  result: max(0px, /* без max() результат: -2px*/
    calc(var(--parent-radius) - var(--offset))
  );
}

.card {
  --radius: 16px;
  --padding: 18px;

  padding: var(--padding);
  border-radius: var(--radius);
}
.card-content {
  border-radius: --inner-radius(var(--radius), var(--padding)); /* c max() результат: 0px */
}
```

Функция `max()` гарантирует, что результат никогда не станет меньше нуля.

## Подсказки

💡 Если несколько функций имеют одинаковое имя, будет использоваться та, которая выигрывает в каскаде CSS.
💡 Используйте функции для часто повторяющихся вычислений. Если одна и та же формула встречается несколько раз, её удобно вынести в `@function`.
💡 Имя функции должно начинаться с двойного дефиса `--`, как и имя пользовательской CSS-переменной.
💡 Параметры функции доступны только внутри её тела и не влияют на переменные за пределами функции.
