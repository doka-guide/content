Типичными случаями для использования анонимных функций в JavaScript являются [замыкания](/js/closures/#funkcii-vnutri-funkciy-i-zamykaniya), [обработчики событий](/js/element-addeventlistener/), [таймеры](/js/settimeout/) и callback-и для методов и других функций. Приведу несколько примеров:

1. Callback метода массива:

```js
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(num => num * num);

console.log(squared); // [1, 4, 9, 16, 25]
```

1. Обработчик события для HTML элемента. Стоит обратить внимание, что в таком случае не получится удалить его через [`removeEventListener`](/js/element-removeeventlistener/).

```js
document.getElementById('buttonId').addEventListener('click', () => {
  console.log('Кнопка была нажата!');
});
```

3. Замыкания:

```js
function createCounter() {
  let count = 0;

  return function () {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

4. Таймер:

```js
setTimeout(() => {
  console.log('Я сработал через 10 секунд!');
}, 10000);
```
