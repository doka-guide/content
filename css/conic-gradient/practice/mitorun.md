🛠 Цветовой круг можно сделать простым перечислением основных цветов. Первый и последний цвет должен быть один и тот же (красный), чтобы получился плавный градиент.

<iframe title="Цветовой круг" src="../demos/color-circle/" height="390"></iframe>

```css
.color-circle {
  background: conic-gradient(
    red,
    orange,
    yellow,
    green,
    blue,
    purple,
    red
  );
}
```

🛠 Для создания круговой диаграммы нужно задать жёсткие переходы цветов с помощью двух значений, указывающих начало и конец каждого цвета:

<iframe title="Круговая диаграмма" src="../demos/pie-chart/" height="390"></iframe>

```css
.pie-chart {
  background-image: conic-gradient(
    coral 27deg,
    palegreen 27deg 150deg,
    skyblue 150deg
  );
}
```

🛠 Простой фоновый рисунок в виде пирамидки сверху легко создать с помощью конического градиента:

<iframe title="Пирамида сверху" src="../demos/pyramid/" height="390"></iframe>

```css
.pyramid {
  background-image: conic-gradient(
    from -0.125turn,
    #bbb 0.25turn,
    #999 0.25turn 0.5turn,
    #bbb 0.5turn 0.75turn,
    #eee 0.75turn
  );
}
```

🛠 В комбинации со свойством [`background-size`](/css/background-size/) можно создавать различные повторяющиеся паттерны, например сделать шахматную доску:

<iframe title="Шахматные клетки" src="../demos/chess-board/" height="390"></iframe>

```css
.chess-board {
  background-image: conic-gradient(
    peru 25%,
    cornsilk 25% 50%,
    peru 50% 75%,
    cornsilk 75%
  );
  background-size: 25% 25%;
}
```

🛠 Этот рисунок солнца состоит из всего-лишь одного элемента, к которому применены сразу и [радиальный](/css/radial-gradient/) и конический градиенты:

<iframe title="Солнце с лучами" src="../demos/sun/" height="390"></iframe>

```css
.sun {
  background:
    radial-gradient(
      yellow 5%,
      gold 31% 32%,
      transparent 32.5% 50%,
      lightskyblue 70%
    ),
    conic-gradient(
      transparent 3%,
      yellow 5% 8%,
      transparent 10% 13%,
      yellow 15% 17%,
      transparent 20% 23%,
      yellow 25% 28%,
      transparent 30% 33%,
      yellow 35% 38%,
      transparent 40% 43%,
      yellow 45% 48%,
      transparent 50% 53%,
      yellow 55% 58%,
      transparent 60% 63%,
      yellow 65% 68%,
      transparent 70% 73%,
      yellow 75% 78%,
      transparent 80% 83%,
      yellow 85% 88%,
      transparent 90% 93%,
      yellow 95% 98%,
      transparent
    );
}
```

Код можно сделать ещё проще, заменив конический градиент на `repeating-conic-gradient`:

```css
.sun {
  background:
    radial-gradient(
      yellow 5%,
      gold 31% 32%,
      transparent 32.5% 50%,
      lightskyblue 70%
    ),
    repeating-conic-gradient(
      yellow 0% 1%,
      transparent 4% 6%,
      yellow 9% 10%
    );
}
```
