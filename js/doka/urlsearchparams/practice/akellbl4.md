### Формирование url для запроса в API

Хорошо подходит для формирования строки адреса при запросе в API. Например если нужно сделать запрос с фильтрами или другими параметрами поиска.

Если мы будем делать это без `URLSearchParams`:

```js
const params = {
  size: "xl",
  count: 10,
  page: 2,
};

// формируем строку вручную
const paramsString = Object.entries(params)
  .map(
    ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  )
  .join("&");

fetch(`/catalog/t-shirts?${paramsString}`);
```

`URLSearchParams` упрощает решение этой задачи:

```js
const paramsString = new URLSearchParams({
  size: "xl",
  count: 10,
  page: 2,
}).toString();

fetch(`/catalog/t-shirts?${paramsString}`);
```

### Парсинг параметров из URL

Так как `URLSearchParams` может получать параметры в виде строки, то так же может быть использован как парсер текущего адреса страницы. Так мы можем без труда модифицировать их и обновлять адрес.

```js
const params = new URLSearchParams(window.location.search);

params.append("size", "lg");

window.location.assign(
  `${window.location.origin}${window.location.pathname}?${params.toString()}`
);
```
