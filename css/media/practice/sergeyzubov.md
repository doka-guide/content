🛠 Если на проекте используются препроцессоры – удобно использовать миксины для часто употребляемых `@media`-выражений.

Например код на SCSS:

```scss
$tablet-min: 768px;

@mixin tablet {
  @media (min-width: $tablet-min) {
    @content;
  }
}
```

Использование миксина:

```scss
.header {
    color: red;

    @include tablet {
        color: white;
    }
}
```

Или с помощью LESS:

```less
@tablet: 768px;

.tablet(@rules) {
    @media (min-width: @tablet) {
        @rules();
    }
}
```

Использование:

```less
.header {
  color: red;

  .tablet({
    color: white;
  });
}
```
