---
title: "`transform-style`"
description: "Будут ли дочерние элементы трансформироваться вместе с родителем?"
baseline:
  - group: transforms3d
    features:
      - css.properties.transform-style
authors:
  - ezhkov
contributors:
  - skorobaeus
keywords:
  - preserve-3d
related:
  - css/transform
  - css/will-change
  - css/transform-style
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

## Как понять

Допустим, есть родительский элемент, у которого есть потомки. Если задать родительскому элементу свойство `transform-style` со значением `preserve-3d`, то это позволит применять к дочерним элементам нормальные 3D-трансформации. При нормальных 3D-трансформациях дочерний элемент сможет, допустим, при повороте пересечь родительский элемент. Если задать значение `flat`, то дочерние элементы всегда будут лежать в плоскости родителя и не смогут пересечь его ни при каких поворотах, масштабировании и прочих условиях.

Получается, что при `transform-style: preserve-3d` каждый дочерний элемент получает независимую от родителя плоскость, к которой можно применять 3D-трансформации. При `transform-style: flat` существует ровно одна плоскость — плоскость родителя, и никакие трансформации не могут заставить дочерний элемент выйти из этой плоскости.

<iframe title="Вращение 3D-объекта" src="demos/3d-rotate/" height="600"></iframe>

## Как пишется

```css
.parent {
  transform-style: flat; /* По умолчанию */
  transform-style: preserve-3d;
}
```

## Подсказки

💡 Свойство `transform-style` не наследуется. Нужно индивидуально задавать его для каждого следующего уровня вложенности.
