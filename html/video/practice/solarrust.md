🛠 На некоторых сайтах можно встретить фоновое видео вместо статичной картинки. Выглядит круто, а делается очень просто:

```html
<video autoplay muted loop playsinline class="background-video">
  <source
    src="storm.webm"
    type='video/webm; codecs="av01.0.05M.08"'
  >
  <source src="storm.mp4" type="video/mp4">
</video>
<div class="content">
  <h1>Банановый эквивалент</h1>
  <p>Мы живём в радиоактивном мире. Это нормально?</p>
</div>
```

```css
.background-video {
  position: absolute;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}

.content {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(0 0 0 / 0.5);
  color: rgb(241 241 241);
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
```

<iframe title="Видео на фоне" src="../demos/background/" height="430"></iframe>

Обратите внимание на несколько моментов, чтобы видео работало:

1. Фоновое видео грузится вместе со страницей, поэтому каждый мегабайт на счету. Первым ставьте WebM с AV1, он легче запасного MP4. Проверяйте поддержку форматов на сайте [Can I use](https://caniuse.com/).

1. Обязательно добавьте фоновому видео атрибуты `muted` и `playsinline`. Без первого браузер не запустит видео сам, без второго браузеры на iPhone не покажут его на странице.

1. Добавьте кнопку паузы. Движение на фоне мешает читать. По критерию 2.2.2 правил доступности WCAG (Руководства по доступности веб-контента) пользователь должен уметь остановить движение, которое запускается само и длится дольше 5 секунд.

1. Если в системе включено уменьшение движения, видео лучше не запускать вовсе. Эту настройку проверяет медиазапрос [`prefers-reduced-motion`](/a11y/prefers-reduced-motion/). В JavaScript его читают методом [`matchMedia()`](/js/match-media/):

```js
const video = document.querySelector('.background-video');
const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

if (reduceMotion.matches) {
  video.pause();
}
```

Кнопка паузы есть в демке выше.
