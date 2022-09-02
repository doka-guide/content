🛠 Порядок ID в `aria-labelledby` имеет значение. Скринридер читает лейблы в том порядке, в каком они перечислены в атрибуте. Ещё он не повторяет лейблы, если ID дублируются.

В примере при фокусе на первом пункте скринридер прочтёт: «Вес один кг».

```html
<label id="label1" for="select">Вес</label>
<select id="select" aria-labelledby="label1 label1 select label2 label2">
  <option value="1">1</option>
  <option value="2">2</option>
</select>
<span id="label2">кг</span>
```

🛠 Полезный случай использования `aria-labelledby` — лейблы к `<section>`. Благодаря лейблам пользователи скринридеров могут использовать целые секции как оглавление и быстро перемещаться между ними.

```html
<section aria-labelledby="heading">
  <h2 id="heading">Котики как вид</h2>
  <!-- Текст про котиков -->
</section>
```
