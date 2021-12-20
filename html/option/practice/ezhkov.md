🛠 К сожалению браузер не предоставляет никаких средств для нормальной стилизации элемента `<option>`, и это доставляет очень много головной боли фронтенд-разработчикам :( Стиль элементов `<option>` можно поменять, только если тегу [`<select>`](/html/select/) задан атрибут `multiple`. Тогда список целиком становится частью потока страницы, и мы имеем возможность применять стили к его элементам:

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
