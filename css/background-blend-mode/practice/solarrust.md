🛠 `multiply` с разными `background-color` — быстрый способ сделать серию карточек в единой гамме из одной фотографии. Меняется только цвет, а режим наложения тонирует снимок под него. Это удобно в дизайн-системах: одно фото, тематический цвет через переменную и карточки выглядят как иллюстрации под конкретный раздел.

```css
.card {
  background-image: url("photo.jpg");
  background-size: cover;
  background-blend-mode: multiply;
}

.card--blue   { background-color: #2E9AFF; }
.card--orange { background-color: #FF8630; }
.card--purple { background-color: #C56FFF; }
```

<iframe title="Один снимок, три настроения" src="demos/tint/?embed=1" height="420"></iframe>

🛠 В режиме `multiply` белый пиксель нейтрален, умножение на 1 ничего не меняет. Из этого вытекает полезный трюк: изображение с белым фоном (паттерн, логотип, штамп) можно наложить через `multiply`, и белый «пропадёт». Останется только тёмный рисунок на фотографии. Не нужен PNG с прозрачностью, хватит JPG или SVG с белым фоном.

```css
.element {
  background-image:
    url("pattern-on-white.svg"),
    url("photo.jpg");
  background-blend-mode: multiply;
  background-size: auto, cover;
  background-repeat: repeat, no-repeat;
}
```

<iframe title="Белый становится прозрачным" src="demos/stamp/?embed=1" height="450"></iframe>

🛠 `screen` работает зеркально к трюку со штампом и `multiply`: там белый нейтрален, здесь нейтрален чёрный. Значит, изображение с чёрным фоном и белым рисунком можно наложить через `screen` — чёрный фон исчезнет, останется только белый рисунок поверх фото. Никакого PNG с прозрачностью.

```css
.element {
  background-image:
    url("pattern-on-black.svg"),
    url("photo.jpg");
  background-blend-mode: screen;
  background-size: auto, cover;
  background-repeat: repeat, no-repeat;
}
```

<iframe title="Чёрный становится прозрачным" src="demos/screen/?embed=1" height="480"></iframe>
