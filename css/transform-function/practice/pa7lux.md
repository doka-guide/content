🛠 Полезное знание при работе с функциями трансформации из JavaScript.

Если мы вычисляем значение функции трансформации, заданной в CSS, методом `getComputedStyle()`, получим матрицу преобразований. А в случае получения значения из свойства `style` по ключу — получим строку с описанием функции трансформации.

Допустим, на странице есть `div` с такой трансформацией, описанной в CSS:
```css
div {
  transform: translate(200px);
}
```
Вычисление из JS методом `getComputedStyle()` вернёт значение `matrix(1, 0, 0, 1, 200, 0)`:

```javascript
const element = document.querySelector('div');
console.log(getComputedStyle(element).transform);
```
Но если стиль задан инлайном в HTML,

```html
<div style="transform: translate(200px);"></div>
```
вы можете получить строку с более удобным для чтения и дальнейшей работы значением.

Код ниже вернёт строку `translate(200px)`

```javascript
const element = document.querySelector('div');
console.log(element.style.transform);
```
