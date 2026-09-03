🛠 `background-clip` удобно комбинировать с несколькими фонами. Например, один фон зафиксирован на всю ширину элемента (`border-box`), а второй обрезан по контенту (`content-box`). Так можно создать декоративный «ободок» из первого фона, который будет виден только в области `padding` и `border`.

```css
.element {
  padding: 20px;
  border: 4px solid transparent;
  background-image:
    linear-gradient(#282A2E, #282A2E),
    linear-gradient(135deg, #2E9AFF, #F498AD);
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
}
```

В этом примере второй градиент занимает область рамки, а первый закрывает контент и отступы. В результате рамка выглядит градиентной при `border: solid transparent`.

<iframe title="Градиентная рамка через background-clip" src="demos/gradient-border/?embed=1" height="340"></iframe>
