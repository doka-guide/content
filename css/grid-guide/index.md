---
title: "Гайд по grid"
cover:
  desktop: 'images/cover.png'
authors:
  - solarrust
contributors:
  - corocoto
keywords:
  - grid
  - display: grid
  - Grid Layout
  - грид-контейнер
  - грид-элемент
  - грид-линия
  - грид-ячейка
  - грид-полоса
  - грид-область
  - grid-template-columns
  - grid-template-rows
  - repeat()
  - fr
  - grid-auto-columns
  - grid-auto-rows
  - grid-auto-flow
  - dense
  - grid-template-areas
  - grid-template
  - column-gap
  - row-gap
  - gap
  - justify-items
  - align-items
  - place-items
  - grid-column-start
  - grid-column-end
  - grid-row-start
  - grid-row-end
  - grid-column
  - grid-row
  - grid-area
  - justify-self
  - align-self
  - place-self
  - minmax()
  - min-content
  - max-content
tags:
  - article
---

## Что это?

Гриды — удобная технология для расположения элементов на странице, дающая возможность работать сразу с двумя измерениями — горизонталью и вертикалью — в отличие от [флексбоксов](/css/flexbox-guide), позволяющих одновременно работать только с одним измерением.

CSS Grid Layout ([спецификация](https://www.w3.org/TR/css-grid-1/)) или просто гриды были придуманы и реализованы с одной только целью — дать удобный инструмент для создания раскладки элементов на веб-страницах. На заре появления веб-сайтов был популярный способ создания чего-то чуть интереснее одноколоночного документа — таблицы. Но проблема была в том, что таблицы создавались не для этого. Даже если отбросить семантическую нагруженность этого элемента, отдельные свойства для стилизации были крайне неудобны. По факту это был костыль за неимением более удачных способов.

Принцип работы гридов чем-то похож на таблицы. Вместо работы только с рядами или колонками с их помощью можно работать с так называемыми ячейками, позиционируя элементы по вертикали и горизонтали одновременно.

Предостережение: не используйте гриды, если сайт должен корректно работать в браузере IE 11 и ниже. Если в вашем зоопарке есть старые браузеры, то проверяйте поддержку технологии на [Can I use](https://caniuse.com/css-grid).

В этом гайде описаны не все возможные значения, а только самые используемые и устоявшиеся. По причине того, что технология находится на стадии активного развития и внедрения что-то в ней может меняться. Пожалуйста, обращайтесь к спецификации, если не нашли чего-то в этом гайде.

## Основные термины

- **грид-контейнер:** родительский элемент, к которому применяется свойство `display: grid`.
- **грид-элемент**: дочерний элемент, прямой потомок грид-контейнера. Подчиняется правилам раскладки гридов.
- **грид-линия**: разделительная линия, формирующая структуру грида. Может быть как вертикальной (_грид-линия колонки_), так и горизонтальной (_грид-линия ряда_). Располагается по обе стороны от колонки / ряда. Используется для привязки грид-элементов.

![Схематичный вид грид-линии колонки](images/1.png)

Синяя линия — грид-линия колонки

- **грид-ячейка**: пространство между двумя соседними грид-линиями колонок и рядов. Одна единица грид-сетки.

![Схематичный вид грид-ячейки между 1 и 2 грид-линиями ряда и 2 и 3 грид-линиями колонки](images/2.png)

Грид-ячейка между 1 и 2 грид-линиями ряда и 2 и 3 грид-линиями колонки

- **грид-полоса**: пространство между двумя соседними грид-линиями. Может быть проще думать о грид-полосе как о ряде или колонке.

![Схематичный вид горизонтальной грид-полосы между 1 и 2 грид-линиями ряда](images/3.png)

Горизонтальная грид-полоса между 1 и 2 грид-линиями ряда

- **грид-область**: область, ограниченная четырьмя грид-линиями. Может состоять из любого количества ячеек как по горизонтали, так и по вертикали.

![Схематичный вид грид-области между 1 и 3 грид-линиями ряда и 1 и 2 грид-линиями колонки](images/4.png)

Грид-область между 1 и 3 грид-линиями ряда и 1 и 2 грид-линиями колонки.

## Свойства грид-контейнера

### `display`

```css
.container {
  display: grid;
}
```

Если элементу задано свойство `display` со значением `grid`, то такой элемент становится грид-контейнером. Дочерние элементы такого контейнера начинают подчиняться правилам грид-раскладки. Снаружи грид-контейнер ведёт себя как блок.

```css
.container {
  display: inline-grid;
}
```

Практически аналогичное предыдущему значению за тем исключением, что снаружи грид-контейнер, созданный с помощью `inline-grid` будет вести себя как строчный элемент.

Поддерживается всеми современными браузерами. [Проверить поддержку](https://caniuse.com/mdn-css_properties_display_grid)

### `grid-template-columns`, `grid-template-rows`

Свойства, задающие размеры и количество колонок или рядов грид-раскладки соответственно.

```css
.container {
  display: grid;
  grid-template-columns: 40px auto 40%; /* будет создано 3 колонки */
  grid-template-rows: 250px 5vw 15rem; /* будет создано 3 ряда */
}
```

![Пример реализации свойств grid-template-columns, grid-template-rows](images/5.png)

Можно явно именовать грид-линии, используя для этого квадратные скобки

```css
.container {
  display: grid;
  grid-template-columns: [start] 140px [line2] 250px [line3] 40px [end];
  grid-template-rows: [row1-start] 25rem [row1-end] 10vh [last];
}
```

![Пример реализации свойств grid-template-columns, grid-template-rows с использованием наименования грид-линий с помощью квадратных скобок](images/6.png)

Каждая линия может иметь больше одного имени. Это чем-то похоже на классы в HTML. Одному элементу вы можете задать больше одного класса. Тут аналогичная ситуация. Например, такой код будет совершенно валиден, у второй и третьей грид-линий колонки по два имени:

```css
.container {
  display: grid;
  grid-template-columns: [start] 140px [line2 col2-start] 250px [col2-end end];
  grid-template-rows: [row1-start] 25rem [row1-end] 10vh [last];
}
```

Если нужны одинаковые колонки или ряды, то можно воспользоваться функцией `repeat()`.

Будет создано 3 колонки по 250px:

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 250px);
}
```

С появлением гридов у нас появилась и новая единица измерения `fr` 🦊

`fr` (от _fraction_ — доля, часть) отвечает за свободное пространство внутри грид-контейнера.

Например, этот код создаст три колонки, каждая из которых будет занимать 1/3 ширины родителя:

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

Что аналогично записи:

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

Свободное пространство рассчитывается после того, как место отдано всем фиксированным размерам. К примеру, в коде ниже сначала будет создана колонка шириной 200px, а затем свободное пространство — ширина родителя минус 200px — будет поделено между остальными колонками. Каждая будет занимать ширину (100% - 200px) / 2:

```css
.container {
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
}
```

Поддерживается всеми современными браузерами. Проверить поддержку свойства и значений: [grid-template-columns](https://caniuse.com/?search=grid-template-columns) [grid-template-rows](https://caniuse.com/?search=grid-template-rows)

### `grid-auto-columns`, `grid-auto-rows`

Если элементов внутри грид-контейнера больше, чем может поместиться в объявленные явно ряды и колонки, то для них создаются автоматические, неявные ряды и колонки. При помощи свойств `grid-auto-columns` и `grid-auto-rows` можно управлять размерами этих автоматических рядов и колонок.

```css
.container {
  display: grid;
  grid-template-rows: 50px 150px;
  grid-auto-rows: 15px;
  grid-gap: 10px;
}

.item {
  background: lightblue;
}

.item:nth-child(n + 3) {
  background: pink;
}
```

![Пример реализации свойств grid-auto-columns, grid-auto-rows](images/7.png)

В этом примере создаётся две явные колонки размером 50 и 150 пикселей соответственно. Элементы начиная с третьего в эти два ряда не помещаются и для них создаются автоматические ряды. При помощи свойства `grid-auto-rows` мы указываем, что автоматические ряды должны иметь размер 15 пикселей.

Можно задавать больше одного значения для автоматических колонок или рядов. Тогда паттерн размера будет повторяться до тех пор, пока не кончатся грид-элементы.

```css
.container {
  display: grid;
  grid-template-columns: 50px 150px;
  grid-auto-columns: 15px 25px 5px;
  grid-gap: 10px;
  grid-auto-flow: column; /* Важно указать, что элементы должны вставать в колонки */
}

.item {
  min-height: 50px; /* Чтобы элементы без контента были видны */
  background: lightblue;
}

.item:nth-child(n + 3) {
  background: pink;
}
```

![Пример реализации свойств grid-auto-columns, grid-auto-rows с разными размерами колонок](images/8.png)

Как видите, автоматически создаются колонки размером 15, 25 и затем 5 пикселей. И так до тех пор, пока элементы не закончатся.

Поддерживается всеми современными браузерами. Проверить поддержку свойства и значений: [grid-auto-columns](https://caniuse.com/mdn-css_properties_grid-auto-columns) [grid-auto-rows](https://caniuse.com/mdn-css_properties_grid-auto-rows)

### `grid-auto-flow`

Если грид-элементов больше, чем явно объявленных колонок или рядов, то они автоматически размещаются внутри родителя. А вот каким образом — в ряд или в колонку — можно указать при помощи свойства `grid-auto-flow`. По умолчанию значение у этого свойства `row`, _лишние_ элементы будут выстраиваться в ряды в рамках явно объявленных колонок.

Возможные значения:

- `row` (значение по умолчанию) — автоматически размещаемые элементы выстраиваются в ряды.
- `column` — автоматически размещаемые элементы выстраиваются в колонки.
- `dense` — браузер старается заполнить _дырки_ (пустые клетки) в разметке, если размеры элементов позволяют. Можно сочетать с остальными значениями.

Примеры работы этого свойства удобнее всего изучать в случае, когда есть большой блок, который не помещается в одну грид-ячейку.

```css
.container {
  display: grid;
  grid-template-columns: auto auto auto; /* Три колонки */
  grid-template-rows: auto auto; /* Два ряда */
  grid-gap: 10px; /* Отступы между ячейками */
  grid-auto-flow: row; /* Автоматическое размещение в ряд */

  /* Для красоты */
  padding: 10px;
  background: #f1f1f1;
}

.item {
  min-height: 50px;
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
  line-height: 1;
  background: lightblue;
}

.item3 {
  grid-column: span 2; /* Занимает один ряд и растягивается на две колонки */
  background: pink;
}
```

![Пример реализации свойства grid-auto-flow со значением row](images/9.png)

Как видите, третий элемент не поместился в последнюю ячейку первого ряда и был перенесён в следующий ряд. Следующий за ним четвёртый элемент встал в ближайшую доступную ячейку во втором ряду.

Добавим к значению свойства `grid-auto-flow` слово `dense`:

```css
.container {
  grid-template-columns: auto auto auto;
  /* -//-//- */
  grid-auto-flow: row dense; /* Автоматическое размещение в ряд */
}
```

![Пример реализации свойства grid-auto-flow со значением row dense](images/10.png)

Теперь четвёртый элемент встал в ряд, но занял при этом пустую ячейку в первом ряду. Браузер старается закрыть все _дырки_ в сетке, переставляя подходящие элементы на свободные места.

Посмотрим пример со значением `column`.

```css
.container {
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto;
  /* -//-//- */
  grid-auto-flow: column; /* Автоматическое размещение в колонку */
}

.item3 {
  grid-row: span 2;
}
```

![Пример реализации свойства grid-auto-flow со значением column](images/11.png)

Видим аналогичную картину: 3 элемент не поместился в последнюю ячейку первой колонки и встал во вторую колонку. Следующий за ним 4 элемент встал ниже во второй колонке.

Добавим `dense` к текущему значению.

```css
.container {
  /* -//-//- */
  grid-auto-flow: column dense; /* Автоматическое размещение в ряд */
}
```

![Пример реализации свойства grid-auto-flow со значением column dense](images/12.png)

В результате 4 элемент занял пустую ячейку в первой колонке.

Поддерживается всеми современными браузерами. [Проверить поддержку свойства](https://caniuse.com/mdn-css_properties_grid-auto-flow)

### `grid-template-areas`

Позволяет задать шаблон сетки расположения элементов внутри грид-контейнера. Имена областей задаются при помощи свойства `grid-area`. Текущее свойство `grid-template-areas` просто указывает, где должны располагаться эти грид-область.

Возможные значения:

- none (значение по умолчанию) — области сетки не задано имя.
- `.` — означает пустую клетку.
- название — собственно название области. Может быть использовано абсолютно любое слово или даже эмодзи! 🤯

Обратите внимание, что нужно называть каждую из клеток. Например, если шапка или подвал нашего сайта будет занимать все три существующие колонки, то нужно будет написать трижды называние этих областей. Удобнее всего будет подписывать области в виде некой таблицы. Подобный способ записи чем-то похож на [таблицы в Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#tables):

```css
.container {
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
  grid-template-rows: repeat(4, 150px);
  grid-template-areas:
    "header header header"
    "content content 👾"
    "content content ."
    "footer footer footer";
}

.item1 {
  grid-area: header;
  background-color: purple;
}

.item2 {
  grid-area: content;
  background-color: gray;
}

.item3 {
  grid-area: 👾;
  background-color: pink;
}

.item4 {
  grid-area: footer;
  background-color: #bada55;
}
```

Обратите внимание, что между строками не ставятся запятые или какие-то другие символы.

Получится такая раскладка:

![Пример реализации свойства grid-template-areas](images/13.png)

Имена областей должны разделяться пробелами. Это важно особенно в том случае, если вы хотите расположить рядом две пустых ячейки рядом. Разделите точки пробелами, иначе браузер подумает что это одна пустая ячейка.

Поддерживается всеми современными браузерами. [Проверить поддержку свойства](https://caniuse.com/mdn-css_properties_grid-template-areas)

### `grid-template`

Свойство-шорткат для свойств `grid-template-rows`, `grid-template-columns`. Позволяет записать все значения в одну строку. Главное после этого не запутаться при чтении 😅

Можно прописать все колонки и ряды сразу, разделяя их слэшем `/`. Сперва идут ряды, а затем колонки, не перепутайте!

```css
.container {
  display: grid;
  grid-template: repeat(4, 150px) / 1fr 200px 1fr;
}
```

В этом же свойстве можно задавать значение и для свойства `grid-template-areas`, но тогда код превращается в кашу и становится совершенно нечитабельным, на мой взгляд. Лучше всё же использовать это свойство отдельно:

Лучше так?
```css
.container {
  display: grid;
  grid-template:
    [row1-start] "header header header" 25px [row1-end]
    [row2-start] "footer footer footer" 25px [row2-end]
    / auto 50px auto;
}
```

Или так?
```css
.container {
  display: grid;
  grid-template:
    [row1-start] 25px [row1-end]
    [row2-start] 25px [row2-end]
    / auto 50px auto;
  grid-template-areas:
    "header header header"
    "footer footer footer";
}
```

Но техническая возможность есть, выбирать вам! 😉

Поддерживается всеми современными браузерами. [Проверить поддержку свойства](https://caniuse.com/mdn-css_properties_grid-template)

### `column-gap`, `row-gap`

Задаёт отступы между колонками / рядами.

```css
.container {
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
  grid-template-rows: repeat(3, 150px);
  column-gap: 10px; /* Отступы между колонками */
  row-gap: 50px; /* Отступы между рядами */
}
```

![Пример реализации свойств column-gap / row-gap](images/14.png)

В инспекторе отступы заштриховываются, так их можно отличить от грид-элементов. В данном примере между рядами отступ по 50 пикселей, а между колонками — 10 пикселей.

Существуют старые аналоги этих свойств, которые могут пригодиться вам, если вы вынуждены поддерживать браузеры старше чем Chrome 68+, Safari 11.2 50+ и Opera 54+: `grid-column-gap` и `grid-row-gap`. Можно писать сперва старые свойства, а за ними новые. Чтобы наверняка.

Поддерживается всеми современными браузерами. Проверить поддержку свойства: [column-gap](https://caniuse.com/mdn-css_properties_column-gap_context) [row-gap](https://caniuse.com/mdn-css_properties_row-gap_context)

### `gap`


Шорткат для записи значений свойств `row-gap` и `column-gap`. Значения разделяются пробелом:

```css
.container {
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
  grid-template-rows: repeat(3, 150px);
  gap: 50px 10px;
  /* И добавляем свойство для старых браузеров */
  grid-gap: 50px 10px;
}
```

Есть старое свойство-аналог для браузеров старше Chrome 68+, Safari 11.2 50+ и Opera 54+: `grid-gap`.

Поддерживается всеми современными браузерами. [Проверить поддержку свойства](https://caniuse.com/mdn-css_properties_gap_context)

### `justify-items`

Свойство, с помощью которого задаётся выравнивание грид-элементов по горизонтальной оси. Применяется ко всем элементам внутри грид-родителя.

Возможные значения:

- `start` — выравнивает элемент по начальной (левой) линии

```css
.item {
  min-width: 150px;
}

.container {
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
  grid-template-rows: repeat(3, 150px);
  grid-gap: 20px;

  justify-items: start;
}
```

![Пример реализации свойства justify-items со значением start](images/15.png)

- `end` — выравнивает элемент по конечной (правой) линии

```css
.container {
  /* -//-//- */

  justify-items: end;
}
```

![Пример реализации свойства justify-items со значением end](images/16.png)

- `center` — выравнивает элемент по центру грид-ячейки

```css
.container {
  /* -//-//- */

  justify-items: center;
}
```

![Пример реализации свойства justify-items со значением center](images/17.png)

- `stretch` — растягивает элемент на всю ширину грид-ячейки

```css
.container {
  /* -//-//- */

  justify-items: stretch;
}
```

![Пример реализации свойства justify-items со значением stretch](images/18.png)

Можно управлять выравниванием отдельных грид-элементов при помощи свойства `justify-self`.

Поддерживается всеми современными браузерами. [Проверить поддержку свойства](https://caniuse.com/mdn-css_properties_justify-items_context)

### `align-items`

Свойство, с помощью которого можно выровнять элементы по вертикальной оси внутри грид-контейнера.

Возможные значения:

- `start` — выравнивает элемент по начальной (верхней) линии

```css
.item {
  min-height: 100px;
}

.container {
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
  grid-template-rows: repeat(3, 150px);
  grid-gap: 20px;

  align-items: start;
}
```

![Пример реализации свойства align-items со значением start](images/19.png)

- `end` — выравнивает элемент по конечной (нижней) линии

```css
.container {
  /* -//-//- */

  align-items: end;
}
```

![Пример реализации свойства align-items со значением end](images/20.png)

- `center` — выравнивает элемент по центру грид-ячейки

```css
.container {
  /* -//-//- */

  align-items: center;
}
```

![Пример реализации свойства align-items со значением center](images/21.png)

- `stretch` — растягивает элемент на всю высоту грид-ячейки

```css
.container {
  /* -//-//- */

  align-items: stretch;
}
```

![Пример реализации свойства align-items со значением stretch](images/22.png)

Поддерживается всеми современными браузерами. [Проверить поддержку свойства](https://caniuse.com/mdn-css_properties_align-items_context)

### `place-items`

Шорткат для указания значений сразу и для `align-items` и для `justify-content`. Указывать нужно именно в таком порядке.

```css
.container {
  display: grid;
  place-items: stretch / end;
}
```

Поддерживается всеми современными браузерами. [Проверить поддержку свойства](https://caniuse.com/mdn-css_properties_place-items_context)

### `grid`

Мега-шорткат, позволяющий задать значения всему и сразу. А конкретно с его помощью можно указать значения для следующих свойств:

- `grid-template-rows`
- `grid-template-columns`
- `grid-template-areas`
- `grid-auto-rows`
- `grid-auto-columns`
- `grid-auto-flow`

Перед тем как соблазнится возможностью расписать всё в одном свойстве, дважды (а то и трижды) подумайте о читабельности кода. Учтите и то, что гриды относительно новая и не такая уж простая технология. Не каждый коллега сможет прочесть этот шорткат.

#### `none`

Значение по умолчанию. Это ключевое слово сбрасывает значения для всех свойств, входящих в этот шорткат.

```css
.item {
  display: grid;
  grid: none;
}
```

#### Значение для `grid-template`

Можно указать допустимые значения для шортката [`grid-template`](/css/grid-template):

```css
.item {
  display: grid;
  grid: repeat(4, 150px) / 1fr 200px 1fr;
}
```

В том числе можно указать имена для линий:

```css
.item {
  display: grid;
  grid:
    [row1-start] 25px [row1-end row2-start] 25px [row2-end] /
    auto 50px auto;
}
```

#### Размеры колонок и рядов

Создадим два ряда и две колонки:

```css
.item {
  display: grid;
  grid: 200px 100px / 30% 30%;
}
```

#### `auto-flow`

Ключевое слово `auto-flow` даёт браузеру понять, что создавать при необходимости: колонки или ряды.

Если `auto-flow` стоит справа от слэша, то будут создаваться автоматические колонки:

```css
.item {
  display: grid;
  grid: 200px 100px / auto-flow 30%;
}
```

Если `auto-flow` стоит слева от слэша, то будут создаваться автоматические ряды:

```css
.item {
  display: grid;
  grid:  auto-flow 30% / 200px 100px;
}
```

#### `dense`

К ключевому слову `auto-flow` можно добавить `dense`. Оно укажет браузеру, что элементы должны стараться заполнить свободные ячейки. Подробнее про работу этого ключевого слова можно почитать в статье про [`grid-auto-flow`](/css/grid-auto-flow).

Важно ставить это слово сразу после `auto-flow`:

```css
.item {
  display: grid;
  grid:  auto-flow dense 30% / 200px 100px;
}
```

Ниже будет несколько примеров с аналогичными друг другу блоками кода:

Первый пример:
```css
.container {
  grid: 50px 150px / 2fr 1fr;
}

.container {
  grid-template-rows: 50px 150px;
  grid-template-columns: 2fr 1fr;
}
```

Второй пример:
```css
.container {
  grid: 200px 1fr / auto-flow 200px;
}

.container {
  grid-auto-flow: column;
  grid-template-rows: 200px 1fr;
  grid-auto-columns: 200px;
}
```

Третий пример:
```css
.container {
  grid: auto-flow dense 300px / 2fr 3fr;
}

.container {
  grid-auto-flow: row dense;
  grid-auto-rows: 300px;
  grid-template-columns: 2fr 3fr;
}
```

Возможны и более сложные комбинации значений этого свойства. Например, можно сразу задать имена областям:

```css
.container {
  grid:
    [row1-start] "header header header" 1fr [row1-end]
    [row2-start] "footer footer footer" 25px [row2-end]
    / auto 50px auto;
}
```

Что аналогично:
```css
.container {
  grid-template-areas:
    "header header header"
    "footer footer footer";
  grid-template-rows: [row1-start] 1fr [row1-end row2-start] 25px [row2-end];
  grid-template-columns: auto 50px auto;
}
```

## Свойства грид-элементов

Важное замечание: свойства `float`, `display: inline-block`, `display: table-cell`, `vertical-align` и `column-*` не имеют никакого эффекта, если применяются к грид-элементам.

### `grid-column-start`, `grid-column-end`, `grid-row-start`, `grid-row-end`

Определяют положение элемента внутри грид-сетки при помощи указания на конкретные направляющие линии.

#### Возможные значения:

- `название или номер линии` — может быть порядковым номером или названием конкретной линии.
- `span число` — элемент растянется на указанное количество клеток.
- `span имя` — элемент будет растягиваться до следующей указанной линии.
- `auto` — означает автоматическое размещение, автоматический диапазон клеток или дефолтное растягивание элемента, равное одному.

```css
.container {
  display: grid;
  grid-template-columns: [one] 1fr [two] 1fr [three] 1fr [four] 1fr [five] 1fr [six];
  grid-template-rows: [row1-start] 1fr [row1-end] 1fr 1fr;
}

.item1 {
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: row1-start;
  grid-row-end: 3;
}
```

![Пример реализации свойств grid-column-start, grid-column-end, grid-row-start, grid-row-end с первым вариантом значений](images/23.png)

Элемент разместился по горизонтали от второй грид-линии до линии с названием `[five]`, а по вертикали от линии с именем `[row1-start]` до линии с номером 3.

```css
.container {
  display: grid;
  grid-template-columns: [first] 1fr [line2] 1fr [line3] 1fr [col4-start] 1fr [five] 1fr [end];
  grid-template-rows: [row1-start] 1fr [row1-end] 1fr [third-line] 1fr [last-line];
}

.item1 {
  grid-column-start: 1;
  grid-column-end: span col4-start;
  grid-row-start: 2;
  grid-row-end: span 2;
}
```

![Пример реализации свойств grid-column-start, grid-column-end, grid-row-start, grid-row-end со вторым вариантом значений](images/24.png)

Элемент расположился по вертикали от 2 грид-линии и растянулся на две ячейки, а по горизонтали от первой линии и растянулся до линии с названием `[col4-start]`.

Если не указать значения для свойств `grid-column-end` и `grid-row-end`, то элемент по умолчанию будет размером в одну грид-ячейку.

Элементы могут перекрывать друг друга, накладываться друг на друга. Можно использовать свойство `z-index` для управления контекстом наложения.

Поддерживается всеми современными браузерами. Проверить поддержку свойства и значений: [grid-column-start](https://caniuse.com/mdn-css_properties_grid-column-start) [grid-column-end](https://caniuse.com/mdn-css_properties_grid-column-end) [grid-row-start](https://caniuse.com/mdn-css_properties_grid-row-start) [grid-row-end](https://caniuse.com/mdn-css_properties_grid-row-end)

### `grid-column`, `grid-row`

Свойства-шорткаты для `grid-column-start` + `grid-column-end` и `grid-row-start` + `grid-row-end` соответственно.

Значения для `*-start` и `*-end` разделяются слэшем.

Можно использовать ключевое слово `span`, буквально говорящее «растянись на столько-то». А на сколько указывает стоящая за ним цифра.

```css
.item1 {
  grid-column: 3 / span 2;
  grid-row: third-line / 4;
}
```

![Пример реализации свойств-шорткатов grid-column, grid-row](images/25.png)

Элемент начинается с третьей линии по горизонтали и растягивается на 2 клетки. По вертикали элемент начинается от линии с именем `[third-line]` и заканчивается у четвёртой линии.

Если опустить слэш и второе значение, то элемент будет размером в одну клетку.

Поддерживается всеми современными браузерами. Проверить поддержку свойства и значений: [grid-column](https://caniuse.com/mdn-css_properties_grid-column) [grid-row](https://caniuse.com/mdn-css_properties_grid-row)

### `grid-area`

Двуличное свойство 🧐, которое может как указывать элементу, какую из именованных областей ему нужно занять, так и служить шорткатом для одновременного указания значений для четырёх свойств `grid-column-start`, `grid-column-end`, `grid-row-start` и `grid-row-end`.

Пример с указанием на именованную область:

```css
.item1 {
  grid-area: content; /* Займёт область content внутри грид-сетки */
}
```

А теперь пример с указанием всех четырёх значений в строку. При таком указании значений есть скользкое место: значения указываются в таком порядке `row-start / column-start / row-end / column-end`, то есть сначала указываем оба начала, а потом оба конца.

```css
.item2 {
  /* row-start / col-start  / row-end   / col-end  */
  grid-area: 1 / col4-start / last-line / 6;
}
```

Поддерживается всеми современными браузерами. [Проверить поддержку свойства](https://caniuse.com/mdn-css_properties_grid-area)

### `justify-self`

С помощью этого свойства можно установить горизонтальное выравнивание для отдельного элемента, отличное от выравнивания, заданного грид-родителю.

Возможные значения аналогичны значениям свойства [`justify-items`](/css/grid-guide/#justify-items)

```css
.container {
  justify-items: stretch;
}

.item1 {
  justify-self: center;
}
```

![Пример реализации свойства justify-self](images/26.png)

Поддерживается всеми современными браузерами. [Проверить поддержку свойства](https://caniuse.com/mdn-css_properties_justify-self_context)

### `align-self`

А это свойство, как не трудно догадаться, выравнивает отдельный элемент по вертикальной оси. Возможные значения аналогичны значениям свойства [`align-items`](/css/grid-guide/#align-items).

```css
.container {
  align-items: stretch;
}

.item1 {
  align-self: start;
}
```

![Пример реализации свойства align-self](images/27.png)

Поддерживается всеми современными браузерами. [Проверить поддержку свойства](https://caniuse.com/mdn-css_properties_align-self_context)

### `place-self`

Шорткат для одновременного указания значений для свойств `justify-self` и `align-self`.

#### Возможные значения:

- `auto` (значение по умолчанию) — стандартное значение, можно использовать для сброса ранее заданных значений.
- `align-self justify-self` — первое значение указывает на значение свойства `align-self`, второе значение устанавливает значение свойства `justify-self`. Если указано всего одно значение, то оно устанавливается в качестве значения для обоих свойств. Например, `place-self: center` выровняет элемент по центру по горизонтальной и по вертикальной осям одновременно.

Поддерживается всеми современными браузерами. [Проверить поддержку свойства](https://caniuse.com/mdn-css_properties_place-self_grid_context)

## Специальные функции и ключевые слова

- Когда задаёте размеры колонкам и рядам, вам доступны не только давно известные единицы измерения (`px`, `vw`, `rem`, `%` и так далее), но и очень крутые ключевые слова `min-content`, `max-content` и `auto`. И уже упомянутые единицы измерения `fr`.
- Гриды подарили нам ещё одну волшебную функцию, позволяющую одновременно задавать минимальный и максимальный размер. Функция `minmax()`. Например, в случае записи `grid-template-columns: minmax(200px, 1fr);` колонка займёт 1 часть свободного пространства грид-контейнера, но не меньше 200 пикселей.
- Ещё одна полезная функция, появившаяся в гридах, это `repeat()`. Сэкономит вам кучу лишних букв и времени.

## Анимация свойств

Для анимации доступны следующие свойства и их значения:

- Значения свойств `grid-gap`, `grid-row-gap`, `grid-column-gap` указанные в единицах измерения, процентах или при помощи `calc()`.
- Значения свойств `grid-template-columns`, `grid-template-rows` указанные в единицах измерения, процентах или при помощи функции `calc()` при условии что анимируются аналогичные значения.

## Ссылки

1. [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
2. [Yoksel's grid cheatsheet](https://yoksel.github.io/grid-cheatsheet/)
3. [GRID GARDEN](https://cssgridgarden.com/#ru)
4. [GRID cheat sheet](https://grid.malven.co/)
5. [learning CSS grid](https://learncssgrid.com/)
6. [Animating CSS Grid Layout properties](https://codepen.io/matuzo/post/animating-css-grid-layout-properties)
