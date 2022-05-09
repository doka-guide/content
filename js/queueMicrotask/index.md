---
title: "`queueMicrotask()`"
description: "Брат `setTimeout`, или как добавить синхронную функцию в очередь микрозадач"
authors:
  - corocoto
contributors:
  - nlopin
keywords:
  - macrotasks
  - microtasks
  - sync-to-async
tags:
  - doka
---

## Кратко

Браузерное API, которое выполняет переданный код асинхронно.

## Как пишется

`queueMicrotask()`:
* Принимает функцию, которая будет передана в очередь микрозадач;
* Является процедурой, поэтому всегда возвращает `undefined`.

```js
queueMicrotask(() => {
    console.log('Хэй, я выполнюсь асинхронно благодаря queueMicrotask');
});
```

## Как понять

Код выше схож со сценарием использования [`setTimeout()`](/js/settimeout/). Оба выполнят код асинхронно:

```js
setTimeout(() => {
    console.log('Хэй, я выполнюсь асинхронно благодаря setTimeout');
}, 0);
```

Так в чем же принципиальная разница между ними?

`queueMicrotask()` добавляет переданную функцию в _очередь микрозадач_. Функции в этой очереди выполняются одна за другой (_FIFO: First in First Out_) — когда текущая функция выполнилась, запускается следующая функция в очереди.

Микрозадачи будут выполнены только после того, как текущий _[стек вызовов](/js/async-in-js/#stek-vyzovov)_ окажется пустым, но перед выполнением _[цикла событий](/js/async-in-js/#cikl-sobytiy)_.

Если вернуться к сравнению с `setTimeout()`, то передаваемые функции этого API будут относится к разряду _макрозадач_. Каждая из них будет взята из очереди задач, после того как управление передастся циклу событий.

Поэтому, если вызвать `queueMicrotask()` после `setTimeout()`, или наоборот - функция, переданная в `queueMicrotask()`, начнёт своё исполнение первой.

<aside>

ⓘ Рассмотрим микро и макрозадачи чуть детальней:

![схема событийного цикла](/js/queueMicrotask/images/event-loop-schema.png)

JavaScript имеет в своём арсенале различные _виды очередей_, а также _стек вызовов_. Давайте кратко разберём необходимый минимум, который поможет разобраться с процессом работы:
* _Стек вызовов_ — является контейнером для выполнения синхронных операций
* _Очередь микрозадач_ — является контейнером для выполнения асинхронных операций, имеющих высокий приоритет;
* _Очередь макрозадач_ — является контейнером для выполнения асинхронных операций с низким приоритетом.

Что же, кажется, самое время рассмотреть процесс работы между этими самыми элементами:
* Первый, кто начинает процесс выполнения — стек вызовов;
* После того, как JavaScript убеждается, в том, что стек пуст — ответственность переходит к очереди микрозадач;
* Процесс выполнения продолжается до тех пор, пока не станет ясно, что очередь опустела или не требуется каких-либо выполнений. Как только это произойдёт — в игру вступает очередь макрозадач;
* Очередь макрозадач является завершающим этапом. После того как список в нем станет пустым — все повторяется по новой.

</aside>

### Пример

Убедимся, что функция,  переданная в `queueMicrotask()` выполнится раньше, чем через `setTimeout()`. Для этого создадим страницу с формой, в которой будут находиться `<textarea>` и кнопка добавления записей в этот элемент:

```html
<form class="compare-form" name="compare-form">
  <label for="compare-form__textarea">
    Вывод значений с помощью <code>queueMicrotask</code> и <code>setTimeout</code>:
  </label>
  <textarea
    name="compare-form__textarea"
    id="compare-form__textarea"
    class="compare-form__textarea"
    cols="40"
    rows="20"
    disabled
  ></textarea>
  <button type="submit" class="compare-form__submit-button">Вывести текст</button>
  <button type="reset" class="compare-form__reset-button">Очистить содержимое textarea</button>
</form>
```

Предотвратим стандартное поведение формы при отправке данных:

```html
<script>
  const form = document.querySelector('.compare-form');

  const handleFormSubmit = (e) => {
    e.preventDefault()
  };

  form.addEventListener('submit', handleFormSubmit);
</script>
```

Далее, навесим обработчик события на кнопку вывода теста, в котором первым будет располагаться `setTimeout()`, а после него `queueMicrotask()`:

```html
<script>
  const form = document.querySelector('.compare-form');
  const submitButton = document.querySelector('.compare-form__submit-button');
  const textarea = document.querySelector('.compare-form__textarea');

  const handleFormSubmit = (e) => {
    e.preventDefault()
  };

  const handleSubmitButtonClick = () => {
    setTimeout(() => {
      textarea.value += 'Фраза добавлена с помощью setTimeout()\n\n';
    }, 0);
    queueMicrotask(() => {
      textarea.value += 'Фраза добавлена с помощью queueMicrotask()\n';
    });
  };

  form.addEventListener('submit', handleFormSubmit);
  submitButton.addEventListener('click', handleSubmitButtonClick);
</script>
```

Вот и все! Давайте посмотрим, что у нас получилось:

<iframe title="Сравнение queueMicrotask() и setTimeout()" src="demos/queueMicrotask-vs-setTimeout/" height="450"></iframe>

### Подсказки

Основная причина использования `queueMicrotask()` — обеспечение последовательности выполнения задач, одновременно снижая риск заметных пользователю задержек в операциях.

Давайте рассмотрим одну из рекомендаций, цель которой — обеспечение порядка выполнения кода в условных операторах.

Представим ситуацию, в которой необходимо получать данные по указанному урлу. Либо же, если запрос выполнялся ранее  — запросить данные из кэша:

```js
getData(url) {
  if (this.cache[url]) {
    this.data = this.cache[url];
    textarea.dispatchEvent(new Event('data-loaded'));
  } else {
    fetch(url)
      .then((response) => response.json())
      .then(({ data }) => {
        this.cache[url] = data;
        this.data = data;
        textarea.dispatchEvent(new Event('data-loaded'));
      });
  }
}
```

_Какую проблему тут можно заметить?_

В теле одного условия используется цепочка промисов, в другом — обычное синхронное выполнение. Из этого можно сделать вывод, что в разных условиях, процесс выполнения также будет отличаться.

Давайте посмотрим, к каким результатам это может привести. Для этого необходимо нажать на кнопку получения данных 2 раза:

<iframe title="Неочевидный порядок выполнения кода" src="demos/when-to-use/ordering-with-conditional-operator/not-obvious/" height="450"></iframe>

После второго нажатия, когда данные берутся из кэша, можно заметить недочёт. Строка «Процесс загрузки данных выполняется...» выводится после «Данные загружены». Причём, когда данные приходили впервые — вывод строк был совершенно иным.

Чтобы исправить проблему, необходимо обернуть тело первого условного блока в `queueMicrotask()`:

```js
if (this.cache[url]) {
  queueMicrotask(() => {
    this.data = this.cache[url];
    textarea.dispatchEvent(new Event('data-loaded'));
  });
}
```

Взглянем на итоговое решение после небольшой корректировки:

<iframe title="Очевидный порядок выполнения кода" src="demos/when-to-use/ordering-with-conditional-operator/obvious/" height="450"></iframe>

Отлично! Теперь процесс выполнения работает идентично как при получении данных с сервера, так и при вытаскивании их из кэша.
