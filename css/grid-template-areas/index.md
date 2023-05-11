---
title: "`grid-template-areas`"
description: "Прописываем где какие области грида будут находиться."
baseline:
  - group: grid
    features:
      - css.properties.grid-template-areas
authors:
  - solarrust
editors:
  - tachisis
keywords:
  - имена областей
  - грид-область
related:
  - css/grid-area
  - css/grid-guide
  - tools/markdown
tags:
  - doka
---

## Кратко

Позволяет задать шаблон сетки расположения элементов внутри грид-контейнера. Имена областей задаются при помощи свойства [`grid-area`](/css/grid-area/). Текущее свойство `grid-template-areas` просто указывает, где должны располагаться эти грид-области.

## Пример

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
```

## Как пишется

- `none` (значение по умолчанию) — области сетки не задано имя.
- `.` — означает пустую ячейку.
- **имя области** — собственно название области, может быть абсолютно любым словом или даже эмодзи! 🤯

Обратите внимание, что нужно называть каждую из ячеек. Например, если шапка или подвал нашего сайта будут занимать все три существующие колонки, то нужно будет написать трижды названия этих областей. Удобнее всего будет подписывать области в виде некой таблицы. Подобный способ записи чем-то похож на [таблицы в Markdown](/tools/markdown/#tablicy):

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 500px);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    "header header header"
    "content content 👾"
    "content content ."
    "footer footer footer";
}

.item1 {
  grid-area: header;
}

.item2 {
  grid-area: content;
}

.item3 {
  grid-area: 👾;
}

.item4 {
  grid-area: footer;
}
```

Обратите внимание, что между строками не ставятся запятые или какие-то другие символы, имена разделяются пробелами.

Получится такая раскладка:

![Пример реализации свойства grid-template-areas.](images/1.png)

## Подсказки

💡 Имена областей должны разделяться пробелами. Это важно, особенно в том случае, если вы хотите расположить рядом две пустых ячейки. Разделите точки пробелами, иначе браузер подумает, что это одна пустая ячейка.

<aside>

📝 Полный список свойств гридов можно посмотреть в [гайде по grid](/css/grid-guide/).

</aside>
