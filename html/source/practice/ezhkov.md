🛠 Использование атрибутов `srcset` и `sizes` отлично работает и просто в теге [`<img>`](/html/img/), а теги `<source>` чаще всего используются совместно с атрибутом `type`. Подготовка и указание изображений, видео или аудио различных типов помогает браузеру выбрать наиболее эффективный поддерживаемый формат.

```html
<picture>
  <source type="image/avif" srcset="photo.avif">
  <source type="image/webp" srcset="photo.webp">
  <source type="image/jpeg" srcset="photo.jpg">
  <img src="photo.jpg" alt="Тестовая картинка">
</picture>
```
