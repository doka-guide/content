---
title: "`<figure>`, `<figcaption>`"
description: "Добавляем изображение с подписью."
baseline:
  - group: figure
    features:
      - html.elements.figure
      - html.elements.figcaption
authors:
  - ezhkov
contributors:
  - furtivite
  - tatianafokina
keywords:
  - фигура
related:
  - html/source
  - css/font
  - html/global-attrs
tags:
  - doka
---

## Кратко

Элемент `<figure>` используется для вёрстки иллюстраций, изображений или другого автономного содержимого, которое может иметь поясняющую подпись в виде тега `<figcaption>`.

![Стена с тремя картинами в стиле К. Малевича: «Оранжевый квадрат», «Оранжевый крест и «Оранжевый круг» — и подписями к ним](images/figcaption.png)
Пример использования `<figure>` и `<figcaption>`.

## Пример

```html
<figure>
  <img src="elephant-sunset.jpg"
      alt="Взрослый африканский слон стоит на фоне заката и задумчиво смотрит в
      камеру.">
  <figcaption>Слон на фоне заката</figcaption>
</figure>
```

## Как понять

Обычно тегом `<figure>` верстают изображение, иллюстрацию, кусок кода и тому подобное, на которые будут ссылаться из основного содержимого документа. При этом `<figure>` вместе со всем содержимым (картинкой, подписью) может быть перенесён в другую часть документа без нарушения целостности потока документа.

## Как пишется

Только изображение:

```html
<figure>
  <img src="/favicon144.png" alt="Красивое лого">
</figure>
```

Изображение с подписью:

```html
<figure>
  <img src="/favicon144.png" alt="Красивое лого">
  <figcaption>Супер-логотип</figcaption>
</figure>
```

Подпись может быть с уточнением:

```html
<figure>
  <img  src="/favicon144.png" alt="Красивое лого">
  <figcaption>
    <p>Новый красивый логотип</p>
    <p>Автор: Дока Дог</p>
  </figcaption>
</figure>
```

Несколько изображений с общей подписью:

```html
<figure>
  <img src="/favicon144.png" alt="Лого в 1819">
  <img src="/favicon145.png" alt="Лого в 1919">
  <img src="/favicon146.png" alt="Лого в 2019">
  <figcaption>Как изменялся логотип компании.</figcaption>
</figure>
```

Фрагменты кода:

```html
<figure>
  <figcaption>
    Получаем данные о текущем URL из свойства <code>location</code>.
  </figcaption>
  <pre>
    function LocationExample() {
    console.log(`Protocol: ${location.protocol}`);
    console.log(`Host: ${location.host}`);
    console.log(`Path: ${location.pathname}`);
    console.log(`Hash: ${location.hash}`);
    }
  </pre>
</figure>
```

## Подсказки

💡 Если содержимое элемента на странице является автономным (даже в отрыве от основного контента будет иметь смысл) и имеет подпись, то почти наверняка можно верстать его тегом `<figure>`. Самыми яркими примерами такого содержимого могут быть:

- картинка либо другое медиасодержимое с подписью;
- фрагменты кода с пояснением;
- цитата с указанием автора;
- отрывок стихотворения с указанием автора и т. п.

💡 Разрешено использовать только один тег `<figcaption>` внутри `<figure>`.

💡 Подпись к картинке из `<figcaption>` должна отличаться от описания из `alt`.

💡 Элемент `<figcaption>`, если он есть, обязательно должен быть первым или последним потомком элемента `<figure>`.

💡 Лучше не вкладывать внутрь `<figure>` тег для цитат [`<blockquote>`](/html/blockquote/), хотя спецификация это не запрещает. В этом случае [скринридеры](/a11y/screenreaders/) будут слишком назойливо озвучивать все роли и повторять несколько раз подпись к цитате, если она завёрнута в `<figcaption>`.
