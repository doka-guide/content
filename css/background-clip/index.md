---
title: "`background-clip`"
description: "Решаем, должен ли фон заполнять площадь всего элемента или не выходить за рамки контентной области."
baseline:
  - group: background-clip
    features:
      - css.properties.background-clip
      - css.properties.background-clip.border-box
      - css.properties.background-clip.content-box
      - css.properties.background-clip.padding-box
      - css.properties.background.background-clip
authors:
  - solarrust
keywords:
  - образка фона
related:
  - css/background-color
  - css/box-model
  - css/border
tags:
  - doka
---

## Кратко

`background-clip` обрезает фон по границам блочной модели. Самое интересное значение — `text`: тогда фон просвечивает сквозь буквы.

## Пример

Три блока с одинаковым пунктирным бордером, но разными значениями `background-clip`. Видно, как фон каждый раз занимает разную площадь:

```html
<div class="box border-box">border-box</div>
<div class="box padding-box">padding-box</div>
<div class="box content-box">content-box</div>
```

```css
.box {
  padding: 20px;
  border: 10px dashed rgb(255 255 255 / 0.4);
  background-color: #2E9AFF;
}

.border-box  { background-clip: border-box; }
.padding-box { background-clip: padding-box; }
.content-box { background-clip: content-box; }
```

<iframe title="Три значения background-clip" src="demos/example/?embed=1" height="460"></iframe>

## Как понять

Каждый элемент в CSS состоит из нескольких слоёв: контент, [`padding`](/css/padding/), [`border`](/css/border/) и [`margin`](/css/margin/). `background-clip` задаёт, до какого из этих слоёв распространяется фон — дальше фон не рисуется, обрезается.

По умолчанию фон занимает весь элемент вплоть до внешнего края рамки (`border-box`). Это кажется логичным: хочешь зелёный блок — получаешь зелёный блок целиком. Но иногда нужно иначе, например, сделать прозрачную зону под рамкой или показать фон только там, где находится текст.

Разница между значениями хорошо видна, когда у элемента есть пунктирный или прозрачный `border` и заметный `padding`.

## Как пишется

```css
.element {
  background-clip: border-box;  /* значение по умолчанию */
  background-clip: padding-box;
  background-clip: content-box;
  background-clip: text;
}
```

### `border-box`

Значение по умолчанию. Фон занимает всю площадь элемента, включая область под рамкой. Если рамка непрозрачная, фон под ней всё равно есть — он просто не виден.

### `padding-box`

Фон не заходит под рамку — он останавливается у её внутреннего края. При прозрачной или пунктирной рамке сквозь неё будет виден фон страницы или родительского элемента, а не фон самого блока.

Популярный приём — полупрозрачная рамка поверх цветного фона. Сквозь рамку просвечивает фон страницы, а не фон самого элемента — получается эффект двойной границы без лишних элементов:

```css
.card {
  background-color: #F498AD;
  border: 6px solid rgb(255 255 255 / 0.4);
  background-clip: padding-box;
}
```

С `border: 6px solid transparent` зазор будет полностью прозрачным — виден только родитель.

<iframe title="Зазор между фоном и рамкой" src="demos/clip-trick/?embed=1" height="260"></iframe>

### `content-box`

Фон ограничен только контентной областью. Ни рамка, ни внутренние отступы не закрашиваются. При заметном `padding` и `border` вокруг фонового блока будет широкая прозрачная рамка.

### `text`

Самое необычное значение: фон обрезается по форме текста. Чтобы это было видно, нужно сделать текст прозрачным через [`color: transparent`](/css/color/) — без этого непрозрачный текст просто перекроет фон. В результате буквы как будто «наполнены» фоновым изображением или градиентом. Популярный приём для заголовков.

Если текст переносится на несколько строк, градиент пересчитывается для каждого элемента отдельно, исходя из его `background-origin`-блока. Результат может быть неожиданным: вместо одного плавного перехода получится несколько коротких.

```css
.gradient-text {
  background-image: linear-gradient(to right, #2E9AFF, #F498AD);
  background-clip: text;
  color: transparent;
}
```

<iframe title="Текст с градиентным фоном" src="demos/text/?embed=1" height="320"></iframe>

<aside>

💡 Исторически значение `text` требовало вендорного префикса: `-webkit-background-clip: text`. Сегодня все современные браузеры поддерживают его без префикса, но в старых проектах вы ещё можете встретить оба варианта вместе.

</aside>

### Несколько фонов

Если у элемента несколько фоновых изображений, можно задать разное `background-clip` для каждого через запятую, в том же порядке, что и в [`background-image`](/css/background-image/):

```css
.element {
  background-image: url("pattern.png"), linear-gradient(#2E9AFF, #F498AD);
  background-clip: content-box, border-box;
}
```

<iframe title="Два фона с разными значениями background-clip" src="demos/multiple/?embed=1" height="450"></iframe>

## Подсказки

💡 `background-clip` влияет только на то, где фон _отрисовывается_. Откуда фон _начинается_ — это зона ответственности [`background-origin`](/css/background-origin/). Эти два свойства часто используют вместе, чтобы получить точный контроль над фоном.

💡 Сокращённое свойство [`background`](/css/background/) тоже принимает `background-clip`, но писать его там неудобно из-за длинного синтаксиса. Лучше задавать `background-clip` отдельно.

```css
/* в шорткате:
  последние два <box>-значения —
  это background-origin и background-clip
*/
.card {
  background:
    url("texture.png") center / cover no-repeat padding-box content-box;
}

/* отдельными свойствами, сразу видно что за что отвечает */
.card {
  background-image: url("texture.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-origin: padding-box;
  background-clip: content-box;
}
```
