---
title: "Слайдер"
description: "Пишем доступный слайдер на HTML, CSS и JavaScript."
authors:
  - annabaraulina
contributors:
  - tatianafokina
  - skorobaeus
keywords:
  - баннеры
  - перелистывающиеся баннеры
  - css-слайдер
related:
  - a11y/aria-labelledby
  - html/button
  - recipes/popup
tags:
  - article
---

## Задача

Слайдер или слайд-шоу — распространённый дизайнерский паттерн на сайтах, особенно на лендингах. Слайдер состоит из нескольких слайдов, обычно с изображениями или с видео-контентом. Между слайдами можно переключаться, также бывают варианты с автоматической прокруткой и кнопками для управления анимацией.

<aside>

🎠 Слайдер часто называют каруселью. Хотя это похожие паттерны, между ними есть разница. В слайдерах всегда виден только один слайд, а в каруселях — несколько. Также каруселью считают слайдеры с автоматической прокруткой содержимого.

</aside>

Слайдер — неоднозначный элемент. С одной стороны, он экономит место на странице, вмещает больше контента за счёт прокрутки, а ещё привлекает внимание. С другой — его сложно сделать удобным и доступным для всех пользователей.

В этом рецепте расскажем, как создать доступный слайдер, в котором подумаем про дизайн и учтём семантику.

## Готовое решение

Для начала создадим HTML-разметку со всеми нужными элементами — общим контейнером, кнопками для переключения слайдов и самими слайдами с картинками и заголовками.

```html
<div
  class="slider"
  role="region"
  aria-label="Паттерны"
>
  <div
    class="controls"
    role="group"
    aria-label="Управление слайдами"
  >
    <button
      class="button button-radio"
      type="button"
      aria-current="true"
      aria-label="Показать 1 из 4"
    >
    </button>
    <button
      class="button button-radio"
      type="button"
      aria-label="Показать 2 из 4"
    >
    </button>
    <button
      class="button button-radio"
      type="button"
      aria-label="Показать 3 из 4"
    >
    </button>
    <button
      class="button button-radio"
      type="button"
      aria-label="Показать 4 из 4"
    >
    </button>

    <button
      aria-label="Предыдущий"
      type="button"
      class="button button-prev"
    >
    </button>
    <button
      aria-label="Следующий"
      type="button"
      class="button button-next"
    >
    </button>
  </div>

  <div class="slides" aria-live="polite">
    <div
      class="slide"
      role="group"
      aria-labelledby="item-1-label"
      id="carousel-item-1"
    >
      <img
        class="slide-img"
        src="./images/summer.jpg"
        alt="Абстрактные цветы розовых, синих,
        малиновых и оранжевых оттенков на зелёном фоне."
      >
      <h2 id="item-1-label">Паттерн «Лето»</h2>
    </div>
    <div
      class="slide"
      role="group"
      aria-labelledby="item-2-label"
      id="carousel-item-2"
    >
      <img
        class="slide-img"
        src="./images/flowers.jpg"
        alt="Цветы с расплывчатыми контурами, похожие на маки.
        Преобладает розовый, тёмно-зелёный, красный и фиолетовый цвет."
      >
      <h2 id="item-2-label">Паттерн «Цветочное поле»</h2>
    </div>
    <div
      class="slide"
      role="group"
      aria-labelledby="item-3-label"
      id="carousel-item-3"
    >
      <img
        class="slide-img"
        src="./images/lilac.jpg"
        alt="Несколько пятен розовых оттенков в форме цветов.
        На их фоне салатовые, тёмно-зелёные и фисташковые брызги."
      >
      <h2 id="item-3-label">Паттерн «Лиловый»</h2>
    </div>
    <div
      class="slide"
      role="group"
      aria-labelledby="item-4-label"
      id="carousel-item-4"
    >
      <img
        class="slide-img"
        src="./images/scarlet.jpg"
        alt="Несколько абстрактных роз в виде пятен алого цвета."
      >
      <h2 id="item-4-label">Паттерн «Алый»</h2>
    </div>
  </div>
</div>
```

Для стилизации слайдера используем такие [CSS-правила](/css/css-rule/):

