Иногда мы пользуемся какими-то API даже того не замечая, а иногда не можем разобраться, чего от нас хотят. Вот два разных примера:

### Браузерное API

Одни из самых знакомых фронтенд-разработчикам API — браузерные :–) Всё, что по умолчанию есть в `window` — это браузерное API.

Мы описали самые важные из них в статье [«Браузерное окружение, BOM»](/js/bom/)

![скриншот доступных браузерных API](../images/screenshot.png)

Когда мы пользуемся консолью для отладки, мы тоже используем это API:

```js
console.log("Is the error here?")
```

Или когда обращаемся к `localStorage`:

```js
localStorage.setItem("key", "value")
```

### [Twitter API](https://developer.twitter.com/en/docs/twitter-api)

У Твитера, в принципе, не самое плохое API, которое можно встретить, хотя и дико запутанная документация.

Например, чтобы [получить список твитов](https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets):

1. Надо использовать метод GET.
2. URL для запроса — `https://api.twitter.com/2/tweets`.
3. Обязательный аргумент — `ids`, чтобы указать, какие именно твиты надо получить. Технически вот этот адрес: `https://api.twitter.com/2/tweets?ids=1261326399320715264,1278347468690915330` запрошенный через GET должен сработать, но нужно использовать HTTP-заголовки для аутентификации
4. `Authorization: Bearer $BEARER_TOKEN`

И только при выполнении всех эти условий, можно получить ответ на запрос:

```js
const response = await fetch(
  "https://api.twitter.com/2/tweets?ids=1261326399320715264,1278347468690915330",
  {
    // можно не указывать, так как он по умолчанию
    method: "GET",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  }
)

await response.json()
```

Ответ:

```json
{
  "data": [
    {
      "id": "1261326399320715264",
      "text": "Tune in to the @MongoDB @Twitch stream featuring our very own @suhemparack to learn about Twitter Developer Labs - starting now! https://t.co/fAWpYi3o5O"
    },
    {
      "id": "1278347468690915330",
      "text": "Good news and bad news: \n\n2020 is half over"
    }
  ]
}
```
