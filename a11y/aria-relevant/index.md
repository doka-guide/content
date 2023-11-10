---
title: "`aria-relevant`"
description: "Как рассказать вспомогательным технологиям что и как изменилось на странице?"
authors:
  - tatianafokina
contributors:
  - skorobaeus
keywords:
  - a11y
  - ARIA
  - ARIA-атрибут
  - живая область
  - интерактивная область
  - live region
  - ajax
related:
  - a11y/aria-atomic
  - a11y/aria-busy
  - a11y/aria-live
tags:
  - doka
---

## Кратко

[Свойство изменяющихся областей](/a11y/aria-attrs/#atributy-izmenyayushchihsya-oblastey) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). `aria-relevant` сообщает, о каких событиях в изменяющейся или «живой» области должны знать вспомогательные технологии 🤖

<aside>

🚧 Пока [у `aria-relevant` плохая поддержка](https://a11ysupport.io/tech/aria/aria-relevant_attribute).

</aside>

## Пример

```html
<h2>Друзья в сети</h2>
<ul
  aria-live="polite"
  aria-relevant="all"
>
  <li>Джим Моррисон</li>
  <li>Йен Кёртис</li>
  <li>Эми Уайнхаус</li>
</ul>
```

## Как пишется

Добавьте к любому тегу или [ARIA-роли](/a11y/aria-roles/) `aria-relevant` со значением из списка:

- `additions text` (по умолчанию) — короткая запись для `additions` и `text`.
- `all` — короткая запись для `additions`, `removals` и `text`.
- `additions` — добавлены элементы.
- `text` — добавлен текст.
- `removals` — удалён текст, элемент или их группа.

У атрибута может быть несколько значений, которые разделяют пробелом.

```html
<div aria-relevant="additions removals"></div>
```

`aria-relevant` — опциональный атрибут. Пригодится в редких ситуациях, когда добавление и удаление текста или элементов действительно важно. Например, если один пользователь вышел из чата, а второй зашёл.

К сожалению, пока что только JAWS и VoiceOver объявляют об удалении элементов. Остальные скринридеры рассказывают о добавлении элементов, при этом им без разницы, это целый элемент или текст.

Можете проверить в этой демке, как ведут себя разные вспомогательные технологии.

```html
<ul aria-live="polite" aria-relevant="all">
  <li>
    <span></span>
    Соседский кот всегда онлайн
  </li>
  <!-- Остальные элементы добавляются и удаляются JavaScript-->
</ul>
```

<iframe title="Список друзей с aria-relevant" src="demos/friends-list/" height="450"></iframe>

<video controls width="640">
  <source src="video/aria-relevant.mp4" type="video/mp4">
  <track
    label="Russian"
    kind="subtitles"
    srclang="ru"
    src="video/closed-captions.vtt"
  >
</video>

NVDA сообщит об изменениях так: «<!-- yaspeller ignore:start -->Джим Моррисон, Йен Кёртис, Эми Уайнхаус<!-- yaspeller ignore:end -->». Он не расскажет о том, что <!-- yaspeller ignore:start -->Джим Моррисон<!-- yaspeller ignore:end --> вышел из чата, когда это произойдёт.

Сейчас у атрибута нет практической пользы. В случае обновляющихся списков пользователей можно изменять видимый только скринридерам статус «активен» на «неактивен» и наоборот.

## Как понять

_Изменяющаяся область_ — это область страницы, в которой содержимое обновляется из-за внешних событий или действий пользователей. Благодаря изменяющимся областям вспомогательные технологии узнают об обновлениях на странице и автоматически рассказывают о них пользователям.

`aria-relevant` отслеживает, что именно изменилось в дереве доступности и его узлах, и сообщает об этом скринридерам.

[Дерево доступности](/a11y/screenreaders/#derevo-dostupnosti) — представление элементов документа в виде дерева на основе [DOM](/js/dom/) (Document Object Model). Оно состоит из объектов (accessible object), которые складываются в узлы (nodes).