```css
.controls {
  margin-block-end: 20px;
}

.button {
  cursor: pointer;
  user-select: none;
}

.button-radio {
  background-color: transparent;
  margin: 0;
  padding: 0;
  inline-size: 15px;
  block-size: 15px;
  border-radius: 50%;
  border: 1px solid #FFFFFF;
}

.button-radio + .button-radio {
  margin-inline-start: 12px;
}

.button-radio.active {
  background-color: #C56FFF;
  pointer-events: none;
}

.button-radio:focus-visible {
  outline: 3px solid white;
  outline-offset: -1px;
}

.button-prev,
.button-next {
  position: absolute;
  inset-block-start: 50%;
  transform: translateY(-50%);
  border: none;
  inline-size: 30px;
  block-size: 42px;
  background-color: transparent;
  background-image: url(./images/arrow.svg);
  background-repeat: no-repeat;
  background-size: contain;
}

.button-prev[aria-disabled="true"],
.button-next[aria-disabled="true"] {
  opacity: 0.5;
  pointer-events: none;
}

.button-prev {
  inset-inline-start: -50px;
}

.button-next {
  inset-inline-end: -50px;
  transform: translateY(-50%) rotateY(180deg);
  transform-origin: center;
}

.slide-img {
  display: block;
  inline-size: 100%;
  block-size: 225px;
  max-block-size: 225px;
  object-fit: cover;
}

.slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-inline-size: 600px;
  inline-size: 100%;
  position: relative;
}

.slides {
  inline-size: 100%;
}

.slide {
  display: none;
  text-align: center;
}

.slide--active {
  display: block;
}

@media (max-width: 768px) {
  .slider {
    max-inline-size: 260px;
  }

  .slide-img {
    block-size: 400px;
  }

  .button-prev {
    inset-inline-start: -40px;
  }

  .button-next {
    inset-inline-end: -40px;
  }
}
```

Для прокрутки и перемещения по слайдам с помощью кнопок и клавиатурных клавиш со стрелками используем JavaScript:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider')
  const slides = slider.querySelectorAll('.slide')
  const activeSlides = 'slide--active'
  const slideCount = slides.length
  const controlButtons = slider.querySelectorAll('.button-radio')
  const prevButton = slider.querySelector('.button-prev')
  const nextButton = slider.querySelector('.button-next')
  const activeButton = 'active'
  const inactiveButton = 'aria-disabled'
  const currentButton = 'aria-current'
  let currentSlide = 0

  function updateSlider() {
    slides.forEach((slide, index) => {
      if(index === currentSlide) {
        slide.classList.add(activeSlides)
      } else {
        slide.classList.remove(activeSlides)
      }
    })

    controlButtons.forEach((button, index) => {
      if (index === currentSlide) {
        button.classList.add(activeButton)
        button.setAttribute(currentButton, true)
      } else {
        button.classList.remove(activeButton)
        button.removeAttribute(currentButton, true)
      }

      prevButton.setAttribute(inactiveButton, currentSlide === 0)
      nextButton.setAttribute(inactiveButton, currentSlide === slideCount - 1)
    })
  }

  controlButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (index < slideCount) {
        currentSlide = index
        updateSlider()
      }
    })
  })

  prevButton.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--
      updateSlider()
    }
  })

  nextButton.addEventListener('click', () => {
    if (currentSlide < slideCount - 1) {
      currentSlide++
      updateSlider()
    }
  })

  slider.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' && currentSlide > 0) {
      currentSlide--
      updateSlider()
    } else if (event.key === 'ArrowRight' && currentSlide < slideCount - 1) {
      currentSlide++
      updateSlider()
    }
  })

  updateSlider()
})
```

<iframe title="Пример слайдера" src="demos/slider-demo/" height="450"></iframe>

## Разбор решения

### Дизайн

С точки зрения дизайна важно учесть особенности восприятия пользователей, которые чувствительны к движущемуся контенту. Это проблема для людей с когнитивными, моторными или зрительными особенностями.

Слайдер должен быть под полным контролем пользователей, поэтому мы не будем добавлять автопрокрутку.

### HTML

Вместо автоматической прокрутки добавляем кнопки для последовательного переключения слайдов. Важно, чтобы интерактивные элементы контрастировали с фоном слайдера. Так как тип кнопок по умолчанию `submit`, установим руками другой тип `button`. Мы не отправляем данные на сервер, и нам не нужна перезагрузка страницы.

```html
<button
  aria-label="Предыдущий"
  class="button button-prev"
  type="button"
