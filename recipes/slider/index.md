---
title: "Слайдер"
description: "Пишем доступный слайдер"
authors:
  - annabaraulina
contributors:
  - Никнеймы всех соавторов и контрибьюторов
editors:
  - Никнеймы всех редакторов
keywords:
  - карусель
  - доступность
  - доступный слайдер
  - доступная карусель
related:
  - Ссылка на материал Доки по теме
tags:
  - doka
  - recipe
---

## Задача

Карусель изображений или видео - популярная часть сайтов и лендигов. В то же время довольно спорная. С одной стороны, она позволяет экономить место и показать больше контента за счет прокручивания слайдов. С другой - сделать удобный, а главное доступный для пользователя слайдер не самая простая задача.

В этой статье мы покажем рецепт доступного слайдера, подход к которому обдуман с нескольких точек зрения: дизайна, семантики и разметки.

## Готовое решение

Для начала создадим HTML-разметку со всеми необходимыми элементами:

```html
  <div class="slider" tabindex="0" role="region" aria-roledescription="Content Slider" aria-label="Design patterns">
    <div class="controls" role="group" aria-label="Slide controls">
      <button class="button button_type_radio" tabindex="0" aria-disabled="true" aria-label="show slide 1 of 4">
      </button>
      <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 2 of 4">
      </button>
      <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 3 of 4">
      </button>
      <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 4 of 4">
      </button>
      <button aria-label="show previous slide" class="button prev-button">
        <img class="prev-button" src="./images/arrow-down.svg">
      </button>
      <button aria-label="show next slide" class="button next-button">
        <img class="next-button" src="./images/arrow-down.svg">
      </button>
    </div>
    <div class='slide' role="group" aria-roledescription="Slide" aria-labelledby="First design pattern"
      id="carousel-item-1">
      <h3 id="carousel-item-1__heading">Паттерн "Лето"</h2>
        <img class="slideImg" src="./images/IMG_1945.JPG">
    </div>
    <div class='slide' hidden role="group" aria-roledescription="Slide" aria-labelledby="Second design pattern"
      id="carousel-item-2">
      <h3 id="carousel-item-2__heading">Паттерн "Цветочное поле"</h2>
        <img class="slideImg" src="./images/IMG_1946.JPG">
    </div>
    <div class='slide' hidden role="group" aria-roledescription="Slide" aria-labelledby="Third design pattern"
      id="carousel-item-3">
      <h3 id="carousel-item-3__heading">"Паттерн Лиловый"
      </h2>
        <img class="slideImg" src="./images/IMG_1947.JPG">
    </div>
    <div class='slide' hidden role="group" aria-roledescription="Slide" aria-labelledby="Third design pattern"
      id="carousel-item-3">
      <h3 id="Fourth design pattern">"Паттерн Алый"</h2>
        <img class="slideImg" src="./images/IMG_1948.JPG">
    </div>
  </div>
```

Для внешнего оформления, а также правильной работы слайдера, нам понадобятся следующие [CSS-правила](/css/css-rule/):

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

    .slideImg {
      width: auto;
      max-height: 370px;
      height: 100%;
      transform: rotate(90deg);
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

Для прокрутки слайдов с помощью стрелок и радио-кнопок будем использовать JavaScript:

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
                controlButtons[controlButtons.length - 2].setAttribute('aria-disabled', currentSlide === 0 ? "true" : "false");
                controlButtons[controlButtons.length - 1].setAttribute('aria-disabled', currentSlide === slides.length - 1 ? "true" : "false");
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

<iframe title='пример слайдера' src='demos/slider-demo/' height='600'></iframe>

## Разбор решения

### Разметка

С точки зрения дизайна для доступности важны несколько вещей. Чтобы слайдер был под полным контролем пользователя мы совершенно исключаем автопрокрутку контента. Движущийся контент может быть чувствителен для пользователей, в особенности для людей с когнитивными, моторными или зрительными нарушениями. Для переключения слайдов мы будем использовать стрелки и кнопки-контроллеры. Важно, чтобы и те и другие были хорошо различимы на фоне слайдера. Мы хотим, чтобы они контрастировали по цветам, а также были расположены вне контента слайдера:

```html
 <div class="slider" tabindex="0" role="region" aria-roledescription="Content Slider" aria-label="Design patterns">
        <div class="controls" role="group" aria-label="Slide controls">
            <button class="button button_type_radio" tabindex="0" aria-disabled="true" aria-label="show slide 1 of 4">
            </button>
            <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 2 of 4">
            </button>
            <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 3 of 4">
            </button>
            <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 4 of 4">
            </button>
            <button aria-label="show previous slide" class="button prev-button">
                <img class="prev-button" src="./images/left-arrow-svgrepo-com.svg">
            </button>
            <button aria-label="show next slide" class="button next-button">
                <img class="next-button" src="./images/right-arrow-svgrepo-com.svg">
            </button>
        </div>
```

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
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            cursor: pointer;
            width: 50px;
            height: auto;
        }

        .prev-button {
            left: -30px;
        }

        .next-button {
            right: -30px;
        }
