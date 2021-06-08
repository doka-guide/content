---
title: "Поток документа"
authors:
  - ezhkov_d
summary:
  - раскладка
  - схлопывание
  - отступы
  - margin
  - контекст форматирования
  - флоат
  - float
  - абсолютное позиционирование
  - absolute
  - fixed
---

Поток — одно из важнейших базовых понятий в вёрстке. Это принцип организации элементов на странице при отсутствии стилей. Если мы просто напишем HTML из нескольких тегов и не напишем CSS, то отображение в браузере будет предсказуемо благодаря тому, что мы абсолютно точно знаем, как браузер располагает элементы в потоке.

Даже если к странице не подключено никаких стилей, к каждому элементу всё равно будут применяться CSS-правила, «зашитые» в движке браузера. Благодаря этим правилам мы видим заголовок `<h1>` крупнее заголовка `<h2>`, а ссылки — синими и подчёркнутыми. На основании этих правил **условно** все элементы на странице можно разделить на две категории: блочные (block) и строчные (inline). Например, `<div>` будет блочным, а `<span>` или `<a>` — строчным. Поменять стандартное поведение можно при помощи CSS-свойства [`display`](/css/display).

Если вообще не применять никаких стилей, браузер формирует из элементов **нормальный поток**. Поведение блочных элементов в нормальном потоке отличается от поведения строчных.

## Контекст форматирования

Правила расположения строчных и блочных элементов в нормальном потоке называются **контекстом форматирования**. Блочные элементы участвуют в формировании **блочного** контекста форматирования. Строчные элементы формируют **строчный** контекст форматирования. Расположение элементов в контексте форматирования зависит от направления письма для конкретного языка. Например, тексты на европейских языках мы читаем и пишем слева направо сверху вниз. Это означает, что по умолчанию контекст форматирования располагает блочные элементы сверху вниз, а строчные — слева направо. Но если рассмотреть японский язык, мы видим совершенно другую картину: блочные элементы будут располагаться слева направо, а строчные — сверху вниз.

Во всех примерах далее будет рассматриваться направление письма, характерное для европейских языков: слова — слева направо, блоки — сверху вниз. Но все те же объяснения можно применять и для другого направления письма.

## Блочные элементы в нормальном потоке

Блочные элементы в нормальном потоке располагаются друг под другом, всегда занимая всю доступную ширину родителя. Высота блочного элемента по умолчанию равна высоте его содержимого. Три абзаца, идущие друг за другом в HTML, будут располагаться точно в таком же порядке и на странице.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="poNYXmm" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="normal flow 1">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/poNYXmm">
  normal flow 1</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Если ширина блочного элемента явно задана и позволяет разместить справа ещё один такой элемент, то поток всё равно продолжит выстраивать их друг под другом.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="OJbGmrX" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="normal flow 2">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/OJbGmrX">
  normal flow 2</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Можно воспринимать блочный элемент как поплавок, который стремится всплыть на странице как можно выше. И всплывает до тех пор, пока не встретит на пути другой элемент или границу родителя.

<p class="codepen" data-height="501" data-theme-id="light" data-default-tab="html,result" data-user="ezhkov" data-slug-hash="QWGoXeo" style="height: 501px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="normal flow 1 animated">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/QWGoXeo">
  normal flow 1 animated</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## Строчные элементы в нормальном потоке

Строчные элементы располагаются друг за другом, как слова в предложении. В зависимости от направления письма в конкретном языке элементы могут располагаться слева направо (например, в русском языке), справа налево (как, например, в иврите) и даже сверху вниз, как иероглифы в японском письме. Ширина и высота строчного элемента равна ширине и высоте содержимого. В отличие от блочного элемента, мы не можем управлять шириной и высотой строчного элемента через CSS. Несколько строчных элементов будут стремиться находиться на одной строке, пока их все можно уместить в ширину родителя. Если ширины родителя не хватает, то лишний текст строчного элемента переносится на следующую строку.

<p class="codepen" data-height="213" data-theme-id="light" data-default-tab="result" data-user="ezhkov" data-slug-hash="zYoXMob" style="height: 213px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="normal flow 3">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/zYoXMob">
  normal flow 3</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## Схлопывание и выпадение отступов

В рамках блочного контекста форматирования вертикальные расстояния между блоками задаются CSS-свойством [`margin`](/css/doka/margin). Если блоку задан нижний отступ, а следующему за ним — верхний, то можно ожидать, что итоговый отступ между блоками будет равен сумме этих двух отступов. Но в соответствии со спецификацией соприкасающиеся отступы «схлопываются». То есть, как бы проваливаются один в другой. Итоговый отступ будет равен бо́льшему отступу из двух.

<p class="codepen" data-height="502" data-theme-id="light" data-default-tab="result" data-user="ezhkov" data-slug-hash="oNYRpgL" style="height: 502px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="normal flow 4">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/oNYRpgL">
  normal flow 4</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Если первому дочернему элементу в блоке задан верхний отступ или последнему элементу — нижний, то эти отступы «выпадают» во внешний мир из своего родителя.

<p class="codepen" data-height="461" data-theme-id="light" data-default-tab="result" data-user="ezhkov" data-slug-hash="LYboQpQ" style="height: 461px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="normal flow 5">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/LYboQpQ">
  normal flow 5</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Выпадение отступов из родителя можно предотвратить несколькими способами:

- задать родителю вертикальный внутренний отступ [`padding-top`](/css/doka/padding) или [`padding-bottom`](/css/doka/padding) в зависимости от того, с какой стороны мы хотим предотвратить выпадение;
- задать родителю верхнюю или нижнюю [рамку](/css/doka/border) по такой же логике. Рамка может быть прозрачной, главное, чтобы она была :);
- задать родителю свойство [`overflow`](/css/doka/overflow), отличное от `none`;
- переопределить родителю свойство [`display`](/css/display) на `flex` или `grid`.

## Выход из потока

Ранее мы выяснили, что все элементы по умолчанию находятся в нормальном потоке. Но это поведение можно поменять при помощи некоторых CSS-свойств. При изменении значений этих свойств элемент перестаёт взаимодействовать с остальными блоками в потоке. Говорят, что он «вышел из потока».

Тут нужно отметить, что элементы, вышедшие из потока, создают внутри себя своего рода мини-поток. Их дочерние элементы будут подчиняться правилам взаимодействия в потоке в пределах родителя.

### Задание свойства [`float`](/css/doka/float)

Когда мы делаем элемент плавающим, он перестаёт взаимодействовать с другими элементами блочного контекста. При этом со строчным контекстом наш плавающий блок продолжает взаимодействовать. Текстовые элементы обтекают такой блок с одной из сторон.

<p class="codepen" data-height="449" data-theme-id="light" data-default-tab="result" data-user="ezhkov" data-slug-hash="zYogdNX" style="height: 449px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="normal flow 6">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/zYogdNX">
  normal flow 6</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### Позиционирование элемента при помощи [`position`](/css/doka/position)

Если задать элементу абсолютное или фиксированное позиционирование, это также приводит к выходу из потока. Но только в этом случае наш элемент не виден даже строчному контексту.

<p class="codepen" data-height="361" data-theme-id="light" data-default-tab="result" data-user="ezhkov" data-slug-hash="RwoXYyK" style="height: 361px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="normal flow 7">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/RwoXYyK">
  normal flow 7</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

При абсолютном или фиксированном позиционировании элемент как бы поднимается над содержимым страницы, и становится «не виден» всем остальным блокам.
