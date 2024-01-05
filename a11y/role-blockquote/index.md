---
title: "`blockquote`"
description: "Роль для цитат, взятых из других источников."
authors:
  - alextaraskina
contributors:
  - skorobaeus
keywords:
  - доступность
  - ARIA-роль
  - цитата
related:
  - a11y/aria-intro
  - a11y/aria-roles
  - html/blockquote
tags:
  - doka
---

## Кратко

Относится к категории [структурных ролей](/a11y/aria-roles/#roli-struktury-dokumenta). Используется для определения области с цитатой. Есть у HTML-тега [`<blockquote>`](/html/blockquote/) по умолчанию.

<aside>

🎨 Добавление роли не влияет на внешний вид и поведение элемента.

</aside>

## Пример

```html
<div role="blockquote">
  Простота — необходимое условие прекрасного.
</div>
<p>— Л. Н. Толстой, <cite>Из письма Л. Н. Андрееву.</cite></p>
```

<iframe title="Пример использования роли blockquote" src="demos/role-blockquote/" height="250"></iframe>

## Как пишется

Добавьте к тегу атрибут `role="blockquote"`. Роль можно использовать для всех тегов, но лучше применять к семантически нейтральным ([`<div>`](/html/div/), [`<span>`](/html/span/)).

Одно из правил использования ARIA – не использовать ARIA, если в HTML есть семантический эквивалент. В большинстве случаев для цитат лучше использовать HTML-тег [`<blockquote>`](/html/blockquote/). [Тег поддерживается всеми современными браузерами](https://caniuse.com/?search=blockquote).

```html
<!-- Лучше так ✅ -->
<blockquote>
  <p>Простота — необходимое условие прекрасного.</p>
</blockquote>
<!-- Не забываем указать автора и источник -->
<p>— Л. Н. Толстой, <cite>Из письма Л. Н. Андрееву.</cite></p>
```
