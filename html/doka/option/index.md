---
title: "<option>"
author: ezhkov
summary:
  - тэг
  - тег
  - пункт
  - "<option>"
  - выбор
---

## Кратко

Тег `<option>` используется в интерактивных элементах управления для вёрстки одиночного пункта списка.

## Пример

```html
<form>
  <label for="city-select">Ваш город</label>
  <select name="city" id="city-select">
    <option value="">-- Выберите город --</option>
    <option value="petersburg">Санкт-Петербург</option>
    <option value="moscow">Москва</option>
    <option value="kazan">Казань</option>
    <option value="samara">Самара</option>
    <option value="perm">Пермь</option>
    <option value="novosibirsk">Новосибирск</option>
  </select>
</form>
```

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="dypzXYW" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="&amp;lt;select&amp;gt;">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/dypzXYW">
  &lt;select&gt;</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## Подробно

Тегом `<option>` размечается каждый элемент выпадающего списка [`<select>`](/html/doka/select/), группы опций [`<optgroup>`](/html/doka/TODO) (в работе) или перечня [`<datalist>`](/html/doka/TODO) (в работе).

## Атрибуты

### `disabled`

Атрибут булевого типа. Если задан, то пункт списка нельзя выбрать. Часто браузеры выделяют такой элемент управления серым цветом, и на нём не срабатывают события клика или фокуса. Даже если атрибут не задан, элемент всё равно может быть отключён, если находится внутри тега `<optgroup>` с заданным атрибутом `disabled`.

### `label`

Значение этого атрибута задаёт текст пункта в списке. Если атрибут не задан, то в качестве значения берётся текстовое содержимое тега `<option>`.

```html
<select name="city" id="city-select">
  <option value="petersburg" selected label="Ленинград">Санкт-Петербург</option>
  <option value="samara" label="Куйбышев">Самара</option>
  <option value="volgograd" label="Сталинград">Волгоград</option>
  <option value="ekaterinburg" label="Свердловск">Екатеринбург</option>
</select>
```

В примере выше, несмотря на то, что задано текстовое содержимое тега `<option>`, в выпадающем списке отображаются значения из атрибутов `label`.

### `selected`

Атрибут булевого типа. Если он задан, это означает, что пункт списка будет выбран по умолчанию. Если у выпадающего списка [`<select>`](/html/doka/select/) не задан атрибут `multiple`, то атрибут `selected` может быть задан только одному тегу `<option>` в пределах этого списка. Если тегу `<select>` задан атрибут `multiple`, то атрибут `selected` может быть задан любому количеству тегов `<option>` в пределах списка.

### `value`

Если выбран какой-то пункт списка, то при отправке формы на сервер будет передано значение атрибута `value` этого пункта. Если атрибут не задан, то при отправке будет использоваться текстовое содержимое тега `<option>`.

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="RwGLYaB" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="&amp;lt;option&amp;gt; attributes">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/RwGLYaB">
  &lt;option&gt; attributes</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
