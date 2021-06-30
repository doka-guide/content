🛠 В этом же свойстве можно задавать значение и для `grid-template-areas`. Но, на мой взгляд, тогда код превращается в кашу и становится совершенно нечитабельным. Лучше всё же использовать это свойство отдельно:

Лучше так?

```css
.container {
  display: grid;
  grid-template:
    [row1-start] "header header header" 25px [row1-end]
    [row2-start] "footer footer footer" 25px [row2-end]
    / auto 50px auto;
}
```

Или так?

```css
.container {
  display: grid;
  grid-template:
    [row1-start] 25px [row1-end]
    [row2-start] 25px [row2-end]
    / auto 50px auto;
  grid-template-areas:
    "header header header"
    "footer footer footer";
}
```

Но техническая возможность есть, выбирать вам! 😉