>
</button>
```

Не ограничивайтесь одними стрелками для предыдущего и следующего слайда и предоставляйте пользователю альтернативный способ навигации. С помощью специальных кнопок, которые называют _точками прогресса (progress dots)_, также показываем пользователю текущее положение в группе слайдов.

```html
<button
  class="button button-radio"
  type="button"
  aria-current="true"
  aria-label="Показать 1 из 4"
>
</button>

<!-- Остальные кнопки -->
```

Расположение элементов в [DOM](/js/dom/) (Document Object Model) влияет на порядок, в котором пользователи клавиатуры перемещаются по странице. По этой причине располагаем элементы навигации перед слайдером, а не после него. В этом случае пользователю не нужно будет возвращаться назад, чтобы прокрутить слайды:

```html
<div
  class="controls"
  role="group"
  aria-label="Управление слайдами"
>
  <!-- Сначала кнопки-точки, потом вперёд и назад -->
</div>

<div class="slides" aria-live="polite">
  <!-- Слайды -->
</div>
```

Содержимое слайдов группируем в одном [`<div>`](/html/div/).

```html
<div
  class="slide"
  role="group"
  aria-labelledby="item-1-label"
  id="carousel-item-1"
>
  <!-- Содержимое -->
</div>
```

### Семантика и ARIA-разметка

В первую очередь используем семантические теги [`<button>`](/html/button/), [`<h2>`](/html/h1-h6/) для заголовков слайдов и [`<img>`](/html/img/) для картинок с их кратким описанием в `alt`.

Чтобы улучшить опыт пользователей [скринридеров](/a11y/screenreaders/), [голосового управления](/a11y/speech-recognition/) и других вспомогательных технологий, добавим в слайдер дополнительные [ARIA-атрибуты](/a11y/aria-attrs/) и [ARIA-роли](/a11y/aria-roles/).

С помощью роли [`region`](/a11y/role-region/) и названия элемента в [`aria-label`](/a11y/aria-label/), создаём отдельную область слайдера на странице. Пользователи скринридеров смогут отслеживать, находятся ли они в этой области или вышли из неё. Код будет зачитываться скринридером как область или группа элементов слайдера с названием «Паттерны».

```html
<div
  class="slider"
  role="region"
  aria-label="Паттерны"
>
  <!-- Элементы слайдера -->
</div>
```

Благодаря [`role="group"`](/a11y/role-group/) группируем элементы навигации, и даём им общее название в `aria-label` — «Управление слайдами». Это упрощает навигацию по слайдеру. Так пользователи скринридеров смогут быстро найти часть слайдера со всеми кнопками для управления им.

```html
<div
  class="controls"
  role="group"
  aria-label="Управление слайдами"
>
  <!-- Кнопки -->
</div>
```

Контейнеру со всеми слайдами задаём [`aria-live="polite"`](/a11y/aria-live/). Этот атрибут делает эту часть страницы [изменяющейся область (live region)](/a11y/live-region/). Это значит, что скринридер автоматически зачитает содержимое нового слайда при пролистывании. Мы используем значение `polite`, чтобы скринридер не спешил сразу рассказать об изменениях.

```html
<div class="slides" aria-live="polite">
  <!-- Слайды -->
</div>
```

<aside>

☝️ Если решились на автоматическую прокрутку, не забудьте переключить значение `aria-live` с `polite` на `off`, если пользователь вышел из слайдера.

</aside>

Таким же образом поступаем и с содержимым слайдов. Группируем слайды через роль `group`, а вот название задаём через атрибут [`aria-labelledby`](/a11y/aria-labelledby/), связанный с заголовком через `id` с уникальным значением. Это лучшее решение, так как в слайде уже есть видимый заголовок.

```html
<div
  class="slide"
  role="group"
  aria-labelledby="item-1-label"
  id="carousel-item-1"
>
  <!-- Картинка -->
  <h2 id="item-1-label">Паттерн «Лето»</h2>
</div>
```

Слайды, которые не видны, скрываем не только визуально, но и для пользователей вспомогательных технологий. Для этого используем CSS-свойство [`display: none`](/css/display/) для всех слайдов по умолчанию. Для активного слайда добавим класс `.slide--active` с другим значением у `display` — `none`.

Это активный слайд:

```html
<div
  class="slide slide--active"
  role="group"
  aria-labelledby="item-1-label"
  id="carousel-item-1"
>
  <!-- Содержимое слайда -->
</div>
```

А это все скрытые слайды:

```html
<div
  class="slide"
  role="group"
  aria-labelledby="item-2-label"
  id="carousel-item-2"
