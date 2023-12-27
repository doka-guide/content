🛠 Тег `<ol>` чаще всего используется для разметки нумерованных списков в тексте. Другой вариант использования часто можно увидеть на медиасервисах: упорядоченными списками свёрстаны плейлисты в музыкальной библиотеке.

```html
<ol class="playlist">
  <li class="playlist-item">
    <span class="song-artist">Nina Simone</span>
    <span class="song-title">Sinnerman</span>
  </li>
  <li class="playlist-item">
    <span class="song-artist">The Stranglers</span>
    <span class="song-title">Golden Brown</span>
  </li>
  <li class="playlist-item">
    <span class="song-artist">The Weekend</span>
    <span class="song-title">Blinding Lights</span>
  </li>
</ol>
```

🛠 Мы можем изменить стиль нумерации несколькими способами:

### Используя CSS-свойство [`list-style-type`](/css/list-style-type/)

```html
<h2>Творчество А. С. Пушкина</h2>
<ol class="poems">
  <li>Руслан и Людмила (1817—1820)</li>
  <li>Кавказский пленник (1820—1821)</li>
  <li>Гавриилиада (1821)</li>
</ol>
```

```css
.poems {
  list-style-type: square;
}
```

### При помощи псевдоэлемента [`::before`](/css/before/) и свойства [`content`](/css/content/)

```html
<h2>Как мы работаем:</h2>
<ol class="benefits">
  <li class="benefits-item">Низкие цены</li>
  <li class="benefits-item">Большая база поставщиков</li>
  <li class="benefits-item">Быстрая доставка</li>
</ol>
```

```css
.benefits {
  counter-reset: benefits;
}

.benefits-item {
  counter-increment: benefits;
}

.benefits-item::before {
  content: counter(benefits);
  position: absolute;
  font-size: 190px;
  font-weight: bold;
  left: 0;
  top: -0.35em;
  opacity: 0.5;
  color: #1A5AD7;
}
```

<iframe title="Наследование цвета" src="../demos/ordered-list/" height="400"></iframe>

### Стилизуя псевдоэлемент `::marker`

```html
<h2>Творчество А. С. Пушкина</h2>
<ol class="poems">
  <li class="poems-item">Руслан и Людмила (1817—1820)</li>
  <li class="poems-item">Кавказский пленник (1820—1821)</li>
  <li class="poems-item">Гавриилиада (1821)</li>
</ol>
```

```css
.poems-item::marker {
  color: #1A5AD7;
  font-size: 1.4em;
}
```
