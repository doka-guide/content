---
title: "`prefers-reduced-transparency`"
description: "Значение директивы `@media`, которое отслеживает настройки прозрачности."
authors:
  - doka-dog
keywords:
  - доступность
  - ＠-правило
  - media
  - media-query
  - эффект стекла
related:
  - css/media
  - a11y/chto-takoe-a11y
  - a11y/aria-intro
tags:
  - doka
  - placeholder
---

## Кратко

Одно из значений директивы [`@media`](/css/media/) для проверки пользовательских настроек. Отслеживает отключение или уменьшение прозрачности в операционной системе.

## Пример

```css
.transparency-bg {
  opacity: 0.4;
}

@media (prefers-reduced-transparency: reduce) {
  .transparency-bg {
    opacity: 1;
  }
}
```

## Как пишется

Доступные значения `prefers-reduced-transparency`:

- `no-preference` — прозрачность в системе по умолчанию.
- `reduce` — прозрачность уменьшена или поностью выключена в системе.

В будущем так можно отменять opacity у элементов. How does this interact with preferences around e.g. pattern fills and backgrounds? They’re not about transparency, but they also interfere with shape recognition.

### Системные настройки

В разных операционных системах настройки могут располагаться в разных местах, но искать их нужно в разделах, которые связаны с доступностью и специальными возможностями. В некоторых системах движение можно уменьшить, в других отключить анимацию полностью. Например, как в Windows 10.

<details>
  <summary>Windows 10</summary>

  Настройки > Лёгкость доступа > Дисплей > Показать анимацию в Windows

</details>

<details>
  <summary>Windows 11</summary>

  Настройки > Универсальный доступ > Визуальные эффекты > Эффекты анимации

</details>

<details>
  <summary>macOS</summary>

  Системные настройки > Специальные возможности > Дисплей > Уменьшить движение

</details>

<details>
  <summary>iOS</summary>

  Настройки > Основные > Универсальный доступ > Уменьшить движение

</details>

<details>
  <summary>Android 9+</summary>

  Настройки > Специальные возможности > Удалить анимацию

</details>

## Как понять

Пользователи могут включить или выключить прозрачность фона (transparency). Непрозрачный фон часто выбирают те, кто повышает контрастность.

Прозрачный фон может увеличить когнитивную нагрузку и уменьшить читаемость текста. Non-opaque interfaces can cause headaches or be a visual struggle for various types of vision deficiencies. Поэтому этой настройкой пользуются:

Люди с особенностями зрения. Например, с астигматизмом или сниженным зрением.
Пользователи с когнитивными особенностями. К примеру, люди с дислексией или синдром дефицита внимания.
Люди с мигренями и головными болями.
Прозрачность настраивается в Windows и macOS.
