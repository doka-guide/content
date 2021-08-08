---
title: "<footer>"
cover:
  desktop: 'images/cover.png'
authors:
  - vladimir
  - solarrust
editors:
  - tachisis
keywords:
  - тэг
  - тег
  - footer
  - футер
tags:
  - doka
---

## Кратко

`<footer>` создаёт нижнюю часть страницы или блока — «подвал». Обычно здесь находятся контакты, ссылки на разделы сайта, копирайт.

## Пример

В нашем блоке со статьёй будет небольшой футер с указанием автора и его контактами:

```html
<article>
  <h3>Очень важная статья</h3>
  <p>Исходя из данного утверждения, марксизм неизбежен. Коммунизм, с другой стороны, означает экзистенциальный коллапс Советского Союза. Культ личности доказывает гуманизм.</p>
  <footer>
    <p>Ольга Данилюк</p>
    <p>Почта: <a href="mailto:someone@yandex.ru">someone@yandex.ru</a>.</p>
  </footer>
</article>
```

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="solarrust" data-slug-hash="poNZVGm" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="poNZVGm">
  <span>See the Pen <a href="https://codepen.io/solarrust/pen/poNZVGm">
  poNZVGm</a> by Alena (<a href="https://codepen.io/solarrust">@solarrust</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Как это понять

Как правило, у сайта есть «шапка» и «подвал»: верхняя и нижняя части страницы. Обычно эти блоки выглядят одинаково на всех страницах. Эти разделы помогают пользователю сориентироваться и получить основную инфу о сайте.

В подвале мы чаще всего видим название компании, правовую информацию, ссылки на соцсети и другие контакты.

`<footer>` может быть не только у всего сайта целиком, но и у отдельного блока или секции.

## Как пишется

Тег `<footer>` парный, должен всегда закрываться `</footer>`.

## Атрибуты

Применяются все [глобальные атрибуты](/html/global-attrs).

## Подсказки

💡 У `<footer>` блочные стили по умолчанию 🤓

💡 Нельзя вкладывать в `<address>`, `<header>` или другой `<footer>`.

💡 Контакты и информацию об авторе стоит поместить в контейнер `<address>`, а его добавить в `<footer>`.
