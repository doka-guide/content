---
title: "Слайдер"
description: "Пишем доступный слайдер на HTML, CSS и JavaScript."
authors:
  - annabaraulina
keywords:
  - доступность
related:
  - html/button
  - a11y/aria-labelledby
  - recipes/popup
tags:
  - recipe
---

## Задача

Карусель с изображениями или видео — популярная часть сайтов и лендигов. В то же время довольно спорная. С одной стороны, она позволяет экономить место и показать больше контента за счёт прокручивания слайдов. С другой — сделать удобный, а, главное, доступный для пользователя слайдер не такая простая задача.

В этом рецепте расскажем, как создать доступный слайдер, в котором учтём семантику и продумаем дизайн.

## Готовое решение

Для начала создадим HTML-разметку со всеми нужными элементами — контейнером, кнопками для переключения слайдов и, собственно, слайдами с картинками.

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
      aria-current="true"
      aria-label="Показать 1 из 4"
    >
    </button>
    <button
      class="button button-radio"
      aria-label="Показать 2 из 4"
    >
    </button>
    <button
      class="button button-radio"
      aria-label="Показать 3 из 4"
    >
    </button>
    <button
      class="button button-radio"
      aria-label="Показать 4 из 4"
    >
    </button>

    <button
      aria-label="Предыдущий"
      class="button button-prev"
    >
    </button>
    <button
      aria-label="Следующий"
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

Для стилизации и правильной работы слайдера используем такие [CSS-правила](/css/css-rule/):

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
  width: 15px;
  height: 15px;
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
  top: 50%;
  transform: translateY(-50%);
  border: none;
  width: 30px;
  height: 42px;
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
  left: -50px;
}

.button-next {
  right: -50px;
  transform: translateY(-50%) rotateY(180deg);
  transform-origin: center;
}

.slide-img {
  width: 100%;
  height: 225px;
  object-fit: cover;
  user-select: none;
}

.slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
  position: relative;
}

.slides {
  width: 100%;
}

.slide {
  text-align: center;
}

@media (max-width: 768px) {
  .slider {
    max-width: 260px;
  }

  .slide-img {
    height: 400px;
  }

  .button-prev {
    left: -40px;
  }

  .button-next {
    right: -40px;
  }
}
```

Для прокрутки и перемещения по слайдам с помощью стрелок и радиокнопок используем JavaScript:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider')
  const slides = slider.querySelectorAll('.slide')
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
      slide.hidden = index !== currentSlide
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

С точки зрения дизайна слайдера важно учесть особенности восприятия пользователей, которые чувствительны к контенту, который двигается. Это проблема для людей с когнитивными, моторными или зрительными особенностями. Так что слайдер должен быть под полным контролем пользователей.

### HTML

Мы решили не использовать автопрокрутку слайдов. Вместо автоматической прокрутки добавляем кнопки для последовательного переключения слайдов или быстрого перехода к нужному. Важно, чтобы кнопки были хорошо различимы на фоне слайдера. Мы хотим, чтобы они контрастировали по цветам, а также были расположены за пределами области со слайдами:

```html
<button
  aria-label="Предыдущий"
  class="button button-prev"
>
</button>

<button
  aria-label="Следующий"
  class="button button-next"
>
</button>
```

Мы намеренно не ограничиваемся одними стрелками для предыдущего и следующего слайда и предоставляем пользователю альтернативный способ навигации. С помощью специальных кнопок, которые называют _точками прогресса (progress dots)_, также показываем пользователю текущее положение в группе слайдов.

```html
<button
  class="button button-radio"
  aria-current="true"
  aria-label="Показать 1 из 4"
>
</button>

<button
  class="button button-radio"
  aria-label="Показать 2 из 4"
>
</button>

<button
  class="button button-radio"
  aria-label="Показать 3 из 4"
>
</button>

<button
  class="button button-radio"
  aria-label="Показать 4 из 4"
