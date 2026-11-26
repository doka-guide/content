---
title: "`<optgroup>`"
description: "Группирует опции внутри выпадающего списка"
baseline:
  - group: select
    features:
      - html.elements.optgroup
authors:
  - granondo
contributors:
  - solarrust
keywords:
  - группировка опций
related:
  - html/select
  - html/form
  - js/events
tags:
  - doka
---

## Кратко

Тег `<optgroup>` группирует опции внутри элемента [`<select>`](/html/select/). Внутри тега `<optgroup>` стоят один или несколько тегов [`<option>`](/html/option/).

## Пример

```html
<label for="city">Город</label>
<select id="city">
  <optgroup label="Россия">
    <option>Москва</option>
    <option>Казань</option>
  </optgroup>
  <optgroup label="Казахстан">
    <option>Алматы</option>
    <option>Астана</option>
  </optgroup>
</select>
```

## Как пишется

Атрибуты:

- `label` — название группы. Браузер показывает его над опциями группы. Выбрать название как опцию нельзя. Задавайте атрибут всегда: без него над группой будет пустая строка.
- `disabled` — все опции внутри группы станут недоступны для выбора.

```html
<select>
  <optgroup label="Необычные цветы" disabled>
    <option>Ангулоя одноцветковая</option>
    <option>Обезьяний дракула</option>
    <option>Пассифлора инкарнатная</option>
  </optgroup>
</select>
```

Кроме того, можно применить любые [глобальные атрибуты](/html/global-attrs/).

Нельзя вкладывать один `<optgroup>` в другой.

## Как понять

В обычном `<select>` выпадающую часть списка рисует либо браузер, либо операционная система. От этого зависит, сработают ли стили `<optgroup>`:

- Chrome и Edge на Windows и Linux, а также Firefox на компьютерах рисуют её сами. В них можно поменять цвет текста и фон.
- Chrome и Safari на macOS, все браузеры на iOS и Chrome на Android отдают её системе. Там CSS почти не применяется.

В Chrome и Edge с версии 135 и Safari с версии 27 можно включить настраиваемый `<select>`. Для этого задайте [`appearance: base-select`](/css/appearance/) самому `<select>` и псевдоэлементу `::picker(select)`, то есть выпадающей части списка. Тогда выпадающую часть рисует браузер, и `<optgroup>` стилизуется как обычный блок.

В таком режиме название группы можно задать тегом [`<legend>`](/html/legend/):

- `<legend>` ставят первым внутри `<optgroup>`.
- Атрибут `label` не убирайте: без `appearance: base-select` браузеры пока берут название группы только из него. По спецификации `label` можно не писать, если в группе есть `<legend>`.

```html
<style>
  select,
  ::picker(select) {
    appearance: base-select;
  }
</style>

<select>
  <optgroup label="Оранжевые">
    <legend>Оранжевые</legend>
    <option>Коралловый</option>
    <option>Тыквенный</option>
  </optgroup>
</select>
```

В `<legend>` можно добавить неинтерактивную разметку, например иконку. Скринридер прочитает текст `<legend>` вместе с [`alt`](/html/alt/) картинок, поэтому у декоративной иконки оставьте `alt` пустым.

Скринридеры объявляют название группы не всегда: при закрытом списке его обычно не слышно, а некоторые пары браузера и скринридера пропускают его и в открытом. Поэтому текст опции должен быть понятен и без названия группы.
