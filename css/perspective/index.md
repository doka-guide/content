---
title: "`perspective`"
authors:
  - doka-dog
  - sqlzzy
tags:
  - doka
---

## Кратко

Свойство `perspective` определяет расстояние от пользователя до _задней стенки_ экрана по оси _z_. Таким образом можно придать глубину элементу, к которому применяется свойство [`transform`](/css/transform/). Эффект заметен только при 3D-трансформациях.

Свойство `perspective` влияет на *вложенные элементы* контейнера, для которого указано, а не на сам контейнер.

## Как пишется

Значение по умолчанию — `none`. Оно отменяет перспективу.

Значением может быть положительное число в доступных [единицах измерения](/css/numeric-types/).

## Как отображается элемент с применением свойства perspective

С применением свойства `perspective` и свойства [`transform`](/css/transform/) элемент может отображаться по-разному. 

```css
  .wrapper {
      display: flex;
      flex-wrap: wrap;
      width: 250px;
      margin: 0 auto;
  }

  .parent {
      width: 250px;
      margin-bottom: 24px;
  }
  
  .perspective-50 {
      perspective: 50px;
  }

  .perspective-100 {
      perspective: 100px;
  }

  .bgcolor-green {
      background-color: green;
  }

  .bgcolor-orange {
      background-color: orange;
  }

  .transform-rotate-x {
      transform: rotateX(15deg);
  }

  .transform-rotate-y {
      transform: rotateY(15deg);
  }
```

```html
  <div class="wrapper">
      <div class="parent perspective-50">
          <div class="child bgcolor-green transform-rotate-x">Значение перспективы: 50</div>
      </div>
  
      <div class="parent perspective-100">
          <div class="child bgcolor-orange transform-rotate-y">Значение перспективы: 100</div>
      </div>
  </div>
```

<iframe title="Как отображается элемент с применением свойства perspective" src="demos/static/" height="200"></iframe>

## Как трансформируется элемент с изменением перспективы

Ползунок помогает менять значение перспективы и позволяет наблюдать, как меняется расстояние от пользователя до _задней стенки_ экрана.

```css
  body {
    font-family: Roboto, sans-serif;
    background-color: #18191C;
    color: #FFFFFF;
  }

  .container {
    width: 250px;
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
    background-color: #2e9aff80;
    transform: rotateY(0) translateZ(100px);
  }

  .element--back {
    background-color: #F498AD;
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
      let value = myRange.value;
      elementBack.style.transform="rotateY(180deg) translateZ(100px)";
      
      if (value === '1000') {
          value = 'none';
          elementBack.style.transform="rotateY(180deg) translateZ(0)";
      }

      scene.style.perspective = `${ +value}px`;
      output.textContent = value;
  };
```

```html
  <div class="container">
      <input type="range" min="100" max="1000" value="500" class="slider" id="myRange">
      <p>Значение перспективы: <span id="demo"></span></p>
      <div class="scene">
          <div class="scene-wrapper">
              <div class="element element--back">Задняя стенка экрана</div>
          </div>
      </div>
      <div class="element element--front">Пользователь</div>
  </div>
```

<iframe title="Как трансформируется элемент с изменением перспективы" src="demos/dynamic/" height="350"></iframe>