>
</button>
```

Также расположение кнопок в разметке компонента влияет на фокус при переключении слайдов с помощью клавиатуры. Порядок элементов в [DOM](/js/dom/) (Document Object Model) влияет на порядок, в котором пользователи скринридеров и клавиатуры перемещаются по странице. По этой причине рекомендуем располагать элементы навигации над слайдером, а не после него. В этом случае пользователю не нужно будет возвращаться назад, чтобы прокрутить слайды:

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
      aria-current="true"
      aria-label="Показать 1 из 4"
    >
    </button>
    <!-- Остальные кнопки, включая вперёд и назад -->
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
    <!-- Остальные слайды -->
  </div>
</div>
```

### Семантика и ARIA-разметка

В первую очередь используем семантические теги `<button>`, `<h2>` для заголовков слайдов и `<img>` для картинок с их кратким описанием в `alt`.

Картинки в слайдах описываем потому, что они важны для понимания того, как именно выглядят паттерны.

```html
<img
  class="slide-img"
  src="./images/summer.jpg"
  alt="Абстрактные цветы розовых, синих,
  малиновых и оранжевых оттенков на зелёном фоне."
>
```

Чтобы улучшить опыт пользователей [скринридеров](/a11y/screenreaders/), [голосового управления](/a11y/speech-recognition/) и других вспомогательных технологий, добавим в слайдер дополнительные ARIA-атрибуты и роли.

При помощи роли `region` и названия элемента в `aria-label`, мы создаём отдельную область слайдера на странице. Пользователи скринридеров смогут отслеживать, находятся ли они в какой-то области или вышли за её пределы. Код будет считываться скринридером как область или группа элементов слайдера с названием «Паттерны».

```html
<div
  class="slider"
  role="region"
  aria-label="Паттерны"
>
  <!-- Элементы слайдера -->
</div>
```

С помощью `role="group"` группируем элементы навигации, и даём им общее название в `aria-label` — «Управление слайдами». Это упрощает навигацию по слайдеру. Так пользователи скринридеров смогут быстро найти часть слайдера со всеми кнопками для управления им.

```html
<div
  class="controls"
  role="group"
  aria-label="Управление слайдами"
>
  <button
    class="button button-radio"
    aria-current="true"
    aria-label="Показать 1 из 4"
  >
  </button>
  <button
    class="button button-radio"
    aria-label="Показать 2 из 4"
  >
  </button>
  <button
    class="button button-radio"
    aria-label="Показать 3 из 4"
  >
  </button>
  <button
    class="button button-radio"
    aria-label="Показать 4 из 4"
  >
  </button>

  <button
    aria-label="Предыдущий"
    class="button button-prev"
  >
  </button>
  <button
    aria-label="Следующий"
    class="button button-next"
  >
  </button>
</div>
```

Так же образом поступаем и с содержимым слайдов, только в их случае даём им название через `aria-labelledby`, связанный с заголовком внутри элемента.

```html
<div
  class="slide"
  role="group"
  aria-roledescription="Slide"
  aria-labelledby="First design pattern"
  id="carousel-item-1"
>
  <img class="slide-img" src="./images/summer.jpg">
  <h2 id="carousel-item-1__heading">
    Паттерн «Лето»
  </h2>
</div>
```

Слайды, которые не видны, нужно скрывать не только визуально, но и для пользователей вспомогательных технологий. Для этого используем атрибут `hidden`:

