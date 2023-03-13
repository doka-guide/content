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

Событие `input` возникает, когда пользователь изменяет содержимое поля для ввода информации.

Примеры таких полей:
- Текстовое поле `<textarea>` и тег `<input>` с атрибутами `type="text"` или `type="number"` и так далее;
- Нетекстовое поле тега `<input>` с атрибутами `type="file"` или `type="image"` и так далее;
- Чекбокс или радиокнопка тега `<input>` c `type="checkbox"` или `type="radio"`.

Каждое добавление и удаление символа вызывает такое событие.
Но если вставить текст из буфера обмена, то событие возникнет один раз.

## Простой пример

```html
<label>Введите текст:
    <input type="text" id="textField">
</label>
<label>При каждом изменении возникает событие <code>input</code>:
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

События `input` и `change` похожи — оба помогают отслеживать изменения в полях ввода.

Различие есть для текстовых полей ввода:
- `input` — срабатывает сразу при каждом изменении значения в поле;
- `change` — срабатывает, если после изменения убрать фокус из этого поля: например, перейти к другому полю или кликнуть на другую часть страницы.

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

Событие `input` не произойдет:
- если текст не меняется, например при нажатиях клавиш влево-вправо ⇦/⇨, Control, Alt, Shift и так далее;
- если тег `<input>` имеет атрибут `type="button"` или `type="submit"`;
- если поле изменит не пользователь, а код JS. Для такого случая, нужны дополнительные действия, например использовать `dispatchEvent()`.
