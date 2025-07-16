---
---

Я использую `data-*` атрибуты, когда нужно сохранить дополнительные данные прямо в <span style="color: #FF8630;">HTML</span>. Это удобно, когда хочется передать какие-то параметры в <span style="color: #FFD829;">JavaScript</span>, не добавляя лишние классы или нестандартные атрибуты.

Например, если у меня есть список карточек, и у каждой есть свой идентификатор, я просто пишу:

```html
<article data-id="101" data-category="design">
  …
</article>
```

Потом в JS получаю всё через `element.dataset`:

```js
const article = document.querySelector('article');

console.log(article.dataset.id); // "101"
console.log(article.dataset.category); // "design"
```

Я часто применяю их для конфигурации компонентов, фильтрации, передачи состояний и всяких мелких меток. Это помогает держать данные ближе к разметке, не лезть в классы, и при этом не нарушать структуру <span style="color: #FF8630;">HTML</span>.

Важно понимать, что `data-*` — это не способ хранения сложных объектов. Я стараюсь использовать их для коротких строк, чисел и флагов. Всё более сложное — уже через <span style="color: #FFD829;">JavaScript</span> или <span style="color: #2E9AFF;">API</span>.
