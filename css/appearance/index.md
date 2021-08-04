---
title: "appearance"
authors:
  - ezhkov
editors:
  - tachisis
keywords:
  - отображение
tags:
  - doka
---

## Кратко

Некоторые элементы форм имеют уникальный внешний вид в каждой операционной системе. Например, выпадающий список в macOS внешне выглядит совсем не так, как такой же выпадающий список в Windows.

Свойство `appearance` позволяет задавать внешний вид одних элементов другим элементам. При этом браузер будет отрисовывать их с учётом текущей операционной системы пользователя и темы оформления.

В настоящее время используется в основном `appearance: none` для сброса системных стилей, остальные значения не работают практически ни в одном браузере.

## Как это понять

Свойство `appearance` может использоваться как для задания, так и для сброса внешнего вида элемента.

### Сбрасываем внешний вид

Если задать `appearance: none`, то происходит «сброс» внешнего вида элемента. Приведение его к общему знаменателю во всех браузерах и всех операционных системах.

Например, в браузере Safari на iOS поле ввода с атрибутом `type="search"` принудительно стилизуется скруглёнными углами, тенями и рамками. Чтобы не перекрывать каждое свойство по отдельности, можно задать такому полю `appearance: none`.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="wvoBLXP" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="appearance">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/wvoBLXP">
  appearance</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

![Изменение вида текстового поля на мобильных с поискового на обычное с помощью appearance: none](images/1.png)

Если пример открыть _не в мобильном браузере_, то разница не заметна, так как в десктопных браузерах внешний вид полей ввода более или менее унифицирован.

### Меняем внешний вид элемента

Значение `appearance`, отличное от `none`, задаётся, чтобы применить специфичные для платформы стили к элементам, у которых этих стилей нет.

В этом случае, если нам нужно, чтобы поле ввода выглядело как поле поиска, мы можем задать `appearance: searchfield`

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="abBzezO" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="appearance 2">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/abBzezO">
  appearance 2</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

![Изменение вида текстового поля на мобильных с обычного на поисковое с помощью appearance: searchfield](images/2.png)

## Как пишется

```css
appearance: none;
/* Значение по умолчанию */
appearance: auto;
```

:::callout 💡

Можно заметить, что в примерах выше некоторые CSS-свойства начинаются с префиксов `-moz-`, `-webkit` или `-ms-`. Такие префиксы называются **вендорными** и используются довольно редко. Вендорными префиксами снабжаются те CSS-свойства, которые ещё официально не утверждены стандартом, либо пока не поддерживаются браузером в полной мере. Так, например, свойства с префиксом `-moz-` будут применяться только браузером на движке `Gecko` (Mozilla Firefox).

:::
