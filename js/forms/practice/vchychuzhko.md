🛠 По коллекции можно пройтись методами, предусмотренными для массивов, но сперва необходимо обернуть её в метод [`Array.from()`](/js/array-from/) или использовать цикл `for...of`:

```js
Array.from(document.forms).forEach((form) => {
  console.log(form)
})

for (const form of document.forms) {
  console.log(form)
}
```

🛠 Формы, которым задан атрибут `name`, также попадают и в сам объект `document`. К ним можно обращаться напрямую, в обход коллекции `document.forms`:

```js
document.myFormName
```
