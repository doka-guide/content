🛠 Напрямую с DOM работают редко. Обычно работают на [уровне элементов](/js/element/).

🛠 Из-за своей древовидной структуры искать элементы по DOM можно не только от корня. В диаграмме из статьи можно найти сначала элемент `ul`, а затем искать элементы среди его потомков.

```js
let ulElement = document.getElementsByTagName('ul')[0]
// Среди потомков <ul> нашли последний <li>
let lastLi = ulElement.querySelector('li:last-child')

lastLi.style.color = 'red'
```
