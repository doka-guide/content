---
title: "transform-style"
authors:
  - ezhkov
keywords:
  - трансформация
  - preserve-3d
tags:
  - doka
---

## Кратко

Свойство `transform-style` определяет, как будут вести себя потомки элемента в 3D-пространстве при трансформации.

## Пример

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
.parent {
  transform-style: preserve-3d;
}

.child {
  transform: rotateY(-30deg);
}
```

## Как это понять

Допустим, есть родительский элемент, у которого есть потомки. Если задать родительскому элементу свойство `transform-style` со значением `preserve-3d`, то это позволит применять к дочерним элементам нормальные 3D-трансформации. При нормальных 3D-трансформациях дочерний элемент сможет, допустим, при повороте пересечь родительский элемент. Если задать значение `flat`, то дочерние элементы всегда будут лежать в плоскости родителя и не смогут пересечь его ни при каких поворотах, масштабировании и прочих условиях.

Получается, что при `transform-style: preserve-3d` каждый дочерний элемент получает независимую от родителя плоскость, к которой можно применять 3D-трансформации. При `transform-style: flat` существует ровно одна плоскость — плоскость родителя, и никакие трансформации не могут заставить дочерний элемент выйти из этой плоскости.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="ezhkov" data-slug-hash="wvordQN" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="transform-style">
  <span>See the Pen <a href="https://codepen.io/ezhkov/pen/wvordQN">
  transform-style</a> by Denis Ezhkov (<a href="https://codepen.io/ezhkov">@ezhkov</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Как пишется

```css
.parent {
  transform-style: flat; /* По умолчанию */
  transform-style: preserve-3d;
}
```

Глобальные значения:

```css
.parent {
  transform-style: inherit;
  transform-style: initial;
  transform-style: unset;
}
```

## Подсказки

💡 Свойство `transform-style` не наследуется. Нужно индивидуально задавать его для каждого следующего уровня вложенности.
