---
title: "`env()`"
description: "Если «бровки» и «чёлки» устройства заслоняют контент — `env()` придёт на помощь."
baseline:
  - group: safe-area-inset
    features:
      - css.types.env
      - css.types.env.safe-area-inset-bottom
      - css.types.env.safe-area-inset-left
      - css.types.env.safe-area-inset-right
      - css.types.env.safe-area-inset-top
authors:
  - anastasiayarosh
related:
  - css/padding
  - css/margin
  - js/bom
tags:
  - doka
---

## Кратко

Функция `env()` используется для вставки значения переменной среды, определенной юзер-агентом, в ваш CSS. Это почти то же самое, что и [`var()`](/css/var/) в CSS, но env() переменные определяются агентом пользователя, не самим пользователем. Эти переменные имеют глобальную область действия.

<aside>

🕵 _Агентами пользователя_ часто называют браузеры.

</aside>

Свойство уже [поддерживается](https://caniuse.com/css-env-function) во всех современных браузерах. А если нужно добавить поддержку для старых версий, можно использовать плагин [PostCSS Preset Env](https://www.npmjs.com/package/postcss-preset-env) – он преобразует современные CSS-функции в полифилы.

## Пример

```css
.element {
  margin-bottom: env(safe-area-inset-bottom, 16px);
}
```

Второе значение в скобках — запасное. Если переменная не определена, значение будет равно `16px`.

### Синтаксис

Свойство и значение свойства записываются в таком формате:

```css
property: env(переменная, запасное-значение);
```

Где переменная — это имя системной переменной (например, `safe-area-inset-top`). Запасное значение опционально на случай, если переменная недоступна.

Обратите внимание, что значения свойств внутри `env()` чувствительны к регистру.

Использование переменных:

```css
env(safe-area-inset-top);
env(safe-area-inset-right);
```

Переменные + запасные значения:

```css
env(safe-area-inset-top, 20px);
env(safe-area-inset-right, 1em);
```

Переменные `safe-area-inset-*` задают отступы от краёв области просмотра. Вместе они образуют прямоугольник — безопасную зону для контента. На обычных экранах (например, ноутбуках) эта зона совпадает с краями, и ничего не обрезается. А вот на нестандартных дисплеях (например, круглых часах) всё, что внутри этой зоны, точно будет видно. То, что выходит за её пределы, может не отобразиться. Размер зоны определяет система.

## Подключение

Чтобы занять всё доступное пространство на экране, нужно добавить специальный параметр во вьюпорт. Он включит поддержку переменных `env()`:

```html
<meta name="viewport" content="viewport-fit=cover">
```

Дальше указываем, какие именно отступы хотим задать, и с какими значениями. В примере ниже у тега `body` устанавливаются отступы со всех четырёх сторон:

```css
body {
  padding:
    env(safe-area-inset-top, 40px)
    env(safe-area-inset-right, 40px)
    env(safe-area-inset-bottom, 40px)
    env(safe-area-inset-left, 40px);
}
```

## Какие проблемы решает

Функцию `env()` можно использовать внутри любого CSS-свойства — как часть значения или даже в [медиазапросах](/css/media/).

Переменные `safe-area-inset-*` изначально появились в iOS, чтобы разработчики могли располагать контент в безопасной зоне — там, где его точно не обрежет экран. Сейчас они полезны и на других устройствах с необычными формами экрана.

Частая проблема, которую решает `env()` — это всплывающие уведомления (пуши), которые могут перекрывать элементы интерфейса. Если задавать фиксированные блоки с учётом `env()`, они останутся в видимой области и не будут перекрыты.

`env()` можно применять и в PWA. Такие приложения используют пространство окна по максимуму, включая область, где обычно находится заголовок окна. Переменные `titlebar-area-*` позволяют размещать элементы прямо в этой зоне, не мешая системным кнопкам.

А переменные `keyboard-inset-*` сообщают, где на экране появилась виртуальная клавиатура. С их помощью можно узнать отступы от краёв и адаптировать интерфейс так, чтобы элементы не прятались за клавиатуру.

Ниже — пример, как использовать переменные `titlebar-area-*`, чтобы создать свой заголовок окна, который будет корректно работать в полноэкранном режиме:

```html
<head>
  <meta name="viewport" content="viewport-fit=cover">
</head>
<body>
  <header id="titlebar">My Custom Title Bar</header>
  <main>App Content Goes Here</main>
</body>
```

Добавляем стили:

```css
#titlebar {
  position: fixed;
  inset-inline-start:
    env(titlebar-area-x, 0); /* Позиция по X (если не поддерживается — 0) */
  inset-block-start:
    env(titlebar-area-y, 0);  /* Позиция по Y */
  display: flex;
  align-items: center;
  padding-inline-start: 16px;
  inline-size:
    env(titlebar-area-width, 100%); /* Ширина заголовка */
  block-size:
    env(titlebar-area-height, 40px); /* Высота */
  background-color: #6200ee;
  color: white;
}

/* Сдвигаем основной контент, чтобы он не перекрывался */
main {
  margin-top: env(titlebar-area-height, 40px);
  padding: 16px;
}
```

Получаем результат, который хотели получить.

## Список всех переменных окружения

### iOS

`safe-area-inset-top`;
`safe-area-inset-right`;
`safe-area-inset-bottom`;
`safe-area-inset-left`;

### PWA

`titlebar-area-x`;
`titlebar-area-y`;
`titlebar-area-width`;
`titlebar-area-height`;

### Виртуальная клавиатура

`keyboard-inset-top`;
`keyboard-inset-right`;
`keyboard-inset-bottom`;
`keyboard-inset-left`;
`keyboard-inset-width`;
`keyboard-inset-height`;
