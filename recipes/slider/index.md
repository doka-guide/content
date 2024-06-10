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
  tabindex="0"
  role="region"
  aria-roledescription="Content Slider"
  aria-label="Design patterns"
>
  <div
    class="controls"
    role="group"
    aria-label="Slide controls"
  >
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
  </div>

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

  <div
    class="slide"
    role="group"
    aria-roledescription="Slide"
    aria-labelledby="Second design pattern"
    id="carousel-item-2"
    hidden
  >
    <img class="slide-img" src="./images/flowers.jpg">
    <h2 id="carousel-item-2__heading">
      Паттерн «Цветочное поле»
    </h2>
  </div>

  <div
    class="slide"
    role="group"
    aria-roledescription="Slide"
    aria-labelledby="Third design pattern"
    id="carousel-item-3"
    hidden
  >
    <img class="slide-img" src="./images/lilac.jpg">
    <h2 id="carousel-item-3__heading">
      Паттерн «Лиловый»
    </h2>
  </div>

  <div
    class="slide"
    role="group"
    aria-roledescription="Slide"
    aria-labelledby="Third design pattern"
    id="carousel-item-3"
    hidden
  >
    <img class="slide-img" src="./images/scarlet.jpg">
    <h2 id="Fourth design pattern">
      Паттерн «Алый»
    </h2>
  </div>
</div>
```

Для стилизации и правильной работы слайдера используем такие [CSS-правила](/css/css-rule/):

```css
.button_type_radio {
  background-color: transparent;
  margin: 0;
  padding: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #868A8F;
  margin-right: 12px;
}

.button_type_radio.active {
  background-color: #53d67b;
}

.prev-button,
.next-button {
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  width: 40px;
  height: auto;
}

.prev-button {
  left: -40px;
  transform: rotate(45deg);
  transform-origin: center;
}

.next-button {
  right: -40px;
  transform: rotate(-45deg);
  transform-origin: center;
}

.slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 370px;
  width: 100%;
  position: relative;
}

.slide {
  text-align: center;
  width: 100%;
}

[aria-label="Design patterns"]:focus {
  outline: 4px solid DodgerBlue;
  outline-offset: -6px;
}
```

Для прокрутки и перемещения по слайдам с помощью стрелок и радиокнопок используем JavaScript:

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

<iframe title="Пример слайдера" src="demos/slider-demo/" height="450"></iframe>

## Разбор решения

### Дизайн

С точки зрения дизайна слайдера важно учесть особенности восприятия пользователей, которые чувствительны к контенту, который двигается. Это проблема для людей с когнитивными, моторными или зрительными особенностями. Так что слайдер должен быть под полным контролем пользователей.

### HTML

Мы решили исключить автопрокрутку слайдов. Вместо автоматической прокрутки используем кнопки для последовательного переключения слайдов или быстрого перехода к нужному. Важно, чтобы кнопки были хорошо различимы на фоне слайдера. Мы хотим, чтобы они контрастировали по цветам, а также были расположены за пределами области со слайдами:

```html
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

Мы намеренно не ограничиваемся одними стрелками для предыдущего и следующего слайда и предоставляем пользователю альтернативный способ навигации. С помощью специальных кнопок, которые называют _точками прогресса (progress dots)_, также показываем пользователю текущее положение в группе слайдов.

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
```

Также расположение кнопок в разметке компонента влияет на фокус при переключении слайдов с помощью клавиатуры. Порядок элементов в [DOM](/js/dom/) (Document Object Model) влияет на порядок, в котором пользователи скринридеров и клавиатуры перемещаются по странице. По этой причине рекомендуем располагать элементы навигации над слайдером, а не после него. В этом случае пользователю не нужно будет возвращаться назад, чтобы прокрутить слайды:

```html
<div
  class="slider"
  tabindex="0"
  role="region"
  aria-roledescription="Content Slider"
  aria-label="Design patterns"
>
  <div
    class="controls"
    role="group"
    aria-label="Slide controls"
  >
    <button
      class="button button_type_radio"
      tabindex="0"
      aria-disabled="true"
      aria-label="show slide 1 of 4"
    >
    </button>
    <!-- Остальные кнопки-->
  </div>

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
  <!-- Остальные слайды -->
</div>
```

### Семантика и ARIA-разметка

В первую очередь используем семантические теги `<button>`, `<h2>` для заголовков слайдов и `<img>` для картинок с их кратким описанием в `alt`.

Чтобы улучшить опыт пользователей [скринридеров](/a11y/screenreaders/), [голосового управления](/a11y/speech-recognition/) и других вспомогательных технологий, добавим в слайдер дополнительные ARIA-атрибуты и роли.

При помощи роли `region` и названия в `aria-label` для всего элемента, мы создаём отдельную область слайдера на странице. Пользователи скринридеров смогут отслеживать, находятся ли они в какой-то области или вышли за её пределы. Код будет считываться скринридером как область или группа элементов слайдера.

```html
<div
  class="slider"
  tabindex="0"
  role="region"
  aria-roledescription="Content Slider"
  aria-label="Design patterns"
>
  <!-- Элементы слайдера -->
</div>
```

С помощью `role="group"` группируем элементы навигации. В паре с доступным именем группы в `aria-label` они тоже объясняют пользователю, где именно он находится внутри слайдера:

```html
<div
  class="controls"
  role="group"
  aria-label="Slide controls"
>
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
