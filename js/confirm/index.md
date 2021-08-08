---
title: "confirm()"
authors:
  - vindi-r
contributors:
  - nlopin
tags:
  - doka
---

## Кратко

При помощи директивы `confirm` можно вывести на экран пользователя модальное окно с текстом и кнопками «Ок» и «Отмена».

🤖 Из-за того, что окно модальное — работа с интерфейсом браузера и страницами будет заблокирована. Это неудобно, плюс может восприниматься пользователем как попытка ограничивать его свободу. Модальное окно для пользователя — окно, которое блокирует работу пользователя с браузером до тех пор, пока пользователь это окно не закроет.

## Пример

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="vindi-r" data-slug-hash="rbNjgj" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="confirm() кратко">
  <span>See the Pen <a href="https://codepen.io/vindi-r/pen/rbNjgj">
  confirm() кратко</a> by vindi-r (<a href="https://codepen.io/vindi-r">@vindi-r</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

💡 Это крайне быстрый вариант кода, который взаимодействует с пользователем, но окно созданное таким образом не изменяется через CSS, а значит использовать его лучше только для прототипирования интерфейса. В финальном варианте веб-страницы использовать модальное окно нежелательно.

## Как пишется

`confirm()` принимает один аргумент — это текст, который появится в модальном окне.

Результат работы `confirm()` можно записать в переменную:

```js
var answer1 = confirm("Подтвердите удаление")
```

Если не передать никакие аргументы, то пользователь увидит просто пустое окно с кнопками. Если появление окна следовало из какого-то действия, то пользователь может догадаться, что от него хотят. Но лучше, чтобы текст в модальном окне был написан — не надо бесить пользователей.

## Как это понять

Аргумент `confirm` должен быть строкой. Если это не так — будет автоматическое приведение к строке. Такое поведение не доставляет проблем, пока аргумент является примитивом или встроенным типом, имеющим правила приведения к строке.

```js
// Текст: "Подтвердите переход на страницу"
confirm("Подтвердите переход на страницу")
// "[object Object]", совершенно не подсказывающий пользователю что делать
confirm({ message: "please confirm" })
```

💡 Результат `confirm` — булево значение: «true» если нажать «Окей» и false если нажать «Отмена».

```js
var result = confirm("Удалить элемент?")
// нажимаем ОК
if (result === true) {
  alert("Элемент удален!")
} else {
  alert("Операция прервана")
}

// Результат: сообщение "Элемент удален"
```

Так как `confirm` всегда выдаёт boolean значение, то проверки на true/false вполне достаточно для продолжения работы скрипта.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="vindi-r" data-slug-hash="jROyRE" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="confirm() как это понять">
  <span>See the Pen <a href="https://codepen.io/vindi-r/pen/jROyRE">
  confirm() как это понять</a> by vindi-r (<a href="https://codepen.io/vindi-r">@vindi-r</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
