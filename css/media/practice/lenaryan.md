🛠 медиавыражения можно вкладывать в медиавыражения и другие директивы:

```css
@media (min-width: 520px) {
  @media (max-width: 1080px) {
    .cell {
      background: peachpuff;
    }
  }
}
```

```css
@supports (position: sticky) {
  @media (min-width: 1080px) {
    .block {
      position: sticky;
    }
  }
}
```
