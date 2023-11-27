---
title: "Выпадающее меню"
description: "Как сверстать многоуровневое выпадающее меню, да ещё доступно."
authors:
  - s-dudko
tags:
  - article
---

## Задача

Создать навигационное меню с несколькими уровнями и вложенными внутрь элементами.

## Готовое решение

При создании меню на сайте важно использовать семантические теги, чтобы обеспечить базовую доступность и избежать дополнительных действия с JavaScript.

Готовая разметка многоуровневого меню выглядит следующим образом:

```html
<body>
  <header class="header">
    <nav
      class="site-nav enhanced"
      aria-label="Сайт"
    >
      <ul class="menu">
        <li class="menu__item" data-has-children>
          <button
            class="menu__btn"
            aria-expanded="false"
            aria-controls="doka-submenu"
          >
            Дока
          </button>

          <!-- Первый уровень вложенности -->
          <ul class="menu" id="doka-submenu" hidden>
            <li class="menu__item">
              <a
                href="#"
                class="menu__link"
                aria-current="page"
              >
                Рецепты
              </a>
            <li>

            <li class="menu__item">
              <button
                class="menu__btn"
                aria-expanded="false"
                aria-controls="html-submenu"
              >
                HTML
              </button>

              <!-- Второй уровень вложенности -->
              <ul class="menu" id="html-submenu" hidden>
                <li class="menu__item">
                  <a href="#" class="menu__link">
                    Основы
                  </a>
                </li>
                <li class="menu__item">
                  <a href="#" class="menu__link">
                    Форматирование
                  </a>
                </li>
                <li class="menu__item">
                  <a href="#" class="menu__link">
                    Семантика
                  </a>
                </li>
              </ul>
            </li>

            <li class="menu__item">
              <button
                class="menu__btn"
                aria-expanded="false"
                aria-controls="css-submenu"
              >
                CSS
              </button>

              <!-- Второй уровень вложенности -->
              <ul class="menu" id="css-submenu" hidden>
                <li class="menu__item">
                  <a href="#" class="menu__link">
                    Основы
                  </a>
                </li>
                <li class="menu__item">
                  <a href="#" class="menu__link">
                    Селекторы
                  </a>
                </li>
                <li class="menu__item">
                  <a href="#" class="menu__link">
                    Псевдоклассы
                  </a>
                </li>
              </ul>
            </li>
            <li class="menu__item">
              <a href="#" class="menu__link">
                JavaScript
              </a>
            </li>
            <li class="menu__item">
              <a href="#" class="menu__link">
                Доступность
              </a>
            </li>
          </ul>
        </li>

        <li class="menu__item">
          <a href="#" class="menu__link">
            Новости
          </a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">
            Блог
          </a>
        </li>
        <li class="menu__item">
          <a href="#" class="menu__link">
            Архив
          </a>
        </li>
      </ul>
    </nav>
  </header>
</body>
```

```css
ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: start;
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid;
  outline-offset: 2px;
}

.header {
  display: flex;
  gap: 2rem;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0 0 0 / 0.1);
  padding: 1em;
}

.menu {
  display: flex;
  gap: 64px;
  min-width: max-content;
  background: #fff;
  color: #111;
}

.menu[hidden] {
  display: none !important;
}

.menu__btn,
.menu__link {
  display: flex;
  gap: .5em;
  align-items: center;
  padding: .75rem 1.5rem;
  font-size: 1.5em;
  color: #18191c;
  cursor: pointer;
  border: none;
  background: none;
}

.menu__link:hover,
.menu__btn:hover,
.menu__btn[aria-expanded="true"] {
  background-color: #eee;
}

.menu__btn-icon {
  color: inherit;
  transition: transform .1s linear;
}

.menu__btn[aria-expanded="true"] .menu__btn-icon {
  transform: rotate(180deg);
}

.menu__item {
  position: relative;
}

.menu__link {
  text-decoration: none;
}

a[aria-current="page"] {
  font-weight: bold;
  color: deepPink;
}

a[aria-current="page"]:hover {
  color: deepPink;
}

/* Вложенное меню */
.menu .menu {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding-inline-start: 3rem;
}

/* Первый уровень вложенности */
.enhanced .menu .menu {
  position: absolute;
  top: 110%;
  left: 0;
  padding-inline-start: 0;
  box-shadow: 0 0 5px 2px rgba(0,0,0,0.1);
}

/* Второй уровень вложенности */
.enhanced .menu .menu .menu {
  top: 0;
  left: 100%;
}
```