```

Мы намеренно не ограничиваемся одними стрелками для предыдущего и следующего слайда и предоставляем пользователю альтернативный способ навигации. С помощью точек прогресса ("progress dots") мы также показываем юзеру текущее положение в наборе слайдов.

В то же время расположение кнопок в самой разметке компонента оказывает влияние на фокус на элементах при переключении слайдов с помощью клавиатуры. Порядок элементов в DOM влияет на порядок, в котором пользователи скринридеров просматривают содержимое страницы. По этой причине мы рекомендуем располагать элементы навигации над слайдером, а не после него. В этом случае пользователю не нужно будет возвращаться назад, чтобы прокрутить контент:

```html
    <div class="slider" tabindex="0" role="region" aria-roledescription="Content Slider" aria-label="Design patterns">
        <div class="controls" role="group" aria-label="Slide controls">
            <button class="button button_type_radio" tabindex="0" aria-disabled="true" aria-label="show slide 1 of 4">
            </button>
            <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 2 of 4">
            </button>
            <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 3 of 4">
            </button>
            <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 4 of 4">
            </button>
            <button aria-label="show previous slide" class="button prev-button">
                <img class="prev-button" src="./images/left-arrow-svgrepo-com.svg">
            </button>
            <button aria-label="show next slide" class="button next-button">
                <img class="next-button" src="./images/right-arrow-svgrepo-com.svg">
            </button>
        </div>
        <div class='slide' role="group" aria-roledescription="Slide" aria-labelledby="First design pattern"
            id="carousel-item-1">
            <h3 id="carousel-item-1__heading">Первый слайд</h2>
                <img class="slideImg" src="./images/IMG_1945.JPG">
  <...>
    </div>
```

Кнопки для предыдущего и следующего слайда мы позиционируем с помощью абсолютного позиционирования:

```css
        .prev-button,
        .next-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            cursor: pointer;
            width: 50px;
            height: auto;
        }

        .prev-button {
            left: -30px;
        }

        .next-button {
            right: -30px;
        }
```

### Семантика
Для пользователей программ чтения экрана важным является наличие семантических тегов role, aria-label и aria-roledescription, которые подскажут пользователю, что он столкнулся с интерактивным элементом. При помощи role='region',а также названия, которое мы задаем этой области элементов, мы задаем ориентацию на странице. Программа чтения с экрана будет отслеживать, находится ли пользователь в "регионе" или за его пределами.
Таким образом код с такой семантикой:

```html
<div class="slider" tabindex="0" role="region" aria-roledescription="Content Slider" aria-label="Design patterns">
  <...>
</div>

```

будет считываться скринридером как регион, или группа элементов, относящаяся к слайдеру.

С помощью role='group' мы обозначаем логическую группу элементов навигации. В паре с доступным именем группы они также объясняют пользователю, где именно он находится в интерактивном компоненте слайдера:

```html
<div class="slider" tabindex="0" role="region" aria-roledescription="Content Slider" aria-label="Design patterns">
        <div class="controls" role="group" aria-label="Slide controls">
           <button class="button button_type_radio" tabindex="0" aria-disabled="true" aria-label="show slide 1 of 4">
            </button>
            <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 2 of 4">
            </button>
            <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 3 of 4">
            </button>
            <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 4 of 4">
            </button>
            <button aria-label="show previous slide" class="button prev-button">
                <img class="prev-button" src="./images/left-arrow-svgrepo-com.svg">
            </button>
            <button aria-label="show next slide" class="button next-button">
                <img class="next-button" src="./images/right-arrow-svgrepo-com.svg">
            </button>
        </div>
```

Слайды, которые не видны, должны быть скрыты не только визуально, но и для пользователей программ чтения экрана. Для этого мы используем атрибут hidden:

```html
<div class='slide' role="group" aria-roledescription="Slide" aria-labelledby="First design pattern"
            id="carousel-item-1">
            <h3 id="carousel-item-1__heading">Первый слайд</h2>
                <img class="slideImg" src="./images/IMG_1945.JPG">
        </div>
        <div class='slide' hidden role="group" aria-roledescription="Slide" aria-labelledby="Second design pattern"
            id="carousel-item-2">
            <h3 id="carousel-item-2__heading">Второй слайд</h2>
                <img class="slideImg" src="./images/IMG_1946.JPG">
        </div>
        <div class='slide' hidden role="group" aria-roledescription="Slide" aria-labelledby="Third design pattern"
            id="carousel-item-3">
            <h3 id="carousel-item-3__heading">Третий слайд</h2>
                <img class="slideImg" src="./images/IMG_1947.JPG">
        </div>
        <div class='slide' hidden role="group" aria-roledescription="Slide" aria-labelledby="Third design pattern"
            id="carousel-item-3">
            <h3 id="Fourth design pattern">Четвертый слайд</h2>
                <img class="slideImg" src="./images/IMG_1948.JPG">
        </div>
```

Названия, aria-label, для кнопок должны явно передавать их функциональность, таким образом, для точек прогресса мы пишем:
```html
<div class="controls" role="group" aria-label="Slide controls">
            <button class="button button_type_radio" tabindex="0" aria-disabled="true" aria-label="show slide 1 of 4">
            </button>
            <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 2 of 4">
            </button>
            <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 3 of 4">
            </button>
            <button class="button button_type_radio" tabindex="0" aria-disabled="false" aria-label="show slide 4 of 4">
            </button>
```

Вместе с этим важнмым является использование элемента button, так как все элементы управления должны работать с клавиатуры.

### JavaScript

Первым шагом мы деактивируем все кнопки и скрываем все слайды. После этого мы активируем и показываем только те элементы, которые соответствуют текущему слайду, обеспечивая правильное и логичное поведение интерфейса. Навигацию по слайдеру таким образом становится интуитивно понятной и предсказуемой для пользователя.


В разметке мы используем атрибут hidden для тех слайдов, которые хотим скрыть - это сделано, чтобы пользователи скринридеров могли понять, какой контент в данный момент отображен на странице, а какой скрыт.

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
                controlButtons[controlButtons.length - 2].setAttribute('aria-disabled', currentSlide === 0 ? "true" : "false");
                controlButtons[controlButtons.length - 1].setAttribute('aria-disabled', currentSlide === slides.length - 1 ? "true" : "false");
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



