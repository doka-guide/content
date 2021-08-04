---
title: "Логические операторы"
authors:
  - nlopin
contributors:
  - furtivite
keywords:
  - или
  - логическое
  - и
  - не
  - operators
  - and
  - or
  - отрицание
  - not
tags:
  - doka
---

## Кратко

Логические операторы помогают составлять сложные логические условия, которые часто нужны при ветвлении с помощью `if...else`.

## Как пишется

### И, `&&`

Интернет-магазин показывает цены со скидкой только зарегистрированному пользователю, сделавшему больше одной покупки.

В описании два условия, которые должны одновременно быть верными:

- пользователь должен быть зарегистрирован
- количество покупок должно быть больше одной

Если одно из условий, или оба сразу неверны, то цену показывать не нужно.

Именно по такому принципу работает оператор логическое И, пишется `&&`. Если соединить с его помощью два выражения, то результат будет равен истине только тогда, когда оба выражения истинны:

```js
if (isRegistered === true && orders > 1) {
  // показываем цены
}
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="result" data-user="Lopinopulos" data-slug-hash="wLGJgz" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Логическое И">
  <span>See the Pen <a href="https://codepen.io/Lopinopulos/pen/wLGJgz">
  Логическое И</a> by Nikolai Lopin (<a href="https://codepen.io/Lopinopulos">@Lopinopulos</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Обычно для того, чтобы понять, как работают логические операторы, рисуют таблицу истинности. В ячейках — итоговое значение операции при соответствующих операндах:

<div class="article__table article__table_all-third">

| `&&`    |  `true` | `false` |
| ------- | ------: | ------: |
| `true`  |  `true` | `false` |
| `false` | `false` | `false` |

</div>

### ИЛИ, `||`

Представь, что мы проверяем билеты на концерт. Пропускать нужно людей с билетами, а также тех, кто находится в списке приглашённых. Выполнение любого из этих условий гарантирует попадание на концерт.

Чтобы написать такое составное условие, воспользуйся оператором логического ИЛИ, обозначается как две вертикальные черты `||`. Логическое или вернёт `true`, если хотя бы одно из условий `true`.

Погенерируй гостей в демо и посмотри, как отрабатывает условие, которое записано так:

```js
if (hasTicket || isInvited) { ... }
```

<p class="codepen" data-height="354" data-theme-id="light" data-default-tab="result" data-user="Lopinopulos" data-slug-hash="VJjboW" style="height: 354px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Логическое ИЛИ">
  <span>See the Pen <a href="https://codepen.io/Lopinopulos/pen/VJjboW">
  Логическое ИЛИ</a> by Nikolai Lopin (<a href="https://codepen.io/Lopinopulos">@Lopinopulos</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<div class="article__table article__table_all-third">

| `       |        |       ` | `true` | `false` |
| ------- | -----: | ------: | ------ | ------- |
| `true`  | `true` |  `true` |
| `false` | `true` | `false` |

</div>

### НЕ `!`

Оператор «логическое НЕ» превращает `true` в `false` и наоборот.

Он записывается в виде восклицательного знака `!` перед операндом: `!операнд` . Чаще всего это переменная. Например, `!myVariable` . Операторы, которые производят операцию над одним операндом называются унарными.

Например, мы можем предлагать купить билет посетителю без билета:

```js
if (!hasTicket) {
  // купи билет, дорогой!
}
```
