---
title: "`:empty`"
description: "Как в CSS определить, что элемент пустой? Легко! При помощи этого псевдокласса."
authors:
  - ezhkov
contributors:
  - skorobaeus
  - rrramble
editors:
  - tachisis
keywords:
  - псевдокласс
  - пустой элемент
related:
  - css/before
  - css/pseudoclasses
tags:
  - doka
---

## Кратко

Псевдокласс `:empty` используется для выбора пустых элементов. Пустыми считаются элементы без потомков и текста.

## Пример

```html
<div>
  <h6>Без :empty</h6>
  <p>Если человеку...</p>
  <footer class="reactions"><span>🤔</span></footer>
</div>

<div>
  <h6>С :empty</h6>
  <p>Если заменить...</p>
  <footer class="reactions with-empty"><span>😁</span></footer>
</div>
```

```css
.reactions {
  border: 1px solid blue;
  border-radius: 16px;
  padding: 5px;
  background-color: #123E66;
}

.with-empty:empty {
  display: none;
}
```

В примере выше реакции на сообщения будут вставлены в блок с классом `reactions`. Ему заданы внутренние отступы, фоновый цвет и рамка. Если реакций нет, то блок останется пустым и будет скрыт.

Без использования псевдокласса `:empty` на экране останется пустой элемент с внутренними отступами, фоном и рамкой.

<iframe title="Скрывание пустого элемента при помощи псевдокласса" src="demos/index/" height="500"></iframe>

## Как понять

Не будут пустым следующий контент:

- другие теги;
- текстовый контент, включая пробельные элементы (пробел, невидимый пробел, табуляция, переносы строк).

Будет пустым следующий контент:

- HTML-комментарии;
- текст, указанный с помощью CSS-атрибута [`content`](https://doka.guide/css/content/);
- псевдоэлементы.


Например, у этих элементов есть потомки:

```html
<div> </div>

<div>
  <!-- test -->
</div>

<div>
</div>
```

В первом случае потомком является пробел, во втором и третьем — символы переноса строк.

А вот следующие `<div>`-элементы браузер будет считать пустыми:

```html
<style>
  .has-content {
    content: 'Есть атрибут content';
  }

  .has-pseudo:before {
    content: 'Есть псевдокласс :before';
  }
</style>


<div></div>

<div><!-- test --></div>

<div class="has-content"></div>

<div class="has-pseudo"></div>
```

В первом случае — внутри тега нет ничего.

Во втором случае — внутри тега присутствует только комментарий.

В третьем случае — имеется только CSS-атрибут `content`.

В четвертом случае — имеется псевдоэлемент `:before`.
