🛠 При помощи селектора по атрибуту круто стилизовать ссылки, основываясь на значении атрибута `href`. Можно визуально разделять ссылки, ведущие на соседние страницы сайта, и ссылки, ведущие на другие сайты:

```html
<a href="https://doka.guide/about/">О нас</a>
<a href="https://doka.guide/subscribe/">Рассылка</a>
<a href="https://doka.guide/people/">Участники</a>
<a href="https://discord.gg/NjaevcW8k8">Мы в Discord</a>
```

Все ссылки будут с иконкой стрелочки:

```css
a::after {
  content: '';
  display: inline-block;
  background-image: url(arrow-top-right.svg);
}
```

Внутренние ссылки — без иконок:

```css
[href*="/doka.guide/"]::after {
  display: none;
}
```

<iframe title="Иконка для внешней ссылки" src="../demos/link-icon/" height="150"></iframe>
