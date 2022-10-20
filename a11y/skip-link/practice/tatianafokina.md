🛠 С этой и другими реализациями скип-линк есть проблемы во всех мобильных браузерах в [iOS до 13 версии](https://bugs.webkit.org/show_bug.cgi?id=179011), [Android до 10 версии](https://bugs.chromium.org/p/chromium/issues/detail?id=657157), а ещё в [некоторых версиях Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=37721) и в [Safari 14](https://github.com/alphagov/govuk-frontend/issues/2187).

В каких-то браузерах при свайпе, нажатии на <kbd>Tab</kbd> или на клавишу со стрелкой фокус перемещается не на контент, к которому ведёт ссылка, а на следующий элемент после ссылки. Где-то скип-линк вообще не получает фокус.

Если поддерживаете старые браузеры и операционные системы, хорошо учесть эти баги.

Для решения проблемы добавьте к [`<main>`](/html/main/) или к другому блоку, куда ведёт скип-линк, [`tabindex="-1"`](/html/global-attrs/#tabindex). Атрибут `tabindex` с отрицательным значением удаляет элемент из последовательной навигации.

```html
<body>
  <a class="skip-link" href="#main">
    Перейти к контенту
  </a>
  <!-- Навигация -->
  <main id="main" tabindex="-1">
    <!-- Остальной контент страницы -->
  </main>
</body>
```

Из-за этого возникнут побочные эффекты. При переходе к основному блоку теперь выделяется вся область с отрицательным `tabindex`, а при клике по странице фокус вернётся в её начало. Это исправит JavaScript. После события клика у скип-линк нужно установить фокус на теге, к которому ведёт ссылка, и добавить к нему `tabindex="-1"`. При потере фокуса этот атрибут нужно удалить.

Один из вариантов решения проблемы для десктопных браузеров.

```js
(_ => {
  const skip_lnk = document.querySelector('.skip_lnk');

  if (!skip_lnk) return false;
  skip_lnk.addEventListener('click', e => {
    e.preventDefault();
    const to_obj = document.getElementById(skip_lnk.href.split('#')[1]);
    if (to_obj) {
      to_obj.setAttribute('tabindex', '-1');
      to_obj.addEventListener('blur', _ => {
        to_obj.removeAttribute('tabindex');
      }, {once: true});
      to_obj.focus();
    }
  });
})();
```

Вариант решения проблемы с багом у TalkBack на Android.

```js
(_ => {
  const skip_lnk = document.querySelector('.skip_lnk');

  if (!skip_lnk) return false;
  skip_lnk.addEventListener('click', e => {
    e.preventDefault();
    const to_obj = document.getElementById(skip_lnk.href.split('#')[1]);
    if (to_obj) to_obj.focus();
  });

})();
```

🛠 Когда у вас несколько скип-линк, можно обернуть их в [`<nav>`](/html/nav/) и назвать эту группу с помощью [`aria-label`](/a11y/aria-label/). Тогда пользователи скринридеров могут использовать эту область как ориентир и быстро перемещаться к ней с помощью клавиш или через меню с ориентирами.

```html
<header>
  <nav aria-label="Ссылки для пропуска меню">
    <a href="#search" class="skip-link">Перейти к поиску</a>
    <a href="#main" class="skip-link">Перейти к содержимому</a>
  </nav>
  <nav aria-label="Главная">
    <!-- Основная навигация -->
  </nav>
  <form id="search">
    <!-- Поиск по сайту -->
  </form>
</header>

<main id="main">
  <!-- Остальной контент страницы -->
</main>
```