```js
const nav = document.querySelector('.site-nav')
nav.classList.add("enhanced")

const submenus = document.querySelectorAll(".menu__item[data-has-children]")
const dropdowns = document.querySelectorAll(".menu__item[data-has-children] > .menu")

const icon = '<svg>...</svg>'

// Находим подменю, заменяем в нём span на кнопку
submenus.forEach((item) => {
  const dropdown = item.querySelector(":scope > .menu")
  dropdown.setAttribute("hidden", "")

  const span = item.querySelector(":scope > span")
  const text = span.innerText
  const ariaControlsId = span.dataset.controls
  const button = document.createElement("button")

  // Добавляем класс и необходимые aria-атрибуты
  button.classList.add("menu__btn")
  button.setAttribute("aria-expanded", "false")
  button.setAttribute("aria-controls", ariaControlsId)

  button.innerText = text

  // Добавляем иконку к кнопке, чтобы визуально было
  // понятно открыто меню или нет
  button.innerHTML += icon
  span.replaceWith(button)

  button.addEventListener("click", function (e) {
    toggleDropdown(button, dropdown)
  })

  // Обрабатываем нажатие на Esc
  dropdown.addEventListener("keydown", (e) => {
    e.stopImmediatePropagation()

    if (e.keyCode === 27 && focusIsInside(dropdown)) {
      toggleDropdown(button, dropdown)
      button.focus()
    }
  }, false)
})

function toggleDropdown(button, dropdown) {
  if (button.getAttribute("aria-expanded") === "true") {
    button.setAttribute("aria-expanded", "false")
    dropdown.setAttribute("hidden", "")
  } else {
    button.setAttribute("aria-expanded", "true")
    dropdown.removeAttribute("hidden")
  }
}

function focusIsInside(element) {
  return element.contains(document.activeElement)
}

function collapseDropdownsWhenTabbingOutsideNav(e) {
  if (e.keyCode === 9 && !focusIsInside(nav)) {
    dropdowns.forEach(function (dropdown) {
      dropdown.setAttribute("hidden", "")
      const btn = dropdown.parentNode.querySelector("button")
      btn.setAttribute("aria-expanded", "false")
    })
  }
}

function collapseDropdownsWhenClickingOutsideNav(e) {
  const target = e.target

  dropdowns.forEach(function (dropdown) {
    if (!dropdown.parentNode.contains(target)) {
      dropdown.setAttribute("hidden", "")
      const btn = dropdown.parentNode.querySelector("button")
      btn.setAttribute("aria-expanded", "false")
    }
  });
}

// Закрываем навигацию, если протапались за её пределы
document.addEventListener("keyup", collapseDropdownsWhenTabbingOutsideNav)

// Закрываем навигацию, если кликнули вне навигации
window.addEventListener("click", collapseDropdownsWhenClickingOutsideNav)
```

Итоговый результат выглядит так:

<iframe title="Реализация выпадающего меню" src="demos/menu/" height="700"></iframe>

## Разбор решения

### Первый уровень

При создании многоуровневого меню сначала создадим первый, базовый уровень. Семантическая вёрстка будет выглядеть следующим образом:

```html
<nav class="site-nav" aria-label="Сайт">
  <ul class="menu">
    <li class="menu__item">
      <a href="#" class="menu__link">Дока</a>
    </li>
    <!-- Другие элементы -->
    <li class="menu__item">
      <a href="#" class="menu__link">Блог</a>
    </li>
  </ul>
</nav>
```

Для базовой обёртки в большинстве случаев лучше использовать тег [`<nav>`](/html/nav/). Он явно указывает браузеру на свою роль: говорит о том, что является [ориентиром](/a11y/role-navigation/).

Встроенная роль `<nav>` позволяет вспомогательным технологиям понять, для чего нужен элемент и корректно рассказать о нём пользователям. Например, пользователи [скринридеров](/a11y/screenreaders/) смогут попасть в такое меню с помощью специальных сочетаний клавиш и, тем самым, быстрее взаимодействовать со страницей.

Хорошо, когда у навигации есть доступное имя. Оно поможет отличить одно меню от другого, когда на сайте несколько вариантов меню. Например, основная навигация по сайту и навигация с хлебными крошками по категориям товаров. В примере для задания доступного имени используем ARIA-атрибут [`aria-label`](/a11y/aria-label/).

Также важно рассказать пользователям о том, что они взаимодействуют с набором связанных элементов. Для этого будем использовать тег [`<ul>`](/html/ul/), который подскажет вспомогательным технологиям сколько элементов в списке. Использование данного тега и [`aria-current`](/a11y/aria-current/) также помогут в определении уровня меню, на котором сейчас находится пользователь.

### Вложенные уровни

Внутрь базового уровня меню можно вложить ещё один. Для этого добавьте внутрь элемента списка другой список и заголовок нового уровня. В нашем примере в пункт меню «Дока» добавлен ещё один список с классом `.menu`.

