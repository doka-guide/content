---
title: "`<option>`"
description: "Один пункт в раскрывающемся списке `<select>`."
authors:
  - ezhkov
contributors:
  - skorobaeus
  - starhamster
keywords:
  - пункт
  - выбор
related:
  - html/form
  - js/form-data
  - css/required
tags:
  - doka
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

<iframe title="Стандартный выпадающий список" src="demos/default/" height="150"></iframe>

## Подробно

Тегом `<option>` размечается каждый элемент выпадающего списка [`<select>`](/html/select/), группы опций [`<optgroup>`](/html/optgroup/) или перечня [`<datalist>`](/html/datalist/).

## Атрибуты

### `disabled`

Атрибут булевого типа. Если задан, то пункт списка нельзя выбрать. Часто браузеры выделяют такой элемент управления серым цветом, и на нём не срабатывают события клика или фокуса. Даже если атрибут не задан, элемент всё равно может быть отключён, если находится внутри тега `<optgroup>` с заданным атрибутом `disabled`.

```html
<select name="city1">
  <option value="">-- Выберите город --</option>
  <option value="petersburg">Санкт-Петербург</option>
  <option value="moscow">Москва</option>
  <option value="kazan">Казань</option>
  <option value="samara" disabled>Самара</option>
  <option value="perm">Пермь</option>
  <option value="novosibirsk">Новосибирск</option>
</select>
```

<iframe title="Атрибут disabled" src="demos/disabled-attribute/" height="150"></iframe>

### `label`

Значение этого атрибута задаёт текст пункта в списке. Если атрибут не задан, то в качестве значения берётся текстовое содержимое тега `<option>`.

```html
<select name="city2">
  <option value="petersburg" selected label="Ленинград">Санкт-Петербург</option>
  <option value="samara" label="Куйбышев">Самара</option>
  <option value="volgograd" label="Сталинград">Волгоград</option>
  <option value="ekaterinburg" label="Свердловск">Екатеринбург</option>
</select>
```

Несмотря на то, что задано текстовое содержимое тега `<option>`, в выпадающем списке отображаются значения из атрибутов `label`:

<iframe title="Атрибут label" src="demos/label-attribute/" height="150"></iframe>

### `selected`

Атрибут булевого типа. Если он задан, это означает, что пункт списка будет выбран по умолчанию. Если у выпадающего списка [`<select>`](/html/select/) не задан атрибут `multiple`, то атрибут `selected` может быть задан только одному тегу `<option>` в пределах этого списка. Если тегу `<select>` задан атрибут `multiple`, то атрибут `selected` может быть задан любому количеству тегов `<option>` в пределах списка.

```html
<select name="city3">
  <option value="">-- Выберите город --</option>
  <option value="petersburg">Санкт-Петербург</option>
  <option value="moscow">Москва</option>
  <option value="kazan" selected>Казань</option>
  <option value="samara">Самара</option>
  <option value="perm">Пермь</option>
  <option value="novosibirsk">Новосибирск</option>
</select>
```

```html
<select name="city4" multiple size="6">
  <option value="petersburg">Санкт-Петербург</option>
  <option value="moscow" selected>Москва</option>
  <option value="kazan" >Казань</option>
  <option value="samara" selected>Самара</option>
  <option value="perm">Пермь</option>
  <option value="novosibirsk">Новосибирск</option>
</select>
```

<iframe title="Атрибут selected" src="demos/selected-attribute/" height="380"></iframe>

### `value`

Если выбран какой-то пункт списка, то при отправке формы на сервер будет передано значение атрибута `value` этого пункта. Если атрибут не задан, то при отправке будет использоваться текстовое содержимое тега `<option>`.
