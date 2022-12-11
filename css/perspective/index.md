---
title: "`perspective`"
authors:
  - doka-dog
tags:
  - doka
  - placeholder
---

## Кратко

Свойство `perspective` определяет расстояние от пользователя до _задней стенки_ экрана по оси _z_. Таким образом, можно придать глубину элементу, к которому применяется свойство [`transform`](/css/transform/). Эффект заметен только при 3D-трансформациях.

При определении свойства `perspective` для элемента, эффект **применяется** к его дочерним элементам.

## Как пишется

Значение по умолчанию — `none`. Оно отменяет перспективу.

Значением может быть положительное число в доступных [единицах измерения](/css/numeric-types/).

## Пример

```css
.parent {
  width: 200px;
  perspective: 50px;
}

.child {
  background-color: green;
  transform: rotateX(15deg);
}
```

```html
  <div class="parent">
    <div class="child">Perspective: 50</div>
  </div>
```

<iframe title="Cтатичный пример свойства perspective" src="demos/example/" height="100"></iframe>

## Еще один пример

```css
  .container {
    margin: 0 auto;
  }

  .scene {
    position: absolute;
    width: 250px;
    height: 250px;
    perspective: 500px;
  }

  .scene-wrapper {
    width: 250px;
    height: 250px;
    transform-style: preserve-3d;
  }

  .element {
    width: 250px;
    height: 250px;
  }

  .element--front {
    background-color: #2429c7ac;
    transform: rotateY(0) translateZ(100px);
  }

  .element--back {
    background-color: #44c724ac;
    transform: rotateY(180deg) translateZ(100px);
  }
```

```js
  const myRange = document.getElementById("myRange");
  const output = document.getElementById("demo");
  const scene = document.querySelector(".scene");
  const elementBack = document.querySelector(".element--back");
  output.textContent = myRange.value;

  myRange.onchange = myRange.oninput = function() {
    let myRangeValue = myRange.value;
    elementBack.style.transform="rotateY(180deg) translateZ(100px)";
    
    if (myRangeValue === '1000') {
      myRangeValue = 'none';
      elementBack.style.transform="rotateY(180deg) translateZ(0)";
    }

    scene.style.perspective = `${ +myRangeValue}px`;
    output.textContent = myRangeValue;
  };
```

```html
  <div class="container">
    <input type="range" min="100" max="1000" value="500" class="slider" id="myRange">
    <p>Perspective: <span id="demo"></span></p>
    <div class="scene">
      <div class="scene-wrapper">
        <div class="element element--back">BACK</div>
      </div>
    </div>
    <div class="element element--front">FRONT</div>
  </div>
```

<iframe title="Интерактивный пример свойства perspective" src="demos/interactive-example/" height="500"></iframe>
