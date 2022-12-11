🛠 Раньше браузеры не предоставляли никаких средств для нормальной стилизации элемента `<option>`, и это доставляло очень много головной боли фронтенд-разработчикам :( Стиль элементов `<option>` можно было поменять, только если тегу [`<select>`](/html/select/) был задан атрибут `multiple`. Тогда список целиком становился частью потока страницы, и мы имели возможность применять стили к его элементам. Вот как выглядело решение:

```html
<select name="city" id="city-select" multiple>
  <option value="petersburg">Санкт-Петербург</option>
  <option value="moscow">Москва</option>
  <option value="kazan">Казань</option>
  <option value="samara">Самара</option>
  <option value="perm">Пермь</option>
  <option value="novosibirsk">Новосибирск</option>
</select>
```

```css
select {
  counter-reset: cnt;
}

option:nth-child(2n) {
  background-color: #282a2e;
}

option {
  counter-increment: cnt;
}

option::before {
  content: counter(cnt) ". ";
}
```

<iframe title="Стилизация option" src="../demos/option-styles/" height="220"></iframe>

Теперь практически все браузеры умеют стилизовать `<option>` даже без атрибута `multiple`.

<aside>

⚠️ В Safari стилизация для `<option>` доступна не полностью, даже если тег имеет атрибут `multiple`.

</aside>