>
  <!-- Содержимое слайда -->
</div>
```

Для навигации по слайдеру важно использовать настоящую кнопку `<button>`. Она работает с клавиатуры по умолчанию, а ещё у неё уже есть нужная семантика. Так как в кнопках нет видимого текста, называем их через `aria-label`. Имена должны чётко передавать функциональность элементов. Кнопки-точки для переключения между слайдами назовём «Показать 1/2/3/4 из 4». Хорошо рассказать пользователям не только к какому слайду они перейдут, но и сколько их всего.

```html
<button
  class="button button-radio"
  type="button"
  aria-label="Показать 2 из 4"
>
</button>
```

С кнопками для пролистывания слайдов в одном направлении всё ещё проще: «Следующий» для кнопки вперёд и «Предыдущий» для кнопки назад.

```html
<button
  aria-label="Предыдущий"
  class="button button-prev"
  type="button"
>
</button>
<button
  aria-label="Следующий"
  class="button button-next"
  type="button"
>
</button>
```

Чтобы не делать неактивными кнопки-точки и передать, что пользователь вспомогательной технологии выбрал конкретный по счёту слайд, навесим атрибут [`aria-current`](/a11y/aria-current/). Он сообщает, в каком месте слайдера сейчас находится пользователь скринридера. Так как по умолчанию слайдер показывает первый слайд, на старте добавим атрибут к первой кнопке.

```html
<button
  class="button button-radio"
  type="button"
  aria-current="true"
  aria-label="Показать 1 из 4"
>
</button>
```

Теперь сложный и дискуссионный момент. Кнопка для перемещения к предыдущему слайду неактивна, когда мы на первом слайде. Кнопка «Следующий» перестаёт работать, когда выбран последний слайд. Чтобы передать это не только визуально через CSS, но и в HTML, используем атрибут [`aria-disabled`](/a11y/aria-disabled/). Почему? ARIA-атрибут для неактивных кнопок остаётся доступен для вспомогательных технологий и, при этом, на них всё ещё можно установить клавиатурный фокус. HTML-атрибут [`disabled`](/html/disabled/) полностью недоступен для всех. Это иногда приводит к тому, что пользователи скринридеров неожиданно «теряют» кнопки на странице. Чтобы кнопки не были неактивными по умолчанию, добавляем атрибут через JavaScript. Если что-то пошло не так со скриптом, интерактивные элементы всегда будут активными.

Не забудем описать картинки в слайдах. В этом случае они не декоративные и важны для понимания. Без этого сложно представить, как именно выглядят наши паттерны.

```html
<img
  class="slide-img"
  src="./images/summer.jpg"
  alt="Абстрактные цветы розовых, синих,
  малиновых и оранжевых оттенков на зелёном фоне."
>
```

### CSS

Сначала задаём стили для всего слайдера. Делаем его флекс-контейнером, выстраиваем элементы в колонку, центрируем через `align-items: center;` и задаём максимальную ширину `max-width`. Так как у нас есть кнопки со стрелками в право и левой части слайдера, добавляем всему контейнеру `position: relative`.

```css
.slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-inline-size: 600px;
  inline-size: 100%;
  position: relative;
}
```

Сами слайды и картинки в них растягиваем на всю доступную ширину, а картинке задаём [`object-fit`](/css/object-fit/), чтобы пропорции картинки не искажались.

```css
.slides {
  inline-size: 100%;
}

.slide {
  text-align: center;
}

.slide-img {
  width: 100%;
  height: 225px;
  object-fit: cover;
}
```

Кнопки-точки скругляем с помощью [`border-radius`](/css/border-radius/), а с помощью изменения цвета фона показываем активную кнопку. Также не забываем и про стили для клавиатурного фокуса [`:focus-visible`](/css/focus-visible/).

```css
.button_type_radio {
  background-color: transparent;
  margin: 0;
  padding: 0;
  inline-size: 15px;
  block-size: 15px;
  border-radius: 50%;
  border: 1px solid #868A8F;
}

.button_type_radio.active {
  background-color: #53d67b;
}

