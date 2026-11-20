---
title: "`<footer>`"
description: "Создаёт подвал страницы."
baseline:
  - group: header-footer
    features:
      - html.elements.footer
cover:
  author: kirakusto
  desktop: 'images/covers/desktop.svg'
  mobile: 'images/covers/mobile.svg'
  alt: 'Кроксы с логотипом Доки и биркой: For free sience 2019'
authors:
  - solarrust
editors:
  - tachisis
contributors:
  - skorobaeus
keywords:
  - футер
related:
  - css/position
  - a11y/role-contentinfo
  - css/flexbox-guide
tags:
  - doka
---

## Кратко

`<footer>` создаёт нижнюю часть страницы или блока — «подвал». Обычно здесь находятся контакты, ссылки на разделы сайта, копирайт.

У `<footer>` есть роль [`contentinfo`](/a11y/role-contentinfo/). Благодаря роли пользователи [скринридеров](/a11y/screenreaders/) могут быстро перемещаться к этой области страницы с помощью специальных клавиш.

## Пример

В нашем блоке со статьёй будет небольшой футер с указанием автора и его контактами:

```html
<article>
  <h1>Бигфут</h1>
  <p>
    Бигфут (от англ. Bigfoot, «большеногий») — название
    полумифического млекопитающего...
  </p>
  <footer>
    <p>Ольга Сасквоч</p>
    <p>
      Почта: <a href="mailto:sasquatch@yandex.ru">sasquatch@yandex.ru</a>.
    </p>
  </footer>
</article>
```

<iframe title="Футер для статьи" src="demos/footer/" height="360"></iframe>

## Как понять

Как правило, у сайта есть «шапка» и «подвал»: верхняя и нижняя части страницы. Обычно эти блоки выглядят одинаково на всех страницах. Эти разделы помогают пользователю сориентироваться и получить основную информацию о сайте.

В подвале мы чаще всего видим название компании, правовую информацию, ссылки на соцсети и другие контакты.

`<footer>` может быть не только у всего сайта целиком, но и у отдельного блока или секции.

## Как пишется

Тег `<footer>` парный, должен всегда закрываться `</footer>`.

## Атрибуты

Применяются все [глобальные атрибуты](/html/global-attrs/).

## Подсказки

💡 У `<footer>` блочные стили по умолчанию 🤓

💡 Нельзя вкладывать в [`<address>`](/html/address/), [`<header>`](/html/header/) или другой `<footer>`.

💡 Контакты и информацию об авторе стоит поместить в контейнер `<address>`, а его добавить в `<footer>`.
