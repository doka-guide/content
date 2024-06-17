---
title: "`input`"
description: "`Событие, срабатывающее каждый раз при изменении значения."
authors:
  - tarahovmaksim
  - rrramble
related:
  - html/input
  - html/select
  - js/event-change
tags:
  - doka
---

## Кратко

Событие `input` возникает, когда пользователь изменяет содержимое поля для ввода информации.

Примеры таких полей:

- [`<textarea>`](/html/textarea/);
- [`<input>`](/html/input/) с текстовым содержимым (атрибуты `type="text"` или `type="number"`);
- `<input>` с нетекстовым содержимым (атрибуты `type="file"` или `type="image"`);
- `<input>` в виде чекбокса (`type="checkbox"`) или радиокнопки (`type="radio"`);
- [`<select>`](/html/select/).

Событие `input` возникает, когда [DOM-дерево](/js/dom/#iz-chego-sostoit-dom) обновляется или вот-вот обновится. Если пользователь вставит текст из буфера обмена, то событие `input` возникнет один раз. Если же пользователь печатает текст, то событие `input` возникает после добавления и удаления каждого символа.

<iframe title="Примеры события input в JavaScript" src="demos/input-in-form/" height="600"></iframe>

## Простой пример

```html
<label>
  Введите текст:
  <input type="text" id="textField">
</label>

<label>
  При каждом изменении возникает событие <code>input</code>:
  <textarea disabled id="textResult"></textarea>
</label>

<script>
  var inputTextField = document.getElementById('textField')
  var outputTextField = document.getElementById('textResult')

  inputTextField.oninput = function() {
      outputTextField.value = inputTextField.value
  }
</script>
```

## Как пишется

```js
const textInput = document.querySelector('input[type=text]')

function callback(evt) {
  console.log(`Произошло событие ${evt.type}`)
}

textInput.addEventListener('input', callback)
```

Если ввести в текстовое поле слово «Дока» и щёлкнуть вне этого поля, в консоли будут показаны сообщения: «4 раза: Произошло событие `input`».

## Отличие от события `change`

События `input` и `change` похожи — оба помогают отслеживать изменения в полях ввода.

Различие есть для текстовых полей ввода:

- `input` — срабатывает при каждом изменении значения в поле;
- `change` — срабатывает, когда изменяемый элемент теряет фокус. Например, при переходе к другому полю или клику на другую часть страницы.

<iframe title="Разница между input и change" src="demos/input-change-difference/" height="500"></iframe>

Для прочих полей ввода они работают одинаково:

```html
<label>
  Кликните:
  <input type="checkbox" name="checkbox-input">
</label>

<label>
  Типы событий:
  <textarea disabled name="checkbox-result"></textarea>
</label>

<script>
  const checkbox = document.querySelector('[name=checkbox-input]')
  const textArea = document.querySelector('[name=checkbox-result]')

  function handleCheckboxChange(evt) {
      textArea.value += evt.type + '; '
  }

  checkbox.addEventListener('input', handleCheckboxChange)
  checkbox.addEventListener('change', handleCheckboxChange)
</script>
```

## Примечания

Событие `input` не произойдёт, если:

- текст не меняется, например, при нажатиях клавиш влево <kbd>⇦</kbd>, вправо <kbd>⇨</kbd>, <kbd>Control</kbd>, <kbd>Alt</kbd>, <kbd>Shift</kbd>;
- тег `<input>` имеет атрибут `type="button"` или `type="submit"`;
- поле изменит не пользователь, а JavaScript-код. Чтобы в этом случае получить событие `input`, нужны дополнительные действия. К примеру, использовать [`dispatchEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent).
