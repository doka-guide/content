Методы `event.preventDefault()` и `event.stopPropagation()` предназначены для решения похожих задач и часто используются вместе.

Метод `event.stopPropagation()` **останавливает распространение** события (event propagation). Например, обработчик события объявленный в родительском элементе не будет вызван после выполнения `stopPropagation()` в обработчике дочернего элемента. При этом действие по умолчанию не будет отменено.

Метод `event.preventDefault()` **отменяет действие** по умолчанию. Например, переход по ссылке при клике на элемент `<a>`. Само событие после выполнения `preventDefault()` продолжает распространяться.

Рассмотрим пример.

Имеется простая форма:
```html
<form>
  <label for="id-checkbox">Checkbox:</label>
  <input type="checkbox" id="id-checkbox" />
</form>
```

Добавим обработку клика по форме и чекбоксу:
```js
const form = document.querySelector("form")
const label = form.querySelector("label")
const checkbox = form.querySelector("#id-checkbox")

form.addEventListener("click", formClick)
checkbox.addEventListener("click", checkboxClick)

function formClick(event) {
  form.style.border = '1px solid black'
}

function checkboxClick(event) {
  checkbox.style.color = 'blue'
}
```

При клике по чекбоксу измениться цвет подписи, а также появиться рамка вокруг формы.

Действием по умолчанию в данном случае, будет переключение чекбокса. Чтобы отменить это поведение, добавим `preventDefault()` в обработчик `checkboxClick`:
```js
function checkboxClick(event) {
  checkbox.style.color = 'blue'
  event.preventDefault()
}
```

Теперь при клике по чекбоксу он не меняет значение, однако остальные действия по-прежнему происходят.

Чтобы остановить всплытие события, но позволить чекбоксу переключаться заменим `event.preventDefault()` на `stopPropagation()`:

```js
function checkboxClick(event) {
  checkbox.style.color = 'blue'
  event.stopPropagation()
}
```

Мы влияли на событие на [стадии всплытия](/js/events/#vsplytie-sobytiy). Методы `preventDefault()` и `stopPropagation()` также могут использоваться при обработке событий на стадии захвата.

Например, мы можем отменить действие по умолчанию используя обработчик formClick. Для этого необходимо [объявить его для срабатывания на стадии захвата](/js/element-addeventlistener/#kak-pishetsya):

```js
// formClick будет работать на стадии захвата события
form.addEventListener("click", formClick, true)
checkbox.addEventListener("click", checkboxClick)

function formClick(event) {
  form.style.border = '1px solid black'
  event.preventDefault()
}

function checkboxClick(event) {
  checkbox.style.color = 'blue'
}
```

☝️ Обратите внимание, `checkboxClick()` выполняется, но сам чекбокс не переключается, так как это действие уже отменено в `formClick()`, который теперь срабатывает раньше.

Если поменять `preventDefault()` на `stopPropagation()`, обработчик `checkboxClick` не выполнится, но действие по умолчанию произойдёт:
```js
function formClick(event) {
  form.style.border = '1px solid black'
  event.stopPropagation()
}
```
