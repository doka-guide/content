Markdown не предполагает специального синтаксиса для встраивания видео, но и использование HTML-тегов тоже не запрещает. Есть два основных пути добавить видео в Markdown:

1. Использовать обложку видео со ссылкой на внешнюю платформу. 100% рабочий и допустимый на сторонних площадках вроде GitHub способ.

```markdown
[![Обложка к видео «Дока — как добавить пул-реквест со статьёй»](https://i3.ytimg.com/vi/y-_nXfKkI3w/hqdefault.jpg)](https://www.youtube.com/watch?v=y-_nXfKkI3w)
```

[![Обложка к видео «Дока — как добавить пул-реквест со статьёй»](https://i3.ytimg.com/vi/y-_nXfKkI3w/hqdefault.jpg)](https://www.youtube.com/watch?v=y-_nXfKkI3w)

2. Использовать HTML-разметку и вставить [`<iframe>`](/html/iframe/), например тот, что генерирует YouTube в диалоге «поделиться».

```markdown
<iframe width="560" height="315"
  src="https://www.youtube.com/embed/y-_nXfKkI3w"
  title="YouTube video player" frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>
```

<iframe width="560" height="315"
  src="https://www.youtube.com/embed/y-_nXfKkI3w"
  title="YouTube video player" frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>
