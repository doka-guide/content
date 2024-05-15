---
title: "`aria-disabled`"
description: "ARIA-атрибут для неизменяемых интерактивных элементов, с которыми всё равно можно взаимодействовать."
authors:
  - teplostanski
keywords:
  - доступность
  - ARIA
  - ARIA-атрибут
  - readonly
related:
  - a11y/role-button
  - a11y/role-tab
  - html/disabled
tags:
  - doka
---

## Кратко

`aria-disabled` — это атрибут, который указывает, что элемент интерфейса в данный момент не доступен для взаимодействия. Он позволяет разработчикам явно указать, что элемент неактивен, без изменения его DOM-структуры или удаления привязанных событий.

[Состояние виджета](/a11y/aria-attrs/#atributy-vidzhetov) из [WAI-ARIA](/a11y/aria-intro/#specifikaciya). Указывает на то, что элемент нельзя изменять и взаимодействовать с ним как-то ещё.

Так же работает HTML-атрибут [`disabled`](/html/disabled/).

## Пример

Рассмотрим пример кнопки, которую мы хотим временно сделать неактивной, не удаляя при этом обработчики событий:

```html
<button aria-disabled="true">Отправить</button>
```

Кнопка будет визуально отображаться, но пользователь не сможет по ней кликнуть или сфокусироваться.

## Как пишется

Добавьте к тегу атрибут `aria-disabled` с одним из значений:

- `true` — элемент неактивен.
- `false` (по умолчанию) — элемент активен, с ним можно взаимодействовать.

`aria-disabled` можно задавать только некоторым тегам и [ролям](/a11y/aria-roles/):

- [`<button>`](/html/button/), [`<summary>`](/html/details/), [`<input>` c типами](/html/input/#type) `button`, `image`, `reset`, `submit` или для роли [`button`](/a11y/role-button/).
- [`<a>`](/html/a/) или [`link`](/a11y/role-link/).
- [`<details>`](/html/details/), [`<fieldset>`](/html/fieldset/), [`<optgroup>`](/html/optgroup/) или [`group`](/a11y/role-group/).
- [`<hr>`](/html/hr/) или [`separator`](/a11y/role-separator/).
- [`<div>`](/html/div/), [`<span>`](/html/span/) или [`generic`](/a11y/role-generic/).
- [`tab`](/a11y/role-tab/).
- [`scrollbar`](/a11y/role-scrollbar/).
- [`application`](/a11y/role-application/).
- [`gridcell`](/a11y/role-gridcell/).
- [`menuitem`](/a11y/role-menuitem/).

Для HTML-тегов лучше использовать атрибут `disabled` вместо `aria-disabled` там, где он поддерживается.

### Подводные камни и особенности

- **Неактивные родительские элементы**: Если родительский элемент получает `aria-disabled="true"`, его дочерние элементы также считаются неактивными.
- **CSS и JavaScript**: Чтобы полностью реализовать поведение неактивности, нужно использовать CSS для стилизации и JavaScript для управления состоянием, так как `aria-disabled` сам по себе не останавливает взаимодействие с элементом.

### Особенности для ссылок

Для элементов `<a>`, которые не содержат атрибут `href`, `aria-disabled="true"` может быть использован для указания, что ссылка в текущем состоянии не функциональна, например:

```html
<a href="#" aria-disabled="true">Больше не кликабельно</a>
```

## Как понять

На элементе с `aria-disabled` пользователи не могут сделать фокус, узнать о его роли и состоянии, а также скопировать из него данные.

Такое поведение может быть у временно неактивных элементов. К примеру, когда в форме заполнены не все поля или какое-то действие в процессе выполнения.

## Демонстрация

В этом примере кнопка становится неактивной при нажатии, меняя свой визуальный стиль и убирая возможность взаимодействия.

<iframe title="Пример" src="demos/" height="300"></iframe>

### Включение CSS и JavaScript для полного функционала

Использование `aria-disabled` отличается от атрибута `disabled` тем, что не останавливает все пользовательские взаимодействия с элементом на уровне браузера. Поэтому важно использовать CSS и JavaScript для управления состояниями элементов. Вот простой пример, как можно улучшить взаимодействие:

Вот простая демонстрация, как можно стилизовать и управлять элементом с `aria-disabled`:

```css
  [aria-disabled='true'] {
    opacity: 0.7;
    cursor: not-allowed;
  }
  [aria-disabled='true']:focus {
    outline: none;
  }
```

```javascript
  document.querySelectorAll('[aria-disabled="true"]').forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault(); // Предотвращаем клики
    });
  });
```

Простой пример чтобы попробовать самостоятельно:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>aria-disabled</title>
    <style>
      .disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    </style>
  </head>
  <body>
    <button id="toggleButton" aria-disabled="false" onclick="toggleDisabled()">
      Нажми меня
    </button>
    <script>
      function toggleDisabled() {
        const el = document.getElementById('toggleButton');
        const isDisabled = el.getAttribute('aria-disabled') === 'true';
        el.setAttribute('aria-disabled', !isDisabled);
        el.classList.toggle('disabled');
      }
    </script>
  </body>
</html>
```

### Интеграция с современными фреймворками

В современных фреймворках, таких как React или Angular, вы можете интегрировать `aria-disabled` напрямую в ваш компонентный подход. Например, в React компоненте это может выглядеть так:

```jsx
function SaveButton({ isSaving }) {
  return (
    <button aria-disabled={isSaving ? 'true' : 'false'}>
      {isSaving ? 'Saving...' : 'Save Changes'}
    </button>
  );
}
```

## Практическое применение в реальных проектах

На моей практике был случай с разработкой интерактивной карты мероприятия, где необходимо было временно отключать кнопки управления до загрузки всех данных. Для этого мы использовали `aria-disabled` в сочетании с визуальными изменениями и блокировкой событий через JavaScript. Это не только улучшило доступность, но и предотвратило возможные ошибки пользователей при раннем взаимодействии с картой.

## Заключение

Использование `aria-disabled` позволяет создать более гибкий и доступный интерфейс. Однако важно помнить, что для полной функциональности необходимо добавлять соответствующий CSS и JavaScript. Это не только делает ваш сайт более доступным, но и улучшает общий пользовательский опыт. Уделите время тестированию вашего сайта с различными вспомогательными технологиями, такими как читалки экрана, чтобы убедиться, что ваше использование ARIA действительно улучшает взаимодействие для всех пользователей.
