---
title: "`:any-link`"
description: "Выбирает любые ссылки, посещённые и непосещённые (`<a>` и `<area>` с `href`). Удобно стилизовать все ссылки одним селектором."
baseline:
  - group: link-selectors
    features:
      - css.selectors.any-link
authors:
  - drakesbot12
keywords:
  - any-link
  - ссылка
  - селектор
  - link
  - visited
related:
  - html/a
  - css/visited
  - css/link
tags:
  - doka
---

## Кратко

`:any-link` — псевдокласс, который совпадает со всеми «кликабельными» ссылками: и непосещёнными (`:link`), и посещёнными (`:visited`). Работает с элементами [`<a>`](/html/a/) и `<area>`, если у них есть атрибут `href`.

## Пример

Стилизуем все ссылки одним селектором. Недействительные `<a>` без `href` при этом не попадут под правило.

<iframe title=":any-link — стили для всех ссылок сразу" src="demos/basic/" height="420"></iframe>

## Как пишется

```css
/* Один селектор вместо пары :link и :visited */
.content :any-link {
  text-decoration-color: #2E9AFF;
  text-decoration-thickness: 2px;
}

/* Альтернативно без :any-link */
.content :link,
.content :visited {
  text-decoration-color: #2E9AFF;
  text-decoration-thickness: 2px;
}
```

## Как понять

`:any-link` объединяет [`:link`](/css/link/) и [`:visited`](/css/visited/). Это снижает дублирование в стилях и исключает случай, когда стили не работают как задумано для посещённых ссылок из-за отсутствия отдельного правила для `:visited`.

Псевдокласс выбирает только элементы с атрибутом `href`: без него `<a>` не считается ссылкой, и `:any-link` его пропустит.

## Подсказки

💡 Удобно использовать как «базовый» селектор для ссылок внутри компонента: `.card :any-link { … }`.

💡 Для выборки только недействительных «ссылок» используйте отрицание: `a:not(:any-link)`.

💡 Добавляйте состояния [`:hover`](/css/hover/)/[`:focus-visible`](/css/focus-visible/) к тому же набору элементов: `.card :any-link:hover { … }`.
