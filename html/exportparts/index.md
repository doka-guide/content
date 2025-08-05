---
title: "Атрибут `exportparts`"
description: "Атрибут `exportparts` позволяет прокидывать стилизуемые части из одного веб-компонента в другой — по цепочке Shadow DOM."
authors:
  - drakesbot12
keywords:
  - кастомные
  - элементы
  - shadow
  - dom
  - ::part
  - exportparts
  - веб-компоненты
  - проброс
related:
  - html/part
  - css/part
  - js/element-shadowroot
tags:
  - doka
---

## Кратко

Атрибут `exportparts` используется во вложенных веб-компонентах, чтобы пробросить наружу [`part`](/html/part/) из их внутреннего Shadow DOM. Позволяет стилизовать части вложенных компонентов, несмотря на инкапсуляцию.

## Пример

Допустим, у нас есть компонент `<inner-card>` с [`part="content"`](/html/part/), и компонент `<outer-box>`, который включает его.

```html
<outer-box></outer-box>
```

```html
<!-- Контент в шаблоне inner-card -->
<template id="inner-template">
  <div part="content">Контент</div>
</template>

<!-- Контент в шаблоне inner-card в шаблоне outer-box -->
<template id="outer-template">
  <inner-card exportparts="content:inner-content"></inner-card>
</template>
```

```css
outer-box::part(inner-content) {
  color: rebeccapurple;
  font-weight: bold;
}
```

<aside>

👆 Здесь часть `content` из `inner-card` экспортируется наружу как `inner-content`. Благодаря этому мы можем стилизовать её напрямую из внешнего мира.

</aside>

## Как пишется

Атрибут `exportparts` указывается на компоненте внутри Shadow DOM, и содержит пары:

```html
<some-component exportparts="part-name:alias"></some-component>
```

- `part-name` — имя [`part`](/html/part/) внутри дочернего компонента
- `alias` — под каким именем это [`part`](/html/part/) будет видно снаружи

Можно экспортировать несколько частей, через запятую:

```html
<card-box exportparts="header:main-header, body:main-body"></card-box>
```

Снаружи будет доступен селектор:

```css
my-component::part(main-header) { ... }
```

## Как понять

По умолчанию [`part`](/html/part/) работает только на один уровень инкапсуляции. То есть, если один компонент оборачивает другой, [`::part(...)`](/css/part/) снаружи не увидит [`part`](/html/part/) из глубины.

Атрибут `exportparts` нужен, чтобы передать видимость [`part`](/html/part/) дальше — пробросить её наружу. Такой себе «туннель» для стилизации.

## Подсказки

💡 Работает только если оба компонента используют Shadow DOM. Без него `exportparts` не нужен.
💡 Если не указать `exportparts`, то part из внутреннего компонента не будет виден снаружи — даже если задать [`::part(...)`](/css/part/).
💡 Можно не задавать псевдоним: `exportparts="title"` — тогда наружу пробрасывается то же имя [`part`](/html/part/).
💡 Не работает с `mode: closed`, потому что нельзя прочитать [`part`](/html/part/) без доступа к Shadow DOM.
