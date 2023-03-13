---
title: "input"
description: "`Input` - событие, срабатывающее каждый раз при изменении значения."
authors:
  - tarahovmaksim
related:
  - html/input
  - html/form
tags:
  - doka
  - placeholder
---

## Кратко

Событие `input` возникает, когда пользователь изменяет поле для ввода.

Поле для ввода может быть:
- текстовым `<input type=text>`, `<input type="email">`, `<textarea>` и так далее;
- чекбоксом `<input type="checkbox">, `<input type="radio">`.

Событие не вызовется, если поле изменить через JS. Для таких случаев нужно использовать дополнительные манипуляции, например `dispatchEvent()`.

Каждое добавление и удаление символа вызывает событие; однако при вставке скопированного текста из буфера обмена событие возникает один раз.

## Простой пример

```html
<label>Введите текст:
    <input type="text" id="textField">
</label>
<label>Результат события <code>oninput</code>:
    <textarea disabled id="textResult"></textarea>
</label>

<script>
    textField.oninput = function() {
      textResult.value = textField.value;
    };
</script>
```

<iframe title="Пример работы input" src="demos/index.html" height="40px"></iframe>

## Как пишется

```js
const textInput = document.querySelector('input[type=text]');

function callback(evt) {
  console.log(`Произошло событие ${evt.type}`);
}

textInput.addEventListener('input', callback);

/* Если теперь ввести в текстовое поле
  слово «Дока» и щёлкнуть вне этого поля,
  в консоли будут показаны сообщения:

  4 раза: Произошло событие input
*/
```

## Отличие от события `change`

События `input` и `change` очень похожи: они позволяют отслеживать изменения в полях ввода.

Различие есть для текстовых полей ввода:
- `input` — срабатывает сразу при каждом изменении значения в поле;
- `change` — после изменения значения нужно убрать фокус из поля: например, перейти в другое поле или кликнуть на другую часть страницы.

Для прочих полей ввода они работают одинаково:

```html
  <label>Кликните:
      <input type="checkbox" name="checkbox-input">
  </label>

  <label>Типы событий:
      <textarea disabled name="checkbox-result"></textarea>
  </label>

  <script>
      const checkbox = document.querySelector('[name=checkbox-input]');
      const textArea = document.querySelector('[name=checkbox-result]');

      function handleCheckboxChange(evt) {
          textArea.value += evt.type + '; ';
      }

      checkbox.addEventListener('input', handleCheckboxChange);
      checkbox.addEventListener('change', handleCheckboxChange);
  </script>
```

## Примечания

Событие не произойдет если:
- текст не меняется, например при нажатиях клавиш вправо-влево ⇦, ⇨;
- если `<input>` имеет тип `button` или `submit`.
