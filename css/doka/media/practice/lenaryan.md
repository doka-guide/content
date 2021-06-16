---
tags:
  - practice
permalink: false
---

🛠 медиавыражения можно располагать как внутри селекторов, так и снаружи. Например, код:

```css
.block {
  font-size: 20px;
}
@media (max-width: 480px) {
  .block {
    font-size: 15px;
  }
}
```

сработает так же, как этот:

```css
.block {
  font-size: 20px;
  @media (max-width: 480px) {
    font-size: 15px;
  }
}
```

🛠 можно вкладывать в другие директивы:

```css
@supports (position: sticky) {
  @media (min-width: 1080px) {
    .block {
      position: sticky;
    }
  }
}
```