В большинстве случаев для элемента заголовка используют кнопку [`<button>`](/html/button/). Использование кнопки позволяет попасть на элемент меню с помощью клавиши <kbd>Tab</kbd> и повесить на неё событие `click`, которое вызывается с помощью нажатия на <kbd>Enter</kbd> или пробел. Это особенно важно для людей, которые не используют мышку для навигации по сайту.

```html
<nav class="site-nav" aria-label="Сайт">
  <ul class="menu">
    <li class="menu__item">
      <button
        class="menu__btn"
        aria-expanded="false"
        aria-controls="doka-menu"
      >
        Дока
      </button>

      <ul class="menu" id="doka-menu">
        <a href="#" class="menu__link">HTML</a>
        <a href="#" class="menu__link">CSS</a>
        <a href="#" class="menu__link">JavaScript</a>
        <a href="#" class="menu__link">Доступность</a>
      </ul>
    </li>
    <!-- Другие элементы -->
    <li class="menu__item">
      <a href="#" class="menu__link">
        Блог
      </a>
    </li>
  </ul>
</nav>
```

В примере к кнопке добавлены ARIA-атрибуты, которые помогают вспомогательным технологиям лучше взаимодействовать с элементами на странице. Атрибут [`aria-expanded`](/a11y/aria-expanded/) указывает открыт ли пункт меню или нет. [`aria-controls`](/a11y/aria-controls/) связывает кнопку со списком, который она разворачивает или сворачивает.

В таком случае нужно будет написать небольшой скрипт на JavaScript, чтобы можно изменять значение атрибута [`aria-expanded`](/a11y/aria-expanded/) при взаимодействии с кнопкой.

```js
button.addEventListener("click", function (e) {
  toggleDropdown(button, dropdown)
})

function toggleDropdown(button, dropdown) {
  if (button.getAttribute("aria-expanded") === "true") {
    button.setAttribute("aria-expanded", "false")
    dropdown.setAttribute("hidden", "")
  } else {
    button.setAttribute("aria-expanded", "true")
    dropdown.removeAttribute("hidden")
  }
}
```

Если нужно, чтобы элемент навигации был одновременно и ссылкой на родительскую директорию, и содержал вложенную информацию, можно обернуть текст в `<a>`, а рядом с ней расположить `<button>` со стрелкой, которая будет открывать и закрывать список. В рецепте не рассматриваем этот паттерн, но его не так сложно реализовать самостоятельно.

![Пример паттерна использование ссылки и кнопки в названии вложенного меню](images/pattern.png)

Процесс вложения одного списка в другой может повторяться столько раз, сколько нужно. На практике довольно редко встречается больше трёх уровней.

### Стили

Стили для меню могут быть абсолютно разными. Чаще всего встречаются горизонтальные и вертикальные варианты расположения элементов навигации. Для создания одноуровневого горизонтального меню воспользуемся следующими стилями:

```css
.menu {
  /* Сбрасываем браузерные стили */
  list-style: none;
  padding: 0;
  margin: 0;

  /* Задаём горизонтальное направление */
  display: flex;
  gap: 16px;
}
```

В примере разметка горизонтального многоуровневого меню базируется на CSS-позиционировании. Всем элементам списка `<li>` задаётся относительное позиционирование, а вложенному меню `<ul>` — абсолютное. Первый уровень вложенного меню оставляем без смещения, а для второго установим смещение влево на 100%, чтобы меню прилипало к правой границе первого меню.

```css
/* Первый уровень вложенности */
.menu .menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: 110%;
  left: 0;
}

/* Второй уровень вложенности */
.menu .menu .menu {
  top: 0;
  left: 100%;
}
```

Также при создании многоуровневых меню можно часто встретить вариант, когда элементы меню появляются при наведении на них курсора мыши, — по событию `hover`. В таком случае базовая вёрстка останется аналогичной примеру, только нужно будет доработать стили появления — скрывать вложенное меню по умолчанию свойством `display: none` и показывать при наведении мыши.

В мобильной версии меню выглядит как аккордеон. Часто мобильное меню прячут за иконкой с тремя линиями или точками (бургер) или чем-то подобным. При такой реализации помните о доступности и скрывайте меню полностью, чтобы пользователи не могли сделать на нём фокус с помощью клавиши <kbd>Tab</kbd>. Для этого можно использовать свойство [`display: none`](/css/display/#kak-pishetsya) или HTML-атрибут [`hidden`](/html/hidden/). Данные методы прячут меню из [дерева доступности](/a11y/screenreaders/#derevo-dostupnosti), но не дают анимировать открытие и закрытие меню.
