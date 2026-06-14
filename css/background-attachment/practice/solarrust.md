🛠 Самый быстрый параллакс. Без JS и библиотек. Достаточно двух свойств: `background-attachment: fixed` и `background-size: cover`. Фон прибивается к вьюпорту, контент скроллится поверх него. Секции чередуются: фото с параллаксом, потом обычный блок с текстом, потом снова фото — и получается многослойная глубина.

```css
.parallax-section {
  height: 100vh;
  background-image: url("photo.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.content-section {
  padding: 60px 40px;
  background: #fff;
}
```

<iframe title="Параллакс без JavaScript" src="demos/parallax/?embed=1" height="500"></iframe>

Важный нюанс: `fixed` не работает на iOS Safari — браузер отображает фон как `scroll`. Если сайт должен работать на мобильных, параллакс лучше делать через JS или CSS-трансформации.

🛠 Разница между `scroll` и `local` видна только в элементах с `overflow: scroll`. По умолчанию (`scroll`) фон зафиксирован относительно границ блока: текст скроллится, паттерн стоит на месте. С `local` фон движется вместе с содержимым, как будто напечатан на той же бумаге. Это удобно для текстовых блоков с декоративным паттерном, который должен ощущаться частью содержимого, а не рамкой.

```css
.container {
  height: 300px;
  overflow-y: scroll;
  background-image: url("pattern.svg");
  background-repeat: repeat;
  background-attachment: local;
}
```

<iframe title="local против scroll в контейнере со скроллом" src="demos/local/?embed=1" height="420"></iframe>

🛠 `background-attachment: fixed` в связке с `background-clip: text` даёт эффект «фото сквозь текст». Изображение просвечивает через буквы, и при прокрутке разные части фото появляются в тексте — как через движущееся окно. С `scroll` изображение зафиксировано в тексте и не меняется при прокрутке. Разницу лучше один раз увидеть в демке.

```css
.title {
  background-image: url("photo.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

<iframe title="Фото сквозь текст с background-clip" src="demos/clip-text/?embed=1" height="420"></iframe>