```html
<!-- Активный слайд -->
<div
  class="slide"
  role="group"
  aria-roledescription="Slide"
  aria-labelledby="First design pattern"
  id="carousel-item-1"
>
  <img class="slide-img" src="./images/summer.jpg">
  <h2 id="carousel-item-1__heading">
    Паттерн «Лето»
  </h2>
</div>

<!-- Скрытые слайды -->
<div
  class="slide"
  role="group"
  aria-roledescription="Slide"
  aria-labelledby="Second design pattern"
  id="carousel-item-2"
  hidden
>
  <h2 id="carousel-item-2__heading">
    Паттерн «Цветочное поле»
  </h2>
  <img class="slide-img" src="./images/flowers.jpg">
</div>

<div
  class="slide"
  role="group"
  aria-roledescription="Slide"
  aria-labelledby="Third design pattern"
  id="carousel-item-3"
  hidden
>
  <h2 id="carousel-item-3__heading">
    Паттерн «Лиловый»
  </h2>
  <img class="slide-img" src="./images/lilac.jpg">
</div>

<div
  class="slide"
  role="group"
  aria-roledescription="Slide"
  aria-labelledby="Third design pattern"
  id="carousel-item-3"
  hidden
>
  <h2 id="Fourth design pattern">
    Паттерн «Алый»
  </h2>
  <img class="slide-img" src="./images/scarlet.jpg">
</div>
```

Для навигации по слайдеру важно использовать HTML-элемент `<button>`. Он по умолчанию работает с клавиатуры, а ещё у него уже есть семантика кнопки. Так как у кнопок нет видимых подписей, называем их через `aria-label`. Имена должны чётко передавать функциональность кнопок.

```html
<button
  class="button button_type_radio"
  tabindex="0"
  aria-disabled="true"
  aria-label="show slide 1 of 4"
>
</button>

<button
  class="button button_type_radio"
  tabindex="0"
  aria-disabled="false"
  aria-label="show slide 2 of 4"
>
</button>

<button
  class="button button_type_radio"
  tabindex="0"
  aria-disabled="false"
  aria-label="show slide 3 of 4"
>
</button>

<button
  class="button button_type_radio"
  tabindex="0"
  aria-disabled="false"
  aria-label="show slide 4 of 4"
>
</button>

<button
  aria-label="show previous slide"
  class="button prev-button"
>
</button>

<button
  aria-label="show next slide"
  class="button next-button"
>
</button>
```

### CSS

```css
.button_type_radio {
  background-color: transparent;
  margin: 0;
  padding: 0;
  width: 15px;
  height: 15px;
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

Кнопки для предыдущего и следующего слайда позиционируем с помощью `position: absolute`.

```css
.prev-button,
.next-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  width: 30px;
  height: 42px;
  background-color: transparent;
  background-image: url(arrow.svg);
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
}

.prev-button {
  left: -50px;
}

.next-button {
  right: -50px;
}
```

### JavaScript

На первом шаге деактивируем все кнопки и скрываем все слайды. После этого делаем активными и показываем только те элементы, которые соответствуют текущему слайду. Так навигация по слайдеру становится интуитивно понятной и предсказуемой для пользователя.

```javascript
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll('.slide');
  const controlButtons = document.querySelectorAll('.button');
  let currentSlide = 0;

  function updateSlider() {
    slides.forEach(slide => slide.hidden = true);
    controlButtons.forEach(btn => btn.setAttribute('aria-disabled', false));

    slides[currentSlide].hidden = false;

    controlButtons[currentSlide].setAttribute('aria-disabled', true)

    document.querySelectorAll('.button_type_radio').forEach((controller, index) => {
      if (index === currentSlide) {
        controller.classList.add('active');
      } else {
        controller.classList.remove('active');
      }
    });

    controlButtons[controlButtons.length - 2]
      .setAttribute('aria-disabled', currentSlide === 0 ? "true" : "false");

    controlButtons[controlButtons.length - 1]
      .setAttribute('aria-disabled', currentSlide === slides.length - 1 ? "true" : "false");
  }

  controlButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (index < slides.length) {
        currentSlide = index;
        updateSlider();
      } else {
        if (button.getAttribute('aria-label') === "show previous slide" && currentSlide > 0) {
          currentSlide--;
        } else if (button.getAttribute('aria-label') === "show next slide" && currentSlide < slides.length - 1) {
          currentSlide++;
        }
        updateSlider();
      }
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' && currentSlide > 0) {
      currentSlide--;
      updateSlider();
    } else if (event.key === 'ArrowRight' && currentSlide < slides.length - 1) {
      currentSlide++;
      updateSlider();
    }
  });

  updateSlider();
});
```
