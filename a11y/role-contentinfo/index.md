---
title: "`contentinfo`"
description: "Как добавить ориентир футера на страницу."
authors:
  - tatianafokina
contributors:
  - skorobaeus
keywords:
  - a11y
  - доступность
  - ARIA
  - landmark
related:
  - a11y/aria-intro
  - a11y/aria-roles
  - html/footer
tags:
  - doka
---

## Кратко

[ARIA-роль ориентира](/a11y/aria-roles/#roli-orientirov), которая определяет область футера или «подвала» сайта. Обычно в футере находится справочная информация о сайте, копирайтинг, основная навигация, ссылки на социальные сети и другой похожий контент.

Роль `contentinfo` есть у [`<footer>`](/html/footer/) по умолчанию.

## Пример

```html
<body>
  <div role="contentinfo">
    <p>© Мистер Тапир, 2077</p>
  </div>
</body>
```

<iframe title="Футер страницы с явной ролью" src="demos/footer-with-contentinfo/" height="400"></iframe>

## Как пишется

Добавьте к нужному тегу `role="contentinfo"`. Лучше, чтобы это были семантически нейтральные [`<div>`](/html/div/) или [`<span>`](/html/span/). Одно из [правил использования ARIA](/a11y/aria-intro/#pravila-ispolzovaniya) — не перезаписывать роли без необходимости.

Элементу с ролью `contentinfo` можно задавать все [глобальные ARIA-атрибуты](/a11y/aria-attrs/#globalnye-atributy).

В большинстве случаев лучше использовать `<footer>` вместо `contentinfo`. При этом не стоит вкладывать в элемент с `contentinfo` тег `<footer>` и наоборот.

Футер может быть не только у страницы, но и у отдельных элементов на ней. Когда в [`<article>`](/html/article/) или [`<main>`](/html/main/) вложен `<footer>`, [скринридер](/a11y/screenreaders/) не считает их ориентирами. Роль `contentinfo` есть только у тега, который напрямую вложен в [`<body>`](/html/body/).

У страницы может быть только один ориентир `contentinfo`. Футеры из [`<iframe>`](/html/iframe/) не суммируются.

Если на странице больше одного `<footer>`, хорошо задать им уникальные имена с помощью [`aria-label`](/a11y/aria-label/). Имя — это краткое название элемента, которое скринридер объявит вместе с ролью.

```html
<body>
  <main>
    <article>
      <h2>Котики</h2>
      <!-- Содержимое статьи -->
      <footer aria-label="Дата публикации «Котики»">
        <p>
          Опубликовано
          <time datetime="2037-12-11 15:40">
            11 декабря 2037
          </time>
        </p>
      </footer>
    </article>
  </main>

  <footer aria-label="Копирайт и социальные сети">
    <!-- Содержимое футера -->
  </footer>
</body>
```

## Как понять

Роль `contentinfo` создаёт ориентир на странице. Это значит, что пользователи скринридеров могут быстро переместиться к этой области с помощью горячих клавиш или через меню с ориентирами.
