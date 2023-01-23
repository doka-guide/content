🛠 Если используете `box-shadow` для стилей фокуса, то они не поддерживаются в режиме высокой контрастности в Windows. Режим ограничивает количество цветов, чтобы повысить читаемость текста за счёт изменения контраста текста и фона.

Чтобы фокус был виден всем пользователям, задайте альтернативные стили в директиве [`@media`](/css/media/) со значением [`forced-colors`](/a11y/forced-colors/).

```css
a:focus {
  outline: none;
  box-shadow: 0 0 0 0.2em white, 0 0 0 0.4em tomato;
}

@media (forced-colors: active) {
  a:focus {
    outline: 0.2em solid;
  }
}
```

Второй способ решения проблемы с видимостью `box-shadow` в режиме высокой контрастности — прозрачный `outline`.

```css
a:focus {
  outline: 2px solid transparent;
  box-shadow: 0 0 0 0.2em white, 0 0 0 0.4em tomato;
}
```