.button_type_radio:focus-visible {
  outline: 3px solid white;
  outline-offset: -1px;
}
```

Кнопки для предыдущего и следующего слайда позиционируем с помощью [`position: absolute`](/css/position/) и отрицательных значений для [`inset-inline-start`](/css/inset/) и [`inset-inline-end`](/css/inset/) соответственно. Стрелки добавляем через свойство [`background-image`](/css/background-image/).

```css
.prev-button,
.next-button {
  position: absolute;
  inset-block-start: 50%;
  transform: translateY(-50%);
  border: none;
  inline-size: 30px;
  block-size: 42px;
  background-color: transparent;
  background-image: url(arrow.svg);
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
}

.button-prev {
  inset-inline-start: -40px;
}

.button-next {
  inset-inline-end: -40px;
  transform: translateY(-50%) rotateY(180deg);
  transform-origin: center;
}
```

Находим неактивные кнопки со стрелками по атрибуту `aria-disabled="true"`, добавляем для них небольшую прозрачность через `opacity` и добавляем для пользователей мышки свойство `pointer-events: none`.

```css
.button-prev[aria-disabled="true"],
.button-next[aria-disabled="true"] {
  opacity: 0.5;
  pointer-events: none;
}
```

Слайдер можно анимировать на свой вкус. Если используете анимацию, оберните соответствующие правила в директиву [`@media`](/css/media/) со значением [`prefers-reduced-motion: no-preference`](/a11y/prefers-reduced-motion/). Так пользователи, которые отключили анимацию у себя в системе, не столкнутся с анимацией в слайдере.

### JavaScript

Для начала будем слушать событие окончания парсинга страницы [`DOMContentLoaded`](/js/event-domcontentloaded/), прежде чем добавлять все нужные атрибуты в слайдер.

```javascript
document.addEventListener('DOMContentLoaded', function () {
  // Тело скрипта
})
```

Теперь скрываем все слайды, кроме текущего. По умолчанию это первый слайд.

```javascript
const slider = document.querySelector('.slider')
const slides = slider.querySelectorAll('.slide')
const activeSlides = 'slide--active'
let currentSlide = 0

slides.forEach((slide, index) => {
  if(index === currentSlide) {
    slide.classList.add(activeSlides)
  } else {
    slide.classList.remove(activeSlides)
  }
})
```

После делаем активными и показываем только те элементы, которые соответствуют текущему слайду. На этом шаге переключаем значение атрибута `aria-current` с `true` на `false` и добавляем и удаляем с кнопок `aria-disabled`.

```javascript
const slideCount = slides.length
const controlButtons = slider.querySelectorAll('.button-radio')
const prevButton = slider.querySelector('.button-prev')
const nextButton = slider.querySelector('.button-next')
const activeButton = 'active'
const inactiveButton = 'aria-disabled'
const currentButton = 'aria-current'

let currentSlide = 0

function updateSlider() {
  controlButtons.forEach((button, index) => {
    if (index === currentSlide) {
      button.classList.add(activeButton)
      button.setAttribute(currentButton, true)
    } else {
      button.classList.remove(activeButton)
      button.removeAttribute(currentButton, true)
    }

    prevButton.setAttribute(inactiveButton, currentSlide === 0)
    nextButton.setAttribute(inactiveButton, currentSlide === slideCount - 1)
  })
}
```

Чтобы кнопки начали переключать слайды, будем слушать событие [`click`](/js/element-click/) на них. Пройдёмся по массиву кнопок-точек. Проверим, что кнопке соответствует нужный слайд, а потом перейдём к слайду с тем же порядковым номером, что у кнопки.

```javascript
const slideCount = slides.length
const controlButtons = slider.querySelectorAll('.button-radio')

controlButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (index < slideCount) {
      currentSlide = index
      updateSlider()
    }
  })
})
```

А так поступим с кнопками для переключения слайдов в одном направлении:

```javascript
const prevButton = slider.querySelector('.button-prev')
const nextButton = slider.querySelector('.button-next')

prevButton.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--
    updateSlider()
  }
})

nextButton.addEventListener('click', () => {
  if (currentSlide < slideCount - 1) {
    currentSlide++
    updateSlider()
  }
})
```

Наконец, дополнительно предусмотрим перелистывание слайдов клавиатурными стрелками. Для этого слушаем событие [`keydown`](/js/element-keydown/) для клавиш `ArrowLeft` и `ArrowRight`.

```javascript
slider.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft' && currentSlide > 0) {
    currentSlide--
    updateSlider()
  } else if (event.key === 'ArrowRight' && currentSlide < slideCount - 1) {
    currentSlide++
    updateSlider()
  }
})
```
