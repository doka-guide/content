---
title: "Глобальные ключевые слова"
author: solarrust
summary:
    - initial
    - inherit
    - unset
    - revert
---

## Коротко

Для всех свойств CSS, помимо их стандартных значений, можно задать значения в виде ключевых слов:

- `initial`
- `inherit`
- `unset`
- `revert`

Каждое из этих слов выполняет свою функцию, но всех их объединяет то, что любые заданные до этого значения конкретного свойства будут сброшены. 

## `initial`

У каждого из свойств в CSS есть значение по умолчанию. Оно применяется ещё до того, как вы написали что-либо в вашем файле стилей. 

Ключевое слово `initial` сбрасывает все указанные значения свойства для конкретного блока до этих самых значений по умолчанию.

Например, у свойства `font-style` значение по умолчанию `normal`. Предположим, у нас есть текст, завёрнутый в `<em>`. Браузер отображает текст внутри этого тега курсивом. Обернём последнее предложение в `<span>`. По правилам текст последнего предложения тоже будет отображаться курсивом, поскольку свойство `font-style` является наследуемым. Но мы изменим это, задав для селектора `span` значение `initial` для свойства стиля текста.

```html
<em>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium quis quos soluta officia quod ipsum, molestias tempore blanditiis, earum obcaecati quas nostrum sint explicabo maiores eos in? <span>Unde, dignissimos veniam.</span></em>
```

```css
span {
  font-style: initial;
}
```

В итоге конкретно для последнего предложения текста, завёрнутого в `<span>`, будет действовать значение `normal` и текст будет отображён в нормальном начертании.

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="solarrust" data-slug-hash="ExZvRWE" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="ExZvRWE">
  <span>See the Pen <a href="https://codepen.io/solarrust/pen/ExZvRWE">
  ExZvRWE</a> by Alena (<a href="https://codepen.io/solarrust">@solarrust</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Будьте бдительны! Браузерные стили и значения свойств по умолчанию — не одно и тоже. Сверяйтесь с документацией!

## `inherit`

CSS-свойства делятся на **наследуемые** и **ненаследуемые**. 

Значения наследуемых свойств применяются не только к элементу, для которого прописаны, но и для всех вложенных дочерних элементов. 

Самым простым примером наследуемого свойства является `color`. 

Значения ненаследуемых свойств применяются исключительно для того элемента, которому прописаны. И на детей не распространяются.

Ключевое слово `inherit` позволяет явно задать наследуемость какого-то из свойств, не важно является ли оно наследуемым или нет.

Для примера возьмём абзац текста с вложенным `<span>`. Зададим для `<p>` свойство `border`. Само по себе оно является ненаследуемым, а значит вокруг вложенного в абзац `<span>` своей рамки не будет. 

Укажем для селектора `span` свойство `border` со значением `inherit`. И получим обведённое в рамочку слово, хотя явно рамку мы не прописывали — её значение было унаследовано от родителя `<p>`.

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="solarrust" data-slug-hash="oNBeMBX" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="oNBeMBX">
  <span>See the Pen <a href="https://codepen.io/solarrust/pen/oNBeMBX">
  oNBeMBX</a> by Alena (<a href="https://codepen.io/solarrust">@solarrust</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Ключевое слово `inherit` прекрасно работает и для наследуемых свойств. Все указанные для селектора значения свойства сбрасываются и наследуется то значение, которое задано родителю этого элемента.

## `unset`

Это ключевое слово ведёт себя по разному с наследуемыми и ненаследуемыми свойствами.

С наследуемыми свойствами ключевое слово `unset` ведёт себя как `inherit`.

С ненаследуемыми свойствами оно ведёт себя как `initial`. 

Ключевое слово `unset` очень удобно использовать в качестве значения свойства [`all`](/css/doka/all)(в работе). В этому случае оно само определит тип свойства и _притворится_ нужным значением.

## `revert`

Это ключевое слово сбрасывает значение свойства до указанного в стилях браузера. 

Например, если указать для `<h1>` свойство `font-size` со значением `revert`, то фактическим значением будет `2em` — ровно такой размер устанавливает браузер для заголовка первого уровня.

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="solarrust" data-slug-hash="bGgrxWz" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="bGgrxWz">
  <span>See the Pen <a href="https://codepen.io/solarrust/pen/bGgrxWz">
  bGgrxWz</a> by Alena (<a href="https://codepen.io/solarrust">@solarrust</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

