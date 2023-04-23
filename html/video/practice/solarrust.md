🛠 На некоторых сайтах можно встретить фоновое видео вместо статичной картинки. Выглядит круто, а делается очень просто:

```html
<video autoplay muted loop class="background-video">
  <source src="storm.mp4" type="video/mp4">
</video>
<div class="content">
  <h1>Банановый эквивалент</h1>
  <p>Мы живем в радиоактивном мире. Это нормально?</p>
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
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  padding: 20px;
}
```

<iframe title="Видео на фоне — <video> — Дока" src="../demos/background/" height="430"></iframe>

Обратите внимание на пару важных моментов, чтобы видео работало:

1. Используйте для фонового видео форматы AV1 или WebM. Это современные форматы кодирования, которые позволяют экономить на размере видео. Это ускорит загрузку страницы и доставит меньше раздражения пользователю. Проверяйте поддержку форматов на сайте [Can I use](https://caniuse.com/).

1. Чтобы не надоедать пользователю навязчивыми рекламными роликами, браузеры придерживаются политики, что в автоматическом режиме могут проигрываться только видео с атрибутом `muted`. Обязательно добавьте этот атрибут для фонового видео.
